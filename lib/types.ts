export type LinkItem = {
  label: string;
  href: string;
};

export type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type ContentModule =
  | {
      kind: "heading";
      text: string;
    }
  | {
      kind: "paragraph";
      text: string;
    }
  | {
      kind: "poem";
      text: string;
    }
  | {
      kind: "date";
      text: string;
    }
  | ImageModule
  | {
      kind: "gallery";
      images: ImageItem[];
    }
  | {
      kind: "yearGallery";
      year: string;
      note?: string;
      images: ImageItem[];
    }
  | {
      kind: "video";
      url: string;
      caption?: string;
    }
  | {
      kind: "quote";
      text: string;
    }
  | {
      kind: "note";
      title?: string;
      text: string;
    }
  | {
      kind: "links";
      items: LinkItem[];
    }
  | {
      kind: "divider";
    };

export type ImageModule = ImageItem & {
  kind: "image";
};

export type AlbumPhoto = ImageItem & {
  id: string;
  date?: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  seriesId?: string;
};

export type PhotoSeries = {
  id: string;
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  published: boolean;
  modules: ContentModule[];
};

export type PhotoAlbum = {
  canvasHeight: number;
  photos: AlbumPhoto[];
  series: PhotoSeries[];
};

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  type: string[];
  length?: "short" | "long";
  tags?: string[];
  summary: string;
  cover?: string;
  published: boolean;
  album?: PhotoAlbum;
  modules: ContentModule[];
};

export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  published: boolean;
  modules: ContentModule[];
};

export type PracticeEntry = {
  id: string;
  title: string;
  date: string;
  organization?: string;
  type?: string;
  summary?: string;
  href?: string;
  published: boolean;
};

export type Secret = {
  title: string;
  intro: string[];
  entries: Note[];
};

export type Home = {
  worksCount: number;
};

export type About = {
  name: string;
  description: string;
  intro: string[];
  images?: ImageItem[];
  links?: LinkItem[];
};
