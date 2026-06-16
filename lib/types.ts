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
      kind: "paragraph";
      text: string;
    }
  | {
      kind: "poem";
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

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  type: string[];
  summary: string;
  cover?: string;
  published: boolean;
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

export type Secret = {
  title: string;
  intro: string[];
  entries: Note[];
};

export type About = {
  name: string;
  description: string;
  intro: string[];
  images?: ImageItem[];
  links?: LinkItem[];
};
