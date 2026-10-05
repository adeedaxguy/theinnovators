export type TVFrameStyle = "radiant" | "retro" | "modern" | "broadcast";
export type TVFrameSettings = {
  style: TVFrameStyle; brand: string; frameColor: string; accentColor: string;
  bezel: number; radius: number; showLive: boolean; showLowerThird: boolean;
  scanlines: boolean; repeatBrand: boolean; title: string; subtitle: string;
};
export const TV_FRAME_STORAGE_KEY = "innovators-tv-frame:v1";
export const DEFAULT_TV_FRAME: TVFrameSettings = {
  style: "radiant", brand: "The INNOVATORS", frameColor: "#6ecfff", accentColor: "#087ac2",
  bezel: 24, radius: 8, showLive: false, showLowerThird: false, scanlines: true, repeatBrand: true,
  title: "Innovation in focus", subtitle: "The INNOVATORS",
};
const bounded = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
const color = (value: unknown, fallback: string) => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
const label = (value: unknown, fallback: string) => typeof value === "string" ? value.slice(0, 80) : fallback;
export function normalizeTVFrame(value: unknown): TVFrameSettings {
  const v = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    style: ["radiant", "retro", "modern", "broadcast"].includes(String(v.style)) ? v.style as TVFrameStyle : DEFAULT_TV_FRAME.style,
    brand: label(v.brand, DEFAULT_TV_FRAME.brand), frameColor: color(v.frameColor, DEFAULT_TV_FRAME.frameColor), accentColor: color(v.accentColor, DEFAULT_TV_FRAME.accentColor),
    bezel: bounded(v.bezel, DEFAULT_TV_FRAME.bezel, 8, 32), radius: bounded(v.radius, DEFAULT_TV_FRAME.radius, 0, 32),
    showLive: typeof v.showLive === "boolean" ? v.showLive : DEFAULT_TV_FRAME.showLive,
    showLowerThird: typeof v.showLowerThird === "boolean" ? v.showLowerThird : DEFAULT_TV_FRAME.showLowerThird,
    scanlines: typeof v.scanlines === "boolean" ? v.scanlines : DEFAULT_TV_FRAME.scanlines,
    repeatBrand: typeof v.repeatBrand === "boolean" ? v.repeatBrand : DEFAULT_TV_FRAME.repeatBrand,
    title: label(v.title, DEFAULT_TV_FRAME.title), subtitle: label(v.subtitle, DEFAULT_TV_FRAME.subtitle),
  };
}
export function readTVFrame(raw: string | null): TVFrameSettings {
  try {
    const value = raw ? JSON.parse(raw) : {};
    // Upgrade the previous untouched black default, preserving authored styles.
    if (value?.style === "broadcast" && value.frameColor === "#1b2228" && value.accentColor === "#168bea" && value.bezel === 16 && value.radius === 8) return normalizeTVFrame({ ...value, style: "radiant", frameColor: DEFAULT_TV_FRAME.frameColor, accentColor: DEFAULT_TV_FRAME.accentColor, bezel: DEFAULT_TV_FRAME.bezel });
    return normalizeTVFrame(value);
  } catch { return { ...DEFAULT_TV_FRAME }; }
}
export function accentInk(hex: string): string {
  const safe = color(hex, DEFAULT_TV_FRAME.accentColor);
  const channels = [1, 3, 5].map(offset => parseInt(safe.slice(offset, offset + 2), 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  return (luminance + .05) / .05 >= 4.5 ? "#000000" : "#ffffff";
}
export function frameCSSTokens(value: TVFrameSettings): string {
  const s = normalizeTVFrame(value);
  const brand = JSON.stringify(s.brand).replaceAll("<", "\\3c ").replaceAll("\n", " ").replaceAll("\r", " ");
  return `:root {\n  --tv-frame-color: ${s.frameColor};\n  --tv-accent: ${s.accentColor};\n  --tv-accent-ink: ${accentInk(s.accentColor)};\n  --tv-bezel: ${s.bezel / 16}rem;\n  --tv-radius: ${s.radius / 16}rem;\n  --tv-brand: ${brand};\n  --tv-repeat-brand: ${s.repeatBrand ? 1 : 0};\n  --tv-style: ${s.style};\n}`;
}
