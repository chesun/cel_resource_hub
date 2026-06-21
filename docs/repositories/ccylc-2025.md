# Cesar Chavez Youth Leadership Conference 2025 — `ccylc_2025`

A lightweight analysis of the survey data fielded **after the Cesar Chavez Youth Leadership
Conference (CCYLC)** in 2025.

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/ccylc_2025> (public) |
| **Runs on (Scribe)** | _TODO: confirm Scribe path (if it runs on Scribe)_ |
| **Entry point** | `do/main.do` (Stata) |
| **Status** | Small/one-off analysis; no README in the repo |
| **Start with** | This page + the folder map below (no upstream README) |

## What it is

A small, post-conference survey analysis. Data was collected from participants after the 2025
Cesar Chavez Youth Leadership Conference; this repo holds the lightweight Stata pipeline that
processes and analyzes it.

## Folder map (derived from the repo)

```
ccylc_2025/
├── do/
│   ├── main.do       # entry point
│   ├── settings.do   # path definitions
│   ├── macros.doh    # shared macros
│   ├── clean/        # data cleaning
│   └── explore/      # ad-hoc / exploratory
├── dta/              # datasets (Scribe-only / gitignored)
└── log/              # Stata logs
```

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).

!!! tip "Optional next step"
    Because this is a small project, a short `README.md` (a paragraph on the data source and
    how to run `do/main.do`) would be enough to make it self-explanatory.
