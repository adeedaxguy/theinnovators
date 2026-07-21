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
    "components/landing/data.ts",
    "components/landing/media-cards.tsx",
    "components/landing/ScrollRail.tsx",
    "components/landing/Icon.tsx",
    "components/landing/types.ts",
    "app/styles/typography-admin.css",
  ]) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} should exist`);
  }
});

test("admin route has an access-control proxy", async () => {
  const proxy = await readProjectFile("proxy.ts");
  assert.match(proxy, /ADMIN_USERNAME/);
  assert.match(proxy, /ADMIN_PASSWORD/);
  assert.match(proxy, /WWW-Authenticate/);
  assert.match(proxy, /export function proxy/);
  assert.match(proxy, /matcher:\s*\["\/admin\/:path\*"\]/);
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
