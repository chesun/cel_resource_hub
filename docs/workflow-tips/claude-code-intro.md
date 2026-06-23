# Claude Code intro

Several CEL repos contain a `.claude/` folder and files like `CLAUDE.md`, `MEMORY.md`, and
`SESSION_REPORT.md`. These come from **Claude Code**, the AI-assisted tooling used to build
and document the repos.

!!! success "You can ignore all of it to run the analysis"
    The pipeline is ordinary Stata. The `.claude/` configuration is **not part of the
    pipeline** — you never need it to clean data, estimate, or produce tables and figures.

## What the files are, if you're curious

- **`CLAUDE.md`** — project map and conventions; the AI reads it each session. Often the most
  complete single description of a repo.
- **`MEMORY.md`** — accumulated learnings and gotchas discovered during the work. Genuinely
  useful when debugging, even if you never run the AI tooling.
- **`SESSION_REPORT.md` / `quality_reports/session_logs/`** — chronological work logs.
- **`.claude/`** — rules, agent definitions, and hooks that shape how the AI assists. Safe to
  ignore.

## If you want to use it

Claude Code is an optional productivity tool, not a lab requirement. The agents, rules, and hooks
you see in these repos come from my own template,
**[Claude Code Research Workflow](https://github.com/chesun/claude-research-workflow)** — a
fork-and-adapt foundation for AI-assisted empirical research (discovery, data engineering,
analysis, writing, peer review). If you want to work this way on a new project, fork it and adapt;
its `docs/` cover getting started, the agents and skills, and customization. It's an evolving
preview release, so expect it to change.
