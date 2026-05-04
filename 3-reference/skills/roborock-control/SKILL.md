---
name: roborock-control
description: |
  Control Brady's Roborock Qrevo S5V from any Brady OS agent via the Home Assistant REST API.
  HA runs in Docker on Brady's Mac at http://localhost:8123 with the official Roborock
  integration. Provides primitives (start/pause/dock/locate/fan/segment/status) AND
  fires Brady's 10 custom Roborock-app routines as one-call button presses
  (vacuum_kitchen, mop_kitchen, full_cleaning, after_meal_v2, etc.).
  Trigger: "send the vacuum home", "start the roborock", "vacuum the kitchen",
  "run the after-meal routine", "is the vacuum charged", "roborock status",
  "run full cleaning".
trust_tier: T1
---

# Roborock Control

Drives the Roborock vacuum through the Home Assistant REST API. No Chrome MCP, no UI scraping —
just authenticated HTTPS calls. Designed so any agent (Claudine, Phil, a scheduled cron, a sweep)
can issue one-line commands.

---

## Architecture

```
Brady → agent → curl → HA REST API (localhost:8123) → Roborock cloud → vacuum
```

| Layer | Where it lives |
|-------|---------------|
| Home Assistant container | `~/homeassistant/` (Colima/Docker, port 8123) |
| Compose file | `~/homeassistant/docker-compose.yml` |
| HA config + state | `~/homeassistant/config/` (gitignored, host volume) |
| Roborock integration | Configured in HA UI (cloud auth, not local protocol) |
| Long-lived access token | `~/.zshrc` → `HASS_TOKEN` (created in HA profile UI) |
| Vacuum entity | `vacuum.roborock_qrevo_s5v` (cached in `~/.zshrc` as `ROBOROCK_ENTITY`) |
| Networking | Colima + `network_mode: host` in compose (default Docker bridge has broken egress NAT on Colima — host mode is required) |

---

## Environment contract

Every call needs two env vars. Source `~/.zshrc` or set inline:

```bash
export HASS_URL="http://localhost:8123"
export HASS_TOKEN="<long-lived access token from HA profile>"
```

Verify auth works:

```bash
curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/" | jq
# expect: {"message":"API running."}
```

---

## Discover the vacuum entity

The integration creates `vacuum.<roborock_model_or_name>`. Discover it:

```bash
curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states" \
  | jq -r '.[] | select(.entity_id | startswith("vacuum.")) | .entity_id'
```

Save the result as `ROBOROCK_ENTITY` (e.g., `vacuum.roborock_s7` or whatever the integration named it):

```bash
export ROBOROCK_ENTITY=$(curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states" \
  | jq -r '.[] | select(.entity_id | startswith("vacuum.")) | .entity_id' | head -1)
```

---

## Control primitives

All commands follow the same shape: `POST /api/services/<domain>/<service>` with `entity_id` in the body.

### Start cleaning (whole house)
```bash
curl -sf -X POST "$HASS_URL/api/services/vacuum/start" \
  -H "Authorization: Bearer $HASS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\"}"
```

### Pause / Stop
```bash
curl -sf -X POST "$HASS_URL/api/services/vacuum/pause" -H "Authorization: Bearer $HASS_TOKEN" \
  -H "Content-Type: application/json" -d "{\"entity_id\": \"$ROBOROCK_ENTITY\"}"

curl -sf -X POST "$HASS_URL/api/services/vacuum/stop" -H "Authorization: Bearer $HASS_TOKEN" \
  -H "Content-Type: application/json" -d "{\"entity_id\": \"$ROBOROCK_ENTITY\"}"
```

### Return to dock
```bash
curl -sf -X POST "$HASS_URL/api/services/vacuum/return_to_base" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\"}"
```

### Locate (vacuum chimes so you can find it)
```bash
curl -sf -X POST "$HASS_URL/api/services/vacuum/locate" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\"}"
```

### Set fan speed
Valid values depend on model — typically `silent`, `balanced`, `turbo`, `max`, `gentle`.
Discover what's valid: state response includes `attributes.fan_speed_list`.

```bash
curl -sf -X POST "$HASS_URL/api/services/vacuum/set_fan_speed" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\", \"fan_speed\": \"max\"}"
```

### Zone clean (Roborock-specific)
Coordinates come from Roborock's map. Easiest path: clean a saved room by `segments` if the
integration exposes the `roborock.vacuum_clean_segment` service, otherwise raw zone:

```bash
# Clean a specific room (segment ID from saved map)
curl -sf -X POST "$HASS_URL/api/services/roborock/vacuum_clean_segment" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\", \"segments\": [16]}"

# Raw zone (x1,y1,x2,y2,repeats) — discover coords from the HA map card
curl -sf -X POST "$HASS_URL/api/services/vacuum/send_command" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\": \"$ROBOROCK_ENTITY\", \"command\": \"app_zoned_clean\", \"params\": [[26000, 26000, 28000, 28000, 1]]}"
```

