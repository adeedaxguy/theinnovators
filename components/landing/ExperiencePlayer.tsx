"use client";

import { ExternalLink, Play } from "lucide-react";
import { useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import type { VideoItem } from "./types";
import { previewMedia } from "./experience-demo";
import { TVFrame } from "./TVFrame";
import type { TVFrameSettings } from "./tv-frame-settings";

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
  content,
  controls,
  frame,
  showCaption = true,
}: {
  selection: { video: VideoItem; playing: boolean; revision: number };
  playerRef: RefObject<HTMLDivElement | null>;
  onPlay: (video: VideoItem) => void;
  content?: ReactNode;
  controls?: ReactNode;
  frame?: TVFrameSettings;
  showCaption?: boolean;
}) {
  const { video, playing, revision } = selection;
  const media = previewMedia(video);

  const screen = <div className="hub-player-screen">
        {content ?? (playing && media.youtubeId ? (
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            key={revision}
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube.com/embed/${media.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={`${video.title}${media.sampleAttribution ? " sample" : ""} video`}
          />
        ) : playing && video.videoUrl ? (
          <video autoPlay controls key={revision} playsInline poster={video.image} src={video.videoUrl} />
        ) : (
          <button
            aria-label={`Play ${media.sampleAttribution ? "sample for " : ""}${video.title}`}
            className={"hub-player-poster" + (media.sampleAttribution ? " hub-player-sample" : "")}
            onClick={() => onPlay(video)}
            type="button"
          >
            <img alt="" src={video.image} />
            <span className="hub-player-play"><Play fill="currentColor" />{media.sampleAttribution ? "Play sample" : "Play video"}</span>
          </button>
        ))}
      </div>;
  return (
    <div className="hub-player" ref={playerRef} data-testid="central-player">
      {frame ? <TVFrame settings={frame} controls={controls} overlays={!content}>{screen}</TVFrame> : <>{screen}{controls}</>}
      {showCaption && !content && <div className="hub-player-caption" aria-live="polite">
        <div><h2>{video.title}</h2><p>{video.category}</p>{media.sampleAttribution && <p className="hub-sample-notice"><span>Sample media</span>{media.sampleAttribution}</p>}</div>
        {media.sourceUrl && <a aria-label={`${media.sampleAttribution ? "Sample" : "Original"} source for ${video.title}`} href={media.sourceUrl} rel="noreferrer" target="_blank" title={media.sampleAttribution ? "Sample source: Apptronik" : "Original source"}><ExternalLink /></a>}
      </div>}
    </div>
  );
}
