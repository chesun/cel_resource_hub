# ADR-0003: Frame the hub as a personal project, not official lab docs

**Date:** 2026-06-21
**Status:** Decided

## Context

The hub's first-pass voice read like official lab documentation ("the lab's standard", "the rule
the lab enforces", "the workflow the lab uses"). In reality this is a personal project I built
while offboarding: every workflow here is one I developed and use myself. Presenting personal
recommendations as lab policy is both inaccurate and over-claims an authority I don't have.

## Decision

Reorient all hub prose to a first-person, opinion-owning voice: *"here's what I do and why I
think it works — use it or not."* Concretely:

- The homepage, workflow-tips pages, offboarding standards, repo `README.md`, and the site
  description open by stating the hub is a personal project, not official lab documentation.
- Workflow guidance is framed as my recommendations ("I default to git", "the workflow I use",
  "the habit I'd gently push back on"), not lab mandates.
- Data confidentiality (student data on Scribe, never GitHub) stays firm in `data-safety.md`,
  but stated as plain universal lab policy — not editorialized as "the one exception" to the
  personal-recommendation voice. It's policy that goes without saying, so the hub doesn't single
  it out.

## Consequences

- A reader can adopt or ignore any workflow without thinking they're breaking lab policy.
- The data-confidentiality rule reads as plain lab policy, not as a contrast to the
  personal-recommendation voice.
- Future pages keep this voice. If the lab ever adopts any of this as policy, that's a separate,
  explicit decision — not something this hub asserts.
