"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { ScrollRail } from "./ScrollRail";
import { usaIntelligencePage as content } from "./intelligence-data";
import type { ModalVideo, VideoItem } from "./types";
import { usaStateProfiles } from "./usa-state-data";

type MainVideoProps = {
  activeVideo: VideoItem;
  onOpen: (video: VideoItem) => void;
  onSelect: (video: VideoItem) => void;
};

const mainMenuVideos: VideoItem[] = content.tabs.map((label, index) => {
  const source = index === 0 ? content.heroVideo : content.playlist[(index - 1) % content.playlist.length];
  return {
    ...source,
    title: label === "Overview" ? content.heroVideo.title : `${label}: U.S. innovation briefing`,
    category: label,
  };
});

const stateVideos = usaStateProfiles.map((state, index) => ({
  ...content.playlist[index % content.playlist.length],
  title: `${state.label} innovation briefing`,
  category: `${state.region} states`,
  state,
}));

const featuredStateLabels = ["California", "Texas", "Massachusetts", "New York", "Washington", "North Carolina"];

function videosForRegion(region: "Featured" | "Northeast" | "Midwest" | "South" | "West") {
  return region === "Featured"
    ? featuredStateLabels.map((label) => stateVideos.find((video) => video.state.label === label)!).filter(Boolean)
    : stateVideos.filter((video) => video.state.region === region);
}

function GradientVideo({ activeVideo, onOpen }: Pick<MainVideoProps, "activeVideo" | "onOpen">) {
  return (
    <div className="usa-gradient-video">
      <button onClick={() => onOpen(activeVideo)} type="button">
        <img alt={`${activeVideo.title} video thumbnail`} src={activeVideo.image} />
        <span className="usa-video-play" aria-hidden="true"><Play fill="currentColor" /></span>
        <span className="usa-video-title">
          <strong>{activeVideo.title}</strong>
          <small>{activeVideo.category} · Video intelligence</small>
        </span>
      </button>
    </div>
  );
}

export function UsaMainVideo({ activeVideo, onOpen, onSelect }: MainVideoProps) {
  return (
    <section className="usa-main-video-experience" id="made-in-america">
      <GradientVideo activeVideo={activeVideo} onOpen={onOpen} />
      <ScrollRail className="usa-main-thumbnails" label="U.S. briefing thumbnails">
        {mainMenuVideos.map((video) => (
          <button
            aria-pressed={video.title === activeVideo.title}
            className={video.title === activeVideo.title ? "is-active" : undefined}
            key={video.title}
            onClick={() => onSelect(video)}
            type="button"
          >
            <img alt="" src={video.image} />
            <span><strong>{video.category}</strong><small>{video.title}</small></span>
            <Play aria-hidden="true" fill="currentColor" />
          </button>
        ))}
      </ScrollRail>
    </section>
  );
}

export function UsaVideoTile({ image, meta, onPlay, title }: Pick<ModalVideo, "image" | "title"> & { meta: string; onPlay: () => void }) {
  return (
    <button className="usa-video-tile" onClick={onPlay} type="button">
      <img alt={`${title} video thumbnail`} src={image} />
      <span className="usa-video-tile-play" aria-hidden="true"><Play fill="currentColor" /></span>
      <span className="usa-video-tile-title"><strong>{title}</strong><small>{meta}</small></span>
    </button>
  );
}

export function UsaVideoRail({ label, onOpen, videos }: { label: string; onOpen: (video: VideoItem) => void; videos: VideoItem[] }) {
  return (
    <section className="usa-video-row">
      <header><h2>{label}</h2><span>{videos.length} briefings</span></header>
      <ScrollRail className="usa-video-row-rail" label={label}>
        {videos.map((video) => (
          <UsaVideoTile
            image={video.image}
            key={`${label}-${video.title}`}
            meta={`${video.category} · Video briefing`}
            onPlay={() => onOpen(video)}
            title={video.title}
          />
        ))}
      </ScrollRail>
    </section>
  );
}

export function UsaStatePlaylists({
  onOpen,
  onSelectMain,
}: {
  onOpen: (video: VideoItem) => void;
  onSelectMain?: (video: VideoItem) => void;
}) {
  const regions = ["Featured", "Northeast", "Midwest", "South", "West"] as const;
  const [region, setRegion] = useState<(typeof regions)[number]>("Featured");
  const filtered = videosForRegion(region);
  const [selectedState, setSelectedState] = useState(featuredStateLabels[0]);
  const activeVideo = filtered.find((video) => video.state.label === selectedState) ?? filtered[0];

  function chooseRegion(nextRegion: (typeof regions)[number]) {
    const nextVideos = videosForRegion(nextRegion);
    const nextVideo = nextVideos[0];
    setRegion(nextRegion);
    setSelectedState(nextVideo.state.label);
    onSelectMain?.(nextVideo);
  }

  function chooseState(video: (typeof stateVideos)[number]) {
    setSelectedState(video.state.label);
    onSelectMain?.(video);
  }

  return (
    <section className="usa-states-section" id="usa-states">
      <header className="usa-states-heading">
        <div><h2>USA States Video Playlists</h2><p>Fifty state briefings organized into regional playlists.</p></div>
        <strong>50 states</strong>
      </header>
      <nav className="usa-playlist-tabs" aria-label="State playlist regions">
        {regions.map((item) => (
          <button aria-pressed={item === region} className={item === region ? "is-active" : undefined} key={item} onClick={() => chooseRegion(item)} type="button">
            {item}
          </button>
        ))}
      </nav>
      <div className="usa-youtube-playlist">
        <div className="usa-playlist-list" aria-label={`${region} state video playlist`}>
          {filtered.map((video) => (
            <button
              aria-pressed={video.state.label === activeVideo.state.label}
              className={video.state.label === activeVideo.state.label ? "is-active" : undefined}
              key={video.state.label}
              onClick={() => chooseState(video)}
              type="button"
            >
              <img alt="" src={video.image} />
              <span><strong>{video.state.label}</strong><small>{video.state.industries.join(" · ")}</small><em>{video.state.region}</em></span>
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          ))}
        </div>
        <button className="usa-playlist-stage" onClick={() => onOpen(activeVideo)} type="button">
          <img alt={`${activeVideo.state.label} innovation video thumbnail`} src={activeVideo.image} />
          <span className="usa-video-play" aria-hidden="true"><Play fill="currentColor" /></span>
          <span className="usa-video-title"><strong>{activeVideo.title}</strong><small>{activeVideo.state.summary}</small></span>
        </button>
      </div>
    </section>
  );
}

export const usaLeaderVideos: VideoItem[] = content.leaders.map((leader) => ({
  title: leader.name,
  category: leader.role,
  image: leader.image,
}));

export const usaIndustryVideos: VideoItem[] = [
  ...content.industries.map((card) => ({ title: card.title, category: "U.S. industry", image: card.image ?? content.heroVideo.image })),
  ...content.playlist.slice(1, 5),
];

export const usaInnovatorVideos: VideoItem[] = [
  ...content.communities.map((card) => ({ title: card.title, category: "Innovation community", image: card.image ?? content.heroVideo.image })),
  ...content.playlist.slice(5, 10),
];
