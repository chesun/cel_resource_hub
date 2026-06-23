# CEL Resource Hub

I'm **Christina Sun**, and I put this hub together while offboarding from the **California
Education Lab (UC Davis)**. It links the CEL code repositories I'm handing off and collects the
workflows I've leaned on for getting research done here.

None of it is official lab policy — it's just what's worked for me, shared in case it's useful to
you too.

Whether you've inherited one of my projects or you're a GSR just trying to get something running
on Scribe, I hope there's something here for you.

---

## Who this is for

Maybe you **inherited one of my CEL projects**, or you're a **GSR or labmate** getting set up on
Scribe, or you're the lab's data-management custodian or IT contact. I assume you:

- are comfortable with **Stata**,
- may have **never used [git](workflow-tips/git-for-newcomers.md) or [Claude Code](workflow-tips/claude-code-intro.md)**, and
- run analysis (or are about to) on the lab's **Scribe server over SSH**.

!!! note "Why a personal hub?"
    My projects get handed off when I leave, and often there's no named successor at the time —
    so the documentation has to stand on its own. I'd rather write down how I actually work than
    leave you to reverse-engineer it.

---

## Start here

<div class="grid cards" markdown>

-   :material-source-repository: **Repositories**

    ---

    Every CEL code repository I'm handing off — links, server locations, status, and how to run each one.

    [:octicons-arrow-right-24: Browse repositories](repositories/index.md)

-   :material-clipboard-check: **Offboarding standards**

    ---

    The bar I try to hold my own projects to before I leave them behind — my handoff checklist and README template.

    [:octicons-arrow-right-24: Offboarding standards](offboarding/index.md)

-   :material-lightbulb-on: **Workflow tips**

    ---

    The workflows I use (edit locally, sync, run on Scribe) and the tools behind them: VSCode, git, Scribe & SSH, keeping data safe.

    [:octicons-arrow-right-24: Workflow tips](workflow-tips/index.md)

-   :material-account-group: **Resources**

    ---

    What tools you need and how to get access.

    [:octicons-arrow-right-24: Resources](resources/index.md)

</div>

---

## How I set up my repos (a pattern you'll see across mine)

Most of my CEL analysis repos share the same shape, so once you learn one you can read them all:

- All Stata code lives under `do/`, driven by a single entry point **`do/main.do`**.
- File paths are defined in one place, **`do/settings.do`** (often branched by machine, e.g. Scribe vs. local).
- Code and documentation live on **GitHub**; the confidential data lives only on **Scribe**.
- The pipeline runs on Scribe with `stata-mp -b do do/main.do`.

The [`va_consolidated`](repositories/va-consolidated.md) repo is my most fully documented example
of this pattern (it ships a plain-English `HANDOFF.md`) and is a good one to read first.

---

!!! tip "Maintaining this hub"
    This site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
    To edit, change the Markdown under `docs/` and run `mkdocs serve` for a live preview.
    See the repo [`README.md`](https://github.com/chesun/cel_resource_hub#readme) for setup.
