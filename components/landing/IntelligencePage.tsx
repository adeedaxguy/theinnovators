"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  categories,
  featureTiles,
  videos,
} from "./data";
import {
  AudienceSidebar,
  CategoryBar,
  CompactFeatureNav,
  FeatureBoard,
  FloatingCopilot,
  MarketStrip,
  PortalHeader,
  SiteFooter,
  VideoModal,
} from "./chrome";
import { ImagePlayCard, VideoCard } from "./media-cards";
import { ScrollRail } from "./ScrollRail";
import type {
  IntelligenceCard,
  IntelligenceLeader,
  IntelligencePageContent,
  IntelligencePoint,
} from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";
import { cx, slug } from "./utils";

type IntelligencePageProps = {
  content: IntelligencePageContent;
};

function InsightCard({ card }: { card: IntelligenceCard }) {
  return (
    <article className="intelligence-card">
      {card.image && <img src={card.image} alt="" />}
      <div>
        {card.meta && <span>{card.meta}</span>}
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </article>
  );
}

function LeaderCard({ leader }: { leader: IntelligenceLeader }) {
  return (
    <article className="intelligence-leader-card">
      <img src={leader.image} alt="" />
      <div>
        <strong>{leader.name}</strong>
        <span>{leader.role}</span>
      </div>
    </article>
  );
}

function MapPointButton({
  point,
  selected,
  setSelectedPoint,
}: {
  point: IntelligencePoint;
  selected: boolean;
  setSelectedPoint: (point: IntelligencePoint) => void;
}) {
  return (
    <button
      aria-label={`Preview ${point.label}`}
      className={cx("intelligence-map-point", selected && "is-active")}
      onClick={() => setSelectedPoint(point)}
      onFocus={() => setSelectedPoint(point)}
      onMouseEnter={() => setSelectedPoint(point)}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      type="button"
    >
      <span />
      <strong>{point.label}</strong>
    </button>
  );
}