### Read state (battery, status, fan speed)
```bash
curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states/$ROBOROCK_ENTITY" | jq '{state, battery: .attributes.battery_level, fan: .attributes.fan_speed, status: .attributes.status}'
```

Expected `state` values: `docked`, `cleaning`, `returning`, `paused`, `idle`, `error`.

For deeper telemetry, the Roborock integration also exposes per-attribute sensors as separate entities:

| What you want | Entity |
|---|---|
| Battery % | `sensor.roborock_qrevo_s5v_battery` |
| Status text | `sensor.roborock_qrevo_s5v_status` |
| Current room | `sensor.roborock_qrevo_s5v_current_room` |
| Cleaning progress % | `sensor.roborock_qrevo_s5v_cleaning_progress` |
| Last clean start/end | `sensor.roborock_qrevo_s5v_last_clean_begin` / `_end` |
| Total cleaning area | `sensor.roborock_qrevo_s5v_total_cleaning_area` |
| Brush/filter time-left | `sensor.roborock_qrevo_s5v_main_brush_time_left`, `_side_brush_time_left`, `_filter_time_left` |
| Mop attached / water level | `binary_sensor.roborock_qrevo_s5v_mop_attached`, `_water_shortage` |
| Charging | `binary_sensor.roborock_qrevo_s5v_charging` |
| Vacuum error | `sensor.roborock_qrevo_s5v_vacuum_error` |

Read any of them: `GET /api/states/<entity_id>`.

---

## Custom routines (button entities)

The Roborock integration exposes every custom cleaning routine Brady created in the Roborock app as a `button.*` entity. Pressing one fires that exact routine — same as tapping it in the app, but from any agent or cron.

**Fire pattern:**
```bash
curl -sf -X POST "$HASS_URL/api/services/button/press" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d '{"entity_id": "button.roborock_qrevo_s5v_<routine_slug>"}'
```

**Brady's current routines** (as of skill creation — re-discover with the entity dump below if Brady adds new ones in the app):

| Routine slug | What it does (per name) |
|---|---|
| `after_meal_v2` | After-meal cleanup |
| `quisla_vacuum_2x` | Quisla's room, 2x pass |
| `vac_mop_common_area` | Vac + mop common area |
| `vacuum_common_area` | Vac only common area |
| `vacuum_kitchen` | Vac kitchen |
| `mop_kitchen` | Mop kitchen |
| `vacuum_upstairs` | Vac upstairs |
| `vacuum_office` | Vac office |
| `intensive_sweeping` | Heavy sweep |
| `full_cleaning` | Full house |

**Re-discover after adding a routine in the app:**
```bash
curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states" \
  | jq -r '.[] | select(.entity_id | startswith("button.roborock_")) | .entity_id'
```

**Trigger phrase mapping** (for any agent invoking this skill):

| Brady says | Press button |
|---|---|
| "vacuum the kitchen" | `vacuum_kitchen` |
| "mop the kitchen" | `mop_kitchen` |
| "vac and mop common area" / "common area" | `vac_mop_common_area` |
| "vacuum upstairs" | `vacuum_upstairs` |
| "vacuum the office" | `vacuum_office` |
| "after-meal" / "kitchen after dinner" | `after_meal_v2` |
| "Quisla's room" / "vacuum Quisla 2x" | `quisla_vacuum_2x` |
| "intensive sweep" / "deep clean" | `intensive_sweeping` |
| "full clean" / "full cleaning" / "do the whole house" | `full_cleaning` |

For ambiguous requests ("clean the kitchen") prefer the more specific button (`vacuum_kitchen` over the generic vacuum/start).

---

## Helper script

Optional: `~/homeassistant/roborock.sh` wrapping all of the above:

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${HASS_URL:?missing HASS_URL}"
: "${HASS_TOKEN:?missing HASS_TOKEN}"
ENTITY="${ROBOROCK_ENTITY:-$(curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states" | jq -r '.[] | select(.entity_id | startswith("vacuum.")) | .entity_id' | head -1)}"

