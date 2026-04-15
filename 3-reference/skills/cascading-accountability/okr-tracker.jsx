import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// CLIENT CONFIGURATION — Update these per deployment
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
  COMPANY_NAME: "[COMPANY]",
  TRACKER_TITLE: "OKR TRACKER",
  DIVISIONS: ["[Division 1]", "[Division 2]", "[Division 3]", "[Division 4]", "[Division 5]"],
  TIERS: ["C-Suite", "SVP", "VP", "Director"],
  ADHERENCE_THRESHOLD: 75,
  ADMIN_PIN: "2026",
  STORAGE_KEY: "cas-okr-data",
};
// ═══════════════════════════════════════════════════════════════

const OBJ_CATEGORIES = [
  { key: "company", label: "Company — Financial Performance", color: "emerald" },
  { key: "team", label: "Team / Customer", color: "sky" },
  { key: "individual", label: "Individual", color: "amber" },
];

function getWeekId(d = new Date()) {
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - jan1) / 86400000);
  return `${d.getFullYear()}-W${String(Math.ceil((days + jan1.getDay() + 1) / 7)).padStart(2, "0")}`;
}

function getMonday(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getFriday(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -2 : 5);
  date.setDate(diff);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function OKRTracker() {
  const [data, setData] = useState({ employees: [], submissions: [] });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("landing");
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [adminPin, setAdminPin] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);

  const save = useCallback(async (newData) => {
    setData(newData);
    try {
      await window.storage.set(CONFIG.STORAGE_KEY, JSON.stringify(newData), true);
    } catch (e) {
      console.error("Save failed:", e);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(CONFIG.STORAGE_KEY, true);
        if (result) setData(JSON.parse(result.value));
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0f1a", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1a", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header view={view} setView={setView} currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} adminAuthed={adminAuthed} />
      <div className="max-w-2xl mx-auto px-4 pb-16">
        {view === "landing" && <Landing data={data} setView={setView} setCurrentEmployee={setCurrentEmployee} />}
        {view === "register" && <Register data={data} save={save} setView={setView} setCurrentEmployee={setCurrentEmployee} />}
        {view === "objectives" && currentEmployee && <Objectives data={data} save={save} employee={currentEmployee} setView={setView} />}
        {view === "monday" && currentEmployee && <MondayFocus data={data} save={save} employee={currentEmployee} />}
        {view === "friday" && currentEmployee && <FridayRecap data={data} save={save} employee={currentEmployee} />}
        {view === "dashboard" && !adminAuthed && <AdminGate pin={adminPin} setPin={setAdminPin} setAuthed={setAdminAuthed} />}
        {view === "dashboard" && adminAuthed && <Dashboard data={data} />}
      </div>
    </div>
  );
}

function Header({ view, setView, currentEmployee, setCurrentEmployee, adminAuthed }) {
  return (
    <div className="border-b border-gray-800 mb-8">
      <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView("landing"); setCurrentEmployee(null); }}>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-white font-semibold text-sm tracking-wide">{CONFIG.COMPANY_NAME} {CONFIG.TRACKER_TITLE}</span>
        </div>
        <div className="flex gap-2">
          {currentEmployee && (
            <button onClick={() => setView("landing")} className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded border border-gray-800 hover:border-gray-700 transition-colors">
              Switch User
            </button>
          )}
          <button onClick={() => setView("dashboard")} className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded border border-gray-800 hover:border-gray-700 transition-colors">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function Landing({ data, setView, setCurrentEmployee }) {
  const weekId = getWeekId();
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-white text-2xl font-bold mb-1">Weekly Check-in</h1>
        <p className="text-gray-500 text-sm">Week of {getMonday()} — {getFriday()}</p>
      </div>

      {data.employees.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-medium">Select your name</p>
          <div className="space-y-2">
            {data.employees.map((emp) => {
              const hasMon = data.submissions.some(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "monday");
              const hasFri = data.submissions.some(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "friday");
              return (
                <button
                  key={emp.id}
                  onClick={() => { setCurrentEmployee(emp); setView(emp.objectives?.length ? "monday" : "objectives"); }}
                  className="w-full text-left p-4 rounded-lg border border-gray-800 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-900 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{emp.name}</span>
                      <span className="text-gray-600 mx-2">&middot;</span>
                      <span className="text-gray-500 text-sm">{emp.division}</span>
                      <span className="text-gray-700 mx-2">&middot;</span>
                      <span className="text-gray-600 text-xs uppercase">{emp.tier}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${hasMon ? "bg-emerald-400" : "bg-gray-700"}`} title={hasMon ? "Monday submitted" : "Monday pending"} />
                      <div className={`w-2 h-2 rounded-full ${hasFri ? "bg-emerald-400" : "bg-gray-700"}`} title={hasFri ? "Friday submitted" : "Friday pending"} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setView("register")}
        className="w-full p-4 rounded-lg border border-dashed border-gray-700 hover:border-gray-500 text-gray-500 hover:text-gray-300 text-sm transition-colors"
      >
        + Register New Leader
      </button>
    </div>
  );
}

function Register({ data, save, setView, setCurrentEmployee }) {
  const [name, setName] = useState("");
  const [division, setDivision] = useState(CONFIG.DIVISIONS[0]);
  const [tier, setTier] = useState(CONFIG.TIERS[CONFIG.TIERS.length - 1]);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    const emp = { id: Date.now().toString(), name: name.trim(), division, tier, objectives: [] };
    const newData = { ...data, employees: [...data.employees, emp] };
    await save(newData);
    setCurrentEmployee(emp);
    setView("objectives");
  };

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-6">Register</h2>
      <div className="space-y-5">
        <Field label="Full Name">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Smith" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gray-600 placeholder-gray-700" />
        </Field>
        <Field label="Division">
          <select value={division} onChange={e => setDivision(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gray-600 appearance-none">
            {CONFIG.DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Leadership Tier">
          <div className="flex gap-2 flex-wrap">
            {CONFIG.TIERS.map(t => (
              <button key={t} onClick={() => setTier(t)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${tier === t ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-gray-800 bg-gray-900 text-gray-500 hover:text-gray-300"}`}>
                {t}
              </button>
            ))}
          </div>
        </Field>
        <button onClick={handleSubmit} disabled={!name.trim()} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-4">
          Continue &rarr; Set Objectives
        </button>
      </div>
    </div>
  );
}

