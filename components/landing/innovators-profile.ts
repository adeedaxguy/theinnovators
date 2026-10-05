import type { VideoItem } from "./types";

export const innovatorsProfile = {
  name: "The INNOVATORS",
  website: "https://innovators.ventures/",
  about: "https://innovators.ventures/about/",
  contact: "info@innovators.ventures",
  logo: "/assets/logos/INNOVATORS square.png",
  description: "The INNOVATORS is a Super Platform for Everything Innovation, powered by a first-of-its-kind educational+entertaining, tech+biz video ecosystem of all innovation stakeholders. As an one-stop-shop for innovation, it revolutionizes innovation ecosystems, boosts innovation productivity, transcends geographic & social boundaries, and accelerates innovation on global arena 24/7. By championing an innovation & entrepreneurship movement, we foster thought leadership, cultivate a community of leaders + innovators, and empower everyone to harness the power of emerging technologies for success and impact. We reinvent an innovative way to do business. We redefine a new lifestyle to discover the most innovative products & services while accelerating innovators' growth. Our mission is to drive emerging technologies' positive impact on people's daily lives and our society, leaving no one behind.",
  facts: [["Company", "The INNOVATORS"], ["Industry", "Innovation media & education"], ["Founded", "Not published"], ["Location", "Not published"], ["Stage", "Not published"], ["Founders", "Not published"], ["Employees", "Not published"]],
  offerings: ["INNOVATORS Thought Leadership", "INNOVATORSverse", "INNOVATORS AI", "INNOVATORS Video Show", "INNOVATORS Discover"],
  blocks: [
    { title: "Funding", items: ["Investors: not published", "Funding rounds: not published", "Valuation: not published", "Cap table: not published", "Active fundraising: not published"] },
    { title: "Products & Technology", items: ["Technologies: video-led innovation discovery and education", "Products: thought leadership, innovators and emerging-product discovery", "Customers: not published", "Patents: not published", "Industries: innovation media, technology and education", "AI co-pilot is a publicly described offering; this preview is not connected to a live AI service"] },
    { title: "Growth", items: ["Revenue: not published", "Hiring: not published", "ARR: not published", "Market-growth figures: not published", "Job openings: not published"] },
    { title: "Connections", items: ["Platform for leaders, innovators and innovation stakeholders", "Accelerator affiliations: not verified", "University affiliations: not verified", "Industry association affiliations: not verified"] },
  ],
};

// These are public interviews, not the company's founders or employees.
export const innovatorsVideos: VideoItem[] = [
  ["Chris Coburn", "fRhI7VvoSfg", "Innovation leadership"],
  ["Robert Langer", "H77F6QfVK7Y", "Research & innovation"],
  ["Jeremy Weinstein", "HnTyLL6fyZU", "Leadership & policy"],
  ["Fiona Murray", "04g8A59k3qk", "Innovation ecosystems"],
  ["Barbara Humpton", "DxhrKlsQgYY", "Industry insights"],
  ["John Halamka", "A_3pzYNdvOY", "Healthcare innovation"],
  ["Scott Sandell", "t_WAwaZBdaI", "Advice to innovators"],
  ["Nigel Morris", "FK8ubGUbUMQ", "Entrepreneurship"],
].map(([title, youtubeId, category]) => ({ title, youtubeId, category, image: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`, source: "The INNOVATORS", sourceUrl: "https://innovators.ventures/leaders/chris-coburn/" }));

export const innovatorsVideoGroups = [
  { label: "Featured videos", videos: innovatorsVideos },
  { label: "Tutorial videos", videos: [] as VideoItem[] },
  { label: "Historical videos", videos: innovatorsVideos.slice(4) },
];
