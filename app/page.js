"use client";

import { useMemo, useRef, useState } from "react";

const asset = "https://innovators.ventures/wp-content/uploads";
const photo = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const realImages = {
  healthcare: photo("photo-1576091160399-112ba8d25d1d"),
  fintech: photo("photo-1551288049-bebda4e38f71"),
  ai: photo("photo-1518770660439-4636190af475"),
  show: photo("photo-1505373877841-8d25f7d46678"),
  biotech: photo("photo-1532187863486-abf9dbad1b69"),
  energy: photo("photo-1509391366360-2e959784a276"),
  connect: photo("photo-1517048676732-d65bc937f952"),
  research: photo("photo-1581091226825-a6a2a5aee158"),
  manufacturing: photo("photo-1581092918056-0c4c3acd3789"),
  proprietary: photo("photo-1558494949-ef010cbdcc31"),
  startup: photo("photo-1556761175-b413da4baf72"),
  robotics: photo("photo-1485827404703-89b55fcc595e"),
  city: photo("photo-1497366754035-f200968a6e72"),
  community: photo("photo-1522071820081-009f0129c71c"),
};

const iconMap = {
  news: `${asset}/2021/03/2c-2.png`,
  learn: `${asset}/2022/08/2d.png`,
  build: `${asset}/2021/03/2f-2.png`,
  fund: `${asset}/2022/08/2e.png`,
  market: `${asset}/2022/08/2b.png`,
  sales: `${asset}/2022/08/2g.png`,
  discover: `${asset}/2021/03/2a-2.png`,
  community: `${asset}/2022/08/2d.png`,
  intelligence: `${asset}/2021/03/2a-2.png`,
  demo: "play",
};

const topModules = [
  ["News", iconMap.news],
  ["Learn", iconMap.learn],
  ["Build", iconMap.build],
  ["Funding", iconMap.fund],
  ["Marketing", iconMap.market],
  ["Sales", iconMap.sales],
  ["Discover", iconMap.discover],
  ["Community", iconMap.community],
  ["Intelligence", iconMap.intelligence],
  ["Demo", iconMap.demo],
];

const journeyActions = [
  ["Broadcast\nMy Innovation", "https://innovators.ventures/pricing/"],
  ["My innovation\njourney", "https://www.innovators.ventures/innovators"],
  ["Signin\nSignup", "https://innovators.ventures/log-in/"],
];

const marketStats = [
  ["Innovation Index", "+2.4%", "up"],
  ["AI Deals", "+18", "up"],
  ["Climate Tech", "-0.8%", "down"],
  ["Robotics", "+1.6%", "up"],
  ["Health AI", "+3.1%", "up"],
  ["Quantum", "+0.7%", "up"],
];

const tickerItems = [
  "Weather 72F",
  "Time 12:43 AM",
  "Stocks: Innovation Index +2.4%",
  "AI Deals +18",
  "Robotics +1.6%",
  "Health AI +3.1%",
  "Quantum +0.7%",
  "Climate Tech -0.8%",
];

const landingStats = [
  ["11", "sectors tracked"],
  ["22", "innovation desks"],
  ["4", "leader circles"],
  ["70+", "video slots"],
];

const landingActions = [
  {
    label: "Broadcast My Innovation",
    meta: "Launch your company, product, or ecosystem story.",
    href: "https://innovators.ventures/pricing/",
  },
  {
    label: "Explore Innovation Markets",
    meta: "Scan AI, healthcare, fintech, deeptech, robotics, and more.",
    module: "US Innovation Landscape",
  },
  {
    label: "Join My Innovation Journey",
    meta: "Save videos, follow leaders, and build a personal innovation feed.",
    href: "https://www.innovators.ventures/innovators",
  },
];

const featureTiles = [
  "Leaders of the Month",
  "Innovators of the Month",
  "Mission",
  "AI for S",
  "AI for I",
  "AI for P",
  "INNOverse Show",
  "Deal",
  "Product Launch",
  "Demo Day",
  "US Innovation Landscape",
  "World Innovation Landscape",
  "Q Leap",
  "Interactive Learning",
  "Tech D",
  "Super Platform",
  "For Everything Innovation",
  "For Everyone",
  "Innovation Challenge",
  "Live Streaming",
  "Innovation Meme",
  "AI co-pilot",
];

