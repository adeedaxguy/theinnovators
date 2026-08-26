"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
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
import { VideoCard } from "./media-cards";
import { ScrollRail } from "./ScrollRail";
import type {
  IntelligenceCard,
  IntelligenceLeader,
  IntelligenceMetric,
  IntelligencePageContent,
  IntelligencePoint,
  IntelligenceRanking,
} from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";
import { cx, slug } from "./utils";

type IntelligencePageProps = {
  content: IntelligencePageContent;
};

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

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

function DataMapSurface({
  content,
  mode,
}: {
  content: IntelligencePageContent;
  mode: "hero" | "map" | "briefing";
}) {
  const isUsa = content.slug === "usa";
  const title = isUsa ? "United States innovation map" : "World innovation map";

  return (
    <div className={cx("data-map-surface", isUsa ? "is-usa" : "is-world", `is-${mode}`)}>
      <svg aria-label={title} role="img" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${content.slug}-${mode}-ocean`} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={isUsa ? "#07142a" : "#102a43"} />
            <stop offset="48%" stopColor={isUsa ? "#0b64a9" : "#2786c8"} />
            <stop offset="100%" stopColor={isUsa ? "#f19a53" : "#f4d06f"} />
          </linearGradient>
          <linearGradient id={`${content.slug}-${mode}-land`} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={isUsa ? "#78d4ff" : "#d9eef9"} />
            <stop offset="46%" stopColor={isUsa ? "#1d9fe5" : "#5db9e8"} />
            <stop offset="100%" stopColor={isUsa ? "#0e3d7d" : "#165c94"} />
          </linearGradient>
          <clipPath id={`${content.slug}-${mode}-usa`}>
            <path d="M111 295 139 250 209 218 290 217 336 190 433 203 500 197 559 216 629 213 696 239 775 245 854 284 884 324 833 354 748 347 686 385 620 373 562 408 488 392 428 414 358 382 292 388 234 360 171 348Z" />
          </clipPath>
          <clipPath id={`${content.slug}-${mode}-world`}>
            <path d="M91 183 162 129 237 136 287 170 257 218 166 235 109 216ZM349 129 462 96 560 124 596 185 545 241 438 236 358 199ZM628 166 764 118 899 174 866 246 732 262 641 222ZM435 260 514 286 489 379 417 394 361 337ZM592 276 681 304 748 394 697 465 615 410ZM182 312 281 339 336 440 245 493 159 432Z" />
          </clipPath>
        </defs>
        <rect width="1000" height="560" fill={`url(#${content.slug}-${mode}-ocean)`} />
        <g className="map-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <path
              d={`M${120 + index * 96} 48 C${96 + index * 86} 170 ${110 + index * 92} 350 ${82 + index * 104} 528`}
              key={`v-${index}`}
            />
          ))}
          {Array.from({ length: 5 }, (_, index) => (
            <path d={`M46 ${104 + index * 86} C260 ${82 + index * 78} 672 ${128 + index * 62} 954 ${92 + index * 82}`} key={`h-${index}`} />
          ))}
        </g>
        {isUsa ? (
          <g>
            <g clipPath={`url(#${content.slug}-${mode}-usa)`}>
              <rect x="88" y="165" width="820" height="300" fill={`url(#${content.slug}-${mode}-land)`} />
              {[
                [118, 213, 120, 82, "#e95f65"],
                [245, 219, 112, 74, "#42c7f3"],
                [365, 205, 124, 88, "#193f8b"],
                [497, 211, 112, 78, "#ef9a45"],
                [618, 226, 126, 78, "#2ab06e"],
                [746, 251, 104, 76, "#2451a4"],
                [161, 306, 130, 82, "#17376d"],
                [303, 311, 132, 76, "#55d2ff"],
                [447, 302, 110, 88, "#e85d89"],
                [568, 313, 126, 78, "#0e7cc1"],
                [704, 325, 118, 64, "#f2b24f"],
              ].map(([x, y, width, height, fill], index) => (
                <rect fill={String(fill)} height={Number(height)} key={index} opacity="0.78" width={Number(width)} x={Number(x)} y={Number(y)} />
              ))}
              <path className="network-line" d="M130 302 245 252 394 280 514 236 641 286 802 310" />
              <path className="network-line" d="M210 363 338 306 486 348 604 298 748 364" />
              <path className="network-line" d="M278 226 356 370 493 226 602 382 698 258" />
            </g>
            <path className="map-outline" d="M111 295 139 250 209 218 290 217 336 190 433 203 500 197 559 216 629 213 696 239 775 245 854 284 884 324 833 354 748 347 686 385 620 373 562 408 488 392 428 414 358 382 292 388 234 360 171 348Z" />
          </g>
        ) : (
          <g>
            <g clipPath={`url(#${content.slug}-${mode}-world)`}>
              <rect x="70" y="78" width="860" height="430" fill={`url(#${content.slug}-${mode}-land)`} />
              <path className="network-line" d="M128 211 240 176 420 202 552 177 713 209 865 199" />
              <path className="network-line" d="M206 402 375 336 504 314 642 354 721 431" />
              <path className="network-line" d="M462 118 520 240 615 304 674 443" />
            </g>
            {[
              "M91 183 162 129 237 136 287 170 257 218 166 235 109 216Z",
              "M349 129 462 96 560 124 596 185 545 241 438 236 358 199Z",
              "M628 166 764 118 899 174 866 246 732 262 641 222Z",
              "M435 260 514 286 489 379 417 394 361 337Z",
              "M592 276 681 304 748 394 697 465 615 410Z",
              "M182 312 281 339 336 440 245 493 159 432Z",
            ].map((d) => (
              <path className="map-outline" d={d} key={d} />
            ))}
          </g>
        )}
        <g className="map-nodes" aria-hidden="true">
          {content.map.points.map((point) => (
            <circle cx={point.x * 10} cy={point.y * 5.6} key={point.id} r={mode === "hero" ? 8 : 6} />
          ))}
        </g>
      </svg>
      <div className="map-surface-caption">
        <strong>{content.slug === "usa" ? "AMERICA INNOVATES" : "GLOBAL INNOVATION INDEX"}</strong>
        <span>policy · ecosystem · industries · leaders · video library</span>
      </div>
    </div>
  );
}

