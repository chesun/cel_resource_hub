# Logging: Session Logs

**Location:** `quality_reports/session_logs/YYYY-MM-DD_description.md`

Keep a running narrative of each working session so the next person (or the next session)
can reconstruct what happened and why.

## Triggers (proactive)

1. **Start of session** — after a plan is set, capture the goal, approach, and key context.
2. **Incremental** — append 1–3 lines whenever a decision is made, a problem is solved, the user corrects something, or the approach changes. Don't batch.
3. **End of session** — short summary, open questions, blockers.

## Hard-cap reminder (enforced)

The Stop hook `.claude/hooks/log-reminder.py` fires if ~10 responses pass without a
session-log edit (or if none exists yet). When it fires, append progress to the most recent
session log before stopping. The hook is a safety net for the incremental rule.

## What belongs elsewhere

- **Decisions** → an ADR in `decisions/` (the log records the process; the ADR records the verdict).
- **Open tasks** → `TODO.md`.
- **Long review output** → `quality_reports/reviews/` (see `output-length.md`).
