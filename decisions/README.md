# Decision Records (ADRs)

Append-only log of substantive decisions for the CEL Resource Hub. See
`.claude/rules/decision-log.md` for when and how to write one.

## Index

| # | Date | Title | Status |
|---|------|-------|--------|
| [0001](0001_hub-foundation.md) | 2026-06-21 | Found the hub: name, tooling, hosting, fresh repo | Decided |
| [0002](0002_workflow-tips-comprehensive-guide.md) | 2026-06-21 | Workflow Tips becomes a comprehensive guide; recommend local-edit + sync + batch | Decided |
| [0003](0003_personal-project-voice.md) | 2026-06-21 | Frame the hub as a personal project, not official lab docs | Decided |
| [0004](0004_dvc-data-versioning-guide.md) | 2026-06-23 | Add a DVC data-versioning guide and vendor its server scripts in-repo | Decided |

## Template

```markdown
# ADR-NNNN: <title ≤ 80 chars>

**Date:** YYYY-MM-DD
**Status:** Decided | Proposed | Superseded by #NNNN
**Supersedes:** #NNNN (if applicable)

## Context
What prompted this decision? What constraints applied?

## Decision
What was decided, stated plainly.

## Consequences
What this enables, what it costs, what to revisit later.
```
