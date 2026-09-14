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
import { ScrollRail } from "./ScrollRail";
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
          <div><strong>{ranking.label}</strong><span>{ranking.value}</span><b>{ranking.score}</b></div>
          <div className="world-ranking-scale" aria-label={`${ranking.label}: ${ranking.score} out of 100`} role="img">
            <span style={{ width: `${ranking.score}%` }} />
          </div>
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
  content,
  onOpen,
  onSelect,
}: {
  content: IntelligencePageContent;
  onOpen: (video: VideoItem) => void;
  onSelect: (video: VideoItem) => void;
}) {
  const regions = ["Featured", "North America", "Europe", "Asia", "Africa", "Latin America"] as const;
  const countryRegions: Record<string, (typeof regions)[number]> = {
    "United States": "North America",
    China: "Asia",
    India: "Asia",
    Germany: "Europe",
    Brazil: "Latin America",
    Nigeria: "Africa",
    "United Kingdom": "Europe",
    France: "Europe",
    Japan: "Asia",
    Singapore: "Asia",
    Kenya: "Africa",
    Mexico: "North America",
  };
  const countries = content.playlistRows.map((row, index) => ({
    row,
    video: content.playlist[index % content.playlist.length],
  }));
  const [region, setRegion] = useState<(typeof regions)[number]>("Featured");
  const [selectedCountry, setSelectedCountry] = useState(countries[0].row.label);
  const filtered = region === "Featured" ? countries : countries.filter(({ row }) => countryRegions[row.label] === region);
  const selected = filtered.find(({ row }) => row.label === selectedCountry) ?? filtered[0];

  function chooseRegion(nextRegion: (typeof regions)[number]) {
    const nextCountries = nextRegion === "Featured" ? countries : countries.filter(({ row }) => countryRegions[row.label] === nextRegion);
    setRegion(nextRegion);
    setSelectedCountry(nextCountries[0].row.label);
    onSelect(nextCountries[0].video);
  }

  function chooseCountry(country: (typeof countries)[number]) {
    setSelectedCountry(country.row.label);
    onSelect(country.video);
  }

  return (
    <section className="world-countries-playlist">
      <header><div><h2>Countries Playlist</h2><p>Country intelligence organized by region.</p></div><strong>{filtered.length} countries</strong></header>
      <nav className="world-region-tabs" aria-label="Country playlist regions">
        {regions.map((item) => (
          <button aria-pressed={item === region} className={item === region ? "is-active" : undefined} key={item} onClick={() => chooseRegion(item)} type="button">{item}</button>
        ))}
      </nav>
      <div className="world-country-stage-layout">
        <nav aria-label="Country video playlist">
          {filtered.map((country) => (
            <button
              aria-pressed={country.row.label === selected.row.label}
              className={country.row.label === selected.row.label ? "is-active" : undefined}
              key={country.row.label}
              onClick={() => chooseCountry(country)}
              type="button"
            >
              <strong>{country.row.label}</strong>
              <span>{country.row.meta}</span>
              <em>{country.row.score}</em>
            </button>
          ))}
        </nav>
        <button className="world-country-stage" onClick={() => onOpen(selected.video)} type="button">
          <img alt={`${selected.row.label} innovation video thumbnail`} src={selected.video.image} />
          <span className="world-video-shade" aria-hidden="true" />
          <span className="world-video-play" aria-hidden="true"><Play fill="currentColor" /></span>
          <span className="world-video-copy"><strong>{selected.row.label}</strong><small>{selected.row.meta} · {selected.row.score} ecosystem signals</small></span>
        </button>
      </div>
      <ScrollRail className="world-country-thumbnails" label={`${region} country briefings`}>
        {filtered.map((country) => (
          <button aria-pressed={country.row.label === selected.row.label} className={country.row.label === selected.row.label ? "is-active" : undefined} key={country.row.label} onClick={() => chooseCountry(country)} type="button">
            <img alt="" src={country.video.image} /><span><strong>{country.row.label}</strong><small>{country.row.meta}</small></span><Play aria-hidden="true" fill="currentColor" />
          </button>
        ))}
      </ScrollRail>
    </section>
  );
}

