export type VideoItem = {
  title: string;
  category: string;
  audience?: string;
  image: string;
  source?: string;
  age?: string;
  reactions?: number;
};

export type ModalVideo = Pick<VideoItem, "title" | "category" | "image">;

export type CardSize =
  | "small"
  | "ai-feature"
  | "short"
  | "show-feature"
  | "deal-feature"
  | "innovation-feature";
