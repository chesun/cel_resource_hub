# TODO — CEL Resource Hub

Last updated: 2026-06-22

## Active (doing now)
- (nothing blocking — core hub is live; remaining items are content fill-in)

## Up Next
- [ ] Decide Google Docs hosting approach (sensitivity triage; public-safe → Markdown in hub, sensitive → private store + link), then add "Related documents" sections to repo pages
- [ ] Optional: switch `site_url` to `https://christinasun.net/cel_resource_hub/` if the custom domain should be canonical (currently set to the github.io URL, which 301-redirects there)

## Waiting On
- [ ] From Christina: Scribe run paths per project (to verify end-to-end runs)

## Backlog
- [ ] Decide whether `csac2025`'s minimal README should be expanded or point to its `CLAUDE.md`
- [ ] Delete the old `cel_offboard` folder (the stray `claude-research-workflow` clone) once happy — **first preserve `master_supporting_docs/lab_guides/`** (source `.docx` onboarding guides, incl. the illustrated Windows XStata walkthrough); their text is distilled into the hub but the originals/screenshots aren't hosted yet

## Done (recent)
- [x] Status updates (verified against the repos): `csac_2024` offboarding **complete** — README pushed, `main.do` runs the full pipeline (settings→clean→explore→sample→share), verified Scribe run (commit `a2bf2d2`); removed the stale "mid-buildout/not-pushed/incomplete" notes. `ccylc_2025` offboarding **complete** and **no longer described as archived**. Updated both detail pages + the index table — 2026-06-22
- [x] `csac_2024` is now public: removed the private callout + Access column from the repositories index (all repos public), flipped its detail-page GitHub row to public, and fixed the leftover "csac_2024 is private" mentions in `tools.md` + `git-for-newcomers.md` — 2026-06-22
- [x] Uniform repository naming `Name (repo)` across nav titles + each detail-page H1; aligned the index table's Project column friendly names (Value Added, CALPADS, …). Used the real repo name `ccylc_2025` (user wrote `ccylc2025`) — 2026-06-22
- [x] Fixed a strawman in the "write locally vs. on the server" framing across `recommended-workflow.md`, `editing-stata-vscode.md`, and `working-on-scribe.md` — the alternative isn't "throwaway console commands with no saved script"; people write `.do` files in Stata's GUI editor on the server. Reframed the real trade-off as laptop editor + git + connection-independence vs. the server GUI editor — 2026-06-22
- [x] `local-server-sync.md`: reframed Method B around **GitHub as the middleman** (added a Mermaid diagram; enabled mermaid in `mkdocs.yml`), noted Method B is so far only set up for `va_consolidated` (complex consolidation; works well) with FileZilla still the default for simpler projects, and documented the **pre-push data hook** armed on the Scribe clone (`core.hooksPath .githooks`, trip test, `--no-verify`). Reconciled the Method A `.git/` tip + added a shared-server token caveat; pointed data-safety/gitignore cross-links at the new subsection — 2026-06-21
- [x] `git-for-newcomers.md`: added a "git vs GitHub" concept section, a "Getting access & a copy from GitHub" section (web Download-ZIP + private-repo access), and a real Personal Access Token walkthrough (expanded from the cryptic error-table line); glossary + error-table cross-ref updated — 2026-06-21
- [x] Expanded `resources/tools.md` into a downloads + setup hub (Essentials / Situational tables, official download links for every tool, cross-links to each how-to); folded in the "Downloads & setup" backlog idea; confirmed host string already canonical. Removed the Stata-licensing TODO — everyone has Scribe access, so it's irrelevant — 2026-06-21
- [x] `ccylc_2025` offboarding complete; repo archived (per its README, the Scribe run was recorded 2026-06-21) — 2026-06-21
- [x] Published the illustrated XStata-on-Windows (Xming + PuTTY) guide; integrated the lab onboarding guides into Working on Scribe — 2026-06-21
- [x] Offboarding standard updated: dropped the cold-read requirement; run logs tracked in git (PII-scrubbed) — 2026-06-21
- [x] Expand Workflow Tips into a comprehensive guide (recommended-workflow overview + VSCode, local↔server sync, gitignore-for-data, batch-vs-GUI); reframe to a personal-project voice — 2026-06-21
- [x] `ccylc_2025`: handoff README + per-file I/O map; wire `do/main.do` to run the full pipeline — 2026-06-21
- [x] Simplify Contacts to just my contact (drop lab-personnel table + partner orgs) — 2026-06-21
- [x] Render Material icons (add `pymdownx.emoji`) — 2026-06-21
- [x] Scaffold MkDocs Material site + repository index + detail pages — 2026-06-21
- [x] Port workflow infrastructure (hooks, rules, ADRs, logging, docs-writer/critic) — 2026-06-21
- [x] Verify strict build + hook tests pass — 2026-06-21
- [x] Create public GitHub repo `chesun/cel_resource_hub`, push — 2026-06-21
- [x] Enable GitHub Pages (gh-pages branch); site live at chesun.github.io/cel_resource_hub/ → christinasun.net/cel_resource_hub/ — 2026-06-21
- [x] Set `site_url` in `mkdocs.yml` — 2026-06-21
- [x] Confirm repo visibility for all repos (csac_2024 private; rest public) — 2026-06-21
- [x] Fill CCYLC = Cesar Chavez Youth Leadership Conference; describe as post-conference survey analysis — 2026-06-21
- [x] Confirm `csac_2024` has no README (local + GitHub) → now README being drafted by author — 2026-06-21
- [x] Wire in `calpads` repo (now public at chesun/calpads): CALPADS EOY1 Course-Completion cleaning, entry `do/master.do` — 2026-06-21
- [x] Fill `csac_2024` page from drafted README (CSAC/C2C 2024 survey); flag README not yet pushed — 2026-06-21
- [x] Add Offboarding Standards section (checklist + handoff README template), derived from va_consolidated — 2026-06-21
