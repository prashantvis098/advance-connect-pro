import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Loader } from "./components/Loader";
import { CursorGlow } from "./components/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { TrustBar } from "./components/TrustBar";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const scrollToForm = useCallback(() => {
    document.getElementById("hero-lead-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="app-root">
      <CursorGlow />
      <Toaster position="top-center" richColors />
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar onBookAudit={scrollToForm} />
      <main>
        <Hero started={!loading} />
        <Marquee />
        <TrustBar />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
