# Workflow: Plan First, Persist the Plan

**For any non-trivial change, enter plan mode before editing.** Trivial fixes (a typo, one
link, a single short paragraph) don't need a plan.

## Protocol

1. **Enter plan mode** (`EnterPlanMode`) for multi-file changes, new sections, restructuring, or anything ambiguous.
2. **Draft the plan** — what changes, which files, in what order, how you'll verify.
3. **Get approval**, then exit plan mode.
4. **Save the plan to disk** at `quality_reports/plans/YYYY-MM-DD_short-slug.md` and add a line to `quality_reports/plans/INDEX.md`.

## Why persist

Terminal output and the harness plan file are ephemeral; the project record is not. A saved
plan survives context compression and lets the next session pick up where this one left off.

## Enforcement

The Stop hook `.claude/hooks/plan-persist-check.py` blocks turn-end (once) if plan mode was
used this session but no `quality_reports/plans/*.md` was written. To satisfy it: copy the
plan to disk after approval.
