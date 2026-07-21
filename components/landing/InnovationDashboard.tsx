"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  aiRows,
  initialIdeas,
  innovationColumns,
  journeyNavItems,
  leaderGroups,
  news,
  shorts,
  softVisuals,
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
import { CtaCard, ImagePlayCard, NewsCarousel, VideoCard } from "./media-cards";
import { ScrollRail } from "./ScrollRail";
import type { ModalVideo, VideoItem } from "./types";
import { cx } from "./utils";

export default function InnovationDashboard() {
  const [activeModule, setActiveModule] = useState("News");
  const [activeCategory, setActiveCategory] = useState("Healthcare");
  const [activeAudience, setActiveAudience] = useState("Startups");
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);
  const [newsIndex, setNewsIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null);
  const [followed, setFollowed] = useState<string[]>([]);
  const [ideas, setIdeas] = useState(initialIdeas);
  const [ideaDraft, setIdeaDraft] = useState("");
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotAnswer, setCopilotAnswer] = useState(
    "Select a category, audience, or video and ask the co-pilot what to do next."
  );

  const newsSlides = useMemo(
    () => [activeVideo, ...videos.filter((video) => video.title !== activeVideo.title)],
    [activeVideo]
  );

  function postIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = ideaDraft.trim();
    if (!trimmed) return;
    setIdeas([trimmed, ...ideas]);
    setIdeaDraft("");
  }

  function askCopilot(event: FormEvent<HTMLFormElement>) {
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

      <div className="portal-grid">
        <section className="spotlight-panel">
          <div className="panel-heading spotlight-heading">
            <h2>News</h2>
          </div>
          <NewsCarousel
            currentIndex={newsIndex}
            onIndexChange={setNewsIndex}
            onPlay={setModalVideo}
            slides={newsSlides}
          />
          <div className="news-block">
            <div className="news-thumbs">
              {videos.slice(1, 5).map((video) => (
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
          <div className="panel-heading ideas-heading">
            <div className="ideas-title">
              <h2>Everyone&apos;s</h2>
              <p>innovation ideas</p>
            </div>
            <button className="mini-action" onClick={() => setActiveModule("Post")} type="button">
              Post
            </button>
          </div>
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
            <VideoCard
              video={{ ...videos[3], title: "Top Voices" }}
              layout="editorial"
              onPlay={setModalVideo}
            />
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
          <CtaCard
            action="Explore"
            body="Open the full video wall for this audience."
            onClick={() => setActiveModule("Saved Videos")}
            title="More saved videos"
          />
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
          ) : row.wide ? (
            <VideoCard video={row.wide} size="ai-feature" onPlay={setModalVideo} />
          ) : (
            <VideoCard video={videos[0]} size="ai-feature" onPlay={setModalVideo} />
          );
          const filledCards = row.cards
            .map(([title, media]) => ({ media, title: String(title) }))
            .concat(videos.map((video) => ({ media: video, title: `${video.category} playbook` })))
            .slice(0, 7);

          return (
            <article className={cx("ai-row", rowIndex % 2 === 1 && "is-reverse")} key={row.label}>
              <header className="section-row-heading ai-row-heading">
                <h2>{row.label}</h2>
                <p>{row.note}</p>
              </header>
              <div className="ai-feature-wrap">
                {feature}
              </div>
              <div className="ai-card-grid">
                <ScrollRail className="ai-card-rail" label={`${row.label} videos`}>
                  {filledCards.map(({ title, media }, index) =>
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
                </ScrollRail>
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
          <CtaCard
            action="Watch"
            body="Browse the complete short-form innovation feed."
            onClick={() => setActiveModule("Shorts")}
            title="More shorts"
          />
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
            <CtaCard
              action="Schedule"
              body="Reserve a slot for next week's innovation show."
              onClick={() => setActiveModule("Broadcast My Innovation")}
              title="Broadcast your story"
            />
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
        <h2>My Innovation Journey</h2>
        <nav aria-label="Innovation collections">
          {journeyNavItems.map((item) => (
            <button key={item.label} onClick={() => setActiveModule(item.label)} type="button">
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
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

      <SiteFooter />
      <FloatingCopilot
        askCopilot={askCopilot}
        copilotPrompt={copilotPrompt}
        setActiveModule={setActiveModule}
        setCopilotPrompt={setCopilotPrompt}
      />
      <VideoModal modalVideo={modalVideo} onClose={() => setModalVideo(null)} />
    </main>
  );
}
