# Company frame and typography feedback

Sources: client Photos 1-3; Loom https://www.loom.com/share/478c1acd6d2445b6b618806b50f39d8b ; Canva page 6 at https://canva.link/s4o8pq6ffoaqzad .

## Review evidence

The full 220.501-second Loom played continuously at 1x to its ended state. Its complete transcript and captions were reviewed alongside screenshots at the start, news/frame section, overview, sharing and final alignment. This is transcript/caption and visual review, not a claim of independently hearing audio.

Local evidence: `outputs/frame-feedback-2026-10-06/`. Generated QA files are intentionally not committed.

## Requirements and implementation

- 0:00-0:40: wider company side columns, narrower central frame, blue radiant edges on all four sides. Added cyan/white edges and bright blue glow with repeated black brand text. Native video letterboxing is preserved.
- 0:40-1:12: news-style thumbnail-left stories, more stories, community and events underneath. Publicly sourced platform overviews and interview headlines replace the bare-name list. Unverified award, launch and market-leadership claims were not invented.
- 1:12: startup/manufacturing community examples and event formats appear as explicitly labelled samples. Each opens its own context in the central frame; membership, event dates and registration are not connected.
- 1:27-1:43: recovered all 14 original Canva PNG button assets, preserving their order. Controls spread across the frame in balanced rows on narrower screens and one row when space permits. The compact featured video strip remains.
- 1:50-2:09: overview stays beneath the central frame. Website/About/Contact share its heading row and wrap when needed. Product and innovation growth remains part of the overview.
- 2:20: added Customer Profiles and Market Position, with unknown customer metrics and market-share data explicitly unpublished.
- 2:35 and screenshots: self-hosted Now for content, Roboto for controls and Oswald bold for headline accents. Body 16px, UI 15px, secondary metadata 13px, company field labels 14px, inputs 16px, all using rem units.
- 2:46: retained recommendations, optional video archives and readable small-video titles.
- 2:57-3:21: compact Invite/Build/Share icon buttons, accessible names and tooltips; readable unrated ranking rows. News, frame and right-hand tools start at the same desktop grid position.
- 3:33: shared typography applies across public pages. AI and innovators directory use the same default radiant central frame without changing their existing media selection workflows. World/USA retain their page-specific frame designs.

## Original controls and chosen mappings

The user approved best-judgment mappings for the unlabeled artwork. These are implementation decisions, not claimed client-defined mappings.

1. Robot arm: innovation video/demo library; no supplied product demos are implied.
2. CEO: leadership interviews, explicitly not company founders/employees.
3. PDF: company profile with print action.
4. Storefront: publicly described products/offerings.
5. Bar chart: funding, growth, customer profiles and market positioning.
6. Nine-dot grid: research and AI-tool previews.
7. Chat: local comments, not published.
8. Video: return to central player.
9. Keyboard: search the video library.
10. 24/7: recorded showroom preview, explicitly not a live stream.
11. BUY: public offerings; no preview checkout.
12. Heart: saved videos in this browser.
13. Locked account: access information and email request, not an authenticated data room.
14. Thumbs up: browser-session like toggle, not a published reaction.

## Validation and limitations

Automated tests cover normalization, old-default migration without overwriting custom frames, contrast, original image assets, required company fields and local-upload cleanup. Production build includes TypeScript checks.

Browser evidence covers company, AI, innovators, world, USA, homepage and frame designer at 1440px, 960px and 390px. The first pass found no horizontal overflow, broken loaded images, sub-12px checked copy or under-16px visible form inputs. A lone second-row button was found visually and repaired into balanced control rows.

All 14 actions and news-to-player selection were exercised. Frame-style switching, live/low-third previews, repeated branding toggle and reset were exercised. File-picker upload remains unverified in the browser; automated validation does not substitute for that check.

AI services, cloud comments/reactions, private accounts, live streaming, checkout and white-label publishing are not integrated. Sample sections remain labelled. Public-company accuracy is limited to supplied or published information.
