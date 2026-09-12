"use client";

import { BarChart3, Bot, Database, Search, Send } from "lucide-react";
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
import { usaIntelligencePage as content } from "./intelligence-data";
import type { IntelligenceRanking } from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";
import { UsaMapOverlay } from "./UsaMapExperience";
import {
  UsaMainVideo,
  UsaStatePlaylists,
  UsaVideoRail,
  usaIndustryVideos,
  usaInnovatorVideos,
  usaLeaderVideos,
} from "./UsaVideoExperience";

function makeInstitutionVideo(sectionTitle: string, item: string, sectionIndex: number, itemIndex: number): VideoItem {
  const source = content.playlist[(sectionIndex * 5 + itemIndex) % content.playlist.length];

  return {
    ...source,
    title: `${item} video briefing`,
    category: sectionTitle,
  };
}

function InstitutionList({
  body,
  items,
  onSelectVideo,
  sectionIndex,
  title,
}: {
  body: string;
  items: string[];
  onSelectVideo: (video: VideoItem) => void;
  sectionIndex: number;
  title: string;
}) {
  return (
    <section className="usa-institution-group">
      <h2>{title}</h2>
      <p>{body}</p>
      <ul>
        {items.map((item, itemIndex) => (
          <li key={item}>
            <button onClick={() => onSelectVideo(makeInstitutionVideo(title, item, sectionIndex, itemIndex))} type="button">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </section>
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
            <span>Brief available</span>
          </div>
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

  function openVideo(video: VideoItem) {
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
              <h1>Ecosystem</h1>
            </header>
            {[content.resourceSections?.[0], content.resourceSections?.[2]].filter(Boolean).map((section, sectionIndex) => (
              <InstitutionList key={section!.title} onSelectVideo={setActiveVideo} sectionIndex={sectionIndex} {...section!} />
            ))}
          </aside>

          <section className="usa-content-core">
            <UsaMainVideo activeVideo={activeVideo} onOpen={openVideo} onSelect={setActiveVideo} />
            <UsaVideoRail label="America’s Industries" onOpen={openVideo} videos={usaIndustryVideos} />
            <UsaStatePlaylists onOpen={openVideo} onSelectMain={setActiveVideo} />
            <UsaVideoRail label="America’s Leaders" onOpen={openVideo} videos={usaLeaderVideos} />
            <UsaVideoRail label="U.S. Innovators United" onOpen={openVideo} videos={usaInnovatorVideos} />
          </section>

          <aside className="usa-tools-rail" aria-label="USA intelligence tools">
            {content.secondaryRankings && (
              <RankingTool rankings={content.secondaryRankings.rankings} title="USA Country Ranking" />
            )}
            <RankingTool rankings={content.rankings} title="USA States Ranking" />
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
            <AgentTool
              answer={copilotAnswer}
              onAsk={askCopilot}
              prompt={copilotPrompt}
              setPrompt={setCopilotPrompt}
            />
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
