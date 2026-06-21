# CLAUDE.md — CEL Resource Hub

**Project:** CEL Resource Hub
**Institution:** California Education Lab, UC Davis
**Type:** Documentation site (MkDocs Material → GitHub Pages)
**Primary content:** Markdown under `docs/`

This repo is a **documentation hub**, not a research/analysis repo. There is no Stata/R/LaTeX
pipeline here — the content is Markdown, built into a static site. Keep that in mind: the
infrastructure below is the *useful subset* of the lab's research workflow, adapted for docs.

---

## What this is

A central, browsable hub for the California Education Lab that links to the lab's code
repositories (especially offboarding deliverables) and collects reusable workflow guidance
for the people who inherit them. Audience: someone inheriting a CEL project — comfortable
with Stata, often new to git/Claude Code, running analysis on the Scribe server. See
`docs/index.md`.

---

## Core principles

- **Plan first** — for non-trivial changes, enter plan mode, then save the plan to `quality_reports/plans/` (see `workflow.md`; a Stop hook enforces persistence).
- **Verify after** — before committing, run `mkdocs build --strict` and confirm it passes (no broken nav/links). See `verification-protocol.md`.
- **Log the session** — keep a running session log in `quality_reports/session_logs/` (see `logging.md`; a Stop hook reminds you).
- **Decisions are ADRs** — substantive decisions (naming, tooling, what to include) go in `decisions/NNNN_slug.md`, append-only (see `decision-log.md`).
- **Track TODOs** — open work lives in root `TODO.md` (see `todo-tracking.md`).
- **Don't guess facts** — repo URLs, Scribe paths, contacts: derive from the source or mark `TODO`; never fabricate (see `no-assumptions.md`).
- **Evidence over assertion** — "it builds / the link works" is a claim that needs the command output behind it (see `adversarial-default.md`).
- **Git safety** — history-rewrite and shared-storage deletes are hook-guarded (see `destructive-actions.md`).

---

## Folder structure

```
cel_resource_hub/
├── CLAUDE.md, README.md, TODO.md
├── mkdocs.yml                 # site config + nav
├── requirements.txt           # mkdocs-material (+ pytest for hook tests)
├── .github/workflows/         # GitHub Pages deploy
├── docs/                      # ALL site content (Markdown)
│   ├── index.md
│   ├── repositories/          # one page per linked CEL repo + index
│   ├── workflow-tips/         # reusable how-to guides
│   └── resources/             # contacts, tools, access
├── decisions/                 # ADRs (append-only) + README index
├── quality_reports/
│   ├── plans/                 # saved plans (plan-first)
│   ├── reviews/               # docs-critic review reports
│   └── session_logs/          # session narrative
└── .claude/                   # rules, agents, hooks, settings, state
```

---

## Commands

```bash
# Local preview (auto-reload at http://127.0.0.1:8000)
source .venv/bin/activate && mkdocs serve

# Strict build (what to run before committing)
mkdocs build --strict

# Run hook tests
.venv/bin/python -m pytest .claude/hooks/test_stop_hooks_lib.py -q
python3 .claude/hooks/test_destructive_action_guard.py
```

Publishing: a push to `main` runs `.github/workflows/deploy.yml`, which builds and deploys to
the `gh-pages` branch. Set **Settings → Pages → Source = gh-pages** once in GitHub.

---

## Agents (worker–critic pair)

| Worker | Critic | What it does |
|---|---|---|
| `docs-writer` | `docs-critic` | Drafts/updates hub documentation; the critic reviews for clarity, accuracy, broken links, and dead placeholders. Critics never edit source — they write a review report (see `agents.md`). |

---

## Rules index (`.claude/rules/`)

`workflow.md` · `logging.md` · `decision-log.md` · `todo-tracking.md` · `output-length.md` ·
`verification-protocol.md` · `no-assumptions.md` · `adversarial-default.md` ·
`destructive-actions.md` · `agents.md`
