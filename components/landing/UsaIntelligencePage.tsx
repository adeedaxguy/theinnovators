"use client";

import { BarChart3, Bot, Database, Map, Play, Search, Send, SlidersHorizontal, Star } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
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
import { IntelligenceAnalytics } from "./IntelligenceAnalytics";
import { usaIntelligencePage as content } from "./intelligence-data";
import type { IntelligenceCard, IntelligenceRanking } from "./intelligence-data";
import { ScrollRail } from "./ScrollRail";
import type { ModalVideo, VideoItem } from "./types";
import { UsaMapOverlay } from "./UsaMapExperience";

function MiniCard({ card }: { card: IntelligenceCard }) {
  return (
    <article className="usa-mini-card">
      {card.image && <img alt="" src={card.image} />}
      <div>
        {card.meta && <span>{card.meta}</span>}
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </article>
  );
}

function InstitutionList({ body, items, title }: { body: string; items: string[]; title: string }) {
  return (
    <section className="usa-institution-group">
      <h2>{title}</h2>
      <p>{body}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function FlagVideo({ onPlay }: { onPlay: (video: ModalVideo) => void }) {
  return (
    <div className="usa-flag-video">
      <div className="usa-flag-band">
        <span className="usa-flag-stars" aria-hidden="true">
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
        </span>
        <strong>Made in America</strong>
        <span>National briefing</span>
      </div>
      <button onClick={() => onPlay(content.heroVideo)} type="button">
        <img alt="" src={content.heroVideo.image} />
        <span className="usa-video-play" aria-hidden="true">
          <Play fill="currentColor" />
        </span>
        <span className="usa-video-title">
          <strong>{content.heroVideo.title}</strong>
          <small>National ecosystem briefing</small>
        </span>
      </button>
      <div className="usa-flag-stripes" aria-hidden="true" />
    </div>
  );
}

function UsaVideoTile({ image, meta, onPlay, title }: ModalVideo & { meta: string; onPlay: () => void }) {
  return (
    <button className="usa-video-tile" onClick={onPlay} type="button">
      <img alt="" src={image} />
      <span className="usa-video-tile-play" aria-hidden="true">
        <Play fill="currentColor" />
      </span>
      <span className="usa-video-tile-title">
        <strong>{title}</strong>
        <small>{meta}</small>
      </span>
    </button>
  );
}

function UsaPlaylist({
  activeVideo,
  onOpen,
  onSelect,
}: {
  activeVideo: VideoItem;
  onOpen: (video: VideoItem) => void;
  onSelect: (video: VideoItem) => void;
}) {
  return (
    <div className="usa-youtube-playlist">
      <button className="usa-playlist-stage" onClick={() => onOpen(activeVideo)} type="button">
        <img alt="" src={activeVideo.image} />
        <span className="usa-video-play" aria-hidden="true">
          <Play fill="currentColor" />
        </span>
        <span className="usa-video-title">
          <strong>{activeVideo.title}</strong>
          <small>{activeVideo.category}</small>
        </span>
      </button>

      <div className="usa-playlist-list" aria-label="USA state video playlist">
        {content.playlistRows.map((row, index) => {
          const video = content.playlist[index % content.playlist.length];
          const selected = video.title === activeVideo.title;
          return (
            <button
              aria-pressed={selected}
              className={selected ? "is-active" : undefined}
              key={row.label}
              onClick={() => onSelect(video)}
              type="button"
            >
              <img alt="" src={video.image} />
              <span>
                <strong>{row.label}</strong>
                <small>{row.meta}</small>
                <em>{row.score}</em>
              </span>
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RankingTool({ rankings, title }: { rankings: IntelligenceRanking[]; title: string }) {
  return (
    <section className="usa-ranking-tool">
      <div className="usa-tool-heading">
        <BarChart3 aria-hidden="true" />
        <h2>{title}</h2>
      </div>
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

function AgentTool({
  answer,
  onAsk,
  prompt,
  setPrompt,
}: {
  answer: string;
  onAsk: (event: FormEvent<HTMLFormElement>) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}) {
  const [scope, setScope] = useState("State");
  const [topic, setTopic] = useState("Innovation ecosystem");
  const [evidence, setEvidence] = useState("Verified data + video");

  return (
    <section className="usa-agent-tool">
      <div className="usa-tool-heading">
        <Bot aria-hidden="true" />
        <div>
          <h2>AI Discover Agent</h2>
          <span>U.S. intelligence workspace</span>
        </div>
      </div>

      <div className="usa-agent-parameters">
        <label>
          Scope
          <select onChange={(event) => setScope(event.target.value)} value={scope}>
            <option>State</option>
            <option>National</option>
            <option>State comparison</option>
          </select>
        </label>
        <label>
          Topic
          <select onChange={(event) => setTopic(event.target.value)} value={topic}>
            <option>Innovation ecosystem</option>
            <option>Policy and programs</option>
            <option>Institutions and labs</option>
            <option>Industries and capital</option>
          </select>
        </label>
        <label>
          Evidence
          <select onChange={(event) => setEvidence(event.target.value)} value={evidence}>
            <option>Verified data + video</option>
            <option>Rankings and indexes</option>
            <option>Programs and grants</option>
          </select>
        </label>
      </div>

      <form onSubmit={onAsk}>
        <Search aria-hidden="true" />
        <input
          aria-label="Ask the AI Discover Agent"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about a state, industry, or program"
          value={prompt}
        />
        <button aria-label="Generate intelligence brief" type="submit">
          <Send aria-hidden="true" />
        </button>
      </form>

      <p className="usa-agent-answer">
        <strong>{scope} · {topic} · {evidence}</strong>
        {answer}
      </p>

      <div className="usa-agent-prompts">
        {content.agentPrompts.map((item) => (
          <button key={item} onClick={() => setPrompt(item)} type="button">
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

function IndexTool() {
  return (
    <section className="usa-index-tool">
      <div className="usa-tool-heading">
        <SlidersHorizontal aria-hidden="true" />
        <h2>{content.indexPanel.title}</h2>
      </div>
      <p>{content.indexPanel.body}</p>
      <div>
        {content.indexPanel.metrics.map((metric) => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function UsaIntelligencePage() {
  const [activeModule, setActiveModule] = useState(content.activeModule);
  const [activeCategory, setActiveCategory] = useState(content.activeCategory);
  const [activeAudience, setActiveAudience] = useState(content.activeAudience);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(content.heroVideo);
  const [, setNewsIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotAnswer, setCopilotAnswer] = useState(
    "Choose a scope and ask for a state, institution, industry, policy, grant, or procurement brief."
  );

  function askCopilot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = copilotPrompt.trim();
    setCopilotAnswer(
      query
        ? `Prepared research path for “${query}”: compare verified ecosystem data, institutions, public programs, rankings, and related video briefings.`
        : "Enter a question to build a sourced U.S. innovation brief."
    );
  }

  function playVideo(video: VideoItem) {
    setActiveVideo(video);
    setModalVideo(video);
  }

  return (
    <main className={`portal-shell intelligence-shell usa-shell ${sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed"}`} id="top">
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

      <div className="usa-page-main">
        <div className="usa-intelligence-layout">
          <aside className="usa-institutions-rail" aria-label="U.S. institutions">
            <header>
              <Database aria-hidden="true" />
              <h1>Institutions</h1>
              <p>Organizations, public infrastructure, research networks, and programs.</p>
            </header>
            {content.resourceSections?.slice(0, 3).map((section) => (
              <InstitutionList key={section.title} {...section} />
            ))}
            <section className="usa-institution-group">
              <h2>Industry organizations</h2>
              <div className="usa-mini-stack">
                {content.organizations.map((card) => (
                  <MiniCard card={card} key={card.title} />
                ))}
              </div>
            </section>
            <section className="usa-institution-group">
              <h2>Summits and programs</h2>
              <div className="usa-mini-stack">
                {content.summits.map((card) => (
                  <MiniCard card={card} key={card.title} />
                ))}
              </div>
            </section>
            {content.actionCards && (
              <section className="usa-institution-group usa-support-links">
                <h2>Support and funding</h2>
                <div>
                  {content.actionCards.map((card) => (
                    <button key={card.title} type="button">
                      <strong>{card.title}</strong>
                      <span>{card.body}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <section className="usa-content-core">
            <section className="usa-made-in-america" id="made-in-america">
              <FlagVideo onPlay={setModalVideo} />
              <nav className="usa-page-nav" aria-label="USA intelligence sections">
                <a href="#usa-leaders">Leaders</a>
                <a href="#usa-industries">Industries</a>
                <a href="#usa-united">Communities</a>
                <a href="#usa-states">States</a>
                <a href="#usa-data">Data</a>
                <a href="/usa/map">
                  <Map aria-hidden="true" />
                  Interactive map
                </a>
              </nav>
              <ScrollRail className="usa-spotlight-rail" label="Made in America priorities">
                {content.spotlight.map((card) => (
                  <MiniCard card={card} key={card.title} />
                ))}
              </ScrollRail>
            </section>

            <section className="usa-leaders-section" id="usa-leaders">
              <div className="usa-section-heading">
                <h2>America’s Leaders</h2>
              </div>
              <div className="usa-video-grid usa-leader-grid">
                {content.leaders.map((leader) => {
                  const modalVideo = { category: leader.role, image: leader.image, title: leader.name };
                  return (
                    <UsaVideoTile
                      {...modalVideo}
                      key={leader.name}
                      meta={`${leader.role} · Video briefing`}
                      onPlay={() => setModalVideo(modalVideo)}
                    />
                  );
                })}
              </div>
            </section>

            <section className="usa-industries-section" id="usa-industries">
              <div className="usa-section-heading">
                <h2>U.S. Innovation Industries</h2>
              </div>
              <div className="usa-video-grid usa-industry-grid">
                {content.industries.map((card, index) => {
                  const modalVideo = {
                    category: "U.S. Innovation Industries",
                    image: card.image ?? content.playlist[index].image,
                    title: card.title,
                  };
                  return (
                    <UsaVideoTile
                      {...modalVideo}
                      key={card.title}
                      meta={card.body}
                      onPlay={() => setModalVideo(modalVideo)}
                    />
                  );
                })}
              </div>
            </section>

            <section className="usa-united-section" id="usa-united">
              <div className="usa-section-heading">
                <h2>America’s Innovators, United</h2>
              </div>
              <div className="usa-community-grid">
                {content.communities.map((card) => (
                  <MiniCard card={card} key={card.title} />
                ))}
              </div>
            </section>

            <section className="usa-states-section" id="usa-states">
              <div className="usa-section-heading">
                <h2>USA States Playlist</h2>
              </div>
              <UsaPlaylist
                activeVideo={activeVideo}
                onOpen={playVideo}
                onSelect={setActiveVideo}
              />
            </section>

            <div id="usa-data">
              <IntelligenceAnalytics scope="usa" selectedPoint={content.map.points[0]} />
            </div>
          </section>

          <aside className="usa-tools-rail" aria-label="USA intelligence tools">
            <AgentTool
              answer={copilotAnswer}
              onAsk={askCopilot}
              prompt={copilotPrompt}
              setPrompt={setCopilotPrompt}
            />
            <IndexTool />
            {content.secondaryRankings && (
              <RankingTool rankings={content.secondaryRankings.rankings} title="U.S. Global Position" />
            )}
            <RankingTool rankings={content.rankings} title="States Ranking" />
            <section className="usa-data-tool">
              <div className="usa-tool-heading">
                <Database aria-hidden="true" />
                <h2>Data tools</h2>
              </div>
              <button type="button">Compare state profiles</button>
              <button type="button">Search grants and programs</button>
              <button type="button">Open institution directory</button>
              <a href="/usa/map">
                <Map aria-hidden="true" />
                Browse the full U.S. map
              </a>
            </section>
          </aside>
        </div>
      </div>

      <UsaMapOverlay />
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
