// Runs after `vite build` + the SSR build. Writes one static HTML file per
// route (with its rendered page and <head> tags), plus sitemap.xml and llms.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, ROUTES, SITE, SERVICE_PAGES, PROJECTS } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8")
  // per-route tags replace the template defaults
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta name="description"[^>]*>/, "");

for (const route of ROUTES) {
  const { html, head } = render(route);
  const page = template
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  // /about -> dist/about.html, served at /about by Vercel's cleanUrls
  const out = path.join(dist, route === "/" ? "index.html" : `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log("prerendered", route);
}

// ── sitemap.xml ──
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === "/" ? "1.0" : r.startsWith("/services") ? "0.9" : r.startsWith("/projects") ? "0.6" : "0.8");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE.url}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`).join("\n")}
</urlset>
`
);

// ── llms.txt (plain-language summary for AI assistants) ──
fs.writeFileSync(
  path.join(dist, "llms.txt"),
  `# ${SITE.name}

> ${SITE.name} is an independent branding and design studio based in ${SITE.city}, ${SITE.region}, India. It designs brand identities, logos, packaging, websites, UI/UX, social media creatives and 3D & motion for startups and growing businesses in Pune and across India.

- Location: ${SITE.city}, ${SITE.region}, India (serves ${SITE.areas.join(", ")} and clients India-wide)
- Email: ${SITE.email}
- Phone: ${SITE.phone}

## Services
${SERVICE_PAGES.map((s) => `- [${s.h1}](${SITE.url}/services/${s.slug}): ${s.description}`).join("\n")}

## Selected work
${PROJECTS.map((p) => `- [${p.title}](${SITE.url}/projects/${p.slug}): ${p.category}`).join("\n")}

## Pages
- [About](${SITE.url}/about)
- [Services](${SITE.url}/services)
- [Work](${SITE.url}/work)
- [Contact](${SITE.url}/contact)
`
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("sitemap.xml + llms.txt written");
