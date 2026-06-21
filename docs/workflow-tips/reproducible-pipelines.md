# Reproducible pipelines

CEL pipelines are built so that **one command reproduces the analysis**, and running it the
same way twice gives the same answer. This page describes the shared pattern so you can read
any lab repo with the same mental model.

!!! info "Status: seeded outline"
    Distilled from the `va_consolidated` consolidation. The patterns below recur across the
    CSAC and CCYLC repos too.

## The shared pattern

- **One entry point.** Every repo has a single master script, `do/main.do`, that runs the
  whole pipeline in the correct order. If you remember one thing: run `do/main.do`.
- **One place for paths.** `do/settings.do` defines every file path and often detects the
  machine (Scribe vs. local) and sets paths accordingly. Change a path here, not in twenty
  scripts.
- **Phase toggles.** `main.do` usually has on/off switches near the top so you can re-run
  just one phase. A phase can only be skipped if the outputs it would produce already exist
  on disk, because later phases read them.
- **Pin inputs that can drift.** Anything downloaded live from the internet at runtime is a
  reproducibility hazard — two runs on different days can silently differ. Read from a fixed
  local copy instead.
- **Automated sanity checks.** A final phase asserts the results are in expected ranges
  (sample sizes, merge rates, value ranges) and **fails loudly** if something upstream broke.

## When you change something

1. Make the edit; save any new output to a project-local path.
2. Re-run the affected phase (toggle the others off).
3. Re-run the checks phase.
4. **Compare the new outputs against the prior run's outputs** before trusting them.

!!! tip "Decision records"
    The "why" behind load-bearing choices lives in a repo's `decisions/` folder (ADRs) — read
    those before changing a load-bearing parameter.

!!! todo "To add"
    - A worked example of a partial re-run.
    - How each repo names its outputs and where they land.
    - Per-project gotchas (each repo's `MEMORY.md` collects these).