export default function IntelligencePage({ content }: IntelligencePageProps) {
  const [activeModule, setActiveModule] = useState(content.activeModule);
  const [activeCategory, setActiveCategory] = useState(content.activeCategory);
  const [activeAudience, setActiveAudience] = useState(content.activeAudience);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(content.heroVideo);
  const [newsIndex, setNewsIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<IntelligencePoint>(content.map.points[0]);
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [activeTab, setActiveTab] = useState(content.tabs[0]);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotAnswer, setCopilotAnswer] = useState(
    `Ask the ${content.agentTitle.toLowerCase()} for a country, state, policy, industry, or playlist brief.`
  );

  const videoRail = useMemo(() => {
    const merged = [content.heroVideo, ...content.playlist, ...videos];
    return merged.filter(
      (video, index, array) => array.findIndex((item) => item.title === video.title) === index
    );
  }, [content.heroVideo, content.playlist]);

  function askCopilot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = copilotPrompt.trim();
    setCopilotAnswer(
      prompt
        ? `${content.agentTitle}: build a brief for "${prompt}" with overview, policy, ecosystem data, leaders, industries, videos, events, and next actions.`
        : `${content.agentTitle}: start with ${selectedPoint.label}, then compare rankings, leaders, policy, and the video library.`
    );
  }

  return (
    <main className={cx("portal-shell intelligence-shell", sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed")}>
      <PortalHeader activeModule={activeModule} setActiveModule={setActiveModule} />
      <MarketStrip />
      <AudienceSidebar
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <FeatureBoard activeModule={activeModule} setActiveModule={setActiveModule} />
      <CompactFeatureNav activeModule={activeModule} setActiveModule={setActiveModule} />
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveModule={setActiveModule}
        setActiveVideo={setActiveVideo}
        setNewsIndex={setNewsIndex}
      />

      <div className="intelligence-page-main">
        <section className="intelligence-hero" id="top">
          <div className="intelligence-hero-copy">
            <h1>{content.title}</h1>
            <p className="route-label">{content.routeLabel}</p>
            <p>{content.deck}</p>
            <div className="intelligence-stats" aria-label={`${content.title} stats`}>
              {content.stats.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  {label}
                </span>
              ))}
            </div>
            <div className="intelligence-tabbar" aria-label={`${content.title} sections`}>
              {content.tabs.map((tab) => (
                <button
                  className={cx(tab === activeTab && "is-active")}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button
            className="intelligence-hero-video"
            onClick={() => setModalVideo(activeVideo)}
            type="button"
          >
            <img src={content.heroImage} alt="" />
            <span className="play-chip" aria-hidden="true" />
            <span>
              <strong>{content.heroVideo.title}</strong>
              <small>{activeTab} briefing</small>
            </span>
          </button>
        </section>

        {!mapOpen && (
          <button className="map-reopen" onClick={() => setMapOpen(true)} type="button">
            Open {content.map.title}
          </button>
        )}

        {mapOpen && (
          <section className="intelligence-map-layer" aria-label={content.map.title}>
            <div className="map-copy">
              <h2>{content.map.title}</h2>
              <p>{content.map.body}</p>
              <button onClick={() => setMapOpen(false)} type="button">
                {content.map.action}
              </button>
            </div>
            <div className="intelligence-map-stage">
              <img src={content.map.image} alt="" />
              {content.map.points.map((point) => (
                <MapPointButton
                  key={point.id}
                  point={point}
                  selected={selectedPoint.id === point.id}
                  setSelectedPoint={setSelectedPoint}
                />
              ))}
            </div>
            <aside className="map-inspector" aria-live="polite">
              <span>{selectedPoint.label}</span>
              <h3>{selectedPoint.summary}</h3>
              <ul>
                {selectedPoint.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </aside>
          </section>
        )}

        <div className="intelligence-layout">
          <aside className="intelligence-left-rail">
            <section>
              <h2>Innovation News</h2>
              <ul className="intelligence-news-list">
                {content.news.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>{content.leadersTitle}</h2>
              <div className="intelligence-leaders-grid">
                {content.leaders.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} />
                ))}
              </div>
            </section>

            <section>
              <h2>Industry Organizations</h2>
              <div className="mini-card-stack">
                {content.organizations.map((card) => (
                  <InsightCard key={card.title} card={card} />
                ))}
              </div>
            </section>

            <section>
              <h2>Innovation Summits</h2>
              <div className="mini-card-stack">
                {content.summits.map((card) => (
                  <InsightCard key={card.title} card={card} />
                ))}
              </div>
            </section>
          </aside>

          <section className="intelligence-core">
            <div className="core-heading">
              <h2>{content.spotlightTitle}</h2>
              <button onClick={() => setModalVideo(content.heroVideo)} type="button">
                Play briefing
              </button>
            </div>
            <div className="feature-video-panel">
              <ImagePlayCard
                image={content.heroVideo.image}
                onPlay={setModalVideo}
                size="ai-feature"
                title={content.heroVideo.title}
              />
            </div>
            <ScrollRail className="spotlight-economy-rail" label={content.spotlightTitle}>
              {content.spotlight.map((card) => (
                <InsightCard key={card.title} card={card} />
              ))}
            </ScrollRail>

            <section className="intelligence-profile">
              <div>
                <h2>{content.profileTitle}</h2>
                <p>
                  Structured intelligence for overview, ecosystem, policy, institutions, academia,
                  capital, industries, rankings, events, and video discovery.
                </p>
              </div>
              <div className="profile-block-grid">
                {content.profileBlocks.map((block) => (
                  <article key={block.title}>
                    <h3>{block.title}</h3>
                    <ul>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {content.actionCards && (
              <section className="intelligence-actions" aria-label="USA support actions">
                {content.actionCards.map((card) => (
                  <button key={card.title} type="button">
                    <strong>{card.title}</strong>
                    <span>{card.body}</span>
                  </button>
                ))}
              </section>
            )}

            <section className="intelligence-industries">
              <h2>{content.slug === "usa" ? "U.S. Innovation Industries" : "Major Innovation Industries"}</h2>
              <ScrollRail className="industry-card-rail" label="innovation industries">
                {content.industries.map((card) => (
                  <InsightCard key={card.title} card={card} />
                ))}
              </ScrollRail>
            </section>

            <section className="intelligence-playlist">
              <div className="core-heading">
                <h2>{content.playlistTitle}</h2>
                <button onClick={() => setActiveModule("Saved Videos")} type="button">
                  Save playlist
                </button>
              </div>
              <ScrollRail className="intelligence-video-rail" label={content.playlistTitle}>
                {videoRail.slice(newsIndex, newsIndex + 8).map((video, index) => (
                  <VideoCard
                    key={`${video.title}-${index}`}
                    layout="editorial"
                    onPlay={(item) => {
                      setActiveVideo(item);
                      setModalVideo(item);
                    }}
                    video={video}
                  />
                ))}
              </ScrollRail>
            </section>
          </section>

          <aside className="intelligence-right-rail">
            <section className="agent-panel">
              <div>
                <span>{content.slug === "usa" ? "Discover" : "Global"} Agent</span>
                <h2>{content.agentTitle}</h2>
              </div>
              <form onSubmit={askCopilot}>
                <input
                  aria-label={`Ask ${content.agentTitle}`}
                  onChange={(event) => setCopilotPrompt(event.target.value)}
                  placeholder="Ask for an ecosystem brief..."
                  value={copilotPrompt}
                />
                <button type="submit">Ask</button>
              </form>
              <p>{copilotAnswer}</p>
              <div className="agent-prompt-grid">
                {content.agentPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setCopilotPrompt(prompt);
                      setCopilotAnswer(`${content.agentTitle}: ${prompt}. Add scope, evidence, videos, and recommended next actions.`);
                    }}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </section>

            <section className="ranking-panel">
              <h2>{content.rankingsTitle}</h2>
              {content.rankings.map((ranking) => (
                <article key={ranking.label}>
                  <div>
                    <strong>{ranking.label}</strong>
                    <span>{ranking.value}</span>
                  </div>
                  <meter max="100" min="0" value={ranking.score} />
                </article>
              ))}
            </section>

            <section>
              <h2>{content.slug === "usa" ? "America Innovates" : "Innovation Communities"}</h2>
              <div className="mini-card-stack">
                {content.communities.map((card) => (
                  <InsightCard key={card.title} card={card} />
                ))}
              </div>
            </section>

            <section className="quick-links-panel">
              <h2>Quick links</h2>
              <div>
                {featureTiles
                  .filter((tile) =>
                    content.slug === "usa"
                      ? tile.includes("US") || tile.includes("Demo") || tile.includes("Product")
                      : tile.includes("World") || tile.includes("INNOverse") || tile.includes("Deal")
                  )
                  .map((tile) => (
                    <a href={`#${slug(tile)}`} key={tile}>
                      {tile}
                    </a>
                  ))}
                {categories.slice(0, 6).map((category) => (
                  <button
                    className={cx(category === activeCategory && "is-active")}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <FloatingCopilot
        askCopilot={askCopilot}
        copilotPrompt={copilotPrompt}
        setActiveModule={setActiveModule}
        setCopilotPrompt={setCopilotPrompt}
      />
      <VideoModal modalVideo={modalVideo} onClose={() => setModalVideo(null)} />
      <SiteFooter />
    </main>
  );
}
