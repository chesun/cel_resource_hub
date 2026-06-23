# Cesar Chavez Youth Leadership Conference 2025 (ccylc_2025)

A lightweight analysis of the survey data fielded **after the Cesar Chavez Youth Leadership
Conference (CCYLC)** in 2025.

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/ccylc_2025> |
| **Runs on (Scribe)** | `/home/research/ca_ed_lab/projects/ccylc` |
| **Entry point** | `do/main.do` — runs the full pipeline (`settings` → `clean` → `explore`) |
| **Status** | Offboarding complete |
| **Start with** | The repo's [`README.md`](https://github.com/chesun/ccylc_2025#readme) — the per-file I/O map is there |

## What it is

A small, post-conference survey analysis. Responses came from attendees (students, parents/
guardians, and school staff) after the 2025 youth leadership conference. The code cleans the
Qualtrics export into a labeled analysis dataset and tabulates every question by the population
that saw it (Qualtrics display logic is reconstructed in code).

**The survey data lives only on Scribe** (it includes respondent emails / minors' responses) —
never on a local machine and never in this repo. The code runs against it there; the cleaned
dataset stays on the server, and the run logs are committed to the repo (PII-free).

## Folder map (derived from the repo)

```
ccylc_2025/
├── do/
│   ├── main.do                 # entry point — runs settings -> clean -> explore
│   ├── settings.do             # defines $projdir
│   ├── macros.doh              # question-group lists + display-logic criteria
│   ├── clean/clean_qualtrics.do  # cleans the survey export
│   └── explore/tab.do          # tabulates every question
└── log/                        # run logs (committed; PII-free)
```

## Pipeline (what reads/writes what)

The data files all live on Scribe (never local); this maps what the code reads and writes there.

| Step | Reads | Writes |
|---|---|---|
| `clean/clean_qualtrics.do` | the Qualtrics survey export, value + label (on Scribe) **[external]** | a cleaned analysis dataset + clean log |
| `explore/tab.do` | the cleaned dataset (+ `do/macros.doh`) | a tabulation log |

!!! note "`do/main.do` runs the full pipeline"
    The entry point sources `settings.do`, then runs `clean/clean_qualtrics.do` and
    `explore/tab.do` in order, so `stata-mp -b do do/main.do` reproduces the analysis on Scribe.

!!! danger "Confidential survey data (Scribe only)"
    The Qualtrics export includes **respondent emails** and minors' responses. It lives only on
    Scribe — never on a local machine, never in GitHub — and must never be committed. See
    [Data safety](../workflow-tips/data-safety.md).

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).

## Offboarding status

- [x] Handoff `README.md` with per-file I/O map — written in the repo.
- [x] `main.do` wired to run the full pipeline (`settings` → `clean` → `explore`).
- [x] End-to-end server run recorded (2026-06-21) — ran clean on Scribe.

Offboarding is complete — a clean code handoff. See the
[offboarding standards](../offboarding/index.md) for what each item means.
