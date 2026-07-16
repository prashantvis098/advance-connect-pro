import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Loader } from "./components/Loader";
import { CursorGlow } from "./components/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { AboutTimeline } from "./components/AboutTimeline";
import { TrustBar } from "./components/TrustBar";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { MarketplaceExpertise } from "./components/MarketplaceExpertise";
import { ServicesGrid } from "./components/ServicesGrid";
import { CommandCenter } from "./components/CommandCenter";
import { Workflow } from "./components/Workflow";
import { CaseStudies } from "./components/CaseStudies";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import "./sections.css";

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
        <TrustedBy />
        <AboutTimeline />
        <WhyChooseUs />
        <MarketplaceExpertise />
        <ServicesGrid />
        <CommandCenter />
        <Workflow />
        <TrustBar />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
