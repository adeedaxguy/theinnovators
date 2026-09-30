"use client";

import { ExternalLink, Play } from "lucide-react";
import { useRef, useState } from "react";
import type { RefObject } from "react";
import type { VideoItem } from "./types";

export function useExperiencePlayer(initialVideo: VideoItem) {
  const [selection, setSelection] = useState({ video: initialVideo, playing: false, revision: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  function selectVideo(video: VideoItem) {
    setSelection((previous) => ({ video, playing: true, revision: previous.revision + 1 }));
    const bounds = playerRef.current?.getBoundingClientRect();
    if (bounds && (bounds.top < 100 || bounds.bottom > window.innerHeight)) {
      playerRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }

  return { selection, playerRef, selectVideo };
}

export function ExperiencePlayer({
  selection,
  playerRef,
  onPlay,
}: {
  selection: { video: VideoItem; playing: boolean; revision: number };
  playerRef: RefObject<HTMLDivElement | null>;
  onPlay: (video: VideoItem) => void;
}) {
  const { video, playing, revision } = selection;
  const playable = Boolean(video.youtubeId || video.videoUrl);

  return (
    <div className="hub-player" ref={playerRef} data-testid="central-player">
      <div className="hub-player-screen">
        {playing && video.youtubeId ? (
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            key={revision}
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={`${video.title} video`}
          />
        ) : playing && video.videoUrl ? (
          <video autoPlay controls key={revision} playsInline poster={video.image} src={video.videoUrl} />
        ) : (
          <button
            aria-label={playable ? `Play ${video.title}` : `${video.title}: video source pending`}
            className="hub-player-poster"
            disabled={!playable}
            onClick={() => onPlay(video)}
            type="button"
          >
            <img alt="" src={video.image} />
            {playable ? <span className="hub-player-play"><Play fill="currentColor" /> Play video</span> : <span className="hub-media-pending">Video source pending</span>}
          </button>
        )}
      </div>
      <div className="hub-player-caption" aria-live="polite">
        <div><h2>{video.title}</h2><p>{video.category}</p></div>
        {video.sourceUrl && <a aria-label={`Original source for ${video.title}`} href={video.sourceUrl} rel="noreferrer" target="_blank" title="Original source"><ExternalLink /></a>}
      </div>
    </div>
  );
}
