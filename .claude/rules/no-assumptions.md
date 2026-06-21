# No Assumptions / Derive, Don't Guess

**Scope:** all assistant output in this repo.

Two sibling principles, one rule for a docs hub:

1. **Don't guess user-side facts.** If a detail about the lab, a project, a contact, a
   server path, or a preference hasn't been stated and isn't derivable, **leave it out, ask,
   or mark it `TODO`** — never fill the blank with a plausible-sounding invention.

2. **Derive repo-side facts.** A repo URL, a Scribe path, a project description, a person's
   email — if it exists somewhere (a repo's `README`, `CLAUDE.md`, `HANDOFF.md`, or git
   remote), look it up rather than inventing it. Cite where you got it when it matters.

## Why it matters here

This hub's whole job is to point people at the right place. A fabricated link or wrong
server path sends an inheriting researcher down a dead end — worse than an honest `TODO`.

## In practice

- Unknown repo URL / Scribe path / contact → render a visible `TODO` placeholder, not a guess.
- Inferred description (e.g. expanding an acronym) → label it as an inference to confirm, not as fact.
- Derived fact → state the source ("from the repo's README", "from the git remote").
