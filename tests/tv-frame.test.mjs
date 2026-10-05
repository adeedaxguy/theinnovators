import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const compiled = ts.transpileModule(await read("components/landing/tv-frame-settings.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2021 } }).outputText;
const { DEFAULT_TV_FRAME, normalizeTVFrame, readTVFrame, accentInk, frameCSSTokens } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));

test("frame settings reject malformed storage, CSS injection and invalid dimensions", () => {
  assert.deepEqual(readTVFrame("not JSON"), DEFAULT_TV_FRAME);
  assert.deepEqual(readTVFrame("[]"), DEFAULT_TV_FRAME);
  const value = normalizeTVFrame({ style: "injected", frameColor: "red;display:none", accentColor: "#ffffff", bezel: Infinity, radius: -10, showLive: "true", brand: "x".repeat(100) });
  assert.equal(value.style, "broadcast"); assert.equal(value.frameColor, DEFAULT_TV_FRAME.frameColor);
  assert.equal(value.bezel, 16); assert.equal(value.radius, 0); assert.equal(value.showLive, false); assert.equal(value.brand.length, 80);
  const css = frameCSSTokens({ ...DEFAULT_TV_FRAME, brand: '\"; } body { color:red; } /*', bezel: 24 });
  assert.match(css, /--tv-bezel: 1\.5rem/);
  assert.match(css, /--tv-brand: "\\";/);
});

test("accent text meets AA contrast across all grayscale colors", () => {
  for (let c = 0; c < 256; c++) {
    const hex = "#" + c.toString(16).padStart(2, "0").repeat(3);
    const channel = c / 255;
    const l = channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    const contrast = accentInk(hex) === "#000000" ? (l + .05) / .05 : 1.05 / (l + .05);
    assert.ok(contrast >= 4.5, hex + " contrast " + contrast);
  }
});

test("uploads are local-only, released on replacement and never persisted as stale blob URLs", async () => {
  const designer = await read("components/landing/TVFrameDesigner.tsx");
  assert.match(designer, /URL\.revokeObjectURL\(logo\)/);
  assert.match(designer, /URL\.revokeObjectURL\(video\)/);
  assert.match(designer, /JSON\.stringify\(settings\)/);
  assert.doesNotMatch(designer, /JSON\.stringify\(.*logo|fetch\(/);
  assert.match(designer, /Files are not uploaded or saved/);
  assert.match(designer, /video\/mp4/);
});
