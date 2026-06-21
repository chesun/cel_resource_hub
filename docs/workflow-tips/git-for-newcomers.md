# Git for newcomers

You do **not** need git to run a CEL pipeline — the code is already on Scribe and runs as
ordinary Stata. You only need this page when you want to **pull a newer version of the code
from GitHub** or **save a change you made**.

!!! info "Status: seeded outline"
    The essentials below are distilled from the `va_consolidated` handoff. Expand with
    screenshots and lab-specific details as needed.

## Two ways to move code

### Option A — File transfer (no git)

Download the updated files from the GitHub web page and drag them into the Scribe project
folder with **FileZilla** (or any transfer tool). To save a change, edit on Scribe and send
the file back the same way. Nothing else to learn.

### Option B — git (the workflow the lab uses)

```bash
cd /path/to/the/project/on/scribe

# get the latest code from GitHub
git pull --rebase origin main

# save a change you made, then send it to GitHub
git add do/path/to/the_file_you_changed.do
git commit -m "short description of what you changed"
git push origin main
```

!!! tip "Why git, briefly"
    Because data folders aren't tracked, `git pull` brings down **only code, never data** —
    so it can't make the common mistake of copying restricted data onto a local machine.

## If something looks wrong

If `git pull` ever reports a **conflict** or any state you don't recognize, **stop and ask**
rather than improvising — a wrong move there can be hard to undo.

!!! todo "To add"
    - Installing git / first-time `git config` (name + email).
    - A short glossary: clone, commit, push, pull, branch, remote.
    - A table of common errors and fixes (the `va_consolidated` repo has one at `quality_reports/plans/2026-05-25_scribe-setup.md`).
    - Lab convention on commit messages, if any.
