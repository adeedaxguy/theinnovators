export const TYPOGRAPHY_STORAGE_KEY = "innovatorsTypographySettings:v1";

export type FontStyle = "normal" | "italic";

export type TypographySetting = {
  family: string;
  size: number;
  style: FontStyle;
  weight: number;
};

export type TypographySettings = Record<string, TypographySetting>;

export type TypographyArea = TypographySetting & {
  id: string;
  name: string;
  description: string;
  preview: string;
  min: number;
  max: number;
};

export const FONT_FAMILIES: Array<{ label: string; value: string }> = [
  {
    label: "Clean website - Arial",
    value: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  },
  {
    label: "Current brand - Spartan",
    value: '"Spartan", Arial, sans-serif',
  },
  {
    label: "Editorial - Georgia",
    value: 'Georgia, "Times New Roman", serif',
  },
  {
    label: "Classic system UI",
    value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
];

export const FONT_WEIGHTS = [300, 400, 500, 540, 560, 600, 650, 700, 800];

export const TYPOGRAPHY_AREAS: TypographyArea[] = [
  {
    id: "body",
    name: "Overall Page Text",
    description: "Default font used across normal page text, forms, and general interface copy.",
    preview: "Fintech founders are shifting from launch content to proof-led customer stories.",
    size: 16,
    min: 12,
    max: 22,
    weight: 400,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "top-menu",
    name: "Top Black Icon Menu",
    description: "Hover labels inside the circular top menu icons: News, Learn, Build, Funding, and more.",
    preview: "Learn",
    size: 13,
    min: 10,
    max: 20,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[1].value,
  },
  {
    id: "top-actions",
    name: "Top Blue Action Boxes",
    description: "Broadcast My Innovation, My Innovation Journey, and Signin Signup boxes.",
    preview: "Broadcast My Innovation",
    size: 14,
    min: 12,
    max: 22,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "ticker",
    name: "Weather, Time, Stocks Ticker",
    description: "The small scrolling market and weather line below the black header.",
    preview: "Weather 72F | Time 12:43 AM | Stocks: Innovation Index +2.4%",
    size: 14,
    min: 10,
    max: 20,
    weight: 600,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "billboards",
    name: "Color Billboard Tiles",
    description: "The colorful clickable billboard/ad tiles under the top header, such as Mission and Demo Day.",
    preview: "US Innovation Landscape",
    size: 16,
    min: 12,
    max: 26,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "sector-menu",
    name: "Blue Sector Menu Bar",
    description: "Healthcare, Life Sciences & Biotech, MedTech, Fintech, AI, Robotics, and other sector links.",
    preview: "Healthcare  Life Sciences & Biotech  MedTech  Fintech  AI",
    size: 14,
    min: 11,
    max: 22,
    weight: 400,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "sidebar",
    name: "Left Audience Sidebar",
    description: "Universities, Accelerators, Corporations, Startups, VCs, and saved-video sidebar labels.",
    preview: "Universities  Accelerators  Startups  VCs",
    size: 16,
    min: 12,
    max: 24,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "section-titles",
    name: "Section Titles",
    description: "Major headings like News, Leaders, Innovators, Shorts, Deals This Week, and My Innovation Journey.",
    preview: "News",
    size: 26,
    min: 18,
    max: 54,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "leader-group-titles",
    name: "Leader Group Titles",
    description: "The row titles inside Leaders, such as Academia, Industry, Government, and VC.",
    preview: "Academia  Industry  Government",
    size: 17,
    min: 12,
    max: 26,
    weight: 700,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "leader-card-text",
    name: "Leader Photo Labels",
    description: "The small names and categories over each leader photo.",
    preview: "Robert Langer  Academia",
    size: 12,
    min: 9,
    max: 18,
    weight: 400,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "innovator-row-labels",
    name: "Innovator Row Labels",
    description: "The row labels inside Innovators, such as Trending, Featured, and Innovators this week.",
    preview: "Trending  Featured",
    size: 17,
    min: 11,
    max: 26,
    weight: 700,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "video-titles",
    name: "Video Card Titles",
    description: "Main text under or over video cards, including hero carousel titles and content-card headlines.",
    preview: "Digital health delivery",
    size: 18,
    min: 13,
    max: 34,
    weight: 560,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "small-captions",
    name: "Small Captions",
    description: "Captions beneath small video cards in Shorts, INNOVATORSverse, Deals, AI, and journey rows.",
    preview: "Practical playbooks for teams building in public",
    size: 15,
    min: 11,
    max: 24,
    weight: 400,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "ai-headings",
    name: "AI Row Headings",
    description: "Large AI row titles like AI for Sciences, AI for Industries, and AI for P.",
    preview: "AI for Sciences",
    size: 32,
    min: 18,
    max: 54,
    weight: 560,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "ai-subtitles",
    name: "AI Row Subtitles",
    description: "The smaller words beside AI row headings, such as Connect, Deploy, and Harness.",
    preview: "Connect  Deploy  Harness",
    size: 13,
    min: 9,
    max: 20,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
  {
    id: "forms-buttons",
    name: "Forms and Buttons",
    description: "Post, Follow, Discover, search fields, co-pilot form labels, and compact action controls.",
    preview: "Post an idea...  Post  Discover",
    size: 15,
    min: 11,
    max: 22,
    weight: 500,
    style: "normal",
    family: FONT_FAMILIES[0].value,
  },
];

export const DEFAULT_TYPOGRAPHY_SETTINGS: TypographySettings = TYPOGRAPHY_AREAS.reduce<TypographySettings>((settings, area) => {
  settings[area.id] = {
    family: area.family,
    size: area.size,
    style: area.style,
    weight: area.weight,
  };
  return settings;
}, {});

type TypographyPreset = {
  label: string;
  description: string;
  values: TypographySettings;
};

export const TYPOGRAPHY_PRESETS: Record<string, TypographyPreset> = {
  balanced: {
    label: "Balanced Website",
    description: "Clean readable defaults for the current layout.",
    values: DEFAULT_TYPOGRAPHY_SETTINGS,
  },
  editorial: {
    label: "Editorial Classic",
    description: "More like a news site: lighter menus, stronger headlines.",
    values: {
      ...DEFAULT_TYPOGRAPHY_SETTINGS,
      body: { family: FONT_FAMILIES[2].value, size: 17, style: "normal", weight: 400 },
      "section-titles": { family: FONT_FAMILIES[2].value, size: 34, style: "normal", weight: 700 },
      "video-titles": { family: FONT_FAMILIES[2].value, size: 20, style: "normal", weight: 600 },
      billboards: { family: FONT_FAMILIES[0].value, size: 17, style: "normal", weight: 500 },
      "sector-menu": { family: FONT_FAMILIES[0].value, size: 14, style: "normal", weight: 400 },
    },
  },
  review: {
    label: "Large Review Mode",
    description: "Bigger labels for client review and screen sharing.",
    values: Object.fromEntries(
      TYPOGRAPHY_AREAS.map((area) => [
        area.id,
        {
          family: area.family,
          size: Math.min(area.max, area.size + 3),
          style: area.style,
          weight: area.weight,
        },
      ])
    ) as TypographySettings,
  },
};

function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

function isTypographyInput(input: unknown): input is Record<string, Partial<TypographySetting>> {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}

export function normalizeTypographySettings(input: unknown): TypographySettings {
  const source = isTypographyInput(input) ? input : {};

  return TYPOGRAPHY_AREAS.reduce<TypographySettings>((settings, area) => {
    const incoming = source[area.id] || {};
    const size = Number(incoming.size);
    const weight = Number(incoming.weight);
    const familyValues = FONT_FAMILIES.map((font) => font.value);
    const family = typeof incoming.family === "string" ? incoming.family : "";

    settings[area.id] = {
      family: familyValues.includes(family) ? family : area.family,
      size: Number.isFinite(size) ? clamp(size, area.min, area.max) : area.size,
      style: incoming.style === "italic" ? "italic" : "normal",
      weight: FONT_WEIGHTS.includes(weight) ? weight : area.weight,
    };
    return settings;
  }, {});
}

export function applyTypographySettings(settings: unknown) {
  if (typeof document === "undefined") return;
  const normalized = normalizeTypographySettings(settings);
  const root = document.documentElement;

  TYPOGRAPHY_AREAS.forEach((area) => {
    const value = normalized[area.id];
    root.style.setProperty(`--admin-font-${area.id}-family`, value.family);
    root.style.setProperty(`--admin-font-${area.id}-size`, `${value.size}px`);
    root.style.setProperty(`--admin-font-${area.id}-style`, value.style);
    root.style.setProperty(`--admin-font-${area.id}-weight`, String(value.weight));
  });
}
