# Workflow Tips

These are the workflows I use on my CEL projects, written up so whoever inherits one doesn't
have to reverse-engineer how I worked. They're my personal habits and opinions — *here's what I
do and why I think it helps*, not lab policy. Take what's useful to you and leave the rest.

!!! tip "Start with the workflow overview"
    If you read one page, read **[The recommended workflow](recommended-workflow.md)** — the
    end-to-end picture (edit locally → sync to Scribe → run in batch) that the other pages fill
    in. It's the fastest way to see how I work and decide what's worth adopting.

## The workflow, end to end

- [**The recommended workflow**](recommended-workflow.md) — the overview that ties everything together: where you write code, how it gets to Scribe, and how it runs.
- [**Editing Stata in VSCode**](editing-stata-vscode.md) — write `.do` files locally in a real editor instead of typing into the server's interactive Stata GUI (which loses work when the connection drops).
- [**Local ↔ server sync**](local-server-sync.md) — the two ways to move code between laptop and Scribe (FileZilla vs git), with the benefits and costs of each.
- [**Scribe & SSH setup**](scribe-ssh-setup.md) — getting an account, connecting, and running Stata on the lab server (batch vs GUI).

## Keeping data safe

- [**Data safety**](data-safety.md) — keeping confidential student data on Scribe and out of GitHub. This is the one page here that *isn't* a personal preference — it's a hard requirement.
- [**gitignore setup for data security**](gitignore-setup.md) — the concrete `.gitignore`, how to verify nothing leaked, and what to do if data was committed by accident.

## Reference

- [**Git for newcomers**](git-for-newcomers.md) — the few commands you actually need, first-time setup, a glossary, and common errors.
- [**Reproducible pipelines**](reproducible-pipelines.md) — the `do/main.do` + `settings.do` pattern, pinning inputs, and automated checks.
- [**Claude Code intro**](claude-code-intro.md) — what the `.claude/` folders and `CLAUDE.md` files are, and whether you need them (you don't, to run the analysis).

!!! info "Status: actively filled in"
    Several pages started as outlines distilled from my `va_consolidated` handoff. Sections
    still marked `TODO` need a detail I haven't filled in yet (a contact, a host string). The
    workflow advice itself reflects how I actually work.

## The one rule worth memorizing

> Code lives on **GitHub**. Confidential data lives only on **Scribe**. The two never mix.

Everything else in these guides supports that separation.
