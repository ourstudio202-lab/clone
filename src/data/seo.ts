/* ── Site-wide SEO / local business facts ───────────────────────
   Keep NAP (name, address, phone) identical to the Google Business
   Profile — local ranking depends on it matching exactly.          */

export const SITE = {
  url: "https://thedesignelves.com",
  name: "The Design Elves",
  legalName: "The Design Elves",
  tagline: "Branding & Design Studio in Pune",
  email: "thedesignelves@gmail.com",
  phone: "+91 9098111911",
  city: "Pune",
  region: "Maharashtra",
  country: "IN",
  logo: "/logo-icon.png",
  ogImage: "/images/homepage/LandingPageHeroImg.png",
  sameAs: [
    "https://www.instagram.com/the_design_elves",
    "https://www.linkedin.com/company/the-design-elves/",
    "https://www.behance.net/waddleco",
  ],
  /* Pune areas the studio serves — used in areaServed + copy */
  areas: [
    "Pune", "Pimpri-Chinchwad", "Baner", "Hinjewadi", "Kothrud",
    "Viman Nagar", "Koregaon Park", "Wakad", "Aundh", "Kharadi",
  ],
};

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${encodeURI(path)}`;

export interface Faq { q: string; a: string }

export interface ServicePage {
  slug: string;
  name: string;            // schema Service name
  navLabel: string;        // short label for lists
  title: string;           // <title>
  description: string;     // meta description
  h1: string;
  intro: string;
  deliverables: string[];
  forWho: string;
  img: string;
  faqs: Faq[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "branding-agency-pune",
    name: "Brand Identity Design",
    navLabel: "Branding",
    title: "Branding Agency in Pune | Logo & Brand Identity Design | The Design Elves",
    description:
      "The Design Elves is a branding agency in Pune creating logos, brand identity systems, brand guidelines and stationery for startups and growing businesses.",
    h1: "Branding agency in Pune",
    intro:
      "We build brand identities for Pune startups, D2C labels and established businesses — from strategy and naming direction to the logo, colour, typography and a guideline your team can actually use.",
    deliverables: [
      "Brand strategy & positioning",
      "Logo design & logo system",
      "Colour palette & typography",
      "Brand guidelines",
      "Stationery & brochures",
      "Brand refresh / rebranding",
    ],
    forWho:
      "Startups launching their first brand, family businesses ready for a modern identity, and companies whose brand no longer matches where they are headed.",
    img: "/images/homepage/service 1.jpg",
    faqs: [
      {
        q: "What does a brand identity project include?",
        a: "A brand identity project at The Design Elves covers brand discovery, logo design, colour palette, typography, supporting graphic elements and a brand guideline document. Stationery, brochures and packaging can be added to the same project.",
      },
      {
        q: "Do you only work with businesses in Pune?",
        a: "No. The studio is based in Pune and works with clients across Pune, Pimpri-Chinchwad and the rest of India, as well as international brands. Pune clients can meet the team in person.",
      },
      {
        q: "Can you redesign an existing logo instead of starting from scratch?",
        a: "Yes. We run brand refreshes that keep the recognition you have already built while modernising the logo, colours and type, and we also run full rebrands when the business has changed direction.",
      },
    ],
  },
  {
    slug: "website-design-pune",
    name: "Website Design",
    navLabel: "Website Design",
    title: "Website Design Company in Pune | Custom Websites | The Design Elves",
    description:
      "Custom website design in Pune — fast, responsive, SEO-ready websites for brands, startups and studios, designed and built by The Design Elves.",
    h1: "Website design company in Pune",
    intro:
      "We design and build custom websites that look sharp, load fast and turn visitors into enquiries — no templates, designed around your brand and your customers.",
    deliverables: [
      "Custom website design",
      "Responsive / mobile-first build",
      "Landing pages",
      "E-commerce & Shopify design",
      "On-page SEO setup",
      "Website redesign",
    ],
    forWho:
      "Brands that need a site that matches the quality of their product, and businesses whose current website is slow, dated or not bringing in leads.",
    img: "/images/homepage/service 6.jpg",
    faqs: [
      {
        q: "Do you design and develop the website, or only design it?",
        a: "Both. The Design Elves handles the website design and the front-end build, so the finished site matches the design exactly and is ready to launch.",
      },
      {
        q: "Will my website be mobile-friendly and SEO-ready?",
        a: "Yes. Every website is built mobile-first and launched with page titles, meta descriptions, structured data, a sitemap and fast-loading images in place.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes. We audit the current site, keep what works, and redesign the structure and visuals so it better reflects your brand and converts more visitors.",
      },
    ],
  },
  {
    slug: "packaging-design-pune",
    name: "Packaging Design",
    navLabel: "Packaging Design",
    title: "Packaging Design Agency in Pune | Label & Box Design | The Design Elves",
    description:
      "Packaging design in Pune for D2C, FMCG, skincare and food brands — labels, boxes and pouches designed to stand out on shelf and online by The Design Elves.",
    h1: "Packaging design agency in Pune",
    intro:
      "Packaging that gets picked up. We design labels, boxes, pouches and full product ranges for D2C, skincare, food and FMCG brands — print-ready and built to stand out on the shelf and in a scrolling feed.",
    deliverables: [
      "Packaging design & structure direction",
      "Label design",
      "Product range / SKU systems",
      "Print-ready artwork",
      "3D packaging mockups",
      "Packaging refresh",
    ],
    forWho:
      "New product launches, D2C brands moving into retail, and brands whose packaging is getting lost next to competitors.",
    img: "/images/homepage/service 2.jpg",
    faqs: [
      {
        q: "Which industries do you design packaging for?",
        a: "The Design Elves has designed packaging for skincare, food, handicrafts and consumer brands, including the Eliosa skincare range. The same process works for FMCG, beverage and D2C products.",
      },
      {
        q: "Do you provide print-ready files?",
        a: "Yes. Final packaging artwork is delivered print-ready to your printer's dielines, with colour and finish notes.",
      },
      {
        q: "Can packaging and branding be done together?",
        a: "Yes, and it is usually the best approach — designing the brand identity and packaging together keeps the logo, colours and typography consistent across every product.",
      },
    ],
  },
  {
    slug: "ui-ux-design-pune",
    name: "UI/UX Design",
    navLabel: "UI/UX Design",
    title: "UI/UX Design Agency in Pune | App & Web Interface Design | The Design Elves",
    description:
      "UI/UX design studio in Pune designing websites, web apps and mobile app interfaces that are clear, usable and on-brand. Talk to The Design Elves.",
    h1: "UI/UX design agency in Pune",
    intro:
      "We design interfaces for real people, not designers — clear flows, readable screens and a visual layer that carries your brand into your product.",
    deliverables: [
      "User flows & wireframes",
      "Web app UI design",
      "Mobile app UI design",
      "Interactive prototypes",
      "Design systems",
      "UX audits",
    ],
    forWho:
      "Startups designing their first product, and teams whose app works but feels confusing or off-brand.",
    img: "/images/homepage/service 4.jpg",
    faqs: [
      {
        q: "What is the difference between UI and UX design?",
        a: "UX design decides how a product works — the flows, structure and steps a user takes. UI design decides how it looks — layout, type, colour and components. The Design Elves handles both together.",
      },
      {
        q: "Do you deliver files developers can build from?",
        a: "Yes. We deliver organised design files with components, styles and an interactive prototype so your developers can build accurately.",
      },
    ],
  },
  {
    slug: "social-media-design-pune",
    name: "Social Media & Ad Creative Design",
    navLabel: "Social & Ad Creatives",
    title: "Social Media & Ad Creative Design in Pune | The Design Elves",
    description:
      "Scroll-stopping social media posts, reels covers and performance ad creatives for brands in Pune and across India, designed by The Design Elves.",
    h1: "Social media & ad creative design in Pune",
    intro:
      "Creatives that stop the scroll and stay on-brand — social posts, carousels and paid ad creatives built for Instagram, LinkedIn and Meta ads.",
    deliverables: [
      "Social media post & carousel design",
      "Instagram templates",
      "Performance ad creatives",
      "Campaign key visuals",
      "Launch creatives",
    ],
    forWho:
      "Brands that post often and need a consistent look, and marketing teams that need fresh ad creatives to test.",
    img: "/images/homepage/service 5.jpg",
    faqs: [
      {
        q: "Do you create content on a monthly basis?",
        a: "Yes. Social content can be designed on an ongoing monthly basis or as a one-off campaign or template set your team reuses.",
      },
      {
        q: "Will the social creatives match my brand identity?",
        a: "Yes. Every creative follows your brand guidelines; if you don't have guidelines yet, we set up a social template system first.",
      },
    ],
  },
  {
    slug: "3d-motion-design-pune",
    name: "3D & Motion Design",
    navLabel: "3D & Motion",
    title: "3D & Motion Design Studio in Pune | Product Animation | The Design Elves",
    description:
      "3D product renders, logo animation and motion graphics in Pune for launches, ads and websites — by The Design Elves design studio.",
    h1: "3D & motion design studio in Pune",
    intro:
      "Bold 3D and motion that brings a brand to life — product renders, logo animations and motion graphics for launches, ads and websites.",
    deliverables: [
      "3D product renders",
      "Logo animation",
      "Motion graphics",
      "Product launch videos",
      "Animated social content",
    ],
    forWho:
      "Product brands that need visuals before the product is photographed, and brands launching campaigns that need motion.",
    img: "/images/homepage/service 4.jpg",
    faqs: [
      {
        q: "Can you create 3D renders before the product is manufactured?",
        a: "Yes. 3D product renders can be created from packaging artwork and product dimensions, so you can launch and advertise before physical samples are ready.",
      },
    ],
  },
];

export const getServicePage = (slug: string) =>
  SERVICE_PAGES.find((s) => s.slug === slug);

/* ── JSON-LD builders ── */

export const businessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: "Design Elves",
  description:
    "The Design Elves is an independent branding and design studio in Pune, India, offering brand identity, logo design, packaging design, website design, UI/UX, social media creatives and 3D & motion design.",
  url: SITE.url,
  logo: abs(SITE.logo),
  image: abs(SITE.ogImage),
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: [
    ...SITE.areas.map((name) => ({ "@type": "City", name })),
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Branding", "Brand identity design", "Logo design", "Packaging design",
    "Website design", "UI/UX design", "Social media design", "3D design", "Motion design",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Design services",
    itemListElement: SERVICE_PAGES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${SITE.url}/services/${s.slug}` },
    })),
  },
  sameAs: SITE.sameAs,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#business` },
  inLanguage: "en-IN",
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = (s: ServicePage) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  serviceType: s.name,
  description: s.description,
  url: `${SITE.url}/services/${s.slug}`,
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "Country", name: "India" }],
});