const categories = [
  "Healthcare",
  "Fintech",
  "AI",
  "Manufacturing",
  "Quantum",
  "DeepTech",
  "Biotech",
  "New Materials",
  "Robotics",
  "Critical Minerals",
  "Energy",
];

const audiences = [
  "Universities",
  "Accelerators",
  "Corporations",
  "Startups",
  "VCs",
  "Service providers",
  "Industry Association",
  "Countries",
  "abc",
  "Grassroot communities",
  "Subscriptions",
  "Saved Videos",
];

const audienceIcons = {
  Universities: "university",
  Accelerators: "rocket",
  Corporations: "building",
  Startups: "sprout",
  VCs: "wallet",
  "Service providers": "briefcase",
  "Industry Association": "award",
  Countries: "globe",
  abc: "letters",
  "Grassroot communities": "leaf",
  Subscriptions: "receipt",
  "Saved Videos": "video",
};

const videos = [
  {
    title: "Digital health delivery",
    category: "Healthcare",
    audience: "Startups",
    image: realImages.healthcare,
    source: "Innovators Health",
    age: "1h",
    reactions: 106,
  },
  {
    title: "Neo banks and payments",
    category: "Fintech",
    audience: "VCs",
    image: realImages.fintech,
    source: "Market Desk",
    age: "2w",
    reactions: 809,
  },
  {
    title: "AI, computing and data",
    category: "AI",
    audience: "Corporations",
    image: realImages.ai,
    source: "AI Brief",
    age: "2w",
    reactions: 133,
  },
  {
    title: "Monthly innovation shows",
    category: "DeepTech",
    audience: "Universities",
    image: realImages.show,
    source: "INNOverse",
    age: "3w",
    reactions: 234,
  },
  {
    title: "BIO 2025 landscape",
    category: "Biotech",
    audience: "Industry Association",
    image: realImages.biotech,
    source: "Bio Desk",
    age: "1d",
    reactions: 521,
  },
  {
    title: "Worldwide innovation economies",
    category: "Energy",
    audience: "Countries",
    image: realImages.energy,
    source: "World Desk",
    age: "5d",
    reactions: 127,
  },
];

const leaderGroups = {
  Academia: [
    ["Robert Langer", `${asset}/2022/04/Robert_Langer_BioTech_Awards_Video_laboratory-e1650812997315.png`],
    ["Jeremy Weinstein", `${asset}/2026/06/100324_Jeremy_Weinstein_159-e1781027980977.webp`],
    ["Fiona Murray", `${asset}/2022/02/profile-image-41035-e1650811639655.jpeg`],
    ["Soumitra Dutta", `${asset}/2022/05/hueZBORZ_400x400-e1653102732198.jpg`],
  ],
  Industry: [
    ["Barbara Humpton", `${asset}/2025/01/Barbara-Humpton-Headshot.png`],
    ["Chris Coburn", `${asset}/2021/02/Coburn-Chris-scaled-e1615840187511.jpg`],
    ["John Kalamka", `${asset}/2023/03/mayo-e1678204925459.jpg`],
    ["Cindy Bo", `${asset}/2024/12/Cindy-Bo_v2_2x3-1.jpg`],
  ],
  Government: [
    ["Hans Vestberg", `${asset}/2024/03/hans_bio_photo_300x375.jpg`],
    ["Kevin Mahoney", `${asset}/2025/09/KevinMahoney_Expert.jpg`],
    ["David Rhew", `${asset}/2025/09/David-in-MSFT-Garden.7333-1024x683-1-e1758849575801.jpg`],
    ["Thomas Saueressig", `${asset}/2025/02/thomas-saueressig_3840x2160.webp`],
  ],
  VC: [
    ["Scott Sandell", `${asset}/2024/03/scott-sandell_landscape-e1710696409606.webp`],
    ["Nigel Morris", `${asset}/2021/06/2019-Nigel-headshot-e1623799623770.jpg`],
    ["Michael Greeley", `${asset}/2022/08/Greeley_220x220_3-e1661219172983.jpg`],
    ["Matt Kozlov", `${asset}/2022/08/1110x740-md-starburst-matt-kozlov-e1661219143691.jpg`],
  ],
  Startups: [
    ["Digital Health", `${asset}/2021/03/1-2.png`],
    ["Beam Dental", `${asset}/2022/05/Copy-of-Copy-of-Black-and-Yellow-Playful-TechIT-Trifold-Brochure-8.png`],
    ["AI Compute", `${asset}/2022/03/Copy-of-Copy-of-Black-and-Yellow-Playful-TechIT-Trifold-Brochure-6.png`],
  ],
  Communities: [
    ["Health Network", `${asset}/2025/06/Video-covers-HOME-PAGE-4.jpg`],
    ["Local Builders", `${asset}/2025/07/Video-covers-HOME-PAGE-8.jpg`],
    ["Innovation Circle", `${asset}/2025/07/Video-covers-HOME-PAGE-6.jpg`],
  ],
};

