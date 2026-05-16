export interface ProjectMeta {
  slug: string;
  title: string;
  category: string;
  thumb: string;        // path used on Home grid
  workThumb: string;    // path used on Work grid
  bannerTop: string;
  bannerBottom: string;
  grid: [string, string, string, string];
  description: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "eliosa",
    title: "ELIOSA SKINCARE",
    category: "Branding & Packaging",
    thumb: "/images/eliosa/homepage.png",
    workThumb: "/images/eliosa/work-page.png",
    bannerTop: "/images/eliosa/banner-1.png",
    bannerBottom: "/images/eliosa/banner-2.png",
    grid: [
      "/images/eliosa/project-grid-1.png",
      "/images/eliosa/project-grid-2 .png",
      "/images/eliosa/project-grid-3.png",
      "/images/eliosa/project-grid-4.png",
    ],
    description:
      "Eliosa’s branding and packaging are built around the belief that happiness and self-care go hand in hand. The identity blends positivity, inclusivity, and a playful yet luxurious tone through vibrant visuals and expressive design. The logo features a joyful typeface with radiant sun rays symbolizing glow and optimism, while the palette of yellow, blue, lilac, and off-white reflects warmth, calm, and elegance.",
  },
  {
    slug: "corryco",
    title: "CORRYCO PACKAGING SOLUTIONS",
    category: "Brand Identity Design",
    thumb: "/images/Work page/corryco.webp",
    workThumb: "/images/Work page/corryco.webp",
    bannerTop: "/images/corryco/banner 1.png",
    bannerBottom: "/images/corryco/banner 2.png",
    grid: [
      "/images/corryco/project grid 1.png",
      "/images/corryco/project grid 2.png",
      "/images/corryco/project grid 3.png",
      "/images/corryco/project grid 4.png",
    ],
    description:
      "Corryco Packaging Solutions is built around reliability, precision, and modern industrial efficiency. The brand identity combines a fresh, contemporary visual language with a bold teal palette that reflects strength and trust. Along with branding and stationery, the brochure system was designed to showcase the company’s products, manufacturing expertise, key features, and strong delivery-focused approach — “Engineered for Strength, Designed for Delivery.”",
  },
  {
    slug: "yul",
    title: "YUL HANDICRAFTS",
    category: "Brand Identity Design",
    thumb: "/images/Work page/yul.webp",
    workThumb: "/images/Work page/yul.webp",
    bannerTop: "/images/yul/PROJECT_BANNER 1.png",
    bannerBottom: "/images/yul/PROJECT_BANNER 2.png",
    grid: [
      "/images/yul/project grid 1.png",
      "/images/yul/project grid 2.png",
      "/images/yul/project grid 3.png",
      "/images/yul/project grid 4.png",
    ],
    description:
      "YUL is a women-led cultural enterprise rooted in the Himalayan landscapes of Uttarakhand, celebrating indigenous craft, heritage, and sustainability. The brand identity combines raw brush-inspired elements, earthy tones, and symbolic forms inspired by native traditions to create a soulful, dignified visual language. Every design element reflects authenticity, feminine strength, and a deep connection to land, culture, and community.",
  },
  {
    slug: "skrunch",
    title: "SKRUNCH FOODS",
    category: "Branding & Packaging",
    thumb: "/images/Work page/skrunch.webp",
    workThumb: "/images/Work page/skrunch.webp",
    bannerTop: "/images/skrunch/BANNER 1.png",
    bannerBottom: "/images/skrunch/BANNER 2.png",
    grid: [
      "/images/skrunch/project grid 1.png",
      "/images/skrunch/project grid 2.png",
      "/images/skrunch/project grid 3.png",
      "/images/skrunch/project grid 4.png",
    ],
    description:
      "Skrunch features a vibrant and modern brand identity designed to make healthy snacking feel fun, approachable, and visually engaging. The packaging system uses bold typography, playful layouts, and ingredient-based color coding, allowing each product category to have its own distinct visual identity for easy recognition. Combined with clean compositions and contemporary aesthetics, the design reflects the brand’s focus on nutrition, family wellness, and flavorful everyday snacking.",
  },
  {
    slug: "modest",
    title: "MODEST",
    category: "Brand Identity Design",
    thumb: "/images/Work page/modest.webp",
    workThumb: "/images/Work page/modest.webp",
    bannerTop: "/images/modest/project banner 1.png",
    bannerBottom: "/images/modest/project banner 2.png",
    grid: [
      "/images/modest/project grid 1.png",
      "/images/modest/project banner 2.png",
      "/images/modest/project grid 3.png",
      "/images/modest/project grid 4.png",
    ],
    description:
      "Modest is a sustainable Indian denim and apparel brand designed for comfort, individuality, and conscious fashion. Rooted in natural fabrics, recycled materials, and timeless design, the identity blends modern aesthetics with everyday wearability. Inspired by weaving patterns and contemporary street culture, the branding reflects a youthful, eco-conscious spirit while maintaining a casual yet premium visual language.",
  },
  {
    slug: "vyom",
    title: "VYOM",
    category: "Event Branding",
    thumb: "/images//Work page/vyom.webp",
    workThumb: "/images//Work page/vyom.webp",
    bannerTop: "/images/vyom/PROJECT_BANNER 1.png",
    bannerBottom: "/images/vyom/PROJECT_BANNER 2.png",
    grid: [
      "/images/vyom/project grid 1.png",
      "/images/vyom/project grid 2.png",
      "/images/vyom/project grid 3.png",
      "/images/vyom/project grid 4.png",
    ],
    description:
      "VYOM’s brand identity was designed to capture curiosity, growth, and youthful ambition through a vibrant visual system. From the star-inspired logo symbolising guidance and discovery to the energetic colour palette and dynamic motifs, every element was crafted to reflect exploration, confidence, and future-ready learning in a modern, engaging way.",
  },
];

export const SERVICES = [
  { title: "BRAND IDENTITY", img: "/images/homepage/service 1.jpg", body: "We don’t just make logos—we build brands people remember, recognize, and can’t ignore." },
  { title: "PACKAGING", img: "/images/homepage/service 2.jpg", body: "Packaging that doesn’t blend in—it stands out, gets picked, and sells." },
  { title: "AD CREATIVES", img: "/images/homepage/service 3.jpg", body: "Thumb-stopping creatives built to cut through noise and make people actually care." },
  { title: "3D & MOTION", img: "/images/homepage/service 4.jpg", body: "Bold 3D and motion that hits hard, moves fast, and brings your brand to life." },
  { title: "SOCIAL CONTENT", img: "/images/homepage/service 5.jpg", body: "Social content that feels native, sharp, and makes scrollers stop and tap." },
  { title: "WEB DESIGN", img: "/images/homepage/service 6.jpg", body: "Websites that look sharp, load fast, and turn clicks into customers." },
];

export const HERO_POP_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
];

export const HERO_BANNER = "/images/homepage/LandingPageHeroImg.png";

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getOtherProjects(slug: string, n = 3) {
  return PROJECTS.filter((p) => p.slug !== slug).slice(0, n);
}
