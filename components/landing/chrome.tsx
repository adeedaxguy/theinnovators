"use client";

import { useRef } from "react";
import type { CSSProperties, Dispatch, FormEvent, SetStateAction } from "react";
import {
  asset,
  audienceIcons,
  audiences,
  categories,
  featureCtas,
  featureLinks,
  featureTiles,
  featureVisuals,
  journeyActions,
  tickerItems,
  topModules,
  videos,
} from "./data";
import { Icon } from "./Icon";
import type { ModalVideo, VideoItem } from "./types";
import { cx, slug } from "./utils";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

type ActiveSetter = Dispatch<SetStateAction<string>>;

export function PortalHeader({
  activeModule,
  setActiveModule,
}: {
  activeModule: string;
  setActiveModule: ActiveSetter;
}) {
  return (
    <header className="portal-header">
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
            {icon === "play" ? (
              <span className="module-play-icon" aria-hidden="true" />
            ) : (
              <img src={icon} alt="" />
            )}
            <span className="module-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="journey-actions">
        {journeyActions.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}

export function MarketStrip() {
  return (
    <div className="market-strip">
      <div className="ticker-lane" aria-label={tickerItems.join(" | ")}>
        <div className="ticker-copy" aria-hidden="true">
          {[0, 1, 2, 3].map((group) => (
            <span className="ticker-group" key={group}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={`${group}-${item}`}>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AudienceSidebar({
  activeAudience,
  setActiveAudience,
  setSidebarOpen,
  sidebarOpen,
}: {
  activeAudience: string;
  setActiveAudience: ActiveSetter;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
}) {
  return (
    <aside className="audience-sidebar" aria-label="Audience filters">
      <div className="audience-sidebar-title">
        <span>Audience</span>
        <button
          aria-label={sidebarOpen ? "Collapse audience sidebar" : "Open audience sidebar"}
          onClick={() => setSidebarOpen((current) => !current)}
          type="button"
        >
          <Icon name={sidebarOpen ? "chevronLeft" : "chevronRight"} />
        </button>
      </div>
      {audiences.map((audience) => (
        <button
          className={cx(activeAudience === audience && "is-active")}
          data-testid={`audience-${slug(audience)}`}
          key={audience}
          onClick={() => setActiveAudience(audience)}
          title={audience}
          type="button"
        >
          <Icon name={audienceIcons[audience]} />
          <span className="audience-label">{audience}</span>
        </button>
      ))}
    </aside>
  );
}

export function FeatureBoard({
  activeModule,
  setActiveModule,
}: {
  activeModule: string;
  setActiveModule: ActiveSetter;
}) {
  return (
    <section className="feature-board" aria-label="Innovation feature board">
      {featureTiles.map((tile, index) => {
        const href = featureLinks[tile];

        return (
        <button
          className={cx("feature-tile", activeModule === tile && "is-active")}
          data-cta={featureCtas[index] ?? "Explore"}
          data-testid={`feature-${slug(tile)}`}
          key={tile}
          onClick={() => {
            if (href) {
              window.location.assign(href);
              return;
            }
            setActiveModule(tile);
          }}
          style={{
            "--glow-x": `${18 + (index % 5) * 16}%`,
            "--glow-y": `${26 + (index % 3) * 18}%`,
            "--tile-image": `url("${featureVisuals[index]}")`,
            "--tile-a": `${42 + index * 21}deg`,
            "--tile-b": `${177 + index * 15}deg`,
          } as CSSVars}
          type="button"
        >
          <span className="feature-title">{tile}</span>
        </button>
        );
      })}
    </section>
  );
}

export function CompactFeatureNav({
  activeModule,
  setActiveModule,
}: {
  activeModule: string;
  setActiveModule: ActiveSetter;
}) {
  return (
    <nav className="compact-feature-nav" aria-label="Compact innovation feature menu">
      {featureTiles.map((tile) => {
        const href = featureLinks[tile];

        return (
        <button
          className={cx(activeModule === tile && "is-active")}
          data-testid={`compact-feature-${slug(tile)}`}
          key={tile}
          onClick={() => {
            if (href) {
              window.location.assign(href);
              return;
            }
            setActiveModule(tile);
          }}
          type="button"
        >
          {tile}
        </button>
        );
      })}
    </nav>
  );
}

export function CategoryBar({
  activeCategory,
  setActiveCategory,
  setActiveVideo,
  setNewsIndex,
  setActiveModule,
}: {
  activeCategory: string;
  setActiveCategory: ActiveSetter;
  setActiveModule: ActiveSetter;
  setActiveVideo: (video: VideoItem) => void;
  setNewsIndex: (index: number) => void;
}) {
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  function scrollCategories(direction: number) {
    if (!categoryScrollRef.current) return;
    const scrollArea = categoryScrollRef.current;
    const firstButton = scrollArea.firstElementChild;
    const styles = window.getComputedStyle(scrollArea);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const amount = firstButton ? firstButton.getBoundingClientRect().width + gap : 180;
    scrollArea.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <nav className="category-bar" aria-label="Sector filters">
      <div className="category-scroll-shell">
        <button
          aria-label="Previous categories"
          className="category-arrow category-arrow-left"
          onClick={() => scrollCategories(-1)}
          type="button"
        >
          <Icon name="chevronLeft" />
        </button>
        <div className="category-scroll" ref={categoryScrollRef}>
          {categories.map((category) => (
            <button
              className={cx(activeCategory === category && "is-active")}
              data-testid={`category-${slug(category)}`}
              key={category}
              onClick={() => {
                setActiveCategory(category);
                const nextVideo = videos.find((video) => video.category === category);
                if (nextVideo) {
                  setActiveVideo(nextVideo);
                  setNewsIndex(0);
                }
              }}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <button
          aria-label="Next categories"
          className="category-arrow category-arrow-right"
          onClick={() => scrollCategories(1)}
          type="button"
        >
          <Icon name="chevronRight" />
        </button>
        <form
          className="category-search"
          onSubmit={(event) => {
            event.preventDefault();
            setActiveModule("Search");
          }}
        >
          <input aria-label="Search innovation stories" placeholder="Search" />
        </form>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <strong>The INNOVATORS</strong>
      <span>2026 all rights reserved</span>
    </footer>
  );
}

export function FloatingCopilot({
  askCopilot,
  copilotPrompt,
  setActiveModule,
  setCopilotPrompt,
}: {
  askCopilot: (event: FormEvent<HTMLFormElement>) => void;
  copilotPrompt: string;
  setActiveModule: ActiveSetter;
  setCopilotPrompt: ActiveSetter;
}) {
  return (
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
  );
}

export function VideoModal({
  modalVideo,
  onClose,
}: {
  modalVideo: ModalVideo | null;
  onClose: () => void;
}) {
  if (!modalVideo) return null;

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={modalVideo.title}>
      <div>
        <button className="modal-close" onClick={onClose} type="button">
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
  );
}
