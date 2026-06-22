# Cesar Chavez Youth Leadership Conference 2025 — `ccylc_2025`

A lightweight analysis of the survey data fielded **after the Cesar Chavez Youth Leadership
Conference (CCYLC)** in 2025.

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/ccylc_2025> (public) |
| **Runs on (Scribe)** | `/home/research/ca_ed_lab/projects/ccylc` |
| **Entry point** | `do/main.do` — runs the full pipeline (`settings` → `clean` → `explore`) |
| **Status** | Offboarding — code archive (survey data purged); handoff `README.md` written |
| **Start with** | The repo's [`README.md`](https://github.com/chesun/ccylc_2025#readme) — the per-file I/O map is there |

## What it is

A small, post-conference survey analysis. Responses came from attendees (students, parents/
guardians, and school staff) after the 2025 youth leadership conference. The code cleans the
Qualtrics export into a labeled analysis dataset and tabulates every question by the population
that saw it (Qualtrics display logic is reconstructed in code).

**The survey data has since been purged** (it included respondent emails / minors' responses),
so the repo now stands as a **code archive** — the cleaned dataset, logs, and any tables/figures
are not retained.

## Folder map (derived from the repo)

```
ccylc_2025/
├── do/
│   ├── main.do                 # entry point — runs settings -> clean -> explore
│   ├── settings.do             # defines $projdir
│   ├── macros.doh              # question-group lists + display-logic criteria
│   ├── clean/clean_qualtrics.do  # cleans the survey export
│   └── explore/tab.do          # tabulates every question
└── log/                        # logs (gitignored; not retained)
```

## Pipeline (what it read/wrote when it ran)

The data files below have been purged; this documents the code's logic.

| Step | Read | Wrote |
|---|---|---|
| `clean/clean_qualtrics.do` | the Qualtrics survey export (value + label) **[external; purged]** | a cleaned analysis dataset + clean log |
| `explore/tab.do` | the cleaned dataset (+ `do/macros.doh`) | a tabulation log |

!!! note "`do/main.do` runs the full pipeline"
    The entry point sources `settings.do`, then runs `clean/clean_qualtrics.do` and
    `explore/tab.do` in order. Because the survey data has been purged, it can no longer run
    as-is — reproducing the analysis would require re-obtaining the original Qualtrics export.

!!! danger "Survey data purged (it held PII)"
    The Qualtrics export included **respondent emails** and minors' responses. That's why it was
    purged and never lived in GitHub — and why it must never be committed if it is ever
    re-obtained. See [Data safety](../workflow-tips/data-safety.md).

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).

## Offboarding status

- [x] Handoff `README.md` with per-file I/O map — written in the repo.
- [x] `main.do` wired to run the full pipeline (`settings` → `clean` → `explore`).
- [x] Confidential data purged (PII); repo reduced to a code archive.

The usual end-to-end server run and cold-read acceptance tests no longer apply here — the data
is gone, so the pipeline can't be re-run without re-obtaining the export.

See the [offboarding standards](../offboarding/index.md) for what each item means.
