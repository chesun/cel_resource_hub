# TODO — CEL Resource Hub

Last updated: 2026-06-21

## Active (doing now)
- (nothing blocking — core hub is live; remaining items are content fill-in)

## Up Next
- [ ] Author to **commit + push** `csac_2024`'s drafted README (currently local-only) so the hub link resolves
- [ ] Finish `ccylc_2025` offboarding: handoff README + per-file I/O map ✅, `do/main.do` wired to run the full pipeline ✅ — **remaining: a verified end-to-end Scribe run + cold-read test** (needs Scribe access)
- [ ] Decide Google Docs hosting approach (sensitivity triage; public-safe → Markdown in hub, sensitive → private store + link), then add "Related documents" sections to repo pages
- [ ] Optional: switch `site_url` to `https://christinasun.net/cel_resource_hub/` if the custom domain should be canonical (currently set to the github.io URL, which 301-redirects there)

## Waiting On
- [ ] From Christina: Scribe run paths per project (to verify end-to-end runs)

## Backlog
- [ ] **Comprehensive "Downloads & setup" page** — links to download useful apps (VSCode, an SSH / file-transfer client, etc.) and step-by-step install tips, including how to install Claude Code. Design the scope/structure first; likely consolidates with `resources/tools.md` and `workflow-tips/claude-code-intro.md`. (Idea captured — think it through before building.)
- [ ] Expand `resources/tools.md` (or fold it into the Downloads & setup page above); fill remaining `TODO`s (canonical host string, etc.)
- [ ] Decide whether `csac2025`'s minimal README should be expanded or point to its `CLAUDE.md`
- [ ] Delete the old `cel_offboard` folder (the stray `claude-research-workflow` clone) once happy

## Done (recent)
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
