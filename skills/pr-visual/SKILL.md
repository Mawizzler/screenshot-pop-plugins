---
name: pr-visual
description: Use when Codex should turn a pull request, code diff, changelog item, completed UI change, docs update, or product release into one launch-ready product visual or a marketing bento from 1-4 screenshots. The agent should infer the visible product change from PR context, run or inspect the app when practical, capture the real UI state, and create a grounded Screenshot Pop PNG/SVG for launch notes, PR comments, changelogs, docs, newsletters, support, sales, or landing pages. Do not use for screenshot upload-only requests unless the user is explicitly providing a source image.
---

# PR Visual

Screenshot Pop is the PR-to-launch-visual skill for coding agents. Use it to turn
real product work into one publishable screenshot asset or a marketing bento
without asking the user to first prepare the visual.

## Product Promise

Start from the PR or product change, not from an uploaded screenshot.

The agent should:

1. Understand what changed from the PR, diff, branch, issue, or changelog text.
2. Identify the visible product surface that proves the change.
3. Run, open, or inspect the app when practical.
4. Capture the real UI state.
5. Create one grounded visual or a 1-4 screenshot bento with Screenshot Pop.
6. Return the image path or URL plus a short caption.
7. When working in a PR workflow, offer to comment with the visual.

## Use When

- A PR needs a launch visual, changelog image, release-note graphic, or reviewer
  handoff.
- A launch, landing page, social post, or sales deck needs a bento image from
  1-4 product screenshots.
- A UI, docs, onboarding, support, or product-marketing change has shipped and
  would be easier to understand visually.
- The user asks for "promo material", "launch visual", "PR screenshot",
  "screenshot demo", "changelog image", "social frame", or "docs callout" from
  work in the repo.
- The agent just completed UI work and should leave behind a shareable visual.

## Do Not Use When

- The task is text-only and no visual product surface changed.
- The app cannot be run or inspected and no reliable screenshot/source exists.
- The requested state is not visible in the captured UI.
- The visual would expose secrets, credentials, private customer data, tokens,
  billing details, admin-only data, or unnecessary personal information.
- The user explicitly says not to create a visual.

## Default Workflow

1. Inspect the PR/change context.
   - Prefer PR title, PR body, diff, changed routes/components, tests, stories,
     docs, and changelog entries.
   - Identify the user-visible value moment in one sentence.

2. Find the product surface.
   - Start the local app if needed and practical.
   - Navigate to the route, story, docs page, or state that shows the change.
   - Ask one concise question only when the route/state cannot be inferred.

3. Capture real evidence.
   - Use a real browser screenshot or user-provided product screenshot.
   - Do not recreate the app UI, invent data, or fabricate a product state.
   - For bento visuals, prefer focused screenshots of the relevant HTML node,
     component, card, panel, modal, or section instead of a full-page screenshot.
     In Playwright this can be a locator/element screenshot. In browser tools,
     crop to the DOM node or selected component. Do not feed previously
     annotated Screenshot Pop outputs back into the bento tool.
   - When the captured node has rounded corners, read its computed CSS
     `border-radius` and pass the pixel value as `borderRadius` with that bento
     screenshot. This keeps node screenshots from rendering as sharp rectangles
     inside the bento card.
   - If the requested value moment is not visible, report source missing.

4. Create the visual through Screenshot Pop MCP.
   - Read the PR/diff locally, then send only `prTitle`, `changeSummary`,
     optional `prUrl`, optional `targetSurface`, brand/channel fields, and the
     captured screenshot.
   - Do not send source code, raw diffs, file contents, or changed file lists to
     Screenshot Pop.
   - Start with `start_pr_visual_job` for real renders, or `create_pr_visual`
     when the agent can wait for the full render.
   - Use `layoutStrategy: "safe-labels"` for an internal arrow explainer:
     a lightweight visual addition that points at the new feature, function, or
     next action. Keep labels short; the PR comment, docs, or launch copy should
     carry the full explanation.
   - Use `start_bento_visual_job` or `create_bento_visual` when the user wants a
     marketing bento or when 2-4 screenshots together tell the story better than
     one callout image.
   - For each focused bento screenshot, send a short `title`, optional
     `caption`, and `captureKind: "html-node"` or
     `captureKind: "focused-crop"`. Add `borderRadius` for rounded nodes. Do
     not add `targetText` when the screenshot already is the focused node.
   - Use `targetText` only as a fallback for full-page screenshots. OmniParser
     returns many UI regions; `targetText` tells Screenshot Pop which detected
     region to choose. Use an explicit normalized `crop` only when node capture
     is not available and the target has no visible text.
   - Poll `get_pr_visual_job` until the job succeeds or fails.
   - Poll `get_bento_visual_job` for bento renders.
   - Use hosted storage URLs when present.
   - Check quality metadata before publishing.

5. Return a publishing-ready result.
   - Include the final PNG/SVG path or URL.
   - Include a one-sentence caption.
   - Mention any blocker plainly: source missing, app not runnable, weak visual
     proof, private data risk, or review-needed output.

## PR Comment Shape

Use this structure when the user wants a PR comment:

```text
Launch visual: <artifact URL or path>

Caption: <one sentence explaining what the image shows>

Notes: <only include if review is needed or the source was limited>
```

Do not include internal model traces, benchmark paths, or implementation chatter
in the PR comment.
