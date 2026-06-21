# TODO — CEL Resource Hub

Last updated: 2026-06-21

## Active (doing now)
- [ ] Provide source facts to fill the `TODO`s (see Up Next) — blocks accurate repo pages

## Up Next
- [ ] Add `calpads` repo URL + description (not present locally; needs source facts)
- [ ] Confirm `csac_2024` and `ccylc_2025` descriptions and status; expand what **CCYLC** stands for
- [ ] Confirm each repo's visibility (public/private) and note it on the repo index
- [ ] Optional: switch `site_url` to `https://christinasun.net/cel_resource_hub/` if the custom domain should be canonical (currently set to the github.io URL, which 301-redirects there)

## Waiting On
- [ ] From Christina: Scribe run paths per project; custodian (Kramer?) email; lab-IT contact + escalation path

## Backlog
- [ ] Fill workflow-tip stubs (git, Scribe/SSH, data safety, reproducible pipelines, Claude Code)
- [ ] Fill resource stubs (contacts table, tools & access)
- [ ] Add short `README.md`/`HANDOFF.md` to `csac_2024` and `ccylc_2025` (modeled on `va_consolidated`)
- [ ] Decide whether `csac2025`'s minimal README should be expanded or point to its `CLAUDE.md`
- [ ] Delete the old `cel_offboard` folder (the stray `claude-research-workflow` clone) once happy

## Done (recent)
- [x] Scaffold MkDocs Material site + repository index + detail pages — 2026-06-21
- [x] Port workflow infrastructure (hooks, rules, ADRs, logging, docs-writer/critic) — 2026-06-21
- [x] Verify strict build + hook tests pass — 2026-06-21
- [x] Create public GitHub repo `chesun/cel_resource_hub`, push — 2026-06-21
- [x] Enable GitHub Pages (gh-pages branch); site live at chesun.github.io/cel_resource_hub/ → christinasun.net/cel_resource_hub/ — 2026-06-21
- [x] Set `site_url` in `mkdocs.yml` — 2026-06-21
