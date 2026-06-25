# Screenshot Pop plugins

Screenshot Pop gives coding agents a PR visual skill: give the agent a pull
request or completed product change, and get one grounded launch-ready product
visual, a 1-4 screenshot bento, a 1200x630 feature OG image, or a vertical
story slideshow for PR comments, changelogs, docs, newsletters, landing pages,
support, sales, or social/link previews.

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
For feature OG images, agents should call `start_feature_og_image_job` or
`create_feature_og_image` with one real screenshot, short `title`/`subtitle`
copy, and either an explicit normalized `crop` or `targetText` for the main
visible feature area. The result should be text plus a zoomed screenshot crop,
not a fabricated UI mockup or annotated walkthrough.
For story slideshows, agents should call `start_story_slideshow_job` or
`create_story_slideshow` with 2-6 real screenshots. Each slide should describe
one step and use `screenshotMode: "full"` for context or
`screenshotMode: "zoom"` with `crop`/`targetText` for the important action area.
For portrait mobile screenshots in bento, feature OG, or story templates, pass
`deviceFrame: "auto"` or `deviceFrame: "iphone-minimal"` so Screenshot Pop wraps
the real screenshot in a minimal phone frame. Do not fabricate app UI inside a
device mockup.
All template tools accept user-selected background controls. Pass
`backgroundColor` for a solid canvas, or `backgroundGradient` with 2-4 hex color
stops and optional `backgroundGradientDirection` when the user specifies a
brand/background look.

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
start_bento_visual_job for a 1-4 screenshot marketing bento, or
start_feature_og_image_job for a 1200x630 feature OG/social preview image, or
start_story_slideshow_job for 2-6 vertical story slides. For bento, capture the
relevant HTML node/component when possible and send captureKind: "html-node"
plus borderRadius from computed CSS when the node is rounded. Use targetText
only for full-page screenshots that need OmniParser targeting. Inspect bento,
OG, and story source screenshots visually before cropping; do not fabricate UI
or choose sections by DOM order. For each bento tile, choose a fitting Lucide
icon. If the user selected a background color or gradient, pass it as
backgroundColor or backgroundGradient/backgroundGradientDirection. If the source
is a portrait mobile screenshot, pass deviceFrame: "auto" or
deviceFrame: "iphone-minimal". Add a PR comment with the artifact URL and a
one-sentence caption. Do not
send source code, raw diffs, file contents, or changed file lists to Screenshot
Pop.
```

## Included Skill

- `pr-visual`: turn a pull request, changelog item, docs update, or completed
  product change into one launch-ready screenshot visual, marketing bento,
  feature OG image, or story slideshow.

The skill lives at `skills/pr-visual/SKILL.md`.
