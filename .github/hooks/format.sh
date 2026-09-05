#!/usr/bin/env bash

set -euo pipefail

tool_name="$(
  node -e '
    const fs = require("node:fs");
    const payload = JSON.parse(fs.readFileSync(0, "utf8"));
    process.stdout.write(typeof payload.toolName === "string" ? payload.toolName : "");
  '
)"

if [[ "$tool_name" == "create" || "$tool_name" == "edit" ]]; then
  npx prettier --write .
fi
