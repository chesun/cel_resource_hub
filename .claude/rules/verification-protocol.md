# Verification Protocol

**At the end of every task, verify the output actually works.** For a docs site that means
the site builds cleanly and links resolve.

## Before committing

1. **Strict build:**

    ```bash
    source .venv/bin/activate && mkdocs build --strict
    ```

   `--strict` turns broken internal links, missing nav targets, and orphaned pages into
   errors. A clean strict build is the bar.

2. **New page wired into nav** — every new `docs/**/*.md` is added to the `nav:` in
   `mkdocs.yml` (or intentionally excluded). Strict build catches orphans.

3. **Links resolve** — internal links use relative paths between `docs/` files; external
   links point at real URLs (or are marked `TODO` when unknown).

4. **No accidental placeholders shipped as fact** — `TODO`/`_TODO_` markers are fine as
   visible placeholders, but a claim stated as fact must be derivable (see `no-assumptions.md`).

## After editing hooks

Run the hook tests:

```bash
.venv/bin/python -m pytest .claude/hooks/test_stop_hooks_lib.py -q
python3 .claude/hooks/test_destructive_action_guard.py
```

## Report results

State the verification outcome (build passed/failed, test counts) rather than asserting
success — see `adversarial-default.md`.
