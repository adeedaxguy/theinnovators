import { billboard, editorialImages, photo, videos } from "./data";
import type { VideoItem } from "./types";

export type IntelligencePoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  summary: string;
  details: string[];
};

export type IntelligenceCard = {
  title: string;
  body: string;
  image?: string;
  meta?: string;
};

export type IntelligenceRanking = {
  label: string;
  value: string;
  score: number;
};

export type IntelligenceLeader = {
  name: string;
  role: string;
  image: string;
};

export type IntelligencePageContent = {
  slug: "world" | "usa";
  routeLabel: string;
  activeModule: string;
  activeAudience: string;
  activeCategory: string;
  title: string;
  deck: string;
  heroImage: string;
  heroVideo: VideoItem;
  stats: Array<[string, string]>;
  tabs: string[];
  map: {
    title: string;
    body: string;
    image: string;
    action: string;
    points: IntelligencePoint[];
  };
  spotlightTitle: string;
  spotlight: IntelligenceCard[];
  news: string[];
  leadersTitle: string;
  leaders: IntelligenceLeader[];
  organizations: IntelligenceCard[];
  summits: IntelligenceCard[];
  profileTitle: string;
  profileBlocks: Array<{
    title: string;
    items: string[];
  }>;
  industries: IntelligenceCard[];
  rankingsTitle: string;
  rankings: IntelligenceRanking[];
  agentTitle: string;
  agentPrompts: string[];
  communities: IntelligenceCard[];
  playlistTitle: string;
  playlist: VideoItem[];
  actionCards?: IntelligenceCard[];
};

const leaderImages = [
  photo("photo-1560250097-0b93528c311a", 500),
  photo("photo-1573496359142-b8d87734a5a2", 500),
  photo("photo-1507003211169-0a1dd7228f2d", 500),
  photo("photo-1580489944761-15a19d654956", 500),
  photo("photo-1519085360753-af0119f7cbe7", 500),
  photo("photo-1544005313-94ddf0286df2", 500),
];