cmd=${1:?usage: roborock <start|stop|pause|home|locate|status|fan SPEED|segment ID|routine ROUTINE_SLUG|list>}
shift || true
case "$cmd" in
  start)   svc=vacuum/start ;;
  stop)    svc=vacuum/stop ;;
  pause)   svc=vacuum/pause ;;
  home)    svc=vacuum/return_to_base ;;
  locate)  svc=vacuum/locate ;;
  fan)     svc=vacuum/set_fan_speed; extra=",\"fan_speed\":\"$1\"" ;;
  segment) svc=roborock/vacuum_clean_segment; extra=",\"segments\":[$1]" ;;
  routine)
    # roborock routine vacuum_kitchen | full_cleaning | after_meal_v2 | etc.
    BTN="button.roborock_qrevo_s5v_$1"
    curl -sf -X POST "$HASS_URL/api/services/button/press" \
      -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
      -d "{\"entity_id\":\"$BTN\"}"
    echo "ok ($BTN)"; exit 0 ;;
  list)
    curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states" \
      | jq -r '.[] | select(.entity_id | startswith("button.roborock_")) | .entity_id | sub("button\\.roborock_qrevo_s5v_"; "")'
    exit 0 ;;
  status)
    curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/states/$ENTITY" \
      | jq '{state, battery: .attributes.battery_level, fan: .attributes.fan_speed, status: .attributes.status}'
    exit 0 ;;
  *) echo "unknown: $cmd" >&2; exit 1 ;;
esac
curl -sf -X POST "$HASS_URL/api/services/$svc" \
  -H "Authorization: Bearer $HASS_TOKEN" -H "Content-Type: application/json" \
  -d "{\"entity_id\":\"$ENTITY\"${extra:-}}"
echo "ok"
```

`chmod +x ~/homeassistant/roborock.sh && ln -s ~/homeassistant/roborock.sh /opt/homebrew/bin/roborock`

Then: `roborock home`, `roborock status`, `roborock fan max`, `roborock segment 16`, `roborock routine vacuum_kitchen`, `roborock routine full_cleaning`, `roborock list` (lists all custom routines).

---

## Scheduled cleaning patterns

### Daily kitchen clean at 11 PM (cron)
```cron
0 23 * * * /opt/homebrew/bin/roborock segment <kitchen_id> >> ~/homeassistant/cron.log 2>&1
```

### Schedule from a Conductor session
Use `ScheduleWakeup` or the `conductor-push` skill's delay pattern, then call the curl above.

### From a Brady OS agent (Phil, Claudine, sweep)
The agent imports this skill and runs:
```bash
source ~/.zshrc  # picks up HASS_TOKEN
roborock home    # or any other primitive
```

---

## Failure modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `401 Unauthorized` | Token revoked or wrong | Regenerate in HA profile, update `~/.zshrc` |
| `Connection refused` to :8123 | HA container down | `cd ~/homeassistant && docker compose up -d` |
| `Service vacuum/start not found` | Integration missing or vacuum offline | Check HA UI → Devices → Roborock |
| Vacuum doesn't move | Cloud unreachable from your network | Check internet; the official Roborock integration uses cloud, not LAN |
| `404` on entity | Entity ID changed | Re-run discovery (above), update `ROBOROCK_ENTITY` |

---

## What this skill does NOT do

- Does not manage HA itself (updates, integrations, automations) — that's done in the HA UI.
- Does not create the long-lived token — Brady creates that once in the HA profile UI and stashes it in `~/.zshrc`.
- Does not handle Roborock account auth — that's set up once via the HA Roborock integration card.
- Does not manage maps or rooms — those are configured in the Roborock app or HA's Roborock card.

---

## Setup checklist (one-time, manual)

These are the only steps that can't be automated — they need Brady's Roborock credentials and a click in the HA UI.

1. **Onboard HA at http://localhost:8123** — create local admin account, name "Bentonville Home", skip optional integrations.
2. **Add Roborock integration**: Settings → Devices & Services → Add Integration → "Roborock" → enter your Roborock email → enter SMS code.
3. **Confirm vacuum shows up**: dashboard should show a `vacuum.<name>` entity with battery/state.
4. **Create long-lived access token**: profile (bottom-left) → Security tab → "Long-Lived Access Tokens" → Create → name it `claudine` → copy the token (only shown once).
5. **Stash credentials in ~/.zshrc**:
   ```bash
   export HASS_URL="http://localhost:8123"
   export HASS_TOKEN="<paste token>"
   ```
   Then `source ~/.zshrc`.
6. **Smoke test**: `curl -sf -H "Authorization: Bearer $HASS_TOKEN" "$HASS_URL/api/" | jq` returns `{"message":"API running."}`.
7. **Discover entity**: run the discovery one-liner above and add `export ROBOROCK_ENTITY=...` to `~/.zshrc`.
8. **Fire a test command**: `roborock locate` — vacuum should chime.

---

## Triggering this skill

Brady says any of:
- "send the vacuum home"
- "vacuum [room name]"
- "is the vacuum charged"
- "roborock status"
- "stop the vacuum"
- "pause the roborock"
- "set vacuum to max"

Agent invokes the matching curl primitive above. For "vacuum kitchen" / room-named requests, look up the segment ID from a stored map (or ask Brady once and cache it).
