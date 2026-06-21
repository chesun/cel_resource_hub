# Decision Log (ADR)

**Location:** `decisions/` — template and index in `decisions/README.md`.
**Purpose:** the single record of *what* was decided and *when*. The log is append-only.

## When to write an ADR

Write one when a substantive, durable decision is committed, e.g.:

- A naming, tooling, or hosting choice (site generator, repo name, deploy target).
- What gets included in or excluded from the hub.
- A structural convention (how repo pages are organized, what every page must cover).

Do **not** write an ADR for routine content edits, typo fixes, or tentative ideas — those go
in a session log.

## Format

- Filename: `NNNN_short-slug.md`, zero-padded (`0001_...`). Numbers are permanent, never reused.
- Required fields: **Date** (YYYY-MM-DD), **Status** (`Decided` / `Proposed` / `Superseded by #NNNN`), and **Context / Decision / Consequences**.
- One decision per file. Title ≤ 80 chars.

## Supersession

When a decision changes, write a **new** ADR (`Supersedes: #NNNN` in its header), flip the
old one's Status to `Superseded by #NNNN`, and update `decisions/README.md`. Never edit a
Decided ADR's body — the history stays.

## Reference by number

Cite decisions as `ADR-0001` in session logs, commit messages, and other ADRs. Numbers are
durable across renames.
