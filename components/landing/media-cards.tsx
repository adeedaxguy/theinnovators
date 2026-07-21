import { videos } from "./data";
import { Icon } from "./Icon";
import type { CardSize, ModalVideo, VideoItem } from "./types";
import { cx, slug } from "./utils";

type VideoCardProps = {
  video: VideoItem;
  size?: CardSize;
  onPlay: (video: VideoItem) => void;
  layout?: "overlay" | "editorial";
};

export function VideoCard({ video, size = "small", onPlay, layout = "overlay" }: VideoCardProps) {
  return (
    <button
      className={cx("video-card", size, layout === "editorial" && "is-editorial")}
      data-testid={`video-${slug(video.title)}`}
      onClick={() => onPlay(video)}
      type="button"
    >
      <span className="media-frame">
        <img src={video.image} alt="" />
        <span className="play-chip" aria-hidden="true" />
      </span>
      <span className="video-copy">
        <span className="source-line">
          {video.source || video.category} · {video.age || "2w"}
        </span>
        <strong>{video.title}</strong>
        {layout === "editorial" && (
          <span className="reaction-line">
            <span>♡ {video.reactions || 106}</span>
            <span>♧</span>
          </span>
        )}
      </span>
    </button>
  );
}

type NewsCarouselProps = {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onPlay: (video: VideoItem) => void;
  slides: VideoItem[];
};

export function NewsCarousel({ currentIndex, onIndexChange, onPlay, slides }: NewsCarouselProps) {
  const current = slides[currentIndex % slides.length] || slides[0] || videos[0];

  function move(direction: number) {
    const nextIndex = (currentIndex + direction + slides.length) % slides.length;
    onIndexChange(nextIndex);
  }

  return (
    <section className="news-carousel" aria-label="Featured news videos">
      <img src={current.image} alt="" />
      <span className="news-carousel-shade" aria-hidden="true" />
      <span className="news-carousel-kicker">{current.source || current.category}</span>

      <button
        aria-label="Previous featured news"
        className="news-carousel-arrow is-left"
        onClick={() => move(-1)}
        type="button"
      >
        <Icon name="chevronLeft" />
      </button>
      <button
        aria-label="Next featured news"
        className="news-carousel-arrow is-right"
        onClick={() => move(1)}
        type="button"
      >
        <Icon name="chevronRight" />
      </button>

      <div className="news-carousel-tools">
        <button aria-label="Reset featured news" onClick={() => onIndexChange(0)} type="button">
          ×
        </button>
        <button aria-label="Open featured news" onClick={() => onPlay(current)} type="button">
          ···
        </button>
      </div>

      <button
        aria-label={`Play ${current.title}`}
        className="news-carousel-play"
        onClick={() => onPlay(current)}
        type="button"
      >
        <span aria-hidden="true" />
      </button>

      <div className="news-carousel-copy">
        <p>
          {current.source || current.category} · {current.age || "2w"}
        </p>
        <h3>{current.title}</h3>
        <div className="news-carousel-reactions" aria-label={`${current.reactions || 106} reactions`}>
          <span>♡ {current.reactions || 106}</span>
          <span>♧</span>
        </div>
      </div>

      <div className="news-carousel-dots" aria-label="Featured news slides">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show ${slide.title}`}
            className={cx(index === currentIndex % slides.length && "is-active")}
            key={`${slide.title}-${index}`}
            onClick={() => onIndexChange(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}

type ImagePlayCardProps = {
  title: string;
  image: string;
  size?: CardSize;
  onPlay: (video: ModalVideo) => void;
  showTitle?: boolean;
};

export function ImagePlayCard({
  title,
  image,
  size = "small",
  onPlay,
  showTitle = true,
}: ImagePlayCardProps) {
  return (
    <button
      className={cx("image-play-card", size)}
      data-testid={`image-card-${slug(title)}`}
      onClick={() => onPlay({ title, image, category: "Innovation" })}
      type="button"
    >
      <img src={image} alt="" />
      <span className="play-chip" aria-hidden="true" />
      {showTitle && <strong>{title}</strong>}
    </button>
  );
}

type CtaCardProps = {
  title: string;
  body: string;
  action: string;
  onClick: () => void;
};

export function CtaCard({ title, body, action, onClick }: CtaCardProps) {
  return (
    <button className="cta-card" onClick={onClick} type="button">
      <span>{action}</span>
      <strong>{title}</strong>
      <small>{body}</small>
    </button>
  );
}
