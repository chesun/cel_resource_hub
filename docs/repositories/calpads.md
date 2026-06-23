# CALPADS (calpads)

A per-academic-year Stata cleaning pipeline over CALPADS **End-of-Year 1 (EOY1) Course
Completion** extracts (internally called `crscomp`), covering school years **2013–14 through
2017–18**. A lightweight project (~1 month of work, a handful of `.do` files).

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/calpads> (public) |
| **Runs on (Scribe)** | Paths are defined in `do/settings.do` (`$projdir` etc.) — _confirm the Scribe location there_ |
| **Entry point** | `do/master.do` (note: `master.do`, not `main.do`) |
| **Status** | Offboarding / handoff; README is the handoff guide |
| **Start with** | [`README.md`](https://github.com/chesun/calpads/blob/main/README.md) |

## What it is

For each school year, the pipeline cleans the raw EOY1 Course Completion extract into an
analysis-ready dataset (course outcomes stored as labeled Stata missing values, grade-point
handling, etc.). The README is a full handoff guide: §4 has a per-do-file input/output map and
§6 collects known gaps and gotchas — read those before running.

## How to run

From the repo root, in Stata:

1. Install the required Stata package (provides `sieve()`, used in the grade-point block) — see README §5.
2. `do "./do/master.do"`

!!! warning "Toggles default to OFF"
    `master.do` guards each step with a `local doclean... = 0` toggle, **all defaulting to `0`**.
    A bare `do "./do/master.do"` therefore runs nothing — set a step's toggle to `1` to run it.
    (See README §5.)

## Documentation map

- [`README.md`](https://github.com/chesun/calpads/blob/main/README.md) — the handoff guide (start here; §4 do-file map, §6 gotchas, §8 provenance).
- `CLAUDE.md` — project conventions.
- `decisions/` — ADRs.
- `doc/` — reference material (README §7).

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).
