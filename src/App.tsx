import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Work from "./pages/Work/Work";
import Contact from "./pages/Contact/Contact";
import Project from "./pages/Projects/Project";
import { useLenis } from "./hooks/useLenis";

import { useLayoutEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Force immediate scroll to top before paint
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // loading = loader is still in DOM
  // ready   = loader panel has fully cleared (2.05 s) — trigger entrance animations
  const [loading, setLoading] = useState(true);
  const [ready,   setReady]   = useState(false);
  useLenis();

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent snapping
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // loader curtain starts at 1.3 s, fully gone at 2.05 s
    const tReady   = setTimeout(() => setReady(true),   2050);
    const tUnmount = setTimeout(() => setLoading(false), 2200);
    return () => { clearTimeout(tReady); clearTimeout(tUnmount); };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <ScrollToTop />
      <Navbar ready={ready} />
      <main>
        <Routes>
          <Route path="/"              element={<Home ready={ready} />} />
          <Route path="/about"         element={<About />} />
          <Route path="/work"          element={<Work />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="*"              element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