const initialIdeas = [
  "Open founder office hours for health AI pilots",
  "Invite university labs to post prototypes",
  "Create a weekly robotics buyer challenge",
  "Map local innovation incentives by region",
  "Launch a demo day for service providers",
  "Curate saved videos by sector",
];

const news = [
  "Fintech founders are shifting from launch content to proof-led customer stories.",
  "AI co-pilots are moving into every panel: learning, sales, and post-demo follow-up.",
  "Healthcare builders are asking for stronger provider distribution playbooks.",
  "Innovation landscapes are becoming a recurring category for ecosystem partners.",
];

const softVisuals = [
  realImages.connect,
  realImages.research,
  realImages.manufacturing,
  realImages.proprietary,
];

const aiRows = [
  {
    label: "AI for C",
    note: "Connect",
    hero: "institutions interoperability",
    cards: [
      ["Accelerate discovery", videos[2]],
      ["close the experimental loop,", videos[1]],
      ["research data.", videos[0]],
      ["Proprietary", softVisuals[3]],
    ],
  },
  {
    label: "AI for I",
    note: "Deploy",
    cards: [
      ["applying AI to transform how companies operate, produce, and innovate.", videos[2]],
      ["predictive maintenance, supply chain optimization, process automation,", videos[1]],
      ["quality control, digital twins of factories, AI engineering design", videos[0]],
      ["Trade secrets, operational data", softVisuals[3]],
    ],
    wide: videos[0],
  },
  {
    label: "AI for P",
    note: "Harness Benefit",
    hero: "Discovery",
    cards: [
      ["Democratize AI's benefits to individuals and communities.", videos[2]],
      ["personalized health, education, financial access, civic tools,", videos[1]],
      ["civic tools, workforce reskilling", videos[0]],
      ["workforce reskilling, local", softVisuals[3]],
    ],
  },
];

const shorts = [
  ["AI institutions", softVisuals[0]],
  ["Signal scan", softVisuals[1]],
  ["Interoperability", softVisuals[2]],
  ["Research loop", softVisuals[3]],
  ["Open innovation", realImages.startup],
  ["Market memo", realImages.city],
  ["Founder clip", realImages.community],
  ["Co-pilot prompt", realImages.robotics],
];

