# Destructive Actions: Hook-Enforced Guardrails

**Scope:** all Bash invocations made by Claude Code (including subagents).

**Enforcement:**

- `.claude/hooks/destructive-action-guard.py` (PreToolUse, `Bash`) — blocks the operations below.
- `.claude/hooks/post-rewrite-verify.py` (PostToolUse, `Bash`) — injects a verification reminder after a history rewrite.

These are the same guardrails the lab's research repos use, ported verbatim (and re-tested
in this repo — 71 cases pass). They matter even for a docs repo: a force-push or a bad
history rewrite on a public repo is hard to undo.

## Always-blocked (any cwd) — bypass with `BYPASS_SHARED_GUARD=1`

`git filter-repo`, `git filter-branch`, `git push --force`/`-f`/`--force-with-lease`/`+refspec`,
`git rebase` (non-resumption), `git reset --hard`, `git clean -f...`, `git update-ref -d`.

Resumption forms are allowed: `git rebase --continue`/`--abort`/`--skip`/`--quit`.

## Path-conditional (blocked only on shared cloud storage)

`rm -r`/`-rf`, `find ... -delete` when the path resolves under Dropbox/Google Drive/OneDrive/
Box/iCloud mounts. Single-file `rm` is not gated.

## settings.json write gate

Writes to `.claude/settings.json` via redirection, `tee`, `sed -i`, `mv`/`cp` overwrite, or a
scripted write are blocked (reads are fine). The companion `protect-files.sh` covers the
Edit/Write tools. Bypass with `BYPASS_SHARED_GUARD=1`.

## Bypass + audit

Prefix the command with `BYPASS_SHARED_GUARD=1` when the action is genuinely intended. Every
guard-eligible call is logged to `.claude/state/destructive-action-guard.log` (JSONL,
append-only). The bypass is visible in shell history.

## Post-rewrite verification

After a history rewrite, the PostToolUse hook injects a reminder to run `ls -la <paths>` and
`du -sh <repo>` and capture the output. **Do not narrate "tree unchanged / success" without
that evidence** — that false-success narration is the exact failure this guards against (see
`adversarial-default.md`).
