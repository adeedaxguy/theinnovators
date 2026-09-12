"use client";

import { BarChart3, Bot, Globe2, Play, Search, Send, X } from "lucide-react";
import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
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
import { GeographicMap } from "./GeographicMap";
import type {
  IntelligenceCard,
  IntelligenceLeader,
  IntelligencePageContent,
  IntelligencePoint,
  IntelligenceRanking,
} from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";

type IntelligencePageProps = {
  content: IntelligencePageContent;
};

function cardVideo(card: IntelligenceCard, category: string, fallback: VideoItem): VideoItem {
  return { title: card.title, category, image: card.image ?? fallback.image };
}

function leaderVideo(leader: IntelligenceLeader): VideoItem {
  return { title: leader.name, category: leader.role, image: leader.image };
}

function WorldMediaCard({
  card,
  category,
  fallback,
  onSelect,
}: {
  card: IntelligenceCard;
  category: string;
  fallback: VideoItem;
  onSelect: (video: VideoItem) => void;
}) {
  return (
    <button className="world-media-card" onClick={() => onSelect(cardVideo(card, category, fallback))} type="button">
      {card.image && <img alt="" src={card.image} />}
      <span>
        {card.meta && <small>{card.meta}</small>}
        <strong>{card.title}</strong>
        <em>{card.body}</em>
      </span>
      <Play aria-hidden="true" fill="currentColor" />
    </button>
  );
}

function WorldVideoFrame({ activeVideo, onOpen }: { activeVideo: VideoItem; onOpen: (video: VideoItem) => void }) {
  return (
    <section className="world-video-hub" aria-label="Global innovation video hub">
      <button className="world-gradient-video" onClick={() => onOpen(activeVideo)} type="button">
        <img alt={`${activeVideo.title} video thumbnail`} src={activeVideo.image} />
        <span className="world-video-shade" aria-hidden="true" />
        <span className="world-video-play" aria-hidden="true"><Play fill="currentColor" /></span>
        <span className="world-video-copy">
          <strong>{activeVideo.title}</strong>
          <small>{activeVideo.category} · Global video intelligence</small>
        </span>
      </button>
    </section>
  );
}

function RankingPanel({ rankings }: { rankings: IntelligenceRanking[] }) {
  return (
    <section className="world-panel world-ranking-panel">
      <div className="world-panel-heading">
        <BarChart3 aria-hidden="true" />
        <h2>Countries Ranking</h2>
      </div>
      {rankings.map((ranking) => (
        <article key={ranking.label}>
          <div><strong>{ranking.label}</strong><span>{ranking.value}</span></div>
          <meter max="100" min="0" value={ranking.score} />
        </article>
      ))}
    </section>
  );
}

function WorldAgent({
  answer,
  onAsk,
  prompt,
  setPrompt,
}: {
  answer: string;
  onAsk: (event: FormEvent<HTMLFormElement>) => void;
  prompt: string;
  setPrompt: (value: string) => void;
}) {
  return (
    <section className="world-panel world-agent-panel">
      <div className="world-panel-heading">
        <Bot aria-hidden="true" />
        <h2>AI Agent</h2>
      </div>
      <form onSubmit={onAsk}>
        <Search aria-hidden="true" />
        <input
          aria-label="Ask the global innovation agent"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about a country or ecosystem"
          value={prompt}
        />
        <button aria-label="Generate country brief" type="submit"><Send aria-hidden="true" /></button>
      </form>
      <p>{answer}</p>
    </section>
  );
}

function WorldIndex({ content }: { content: IntelligencePageContent }) {
  return (
    <section className="world-panel world-index-panel">
      <h2>{content.indexPanel.title}</h2>
      <div className="world-index-orbit" aria-hidden="true">
        {content.indexPanel.metrics.map((metric, index) => (
          <span key={metric.label} style={{ "--world-index": index } as CSSProperties} />
        ))}
        <Globe2 />
      </div>
      <p>{content.indexPanel.body}</p>
    </section>
  );
}

