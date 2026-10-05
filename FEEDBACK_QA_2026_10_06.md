# Post-release double-check

The user requested another read of JY's latest Upwork messages and correction
of any concrete UI or interaction defects. The first read had no additional
client messages or edits. A subsequent read during release found two new
messages: story_1d98f46e5d8e159d6774d5ab626f35c2 at 21:22:51 UTC and
story_04ca74e1418f06e137a5e1ea3f32ef7b at 21:23:10 UTC on October 5.
JY asked about popup analysis UX and marketing-competition visualizations.

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

## New feedback follow-up

- AI tool results now open a native dialog on company, AI and innovators
  pages. The right rail stays compact, the central video stays selected, and
  closing the dialog returns focus to the invoking control.
- Marketing, sales and competitive tools include a comparison preview with
  metric selectors, two sample periods, horizontal bars and an accessible
  numeric table. Fictional brands and sample values are explicit, not real
  platform results. Real analytics and AI services remain unconnected.
- World and USA agent panels have the same marketing-comparison entry point.
- No new company facts, performance claims or competitor conclusions added.
- 35 tests, lint and production build passed. The new dialogs were checked
  on all five affected pages at 1440, 390 and 320px, with no internal or page
  horizontal overflow. Metric and period controls updated both bars and table;
  Escape closed the company dialog and restored focus to its invoking button.
  A final heading override prevents World panel styles shrinking dialog titles.