function BriefingVisualButton({
  content,
  mode,
  onPlay,
}: {
  content: IntelligencePageContent;
  mode: "hero" | "briefing";
  onPlay: (video: ModalVideo) => void;
}) {
  return (
    <button
      className={cx("intelligence-hero-video", mode === "briefing" && "is-briefing-card")}
      onClick={() => onPlay(content.heroVideo)}
      type="button"
    >
      <DataMapSurface content={content} mode={mode} />
      <span className="play-chip" aria-hidden="true" />
      <span>
        <strong>{content.heroVideo.title}</strong>
        <small>{mode === "hero" ? "Ecosystem briefing" : "Video briefing"}</small>
      </span>
    </button>
  );
}

function IndexPanel({
  body,
  metrics,
  title,
}: {
  body: string;
  metrics: IntelligenceMetric[];
  title: string;
}) {
  return (
    <section className="index-panel">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="index-orbit" aria-hidden="true">
        {metrics.map((metric, index) => (
          <span
            className={cx(metric.tone && `is-${metric.tone}`)}
            key={metric.label}
            style={{ "--index": index } as CSSVars}
          />
        ))}
      </div>
      <div className="index-metrics">
        {metrics.map((metric) => (
          <article className={cx(metric.tone && `is-${metric.tone}`)} key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function RankingList({
  rankings,
  title,
}: {
  rankings: IntelligenceRanking[];
  title: string;
}) {
  return (
    <section className="ranking-panel">
      <h2>{title}</h2>
      {rankings.map((ranking) => (
        <article key={ranking.label}>
          <div>
            <strong>{ranking.label}</strong>
            <span>{ranking.value}</span>
          </div>
          <meter max="100" min="0" value={ranking.score} />
        </article>
      ))}
    </section>
  );
}

function PlaylistBoard({
  content,
  onPlay,
}: {
  content: IntelligencePageContent;
  onPlay: (video: VideoItem) => void;
}) {
  return (
    <section className="playlist-board">
      <div className="playlist-table">
        {content.playlistRows.map((row, index) => (
          <button key={row.label} onClick={() => onPlay(content.playlist[index % content.playlist.length])} type="button">
            <strong>{row.label}</strong>
            <span>{row.meta}</span>
            <small>{row.score}</small>
          </button>
        ))}
      </div>
      <div className="playlist-stack">
        {content.playlist.slice(0, 4).map((video) => (
          <VideoCard key={video.title} onPlay={onPlay} video={video} />
        ))}
      </div>
    </section>
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
  const [, setActiveVideo] = useState<VideoItem>(content.heroVideo);
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

          <BriefingVisualButton content={content} mode="hero" onPlay={setModalVideo} />
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
              <DataMapSurface content={content} mode="map" />
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
              <BriefingVisualButton content={content} mode="briefing" onPlay={setModalVideo} />
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

            {content.resourceSections && (
              <section className="resource-section-grid">
                {content.resourceSections.map((section) => (
                  <article key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            )}

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
              <PlaylistBoard
                content={content}
                onPlay={(item) => {
                  setActiveVideo(item);
                  setModalVideo(item);
                }}
              />
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
            <IndexPanel
              body={content.indexPanel.body}
              metrics={content.indexPanel.metrics}
              title={content.indexPanel.title}
            />

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

            {content.secondaryRankings && (
              <RankingList
                rankings={content.secondaryRankings.rankings}
                title={content.secondaryRankings.title}
              />
            )}

            <RankingList rankings={content.rankings} title={content.rankingsTitle} />

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