function WorldCountryPlaylist({
  activeVideo,
  content,
  onOpen,
  onSelect,
}: {
  activeVideo: VideoItem;
  content: IntelligencePageContent;
  onOpen: (video: VideoItem) => void;
  onSelect: (video: VideoItem) => void;
}) {
  return (
    <section className="world-countries-playlist">
      <h2>Countries Playlist</h2>
      <div>
        <nav aria-label="Country video playlist">
          {content.playlistRows.map((row, index) => {
            const video = content.playlist[index % content.playlist.length];
            return (
              <button
                aria-pressed={video.title === activeVideo.title}
                className={video.title === activeVideo.title ? "is-active" : undefined}
                key={row.label}
                onClick={() => onSelect(video)}
                type="button"
              >
                <strong>{row.label}</strong>
                <span>{row.meta}</span>
              </button>
            );
          })}
        </nav>
        <div className="world-playlist-videos">
          {content.playlist.slice(0, 4).map((video) => (
            <button key={video.title} onClick={() => onSelect(video)} type="button">
              <img alt="" src={video.image} />
              <span><strong>{video.title}</strong><small>{video.category}</small></span>
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          ))}
          <button className="world-playlist-open" onClick={() => onOpen(activeVideo)} type="button">
            <Play aria-hidden="true" fill="currentColor" />
            Play selected briefing
          </button>
        </div>
      </div>
    </section>
  );
}

