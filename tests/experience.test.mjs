import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const source = await read("components/landing/experience-utils.ts");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { companySlug, filterCompanies, readSavedIds, parseVideoUrl } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
const demoCompiled = ts.transpileModule(await read("components/landing/experience-demo.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { companyDemoGroups, companyToolGroups, companyToolContent, demoToolContent, isSampleMedia, previewMedia } = await import("data:text/javascript;base64," + Buffer.from(demoCompiled).toString("base64"));

test("company slugs handle directory punctuation without unsafe route characters", () => {
  assert.equal(companySlug({ name: "[24]7.ai" }), "24-7-ai");
  assert.equal(companySlug({ name: "About:Energy" }), "about-energy");
  assert.equal(companySlug({ name: "3D BioFibR" }), "3d-biofibr");
});

test("every directory record has a unique nonempty company route", async () => {
  const data = ts.createSourceFile("experience-data.ts", await read("components/landing/experience-data.ts"), ts.ScriptTarget.Latest, true);
  const declarations = data.statements.filter(ts.isVariableStatement).flatMap((statement) => statement.declarationList.declarations);
  const initializer = declarations.find((entry) => entry.name.getText(data) === "companies").initializer;
  assert.ok(ts.isArrayLiteralExpression(initializer));
  const slugs = initializer.elements.map((entry) => {
    assert.ok(ts.isObjectLiteralExpression(entry));
    const name = entry.properties.find((property) => property.name?.getText(data) === "name").initializer.text;
    return companySlug({ name });
  });
  assert.equal(slugs.length, 18);
  assert.ok(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));
  assert.equal(new Set(slugs).size, slugs.length);
});

test("individual company routes retain real facts and clearly distinguish sample sections", async () => {
  const route = await read("app/company/[slug]/page.tsx");
  const page = await read("components/landing/ExperiencePages.tsx");
  assert.match(route, /generateStaticParams/);
  assert.match(route, /dynamicParams = false/);
  assert.match(route, /if \(!company\) notFound\(\)/);
  assert.match(route, /company=\{company\} key=\{slug\}/);
  assert.match(page, /company \? companyDemoGroups\(company.name, companyVideo\(company\)\)/);
  assert.match(page, /\["Industry", company.industry\], \["Country", company.country\]/);
  assert.match(page, /Illustrative scores, not company assessments/);
  assert.match(page, /company-specific content has not been supplied/);
  assert.match(page, /Open " \+ company.name \+ " company page/);
  assert.match(page, /if \(!company\) return/);
  assert.match(page, /document.fonts.ready/);
  assert.match(page, /requestAnimationFrame\(\(\) => headingRef.current\?\.scrollIntoView/);
});

test("country, industry, and text filters compose without changing source order", () => {
  const companies = [
    { name: "Bravo", industry: "AI", country: "Canada" },
    { name: "Alpha", industry: "AI", country: "United States" },
    { name: "Charlie", industry: "Robotics", country: "Canada" },
  ];
  const defaults = { country: "", industry: "", query: "", sort: "original" };
  assert.deepEqual(filterCompanies(companies, { ...defaults, country: "Canada", industry: "AI", query: " BRAVO " }).map((c) => c.name), ["Bravo"]);
  assert.deepEqual(filterCompanies(companies, { ...defaults, sort: "asc" }).map((c) => c.name), ["Alpha", "Bravo", "Charlie"]);
  assert.deepEqual(filterCompanies(companies, { ...defaults, sort: "desc" }).map((c) => c.name), ["Charlie", "Bravo", "Alpha"]);
  assert.equal(filterCompanies(companies, { ...defaults, query: "unknown" }).length, 0);
  assert.equal(companies[0].name, "Bravo");
});

test("saved lists tolerate invalid storage and remove duplicate IDs", () => {
  assert.deepEqual(readSavedIds("not-json"), []);
  assert.deepEqual(readSavedIds('{"name":"bad"}'), []);
  assert.deepEqual(readSavedIds('["Alpha",null,12,"Alpha","Bravo"]'), ["Alpha", "Bravo"]);
});

test("video preview accepts verified provider forms and direct HTTPS MP4", () => {
  for (const url of ["https://youtu.be/DxhrKlsQgYY", "https://www.youtube.com/watch?v=DxhrKlsQgYY&feature=share", "https://youtube.com/embed/DxhrKlsQgYY", "https://youtube.com/shorts/DxhrKlsQgYY"]) {
    assert.deepEqual(parseVideoUrl(url), { youtubeId: "DxhrKlsQgYY" });
  }
  assert.deepEqual(parseVideoUrl("https://example.com/movie.mp4?signature=abc"), { videoUrl: "https://example.com/movie.mp4?signature=abc" });
  for (const url of ["javascript:alert(1)", "http://example.com/movie.mp4", "https://youtube.com.evil.test/watch?v=DxhrKlsQgYY", "https://youtu.be/invalid", "not a url", "https://example.com/page.html"]) assert.equal(parseVideoUrl(url), null);
});

test("all three routes select one inline central player instead of preview modals", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const player = await read("components/landing/ExperiencePlayer.tsx");
  assert.equal((page.match(/<ExperiencePlayer /g) ?? []).length, 3);
  assert.doesNotMatch(page, /VideoModal|setModalVideo/);
  assert.match(player, /youtube\.com\/embed/);
  assert.match(player, /allowFullScreen/);
  assert.match(player, /Sample media/);
  assert.match(player, /previewMedia\(video\)/);
  assert.match(page, /showModal\(\)/);
  assert.match(page, /Close company map/);
  assert.match(page, /worldCountryNames/);
  assert.match(page, /localStorage\.setItem/);
});

test("sample media fills missing sources without overwriting real or custom videos", () => {
  const missing = { title: "0pass", category: "Cybersecurity", image: "logo.png" };
  const before = { ...missing };
  assert.equal(isSampleMedia(missing), true);
  assert.equal(previewMedia(missing).youtubeId, "uJOA5IDaL5g");
  assert.match(previewMedia(missing).sampleAttribution, /Apptronik/);
  assert.match(previewMedia(missing).sampleAttribution, /Not the selected/);
  assert.deepEqual(missing, before);
  for (const media of [{ ...missing, youtubeId: "YVvbhJlxlf4" }, { ...missing, videoUrl: "https://example.com/real.mp4" }]) {
    assert.equal(isSampleMedia(media), false);
    assert.equal(previewMedia(media), media);
    assert.equal(previewMedia(media).sampleAttribution, undefined);
  }
});

test("sample source attribution remains visible when the large player caption is removed", async () => {
  const player = await read("components/landing/ExperiencePlayer.tsx");
  assert.match(player, /!showCaption && !content && media\.sampleAttribution/);
  assert.match(player, /hub-sample-attribution/);
});

test("company demo playlists have distinct saved titles and preserve the actual primary video", () => {
  const primary = { title: "Apptronik", category: "Robotics", image: "poster.jpg", youtubeId: "uJOA5IDaL5g" };
  const groups = companyDemoGroups("Apptronik", primary);
  assert.equal(groups.length, 5);
  assert.equal(groups[0].videos[0], primary);
  const samples = groups.flatMap((group) => group.videos).slice(1);
  assert.equal(new Set(samples.map((video) => video.title)).size, samples.length);
  assert.ok(samples.every((video) => isSampleMedia(video) && video.category.startsWith("Sample ")));
  const other = companyDemoGroups("0pass", { ...primary, title: "0pass", youtubeId: undefined });
  assert.ok(other.flatMap((group) => group.videos).every((video) => !video.title.includes("Apptronik")));
});

test("every AI tool has a sample brief while keeping live analysis disconnected", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const data = ts.createSourceFile("ExperiencePages.tsx", page, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declarations = data.statements.filter(ts.isVariableStatement).flatMap((statement) => statement.declarationList.declarations);
  const toolNames = declarations.find((entry) => entry.name.getText(data) === "tools").initializer.elements.map((entry) => entry.text);
  assert.equal(toolNames.length, 12);
  assert.ok(toolNames.every((tool) => demoToolContent[tool]?.length === 3));
  assert.match(page, /No live AI analysis or company assessment/);
  assert.match(page, /Recorded showroom sample. No live stream is connected/);
  assert.match(page, /detail="Sample data"/);
});

test("company tools cover all 22 Canva AI features and four data insights", () => {
  const expected = ["AI Research", "Innovation Summarize", "AI Market Research & Analysis", "Competitive Landscape", "Innovation Portfolio", "Product Research", "AI Marketing", "Product Launch / Demo", "Product Market Fit", "A/B Testing", "Marketing & Sales Data Insights", "Private Data Room", "AI Creation Toolkit", "AI Mentorship", "AI Discovery", "AI Recruitment", "AI Customer Service", "Deals Matchmaking", "Deals Screening", "Deals Valuation Estimator", "Due Diligence", "Benchmark With Competition", "Viewing History", "Discovery History", "Market Analysis", "Viewership Analysis"];
  const names = companyToolGroups.flatMap(group => group.tools);
  assert.deepEqual(names, expected);
  assert.equal(new Set(names).size, 26);
  const localTools = ["Viewing History", "Discovery History", "Viewership Analysis"];
  assert.ok(names.filter(name => !localTools.includes(name)).every(name => companyToolContent[name]?.length === 3));
});

test("company overview preserves the supplied copy and every Canva data field", async () => {
  const compiled = ts.transpileModule(await read("components/landing/innovators-profile.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const { innovatorsProfile } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
  assert.ok(innovatorsProfile.description.startsWith("The INNOVATORS is a Super Platform for Everything Innovation"));
  assert.ok(innovatorsProfile.description.includes("We reinvent an innovative way to do business."));
  assert.ok(innovatorsProfile.description.endsWith("leaving no one behind."));
  assert.equal(innovatorsProfile.description, [
    "The INNOVATORS is a Super Platform for Everything Innovation, powered by a first-of-its-kind educational+entertaining, tech+biz video ecosystem of all innovation stakeholders.",
    "As an one-stop-shop for innovation, it revolutionizes innovation ecosystems, boosts innovation productivity, transcends geographic & social boundaries, and accelerates innovation on global arena 24/7.",
    "By championing an innovation & entrepreneurship movement, we foster thought leadership, cultivate a community of leaders + innovators, and empower everyone to harness the power of emerging technologies for success and impact.",
    "We reinvent an innovative way to do business.",
    "We redefine a new lifestyle to discover the most innovative products & services while accelerating innovators' growth.",
    "Our mission is to drive emerging technologies' positive impact on people's daily lives and our society, leaving no one behind.",
  ].join(" "));
  const details = innovatorsProfile.blocks.flatMap(block => block.items).join(" ");
  for (const field of ["Investors:", "Funding rounds:", "Valuation:", "Cap table:", "Active fundraising:", "Technologies:", "Customers:", "Patents:", "Industries:", "Revenue:", "Hiring:", "ARR:", "Market-growth figures:", "Job openings:", "Accelerator affiliations:", "University affiliations:", "Industry association affiliations:"]) assert.ok(details.includes(field), field);
  assert.ok(innovatorsProfile.offerings.includes("INNOVATORS Video Show"));
});

test("AI separates topics, people, shorts, and companies in the correct order", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  assert.match(page, /<h1>Artificial Intelligence<\/h1>/);
  assert.match(page, /title="Trending topics" items=\{aiTopics\}/);
  assert.match(page, /title="People's Perspectives" items=\{peoplePerspectives\} kind="shorts"/);
  assert.match(page, /<CompanyRail title="Industry Trending"/);
  assert.match(page, /<CompanyRail title="AI Innovators"/);
});

test("company overview precedes optional archives and recommendations without fictional company facts", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const data = await read("components/landing/innovators-profile.ts");
  assert.ok(page.indexOf('title="Company overview"') < page.indexOf('aria-label="Additional company videos"'));
  assert.match(page, /<details key=\{group\.label\}>/);
  assert.match(data, /The INNOVATORS/);
  assert.match(data, /"Founders", "Not published"/);
  assert.match(page, /title="You may also like"/);
  assert.doesNotMatch(page, /Nexa Robotics|companyFacts|companyBlocks|company-playlist/);
  assert.doesNotMatch(page, /workspace ready|brief prepared|1,248 signals|48 high-fit/);
});

test("company template puts overview under the central frame with full-height thumbnail-left news", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const css = await read("app/styles/experience-hub.css");
  assert.match(page, /companyHeading=\{!company\}/);
  assert.match(page, /items=\{company \? groups\[0\]\.videos\.slice\(0, 4\) : newsLibrary\}/);
  assert.match(css, /grid-template-areas: "news core right" "news feeds right"/);
  assert.match(css, /\.company-template \.hub-news-item img \{ order: -1/);
  assert.match(css, /\.company-template \.hub-news \{ align-self: stretch/);
});

test("showroom icon controls switch features and media selections return to the player", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const player = await read("components/landing/ExperiencePlayer.tsx");
  for (const view of ["Videos", "Company profile", "Products", "Community", "Leadership", "Growth & data", "Tools", "Comments", "Search videos", "Live now", "Offerings", "Save video", "Private access", "Like video", "Invite", "Build showroom", "Share"]) assert.ok(page.includes('"' + view + '"'));
  assert.match(page, /content=\{stageContent\} controls=/);
  assert.match(page, /function selectCompanyVideo[\s\S]*?setActiveView\("Videos"\)/);
  assert.match(player, /content \?\? \(playing/);
  assert.match(page, /Publishing and white-label hosting are not connected/);
  assert.match(page, /No invitation is sent automatically/);
});

test("landing text has readable floors without viewport-dependent title sizing", async () => {
  const css = await read("app/styles/landing-readable.css");
  const adminCss = await read("app/styles/typography-admin.css");
  const page = await read("components/landing/InnovationDashboard.tsx");
  assert.match(page, /portal-shell landing-readable/);
  assert.match(css, /--portal-body: 1rem/);
  assert.match(css, /--portal-ui: 1rem/);
  assert.match(css, /--portal-meta: \.8125rem/);
  assert.match(css, /font-size: 1rem !important/);
  assert.doesNotMatch(css, /\dvw|font-size:.*clamp/);
  assert.doesNotMatch(adminCss, /clamp\(12px, 0\.78vw, 14px\)/);
});

test("latest JY feedback keeps Now headings, prominent accessible icons and aligned 16:9 homepage rows", async () => {
  const css = await read("app/styles/landing-readable.css");
  const chrome = await read("components/landing/chrome.tsx");
  const home = await read("components/landing/InnovationDashboard.tsx");
  const frame = await read("app/styles/tv-frame.css");
  const thumbnail = await read("components/landing/VideoThumbnail.tsx");
  assert.match(css, /--portal-heading-font: "Now"/);
  assert.doesNotMatch(css, /Oswald/);
  assert.match(chrome, /aria-label=\{label\}/);
  assert.match(css, /--module-icon-size: 6\.25rem/);
  assert.match(css, /\.module-label \{ opacity: 0/);
  assert.match(css, /button:is\(:hover, :focus-visible\) \.module-label \{ opacity: 1/);
  assert.match(home, /filter\(\(\[group\]\) => !\["Startups", "Communities"\]\.includes\(group\)\)/);
  assert.match(css, /aspect-ratio: 16 \/ 9/);
  assert.match(css, /\.video-copy\) \{ height: 4\.75rem; min-height: 4\.75rem/);
  assert.match(css, /grid-auto-columns: calc\(\(100% - 1\.5rem\) \/ 3\)/);
  const tv = await read("components/landing/TVFrame.tsx");
  assert.match(tv, /tv-cabinet-controls/);
  assert.match(frame, /minmax\(14rem, \.85fr\) minmax\(0, 2\.8fr\)/);
  assert.match(thumbnail, /is-letterboxed/);
  assert.match(frame, /\.video-thumbnail\.is-letterboxed > img \{ transform: scale\(1\.12\)/);
});
