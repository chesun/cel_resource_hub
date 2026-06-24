# TODO — CEL Resource Hub

Last updated: 2026-06-24

## Active (doing now)
- (nothing blocking — core hub is live; remaining items are content fill-in)

## Up Next
- (nothing — core hub complete; the academic-site link is handled directly in the `chesun.github.io` site repo)

## Waiting On
- (nothing)

## Backlog
- (nothing)

## Done (recent — older history in git + `quality_reports/session_logs/`)
- [x] **VSCode-Stata demo — tighter crop:** re-cropped the clip + poster to `1186×1044+52+32` (drop the left activity-bar icons, top title bar, bottom status bar, right scrollbar/dead margin; nothing code/terminal clipped — right is capped by the full-width line-37 comment). Renamed `-v2`→`-v3` to bust cache, updated the 3 refs in `editing-stata-vscode.md`, removed v2; `mkdocs build --strict` exit 0 — 2026-06-24
- [x] New workflow-tips page **Versioning data with DVC** (`versioning-data-with-dvc.md`): ported the tested draft from `claude-research-workflow`, enriched (reproducibility tie-in, gitignore root-vs-nested aside, two-scales invitation), genericized voice (no named person). Vendored the 4 tested scripts + README into top-level `dvc-scripts/` (excluded from the site build); inbound cross-links from reproducible-pipelines + data-safety; ADR-0004; nav + index wired — 2026-06-23
- [x] New Resources page **LaTeX Beamer templates** (`resources/latex-beamer-templates.md`) for the `latex_templates` repo: orientation + unofficial disclaimer, title-slide preview thumbnails (UC Davis + CEL, linked to the sample PDFs), three-theme table, Overleaf quickstart with the raw `.sty` URLs, CEL specifics, pointer to the repo README for local compiles. Wired into Resources index + nav — 2026-06-23
- [x] git page: added a `git on Scribe, not just your laptop` section before the Scribe error table (was abrupt) — Scribe has git; `git init` a repo in a project folder there + push/pull to GitHub from the server; many don't know it's available server-side; hands off to Local ↔ server sync — 2026-06-23
- [x] Academic-site portfolio link → Christina will handle it directly in `chesun.github.io` (out of scope for this repo). calpads Scribe path confirmed correct — 2026-06-23
- [x] **VSCode-Stata demo video** on *Editing Stata in VSCode* — recorded real walkthrough; ffmpeg trim/crop (cropdetect for black margins) + variable-speed cut (~69s) + regress-autocomplete poster; play-on-scroll `<video>` (no chrome, click to pause), full-width. Fixed the grey-box bug: raw-HTML media must use `../img/` on directory-URL pages — captured in memory — 2026-06-23
- [x] Wired `csac2025` = offboarding complete (real README now the handoff guide): status, Start-with, doc map, index, "What it is" + offboarding note. Cleared the README-expand backlog item — 2026-06-23
- [x] Project Google Docs: pointed the offboarding page at the Box archive location (folder path only — `California Education Lab - Full Team Access → GSR Exit → Christina → Ed Lab Google Doc Archive`; no drive prefix; access gated by Box) — 2026-06-23
- [x] Voice fix: `gitignore-setup`'s "the lab prefers git over manual transfer" → "I prefer" (nothing in the hub is the lab's position except data security); swept for other lab-as-opinion phrasings (none); saved a `personal-voice-not-lab` memory — 2026-06-22
- [x] README linkbacks: added a hub pointer atop every analysis repo's README (+ csac2025 `CLAUDE.md`), pushed all six individually — 2026-06-22

_(older items pruned — full history in git + `quality_reports/session_logs/`)_
