# Offboarding Standards

When I leave a project behind, the documentation **is** the handoff — often there's no named
successor at the time, so a future researcher has to run and trust the work from what's written
down alone. These are the standards I try to hold my own projects to before I'd call one
"offboarded." They're distilled from [`va_consolidated`](../repositories/va-consolidated.md), the
most fully documented handoff I've done, and they're the bar I hold the projects I hand off
directly from this hub (e.g. `ccylc_2025`) to. They're my standards, not lab policy — but I think
they're a reasonable bar for anything you want a stranger to be able to run.

!!! abstract "The one principle"
    A future researcher with **Scribe access and Stata**, but **no contact with the author**,
    can reproduce the analysis from the repo alone. Everything below serves that goal.

---

## Required artifacts (the checklist)

A repo is offboarding-ready when all of these are true:

- [ ] **A single master script runs the whole pipeline.** One entry point — `do/main.do` (or `do/master.do`) — runs every step in dependency order. There is one answer to "what do I run?": `stata-mp -b do do/main.do`.
- [ ] **A handoff README.** Plain-language, written for someone comfortable with Stata but possibly new to git. It covers: what the repo is, the one command to run it, how to run part of it, where outputs land, what *not* to touch, where things are documented, what to do when something breaks, and who to contact.
- [ ] **A per-file input/output map.** The README documents **every do file in the pipeline**: its purpose, its inputs, and its outputs. This is what lets the next person trace the dependency chain. (See the [README template](readme-template.md).)
- [ ] **A completed server run.** The full pipeline has been run end-to-end on Scribe and verified — logs present for every step, no errors, and any automated checks pass. Record the date and runtime.
- [ ] **Code/data separation.** Code, docs, and shippable tables/figures live on GitHub; restricted data lives only on Scribe. Data directories are gitignored; run logs *are* tracked (PII scrubbed) for version history. No credentials or PII in any tracked file.
- [ ] **Reproducible inputs.** Nothing is downloaded live at run time (pin a local copy instead); seeds are set; scripts write inside the repo's own output folders, not back into raw-data or predecessor locations.
- [ ] **Automated sanity checks (where feasible).** A final step asserts the results are in-range (sample sizes, merge rates, value ranges) and **fails loudly** if an upstream change breaks something.
- [ ] **Decision records.** The "why" behind load-bearing choices is written down ([ADRs](#whats-a-decision-record-adr) in `decisions/`, or a clearly-labeled section of the README for lightweight projects).
- [ ] **Contacts.** The README names who to ask: the author (offboarding-era email).

---

## What's a decision record (ADR)?

Several of these standards mention **ADRs** in a repo's `decisions/` folder — worth a definition,
since the repos reference them throughout. An ADR (*Architecture / Any Decision Record*) is a
short Markdown file capturing **one** load-bearing choice: its context, the decision, and the
consequences. ADRs are numbered (`0001_slug.md`, `0002_…`) and **append-only** — you don't rewrite
a past decision, you supersede it with a new one that references it. For a successor they answer
the question a code diff can't: *why* is it built this way? Read them before changing a
load-bearing parameter, and add a new one whenever you make a choice the next person would
otherwise have to reverse-engineer.

## Scaling to project size

Not every project is `va_consolidated`. A one-month, single-do-file project (see
[`calpads`](../repositories/calpads.md)) doesn't need ADRs or a golden-master comparison — but
it still needs a handoff README with a per-file I/O map, a runnable entry point, and a verified
server run. **Match the rigor to the project; never skip the README and the I/O map.**

| Standard | Lightweight project | Full pipeline |
|---|---|---|
| Handoff README + per-file I/O map | Required | Required |
| Single master script | Required | Required |
| Completed server run | Required | Required |
| Code/data separation | Required | Required |
| Automated checks | Nice to have | Required |
| Decision records | A README section | `decisions/` ADRs |
| Golden-master reproduction | — | Required (for consolidations) |

---

## Preserving project documentation

Offboarding also means preserving the project's **written** record (design docs, methodology
notes, meeting notes, report drafts) before access to lab systems lapses. I keep these in a
**private folder shared with the lab** — not in this hub.

!!! note "Why they're not here"
    This hub is a **public** repository, and project documents can hold restricted student data,
    PII, unpublished results, or internal discussion — so they don't belong here. They live in the
    lab-shared private store, which gates access appropriately. Before you leave, transfer
    ownership of anything the lab needs to keep to a lab account so the docs survive your departure.
