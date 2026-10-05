# Latest JY revisions, October 6, 2026

This supersedes the typography/proportion decisions in the preceding feedback
record. The earlier release remains documented separately; do not describe it as
the client's final approved design.

## Source and scope

Upwork workroom: J Y / 3i, Landing page development.
Latest client text messages, including edits through 2026-10-05 20:53:15 UTC:

- `story_6c799b146345b09e28a0801baf8929d3`: replace Oswald with Now.
- `story_84545f045ec94749b4340c529bf30e56`: larger top icons, labels on hover only,
  readable text throughout the pages.
- `story_05b57a3f16df993a1566045f4ba5637b`: wider main frame, narrower news rail,
  original buttons inside the frame near its bottom, better bright blue radiant
  treatment, no black caption strips or thumbnail letterbox bars.
- `story_22de67996a10bc554c3ed9ccd47d4097`: remove Startups and Communities from
  homepage Leaders, exactly three leaders and three startup thumbnails per row,
  YouTube 16:9 thumbnails, larger Now names with tighter name/title spacing,
  aligned rows and less excess whitespace.

## Implemented

- Now body and display typography; Roboto remains the requested interface font.
  Body and interface tokens are 1rem, metadata .8125rem, typed inputs 1rem.
  The public font provider no longer reintroduces Arial/Spartan for content.
- Prominent menu icons, default-hidden 14px labels visible on hover/keyboard
  focus, and explicit accessible names on every icon button.
- At 1440px the company grid is approximately 233 / 766 / 274px instead of
  321 / 671 / 280px. The innovators directory central frame is also widened.
- All fourteen original showroom buttons sit inside the TV cabinet below the
  screen. No video controls or content are covered by the showroom toolbar.
- Luminous cyan/blue cabinet with white highlights and the repeated black
  INNOVATORS lettering retained on all four edges.
- White caption surfaces instead of dark bars below homepage leaders/video
  thumbnails. Billboard title strips use a light readable surface.
- Homepage Leaders includes only Academia, Industry, Government and VC.
  Each rail displays exactly three complete cards; both columns use matching
  row heights on desktop/tablet. Name and role spacing is compact, not an overlay
  over the face. Startup previews have a 16:9 ratio.
- Reduced the oversized Ideas section from about 1929px to 644px on desktop
  by removing flexible empty rows and constraining its secondary preview.
- A shared preview-image wrapper trims YouTube hqdefault letterboxing. The
  actual embedded videos, controls and source files are never cropped or edited.

## Verification

- 33 automated tests passed; lint and production build/TypeScript passed.
- Local responsive check: /, /company, /companyA, /innovators, /AI, /world, /usa
  at 1440, 960 and 390px. No document overflow, broken completed images, or
  visible form inputs below 16px.
- Four corresponding homepage rows measured identically on desktop/tablet.
  Three-card widths plus two gaps fill each visible rail exactly.
- All fourteen showroom controls exercised in the browser. Feature views,
  local saves/likes and the clearly labelled recorded live preview responded.
- Selecting Chris Coburn from News routes the central player to the real
  interview, not the sample robot video.
- Evidence: outputs/latest-feedback-2026-10-06/ (not published with the site).

## Handoff limits

The user requested that final completion messaging and milestone resubmission
remain on hold until the newest feedback is checked. A progress-only message
has been presented for approval; do not send a different or final message under
that approval. Re-read the client messages before preparing the final package,
including edits to earlier messages, not just newly created messages.

AI services, cloud comments/reactions, authentication/private rooms, real live
streaming, checkout, invitations and white-label publishing remain labelled
previews where not integrated. Browser-local uploads are not cloud uploads.
Native source-video letterboxing cannot be removed from a cross-origin player
without changing/cropping the actual video; the thumbnail treatment does not
claim to alter those source videos. Exact radiant color preference still needs
client visual acceptance; no exact new color code was supplied.
