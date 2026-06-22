# Cesar Chavez Youth Leadership Conference 2025 — `ccylc_2025`

A lightweight analysis of the survey data fielded **after the Cesar Chavez Youth Leadership
Conference (CCYLC)** in 2025.

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/ccylc_2025> (public) |
| **Runs on (Scribe)** | `/home/research/ca_ed_lab/projects/ccylc` |
| **Entry point** | `do/main.do` — **currently a stub** (see note below) |
| **Status** | Offboarding; handoff `README.md` drafted |
| **Start with** | The repo's [`README.md`](https://github.com/chesun/ccylc_2025#readme) — the per-file I/O map is there |

## What it is

A small, post-conference survey analysis. Data was collected from attendees (students, parents/
guardians, and school staff) after the 2025 Cesar Chavez Youth Leadership Conference. The
pipeline cleans the Qualtrics export into a labeled analysis dataset and tabulates every
question by the population that saw it (Qualtrics display logic is reconstructed in code).

Its outputs are the cleaned `.dta` and tabulation logs — there are no paper-ready tables or
figures in the repo.

## Folder map (derived from the repo)

```
ccylc_2025/
├── do/
│   ├── main.do                 # entry point (stub — see note)
│   ├── settings.do             # defines $projdir
│   ├── macros.doh              # question-group lists + display-logic criteria
│   ├── clean/clean_qualtrics.do  # raw export -> cleaned .dta
│   └── explore/tab.do          # tabulations -> log
├── dta/                        # data — Scribe only, gitignored
│   ├── raw/                    #   ccylc_export_value.csv, ccylc_export_label.csv
│   └── cln/                    #   ccylc_2025_clean.dta
└── log/                        # logs — gitignored (clean/, explore/)
```

## Pipeline (what reads/writes what)

| Step | Input | Output |
|---|---|---|
| `clean/clean_qualtrics.do` | `dta/raw/ccylc_export_value.csv`, `dta/raw/ccylc_export_label.csv` (Qualtrics exports) | `dta/cln/ccylc_2025_clean.dta` |
| `explore/tab.do` | `dta/cln/ccylc_2025_clean.dta` (+ `do/macros.doh`) | `log/explore/tab.txt` |

!!! warning "`do/main.do` doesn't run the pipeline yet"
    The entry point currently only `cd`s to the project folder and sources `settings.do` — it
    does **not** call the cleaning or tabulation steps. To reproduce the analysis today, run
    `settings.do` → `clean/clean_qualtrics.do` → `explore/tab.do` in order (the README §2 gives
    the commands). Wiring `main.do` to call them is the recommended next offboarding step.

!!! danger "Confidential raw data"
    The Qualtrics export includes **respondent emails** and minors' responses. It lives only on
    Scribe and is gitignored; it must never reach GitHub. See
    [Data safety](../workflow-tips/data-safety.md).

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).

## Offboarding status

- [x] Handoff `README.md` with per-file I/O map — drafted in the repo.
- [ ] `main.do` wired to run the full pipeline.
- [ ] Completed end-to-end server run recorded.
- [ ] Cold-read test by a non-author on Scribe.

See the [offboarding standards](../offboarding/index.md) for what each item means.
