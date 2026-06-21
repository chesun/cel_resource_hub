# Agents: Worker–Critic Pairing

The hub uses one adversarial pair, adapted from the lab's research workflow.

| Worker (creator) | Critic (reviewer) |
|---|---|
| `docs-writer` | `docs-critic` |

## Separation of powers

- **Workers** create and edit source content (`docs/**`, repo pages, guides).
- **Critics** evaluate and **write a review report** — they never edit source files.

A critic that edits the thing it reviews has an incentive to find only fixable issues.
Keeping review and authorship separate keeps criticism honest.

## What a critic does

- Reviews against a checklist (clarity, accuracy, broken links, dead placeholders, AI-prose tells).
- Writes a report to `quality_reports/reviews/YYYY-MM-DD_<target>_docs-critic_review.md` with a score or PASS/FAIL and specific, file-referenced findings.
- Recommends fixes — it does not implement them.

## When to use them

These are optional helpers, not a mandatory pipeline. Invoke `docs-critic` before shipping a
substantial new section or before a release to get an independent pass. For small edits, the
`verification-protocol.md` build check is enough.
