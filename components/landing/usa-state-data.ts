import type { IntelligencePoint } from "./intelligence-data";

export type UsaRegion = "Northeast" | "Midwest" | "South" | "West";

export type UsaStateProfile = IntelligencePoint & {
  abbreviation: string;
  region: UsaRegion;
  industries: string[];
  metrics: Array<{ label: string; value: number }>;
};

const stateRows: Array<[string, string, UsaRegion]> = [
  ["Alabama", "AL", "South"], ["Alaska", "AK", "West"], ["Arizona", "AZ", "West"],
  ["Arkansas", "AR", "South"], ["California", "CA", "West"], ["Colorado", "CO", "West"],
  ["Connecticut", "CT", "Northeast"], ["Delaware", "DE", "South"], ["Florida", "FL", "South"],
  ["Georgia", "GA", "South"], ["Hawaii", "HI", "West"], ["Idaho", "ID", "West"],
  ["Illinois", "IL", "Midwest"], ["Indiana", "IN", "Midwest"], ["Iowa", "IA", "Midwest"],
  ["Kansas", "KS", "Midwest"], ["Kentucky", "KY", "South"], ["Louisiana", "LA", "South"],
  ["Maine", "ME", "Northeast"], ["Maryland", "MD", "South"], ["Massachusetts", "MA", "Northeast"],
  ["Michigan", "MI", "Midwest"], ["Minnesota", "MN", "Midwest"], ["Mississippi", "MS", "South"],
  ["Missouri", "MO", "Midwest"], ["Montana", "MT", "West"], ["Nebraska", "NE", "Midwest"],
  ["Nevada", "NV", "West"], ["New Hampshire", "NH", "Northeast"], ["New Jersey", "NJ", "Northeast"],
  ["New Mexico", "NM", "West"], ["New York", "NY", "Northeast"], ["North Carolina", "NC", "South"],
  ["North Dakota", "ND", "Midwest"], ["Ohio", "OH", "Midwest"], ["Oklahoma", "OK", "South"],
  ["Oregon", "OR", "West"], ["Pennsylvania", "PA", "Northeast"], ["Rhode Island", "RI", "Northeast"],
  ["South Carolina", "SC", "South"], ["South Dakota", "SD", "Midwest"], ["Tennessee", "TN", "South"],
  ["Texas", "TX", "South"], ["Utah", "UT", "West"], ["Vermont", "VT", "Northeast"],
  ["Virginia", "VA", "South"], ["Washington", "WA", "West"], ["West Virginia", "WV", "South"],
  ["Wisconsin", "WI", "Midwest"], ["Wyoming", "WY", "West"],
];

const regionalThemes: Record<UsaRegion, string[]> = {
  Northeast: ["life sciences", "research universities", "financial technology"],
  Midwest: ["advanced manufacturing", "mobility", "applied research"],
  South: ["business growth", "energy", "aerospace and health systems"],
  West: ["frontier technology", "clean energy", "digital infrastructure"],
};

const featuredProfiles: Record<string, Pick<UsaStateProfile, "summary" | "details" | "industries">> = {
  California: {
    summary: "AI labs, venture capital, frontier startups, and deep university networks.",
    details: ["Bay Area AI cluster", "State climate programs", "Large VC and talent density"],
    industries: ["Artificial intelligence", "Climate technology", "Biotechnology"],
  },
  Massachusetts: {
    summary: "Biotech, universities, hospitals, robotics, and research commercialization.",
    details: ["Cambridge life sciences", "University spinouts", "Robotics and health AI"],
    industries: ["Biotechnology", "Health AI", "Robotics"],
  },
  Texas: {
    summary: "Energy, semiconductors, space, manufacturing, and pro-growth policy.",
    details: ["Austin and Dallas corridors", "Energy transition", "Space and chips"],
    industries: ["Energy", "Semiconductors", "Aerospace"],
  },
  "New York": {
    summary: "Finance, climate, health systems, media technology, and urban innovation.",
    details: ["Fintech and climate finance", "Research hospitals", "Urban technology"],
    industries: ["Fintech", "Media technology", "Health systems"],
  },
  Washington: {
    summary: "Cloud infrastructure, AI platforms, aerospace, and enterprise software.",
    details: ["Cloud economy", "Aerospace and space", "Enterprise AI"],
    industries: ["Cloud platforms", "Aerospace", "Enterprise AI"],
  },
  "North Carolina": {
    summary: "Research Triangle, life sciences, universities, and manufacturing growth.",
    details: ["Research Triangle", "Biomanufacturing", "University-industry links"],
    industries: ["Life sciences", "Advanced manufacturing", "Research services"],
  },
};

export const usaStateProfiles: UsaStateProfile[] = stateRows.map(([label, abbreviation, region], index) => {
  const themes = regionalThemes[region];
  const featured = featuredProfiles[label];
  const baseline = 68 + ((index * 7) % 24);

  return {
    id: abbreviation.toLowerCase(),
    label,
    abbreviation,
    region,
    summary: featured?.summary ?? `${label} combines ${themes[0]}, ${themes[1]}, and ${themes[2]} across its regional innovation economy.`,
    details: featured?.details ?? [
      `${region} regional ecosystem`,
      `${themes[0][0].toUpperCase()}${themes[0].slice(1)} capabilities`,
      "Universities, employers, and public programs",
    ],
    industries: featured?.industries ?? themes.map((theme) => `${theme[0].toUpperCase()}${theme.slice(1)}`),
    metrics: [
      { label: "Ecosystem", value: Math.min(97, baseline + 4) },
      { label: "R&D capacity", value: Math.min(96, baseline + ((index % 4) * 2)) },
      { label: "Growth", value: Math.min(95, baseline + ((index % 5) * 2)) },
    ],
  };
});

export const usaStateAbbreviations = new Map(usaStateProfiles.map((state) => [state.label, state.abbreviation]));
