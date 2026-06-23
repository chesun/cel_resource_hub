# Reproducible pipelines

CEL pipelines are built so that **one command reproduces the analysis**, and running it the
same way twice gives the same answer. This page describes the shared pattern — distilled from
`va_consolidated`, but recurring across the CSAC and CCYLC repos too — so you can read any lab
repo with the same mental model.

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

## What `main.do` looks like

The entry point is a thin **orchestrator**: load the paths, set one toggle per phase, then run
each phase — guarded by its toggle — in dependency order. A skeleton:

```stata
* ===========================================================================
* main.do — runs the whole pipeline.  Entry point:  stata-mp -b do do/main.do
* ===========================================================================

include do/settings.do          // 1. one place for every file path ($datadir, $logdir, …)

* 2. Phase toggles — default every phase ON. Flip one to 0 to skip it
*    (safe only if that phase's outputs already exist on disk; later phases read them).
local run_clean     1
local run_samples   1
local run_analysis  1
local run_outputs   1
local run_checks    1

log using "$logdir/main.smcl", replace      // 3. one master log for the whole run

* 4. Run each phase in dependency order, each guarded by its toggle
if `run_clean' {
    do do/clean/clean_raw.do            // raw data -> cleaned dataset
}
if `run_samples' {
    do do/samples/build_samples.do      // cleaned data -> estimation samples
}
if `run_analysis' {
    do do/analysis/estimate.do          // samples -> estimates
}
if `run_outputs' {
    do do/outputs/tables_figures.do     // estimates -> tables & figures
}
if `run_checks' {
    do do/checks/sanity_checks.do       // assert results are in range; fail loudly
}

log close
```

Each `do/<phase>/...` file is an ordinary Stata script that reads its inputs from the paths in
`settings.do` and writes its outputs to project-local folders. `main.do` itself only decides
**which phases run, and in what order**.

!!! tip "Finer-grained control"
    Bigger pipelines add a second layer of toggles *inside* a phase (e.g. re-run the estimation
    but skip sample reconstruction), plus a single "full run" switch that forces every phase back
    ON for the final, authoritative run. Same idea, more granularity.

## When you change something

1. Make the edit; save any new output to a project-local path.
2. Re-run the affected phase (toggle the others off).
3. Re-run the checks phase.
4. **Compare the new outputs against the prior run's outputs** before trusting them.

## A worked example: re-running one phase

Say you fixed something in the **analysis** phase, but the upstream cleaning and sample-building
phases are unchanged — and those take hours. You don't want to re-run them; their outputs are
already on disk. So you re-run just the phase you touched, anything downstream of it, and the
checks.

Near the top of `do/main.do`, set the phase toggles:

```stata
local run_clean     0    // unchanged — outputs already on disk
local run_samples   0    // unchanged
local run_analysis  1    // the phase you edited — re-run it
local run_outputs   1    // reads the analysis output, so re-run it too
local run_checks    1    // always re-run the sanity checks
```

Then run it on Scribe as usual:

```bash
stata-mp -b do do/main.do
```

Only the `1` phases execute, and they read the on-disk outputs the `0` phases produced earlier.
Read the log and the checks output, then **compare the new outputs against the prior run** before
trusting them.

!!! warning "When in doubt, re-run from the change"
    A phase is safe to skip **only if its outputs already exist** — later phases read them. If
    you're not sure a skipped phase is still current, turn it back on and re-run from the earliest
    phase you changed.

!!! tip "Decision records"
    The "why" behind load-bearing choices lives in a repo's `decisions/` folder (ADRs) — read
    those before changing a load-bearing parameter.
