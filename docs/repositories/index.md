# Repositories

Every CEL code repository I'm handing off. Each row links to the GitHub repo and to a detail
page with how-to-run notes, server location, and status. All the repos are public; confidential
data is **never** in them — it lives only on Scribe.

| Project | Repo | What it is | Status | Detail |
|---|---|---|---|---|
| Value Added | [chesun/va_consolidated](https://github.com/chesun/va_consolidated) | Consolidated Stata pipeline behind the "Do Schools Matter?" school value-added paper | Offboarding deliverable; ships `HANDOFF.md` | [Details](va-consolidated.md) |
| CSAC 2023 Survey | [chesun/csac](https://github.com/chesun/csac) | 2023 California high school senior survey (CSAC × CCC admin data) | Offboarding complete (per repo README) | [Details](csac.md) |
| CSAC 2024 Survey | [chesun/csac_2024](https://github.com/chesun/csac_2024) | 2024 CA graduating senior survey (CSAC + C2C); backs two published 2024 reports | Offboarding complete | [Details](csac-2024.md) |
| CSAC 2025 Survey | [chesun/csac2025](https://github.com/chesun/csac2025) | 2025 CA high school senior survey (CSAC + C2C; FAFSA/CADAA filers) | Active/offboarding | [Details](csac-2025.md) |
| Cesar Chavez Youth Leadership Conference 2025 | [chesun/ccylc_2025](https://github.com/chesun/ccylc_2025) | Lightweight analysis of post-conference survey data | Offboarding complete | [Details](ccylc-2025.md) |
| CALPADS | [chesun/calpads](https://github.com/chesun/calpads) | Stata cleaning pipeline over CALPADS EOY1 Course Completion extracts (2013–14 to 2017–18) | Offboarding; ships handoff README | [Details](calpads.md) |

!!! note "Naming"
    The local folder names and GitHub repo names don't always match the project's short
    name (e.g. `csac_2024` has an underscore; `ccylc_2025` carries the year). The links
    above point to the canonical GitHub repos.

---

## What every detail page covers

To keep repos easy to inherit, each detail page aims to answer the same questions:

- **Where it lives** — GitHub URL and the Scribe path where it actually runs.
- **What it is** — one-paragraph description of the project and its output.
- **How to run it** — the single command, plus partial-run notes.
- **Status** — active, offboarding, or complete.
- **Who to ask** — author and custodian contacts.
- **Documentation** — link to the repo's README / `HANDOFF.md` / decision log.
