# Post-release double-check

The user requested another read of JY's latest Upwork messages and correction
of any concrete UI or interaction defects. No additional client messages or
edits were present beyond the revisions already documented in
FEEDBACK_LATEST_2026_10_06.md.

## Found and fixed

1. At 390px, four showroom buttons extended beyond the inner toolbar area.
   Container queries now measure that inner area, not the whole cabinet.
   The original 44px buttons use 14, 7, 5 or 4 columns according to available
   width. Query thresholds use rem so they scale with browser font preferences.
   Edge tooltips anchor to the correct end of each row.
2. Mobile header action links extended outside their 64px row. Header rows now
   fit the existing 16px text, rather than reducing the text size. Scroll margins
   follow the header height so selected content remains below the sticky menus.
3. Three image-only homepage play buttons lacked accessible names. All
   ImagePlayCard buttons now expose a Play + title accessible label.
4. An unmatched central video search returned a blank result area. It now
   announces No videos found, trims query whitespace, and uses search state
   separate from the video-source URL field.

## Confirmation

- 34 tests passed; lint and production build/TypeScript passed.
- Mechanical UI detector found no issues in the checked changed surfaces.
- Seven surfaces checked at 1440, 800, 390 and 320px: homepage, company,
  innovators, AI, world, USA and frame designer.
- No page overflow, broken completed images, unnamed visible buttons, header
  action spill or showroom toolbar spill in that confirmation matrix.
- Representative toolbar edge tooltips remained inside the inner frame at
  390px and 320px.
- Unmatched search announced its empty state. A spaced uppercase CHRIS query
  matched Chris Coburn; selecting it opened the actual YouTube interview.
- At 320px, selected player top was 304px, below the sticky category bar's 282px
  bottom. Video and native controls remain uncropped.
- Screenshots and measurements are in outputs/double-check-2026-10-06/.

## Unchanged limitations

These checks do not claim working cloud AI, authentication, publishing,
checkout or private-room integrations. Those remain labelled previews as
previously documented. Original video files and cross-origin player content
are not edited; native source-video letterboxing can remain.

No client message or milestone is authorized by this QA request. The final
handoff remains on hold, and the old Oswald-based draft must not be used.
