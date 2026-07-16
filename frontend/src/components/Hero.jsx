import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { LeadForm } from "./LeadForm";
import { MessageCircle, ArrowRight, TrendingUp, Target, Star, BadgeCheck, ShieldCheck } from "lucide-react";
import { BUSINESS } from "../config/business";
import "../hero-premium.css";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));

const lines = ["India's Trusted", "Marketplace", "Growth Partner"];

const BADGES = [
  "Amazon", "Flipkart", "Meesho", "Marketplace Experts", "9+ Years Experience",
];

const METRICS = [
  { icon: TrendingUp, iconBg: "rgba(34,197,94,0.16)", iconColor: "#4ade80", value: "+38%", label: "Sales", cls: "hm-delay-1 top-[16%] left-[44%]" },
  { icon: Target, iconBg: "rgba(37,99,235,0.18)", iconColor: "#60A5FA", value: "8.4x", label: "ROAS", cls: "hm-delay-2 bottom-[20%] left-[36%]" },
  { icon: Star, iconBg: "rgba(245,158,11,0.16)", iconColor: "#fbbf24", value: "Top Rated", label: "Seller", cls: "hm-delay-3 top-[13%] right-[1.5%]" },
  { icon: BadgeCheck, iconBg: "rgba(96,165,250,0.14)", iconColor: "#93C5FD", value: "Expert", label: "Marketplace", cls: "hm-delay-4 bottom-[10%] right-[34%]" },
];

const DASH_CARDS = [
  { label: "Revenue", spark: true },
  { label: "Orders", spark: false },
  { label: "Growth", spark: true, green: true },
  { label: "ROAS", spark: false, green: true },
  { label: "Conversion", spark: false },
  { label: "Monthly Sales", spark: true },
];

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

    <div className="hero-decor" aria-hidden="true">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid-overlay" />
      <svg className="hero-network" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <line className="hero-net-line" x1="120" y1="640" x2="420" y2="480" />
        <line className="hero-net-line" x1="420" y1="480" x2="700" y2="560" />
        <line className="hero-net-line" x1="700" y1="560" x2="1020" y2="380" />
        <line className="hero-net-line" x1="1020" y1="380" x2="1330" y2="460" />
        <line className="hero-net-line" x1="240" y1="180" x2="560" y2="120" />
        <line className="hero-net-line" x1="560" y1="120" x2="880" y2="200" />
        <circle className="hero-net-node hero-net-node-pulse" cx="420" cy="480" r="3" />
        <circle className="hero-net-node" cx="700" cy="560" r="2.4" />
        <circle className="hero-net-node hero-net-node-pulse" cx="1020" cy="380" r="3" style={{ animationDelay: "-3s" }} />
        <circle className="hero-net-node" cx="560" cy="120" r="2.4" />
        <circle className="hero-net-node hero-net-node-pulse" cx="880" cy="200" r="2.6" style={{ animationDelay: "-1.5s" }} />
        <path className="hero-graph-curve" d="M-20,700 C220,660 380,600 560,540 C760,472 940,430 1140,350 C1280,294 1380,260 1470,230" />
      </svg>
      <div className="hero-vignette" />
    </div>

    {METRICS.map((m) => {
      const Icon = m.icon;
      return (
        <div key={m.value + m.label} className={`hero-metric-card hidden lg:flex ${m.cls}`} aria-hidden="true">
          <span className="hero-metric-icon" style={{ background: m.iconBg, color: m.iconColor }}>
            <Icon size={14} />
          </span>
          <span>
            <span className="hm-value block">{m.value}</span>
            <span className="hm-label block">{m.label}</span>
          </span>
        </div>
      );
    })}

    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-32 pb-16 lg:pt-36 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 relative">
          <div className="hero-heading-glow" aria-hidden="true" />
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
            className="mt-10 flex flex-col sm:flex-row gap-4 hero-cta-glow"
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
