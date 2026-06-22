# CEL Resource Hub

Hi — I'm **Christina Sun**. I built this hub as a personal project while offboarding from the
**California Education Lab (UC Davis)**. It links the CEL code repositories I'm leaving behind
and writes up the workflows I developed for building and running them.

One honest note on what this is: **this is not official lab documentation.** Every workflow here
is one I put together myself, for my own projects. So read these pages as *"here's what I do,
and why I think it works"* — recommendations from one researcher, not lab policy. Take what's
useful and ignore the rest.

If you've just inherited one of my CEL projects and don't know where to start, you're in the
right place.

---

## Who this is for

You most likely **inherited one of my CEL projects** — an incoming researcher or successor — or
you're the lab's data-management custodian or IT contact. I assume you:

- are comfortable with **Stata**,
- may have **never used git or Claude Code**,
- run analysis on the lab's **Scribe server over SSH**, and
- need to *reproduce* or make a *small change* to an existing pipeline, not rebuild it from scratch.

!!! note "Why a personal hub?"
    My projects get handed off when I leave, and often there's no named successor at the time —
    so the documentation has to stand on its own. I'd rather write down how I actually work than
    leave you to reverse-engineer it. The one thing I'm firm about (and that *isn't* a personal
    preference) is keeping confidential student data on Scribe and out of GitHub — see
    [Data safety](workflow-tips/data-safety.md).

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

    Who to contact, what tools you need, and how to get access.

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
