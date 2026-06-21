# Output Length: Export Long Responses

**Scope:** all responses.

When a response would exceed **15 lines** of terminal output, write it to a Markdown file
instead of printing it inline — reports, summaries, plans, reviews, tables, structured
findings. Short confirmations, error messages, and follow-up questions always stay inline.

## Rules

- **> 15 lines** → write to a `.md` file (e.g. under `quality_reports/reviews/` or `quality_reports/plans/`) and give the user a short pointer inline.
- **≤ 15 lines** → print directly.

## Enforcement

Advisory, not blocking. The Stop hook `.claude/hooks/output-length-check.py` fires at
turn-end: if the final response exceeds 15 non-blank lines AND no `.md` file was written that
turn, it injects a reminder. Turns that already wrote a `.md` are exempt. A genuinely
conversational long answer can proceed.
