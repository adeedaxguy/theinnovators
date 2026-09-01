import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

async function readProjectFile(path) {
  return readFile(new URL(path, root), "utf8");
}

test("landing route delegates to componentized dashboard", async () => {
  const source = await readProjectFile("app/page.tsx");
  assert.match(source, /components\/landing\/InnovationDashboard|@\/components\/landing\/InnovationDashboard/);
});

test("critical landing component files exist", () => {
  for (const file of [
    "components/landing/InnovationDashboard.tsx",
    "components/landing/IntelligencePage.tsx",
    "components/landing/UsaIntelligencePage.tsx",
    "components/landing/UsaMapExperience.tsx",
    "components/landing/GeographicMap.tsx",
    "components/landing/IntelligenceAnalytics.tsx",
    "components/landing/data.ts",
    "components/landing/intelligence-data.ts",
    "components/landing/media-cards.tsx",
    "components/landing/ScrollRail.tsx",
    "components/landing/Icon.tsx",
    "components/landing/types.ts",
    "app/world/page.tsx",
    "app/usa/page.tsx",
    "app/usa/map/page.tsx",
    "app/styles/typography-admin.css",
  ]) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} should exist`);
  }
});

test("world and USA landscape routes are wired from landing data", async () => {
  const data = await readProjectFile("components/landing/data.ts");
  assert.match(data, /"US Innovation Landscape": "\/usa"/);
  assert.match(data, /"World Innovation Landscape": "\/world"/);
});

test("USA uses its dedicated Canva-aligned layout and map overlay", async () => {
  const route = await readProjectFile("app/usa/page.tsx");
  const page = await readProjectFile("components/landing/UsaIntelligencePage.tsx");
  const map = await readProjectFile("components/landing/UsaMapExperience.tsx");

  assert.match(route, /UsaIntelligencePage/);
  assert.match(page, /Made in America/);
  assert.match(page, /AI Discover Agent/);
  assert.doesNotMatch(page, /Innovation News/);
  assert.match(map, /showModal\(\)/);
  assert.match(map, /Minimize interactive map/);
  assert.match(map, /Full interactive map/);
  assert.match(map, /href="\/usa\/map"/);
});

test("intelligence pages use real atlas geography and interactive analytics", async () => {
  const map = await readProjectFile("components/landing/GeographicMap.tsx");
  const analytics = await readProjectFile("components/landing/IntelligenceAnalytics.tsx");

  assert.match(map, /world-atlas\/countries-110m\.json/);
  assert.match(map, /us-atlas\/states-10m\.json/);
  assert.match(map, /onSelectPoint/);
  assert.match(analytics, /Search directory/);
  assert.match(analytics, /Comparative View of Higher Education Institutes/);
  assert.match(analytics, /startup-directory-table/);
});

test("admin route has an access-control proxy", async () => {
  const proxy = await readProjectFile("proxy.ts");
  assert.match(proxy, /ADMIN_USERNAME/);
  assert.match(proxy, /ADMIN_PASSWORD/);
  assert.match(proxy, /WWW-Authenticate/);
  assert.match(proxy, /export function proxy/);
  assert.match(proxy, /matcher:\s*\["\/admin\/:path\*",\s*"\/USA"\]/);
});

test("runtime dependencies are pinned to exact versions", async () => {
  const pkg = JSON.parse(await readProjectFile("package.json"));
  const sections = [pkg.dependencies, pkg.devDependencies].filter(Boolean);

  for (const deps of sections) {
    for (const [name, version] of Object.entries(deps)) {
      assert.equal(
        /^[~^*]|latest|next$/i.test(String(version)),
        false,
        `${name} should be pinned, got ${version}`
      );
    }
  }
});
