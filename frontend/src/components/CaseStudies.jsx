import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, Wrench, TrendingUp } from "lucide-react";

const CASES = [
  {
    category: "Amazon · Home & Kitchen",
    challenge: "Strong products, invisible listings — buried on page 4 with rising ad costs.",
    solution: "Full listing rebuild, keyword strategy and a restructured PPC account.",
    result: "Consistent organic rank improvement and healthier ad spend efficiency.",
    curve: "M0,58 C20,55 35,50 50,40 C70,26 85,16 120,8",
  },
  {
    category: "Flipkart · Fashion",
    challenge: "High returns and poor listing quality score blocking event participation.",
    solution: "Catalog cleanup, size-chart accuracy and QC-first content standards.",
    result: "Event eligibility restored and returns brought under control.",
    curve: "M0,52 C25,54 40,44 60,36 C80,28 95,20 120,12",
  },
  {
    category: "Meesho · Apparel",
    challenge: "Thin margins vanishing into returns and unoptimized pricing.",
    solution: "Margin-safe pricing model and returns-reduction catalog strategy.",
    result: "Sustainable order growth with protected profitability.",
    curve: "M0,55 C18,50 38,48 55,38 C78,25 92,22 120,10",
  },
];

const Graph = ({ curve, inView, i }) => (
  <svg viewBox="0 0 120 64" className="case-graph" aria-hidden="true">
    <defs>
      <linearGradient id={`caseFill${i}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`${curve} L120,64 L0,64 Z`} fill={`url(#caseFill${i})`} className={inView ? "case-area-in" : "case-area"} />
    <path d={curve} fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"
      className={inView ? "case-line-in" : "case-line"} />
  </svg>
);

const CaseCard = ({ c, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rows = [
    { icon: AlertCircle, label: "Challenge", text: c.challenge, color: "text-amber-400" },
    { icon: Wrench, label: "Solution", text: c.solution, color: "text-blue-400" },
    { icon: TrendingUp, label: "Result", text: c.result, color: "text-green-400" },
  ];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="case-card group"
      data-testid={`case-study-card-${i}`}
    >
      <div className="flex items-center justify-between">
        <span className="case-tag font-numbers">{c.category}</span>
        <span className="case-placeholder-badge">Placeholder</span>
      </div>
      <Graph curve={c.curve} inView={inView} i={i} />
      <div className="flex flex-col gap-5 mt-2">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.label} className="flex gap-3">
              <Icon size={16} className={`${r.color} mt-0.5 shrink-0`} />
              <div>
                <p className="text-xs font-numbers tracking-[0.2em] uppercase text-slate-500">{r.label}</p>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">{r.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export const CaseStudies = () => (
  <section id="case-studies" className="bg-[#0B1220] py-24 md:py-32 relative overflow-hidden" data-testid="case-studies-section">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-6"
      >
        <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-400 mb-5">Case Studies</p>
        <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]" data-testid="case-studies-heading">
          The kind of problems we solve.
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-5 leading-relaxed">
          Representative scenarios from 9+ years of marketplace work. Verified client
          case studies with real data will be published here soon.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-12">
        {CASES.map((c, i) => <CaseCard key={c.category} c={c} i={i} />)}
      </div>
    </div>
  </section>
);
