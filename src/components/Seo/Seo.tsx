import { Helmet } from "react-helmet-async";
import { SITE, abs } from "@/data/seo";

interface SeoProps {
  title: string;
  description: string;
  path: string;            // canonical path, e.g. "/about"
  image?: string;
  type?: "website" | "article";
  schema?: object[];
}

export default function Seo({ title, description, path, image = SITE.ogImage, type = "website", schema = [] }: SeoProps) {
  const url = abs(path);
  const img = abs(image);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
