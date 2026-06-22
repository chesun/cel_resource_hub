# Handoff README template

Copy this skeleton into a project's `README.md` and fill it in. It's the shape I use for the
repos I offboard ([`va_consolidated`](../repositories/va-consolidated.md),
[`calpads`](../repositories/calpads.md), [`csac_2024`](../repositories/csac-2024.md)). The
load-bearing section is **§4, the per-file input/output map** — that's what lets the next
person trace the pipeline.

Keep the tone plain: assume Stata fluency, assume no git/Claude Code.

````markdown
# <Project name> — <repo>

One-paragraph description: what this repo is, who the partners are, what it produces.

**Lab:** California Education Lab (CEL), UC Davis
**Author:** <name> (<offboarding-era email>)
**Status:** <active / offboarding / complete>

---

## 1. What this repo is

What the analysis does and what it outputs (the reports/tables/figures it feeds). Name the
single entry point: "everything runs from `do/main.do`."

## 2. How to run

```bash
# On Scribe, from the project folder:
cd /home/research/ca_ed_lab/projects/<project>
stata-mp -b do do/main.do
```

Note where the pipeline runs (Scribe only), how long a full run takes, and any one-time setup
(SSC packages to install, etc.). Document phase toggles if the master script has them.

## 3. Project structure

A short folder map — what lives in `do/`, where outputs land, what's gitignored (data).

## 4. Inputs and outputs of each do file

The core of the handoff. One row per do file in the pipeline. Mark inputs not produced by any
code in this repo as **[external]**.

| File | Purpose | Input | Output |
|---|---|---|---|
| `do/settings.do` | Defines path globals; sourced first | — | — |
| `do/clean/<x>.do` | <what it cleans> | `<raw file>` **[external]** | `<cleaned .dta>` |
| `do/<stage>/<y>.do` | <purpose> | `<input .dta>` | `<output .dta / table / figure>` |
| … | … | … | … |

Note the key intermediate dataset(s) that everything downstream reads, and which script
produces them.

## 5. Where outputs go

`data/cleaned/`, `estimates/`, `tables/`, `figures/`, `log/` — and which are tracked vs.
Scribe-only.

## 6. What NOT to touch

Pinned packages, vendored `.ado` files, raw data, predecessor-location files, credentials.

## 7. Decision records / why it's built this way

Link `decisions/` (ADRs) for a full pipeline, or a short list of load-bearing choices for a
lightweight one.

## 8. When something breaks

First places to look (logs, checks output), known failure modes, and contacts: author,
data-management custodian, lab IT.
````

---

## Notes

- **Per-file I/O is non-negotiable.** Even a one-do-file project gets §4 (it's just one row).
- **`[external]` markers matter.** They tell the next person which inputs they must obtain vs. which the pipeline generates.
- **Verify before you call it done.** Run the full pipeline on Scribe and confirm it completes — see the [offboarding checklist](index.md#required-artifacts-the-checklist).
