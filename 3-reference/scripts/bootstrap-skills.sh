#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "${script_dir}/../.." && pwd)"
target_dir="${repo_root}/3-reference/skills"
claude_dir="${HOME}/.claude"
link_path="${claude_dir}/skills"

mkdir -p "${claude_dir}"

if [ ! -d "${target_dir}" ]; then
  echo "Expected skills directory not found: ${target_dir}" >&2
  exit 1
fi

if [ -L "${link_path}" ]; then
  current_target="$(readlink "${link_path}")"
  if [ "${current_target}" = "${target_dir}" ]; then
    echo "Claude skills already linked to ${target_dir}"
    exit 0
  fi
  rm "${link_path}"
elif [ -e "${link_path}" ]; then
  backup_path="${link_path}.bak.$(date +%Y%m%d-%H%M%S)"
  mv "${link_path}" "${backup_path}"
  echo "Backed up existing ${link_path} to ${backup_path}"
fi

ln -s "${target_dir}" "${link_path}"
echo "Linked ${link_path} -> ${target_dir}"