export const worldIntelligencePage: IntelligencePageContent = {
  slug: "world",
  routeLabel: "innovators.ventures/world",
  activeModule: "World Innovation Landscape",
  activeAudience: "Countries",
  activeCategory: "AI",
  title: "World Innovation Landscape",
  deck:
    "A visual encyclopedia for country-by-country innovation ecosystems, policies, leaders, industries, companies, videos, events, and demo days.",
  heroImage: photo("photo-1524661135-423995f22d0b", 1600),
  heroVideo: {
    ...videos[5],
    title: "Global innovation economies in spotlight",
    image: photo("photo-1521295121783-8a321d551ad2", 1600),
  },
  stats: [
    ["42", "countries tracked"],
    ["100M+", "innovation signals"],
    ["12", "ranking views"],
    ["24/7", "AI country desk"],
  ],
  tabs: [
    "Overview",
    "World Map",
    "Economies",
    "Policy",
    "Leaders",
    "Industries",
    "Companies",
    "Events",
  ],
  map: {
    title: "Interactive World Map",
    body:
      "Hover a country to preview its overview, data insights, policy, leaders, industries, company videos, events, and demo days. This layer can be closed whenever the reader wants the main page only.",
    image: photo("photo-1524661135-423995f22d0b", 1600),
    action: "Hide map layer",
    points: [
      {
        id: "us",
        label: "United States",
        x: 24,
        y: 43,
        summary: "AI infrastructure, venture scale, national labs, frontier startups.",
        details: ["164M innovation audience", "Deep VC markets", "Federal procurement and grants"],
      },
      {
        id: "china",
        label: "China",
        x: 73,
        y: 45,
        summary: "Advanced manufacturing, robotics deployment, green technology capacity.",
        details: ["171M ecosystem signals", "Regional manufacturing clusters", "Patent-heavy sectors"],
      },
      {
        id: "india",
        label: "India",
        x: 66,
        y: 54,
        summary: "Large technical talent base, digital public infrastructure, startup density.",
        details: ["148M innovation audience", "Fintech and health platforms", "City-scale talent clusters"],
      },
      {
        id: "germany",
        label: "Germany",
        x: 49,
        y: 38,
        summary: "Industrial R&D, deep engineering supply chains, applied research institutes.",
        details: ["56M tracked signals", "Fraunhofer-style research links", "Advanced manufacturing"],
      },
      {
        id: "brazil",
        label: "Brazil",
        x: 34,
        y: 68,
        summary: "Climate, agriculture, payments, and regional growth innovation.",
        details: ["73M ecosystem signals", "Agtech and fintech", "LATAM startup corridors"],
      },
      {
        id: "nigeria",
        label: "Nigeria",
        x: 51,
        y: 60,
        summary: "Payments, logistics, energy access, and founder-led digital ecosystems.",
        details: ["14M ecosystem signals", "Mobile-first markets", "Regional growth companies"],
      },
    ],
  },
  spotlightTitle: "Innovation Economies in Spotlight",
  spotlight: [
    {
      title: "United States",
      body: "Frontier AI, national labs, VC depth, and a broad state innovation network.",
      image: billboard("us-energy-map"),
      meta: "North America",
    },
    {
      title: "Germany",
      body: "Industrial research, Mittelstand manufacturing, and applied science institutions.",
      image: photo("photo-1467269204594-9661b134dd2b", 900),
      meta: "Europe",
    },
    {
      title: "India",
      body: "Talent scale, digital rails, fast-growth cities, and software-led innovation.",
      image: photo("photo-1524492412937-b28074a5d7da", 900),
      meta: "Asia",
    },
  ],
  news: [
    "Three G7 deep-tech funds announce cross-border university spinout programs.",
    "New semiconductor corridors expand from East Asia to North America and Europe.",
    "Global demo day calendar adds climate, AI infrastructure, and bio-manufacturing tracks.",
    "Countries are reorganizing procurement programs around mission-driven innovation.",
  ],
  leadersTitle: "Global Innovation Leaders",
  leaders: [
    { name: "Maya Chen", role: "AI policy architect", image: leaderImages[0] },
    { name: "Amara Okafor", role: "Ecosystem builder", image: leaderImages[1] },
    { name: "Jonas Weber", role: "Industrial R&D", image: leaderImages[2] },
    { name: "Riya Malhotra", role: "Digital public rails", image: leaderImages[3] },
  ],
  organizations: [
    {
      title: "Telecom Association",
      body: "Tracks spectrum, connectivity, broadband, and telecom startup programs.",
      image: photo("photo-1516321318423-f06f85e504b3", 900),
    },
    {
      title: "Biotech Network",
      body: "Maps labs, clinical translation, national bio-manufacturing plans, and talent.",
      image: photo("photo-1532187863486-abf9dbad1b69", 900),
    },
    {
      title: "Manufacturing Association",
      body: "Monitors automation, industrial policy, and company modernization programs.",
      image: photo("photo-1581092918056-0c4c3acd3789", 900),
    },
  ],
  summits: [
    {
      title: "Global Innovation Summit",
      body: "Country showcases, policy roundtables, and startup discovery.",
      image: photo("photo-1505373877841-8d25f7d46678", 900),
    },
    {
      title: "Web Summit",
      body: "Founder demos, investor sessions, and enterprise innovation programming.",
      image: photo("photo-1511578314322-379afb476865", 900),
    },
  ],
  profileTitle: "Each Country Intelligence Profile",
  profileBlocks: [
    {
      title: "Overview",
      items: ["GDP, population, R&D", "Innovation index", "STEM graduates", "Patents per year"],
    },
    {
      title: "Policy",
      items: ["Tax incentives", "IP law", "Procurement programs", "Grants and recipients"],
    },
    {
      title: "Ecosystem",
      items: ["Startup count", "Unicorns", "Universities", "Innovation districts"],
    },
    {
      title: "Capital",
      items: ["VC rounds", "Family offices", "Sovereign funds", "Corporate venture"],
    },
  ],
  industries: [
    {
      title: "AI and Computing",
      body: "Model labs, data infrastructure, sovereign compute, and applied AI markets.",
      image: editorialImages[2],
    },
    {
      title: "Clean Tech",
      body: "Grid, storage, energy materials, climate finance, and decarbonization programs.",
      image: editorialImages[18],
    },
    {
      title: "Advanced Manufacturing",
      body: "Automation, robotics, industrial software, and supply-chain resilience.",
      image: editorialImages[8],
    },
  ],
  rankingsTitle: "Countries Ranking",
  rankings: [
    { label: "Biz Environment", value: "United States", score: 94 },
    { label: "Gov Credibility", value: "Germany", score: 88 },
    { label: "Judicial System", value: "United Kingdom", score: 84 },
    { label: "Ecosystem Momentum", value: "India", score: 79 },
  ],
  agentTitle: "AI Agent Tools",
  agentPrompts: [
    "Compare two country ecosystems",
    "Find grant programs by sector",
    "Build a country video playlist",
    "Summarize policy and IP risks",
  ],
  communities: [
    {
      title: "Innovation Communities",
      body: "Country groups, founder communities, accelerator networks, and policy circles.",
      image: editorialImages[13],
    },
    {
      title: "Company Video Library",
      body: "A rolling feed of ecosystem stories, product demos, and market explainers.",
      image: editorialImages[23],
    },
  ],
  playlistTitle: "Countries Playlist",
  playlist: videos.slice(5, 14),
};