function Objectives({ data, save, employee, setView }) {
  const existing = employee.objectives?.length === 3 ? employee.objectives : OBJ_CATEGORIES.map(c => ({ category: c.key, title: "", krs: ["", "", ""] }));
  const [objs, setObjs] = useState(existing);

  const updateObj = (idx, field, val) => {
    const next = [...objs];
    next[idx] = { ...next[idx], [field]: val };
    setObjs(next);
  };

  const updateKR = (objIdx, krIdx, val) => {
    const next = [...objs];
    next[objIdx] = { ...next[objIdx], krs: next[objIdx].krs.map((k, i) => i === krIdx ? val : k) };
    setObjs(next);
  };

  const handleSave = async () => {
    const updatedEmp = { ...employee, objectives: objs };
    const newEmployees = data.employees.map(e => e.id === employee.id ? updatedEmp : e);
    await save({ ...data, employees: newEmployees });
    setView("monday");
  };

  const colors = { company: "emerald", team: "sky", individual: "amber" };

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-1">Set Your 3 Objectives</h2>
      <p className="text-gray-500 text-sm mb-8">Each objective gets up to 3 key results. Update these quarterly.</p>

      <div className="space-y-6">
        {OBJ_CATEGORIES.map((cat, idx) => (
          <div key={cat.key} className="p-5 rounded-lg border border-gray-800 bg-gray-900/30">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1.5 h-1.5 rounded-full bg-${colors[cat.key]}-400`}></div>
              <span className={`text-${colors[cat.key]}-400 text-xs uppercase tracking-widest font-medium`}>{cat.label}</span>
            </div>
            <input
              value={objs[idx].title}
              onChange={e => updateObj(idx, "title", e.target.value)}
              placeholder="Objective title..."
              className="w-full bg-transparent border-b border-gray-800 focus:border-gray-600 pb-2 mb-4 text-white text-sm focus:outline-none placeholder-gray-700"
            />
            <div className="space-y-2">
              {objs[idx].krs.map((kr, krIdx) => (
                <div key={krIdx} className="flex items-center gap-2">
                  <span className="text-gray-700 text-xs font-mono w-6">KR{krIdx + 1}</span>
                  <input
                    value={kr}
                    onChange={e => updateKR(idx, krIdx, e.target.value)}
                    placeholder="Key result..."
                    className="flex-1 bg-transparent border-b border-gray-800/50 focus:border-gray-700 pb-1 text-gray-300 text-sm focus:outline-none placeholder-gray-800"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors mt-6">
        Save Objectives &rarr; Weekly Check-in
      </button>
    </div>
  );
}

function MondayFocus({ data, save, employee }) {
  const weekId = getWeekId();
  const existing = data.submissions.find(s => s.employeeId === employee.id && s.weekId === weekId && s.type === "monday");
  const [focuses, setFocuses] = useState(existing?.focuses || ["", "", ""]);
  const [saved, setSaved] = useState(!!existing);

  const handleSave = async () => {
    const submission = {
      id: existing?.id || Date.now().toString(),
      employeeId: employee.id,
      employeeName: employee.name,
      division: employee.division,
      tier: employee.tier,
      weekId,
      type: "monday",
      focuses,
      submittedAt: new Date().toISOString(),
    };
    const otherSubs = data.submissions.filter(s => !(s.employeeId === employee.id && s.weekId === weekId && s.type === "monday"));
    await save({ ...data, submissions: [...otherSubs, submission] });
    setSaved(true);
  };

  const objs = employee.objectives || [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Monday Focus</p>
        <h2 className="text-white text-xl font-bold">{employee.name}</h2>
        <p className="text-gray-600 text-sm">Week of {getMonday()}</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-emerald-400 text-sm font-medium">Monday focus submitted</span>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {OBJ_CATEGORIES.map((cat, idx) => {
          const obj = objs[idx];
          const colors = { company: "emerald", team: "sky", individual: "amber" };
          return (
            <div key={cat.key} className="p-5 rounded-lg border border-gray-800 bg-gray-900/30">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full bg-${colors[cat.key]}-400`}></div>
                <span className={`text-${colors[cat.key]}-400 text-xs uppercase tracking-widest font-medium`}>{cat.label}</span>
              </div>
              {obj?.title && <p className="text-gray-500 text-xs mb-3 ml-3.5">{obj.title}</p>}
              <textarea
                value={focuses[idx]}
                onChange={e => { const next = [...focuses]; next[idx] = e.target.value; setFocuses(next); setSaved(false); }}
                placeholder="What's your focus this week for this objective?"
                rows={2}
                className="w-full bg-gray-900/80 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gray-600 placeholder-gray-700 resize-none"
              />
            </div>
          );
        })}
      </div>

      <button onClick={handleSave} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors mt-6">
        {saved ? "Update" : "Submit"} Monday Focus
      </button>
    </div>
  );
}

