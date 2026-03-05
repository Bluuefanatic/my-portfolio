#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}" exec node ./server.js