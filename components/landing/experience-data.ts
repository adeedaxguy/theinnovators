import { asset, leaderGroups, videos } from "./data";
import type { VideoItem } from "./types";

// Embeds are from the client's existing public leader and Innovators pages, reviewed 2026-10-01.
const leaderSource = "https://innovators.ventures/leaders/chris-coburn/";
const leaderIds: Record<string, string> = {
  "Robert Langer": "H77F6QfVK7Y",
  "Jeremy Weinstein": "HnTyLL6fyZU",
  "Fiona Murray": "04g8A59k3qk",
  "Soumitra Dutta": "PasRMr9gZ-k",
  "Barbara Humpton": "DxhrKlsQgYY",
  "Chris Coburn": "fRhI7VvoSfg",
  "John Halamka": "A_3pzYNdvOY",
  "Cindy Bo": "H7bXyKmzfh8",
  "Hans Vestberg": "i4jUXYlznkw",
  "Kevin Mahoney": "8lCv0pyGgVk",
  "David Rhew": "CZa-dxFTNvE",
  "Thomas Saueressig": "okQf-Ln1jcw",
  "Scott Sandell": "t_WAwaZBdaI",
  "Nigel Morris": "FK8ubGUbUMQ",
  "Michael Greeley": "p_dWA_NmKkI",
  "Matt Kozlov": "9MKA3Yu_ayg",
};

function leader(entry: string[], category: string): VideoItem {
  const title = entry[0] === "John Kalamka" ? "John Halamka" : entry[0];
  return { title, image: entry[1], category, youtubeId: leaderIds[title], source: "The Innovators", sourceUrl: leaderSource };
}

export const academiaLeaders = [
  ...leaderGroups.Academia.map((entry) => leader(entry, "Research and innovation")),
  leader(leaderGroups.Industry[1], "Research commercialization"),
  leader(leaderGroups.Industry[2], "Healthcare platforms"),
];
export const industryLeaders = [
  ...leaderGroups.Industry.map((entry) => leader(entry, "Industry insights")),
  ...leaderGroups.Government.slice(0, 2).map((entry) => leader(entry, "Industry insights")),
];
export const policyLeaders = [
  ...leaderGroups.Government.map((entry) => leader(entry, "Policy and innovation")),
  leader(leaderGroups.Academia[2], "Innovation institutions"),
];
export const peoplePerspectives = [
  ...leaderGroups.VC.map((entry) => leader(entry, "People's perspectives")),
  leader(leaderGroups.Industry[0], "People's perspectives"),
];
export const aiTopics: VideoItem[] = [
  { ...industryLeaders[0], title: "Industrial AI", category: "Barbara Humpton", image: "https://i.ytimg.com/vi/DxhrKlsQgYY/hqdefault.jpg" },
  { ...academiaLeaders[1], title: "AI research and policy", category: "Jeremy Weinstein", image: "https://i.ytimg.com/vi/HnTyLL6fyZU/hqdefault.jpg" },
  { ...industryLeaders[2], title: "Healthcare platforms", category: "John Halamka", image: "https://i.ytimg.com/vi/A_3pzYNdvOY/hqdefault.jpg" },
  { ...academiaLeaders[0], title: "Research to real-world innovation", category: "Robert Langer", image: "https://i.ytimg.com/vi/H77F6QfVK7Y/hqdefault.jpg" },
];

