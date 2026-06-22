# ADR-0002: Workflow Tips becomes a comprehensive guide; recommend local-edit + sync + batch

**Date:** 2026-06-21
**Status:** Decided

## Context

The Workflow Tips section started (ADR-0001) as seeded outlines distilled from the
`va_consolidated` handoff. Two things prompted growing it into a real guide:

1. A common lab habit of writing Stata by SSHing to Scribe and typing into the **interactive
   Stata GUI**. This loses work whenever the connection drops and leaves no reproducible script.
2. A request to document, concretely: a gitignore setup for data security, GUI Stata on the
   server, the two local↔server sync methods with their trade-offs, and using VSCode.

The lab's sync model is already settled in `va_consolidated` ADRs (file-transfer is operator's
choice; the project evolved from FileZilla toward git with a pre-push data guard). The new
content builds on that rather than inventing a position.

## Decision

1. **The Workflow Tips section is a comprehensive guide plus tips**, not a flat list of stubs.
   A new overview page, `recommended-workflow.md`, is the entry point; the other pages are its
   detail. The landing page and `mkdocs.yml` nav are grouped accordingly (workflow / data
   safety / reference).
2. **The recommended workflow is: write `.do` files locally in VSCode → sync to Scribe → run in
   batch (`stata-mp -b do`) → read the log → iterate.** The interactive server GUI is documented
   as a quick-exploration option (over X11) with its costs, not as the place to write code.
3. **Editing/sync scope is local-edit + local↔remote sync only** — FileZilla or git. VSCode
   Remote-SSH / edit-on-server is intentionally out of scope (decided with the user).
4. **The two sync methods are documented with explicit benefits/costs** (`local-server-sync.md`);
   git is the recommended default for history + structural data-egress protection, FileZilla is
   the no-git fallback.
5. **gitignore-for-data-security gets its own page** (`gitignore-setup.md`): a copy-paste
   `.gitignore`, verification commands, and accident recovery.

## Consequences

- New pages: `recommended-workflow.md`, `editing-stata-vscode.md`, `local-server-sync.md`,
  `gitignore-setup.md`. Expanded: `scribe-ssh-setup.md` (batch vs GUI/X11), `git-for-newcomers.md`
  (first-time setup, glossary, common-errors table), `data-safety.md` (cross-link), `index.md`.
- A few `TODO`s remain where a lab-specific fact is needed (IT contact, the Scribe GUI binary
  name) — flagged, not fabricated, per `no-assumptions.md`.
- The guidance ports to other CEL repos unchanged; it is project-agnostic.
