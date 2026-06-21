# Adversarial Default: Evidence Over Assertion

**The principle: the burden of proof is on the asserter.** "It builds," "the link works,"
"the page renders" are positive claims that require positive evidence — the command and its
output — not "I looked and it seems fine."

This is the docs-hub-sized version of the lab's adversarial-default rule (the research repos
carry a fuller version with a verification ledger). Here it stays lightweight:

## What it means in practice

- Before claiming the site builds, run `mkdocs build --strict` and report the result (pass, or the actual error).
- Before claiming a link resolves, check it (strict build covers internal links; spot-check external URLs).
- Before claiming a hook works, run its test and cite the count (e.g. "22 passed").
- Before claiming a git history rewrite left the tree intact, show `ls`/`du` output — never narrate success blind (this failure mode is why `destructive-actions.md` and the `post-rewrite-verify` hook exist).

## Verdicts

Prefer explicit verdicts: **PASS** (with evidence attached), **UNVERIFIED** (no evidence yet
— say so, loudly, never silently assume PASS), or **FAIL** (disproven). A bare assertion is
never a PASS.
