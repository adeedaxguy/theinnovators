"use client";

import { useMemo, useState } from "react";

const asset = "https://innovators.ventures/wp-content/uploads";

const iconMap = {
  news: `${asset}/2021/03/2c-2.png`,
  learn: `${asset}/2022/08/2d.png`,
  build: `${asset}/2021/03/2f-2.png`,
  fund: `${asset}/2022/08/2e.png`,
  market: `${asset}/2022/08/2b.png`,
  sales: `${asset}/2022/08/2g.png`,
  discover: `${asset}/2021/03/2a-2.png`,
  community: `${asset}/2022/08/2d.png`,
  demo: `${asset}/2021/03/play-button.png`,
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
  ["Communi", iconMap.community],
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

const videos = [
  {
    title: "Digital health delivery",
    category: "Healthcare",
    audience: "Startups",
    image: `${asset}/2021/03/1-2.png`,
  },
  {
    title: "Neo banks and payments",
    category: "Fintech",
    audience: "VCs",
    image: `${asset}/2022/05/Copy-of-Copy-of-Black-and-Yellow-Playful-TechIT-Trifold-Brochure-8.png`,
  },
  {
    title: "AI, computing and data",
    category: "AI",
    audience: "Corporations",
    image: `${asset}/2022/03/Copy-of-Copy-of-Black-and-Yellow-Playful-TechIT-Trifold-Brochure-6.png`,
  },
  {
    title: "Monthly innovation shows",
    category: "DeepTech",
    audience: "Universities",
    image: `${asset}/2025/07/Video-covers-HOME-PAGE-8.jpg`,
  },
  {
    title: "BIO 2025 landscape",
    category: "Biotech",
    audience: "Industry Association",
    image: `${asset}/2025/07/Video-covers-HOME-PAGE-6.jpg`,
  },
  {
    title: "Worldwide innovation economies",
    category: "Energy",
    audience: "Countries",
    image: `${asset}/2025/06/Video-covers-HOME-PAGE-4.jpg`,
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
  `${asset}/2025/06/Video-covers-HOME-PAGE-4.jpg`,
  `${asset}/2025/07/Video-covers-HOME-PAGE-8.jpg`,
  `${asset}/2025/07/Video-covers-HOME-PAGE-6.jpg`,
  `${asset}/2022/03/Copy-of-Copy-of-Black-and-Yellow-Playful-TechIT-Trifold-Brochure-6.png`,
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
  ["Open innovation", softVisuals[0]],
  ["Market memo", softVisuals[2]],
  ["Founder clip", softVisuals[1]],
  ["Co-pilot prompt", softVisuals[1]],
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

function VideoCard({ video, size = "small", onPlay }) {
  return (
    <button
      className={cx("video-card", size)}
      data-testid={`video-${slug(video.title)}`}
      onClick={() => onPlay(video)}
      type="button"
    >
      <img src={video.image} alt="" />
      <span className="play-chip" aria-hidden="true" />
      <strong>{video.title}</strong>
    </button>
  );
}

function ImagePlayCard({ title, image, size = "small", onPlay }) {
  return (
    <button
      className={cx("image-play-card", size)}
      data-testid={`image-card-${slug(title)}`}
      onClick={() => onPlay({ title, image, category: "Innovation" })}
      type="button"
    >
      <img src={image} alt="" />
      <span className="play-chip" aria-hidden="true" />
      <strong>{title}</strong>
    </button>
  );
}

export default function InnovationDashboard() {
  const [activeModule, setActiveModule] = useState("News");
  const [activeCategory, setActiveCategory] = useState("Healthcare");
  const [activeAudience, setActiveAudience] = useState("Startups");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
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
    <main className={cx("portal-shell", menuCollapsed && "is-menu-collapsed")}>
      <header className="portal-header">
        <button
          className="sidebar-toggle"
          onClick={() => setMenuCollapsed((current) => !current)}
          type="button"
          aria-label={menuCollapsed ? "Expand top menu" : "Collapse top menu"}
          aria-pressed={menuCollapsed}
        >
          <span />
          <span />
          <span />
        </button>
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
              <img src={icon} alt="" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <form
          className="header-search"
          onSubmit={(event) => {
            event.preventDefault();
            setActiveModule("Search");
          }}
        >
          <input aria-label="Search innovation stories" placeholder="Search" />
        </form>

        <div className="market-strip">
          <span className="ticker-copy">
            Weather 72F | Time 12:43 AM | Stocks: Innovation Index +2.4% | AI Deals +18 |
            Robotics +1.6% | Health AI +3.1% | Quantum +0.7%
          </span>
        </div>

        <div className="journey-actions">
          {journeyActions.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </div>
      </header>

      <section className="market-tape" aria-label="Market movement">
        {marketStats.map(([label, value, trend]) => (
          <button key={label} onClick={() => setActiveModule(label)} type="button">
            <span>{label}</span>
            <strong className={trend}>{value}</strong>
          </button>
        ))}
      </section>

      <section className="landing-lead" aria-label="Innovation landing">
        <div className="lead-copy">
          <span className="eyebrow">Innovation Intelligence</span>
          <h1>The marketplace for innovation news, leaders, launches, and deal flow.</h1>
          <p>
            A visual business network for founders, investors, corporations, universities,
            governments, and communities to discover what is being built and who is building it.
          </p>
          <div className="lead-actions">
            <a href="https://innovators.ventures/pricing/">Broadcast My Innovation</a>
            <button onClick={() => setActiveModule("Discover")} type="button">
              Discover Innovators
            </button>
          </div>
          <dl className="landing-stats">
            {landingStats.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lead-media">
          <VideoCard video={activeVideo} size="lead-feature" onPlay={setModalVideo} />
          <div className="lead-stack">
            {videos.slice(1, 4).map((video) => (
              <button
                className="lead-story"
                key={`lead-${video.title}`}
                onClick={() => {
                  setActiveCategory(video.category);
                  setActiveAudience(video.audience);
                  setActiveVideo(video);
                }}
                type="button"
              >
                <img src={video.image} alt="" />
                <span>{video.category}</span>
                <strong>{video.title}</strong>
              </button>
            ))}
          </div>
        </div>

        <aside className="lead-briefing">
          <h2>Today&apos;s Innovation Briefing</h2>
          <ul>
            {news.map((item) => (
              <li key={`briefing-${item}`}>{item}</li>
            ))}
          </ul>
          <div className="briefing-cta">
            <span>Live desk</span>
            <strong>{activeCategory}</strong>
          </div>
        </aside>
      </section>

      <section className="landing-actions" aria-label="Primary actions">
        {landingActions.map((action) =>
          action.href ? (
            <a href={action.href} key={action.label}>
              <span>{action.label}</span>
              <strong>{action.meta}</strong>
            </a>
          ) : (
            <button
              key={action.label}
              onClick={() => setActiveModule(action.module)}
              type="button"
            >
              <span>{action.label}</span>
              <strong>{action.meta}</strong>
            </button>
          )
        )}
      </section>

      <section className="feature-board" aria-label="Innovation feature board">
        <div className="section-kicker">Innovation desk</div>
        {featureTiles.map((tile, index) => (
          <button
            className={cx("feature-tile", activeModule === tile && "is-active")}
            data-testid={`feature-${slug(tile)}`}
            key={tile}
            onClick={() => setActiveModule(tile)}
            style={{ "--tile": index }}
            type="button"
          >
            {tile}
          </button>
        ))}
      </section>

      <nav className="category-bar" aria-label="Sector filters">
        <span>Markets</span>
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
      </nav>

      <div className="portal-grid">
        <aside className="audience-sidebar" aria-label="Audience filters">
          {audiences.map((audience) => (
            <button
              className={cx(activeAudience === audience && "is-active")}
              data-testid={`audience-${slug(audience)}`}
              key={audience}
              onClick={() => setActiveAudience(audience)}
              type="button"
            >
              {audience}
            </button>
          ))}
        </aside>

        <section className="spotlight-panel">
          <div className="story-label">Top Story</div>
          <VideoCard video={activeVideo} size="hero" onPlay={setModalVideo} />
          <div className="news-block">
            <div className="news-thumbs">
              {videos.slice(1, 4).map((video) => (
                <VideoCard key={video.title} video={video} onPlay={setModalVideo} />
              ))}
            </div>
            <div>
              <h2>News</h2>
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
              <div>
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
              </div>
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
            {["Trending", "Featured", "Innovators this week"].map((label, rowIndex) => (
              <div className="video-line" key={label}>
                <span>{label}</span>
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
          <div className="everyone-thumbs">
            {videos.slice(0, 3).map((video) => (
              <VideoCard key={`everyone-${video.title}`} video={video} onPlay={setModalVideo} />
            ))}
          </div>
        </section>

        <section className="bottom-videos">
          {videos.slice(0, 5).map((video) => (
            <VideoCard key={`bottom-${video.title}`} video={video} onPlay={setModalVideo} />
          ))}
        </section>

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

      <div className="status-bar">
        <span>{activeModule}</span>
        <span>{activeCategory}</span>
        <span>{activeAudience}</span>
      </div>

      <section className="ai-section" aria-label="AI sections">
        {aiRows.map((row) => (
          <article className="ai-row" key={row.label}>
            <div className="ai-label">
              <h2>{row.label}</h2>
              <p>{row.note}</p>
            </div>
            {row.hero && (
              <ImagePlayCard
                image={softVisuals[0]}
                onPlay={setModalVideo}
                size="ai-hero"
                title={row.hero}
              />
            )}
            <div className="ai-card-grid">
              {row.cards.slice(0, 3).map(([title, media]) =>
                typeof media === "string" ? (
                  <ImagePlayCard
                    image={media}
                    key={`${row.label}-${title}`}
                    onPlay={setModalVideo}
                    title={title}
                  />
                ) : (
                  <div className="captioned-video" key={`${row.label}-${title}`}>
                    <VideoCard video={media} onPlay={setModalVideo} />
                    <h3>{title}</h3>
                  </div>
                )
              )}
            </div>
            {row.wide && (
              <VideoCard video={row.wide} size="wide-ai" onPlay={setModalVideo} />
            )}
          </article>
        ))}
      </section>

      <section className="shorts-section">
        <h2>Shorts</h2>
        <div className="shorts-strip">
          {shorts.map(([title, image], index) => (
            <ImagePlayCard
              image={image}
              key={`${title}-${index}`}
              onPlay={setModalVideo}
              size="short"
              title={title}
            />
          ))}
        </div>
        <div className="shorts-video-row">
          {videos.concat(videos).slice(0, 6).map((video, index) => (
            <div className="captioned-video" key={`short-video-${video.title}-${index}`}>
              <VideoCard video={video} onPlay={setModalVideo} />
              <h3>
                {index % 3 === 0
                  ? "applying AI to transform how companies innovate."
                  : index % 3 === 1
                    ? "Trade secrets, operational data"
                    : "Democratize AI's benefits to individuals and communities."}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="show-section">
        <h2>INNOVATORSverse SHOW This Week</h2>
        <div className="show-grid">
          <VideoCard video={videos[0]} size="show-feature" onPlay={setModalVideo} />
          {videos.concat(videos).slice(1, 8).map((video, index) => (
            <VideoCard key={`show-${video.title}-${index}`} video={video} onPlay={setModalVideo} />
          ))}
        </div>
      </section>

      <section className="deals-section">
        <h2>Deals This Week</h2>
        <div className="deals-grid">
          <VideoCard video={videos[0]} size="deal-feature" onPlay={setModalVideo} />
          {videos.concat(videos).concat(videos).slice(1, 12).map((video, index) => (
            <div className="captioned-video" key={`deal-${video.title}-${index}`}>
              <VideoCard video={video} onPlay={setModalVideo} />
              <h3>
                {index % 3 === 0
                  ? "applying AI to transform how companies innovate."
                  : index % 3 === 1
                    ? "Trade secrets, operational data"
                    : "Democratize AI's benefits to individuals and communities."}
              </h3>
            </div>
          ))}
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
        {innovationColumns.map((column, rowIndex) => (
          <article className="innovation-row" key={column.title}>
            <h3>{column.title}</h3>
            <div>
              {rowIndex === 0 ? (
                <VideoCard video={videos[0]} size="innovation-feature" onPlay={setModalVideo} />
              ) : (
                <ImagePlayCard
                  image={rowIndex === 1 ? softVisuals[0] : softVisuals[3]}
                  onPlay={setModalVideo}
                  size="innovation-feature"
                  title={rowIndex === 1 ? "Intelligence" : "My community"}
                />
              )}
              {column.videos.map((video, index) => (
                <div className="captioned-video" key={`${column.title}-${video.title}-${index}`}>
                  <VideoCard video={video} onPlay={setModalVideo} />
                  <h3>
                    {index % 2 === 0
                      ? "Signals, research, and repeatable innovation workflows"
                      : "Practical playbooks for teams building in public"}
                  </h3>
                </div>
              ))}
            </div>
          </article>
        ))}
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