function WorldMapOverlay({
  content,
  onClose,
  selectedPoint,
  setSelectedPoint,
}: {
  content: IntelligencePageContent;
  onClose: () => void;
  selectedPoint: IntelligencePoint;
  setSelectedPoint: (point: IntelligencePoint) => void;
}) {
  return (
    <section aria-label={content.map.title} aria-modal="true" className="world-map-overlay" role="dialog">
      <div className="world-map-dialog">
        <header>
          <div><Globe2 aria-hidden="true" /><span><h1>{content.map.title}</h1><p>{content.map.body}</p></span></div>
          <button aria-label="Close interactive world map" onClick={onClose} type="button"><X aria-hidden="true" /></button>
        </header>
        <div className="world-map-layout">
          <div className="world-map-stage">
            <GeographicMap mode="world" onSelectPoint={setSelectedPoint} points={content.map.points} selectedPoint={selectedPoint} />
            {content.map.points.map((point) => (
              <button
                aria-label={`Preview ${point.label}`}
                className={point.id === selectedPoint.id ? "is-active" : undefined}
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                onFocus={() => setSelectedPoint(point)}
                onMouseEnter={() => setSelectedPoint(point)}
                style={{ left: `${point.x ?? 50}%`, top: `${point.y ?? 50}%` }}
                type="button"
              ><span /></button>
            ))}
          </div>
          <aside aria-live="polite">
            <span>Country profile</span>
            <h2>{selectedPoint.label}</h2>
            <p>{selectedPoint.summary}</p>
            <ul>{selectedPoint.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function IntelligencePage({ content }: IntelligencePageProps) {
  const [activeModule, setActiveModule] = useState(content.activeModule);
  const [activeCategory, setActiveCategory] = useState(content.activeCategory);
  const [activeAudience, setActiveAudience] = useState(content.activeAudience);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(content.heroVideo);
  const [, setNewsIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<IntelligencePoint>(content.map.points[0]);
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotAnswer, setCopilotAnswer] = useState("Ask for a country, ranking, policy, industry, or video brief.");

  function askCopilot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = copilotPrompt.trim();
    setCopilotAnswer(
      prompt
        ? `Prepared a global research path for “${prompt}” using country profiles, rankings, policy signals, and video briefings.`
        : "Enter a country or topic to prepare a global innovation brief."
    );
  }

  return (
    <main className={`portal-shell intelligence-shell world-shell ${sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed"}`}>
      <PortalHeader activeModule={activeModule} setActiveModule={setActiveModule} />
      <MarketStrip />
      <AudienceSidebar activeAudience={activeAudience} setActiveAudience={setActiveAudience} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <FeatureBoard activeModule={activeModule} setActiveModule={setActiveModule} />
      <CompactFeatureNav activeModule={activeModule} setActiveModule={setActiveModule} />
      <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} setActiveModule={setActiveModule} setActiveVideo={setActiveVideo} setNewsIndex={setNewsIndex} />

      <div className="world-page-main">
        {!mapOpen && (
          <button className="world-map-reopen" onClick={() => setMapOpen(true)} type="button">
            <Globe2 aria-hidden="true" /> Open interactive world map
          </button>
        )}

        <div className="world-layout">
          <aside className="world-left-rail">
            <section className="world-panel world-news-panel">
              <h2>Innovation News</h2>
              <button onClick={() => setActiveVideo(content.playlist[0])} type="button">
                <img alt="" src={content.heroVideo.image} />
                <strong>{content.news[0]}</strong>
              </button>
              <ul>
                {content.news.slice(1).map((item, index) => (
                  <li key={item}><button onClick={() => setActiveVideo(content.playlist[(index + 1) % content.playlist.length])} type="button">{item}</button></li>
                ))}
              </ul>
            </section>

            <section className="world-panel">
              <h2>Industry Organizations</h2>
              <div className="world-organization-grid">
                {content.organizations.map((card) => (
                  <WorldMediaCard card={card} category="Industry organization" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
                ))}
              </div>
            </section>

            <section className="world-panel">
              <h2>Innovation Leaders</h2>
              <div className="world-leaders-grid">
                {content.leaders.map((leader) => (
                  <button key={leader.name} onClick={() => setActiveVideo(leaderVideo(leader))} type="button">
                    <img alt="" src={leader.image} />
                    <span><strong>{leader.name}</strong><small>{leader.role}</small></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="world-panel">
              <h2>Innovation Summits</h2>
              <div className="world-summits-grid">
                {content.summits.map((card) => (
                  <WorldMediaCard card={card} category="Global summit" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
                ))}
              </div>
            </section>
          </aside>

          <section className="world-core">
            <section className="world-spotlight-panel">
              <h2>{content.spotlightTitle}</h2>
              <div>
                {content.spotlight.map((card) => (
                  <WorldMediaCard card={card} category="Innovation economy" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
                ))}
              </div>
            </section>
            <WorldVideoFrame activeVideo={activeVideo} onOpen={setModalVideo} />
            <WorldCountryPlaylist activeVideo={activeVideo} content={content} onOpen={setModalVideo} onSelect={setActiveVideo} />
          </section>

          <aside className="world-right-rail">
            <WorldAgent answer={copilotAnswer} onAsk={askCopilot} prompt={copilotPrompt} setPrompt={setCopilotPrompt} />
            <WorldIndex content={content} />
            <RankingPanel rankings={content.rankings} />
            <section className="world-panel">
              <h2>Innovation Communities</h2>
              <div className="world-community-stack">
                {content.communities.map((card) => (
                  <WorldMediaCard card={card} category="Innovation community" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="world-bottom-feed" aria-label="Global innovation video news">
          {content.playlist.slice(0, 7).map((video) => (
            <button key={video.title} onClick={() => setActiveVideo(video)} type="button">
              <img alt="" src={video.image} />
              <strong>{video.title}</strong>
            </button>
          ))}
        </section>
      </div>

      {mapOpen && <WorldMapOverlay content={content} onClose={() => setMapOpen(false)} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />}
      <FloatingCopilot askCopilot={askCopilot} copilotPrompt={copilotPrompt} setActiveModule={setActiveModule} setCopilotPrompt={setCopilotPrompt} />
      <VideoModal modalVideo={modalVideo} onClose={() => setModalVideo(null)} />
      <SiteFooter />
    </main>
  );
}