function FridayRecap({ data, save, employee }) {
  const weekId = getWeekId();
  const mondaySub = data.submissions.find(s => s.employeeId === employee.id && s.weekId === weekId && s.type === "monday");
  const existing = data.submissions.find(s => s.employeeId === employee.id && s.weekId === weekId && s.type === "friday");

  const [recaps, setRecaps] = useState(existing?.recaps || ["", "", ""]);
  const [scores, setScores] = useState(existing?.scores || [100, 100, 100]);
  const [saved, setSaved] = useState(!!existing);

  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const handleSave = async () => {
    const submission = {
      id: existing?.id || Date.now().toString(),
      employeeId: employee.id,
      employeeName: employee.name,
      division: employee.division,
      tier: employee.tier,
      weekId,
      type: "friday",
      recaps,
      scores,
      avgScore,
      submittedAt: new Date().toISOString(),
    };
    const otherSubs = data.submissions.filter(s => !(s.employeeId === employee.id && s.weekId === weekId && s.type === "friday"));
    await save({ ...data, submissions: [...otherSubs, submission] });
    setSaved(true);
  };

  const objs = employee.objectives || [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Friday Recap</p>
        <h2 className="text-white text-xl font-bold">{employee.name}</h2>
        <p className="text-gray-600 text-sm">Week of {getMonday()}</p>
      </div>

      {saved && (
        <div className={`mb-6 p-4 rounded-lg border ${avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "bg-emerald-400" : "bg-red-400"}`}></div>
            <span className={`text-sm font-medium ${avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "text-emerald-400" : "text-red-400"}`}>
              Friday recap submitted — {avgScore}% adherence {avgScore < CONFIG.ADHERENCE_THRESHOLD && "— below threshold"}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {OBJ_CATEGORIES.map((cat, idx) => {
          const obj = objs[idx];
          const mondayFocus = mondaySub?.focuses?.[idx];
          const colors = { company: "emerald", team: "sky", individual: "amber" };
          return (
            <div key={cat.key} className="p-5 rounded-lg border border-gray-800 bg-gray-900/30">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full bg-${colors[cat.key]}-400`}></div>
                <span className={`text-${colors[cat.key]}-400 text-xs uppercase tracking-widest font-medium`}>{cat.label}</span>
              </div>
              {mondayFocus && (
                <div className="ml-3.5 mb-3 p-2.5 rounded bg-gray-800/30 border-l-2 border-gray-700">
                  <p className="text-gray-500 text-xs">Monday focus: <span className="text-gray-400">{mondayFocus}</span></p>
                </div>
              )}
              <textarea
                value={recaps[idx]}
                onChange={e => { const next = [...recaps]; next[idx] = e.target.value; setRecaps(next); setSaved(false); }}
                placeholder="What got done? What didn't? Why?"
                rows={2}
                className="w-full bg-gray-900/80 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gray-600 placeholder-gray-700 resize-none mb-3"
              />
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xs">Adherence</span>
                <input
                  type="range"
                  min="0" max="100" step="5"
                  value={scores[idx]}
                  onChange={e => { const next = [...scores]; next[idx] = parseInt(e.target.value); setScores(next); setSaved(false); }}
                  className="flex-1 accent-emerald-500"
                />
                <span className={`text-sm font-mono font-medium w-10 text-right ${scores[idx] >= CONFIG.ADHERENCE_THRESHOLD ? "text-emerald-400" : "text-red-400"}`}>{scores[idx]}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 p-4 rounded-lg border text-center ${avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "border-gray-800" : "border-red-500/30 bg-red-500/5"}`}>
        <span className="text-gray-500 text-sm">Overall Adherence: </span>
        <span className={`text-lg font-bold font-mono ${avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "text-white" : "text-red-400"}`}>{avgScore}%</span>
        {avgScore < CONFIG.ADHERENCE_THRESHOLD && <p className="text-red-400/70 text-xs mt-1">Below {CONFIG.ADHERENCE_THRESHOLD}% — manager check-in will be triggered</p>}
      </div>

      <button onClick={handleSave} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors mt-4">
        {saved ? "Update" : "Submit"} Friday Recap
      </button>
    </div>
  );
}

function AdminGate({ pin, setPin, setAuthed }) {
  return (
    <div className="max-w-xs mx-auto mt-20 text-center">
      <h2 className="text-white text-lg font-bold mb-2">Dashboard Access</h2>
      <p className="text-gray-500 text-sm mb-6">Enter admin PIN</p>
      <input
        type="password"
        value={pin}
        onChange={e => setPin(e.target.value)}
        placeholder="PIN"
        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm text-center focus:outline-none focus:border-gray-600 placeholder-gray-700 mb-4 tracking-widest"
        onKeyDown={e => { if (e.key === "Enter" && pin === CONFIG.ADMIN_PIN) setAuthed(true); }}
      />
      <button onClick={() => { if (pin === CONFIG.ADMIN_PIN) setAuthed(true); }} className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
        Enter
      </button>
    </div>
  );
}

function Dashboard({ data }) {
  const weekId = getWeekId();
  const totalEmp = data.employees.length;
  const mondaySubs = data.submissions.filter(s => s.weekId === weekId && s.type === "monday");
  const fridaySubs = data.submissions.filter(s => s.weekId === weekId && s.type === "friday");
  const belowThreshold = fridaySubs.filter(s => s.avgScore < CONFIG.ADHERENCE_THRESHOLD);

  const divGroups = {};
  data.employees.forEach(emp => {
    if (!divGroups[emp.division]) divGroups[emp.division] = [];
    divGroups[emp.division].push(emp);
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold mb-1">Leadership Dashboard</h2>
        <p className="text-gray-500 text-sm">Week of {getMonday()} — {getFriday()}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard label="Registered" value={totalEmp} />
        <StatCard label="Mon Submitted" value={`${mondaySubs.length}/${totalEmp}`} color={mondaySubs.length === totalEmp ? "emerald" : "amber"} />
        <StatCard label="Fri Submitted" value={`${fridaySubs.length}/${totalEmp}`} color={fridaySubs.length === totalEmp ? "emerald" : "amber"} />
      </div>

      {belowThreshold.length > 0 && (
        <div className="mb-8 p-4 rounded-lg border border-red-500/30 bg-red-500/5">
          <p className="text-red-400 text-xs uppercase tracking-widest font-medium mb-3">Below {CONFIG.ADHERENCE_THRESHOLD}% Adherence — Trigger Check-in</p>
          {belowThreshold.map(s => {
            const emp = data.employees.find(e => e.id === s.employeeId);
            return (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-red-500/10 last:border-0">
                <div>
                  <span className="text-white text-sm">{s.employeeName}</span>
                  {emp && <span className="text-gray-600 text-xs ml-2">{emp.tier} &middot; {emp.division}</span>}
                </div>
                <span className="text-red-400 font-mono text-sm font-bold">{s.avgScore}%</span>
              </div>
            );
          })}
        </div>
      )}

      {(() => {
        const monIds = new Set(mondaySubs.map(s => s.employeeId));
        const missing = data.employees.filter(e => !monIds.has(e.id));
        if (missing.length === 0) return null;
        return (
          <div className="mb-8 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <p className="text-amber-400 text-xs uppercase tracking-widest font-medium mb-3">Missing Monday Focus</p>
            {missing.map(emp => (
              <div key={emp.id} className="py-1.5">
                <span className="text-white text-sm">{emp.name}</span>
                <span className="text-gray-600 mx-2">&middot;</span>
                <span className="text-gray-500 text-sm">{emp.tier}</span>
                <span className="text-gray-600 mx-2">&middot;</span>
                <span className="text-gray-500 text-sm">{emp.division}</span>
              </div>
            ))}
          </div>
        );
      })()}

      <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-medium">By Division</p>
      {Object.entries(divGroups).map(([div, emps]) => (
        <div key={div} className="mb-6 p-4 rounded-lg border border-gray-800 bg-gray-900/30">
          <p className="text-white text-sm font-semibold mb-3">{div}</p>
          <div className="space-y-2">
            {emps.map(emp => {
              const mon = data.submissions.find(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "monday");
              const fri = data.submissions.find(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "friday");
              return (
                <div key={emp.id} className="flex items-center justify-between py-1.5 border-b border-gray-800/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">{emp.name}</span>
                    <span className="text-gray-700 text-xs uppercase">{emp.tier}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${mon ? "text-emerald-400" : "text-gray-700"}`}>Mon {mon ? "\u2713" : "\u2014"}</span>
                    <span className={`text-xs ${fri ? "text-emerald-400" : "text-gray-700"}`}>Fri {fri ? "\u2713" : "\u2014"}</span>
                    {fri && <span className={`font-mono text-xs font-bold ${fri.avgScore >= CONFIG.ADHERENCE_THRESHOLD ? "text-emerald-400" : "text-red-400"}`}>{fri.avgScore}%</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 rounded-lg border border-gray-800 bg-gray-900/30">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-medium">Export This Week</p>
        <button
          onClick={() => {
            const lines = ["Leader,Division,Tier,Monday Focus 1,Monday Focus 2,Monday Focus 3,Friday Recap 1,Friday Recap 2,Friday Recap 3,Score 1,Score 2,Score 3,Avg Score"];
            data.employees.forEach(emp => {
              const mon = data.submissions.find(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "monday");
              const fri = data.submissions.find(s => s.employeeId === emp.id && s.weekId === weekId && s.type === "friday");
              lines.push([
                `"${emp.name}"`, `"${emp.division}"`, emp.tier,
                ...(mon?.focuses || ["", "", ""]).map(f => `"${f.replace(/"/g, '""')}"`),
                ...(fri?.recaps || ["", "", ""]).map(r => `"${r.replace(/"/g, '""')}"`),
                ...(fri?.scores || ["", "", ""]),
                fri?.avgScore || ""
              ].join(","));
            });
            const blob = new Blob([lines.join("\n")], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `${CONFIG.STORAGE_KEY}-${weekId}.csv`; a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors border border-gray-800"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "white" }) {
  const colorMap = { white: "text-white", emerald: "text-emerald-400", amber: "text-amber-400", red: "text-red-400" };
  return (
    <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/30 text-center">
      <div className={`text-lg font-bold font-mono ${colorMap[color] || colorMap.white}`}>{value}</div>
      <div className="text-gray-600 text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block font-medium">{label}</label>
      {children}
    </div>
  );
}
