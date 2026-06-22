# Workflow Tips

A practical guide to working on California Education Lab code, plus reusable tips. These pages
exist so the same lessons don't have to be relearned by every person who inherits a project.

!!! tip "Start with the workflow overview"
    If you read one page, read **[The recommended workflow](recommended-workflow.md)** — the
    end-to-end picture (edit locally → sync to Scribe → run in batch) that the other pages fill
    in. New to the lab? It's the fastest way to a correct mental model.

## The workflow, end to end

- [**The recommended workflow**](recommended-workflow.md) — the overview that ties everything together: where you write code, how it gets to Scribe, and how it runs.
- [**Editing Stata in VSCode**](editing-stata-vscode.md) — write `.do` files locally in a real editor instead of typing into the server's interactive Stata GUI (which loses work when the connection drops).
- [**Local ↔ server sync**](local-server-sync.md) — the two ways to move code between laptop and Scribe (FileZilla vs git), with the benefits and costs of each.
- [**Scribe & SSH setup**](scribe-ssh-setup.md) — getting an account, connecting, and running Stata on the lab server (batch vs GUI).

## Keeping data safe

- [**Data safety**](data-safety.md) — the rule that keeps confidential student data on Scribe and out of GitHub, and how the lab enforces it.
- [**gitignore setup for data security**](gitignore-setup.md) — the concrete `.gitignore`, how to verify nothing leaked, and what to do if data was committed by accident.

## Reference

- [**Git for newcomers**](git-for-newcomers.md) — the few commands you actually need, first-time setup, a glossary, and common errors.
- [**Reproducible pipelines**](reproducible-pipelines.md) — the `do/main.do` + `settings.do` pattern, pinning inputs, and automated checks.
- [**Claude Code intro**](claude-code-intro.md) — what the `.claude/` folders and `CLAUDE.md` files are, and whether you need them (you don't, to run the analysis).

!!! info "Status: actively filled in"
    Several pages started as outlines distilled from the `va_consolidated` handoff. Sections
    still marked `TODO` need a lab-specific detail (a contact, a host string) before they're
    authoritative — the workflow guidance itself is ready to use.

## The one rule worth memorizing

> Code lives on **GitHub**. Confidential data lives only on **Scribe**. The two never mix.

Everything else in these guides supports that separation.