export const usaIntelligencePage: IntelligencePageContent = {
  slug: "usa",
  routeLabel: "innovators.ventures/USA",
  activeModule: "US Innovation Landscape",
  activeAudience: "Countries",
  activeCategory: "AI",
  title: "U.S. Innovation Landscape",
  deck:
    "A working intelligence page for America’s innovation ecosystem: policy, institutions, academia, industries, states, leaders, grants, procurement, and video discovery.",
  heroImage: billboard("us-energy-map"),
  heroVideo: {
    ...videos[12],
    title: "America innovates: the U.S. ecosystem briefing",
    image: billboard("us-network-map"),
  },
  stats: [
    ["50", "state ecosystems"],
    ["11", "program lanes"],
    ["8", "ranking models"],
    ["AI", "discover agent"],
  ],
  tabs: [
    "History",
    "Overview",
    "Landscape",
    "Policy",
    "Ecosystem",
    "Gov Agencies",
    "Institutions",
    "Academia",
    "Industry",
    "Communities",
    "Programs",
  ],
  map: {
    title: "Interactive U.S. Map",
    body:
      "Hover a state or region to preview innovation economy, policy, industries, leader videos, events, and demo days. Readers can close this layer and continue with the main content.",
    image: billboard("us-energy-map"),
    action: "Hide U.S. map",
    points: [
      {
        id: "ca",
        label: "California",
        x: 15,
        y: 57,
        summary: "AI labs, venture capital, frontier startups, and deep university networks.",
        details: ["Bay Area AI cluster", "State climate programs", "Large VC and talent density"],
      },
      {
        id: "ma",
        label: "Massachusetts",
        x: 86,
        y: 34,
        summary: "Biotech, universities, hospitals, robotics, and research commercialization.",
        details: ["Cambridge life sciences", "University spinouts", "Robotics and health AI"],
      },
      {
        id: "tx",
        label: "Texas",
        x: 49,
        y: 71,
        summary: "Energy, semiconductors, space, manufacturing, and pro-growth policy.",
        details: ["Austin and Dallas corridors", "Energy transition", "Space and chips"],
      },
      {
        id: "ny",
        label: "New York",
        x: 80,
        y: 39,
        summary: "Finance, climate, health systems, media technology, and urban innovation.",
        details: ["Fintech and climate finance", "Research hospitals", "Urban technology"],
      },
      {
        id: "wa",
        label: "Washington",
        x: 20,
        y: 27,
        summary: "Cloud infrastructure, AI platforms, aerospace, and enterprise software.",
        details: ["Cloud economy", "Aerospace and space", "Enterprise AI"],
      },
      {
        id: "nc",
        label: "North Carolina",
        x: 73,
        y: 58,
        summary: "Research Triangle, life sciences, universities, and manufacturing growth.",
        details: ["Research Triangle", "Biomanufacturing", "University-industry links"],
      },
    ],
  },
  spotlightTitle: "Made in America",
  spotlight: [
    {
      title: "AI Infrastructure",
      body: "Regional compute, energy, data centers, model deployment, and chip supply chains.",
      image: photo("photo-1558494949-ef010cbdcc31", 900),
      meta: "National priority",
    },
    {
      title: "Chips",
      body: "Semiconductor manufacturing, packaging, workforce, and state-level incentives.",
      image: photo("photo-1518770660439-4636190af475", 900),
      meta: "Industrial policy",
    },
    {
      title: "Energy",
      body: "Grid modernization, storage, nuclear, hydrogen, and climate technology programs.",
      image: photo("photo-1509391366360-2e959784a276", 900),
      meta: "Infrastructure",
    },
  ],
  news: [
    "Federal agencies expand procurement pathways for AI, chips, energy, and biotechnology.",
    "State innovation offices are publishing more grant, tax incentive, and workforce data.",
    "University labs are becoming stronger deal-flow engines for industry and investors.",
    "Regional AI infrastructure hubs connect compute, energy, academia, and startups.",
  ],
  leadersTitle: "America’s Leaders",
  leaders: [
    { name: "Alicia Morgan", role: "National labs", image: leaderImages[0] },
    { name: "David Rosen", role: "Innovation policy", image: leaderImages[2] },
    { name: "Priya Shah", role: "University spinouts", image: leaderImages[3] },
    { name: "Eleanor Brooks", role: "State ecosystem", image: leaderImages[5] },
  ],
  organizations: [
    {
      title: "ITIF",
      body: "Information Technology and Innovation Foundation resources and policy analysis.",
      image: editorialImages[22],
    },
    {
      title: "FAI",
      body: "Foundation for American Innovation insights on institutions and policy.",
      image: editorialImages[6],
    },
    {
      title: "National Labs",
      body: "Research institutes, labs, and commercialization pathways.",
      image: editorialImages[7],
    },
  ],
  summits: [
    {
      title: "Demo Day",
      body: "State and industry demo days for startups, labs, and corporate innovation groups.",
      image: billboard("broadcast-stage"),
    },
    {
      title: "America Innovates",
      body: "A broadcast-style program for states, sectors, and mission-driven companies.",
      image: photo("photo-1497366754035-f200968a6e72", 900),
    },
  ],
  profileTitle: "U.S. Innovation Ecosystem",
  profileBlocks: [
    {
      title: "Institutions",
      items: ["National labs", "Research institutes", "Innovation districts", "Universities"],
    },
    {
      title: "Policy",
      items: ["National acts", "Tax incentives", "IP and standards", "Procurement programs"],
    },
    {
      title: "Academia",
      items: ["Professors", "Labs and grants", "Patents", "Papers and datasets"],
    },
    {
      title: "Programs",
      items: ["Grants", "Recipients", "Funding agencies", "Outputs and follow-on capital"],
    },
  ],
  industries: [
    {
      title: "AI for Science",
      body: "Model-enabled research workflows, scientific computing, and national lab collaboration.",
      image: editorialImages[2],
    },
    {
      title: "Advanced Manufacturing",
      body: "Industrial AI, robotics, additive manufacturing, and resilient supply chains.",
      image: editorialImages[8],
    },
    {
      title: "Biotechnology",
      body: "Translation from hospitals, universities, biomanufacturing, and clinical networks.",
      image: editorialImages[4],
    },
  ],
  rankingsTitle: "USA States Ranking",
  rankings: [
    { label: "Biz Environment", value: "Texas", score: 92 },
    { label: "Ecosystem", value: "California", score: 96 },
    { label: "Gov Efficiency", value: "Utah", score: 86 },
    { label: "Judicial Integrity", value: "Delaware", score: 89 },
  ],
  agentTitle: "AI Discover Agent",
  agentPrompts: [
    "Find grants by sector and state",
    "Compare state innovation rankings",
    "Build a procurement target list",
    "Summarize institutions for a company",
  ],
  communities: [
    {
      title: "America’s Innovators, United",
      body: "A video wall for founders, researchers, corporations, and public-sector innovation teams.",
      image: editorialImages[19],
    },
    {
      title: "USA States",
      body: "State-by-state videos, charts, policy pages, and local ecosystem directories.",
      image: billboard("city-river"),
    },
  ],
  playlistTitle: "USA States Playlist",
  playlist: videos.slice(12, 21),
  actionCards: [
    {
      title: "Seek Grant Funding",
      body: "Match sectors with federal and state grant programs, recipients, and agency outputs.",
    },
    {
      title: "Seek Gov Procurement Programs",
      body: "Track procurement pathways and public-sector innovation challenges.",
    },
    {
      title: "Seek Private Donation",
      body: "Find foundations, philanthropy programs, and mission-aligned funding networks.",
    },
    {
      title: "Seek Private Investment",
      body: "Map VCs, angels, family offices, sovereign funds, corporate venture, and PE.",
    },
    {
      title: "Seek Help From Us",
      body: "Use the AI Discover Agent to assemble a state, sector, or company action brief.",
    },
  ],
};
