"use client";

import {
  BarChart3,
  Bookmark,
  Bot,
  Building2,
  CalendarDays,
  ChevronRight,
  Eye,
  Map,
  Play,
  Radio,
  Search,
  Send,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  AudienceSidebar,
  CategoryBar,
  FeatureBoard,
  MarketStrip,
  PortalHeader,
  SiteFooter,
  VideoModal,
} from "./chrome";
import { GeographicMap } from "./GeographicMap";
import { ScrollRail } from "./ScrollRail";
import { editorialImages, leaderGroups, realImages, videos } from "./data";
import type { IntelligencePoint } from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";

type OpenVideo = (video: ModalVideo) => void;

function ExperienceChrome({
  children,
  defaultAudience,
  defaultCategory,
  defaultModule,
}: {
  children: (openVideo: OpenVideo) => ReactNode;
  defaultAudience: string;
  defaultCategory: string;
  defaultModule: string;
}) {
  const [activeModule, setActiveModule] = useState(defaultModule);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [activeAudience, setActiveAudience] = useState(defaultAudience);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [, setCategoryVideo] = useState<VideoItem>(videos[0]);
  const [, setNewsIndex] = useState(0);

  return (
    <main
      className={`portal-shell intelligence-shell experience-shell ${sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed"}`}
      id="top"
    >
      <PortalHeader activeModule={activeModule} setActiveModule={setActiveModule} />
      <MarketStrip />
      <AudienceSidebar
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <FeatureBoard activeModule={activeModule} setActiveModule={setActiveModule} />
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveModule={setActiveModule}
        setActiveVideo={setCategoryVideo}
        setNewsIndex={setNewsIndex}
      />
      {children(setModalVideo)}
      <VideoModal modalVideo={modalVideo} onClose={() => setModalVideo(null)} />
      <SiteFooter />
    </main>
  );
}

function SectionHeading({
  action,
  body,
  title,
}: {
  action?: string;
  body?: string;
  title: string;
}) {
  return (
    <header className="xp-section-heading">
      <div>
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
      {action && <span>{action}</span>}
    </header>
  );
}

function MediaTile({
  className = "",
  onOpen,
  video,
}: {
  className?: string;
  onOpen: OpenVideo;
  video: VideoItem;
}) {
  return (
    <button className={`xp-media-tile ${className}`} onClick={() => onOpen(video)} type="button">
      <span className="xp-media-image">
        <img alt="" src={video.image} />
        <span className="xp-play"><Play fill="currentColor" /></span>
      </span>
      <span className="xp-media-copy">
        <small>{video.source ?? video.category}</small>
        <strong>{video.title}</strong>
      </span>
    </button>
  );
}

function VideoStage({
  className = "",
  eyebrow,
  onOpen,
  video,
}: {
  className?: string;
  eyebrow: string;
  onOpen: OpenVideo;
  video: VideoItem;
}) {
  return (
    <button className={`xp-video-stage ${className}`} onClick={() => onOpen(video)} type="button">
      <img alt="" src={video.image} />
      <span className="xp-stage-shade" />
      <span className="xp-stage-kicker">{eyebrow}</span>
      <span className="xp-stage-play"><Play fill="currentColor" /></span>
      <span className="xp-stage-copy">
        <strong>{video.title}</strong>
        <small>{video.category} · Video intelligence</small>
      </span>
    </button>
  );
}

const showroomPlaylist = [videos[24], videos[15], videos[19], videos[8], videos[36]];

const companyFacts = [
  ["Company", "Nexa Robotics"],
  ["Founded", "2019"],
  ["Headquarters", "Boston, United States"],
  ["Stage", "Series B"],
  ["Employees", "186"],
  ["Founders", "Maya Chen · Daniel Okafor"],
];

const companyBlocks = [
  { title: "Funding", items: ["$84M total raised", "Series B · $42M", "12 institutional investors", "$410M latest valuation"] },
  { title: "Products & Technology", items: ["Autonomous inspection", "Industrial vision AI", "Digital twin platform", "28 patent families"] },
  { title: "Growth", items: ["74 enterprise customers", "112% ARR growth", "9 open roles", "4 global markets"] },
  { title: "Connections", items: ["MIT spinout", "Techstars alumni", "6 strategic partners", "2 founder exits"] },
];

