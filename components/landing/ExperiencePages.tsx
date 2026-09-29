"use client";

import {
  BarChart3,
  Bookmark,
  Bot,
  Building2,
  CalendarDays,
  Check,
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
import { asset, leaderGroups, videos } from "./data";
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

function SelectableMediaTile({
  active,
  onSelect,
  video,
}: {
  active: boolean;
  onSelect: (video: VideoItem) => void;
  video: VideoItem;
}) {
  return (
    <button
      aria-pressed={active}
      className={`xp-media-tile ${active ? "is-selected" : ""}`}
      onClick={() => onSelect(video)}
      type="button"
    >
      <span className="xp-media-image">
        <img alt={`${video.title} video thumbnail`} src={video.image} />
        <span className="xp-play"><Play fill="currentColor" /></span>
      </span>
      <span className="xp-media-copy">
        <small>{video.source ?? video.category}</small>
        <strong>{video.title}</strong>
      </span>
    </button>
  );
}

function LeaderTile({ onOpen, video }: { onOpen: OpenVideo; video: VideoItem }) {
  return (
    <button className="ai-leader-tile" onClick={() => onOpen(video)} type="button">
      <img alt={`${video.title}, ${video.category}`} src={video.image} />
      <span className="ai-leader-shade" />
      <span className="ai-leader-play"><Play fill="currentColor" /></span>
      <span className="ai-leader-copy">
        <strong>{video.title}</strong>
        <small>{video.category}</small>
        <em>{video.source}</em>
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

const companyVideoGroups = [
  { label: "Live now", videos: [videos[24], videos[15], videos[19], videos[8], videos[36]] },
  { label: "Tutorial videos", videos: [videos[29], videos[6], videos[27], videos[14], videos[2], videos[31]] },
  { label: "Historical videos", videos: [videos[3], videos[5], videos[12], videos[21], videos[32]] },
  { label: "Product demos", videos: [videos[8], videos[11], videos[17], videos[18], videos[26], videos[35]] },
  { label: "Founder stories", videos: [videos[13], videos[20], videos[30], videos[38]] },
];

const companyActions = [
  {
    icon: Radio,
    label: "Live now",
    title: "Join the live showroom",
    body: "Watch the selected broadcast and move between product, team, and factory demonstrations.",
    cta: "Watch selected video",
  },
  {
    icon: Users,
    label: "Invite audience",
    title: "Invite peers or an audience",
    body: "Prepare a shared viewing room for buyers, partners, investors, or internal teams.",
    cta: "Prepare invite link",
  },
  {
    icon: WandSparkles,
    label: "Build showroom",
    title: "Build your showroom",
    body: "Organize live streams, tutorials, product demos, founder stories, and company intelligence.",
    cta: "Open showroom builder",
  },
  {
    icon: Share2,
    label: "Share / white label",
    title: "Share or white-label it",
    body: "Create a presentation-ready company experience for a campaign, event, or partner portal.",
    cta: "Prepare share options",
  },
];

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
  const [activeVideo, setActiveVideo] = useState(companyVideoGroups[0].videos[0]);
  const [activeGroup, setActiveGroup] = useState(companyVideoGroups[0].label);
  const [activeAction, setActiveAction] = useState(companyActions[0].label);
  const [actionStatus, setActionStatus] = useState("Select an action to begin.");
  const selectedGroup = companyVideoGroups.find((group) => group.label === activeGroup) ?? companyVideoGroups[0];
  const selectedAction = companyActions.find((action) => action.label === activeAction) ?? companyActions[0];

  return (
    <ExperienceChrome defaultAudience="Corporations" defaultCategory="Advanced Manufacturing" defaultModule="Demo">
      {(openVideo) => (
        <div className="experience-main company-experience">
          <section className="company-showroom-grid">
            <div className="company-showroom-core">
              <div className="xp-showroom-stage">
                <img alt={`${activeVideo.title} showroom video`} src={activeVideo.image} />
                <span className="xp-showroom-gridlines" />
                <span className="xp-live"><Radio /> Live showroom</span>
                <div className="xp-showroom-copy">
                  <small>Nexa Robotics · Boston</small>
                  <h1>{activeVideo.title}</h1>
                  <p>Explore the company through live broadcasts, tutorials, historical briefings, product demos, and founder stories.</p>
                  <button onClick={() => openVideo(activeVideo)} type="button"><Play fill="currentColor" /> Play selected video</button>
                </div>
                <nav aria-label="Showroom video groups">
                  {companyVideoGroups.map((group) => (
                    <button
                      aria-label={`Show ${group.label}`}
                      aria-pressed={activeGroup === group.label}
                      className={activeGroup === group.label ? "is-active" : undefined}
                      key={group.label}
                      onClick={() => {
                        setActiveGroup(group.label);
                        setActiveVideo(group.videos[0]);
                      }}
                      type="button"
                    />
                  ))}
                </nav>
              </div>

              <div className="company-action-strip" aria-label="Showroom actions">
                {companyActions.map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      aria-pressed={activeAction === action.label}
                      className={activeAction === action.label ? "is-active" : undefined}
                      key={action.label}
                      onClick={() => {
                        setActiveAction(action.label);
                        setActionStatus(`${action.label} workspace ready.`);
                      }}
                      type="button"
                    >
                      <ActionIcon /> <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>

              <section className="company-action-workspace" aria-live="polite">
                <div><small>Showroom action</small><h2>{selectedAction.title}</h2><p>{selectedAction.body}</p></div>
                <button
                  onClick={() => {
                    if (selectedAction.label === "Live now") openVideo(activeVideo);
                    else setActionStatus(`${selectedAction.cta} is ready for configuration.`);
                  }}
                  type="button"
                >
                  {selectedAction.label === "Live now" ? <Play fill="currentColor" /> : <ChevronRight />}
                  {selectedAction.cta}
                </button>
                <span><Check /> {actionStatus}</span>
              </section>

              <ScrollRail className="company-view-rail" label="showroom highlights">
                {companyVideoGroups[0].videos.map((video) => (
                  <button aria-pressed={activeVideo.title === video.title} className={activeVideo.title === video.title ? "is-active" : undefined} key={video.title} onClick={() => setActiveVideo(video)} type="button">
                    <img alt="" src={video.image} />
                    <span><strong>{video.title}</strong><small>{video.category}</small></span>
                    <Play fill="currentColor" />
                  </button>
                ))}
              </ScrollRail>
            </div>

            <aside className="company-playlist-panel">
              <SectionHeading title="Playlist" action={`${companyVideoGroups.reduce((total, group) => total + group.videos.length, 0)} videos`} />
              <nav className="company-playlist-tabs" aria-label="Company video playlists">
                {companyVideoGroups.map((group) => (
                  <button aria-pressed={activeGroup === group.label} className={activeGroup === group.label ? "is-active" : undefined} key={group.label} onClick={() => { setActiveGroup(group.label); setActiveVideo(group.videos[0]); }} type="button">{group.label}</button>
                ))}
              </nav>
              <h3>{selectedGroup.label}</h3>
              {selectedGroup.videos.map((video, index) => (
                <button className={activeVideo.title === video.title ? "is-active" : undefined} key={video.title} onClick={() => setActiveVideo(video)} type="button">
                  <img alt="" src={video.image} />
                  <span><small>0{index + 1}</small><strong>{video.title}</strong></span>
                </button>
              ))}
              <button className="company-play-selected" onClick={() => openVideo(activeVideo)} type="button"><Play fill="currentColor" /> Play selected video</button>
            </aside>
          </section>

          <section className="company-video-library">
            <SectionHeading title="Company video library" body="Every company story has a dedicated frame: instruction, history, product proof, and leadership." action="24 videos" />
            {companyVideoGroups.slice(1).map((group) => (
              <section className="company-video-row" key={group.label}>
                <header><h3>{group.label}</h3><span>{group.videos.length} videos</span></header>
                <ScrollRail label={group.label}>
                  {group.videos.map((video) => <MediaTile key={`${group.label}-${video.title}`} onOpen={openVideo} video={video} />)}
                </ScrollRail>
              </section>
            ))}
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

const aiAcademiaLeaders: VideoItem[] = [
  { title: leaderGroups.Academia[0][0], image: leaderGroups.Academia[0][1], category: "Biomedical innovation researcher", source: "Academia" },
  { title: leaderGroups.Academia[1][0], image: leaderGroups.Academia[1][1], category: "AI research and policy", source: "Academia" },
  { title: leaderGroups.Academia[2][0], image: leaderGroups.Academia[2][1], category: "Innovation ecosystem scholar", source: "Academia" },
  { title: leaderGroups.Academia[3][0], image: leaderGroups.Academia[3][1], category: "Technology and innovation leader", source: "Academia" },
  { title: leaderGroups.Industry[1][0], image: leaderGroups.Industry[1][1], category: "Research commercialization", source: "Academic medicine" },
  { title: leaderGroups.Industry[2][0], image: leaderGroups.Industry[2][1], category: "Digital health systems", source: "Academic medicine" },
];

const aiIndustryLeaders: VideoItem[] = [
  { title: leaderGroups.Industry[0][0], image: leaderGroups.Industry[0][1], category: "Industrial technology leadership", source: "Industry" },
  { title: leaderGroups.Industry[1][0], image: leaderGroups.Industry[1][1], category: "Healthcare innovation", source: "Industry" },
  { title: leaderGroups.Industry[2][0], image: leaderGroups.Industry[2][1], category: "Clinical AI and digital health", source: "Industry" },
  { title: leaderGroups.Industry[3][0], image: leaderGroups.Industry[3][1], category: "Healthcare strategy", source: "Industry" },
  { title: leaderGroups.Government[0][0], image: leaderGroups.Government[0][1], category: "Connected systems leadership", source: "Industry" },
  { title: leaderGroups.Government[1][0], image: leaderGroups.Government[1][1], category: "Health-system transformation", source: "Industry" },
];

const aiPolicyLeaders: VideoItem[] = [
  { title: leaderGroups.Government[0][0], image: leaderGroups.Government[0][1], category: "Technology policy and infrastructure", source: "Policy makers" },
  { title: leaderGroups.Government[1][0], image: leaderGroups.Government[1][1], category: "Healthcare systems policy", source: "Policy makers" },
  { title: leaderGroups.Government[2][0], image: leaderGroups.Government[2][1], category: "Responsible AI and health", source: "Policy makers" },
  { title: leaderGroups.Government[3][0], image: leaderGroups.Government[3][1], category: "Enterprise technology policy", source: "Policy makers" },
  { title: leaderGroups.Academia[2][0], image: leaderGroups.Academia[2][1], category: "Innovation institutions", source: "Policy makers" },
];

const aiPerspectives: VideoItem[] = [
  { title: leaderGroups.VC[0][0], image: leaderGroups.VC[0][1], category: "Venture and company building", source: "People's perspective" },
  { title: leaderGroups.VC[1][0], image: leaderGroups.VC[1][1], category: "Fintech investment", source: "People's perspective" },
  { title: leaderGroups.VC[2][0], image: leaderGroups.VC[2][1], category: "Healthcare venture capital", source: "People's perspective" },
  { title: leaderGroups.VC[3][0], image: leaderGroups.VC[3][1], category: "Startup acceleration", source: "People's perspective" },
  { title: leaderGroups.Industry[0][0], image: leaderGroups.Industry[0][1], category: "Future of industry", source: "People's perspective" },
];

const aiTrending = [...aiAcademiaLeaders.slice(0, 2), ...aiIndustryLeaders.slice(0, 2), aiPolicyLeaders[2]];
const aiWatchlist = [aiAcademiaLeaders[0], aiIndustryLeaders[0], aiPolicyLeaders[2], aiPerspectives[0]];

function AiLeaderRail({ label, onOpen, source }: { label: string; onOpen: OpenVideo; source: VideoItem[] }) {
  return (
    <section className="ai-video-row ai-leader-row">
      <SectionHeading title={label} action="View all" />
      <ScrollRail label={label}>
        {source.map((video) => <LeaderTile key={`${label}-${video.title}`} onOpen={onOpen} video={video} />)}
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
                  <img alt="" src={video.image} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{video.title}</strong><small>{video.category}</small>
                </button>
              ))}
              <h3>Issues today</h3>
              {["AI safety and trust", "Compute sovereignty", "Clinical AI validation", "Copyright and model data"].map((issue) => <button key={issue} type="button"><ChevronRight /> {issue}</button>)}
            </aside>

            <VideoStage className="ai-central-stage" eyebrow="Leader briefing now" onOpen={openVideo} video={activeVideo} />

            <aside className="ai-watchlist-panel">
              <SectionHeading title="Watchlist" action="Saved" />
              {aiWatchlist.map((video) => (
                <button key={video.title} onClick={() => setActiveVideo(video)} type="button"><img alt="" src={video.image} /><span><strong>{video.title}</strong><small>{video.category}</small></span><Bookmark /></button>
              ))}
            </aside>
          </section>

          <section className="ai-discovery-layout">
            <div>
              <AiLeaderRail label="AI Academia Researchers" onOpen={openVideo} source={aiAcademiaLeaders} />
              <AiLeaderRail label="AI Industry Insights" onOpen={openVideo} source={aiIndustryLeaders} />
              <AiLeaderRail label="Policy Makers Insights" onOpen={openVideo} source={aiPolicyLeaders} />
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

          <AiLeaderRail label="People's Perspectives" onOpen={openVideo} source={aiPerspectives} />
          <AiLeaderRail label="Industry Trending" onOpen={openVideo} source={aiIndustryLeaders.slice(0, 5)} />
          <AiLeaderRail label="AI Innovators" onOpen={openVideo} source={[...aiAcademiaLeaders.slice(0, 3), ...aiIndustryLeaders.slice(0, 3)]} />
        </div>
      )}
    </ExperienceChrome>
  );
}

const innovatorCompanies = [
  ["[24]7.ai", "Customer experience AI", "United States", `${asset}/2024/02/247.ai_.png`],
  ["0pass", "Cybersecurity", "United States", `${asset}/2024/02/0pass-4.png`],
  ["1000 Kelvin", "Advanced manufacturing", "Germany", `${asset}/2024/02/1000-Kelvin.png`],
  ["123COMPARE.ME", "Travel technology", "Spain", `${asset}/2022/09/123C-logo-squared-4-1024x1021.png`],
  ["13 Mari", "Maritime technology", "Norway", `${asset}/2024/03/13-Mari.png`],
  ["14BIS Supply Tracking", "Supply-chain technology", "United Kingdom", `${asset}/2024/03/14BIS-Supply-Tracking.png`],
  ["1928 diagnostics", "Health technology", "Sweden", `${asset}/2024/03/1928-diagnostics.png`],
  ["1DocWay", "Digital health", "United States", `${asset}/2024/03/1DocWay.png`],
  ["1Flow", "Enterprise software", "United States", `${asset}/2024/02/1Flow.png`],
  ["4AG Robotics", "Agricultural robotics", "Canada", `${asset}/2024/03/4AG-Robotics.png`],
  ["About:Energy", "Battery intelligence", "United Kingdom", `${asset}/2024/02/about-energy.jpg`],
  ["ABAGY Robotic Systems", "Industrial robotics", "United States", `${asset}/2024/03/ABAGY-Robotic-Systems.png`],
  ["AMOS Power", "Autonomous electric vehicles", "United States", `${asset}/2024/03/AMOS-Power.png`],
  ["Apptronik", "Humanoid robotics", "United States", `${asset}/2024/03/Apptronik.png`],
  ["Coactive AI", "Computer vision", "United States", `${asset}/2024/03/Coactive-AI.png`],
  ["Tethys Robotics", "Marine robotics", "Switzerland", `${asset}/2024/03/Tethys-Robotics.png`],
  ["3D BioFibR", "Biotechnology", "Canada", `${asset}/2024/02/3D-BioFibr.png`],
  ["Muddy Machines", "Agricultural robotics", "United Kingdom", `${asset}/2024/03/Muddy-Machines.png`],
] as const;

const innovatorsFeatured = [videos[24], videos[19], videos[29], videos[14], videos[8]];
const innovatorsTrending = [videos[2], videos[15], videos[27], videos[31], videos[18], videos[35]];

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
  const [activeVideo, setActiveVideo] = useState(innovatorsFeatured[0]);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All stages");
  const [mapView, setMapView] = useState(false);
  const filteredCompanies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return innovatorCompanies.filter(([name, industry]) => !normalized || `${name} ${industry}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <ExperienceChrome defaultAudience="Startups" defaultCategory="DeepTech" defaultModule="Discover">
      {(openVideo) => (
        <div className="experience-main innovators-experience">
          <nav className="innovators-utility-nav" aria-label="Innovators tools">
            <strong>The Innovators Directory</strong>
            <button className={mapView ? "is-active" : undefined} onClick={() => setMapView(true)} type="button"><Map /> Browse by map</button>
            <button className={!mapView ? "is-active" : undefined} onClick={() => setMapView(false)} type="button"><Building2 /> Browse companies</button>
            <button type="button"><CalendarDays /> My events</button>
            <button type="button"><Eye /> My watchlist</button>
          </nav>

          <section className="innovators-top-grid">
            <div className="innovators-featured">
              <SectionHeading title={mapView ? "Innovation world map" : "Global Innovation Stage"} body={mapView ? "Explore companies by ecosystem without leaving the directory." : "Watch the people and companies shaping the global innovation economy."} />
              {mapView ? (
                <div className="innovators-map-panel">
                  <GeographicMap mode="world" onSelectPoint={setSelectedPoint} points={mapPoints} selectedPoint={selectedPoint} />
                  <article><small>Selected ecosystem</small><h1>{selectedPoint.label}</h1><strong>{selectedPoint.summary}</strong><p>{selectedPoint.details.join(" · ")}</p><button type="button">Open ecosystem <ChevronRight /></button></article>
                </div>
              ) : (
                <VideoStage className="innovators-central-stage" eyebrow="Featured now" onOpen={openVideo} video={activeVideo} />
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

          <section className="innovators-discovery-grid innovators-media-grid">
            <div>
              <section className="innovators-feed-section">
                <SectionHeading title="Featured" body="Video profiles selected by The Innovators editorial desk." action="5 stories" />
                <ScrollRail label="featured innovators">
                  {innovatorsFeatured.map((video) => <SelectableMediaTile active={activeVideo.title === video.title} key={`featured-${video.title}`} onSelect={(selected) => { setActiveVideo(selected); setMapView(false); }} video={video} />)}
                </ScrollRail>
              </section>
              <section className="innovators-feed-section">
                <SectionHeading title="Trending" body="The companies, researchers, and technologies attracting attention now." action="Live signals" />
                <ScrollRail label="trending innovators">
                  {innovatorsTrending.map((video) => <SelectableMediaTile active={activeVideo.title === video.title} key={`trending-${video.title}`} onSelect={(selected) => { setActiveVideo(selected); setMapView(false); }} video={video} />)}
                </ScrollRail>
              </section>
              <section className="innovators-recommended">
                <SectionHeading title="Recommended for you" body="Fresh companies and ecosystem signals based on your sectors and watchlist." />
                <div>{[videos[21], videos[8], videos[15]].map((video) => <SelectableMediaTile active={activeVideo.title === video.title} key={video.title} onSelect={(selected) => { setActiveVideo(selected); setMapView(false); }} video={video} />)}</div>
              </section>
            </div>
            <aside className="innovators-side-stack">
              <section className="innovators-watch-panel">
                <SectionHeading title="Innovators watch list" action="24 saved" />
                {innovatorCompanies.slice(3, 8).map(([name, industry, , image]) => (
                  <button key={name} type="button"><img alt="" src={image} /><span><strong>{name}</strong><small>{industry}</small></span><Bookmark /></button>
                ))}
              </section>
              <section className="innovators-agent">
                <span><Bot /> AI discover agent</span>
                <h2>Find the right innovators</h2>
                <p>Set your parameters and scan the global innovation ecosystem.</p>
                {["Stage", "Location", "Industry", "Funding", "Market time", "Founders"].map((filter) => <button key={filter} type="button"><SlidersHorizontal /><span>{filter}</span><strong>{filter === "Stage" ? stage : "Any"}</strong><ChevronRight /></button>)}
                <button className="innovators-agent-action" onClick={() => setStage(stage === "All stages" ? "Series A–C" : "All stages")} type="button">Discover innovators <Sparkles /></button>
                <div><small>New discovery today</small><strong>48 high-fit companies</strong><span>Across AI, biotech, climate, and advanced manufacturing.</span></div>
              </section>
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
