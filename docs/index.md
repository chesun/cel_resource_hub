# CEL Resource Hub

A central place for the **California Education Lab (UC Davis)** that links to the lab's
code repositories — especially **offboarding deliverables** — and collects reusable
**workflow guidance** for the people who inherit and run them.

If you have just taken over a CEL project and don't know where to start, you are in the
right place.

---

## Who this is for

The typical reader **inherits a CEL project** — an incoming researcher, PI, or successor —
or is the lab's data-management custodian or IT contact. We assume you:

- are comfortable with **Stata**,
- may have **never used git or Claude Code**,
- run analysis on the lab's **Scribe server over SSH**, and
- need to *reproduce* or make a *small change* to an existing pipeline, not rebuild it from scratch.

!!! note "Offboarding reality"
    These projects are handed off when the original author **leaves the lab**. Often there
    is no named successor at handoff time — the documentation *is* the last word. That is
    why each repo aims to be runnable from its README/handoff doc alone, and why the
    confidential student data always stays on Scribe while the code lives on GitHub.

---

## Start here

<div class="grid cards" markdown>

-   :material-source-repository: **Repositories**

    ---

    Every CEL code repository — links, server locations, status, and how to run each one.

    [:octicons-arrow-right-24: Browse repositories](repositories/index.md)

-   :material-clipboard-check: **Offboarding standards**

    ---

    What "offboarding-ready" means for a CEL repo — the handoff checklist and README template.

    [:octicons-arrow-right-24: Offboarding standards](offboarding/index.md)

-   :material-lightbulb-on: **Workflow tips**

    ---

    The recommended end-to-end workflow (edit locally, sync, run on Scribe) plus how-tos: VSCode, git, Scribe & SSH, and keeping data safe.

    [:octicons-arrow-right-24: Workflow tips](workflow-tips/index.md)

-   :material-account-group: **Resources**

    ---

    Who to contact, what tools you need, and how to get access.

    [:octicons-arrow-right-24: Resources](resources/index.md)

</div>

---

## How the lab's repos are organized (the common pattern)

Most CEL analysis repos share the same shape, so once you learn one you can read them all:

- All Stata code lives under `do/`, driven by a single entry point **`do/main.do`**.
- File paths are defined in one place, **`do/settings.do`** (often branched by machine, e.g. Scribe vs. local).
- Code and documentation live on **GitHub**; the confidential data lives only on **Scribe**.
- The pipeline runs on Scribe with `stata-mp -b do do/main.do`.

The [`va_consolidated`](repositories/va-consolidated.md) repo is the most fully documented
example of this pattern (it ships a plain-English `HANDOFF.md`) and is a good model to read
first.

---

!!! tip "Maintaining this hub"
    This site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
    To edit, change the Markdown under `docs/` and run `mkdocs serve` for a live preview.
    See the repo [`README.md`](https://github.com/chesun/cel_resource_hub#readme) for setup.
