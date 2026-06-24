# Screenshot Pop plugins

Screenshot Pop gives coding agents a PR visual skill: give the agent a pull
request or completed product change, and get one grounded launch-ready product
visual or a 1-4 screenshot bento for PR comments, changelogs, docs,
newsletters, landing pages, support, or sales.

The skill starts from the product work. The agent reads PR context locally,
finds or captures the real UI state, then sends Screenshot Pop only a short
user-visible summary plus the screenshot or screenshots. Do not send source
code, raw diffs, file contents, or changed file lists to Screenshot Pop.
For bento visuals, agents should prefer focused screenshots of the relevant
HTML node, component, card, panel, modal, or section and send
`captureKind: "html-node"` instead of sending a full-page screenshot. When the
captured node is rounded, also send its computed CSS `borderRadius` in pixels
so the bento render keeps the same rounded corners. Full-page screenshots are a
fallback: use `targetText` so OmniParser knows which detected UI region to crop.
Agents should inspect bento sources visually before cropping. Do not fabricate
UI, choose sections by DOM order, or force weak/random crops into a bento. For
each bento tile, choose a fitting Lucide `icon` such as `Bot`, `Camera`, `Crop`,
`FileText`, `Globe`, `LayoutGrid`, `Megaphone`, `Rocket`, or `Workflow`.

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

The included `.mcp.json` wires the hosted endpoint. Modern MCP clients discover
Screenshot Pop auth from the endpoint, register automatically, and complete the
OAuth flow in the browser with your Screenshot Pop workspace access code.

## Try It

After installing the skill and connecting MCP, ask:

```text
Use Screenshot Pop to create a launch-ready visual for the current PR. Read the
PR and diff locally, identify the visible product change, run or inspect the
app, capture the real UI, call start_pr_visual_job for one screenshot or
start_bento_visual_job for a 1-4 screenshot marketing bento. For bento, capture
the relevant HTML node/component when possible and send captureKind:
"html-node" plus borderRadius from computed CSS when the node is rounded. Use
targetText only for full-page screenshots that need OmniParser targeting.
Inspect bento source screenshots visually before cropping; do not fabricate UI
or choose sections by DOM order. For each bento tile, choose a fitting Lucide
icon. Add a PR comment with the artifact URL and a one-sentence caption. Do not
send source code, raw diffs, file contents, or changed file lists to Screenshot
Pop.
```

## Included Skill

- `pr-visual`: turn a pull request, changelog item, docs update, or completed
  product change into one launch-ready screenshot visual or marketing bento.

The skill lives at `skills/pr-visual/SKILL.md`.