function WorldNewsRail({ content, onSelect }: { content: IntelligencePageContent; onSelect: (video: VideoItem) => void }) {
  return (
    <section className="world-panel world-news-panel">
      <h2>Innovation News</h2>
      <ScrollRail className="world-news-rail" label="innovation news">
        {content.news.map((item, index) => {
          const video = content.playlist[index % content.playlist.length];
          return <button key={item} onClick={() => onSelect(video)} type="button"><img alt="" src={video.image} /><strong>{item}</strong><Play aria-hidden="true" fill="currentColor" /></button>;
        })}
      </ScrollRail>
    </section>
  );
}

function WorldVideoRail({ label, onOpen, videos }: { label: string; onOpen: (video: VideoItem) => void; videos: VideoItem[] }) {
  return (
    <section className="world-full-video-row">
      <header><h2>{label}</h2><span>{videos.length} video briefings</span></header>
      <ScrollRail className="world-full-video-rail" label={label}>
        {videos.map((video, index) => (
          <button key={`${label}-${video.title}-${index}`} onClick={() => onOpen(video)} type="button">
            <img alt={`${video.title} video thumbnail`} src={video.image} /><span><strong>{video.title}</strong><small>{video.category}</small></span><Play aria-hidden="true" fill="currentColor" />
          </button>
        ))}
      </ScrollRail>
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
        <div className="world-layout">
          <div className="world-layout-toolbar">
            <button className="world-map-reopen" onClick={() => setMapOpen(true)} type="button">
              <Globe2 aria-hidden="true" /> Interactive world map
            </button>
          </div>
          <aside className="world-left-rail">
            <WorldNewsRail content={content} onSelect={setActiveVideo} />

            <section className="world-panel">
              <h2>Industry Organizations</h2>
              <ScrollRail className="world-organization-grid" label="industry organizations">
                {content.organizations.map((card) => (
                  <WorldMediaCard card={card} category="Industry organization" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
                ))}
              </ScrollRail>
            </section>

            <section className="world-panel">
              <h2>Innovation Leaders</h2>
              <ScrollRail className="world-leaders-grid" label="innovation leaders">
                {content.leaders.map((leader) => (
                  <button key={leader.name} onClick={() => setActiveVideo(leaderVideo(leader))} type="button">
                    <img alt="" src={leader.image} />
                    <span><strong>{leader.name}</strong><small>{leader.role}</small></span>
                  </button>
                ))}
              </ScrollRail>
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

          <WorldCountryPlaylist content={content} onOpen={setModalVideo} onSelect={setActiveVideo} />
        </div>

        <section className="world-summits-section">
          <header><h2>Innovation Summits</h2><p>Global forums, demo days, and industry gatherings.</p></header>
          <ScrollRail className="world-summits-grid" label="innovation summits">
            {content.summits.map((card) => (
              <WorldMediaCard card={card} category="Global summit" fallback={content.heroVideo} key={card.title} onSelect={setActiveVideo} />
            ))}
          </ScrollRail>
        </section>

        <WorldVideoRail label="Global Innovation Stories" onOpen={setModalVideo} videos={content.playlist} />
        <WorldVideoRail label="Policy, Industry and Ecosystem Briefings" onOpen={setModalVideo} videos={[...content.playlist.slice(4), ...content.playlist.slice(0, 4)]} />
      </div>

      {mapOpen && <WorldMapOverlay content={content} onClose={() => setMapOpen(false)} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />}
      <FloatingCopilot askCopilot={askCopilot} copilotPrompt={copilotPrompt} setActiveModule={setActiveModule} setCopilotPrompt={setCopilotPrompt} />
      <VideoModal modalVideo={modalVideo} onClose={() => setModalVideo(null)} />
      <SiteFooter />
    </main>
  );
}
