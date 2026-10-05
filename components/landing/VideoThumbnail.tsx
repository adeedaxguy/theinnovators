export function VideoThumbnail({ src, alt = "", loading }: { src: string; alt?: string; loading?: "lazy" | "eager" }) {
  // YouTube's 4:3 high-quality preview includes letterboxing around 16:9 footage.
  const letterboxed = /^https:\/\/i\.ytimg\.com\/vi\/[^/]+\/hqdefault\.jpg$/.test(src);
  return <span className={"video-thumbnail" + (letterboxed ? " is-letterboxed" : "")}><img alt={alt} loading={loading} src={src} /></span>;
}
