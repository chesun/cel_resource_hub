# Workflow Tips

Reusable, project-agnostic guidance for working on California Education Lab code. These
guides exist so the same lessons don't have to be relearned by every person who inherits a
project.

!!! info "Status: outlines"
    The pages below are **outlines seeded with what we already know** (mostly distilled from
    the `va_consolidated` handoff). They are meant to be filled in over time. Sections marked
    `TODO` need details before they are authoritative.

## Guides

- [**Git for newcomers**](git-for-newcomers.md) — the few commands you actually need to pull updates and save changes, with no prior git experience assumed.
- [**Scribe & SSH setup**](scribe-ssh-setup.md) — getting an account, connecting, and running Stata on the lab server.
- [**Data safety**](data-safety.md) — the rule that keeps confidential student data on Scribe and out of GitHub, and how the lab enforces it.
- [**Reproducible pipelines**](reproducible-pipelines.md) — the `do/main.do` + `settings.do` pattern, pinning inputs, and automated checks.
- [**Claude Code intro**](claude-code-intro.md) — what the `.claude/` folders and `CLAUDE.md` files are, and whether you need them (you don't, to run the analysis).

## The one rule worth memorizing

> Code lives on **GitHub**. Confidential data lives only on **Scribe**. The two never mix.

Everything else in these guides supports that separation.
