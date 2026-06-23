# Claude Code intro

Several CEL repos contain a `.claude/` folder and files like `CLAUDE.md`, `MEMORY.md`, and
`SESSION_REPORT.md`. These come from **Claude Code**, the AI-assisted tooling used to build
and document the repos.

!!! success "You can ignore all of it to run the analysis"
    The pipeline is ordinary Stata. The `.claude/` configuration is **not part of the
    pipeline** — you never need it to clean data, estimate, or produce tables and figures.

## What the files are, if you're curious

- **`CLAUDE.md`** — project map and conventions; the AI reads it each session. Often the most
  complete single description of a repo.
- **`MEMORY.md`** — accumulated learnings and gotchas discovered during the work. Genuinely
  useful when debugging, even if you never run the AI tooling.
- **`SESSION_REPORT.md` / `quality_reports/session_logs/`** — chronological work logs.
- **`.claude/`** — rules, agent definitions, and hooks that shape how the AI assists. Safe to
  ignore.

## The ideas behind it (if you're curious)

The `.claude/` setup isn't just "let the AI write code." A few ideas are what make it produce work
I can actually trust — and they're the genuinely interesting part:

**It's a capable RA, not a senior researcher.** I think of the AI as a sharp first- or second-year
RA: technically proficient (writes Stata/R that runs, drafts text, reads and summarizes papers), but
with textbook-level subject knowledge and no five years on *my* question. So it handles the
**execution**; the **judgment** — what's correct, novel, and worth doing — stays mine. Most of the
scaffolding exists to force evidence so I catch the gaps an RA wouldn't catch on their own. (See
[where the workflow fits, and where your judgment is irreplaceable](https://github.com/chesun/claude-research-workflow/blob/main/docs/concepts/appropriate-use.md).)

**Four rules against making things up.** The most distinctive piece — and the answer to the obvious
"but doesn't AI just hallucinate?" worry. Four rules each block a different category of fabrication,
so everything the AI claims is **auditable**: you can ask "where did you get that?" and the answer is
always a tracked file, a recorded `grep`, or an explicit assumption.

| Rule | What it stops the AI from doing |
|---|---|
| **no-assumptions** | Guessing your deadline, target journal, or preferences instead of asking |
| **primary-source-first** | Citing or paraphrasing a paper it hasn't actually read |
| **derive-don't-guess** | Inventing a filepath, variable, or macro the repo already defines |
| **adversarial-default** | Claiming "it works" / "it's compliant" without showing the check |

(The [full four-rule stack](https://github.com/chesun/claude-research-workflow/blob/main/docs/concepts/epistemic-rules.md) — you'll recognize these as the same rules this hub holds *its* docs to.)

**Every creator has a critic.** Any agent that *produces* something is paired with a separate
**critic** agent that only *reviews* it — never edits — and scores it, because the agent that wrote
something is biased toward "looks fine" and shares its own blind spots. Splitting the roles surfaces
issues self-review misses. You're looking at it right now: this hub uses a `docs-writer` /
`docs-critic` pair from the same template. (See [worker–critic pairs](https://github.com/chesun/claude-research-workflow/blob/main/docs/concepts/worker-critic-pairs.md).)

## If you want to use it

Claude Code is an optional productivity tool, not a lab requirement. The agents, rules, and hooks
you see in these repos come from my own template,
**[Claude Code Research Workflow](https://github.com/chesun/claude-research-workflow)** — a
fork-and-adapt foundation for AI-assisted empirical research (discovery, data engineering,
analysis, writing, peer review). If you want to work this way on a new project, fork it and adapt;
its `docs/` cover getting started, the agents and skills, and customization. It's an evolving
preview release, so expect it to change.
