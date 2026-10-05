import type { VideoItem } from "./types";

export const innovatorsProfile = {
  name: "The INNOVATORS",
  website: "https://innovators.ventures/",
  about: "https://innovators.ventures/about/",
  contact: "info@innovators.ventures",
  logo: "/assets/logos/INNOVATORS square.png",
  description: "The INNOVATORS connects innovation stakeholders through an educational and entertaining tech-and-business video ecosystem. Its platform brings together thought leadership, innovators, emerging technologies, products and services. Its mission is to drive emerging technologies' positive impact on people's daily lives and society, leaving no one behind.",
  facts: [["Company", "The INNOVATORS"], ["Industry", "Innovation media & education"], ["Founded", "Not published"], ["Location", "Not published"], ["Stage", "Not published"], ["Founders", "Not published"], ["Employees", "Not published"]],
  offerings: ["INNOVATORS Thought Leadership", "INNOVATORSverse", "INNOVATORS AI co-pilot", "INNOVATORS VideoShow", "INNOVATORS Discover"],
  blocks: [
    { title: "Funding", items: ["Investors, funding rounds and valuation: not published", "Cap table and fundraising status: not published"] },
    { title: "Products & Technology", items: ["Thought leadership and innovation videos", "Innovators and emerging-product discovery", "AI co-pilot is a publicly described offering; this preview is not connected to a live AI service"] },
    { title: "Growth", items: ["Revenue, ARR and customer count: not published", "Hiring and market-growth figures: not published"] },
    { title: "Connections", items: ["Platform for leaders, innovators and innovation stakeholders", "Accelerator, university and association affiliations: not verified"] },
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
