import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const source = await read("components/landing/experience-utils.ts");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { filterCompanies, readSavedIds, parseVideoUrl } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));

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
  assert.match(player, /Video source pending/);
  assert.match(page, /showModal\(\)/);
  assert.match(page, /Close company map/);
  assert.match(page, /worldCountryNames/);
  assert.match(page, /localStorage\.setItem/);
});

test("AI separates topics, people, shorts, and companies in the correct order", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  assert.match(page, /<h1>Artificial Intelligence<\/h1>/);
  assert.match(page, /title="Trending topics" items=\{aiTopics\}/);
  assert.match(page, /title="People's Perspectives" items=\{peoplePerspectives\} kind="shorts"/);
  assert.match(page, /<CompanyRail title="Industry Trending"/);
  assert.match(page, /<CompanyRail title="AI Innovators"/);
});

test("company overview precedes optional archive, with all 26 media slots retained", async () => {
  const page = await read("components/landing/ExperiencePages.tsx");
  const data = await read("components/landing/experience-data.ts");
  assert.ok(page.indexOf('title="Company overview"') < page.indexOf('aria-label="Additional company videos"'));
  assert.match(page, /<details key=\{group\.label\}>/);
  const groups = data.slice(data.indexOf("export const companyVideoGroups"), data.indexOf("export const companyFacts"));
  assert.equal((groups.match(/videos\[\d+\]/g) ?? []).length, 26);
  assert.doesNotMatch(page, /workspace ready|brief prepared|1,248 signals|48 high-fit/);
});
