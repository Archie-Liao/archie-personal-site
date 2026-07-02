#!/usr/bin/env node
/**
 * sessionStart: inject reminder to follow COMPLEX-TASK-GATE on complex tasks.
 * stdin: Cursor hook JSON (sessionStart event)
 * stdout: optional JSON with additional context (if supported by Cursor version)
 */
import { readFileSync } from 'node:fs';

let input = '';
try {
  input = readFileSync(0, 'utf8');
} catch {
  input = '';
}

// Always log for Hooks output channel debugging
const reminder =
  '[COMPLEX-TASK-GATE] 命中复杂任务/探讨/IA/规划时，首条回复必须以 ## 复述需求 开头。细则：docs/COMPLEX-TASK-GATE.md';

try {
  const payload = input ? JSON.parse(input) : {};
  console.log(
    JSON.stringify({
      additional_context: reminder,
      session_id: payload.session_id ?? undefined,
    }),
  );
} catch {
  console.log(JSON.stringify({ additional_context: reminder }));
}