export type DirectoryCompany = { name: string; industry: string; country: string; logo: string; youtubeId?: string };
export const companies: DirectoryCompany[] = [
  { name: "[24]7.ai", industry: "Customer experience AI", country: "United States", logo: `${asset}/2024/02/247.ai_.png`, youtubeId: "YVvbhJlxlf4" },
  { name: "0pass", industry: "Cybersecurity", country: "United States", logo: `${asset}/2024/02/0pass-4.png` },
  { name: "1000 Kelvin", industry: "Advanced manufacturing", country: "Germany", logo: `${asset}/2024/02/1000-Kelvin.png` },
  { name: "123COMPARE.ME", industry: "Travel technology", country: "Spain", logo: `${asset}/2022/09/123C-logo-squared-4-1024x1021.png` },
  { name: "13 Mari", industry: "Maritime technology", country: "Norway", logo: `${asset}/2024/03/13-Mari.png` },
  { name: "14BIS Supply Tracking", industry: "Supply-chain technology", country: "United Kingdom", logo: `${asset}/2024/03/14BIS-Supply-Tracking.png` },
  { name: "1928 diagnostics", industry: "Health technology", country: "Sweden", logo: `${asset}/2024/03/1928-diagnostics.png` },
  { name: "1DocWay", industry: "Digital health", country: "United States", logo: `${asset}/2024/03/1DocWay.png` },
  { name: "1Flow", industry: "Enterprise software", country: "United States", logo: `${asset}/2024/02/1Flow.png` },
  { name: "4AG Robotics", industry: "Agricultural robotics", country: "Canada", logo: `${asset}/2024/03/4AG-Robotics.png` },
  { name: "About:Energy", industry: "Battery intelligence", country: "United Kingdom", logo: `${asset}/2024/02/about-energy.jpg`, youtubeId: "Y5MfX6Cxo0U" },
  { name: "ABAGY Robotic Systems", industry: "Industrial robotics", country: "United States", logo: `${asset}/2024/03/ABAGY-Robotic-Systems.png`, youtubeId: "c9KMgx8pUvg" },
  { name: "AMOS Power", industry: "Autonomous electric vehicles", country: "United States", logo: `${asset}/2024/03/AMOS-Power.png`, youtubeId: "VHfanL5K_EY" },
  { name: "Apptronik", industry: "Humanoid robotics", country: "United States", logo: `${asset}/2024/03/Apptronik.png`, youtubeId: "uJOA5IDaL5g" },
  { name: "Coactive AI", industry: "Computer vision", country: "United States", logo: `${asset}/2024/03/Coactive-AI.png` },
  { name: "Tethys Robotics", industry: "Marine robotics", country: "Switzerland", logo: `${asset}/2024/03/Tethys-Robotics.png`, youtubeId: "WjWChJdWCtI" },
  { name: "3D BioFibR", industry: "Biotechnology", country: "Canada", logo: `${asset}/2024/02/3D-BioFibr.png`, youtubeId: "eTLyEUGQZL8" },
  { name: "Muddy Machines", industry: "Agricultural robotics", country: "United Kingdom", logo: `${asset}/2024/03/Muddy-Machines.png`, youtubeId: "8uyJc0LQibY" },
];

export function companyVideo(company: DirectoryCompany): VideoItem {
  return {
    title: company.name, category: company.industry,
    image: company.youtubeId ? `https://i.ytimg.com/vi/${company.youtubeId}/hqdefault.jpg` : company.logo,
    youtubeId: company.youtubeId, source: company.country,
    sourceUrl: "https://innovators.ventures/innovators/",
  };
}

export const featuredCompanies = [companies[11], companies[12], companies[13], companies[0], companies[15]].map(companyVideo);
export const trendingCompanies = [companies[10], companies[17], companies[16], companies[13], companies[0]].map(companyVideo);
export const aiCompanies = [companies[0], companies[2], companies[11], companies[13], companies[14]];

export const companyVideoGroups = [
  { label: "Highlights", videos: [videos[24], videos[15], videos[19], videos[8], videos[36]] },
  { label: "Tutorial videos", videos: [videos[29], videos[6], videos[27], videos[14], videos[2], videos[31]] },
  { label: "Historical videos", videos: [videos[3], videos[5], videos[12], videos[21], videos[32]] },
  { label: "Product demos", videos: [videos[8], videos[11], videos[17], videos[18], videos[26], videos[35]] },
  { label: "Founder stories", videos: [videos[13], videos[20], videos[30], videos[38]] },
];
export const companyFacts = [
  ["Company", "Nexa Robotics"], ["Founded", "2019"], ["Headquarters", "Boston, United States"],
  ["Stage", "Series B"], ["Employees", "186"], ["Founders", "Maya Chen / Daniel Okafor"],
];
export const companyBlocks = [
  { title: "Funding", items: ["$84M total raised", "Series B: $42M", "12 institutional investors", "$410M latest valuation"] },
  { title: "Products & Technology", items: ["Autonomous inspection", "Industrial vision AI", "Digital twin platform", "28 patent families"] },
  { title: "Growth", items: ["74 enterprise customers", "112% ARR growth", "9 open roles", "4 global markets"] },
  { title: "Connections", items: ["MIT spinout", "Techstars alumni", "6 strategic partners", "2 founder exits"] },
];
