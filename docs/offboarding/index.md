# Offboarding Standards

When a project leaves CEL with its author, the documentation **is** the handoff — often there
is no named successor at the time, so a future researcher has to run and trust the work from
what's written down alone. These standards define what "offboarding-ready" means for a CEL
analysis repo. They are distilled from [`va_consolidated`](../repositories/va-consolidated.md),
the most fully offboarded repo in the lab, and they are the bar that projects handled directly
from this hub (e.g. `ccylc_2025`) are held to.

!!! abstract "The one principle"
    A future researcher with **Scribe access and Stata**, but **no contact with the author**,
    can reproduce the analysis from the repo alone. Everything below serves that test.

---

## Required artifacts (the checklist)

A repo is offboarding-ready when all of these are true:

- [ ] **A single master script runs the whole pipeline.** One entry point — `do/main.do` (or `do/master.do`) — runs every step in dependency order. There is one answer to "what do I run?": `stata-mp -b do do/main.do`.
- [ ] **A handoff README.** Plain-language, written for someone comfortable with Stata but possibly new to git. It covers: what the repo is, the one command to run it, how to run part of it, where outputs land, what *not* to touch, where things are documented, what to do when something breaks, and who to contact.
- [ ] **A per-file input/output map.** The README documents **every do file in the pipeline**: its purpose, its inputs, and its outputs. This is what lets the next person trace the dependency chain. (See the [README template](readme-template.md).)
- [ ] **A completed server run.** The full pipeline has been run end-to-end on Scribe and verified — logs present for every step, no errors, and any automated checks pass. Record the date and runtime.
- [ ] **Code/data separation.** Code, docs, and shippable tables/figures live on GitHub; restricted data lives only on Scribe. Data directories are gitignored. No credentials or PII in any tracked file.
- [ ] **Reproducible inputs.** Nothing is downloaded live at run time (pin a local copy instead); seeds are set; scripts write inside the repo's own output folders, not back into raw-data or predecessor locations.
- [ ] **Automated sanity checks (where feasible).** A final step asserts the results are in-range (sample sizes, merge rates, value ranges) and **fails loudly** if an upstream change breaks something.
- [ ] **Decision records.** The "why" behind load-bearing choices is written down (ADRs in `decisions/`, or a clearly-labeled section of the README for lightweight projects).
- [ ] **Contacts.** The README names who to ask: the author (offboarding-era email), the data-management custodian, and lab IT.
- [ ] **A cold-read test.** Someone who is *not* the author runs the pipeline from the README alone, on Scribe, and it works. This is the acceptance test — it catches the tacit knowledge the author didn't realize they were relying on.

---

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
notes, meeting notes, report drafts) before access to lab systems lapses. The hub links to
that documentation per project — see [Project documents](#project-documents-google-docs) below
for how, and the **important caveat** about this being a public repo.

### Project documents (Google Docs)

As authors leave, their Google Docs can become inaccessible. The plan is to preserve them and
link to them per project from this hub.

!!! danger "This is a public repository"
    Do **not** commit documents that contain restricted student data, personally identifiable
    information, unpublished sensitive results, or internal-only discussion to this repo. Anyone
    can read it. Triage every doc before it goes anywhere near the hub.

Recommended handling, by sensitivity:

- **Public-safe docs** (methodology notes, published-report drafts, how-tos) → convert to Markdown and host in the hub, so they render and are searchable; or commit the PDF and link it.
- **Internal / sensitive docs** → keep them in a **private** store (a private repo, lab-owned Drive, or Scribe) and link to them from the hub. The link gates at that store's access; nothing sensitive is published.
- **Ownership** → before leaving, transfer Drive ownership of anything the lab needs to keep to a lab account, so the docs survive your account.

Once the triage is decided, each repo's detail page gets a **"Related documents"** section
linking its docs.
