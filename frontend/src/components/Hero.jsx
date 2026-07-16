import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { LeadForm } from "./LeadForm";
import { MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS } from "../config/business";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));

const lines = ["India's Trusted", "Marketplace", "Growth Partner"];

const lineVariant = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.13 },
  }),
};

export const Hero = ({ started }) => (
  <section id="top" className="relative min-h-screen flex items-center overflow-hidden hero-bg">
    {started && (
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
    )}
    <div className="absolute inset-0 z-[1] hero-overlay" aria-hidden="true" />

    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-32 pb-16 lg:pt-36 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-1.5 mb-8"
            data-testid="hero-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[13px] text-slate-300 tracking-wide">
              Amazon · Flipkart · Meesho Specialists
            </span>
          </motion.div>

          <h1 className="font-heading font-black tracking-tighter text-white text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02]" data-testid="hero-headline">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate={started ? "show" : "hidden"}
                >
                  {i === 2 ? (
                    <span className="text-gradient-blue">{l}</span>
                  ) : (
                    l
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-7 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl"
            data-testid="hero-subheadline"
          >
            Helping businesses grow on Amazon, Flipkart and Meesho for over 9 years
            through professional marketplace management, advertising and optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              data-testid="hero-primary-cta"
              onClick={() => document.getElementById("hero-lead-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="btn-primary px-8 py-4 text-base font-semibold flex items-center justify-center gap-2"
            >
              Book Free Marketplace Audit <ArrowRight size={18} />
            </MagneticButton>
            <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid="hero-secondary-cta">
              <MagneticButton className="btn-ghost px-8 py-4 text-base font-medium flex items-center justify-center gap-2 w-full">
                <MessageCircle size={18} className="text-green-400" /> Talk To Our Expert
              </MagneticButton>
            </a>
          </motion.div>
        </div>

        <motion.div
          id="hero-lead-form-anchor"
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </div>
  </section>
);
