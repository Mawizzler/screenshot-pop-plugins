# Screenshot Pop plugins

Screenshot Pop gives coding agents a PR visual skill: give the agent a pull
request or completed product change, and get one grounded launch-ready product
visual for PR comments, changelogs, docs, newsletters, support, or sales.

The skill starts from the product work. The agent reads PR context locally,
finds or captures the real UI state, then sends Screenshot Pop only a short
user-visible summary plus the screenshot. Do not send source code, raw diffs,
file contents, or changed file lists to Screenshot Pop.

## Install

Install the skill directly for any agent that supports skills:

```sh
npx skills add Mawizzler/screenshot-pop-plugins
```

Preview available skills without installing:

```sh
npx skills add Mawizzler/screenshot-pop-plugins --list
```

## MCP

The hosted Screenshot Pop MCP endpoint is:

```txt
https://screenshot-pop-az63vombma-ew.a.run.app/mcp
```

MCP requires a bearer token:

```txt
Authorization: Bearer <MCP_FREE_BEARER_TOKEN or MCP_PRO_BEARER_TOKEN>
```

The included `.mcp.json` wires the hosted endpoint. The token is not stored in
this repository.

## Try It

After installing the skill and connecting MCP, ask:

```text
Use Screenshot Pop to create a launch-ready visual for the current PR. Read the
PR and diff locally, identify the visible product change, run or inspect the
app, capture the real UI, call start_pr_visual_job, and add a PR comment with
the artifact URL and a one-sentence caption. Do not send source code, raw
diffs, file contents, or changed file lists to Screenshot Pop.
```

## Included Skill

- `pr-visual`: turn a pull request, changelog item, docs update, or completed
  product change into one launch-ready screenshot visual.

The skill lives at `skills/pr-visual/SKILL.md`.