const innovationColumns = [
  {
    title: "LEARN RESEARCH",
    videos: [videos[0], videos[2], videos[1], videos[2], videos[1]],
  },
  {
    title: "BUILD/ PRODUCTIVITY",
    videos: [videos[2], videos[2], videos[1], videos[2], videos[1], videos[2]],
  },
  {
    title: "MY COMMUNITY",
    videos: [videos[0], videos[2], videos[1], videos[2], videos[1]],
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Icon({ name }) {
  const common = {
    className: "ui-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    award: (
      <svg {...common}>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.2 7 22l5-3 5 3-1.5-9.8" />
      </svg>
    ),
    briefcase: (
      <svg {...common}>
        <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" />
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M4 12h16M10 12v1.5h4V12" />
      </svg>
    ),
    building: (
      <svg {...common}>
        <path d="M4 21h16M6 21V6l8-3v18M14 8h4v13" />
        <path d="M9 9h1M9 13h1M9 17h1M17 12h1M17 16h1" />
      </svg>
    ),
    chevronLeft: (
      <svg {...common}>
        <path d="m15 6-6 6 6 6" />
      </svg>
    ),
    chevronRight: (
      <svg {...common}>
        <path d="m9 6 6 6-6 6" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9S14.5 18.3 12 21c-2.5-2.7-3.7-5.7-3.7-9S9.5 5.7 12 3Z" />
      </svg>
    ),
    leaf: (
      <svg {...common}>
        <path d="M4 20c8 0 15-6 16-16-10 1-16 7-16 16Z" />
        <path d="M4 20c3-5 7-8 12-10" />
      </svg>
    ),
    letters: (
      <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
        <text x="2.5" y="15.5" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="8.2" fontWeight="800">
          Abc
        </text>
      </svg>
    ),
    receipt: (
      <svg {...common}>
        <path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
    rocket: (
      <svg {...common}>
        <path d="M5 15c-1.2 1-1.8 2.4-2 4 1.6-.2 3-.8 4-2" />
        <path d="M9 15 6 12c2.2-4.7 6-7.8 12-9-.8 6-4.3 9.8-9 12Z" />
        <circle cx="14" cy="8" r="1.6" />
        <path d="M8 16c2.4.4 4.4-.1 6-1.7" />
      </svg>
    ),
    sprout: (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 12C8 7 5 7 3 8c1 5 5 6 9 4Z" />
        <path d="M12 12c4-6 7-6 9-5-1 5-5 7-9 5Z" />
      </svg>
    ),
    university: (
      <svg {...common}>
        <path d="M4 10h16M6 10v9M10 10v9M14 10v9M18 10v9M3 21h18" />
        <path d="M12 3 4 7v3h16V7l-8-4Z" />
      </svg>
    ),
    video: (
      <svg {...common}>
        <rect x="4" y="6" width="12" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    ),
    wallet: (
      <svg {...common}>
        <path d="M4 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
        <path d="M16 12h5" />
        <circle cx="17" cy="14" r="0.8" />
      </svg>
    ),
  };

  return icons[name] || icons.chevronRight;
}

function VideoCard({ video, size = "small", onPlay, layout = "overlay" }) {
  return (
    <button
      className={cx("video-card", size, layout === "editorial" && "is-editorial")}
      data-testid={`video-${slug(video.title)}`}
      onClick={() => onPlay(video)}
      type="button"
    >
      <span className="media-frame">
        <img src={video.image} alt="" />
        <span className="play-chip" aria-hidden="true" />
      </span>
      <span className="video-copy">
        <span className="source-line">
          {video.source || video.category} · {video.age || "2w"}
        </span>
        <strong>{video.title}</strong>
        {layout === "editorial" && (
          <span className="reaction-line">
            <span>♡ {video.reactions || 106}</span>
            <span>♧</span>
          </span>
        )}
      </span>
    </button>
  );
}

function ImagePlayCard({ title, image, size = "small", onPlay, showTitle = true }) {
  return (
    <button
      className={cx("image-play-card", size)}
      data-testid={`image-card-${slug(title)}`}
      onClick={() => onPlay({ title, image, category: "Innovation" })}
      type="button"
    >
      <img src={image} alt="" />
      <span className="play-chip" aria-hidden="true" />
      {showTitle && <strong>{title}</strong>}
    </button>
  );
}

function ScrollRail({ children, className = "", label }) {
  const railRef = useRef(null);

  function move(direction) {
    if (!railRef.current) return;
    const amount = railRef.current.clientWidth * 0.9;
    railRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className={cx("scroll-rail-shell", className)}>
      <button
        aria-label={`Previous ${label}`}
        className="rail-arrow rail-arrow-left"
        onClick={() => move(-1)}
        type="button"
      >
        <Icon name="chevronLeft" />
      </button>
      <div className="scroll-rail" ref={railRef}>
        {children}
      </div>
      <button
        aria-label={`Next ${label}`}
        className="rail-arrow rail-arrow-right"
        onClick={() => move(1)}
        type="button"
      >
        <Icon name="chevronRight" />
      </button>
    </div>
  );
}

export default function InnovationDashboard() {
  const [activeModule, setActiveModule] = useState("News");
  const [activeCategory, setActiveCategory] = useState("Healthcare");
  const [activeAudience, setActiveAudience] = useState("Startups");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalVideo, setModalVideo] = useState(null);
  const [followed, setFollowed] = useState([]);
  const [ideas, setIdeas] = useState(initialIdeas);
  const [ideaDraft, setIdeaDraft] = useState("");
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotAnswer, setCopilotAnswer] = useState(
    "Select a category, audience, or video and ask the co-pilot what to do next."
  );

  const filteredVideos = useMemo(() => {
    const matches = videos.filter(
      (video) => video.category === activeCategory || video.audience === activeAudience
    );
    return matches.length ? matches : videos;
  }, [activeAudience, activeCategory]);

  function postIdea(event) {
    event.preventDefault();
    const trimmed = ideaDraft.trim();
    if (!trimmed) return;
    setIdeas([trimmed, ...ideas]);
    setIdeaDraft("");
  }

  function askCopilot(event) {
    event.preventDefault();
    const prompt = copilotPrompt.trim();
    setCopilotAnswer(
      prompt
        ? `For ${activeCategory} + ${activeAudience}: turn "${prompt}" into a 30-second demo, add one proof point, then post it to ${activeModule}.`
        : `Try a ${activeCategory} spotlight for ${activeAudience}, then save the strongest video into your journey.`
    );
  }

  return (
    <main className={cx("portal-shell", sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed")}>
      <header className="portal-header">
        <a className="portal-logo" href="#top" aria-label="The Innovators">
          <img src={`${asset}/2021/02/logo-final-blac-k.png`} alt="The Innovators" />
        </a>

        <nav className="module-nav" aria-label="Platform modules">
          {topModules.map(([label, icon]) => (
            <button
              className={cx(activeModule === label && "is-active")}
              data-testid={`module-${slug(label)}`}
              key={label}
              onClick={() => setActiveModule(label)}
              type="button"
            >
              {icon === "play" ? (
                <span className="module-play-icon" aria-hidden="true" />
              ) : (
                <img src={icon} alt="" />
              )}
              <span className="module-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="market-strip">
          <div className="ticker-lane" aria-label={tickerItems.join(" | ")}>
            <div className="ticker-copy" aria-hidden="true">
              {[0, 1, 2, 3].map((group) => (
                <span className="ticker-group" key={group}>
                  {tickerItems.map((item) => (
                    <span className="ticker-item" key={`${group}-${item}`}>
                      {item}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="journey-actions">
          {journeyActions.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </div>
      </header>

      <aside className="audience-sidebar" aria-label="Audience filters">
        <div className="audience-sidebar-title">
          <span>Audience</span>
          <button
            aria-label={sidebarOpen ? "Collapse audience sidebar" : "Open audience sidebar"}
            onClick={() => setSidebarOpen((current) => !current)}
            type="button"
          >
            <Icon name={sidebarOpen ? "chevronLeft" : "chevronRight"} />
          </button>
        </div>
        {audiences.map((audience) => (
          <button
            className={cx(activeAudience === audience && "is-active")}
            data-testid={`audience-${slug(audience)}`}
            key={audience}
            onClick={() => setActiveAudience(audience)}
            title={audience}
            type="button"
          >
            <Icon name={audienceIcons[audience]} />
            <span className="audience-label">{audience}</span>
          </button>
        ))}
      </aside>

      <section className="feature-board" aria-label="Innovation feature board">
        {featureTiles.map((tile, index) => (
          <button
            className={cx("feature-tile", activeModule === tile && "is-active")}
            data-testid={`feature-${slug(tile)}`}
            key={tile}
            onClick={() => setActiveModule(tile)}
            style={{
              "--glow-x": `${18 + (index % 5) * 16}%`,
              "--glow-y": `${26 + (index % 3) * 18}%`,
              "--tile-a": `${42 + index * 21}deg`,
              "--tile-b": `${177 + index * 15}deg`,
            }}
            type="button"
          >
            {tile}
          </button>
        ))}
      </section>

      <nav className="category-bar" aria-label="Sector filters">
        <span>Markets</span>
        <div className="category-scroll">
          {categories.map((category) => (
            <button
              className={cx(activeCategory === category && "is-active")}
              data-testid={`category-${slug(category)}`}
              key={category}
              onClick={() => {
                setActiveCategory(category);
                const nextVideo = videos.find((video) => video.category === category);
                if (nextVideo) setActiveVideo(nextVideo);
              }}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <form
          className="category-search"
          onSubmit={(event) => {
            event.preventDefault();
            setActiveModule("Search");
          }}
        >
          <input aria-label="Search innovation stories" placeholder="Search" />
        </form>
      </nav>

      <div className="portal-grid">
        <section className="spotlight-panel">
          <div className="panel-heading spotlight-heading">
            <h2>News</h2>
          </div>
          <VideoCard video={activeVideo} size="hero" onPlay={setModalVideo} />
          <div className="news-block">
            <div className="news-thumbs">
              {videos.slice(1, 4).map((video) => (
                <VideoCard key={video.title} video={video} onPlay={setModalVideo} />
              ))}
            </div>
            <div>
              <ul>
                {news.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="leaders-panel">
          <div className="panel-heading">
            <h2>Leaders</h2>
            <button className="mini-action" onClick={() => setActiveModule("Leaders")} type="button">
              {followed.length ? `${followed.length} followed` : "Follow"}
            </button>
          </div>
          {Object.entries(leaderGroups).map(([group, people]) => (
            <div className="leader-row" key={group}>
              <h3>{group}</h3>
              <ScrollRail className="leader-strip" label={`${group} leaders`}>
                {people.map(([name, image]) => (
                  <button
                    className={cx(followed.includes(name) && "is-followed")}
                    key={name}
                    onClick={() =>
                      setFollowed((current) =>
                        current.includes(name)
                          ? current.filter((item) => item !== name)
                          : [...current, name]
                      )
                    }
                    title={name}
                    type="button"
                  >
                    <img src={image} alt={name} />
                    <span>
                      <strong>{name}</strong>
                      <small>{group}</small>
                    </span>
                  </button>
                ))}
              </ScrollRail>
            </div>
          ))}
        </section>

        <section className="innovators-panel">
          <div className="panel-heading">
            <h2>Innovators</h2>
            <button className="mini-action" onClick={() => setActiveCategory("AI")} type="button">
              Discover
            </button>
          </div>
          <div className="innovator-lines">
            {["Trending", "Featured", "Innovators this week", "Demo day this week"].map((label, rowIndex) => (
              <div className="video-line" key={label}>
                <span>{label}</span>
                <ScrollRail className="video-line-rail" label={label}>
                  {Array.from(
                    { length: 6 },
                    (_, index) => videos[(rowIndex * 2 + index) % videos.length]
                  ).map((video, index) => (
                    <VideoCard
                      key={`${label}-${video.title}-${index}`}
                      video={video}
                      onPlay={(item) => {
                        setActiveVideo(item);
                        setModalVideo(item);
                      }}
                    />
                  ))}
                </ScrollRail>
              </div>
            ))}
          </div>
        </section>

        <section className="ideas-panel">
          <div className="panel-heading">
            <h2>Everyone's</h2>
            <button className="mini-action" onClick={() => setActiveModule("Post")} type="button">
              Post
            </button>
          </div>
          <p>innovation ideas</p>
          <form onSubmit={postIdea}>
            <input
              aria-label="Post an innovation idea"
              data-testid="idea-input"
              onChange={(event) => setIdeaDraft(event.target.value)}
              placeholder="Post an idea..."
              value={ideaDraft}
            />
            <button type="submit">Post</button>
          </form>
          <ul>
            {ideas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
          <div className="everyone-feature">
            <VideoCard video={videos[3]} layout="editorial" onPlay={setModalVideo} />
          </div>
        </section>

        <ScrollRail className="bottom-videos" label="bottom videos">
          {videos.concat(videos).slice(0, 8).map((video, index) => (
            <VideoCard
              key={`bottom-${video.title}-${index}`}
              video={video}
              layout="editorial"
              onPlay={setModalVideo}
            />
          ))}
        </ScrollRail>

        <section className="copilot-panel">
          <VideoCard video={videos[2]} onPlay={setModalVideo} />
          <h2>c-pilot Agent</h2>
          <form onSubmit={askCopilot}>
            <input
              aria-label="Ask the innovation co-pilot"
              data-testid="copilot-input"
              onChange={(event) => setCopilotPrompt(event.target.value)}
              placeholder="Ask for a launch plan..."
              value={copilotPrompt}
            />
            <button type="submit">Ask</button>
          </form>
          <p>{copilotAnswer}</p>
        </section>
      </div>

      <section className="ai-section" aria-label="AI sections">
        {aiRows.map((row, rowIndex) => {
          const feature = row.hero ? (
            <ImagePlayCard
              image={softVisuals[0]}
              onPlay={setModalVideo}
              size="ai-feature"
              title={row.hero}
            />
          ) : (
            <VideoCard video={row.wide} size="ai-feature" onPlay={setModalVideo} />
          );
          const filledCards = row.cards
            .concat(videos.map((video) => [`${video.category} playbook`, video]))
            .slice(0, 3);

          return (
            <article className={cx("ai-row", rowIndex % 2 === 1 && "is-reverse")} key={row.label}>
              <header className="section-row-heading ai-row-heading">
                <h2>{row.label}</h2>
                <p>{row.note}</p>
              </header>
              {feature}
              <div className="ai-card-grid">
                {filledCards.map(([title, media], index) =>
                  typeof media === "string" ? (
                    <div className="captioned-video" key={`${row.label}-${title}-${index}`}>
                      <ImagePlayCard
                        image={media}
                        onPlay={setModalVideo}
                        showTitle={false}
                        title={title}
                      />
                      <h3>{title}</h3>
                    </div>
                  ) : (
                    <div className="captioned-video" key={`${row.label}-${title}-${index}`}>
                      <VideoCard video={media} onPlay={setModalVideo} />
                      <h3>{title}</h3>
                    </div>
                  )
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="shorts-section">
        <h2>Shorts</h2>
        <ScrollRail className="shorts-strip" label="shorts">
          {shorts.map(([title, image], index) => (
            <ImagePlayCard
              image={image}
              key={`${title}-${index}`}
              onPlay={setModalVideo}
              size="short"
              title={title}
            />
          ))}
        </ScrollRail>
        <ScrollRail className="shorts-video-row" label="short videos">
          {videos.concat(videos).slice(0, 6).map((video, index) => (
            <div className="captioned-video" key={`short-video-${video.title}-${index}`}>
              <VideoCard video={video} layout="editorial" onPlay={setModalVideo} />
              <h3>
                {index % 3 === 0
                  ? "applying AI to transform how companies innovate."
                  : index % 3 === 1
                    ? "Trade secrets, operational data"
                    : "Democratize AI's benefits to individuals and communities."}
              </h3>
            </div>
          ))}
        </ScrollRail>
      </section>

      <section className="show-section">
        <h2>INNOVATORSverse SHOW This Week</h2>
        <div className="show-grid">
          <VideoCard video={videos[0]} size="show-feature" onPlay={setModalVideo} />
          <ScrollRail className="feature-small-rail" label="show videos">
            {videos.concat(videos).slice(1, 8).map((video, index) => (
              <div className="captioned-video" key={`show-${video.title}-${index}`}>
                <VideoCard video={video} layout="editorial" onPlay={setModalVideo} />
                <h3>
                  {index % 3 === 0
                    ? "Monthly innovation shows"
                    : index % 3 === 1
                      ? "Leader conversations and demo recaps"
                      : "Stories from innovation markets"}
                </h3>
              </div>
            ))}
          </ScrollRail>
        </div>
      </section>

      <section className="deals-section">
        <h2>Deals This Week</h2>
        <div className="deals-grid">
          <ScrollRail className="feature-small-rail" label="deal videos">
            {videos.concat(videos).concat(videos).slice(1, 12).map((video, index) => (
              <div className="captioned-video" key={`deal-${video.title}-${index}`}>
                <VideoCard video={video} layout="editorial" onPlay={setModalVideo} />
                <h3>
                  {index % 3 === 0
                    ? "applying AI to transform how companies innovate."
                    : index % 3 === 1
                      ? "Trade secrets, operational data"
                      : "Democratize AI's benefits to individuals and communities."}
                </h3>
              </div>
            ))}
          </ScrollRail>
          <VideoCard video={videos[0]} size="deal-feature" onPlay={setModalVideo} />
        </div>
        <footer className="deals-footer">
          <strong>More innovation deal flow</strong>
        </footer>
      </section>

      <section className="on-innovation-section">
        <h2>On Innovation</h2>
        <nav aria-label="Innovation collections">
          {[
            "LEARN",
            "RESEARCH",
            "Build",
            "Productivity",
            "Fundraising",
            "Marketing",
            "Sales",
            "My Community",
            "My Cart",
            "Intelligence",
          ].map((item) => (
            <button key={item} onClick={() => setActiveModule(item)} type="button">
              {item}
            </button>
          ))}
        </nav>
        <div className="innovation-icon-cloud">
          {Array.from({ length: 20 }, (_, index) => (
            <button
              className={`innovation-icon icon-${index % 5}`}
              key={index}
              onClick={() => setActiveModule(["Learn", "Research", "Build", "Marketing", "Sales"][index % 5])}
              type="button"
            />
          ))}
        </div>
        {innovationColumns.map((column, rowIndex) => {
          const feature =
            rowIndex === 0 ? (
              <VideoCard video={videos[0]} size="innovation-feature" onPlay={setModalVideo} />
            ) : (
              <ImagePlayCard
                image={rowIndex === 1 ? softVisuals[0] : softVisuals[3]}
                onPlay={setModalVideo}
                size="innovation-feature"
                title={rowIndex === 1 ? "Intelligence" : "My community"}
              />
            );

          return (
            <article className={cx("innovation-row", rowIndex % 2 === 1 && "is-reverse")} key={column.title}>
              <header className="section-row-heading innovation-row-heading">
                <h3>{column.title}</h3>
              </header>
              <div className="innovation-row-layout">
                {rowIndex % 2 === 0 && feature}
                <ScrollRail className="feature-small-rail innovation-small-rail" label={`${column.title} videos`}>
                  {column.videos.concat(videos).slice(0, 8).map((video, index) => (
                    <div className="captioned-video" key={`${column.title}-${video.title}-${index}`}>
                      <VideoCard video={video} layout="editorial" onPlay={setModalVideo} />
                      <h3>
                        {index % 2 === 0
                          ? "Signals, research, and repeatable innovation workflows"
                          : "Practical playbooks for teams building in public"}
                      </h3>
                    </div>
                  ))}
                </ScrollRail>
                {rowIndex % 2 === 1 && feature}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="site-footer">
        <strong>The INNOVATORS</strong>
        <span>2026 all rights reserved</span>
      </footer>

      <section className="floating-copilot" aria-label="Site AI co-pilot">
        <button
          className="floating-copilot-orb"
          onClick={() => setActiveModule("AI co-pilot")}
          type="button"
          aria-label="Open AI co-pilot"
        >
          AI
        </button>
        <form onSubmit={askCopilot}>
          <input
            aria-label="Ask the site co-pilot"
            onChange={(event) => setCopilotPrompt(event.target.value)}
            placeholder="Ask co-pilot..."
            value={copilotPrompt}
          />
          <button type="submit">Ask</button>
        </form>
      </section>

      {modalVideo && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={modalVideo.title}>
          <div>
            <button className="modal-close" onClick={() => setModalVideo(null)} type="button">
              Close
            </button>
            <img src={modalVideo.image} alt="" />
            <h2>{modalVideo.title}</h2>
            <p>
              Playing a preview for {modalVideo.category}. Use this slot for the original embedded
              video, live stream, or demo recording.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
