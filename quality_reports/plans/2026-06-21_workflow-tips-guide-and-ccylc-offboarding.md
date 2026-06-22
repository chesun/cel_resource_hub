# Plan — Workflow-tips comprehensive guide + ccylc_2025 offboarding

**Date:** 2026-06-21
**Status:** APPROVED (direction confirmed by user)
**Repos touched:** `cel_resource_hub` (docs), `ccylc_2025` (handoff README)

## Goal

Two things the user asked for, in one session:

1. Grow the **Workflow Tips** section from seeded outlines into a *comprehensive
   workflow guide + tips*, adding: a gitignore-for-data-security guide, GUI Stata on the
   server (and why it's risky), the two local↔server sync methods (FileZilla vs git) with
   benefits/costs, and a local-VSCode editing recommendation (replacing the lab habit of
   writing Stata interactively in the server GUI, which loses work when the connection drops).
2. **Start the ccylc_2025 offboarding** — draft the handoff README, update the hub's ccylc
   page, commit and push.

## Decisions locked with the user

- Editing/sync scope: **local editing + local↔remote sync only (FileZilla or git)**. No
  VSCode Remote-SSH / edit-on-server. Still document GUI Stata on the server as the practice
  being replaced.
- Structure: **overview page + expanded/added tip pages**.
- ccylc: **draft README + hub page, then commit and push.**

## Part A — Workflow Tips (`cel_resource_hub/docs/workflow-tips/`)

New pages:

- `recommended-workflow.md` — the end-to-end overview ("comprehensive guide"): edit `.do`
  files locally in VSCode → sync to Scribe (FileZilla or git) → run in **batch** on Scribe →
  outputs stay on Scribe → ship code/results via GitHub. The develop loop and the one rule.
- `editing-stata-vscode.md` — write Stata locally in VSCode (Stata extension); why NOT to
  write code in the interactive Stata GUI on the server (lost work, no version control, not
  reproducible); the batch-run model. Links to the Scribe page for GUI-on-server specifics.
- `local-server-sync.md` — the two methods (A FileZilla / manual transfer, B git) with a
  benefits/costs comparison table, when to use each, and the data-egress safety angle.
- `gitignore-setup.md` — gitignore setup for data security: copy-paste template (from the
  ccylc / va_consolidated patterns), how to verify nothing sensitive is tracked, and what to
  do if data was committed by accident.

Expanded/updated:

- `scribe-ssh-setup.md` — add "Running Stata: batch vs GUI": batch (`stata-mp -b do`, nohup)
  as the recommended path; GUI Stata via X11 forwarding (XQuartz / `ssh -X`) with its costs.
- `data-safety.md` — cross-link the new gitignore-setup guide.
- `git-for-newcomers.md` — cross-link the sync page; add a common-errors table (from the
  va_consolidated scribe-setup plan) and a short glossary.
- `index.md` — reframe as comprehensive guide + tips; link the overview and new pages.
- `mkdocs.yml` nav + `docs/index.md` card — wire in the new pages.

## Part B — ccylc_2025 offboarding

- `~/github_repos/ccylc_2025/README.md` — handoff README per the hub template (§1–8) with the
  **real per-file I/O map** (derived from the do files):

  | File | Purpose | Input | Output |
  |---|---|---|---|
  | `do/main.do` | Entry point — `cd`s to project, sources `settings.do`. **Currently a stub: does not yet call clean/explore.** | — | — |
  | `do/settings.do` | Sets `global projdir` | — | — |
  | `do/macros.doh` | Question-group locals + per-question display-logic criteria; `include`d by tab.do | — | — |
  | `do/clean/clean_qualtrics.do` | Clean the Qualtrics export | `dta/raw/ccylc_export_value.csv`, `dta/raw/ccylc_export_label.csv` **[external]** | `dta/cln/ccylc_2025_clean.dta`, `log/clean/clean_qualtrics.txt` |
  | `do/explore/tab.do` | Tabulate every question by display-logic population | `dta/cln/ccylc_2025_clean.dta` | `log/explore/tab.txt` |

  - Scribe path: `/home/research/ca_ed_lab/projects/ccylc` (from `main.do:10` + `settings.do:17`).
  - Flag the `main.do` stub gap and document the true run order to reproduce.
  - Note raw data contains respondent emails (minors' PII) → why `dta/` is gitignored.
  - Mark `[VERIFY]`: completed server run + cold-read test (need Scribe access).

- `docs/repositories/ccylc-2025.md` — fill Scribe path, status, folder-map detail
  (`dta/raw`, `dta/cln`, `log/clean`, `log/explore`), per-file I/O summary, link to repo README.
- `docs/repositories/index.md` — update the ccylc status cell ("No README" → "README drafted").

## Records

- ADR `decisions/0002_workflow-tips-comprehensive-guide.md` — the standards decision.
- Session log `quality_reports/session_logs/2026-06-21_workflow-tips-and-ccylc.md`.

## Verify + ship

- `source .venv/bin/activate && mkdocs build --strict` must pass (no broken nav/links).
- Commits (atomic):
  - hub: (1) workflow-tips guide expansion + nav, (2) ccylc hub page + repo-index status.
  - ccylc_2025: (1) handoff README.
- Push both repos. Hub push auto-deploys via GitHub Pages.

## Out of scope (flagged, not done)

- Wiring `main.do` to actually call clean/explore (a code change that needs a Scribe run to
  verify) — flagged in the README + reported to the user as the recommended next step.
- The completed-server-run and cold-read acceptance tests (need Scribe access).
</content>
