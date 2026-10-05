# Company and Typography Acceptance Record

Sources: Loom f14a75f2606a4c08a15dda9ccf7c9c7e (4:59), current Canva page 6, the user's written size/frame requirements, and the public The INNOVATORS website. Full Loom transcript and reference screenshots are in untracked outputs/precision-2026-10-05.

## Implemented

- 0:03-0:16: frame directly below the sector rail; company name in the left column and above the frame on mobile.
- 0:33-0:45: 80px thumbnail-left feed, 15px titles, compact 12px metadata, reduced row gaps.
- 0:57-1:20: thicker TV cabinet; reusable frame/overlay components; company branding controls.
- 1:20-1:53: compact blue circular icon controls instead of text toolbar. Invite, showroom design, and sharing moved to the right column. Icon artwork and ambiguous meanings remain provisional, not an exact-artwork certification.
- 2:05-2:22: visible AI boxes renamed Inno Magic AI. Existing preview tools remain explicitly disconnected from live AI.
- 2:33: left and featured videos select the same central player.
- 2:44-3:33: no large selected-video caption or playlist dropdown. Compact scrolling featured thumbnails immediately beneath the frame.
- 3:45-4:01: overview beneath the central frame, general information, funding, products/technology, growth and connections. Removed fictional Nexa company data. Unverified facts and ratings are not fabricated.
- 4:20-4:28: optional tutorial/history archives below overview; recommendations and comments follow. Company tutorials/event media are explicitly unavailable rather than misleading stock footage.
- 4:38: shared CSS frame supports Retro CRT, Modern flat and Broadcast; frame/accent colors, brand name, logo/local-video preview, overlay toggles, bezel/radius, CSS-token copy/download and browser-local settings.
- /company is The INNOVATORS; existing /companyA, /corporateA and /corprateA compatibility routes use the same profile. Individual real directory company records retain their primary sources.
- Public body 1rem/1.5, UI .875-1rem, metadata .75-.875rem, typed inputs 1rem minimum; Arial UI/body and Spartan display headings. Public typography ignores old per-browser admin font preferences. rem values preserve browser text sizing.
- Landing layout responds to the locked sizes: three readable columns at normal desktop, four on wide desktop, two on tablet, one on mobile. Existing brand images and media treatments retained.

## Validation

- TypeScript, lint, production build and 27 tests passed during implementation.
- Initial 18-case browser matrix: six public routes at 1440, 960 and 390px; no page-level horizontal overflow, no failed images, every visible typed input 16px. Remaining tiny labels and hover-only menu labels repaired as a single batch.
- Exercised the 14 icon actions, feature content, source video selection, invitation target, clipboard sharing, watchlist and frame styles/overlays/token copy. Live and private access explicitly remain previews or disconnected.
- Confirmed central search results, recommendation selection, local comment creation, tutorial/history disclosures and actual CSS download contents. No shared comments or live-stream connection is implied.
- Confirmation matrix found no failed images or page overflow, and all typed inputs remained 16px. U.S. map SVG labels were the remaining 11px exception; corrected to .75rem with a readable mobile full-map link.
- Targeted confirmation: U.S. map labels 12px, mobile full-map link 14px, no mobile map overflow; designer typed inputs 16px and no mobile overflow. Applied LIVE overlay includes a not-live disclaimer. Per-company branding is isolated and survives Apply. /companyA resolves to The INNOVATORS profile.
- Final local build, lint and all 27 tests passed. Temporary local server and browser QA tab were stopped before deployment.
- Local upload end-to-end checks are currently gated by the Chrome extension's file-URL permission; chooser handling and local-only validation are implemented but not certified as browser-tested.

## Needs Verified Inputs

- Original Canva circular button artwork and definitive meaning of ambiguous icons. Lucide equivalents are a provisional implementation, not exact assets.
- Founders, founding date, location, stage, employee count, financial figures and affiliations.
- Actual company tutorials and event media; shared comment/auth/data-room/live/AI backend integrations.
- Claude's original designer artifact, if an exact match to that separate artifact is required. Current designer implements the supplied written specification.

## Follow-up Double-check

The current Canva page 6 was reopened and compared against the full saved Loom transcript and rendered production page. This exposed omissions in the first release, so the first release was not a complete Canva feature match:

- Restored the full supplied company overview instead of the shortened paraphrase. Its wording also matches the company's public About page.
- Restored the General heading and all requested overview labels, including active fundraising, customers, patents, industries, hiring, market and job openings. Unknown values remain explicitly unpublished or unverified.
- Replaced the abbreviated company AI list with all 22 Canva AI features, grouped as in the reference, plus the four Data Insights controls. AI-backed features expose clearly labelled sample briefs, not simulated live responses.
- Viewing History tracks recent local video selections; Discovery History tracks this panel's local searches; Viewership Analysis reports recent selections without implying audience analytics or watch duration.
- Kept selected tool results beside the activated control so they are not buried beneath the full catalogue.
- Added regression tests for all 26 tool names and the complete company data-field inventory.
- The original button graphics are visible in Canva, but download recovery was incomplete. Exact artwork and unlabeled icon meanings remain unresolved, not certified.
- Preserved compact sample-footage attribution even when the large player caption is hidden. A missing company video cannot silently become unlabelled Apptronik footage.
- Recheck: all 26 tool controls exercised, local search/selection histories updated correctly, and search-result selection used the central player. Seven routes at desktop/tablet/mobile (21 cases) had no overflow, no failed images, no visible text below 12px, and typed inputs at 16px.
- Targeted confirmation: sample attribution remained visible at 13px on desktop and mobile without overflow; actual INNOVATORS interviews were not incorrectly labelled samples. The central Tools view included the full 26-control catalogue. Other directory companies no longer inherit the INNOVATORS growth/funding panel.
- Final follow-up production build, lint and all 30 regression tests passed. Local preview and browser verification tab were stopped before deploying this repair.
