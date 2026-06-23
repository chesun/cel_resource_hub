# Value Added (va_consolidated)

The consolidated Stata pipeline behind the *Common Core Value-Added* paper
(Carrell, Kurlaender, Martorell, Naven, Sun — "Do Schools Matter?"). It cleans the raw
data, builds the estimation samples, runs the value-added estimation, and produces every
table and figure in the paper.

This is the most fully documented repo in the lab and the best model to read first — it
ships a plain-English **`HANDOFF.md`** written for someone comfortable with Stata but new
to git and Claude Code.

| | |
|---|---|
| **GitHub** | <https://github.com/chesun/va_consolidated> |
| **Runs on (Scribe)** | `/home/research/ca_ed_lab/projects/common_core_va/consolidated` |
| **Entry point** | `do/main.do` |
| **Status** | Offboarding deliverable — acceptance run in progress |
| **Start with** | [`HANDOFF.md`](https://github.com/chesun/va_consolidated/blob/main/HANDOFF.md) |

## What it is

School-level value-added estimates for ~1,400 California high schools across four cohorts
of 11th-graders (2014–15 through 2017–18), using a CFR-style "value-added with drift"
estimator, plus a survey-VA mechanism analysis linking the estimates to CalSCHLS
school-climate indices. It is the consolidated successor to two predecessor codebases
(`cde_va_project_fork` and `caschls`).

## How to run it

On Scribe, from the project folder:

```bash
cd /home/research/ca_ed_lab/projects/common_core_va/consolidated
nohup stata-mp -b do do/main.do &      # full run takes several hours
```

The run executes seven phases in dependency order (data prep → samples → VA estimation →
VA tables → survey-VA → paper outputs → automated data checks). Phase toggles near the top
of `do/main.do` let you re-run just part of it. See the HANDOFF for partial-run rules and
the `m4_acceptance_run` switch.

## Documentation map

- [`HANDOFF.md`](https://github.com/chesun/va_consolidated/blob/main/HANDOFF.md) — plain-English run & reproduce guide (start here).
- [`README.md`](https://github.com/chesun/va_consolidated/blob/main/README.md) — fuller technical reference.
- `decisions/` — numbered ADRs explaining *why* each load-bearing choice was made.
- `quality_reports/` — review reports and the golden-master reproduction evidence.

## Who to ask

- **Christina Sun** — author (`christinasun101@gmail.com` / `ucsun@ucdavis.edu`).

## Related

- Paper LaTeX is a **separate** repo (`va_paper_clone`) — the pipeline produces the tables/figures the paper consumes.
