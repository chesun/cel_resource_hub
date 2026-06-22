# Data safety

The most important rule when working with CEL data:

> **Code lives on GitHub. Confidential student data lives only on Scribe. The two never mix.**

CEL projects use restricted student-level administrative data (CALPADS, CSAC, CalSCHLS, NSC,
etc.). That data must never reach GitHub or a personal laptop.

!!! info "Status: seeded outline"
    Distilled from `va_consolidated` conventions (ADR-0007). Confirm and expand with any
    lab-wide data-use-agreement specifics.

## How the separation is built in

- **`data/`, `estimates/`, `output/`, `log/` are gitignored.** Those folders exist only on
  Scribe at runtime; they are not in the GitHub repo. The mechanism — what to put in
  `.gitignore`, how to verify nothing leaked, and what to do if data was committed by accident
  — has its own page: [gitignore setup for data security](gitignore-setup.md).
- **Scripts read raw data from Scribe and write outputs only inside the project folder** —
  the "self-contained sandbox" principle. New code should save to project-local paths, never
  back into raw-data locations.
- **`git pull` brings down code, never data** — which is the main safety argument for using
  git over manual file transfer.
- **Some repos add a push guard** that blocks any `git push` carrying a data file off the
  server (you may see `refusing to push — restricted data files...` — that's the guard
  working).

## Things that should never be committed

- Any file under `data/raw/` or `data/cleaned/`.
- Codebooks or logs that print student-level rows.
- SSH passwords or Scribe credentials — in code, comments, or commit messages.

!!! warning "`codebook` can leak PII"
    Running Stata's `codebook` on identifier crosswalks can print PII into a log. Known repos
    scrub identifiers before such exports — don't remove those scrubs.

!!! todo "To add"
    - The lab's data-use agreement terms and who owns them.
    - The exact list of restricted data sources per project.
    - What to do if data is committed by accident (it's hard to fully remove from git history).
