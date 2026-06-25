---
name: pr-visual
description: Use when Codex should turn a pull request, code diff, changelog item, completed UI change, docs update, or product release into one launch-ready product visual, a marketing bento from 1-4 screenshots, a 1200x630 feature OG/social image, or a vertical story slideshow. The agent should infer the visible product change from PR context, run or inspect the app when practical, capture the real UI state, and create a grounded Screenshot Pop PNG/SVG for launch notes, PR comments, changelogs, docs, newsletters, support, sales, social previews, or landing pages. Do not use for screenshot upload-only requests unless the user is explicitly providing a source image.
---

# PR Visual

Screenshot Pop is the PR-to-launch-visual skill for coding agents. Use it to turn
real product work into one publishable screenshot asset, a marketing bento, a
feature OG image, or a vertical story slideshow without asking the user to first
prepare the visual.

## Product Promise

Start from the PR or product change, not from an uploaded screenshot.

The agent should:

1. Understand what changed from the PR, diff, branch, issue, or changelog text.
2. Identify the visible product surface that proves the change.
3. Run, open, or inspect the app when practical.
4. Capture the real UI state.
5. Create one grounded visual, a 1-4 screenshot bento, a feature OG image, or a
   story slideshow with Screenshot Pop.
6. Return the image path or URL plus a short caption.
7. When working in a PR workflow, offer to comment with the visual.

## Use When

- A PR needs a launch visual, changelog image, release-note graphic, or reviewer
  handoff.
- A launch, landing page, social post, or sales deck needs a bento image from
  1-4 product screenshots.
- A feature needs a 1200x630 Open Graph/link preview/social card with short
  launch copy and one zoomed crop of the real UI.
- A launch/social story needs 2-6 vertical slides where each frame explains one
  step with either a full screenshot or a zoomed product crop.
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
- The only available source would be agent-authored HTML, a throwaway demo page,
  a synthetic fixture, or a recreated mock of the product UI. Ask for or capture
  a real product/site screenshot instead.
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
   - Do not recreate the app UI, invent data, fabricate a product state, or
     write custom HTML/CSS just to produce a nicer-looking source screenshot.
   - Never present synthetic fixtures, local mock pages, Storybook-only
     recreations, or agent-designed HTML as "real screenshots" or example
     product material. Test fixtures are acceptable only for automated renderer
     checks and must be labeled as such.
   - For bento visuals, prefer focused screenshots of the relevant HTML node,
     component, card, panel, modal, or section instead of a full-page screenshot.
     In Playwright this can be a locator/element screenshot. In browser tools,
     crop to the DOM node or selected component. Do not feed previously
     annotated Screenshot Pop outputs back into the bento tool.
   - For bento source selection, inspect the page visually before choosing what
     to capture. Do not pick screenshots by DOM order, index guesses such as
     "first section" or "nth section", random center crops, or hidden/offscreen
     layout boxes. A good bento source is a real product moment with clear
     visible UI, enough surrounding context, and no cookie banner, modal, broken
     animation frame, or clipped headline covering the subject.
   - If using public websites or competitor examples as source material, capture
     only what is visible in the browser after visual inspection. Save broad
     candidate screenshots first when needed, inspect them, then crop deliberately
     to the useful product surface. Do not design substitute UI just because the
     real page is hard to crop.
   - If the available screenshots are weak, too shallow, blurry, obstructed, or
     visually random, report that better source material is needed instead of
     forcing a polished-looking fake.
   - When the captured node has rounded corners, read its computed CSS
     `border-radius` and pass the pixel value as `borderRadius` with that bento
     screenshot. This keeps node screenshots from rendering as sharp rectangles
     inside the bento card.
   - If the requested value moment is not visible, report source missing.

4. Create the visual through Screenshot Pop MCP.
   - Read the PR/diff locally, then send only `prTitle`, `changeSummary`,
     optional `prUrl`, optional `targetSurface`, brand/channel fields, and the
     captured screenshot.
   - Preserve user-selected visual background settings on every template:
     pass `backgroundColor` for a solid canvas, or `backgroundGradient` with
     2-4 hex stops plus optional `backgroundGradientDirection` for gradients.
   - For portrait mobile screenshots in bento, feature OG, or story templates,
     pass `deviceFrame: "auto"` or `deviceFrame: "iphone-minimal"`. This wraps
     the real screenshot in a minimal phone frame. Do not fabricate UI inside
     the device.
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
   - Use `start_feature_og_image_job` or `create_feature_og_image` when the user
     wants an OG image, link preview image, social card, launch card, or feature
     hero image. Send one real product screenshot, `title`, optional `subtitle`
     and `eyebrow`, plus either an explicit normalized `crop` or `targetText`
     for the feature's most important visible UI. The OG visual should be short
     marketing text plus one cropped/zoomed screenshot, not an annotated
     walkthrough.
   - Use `start_story_slideshow_job` or `create_story_slideshow` when the user
     wants story socials, a vertical slideshow, or step-by-step social frames.
     Send 2-6 real product screenshots in `slides`. Each slide should carry one
     step with `title`, optional `body`, optional `stepLabel`, and
     `screenshotMode: "full"` for context or `screenshotMode: "zoom"` with
     `crop`/`targetText` for the important UI. The text explains the step; the
     screenshot proves it.
   - For each focused bento screenshot, send a short `title`, optional
     `caption`, and `captureKind: "html-node"` or
     `captureKind: "focused-crop"`. Add a fitting Lucide `icon` for the feature
     or outcome, for example `Bot`, `Camera`, `Crop`, `FileText`, `Globe`,
     `LayoutGrid`, `Megaphone`, `MessageSquare`, `Rocket`, `ShieldCheck`,
     `Workflow`, or `Zap`. Add `borderRadius` for rounded nodes. Add
     `deviceFrame: "auto"` when the source is a portrait mobile app screenshot.
     Do not add `targetText` when the screenshot already is the focused node.
   - Use `targetText` only as a fallback for full-page screenshots. OmniParser
     returns many UI regions; `targetText` tells Screenshot Pop which detected
     region to choose. Use an explicit normalized `crop` only when node capture
     is not available and the target has no visible text.
   - Poll `get_pr_visual_job` until the job succeeds or fails.
   - Poll `get_bento_visual_job` for bento renders.
   - Poll `get_feature_og_image_job` for feature OG renders.
   - Poll `get_story_slideshow_job` for story slideshow renders.
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
