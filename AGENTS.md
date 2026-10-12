# Agent guidance
## Business rules, specs and data rules live in `docs/`

Anna reviews business rules, concepts, specs and data rules, so they are written down as Markdown in `docs/`
and kept current in the same commit as the code that depends on them.

- If your change adds or alters a business rule, a spec, a data rule or a definition, update the matching
  file in `docs/` in the same commit. If there is no matching file, add one with a clear `# Title` and a
  short opening paragraph that says what it covers.
- Do not leave a rule only in code, a commit message or a chat.
- When a document under `docs/` is added or changed, a bot offers it to the team in Slack, and a person
  confirms before it goes to Google Drive, where Anna reviews it. Write the opening paragraph so it works as
  the summary in that post.
- Technical notes only the developers need (setup, build, architecture) stay in the repo, and can live
  outside `docs/`.
