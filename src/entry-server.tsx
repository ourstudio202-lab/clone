/* Build-time prerender entry — renders each route to static HTML so
   search engines and AI crawlers (which often don't run JS) see real content. */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import { PROJECTS } from "./data/projects";
import { SERVICE_PAGES, SITE } from "./data/seo";

export { PROJECTS, SERVICE_PAGES, SITE };

export const ROUTES = [
  "/",
  "/about",
  "/services",
  ...SERVICE_PAGES.map((s) => `/services/${s.slug}`),
  "/work",
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
  "/contact",
];

export function render(url: string) {
  const ctx: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={ctx}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
  const h = ctx.helmet!;
  const head = [h.title, h.meta, h.link, h.script].map((x) => x.toString()).join("\n    ");
  return { html, head };
}