const companyTools = [
  "AI Research",
  "Market Research",
  "Competitive Analysis",
  "Product Launch",
  "PMF Testing",
  "Sales Insights",
  "Data Room",
  "Investor Match",
  "Valuation",
  "Due Diligence",
  "Recruitment",
  "Events",
];

export function CompanyShowroomPage() {
  const [activeVideo, setActiveVideo] = useState(showroomPlaylist[0]);
  const [showroomView, setShowroomView] = useState(0);
  const showroomViews = [realImages.manufacturing, realImages.robotics, realImages.city];

  return (
    <ExperienceChrome defaultAudience="Corporations" defaultCategory="Advanced Manufacturing" defaultModule="Demo">
      {(openVideo) => (
        <div className="experience-main company-experience">
          <section className="company-showroom-grid">
            <div className="company-showroom-core">
              <div className="xp-showroom-stage">
                <img alt="Nexa Robotics virtual showroom" src={showroomViews[showroomView]} />
                <span className="xp-showroom-gridlines" />
                <span className="xp-live"><Radio /> Live showroom</span>
                <div className="xp-showroom-copy">
                  <small>Nexa Robotics · Boston</small>
                  <h1>Step inside the intelligent factory</h1>
                  <p>Explore products, live demonstrations, team stories, and company intelligence in one visual space.</p>
                  <button onClick={() => openVideo(activeVideo)} type="button"><Play fill="currentColor" /> Enter live tour</button>
                </div>
                <nav aria-label="Showroom views">
                  {showroomViews.map((image, index) => (
                    <button
                      aria-label={`Show showroom view ${index + 1}`}
                      aria-pressed={showroomView === index}
                      className={showroomView === index ? "is-active" : undefined}
                      key={image}
                      onClick={() => setShowroomView(index)}
                      type="button"
                    />
                  ))}
                </nav>
              </div>

              <div className="company-action-strip" aria-label="Showroom actions">
                {[
                  [Radio, "Live now"],
                  [Users, "Invite audience"],
                  [WandSparkles, "Build showroom"],
                  [Share2, "Share / white label"],
                ].map(([ActionIcon, label]) => (
                  <button key={label as string} type="button"><ActionIcon /> <span>{label as string}</span></button>
                ))}
              </div>

              <ScrollRail className="company-view-rail" label="showroom highlights">
                {showroomPlaylist.map((video) => (
                  <button key={video.title} onClick={() => setActiveVideo(video)} type="button">
                    <img alt="" src={video.image} />
                    <span><strong>{video.title}</strong><small>{video.category}</small></span>
                    <Play fill="currentColor" />
                  </button>
                ))}
              </ScrollRail>
            </div>

            <aside className="company-playlist-panel">
              <SectionHeading title="Playlist" action={`${showroomPlaylist.length} videos`} />
              <h3>Tutorial videos</h3>
              {showroomPlaylist.slice(0, 3).map((video, index) => (
                <button className={activeVideo.title === video.title ? "is-active" : undefined} key={video.title} onClick={() => setActiveVideo(video)} type="button">
                  <img alt="" src={video.image} />
                  <span><small>0{index + 1}</small><strong>{video.title}</strong></span>
                </button>
              ))}
              <h3>Historical videos</h3>
              {showroomPlaylist.slice(3).map((video, index) => (
                <button className={activeVideo.title === video.title ? "is-active" : undefined} key={video.title} onClick={() => setActiveVideo(video)} type="button">
                  <img alt="" src={video.image} />
                  <span><small>0{index + 4}</small><strong>{video.title}</strong></span>
                </button>
              ))}
            </aside>
          </section>

          <section className="company-intelligence-grid">
            <div className="company-overview">
              <SectionHeading title="Company overview" body="A visual operating profile for the company, its technology, traction, and network." />
              <div className="company-facts">
                {companyFacts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <div className="company-data-blocks">
                {companyBlocks.map((block) => (
                  <article key={block.title}>
                    <h3>{block.title}</h3>
                    {block.items.map((item) => <p key={item}><ChevronRight /> {item}</p>)}
                  </article>
                ))}
              </div>
              <section className="company-comments">
                <SectionHeading title="Showroom conversation" action="18 comments" />
                <div><img alt="" src={leaderGroups.Industry[0][1]} /><p><strong>Barbara Humpton</strong><span>The factory tour makes the deployment story immediately clear.</span></p></div>
                <div><img alt="" src={leaderGroups.VC[0][1]} /><p><strong>Scott Sandell</strong><span>Strong evidence of product maturity and enterprise readiness.</span></p></div>
              </section>
            </div>

            <aside className="company-intelligence-rail">
              <section className="xp-agent-card">
                <span><Sparkles /> INNOgpt</span>
                <h2>Research this company</h2>
                <p>Summarize technology, traction, competitors, and investment signals.</p>
                <button type="button">Generate brief <ChevronRight /></button>
              </section>
              <section className="company-ranking-card">
                <h2>Company ranking</h2>
                {[["Trust", 92], ["Brand", 84], ["Quality", 95], ["Innovation", 89], ["Responsibility", 86]].map(([label, score]) => (
                  <div key={label as string}><span>{label}</span><b><i style={{ width: `${score}%` }} /></b><strong>{score}</strong></div>
                ))}
              </section>
              <section className="company-tool-card">
                <h2><Bot /> AI agent & tools</h2>
                <div>{companyTools.map((tool) => <button key={tool} type="button">{tool}<ChevronRight /></button>)}</div>
              </section>
            </aside>
          </section>
        </div>
      )}
    </ExperienceChrome>
  );
}

const aiTrending = [videos[14], videos[29], videos[2], videos[16], videos[30]];
const aiWatchlist = [videos[26], videos[17], videos[31], videos[11]];

function AiVideoRail({ label, onOpen, source }: { label: string; onOpen: OpenVideo; source: VideoItem[] }) {
  return (
    <section className="ai-video-row">
      <SectionHeading title={label} action="View all" />
      <ScrollRail label={label}>
        {source.map((video, index) => <MediaTile className={index === 0 ? "is-featured" : ""} key={`${label}-${video.title}`} onOpen={onOpen} video={video} />)}
      </ScrollRail>
    </section>
  );
}

export function AiDiscoveryPage() {
  const [activeVideo, setActiveVideo] = useState(aiTrending[0]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("Choose a research path or ask the AI discovery desk.");

  function askAgent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer(prompt.trim() ? `Discovery brief prepared for “${prompt.trim()}”.` : "Add a topic, person, company, or market to begin.");
  }

  return (
    <ExperienceChrome defaultAudience="Universities" defaultCategory="AI" defaultModule="Discover">
      {(openVideo) => (
        <div className="experience-main ai-experience">
          <section className="ai-newsroom-grid">
            <aside className="ai-trending-panel">
              <SectionHeading title="Trending" action="Live" />
              {aiTrending.map((video, index) => (
                <button className={activeVideo.title === video.title ? "is-active" : undefined} key={video.title} onClick={() => setActiveVideo(video)} type="button">
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{video.title}</strong><small>{video.source}</small>
                </button>
              ))}
              <h3>Issues today</h3>
              {["AI safety and trust", "Compute sovereignty", "Clinical AI validation", "Copyright and model data"].map((issue) => <button key={issue} type="button"><ChevronRight /> {issue}</button>)}
            </aside>

            <VideoStage className="ai-central-stage" eyebrow="AI briefing now" onOpen={openVideo} video={activeVideo} />

            <aside className="ai-watchlist-panel">
              <SectionHeading title="Watchlist" action="Saved" />
              {aiWatchlist.map((video) => (
                <button key={video.title} onClick={() => setActiveVideo(video)} type="button"><img alt="" src={video.image} /><span><strong>{video.title}</strong><small>{video.category}</small></span><Bookmark /></button>
              ))}
            </aside>
          </section>

          <section className="ai-discovery-layout">
            <div>
              <AiVideoRail label="AI Academia Researchers" onOpen={openVideo} source={[videos[29], videos[16], videos[6], videos[24], videos[35]]} />
              <AiVideoRail label="AI Industry Insights" onOpen={openVideo} source={[videos[30], videos[19], videos[8], videos[15], videos[27]]} />
              <AiVideoRail label="Policy Makers Insights" onOpen={openVideo} source={[videos[26], videos[12], videos[5], videos[21], videos[34]]} />
            </div>
            <aside className="ai-discover-agent">
              <span><Bot /> Discover</span>
              <h2>AI discovery agent</h2>
              <label>Research parameters</label>
              {[
                ["Topic", "Artificial intelligence"],
                ["Market", "Global"],
                ["Source", "People + companies"],
              ].map(([label, value]) => <button key={label} type="button"><span>{label}</span><strong>{value}</strong><ChevronRight /></button>)}
              <form onSubmit={askAgent}><Search /><input aria-label="Ask AI discovery agent" onChange={(event) => setPrompt(event.target.value)} placeholder="Ask the discovery agent" value={prompt} /><button aria-label="Send" type="submit"><Send /></button></form>
              <p>{answer}</p>
              <div className="ai-quick-prompts">
                {["Learn from a thought leader", "Find a healthcare mentor", "Research healthcare innovation", "Submit my take"].map((item) => <button key={item} onClick={() => { setPrompt(item); setAnswer(`Ready to explore: ${item}.`); }} type="button">{item}<ChevronRight /></button>)}
              </div>
              <section><BarChart3 /><div><strong>Data insights</strong><span>1,248 signals tracked today</span></div></section>
            </aside>
          </section>

          <AiVideoRail label="People's Perspectives" onOpen={openVideo} source={[videos[13], videos[38], videos[32], videos[20], videos[10]]} />
          <AiVideoRail label="Industry Trending" onOpen={openVideo} source={[videos[8], videos[31], videos[18]]} />
          <AiVideoRail label="AI Innovators" onOpen={openVideo} source={[videos[14], videos[2], videos[15], videos[27], videos[36], videos[24], videos[29]]} />
        </div>
      )}
    </ExperienceChrome>
  );
}

const innovatorCompanies = [
  ["Nexa Robotics", "Industrial AI", "Boston", editorialImages[11]],
  ["Helix BioSystems", "Biotechnology", "Cambridge", editorialImages[4]],
  ["Northstar Quantum", "Quantum", "Toronto", editorialImages[35]],
  ["Luma Health", "Digital health", "London", editorialImages[0]],
  ["Gridline Energy", "Clean tech", "Berlin", editorialImages[18]],
  ["Aster Finance", "Fintech", "Singapore", editorialImages[1]],
  ["Terra Materials", "Advanced materials", "Oslo", editorialImages[34]],
  ["OpenField AI", "Agriculture", "Nairobi", editorialImages[21]],
  ["OrbitWorks", "Space", "Los Angeles", editorialImages[32]],
  ["Cipher Trust", "Cybersecurity", "Tel Aviv", editorialImages[26]],
  ["Forge Systems", "Manufacturing", "Detroit", editorialImages[8]],
  ["Mosaic Commerce", "Digital commerce", "Paris", editorialImages[20]],
] as const;

const mapPoints: IntelligencePoint[] = [
  { id: "us", label: "United States", summary: "42,180 innovators", details: ["AI", "Health", "DeepTech"] },
  { id: "de", label: "Germany", summary: "8,420 innovators", details: ["Manufacturing", "Climate", "Mobility"] },
  { id: "uk", label: "United Kingdom", summary: "10,280 innovators", details: ["Fintech", "AI", "Biotech"] },
  { id: "in", label: "India", summary: "18,640 innovators", details: ["Software", "Health", "Commerce"] },
  { id: "sg", label: "Singapore", summary: "4,810 innovators", details: ["Fintech", "Logistics", "Climate"] },
  { id: "br", label: "Brazil", summary: "6,720 innovators", details: ["Agriculture", "Fintech", "Energy"] },
];

const encyclopedia = {
  Corporations: ["Innovation leadership", "Products and R&D", "Patents and licensing", "Innovation labs", "CVC and acquisitions", "Startup partnerships", "Open challenges and grants", "Procurement needs"],
  Startups: ["Company overview", "Funding and investors", "Products and technology", "Growth and market", "Founder connections", "Investor matchmaking", "Valuation and benchmarking", "Recruitment and events"],
  Investors: ["Fund and AUM", "Partners and thesis", "Stages and sectors", "Portfolio and exits", "Performance signals", "Startup scouting", "Deal screening", "Due diligence"],
  Universities: ["Students and faculty", "Research and patents", "Publications and citations", "Technology transfer", "Licensable technology", "Spinouts and founders", "Labs and incubators", "Industry partnerships"],
  Accelerators: ["Focus and model", "Mentors and alumni", "Unicorns and exits", "Application windows", "Acceptance and cohorts", "Startup screening", "Portfolio showcase", "Demo days and events"],
  "Industry Associations": ["Industry landscape", "Members and sectors", "Policy and advocacy", "Reports and standards", "Member showcase", "Industry groups", "Portfolio tools", "Events"],
  "Policy Makers": ["Agencies and positions", "Institutes and programs", "Grants and incentives", "Public procurement", "Landscape intelligence", "Data and reports", "Expert curation", "Ecosystem connections"],
  "Service Providers": ["Company overview", "Products and expertise", "Member perks", "Client sectors", "Rankings", "Showcases", "Partner discovery", "Events"],
  Countries: ["GDP and R&D", "Innovation index", "STEM and patents", "Startups and unicorns", "VC and universities", "Policy and incentives", "Labs and parks", "Regional rankings"],
} as const;

export function InnovatorsDirectoryPage() {
  const [selectedPoint, setSelectedPoint] = useState(mapPoints[0]);
  const [activeAudience, setActiveAudience] = useState<keyof typeof encyclopedia>("Corporations");
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All stages");
  const [mapView, setMapView] = useState(true);
  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return innovatorCompanies.filter(([name, industry]) => !normalized || `${name} ${industry}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <ExperienceChrome defaultAudience="Startups" defaultCategory="DeepTech" defaultModule="Discover">
      {(openVideo) => (
        <div className="experience-main innovators-experience">
          <nav className="innovators-utility-nav" aria-label="Innovators tools">
            <strong>Global Innovation Stage</strong>
            <button className={mapView ? "is-active" : undefined} onClick={() => setMapView(true)} type="button"><Map /> Browse by map</button>
            <button className={!mapView ? "is-active" : undefined} onClick={() => setMapView(false)} type="button"><Building2 /> Browse companies</button>
            <button type="button"><CalendarDays /> My events</button>
            <button type="button"><Eye /> My watchlist</button>
          </nav>

          <section className="innovators-top-grid">
            <div className="innovators-featured">
              <SectionHeading title={mapView ? "Innovation world map" : "Featured innovators"} body="Discover companies, people, research, capital, and ecosystems worldwide." />
              {mapView ? (
                <div className="innovators-map-panel">
                  <GeographicMap mode="world" onSelectPoint={setSelectedPoint} points={mapPoints} selectedPoint={selectedPoint} />
                  <article><small>Selected ecosystem</small><h1>{selectedPoint.label}</h1><strong>{selectedPoint.summary}</strong><p>{selectedPoint.details.join(" · ")}</p><button type="button">Open ecosystem <ChevronRight /></button></article>
                </div>
              ) : (
                <div className="innovators-feature-grid">
                  {[videos[14], videos[18], videos[24]].map((video) => <MediaTile key={video.title} onOpen={openVideo} video={video} />)}
                </div>
              )}
            </div>
            <aside className="innovators-ranking">
              <SectionHeading title="Innovators ranking" action="Global" />
              {[["Most Trusted", "Nexa Robotics", 96], ["Best Branding", "Mosaic Commerce", 92], ["Most Creative", "OpenField AI", 89], ["Best Techie", "Northstar Quantum", 94], ["Most Human", "Luma Health", 91]].map(([label, company, score], index) => (
                <button key={label as string} type="button"><span>{index + 1}</span><p><small>{label}</small><strong>{company}</strong></p><b>{score}</b></button>
              ))}
              <h3>Innovators on my watch</h3>
              {innovatorCompanies.slice(0, 3).map(([name, industry, , image]) => <button key={name} type="button"><img alt="" src={image} /><p><strong>{name}</strong><small>{industry}</small></p><Bookmark /></button>)}
            </aside>
          </section>

          <section className="innovators-discovery-grid">
            <div>
              <SectionHeading title="Innovators watch list" action="24 saved" />
              <ScrollRail label="innovators watch list">
                {[videos[19], videos[29], videos[1], videos[35], videos[31]].map((video) => <MediaTile key={video.title} onOpen={openVideo} video={video} />)}
              </ScrollRail>
              <section className="innovators-recommended">
                <SectionHeading title="Recommended for you" body="Fresh companies and ecosystem signals based on your sectors and watchlist." />
                <div>{[videos[21], videos[8], videos[15]].map((video) => <MediaTile key={video.title} onOpen={openVideo} video={video} />)}</div>
              </section>
            </div>
            <aside className="innovators-agent">
              <span><Bot /> AI discover agent</span>
              <h2>Find the right innovators</h2>
              <p>Set your parameters and scan the global innovation ecosystem.</p>
              {["Stage", "Location", "Industry", "Funding", "Market time", "Founders"].map((filter) => <button key={filter} type="button"><SlidersHorizontal /><span>{filter}</span><strong>{filter === "Stage" ? stage : "Any"}</strong><ChevronRight /></button>)}
              <button className="innovators-agent-action" onClick={() => setStage(stage === "All stages" ? "Series A–C" : "All stages")} type="button">Discover innovators <Sparkles /></button>
              <div><small>New discovery today</small><strong>48 high-fit companies</strong><span>Across AI, biotech, climate, and advanced manufacturing.</span></div>
            </aside>
          </section>

          <section className="innovation-encyclopedia">
            <SectionHeading title="Innovation encyclopedia" body="A connected reference for every participant in the innovation economy." />
            <nav aria-label="Encyclopedia audiences">
              {(Object.keys(encyclopedia) as Array<keyof typeof encyclopedia>).map((audience) => <button aria-pressed={activeAudience === audience} className={activeAudience === audience ? "is-active" : undefined} key={audience} onClick={() => setActiveAudience(audience)} type="button">{audience}</button>)}
            </nav>
            <div className="encyclopedia-content">
              <div><small>Audience intelligence</small><h2>{activeAudience}</h2><p>Explore profiles, data, relationships, media, and purpose-built AI workflows for {activeAudience.toLowerCase()}.</p><button type="button">Open {activeAudience} explorer <ChevronRight /></button></div>
              <ul>{encyclopedia[activeAudience].map((item) => <li key={item}><span><ChevronRight /></span>{item}</li>)}</ul>
            </div>
          </section>

          <section className="all-innovators">
            <SectionHeading title="All innovators" action={`${filteredCompanies.length} results`} />
            <div className="innovators-filter-bar">
              <button type="button"><SlidersHorizontal /> Sort: Recommended</button>
              <select aria-label="Filter by stage" onChange={(event) => setStage(event.target.value)} value={stage}><option>All stages</option><option>Seed</option><option>Series A–C</option><option>Growth</option></select>
              <button type="button">Country: Global</button>
              <button type="button">Industry: All</button>
              <button type="button">Affiliation: Any</button>
              <label><Search /><input aria-label="Search innovators" onChange={(event) => setQuery(event.target.value)} placeholder="Search innovators" value={query} /></label>
            </div>
            <div className="innovators-directory">
              {filteredCompanies.map(([name, industry, location, image]) => (
                <button key={name} type="button"><img alt="" src={image} /><span><strong>{name}</strong><small>{industry}</small><em>{location}</em></span><ChevronRight /></button>
              ))}
            </div>
          </section>
        </div>
      )}
    </ExperienceChrome>
  );
}
