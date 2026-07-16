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
import { ContactSplit } from "./components/ContactSplit";
import { MapSection } from "./components/MapSection";
import { PremiumFooter } from "./components/PremiumFooter";
import { AIConsultant } from "./components/AIConsultant";
import { FloatingActions } from "./components/FloatingActions";
import { CTABand } from "./components/CTABand";
import "./sections.css";
import "./part3.css";

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
        <CTABand
          testid="cta-band-services"
          onBookAudit={scrollToForm}
          title="Not sure which service you need?"
          subtitle="Start with a free marketplace audit — we'll tell you exactly what will move your sales."
        />
        <CommandCenter />
        <Workflow />
        <TrustBar />
        <CTABand
          testid="cta-band-metrics"
          onBookAudit={scrollToForm}
          title="Ready to become our next success metric?"
          subtitle="9+ years of marketplace expertise, one free audit away."
        />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <CTABand
          testid="cta-band-faq"
          onBookAudit={scrollToForm}
          title="Still have questions?"
          subtitle="Get answers specific to your business — free consultation, fast response."
        />
        <ContactSplit />
        <MapSection />
      </main>
      <PremiumFooter />
      <FloatingActions onBookAudit={scrollToForm} />
      <AIConsultant onBookAudit={scrollToForm} />
    </div>
  );
}

export default App;
