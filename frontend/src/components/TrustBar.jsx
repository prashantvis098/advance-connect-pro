import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CountUp = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-numbers font-bold tracking-tighter text-[#0B1220] text-5xl md:text-6xl">
      {val}{suffix}
    </span>
  );
};

const STATS = [
  { target: 9, suffix: "+", label: "Years of Experience", verified: true },
  { target: 3, suffix: "", label: "Marketplaces Mastered", sub: "Amazon · Flipkart · Meesho", verified: true },
];

const PLACEHOLDERS = [
  { label: "Businesses Served" },
  { label: "Revenue Managed" },
];

export const TrustBar = () => (
  <section id="results" className="bg-[#F8FAFC] py-24 md:py-32" data-testid="trust-bar">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-numbers text-xs tracking-[0.35em] uppercase text-slate-400 mb-14"
      >
        Trusted Marketplace Expertise
      </motion.p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="stat-cell"
            data-testid={`trust-stat-${i}`}
          >
            <CountUp target={s.target} suffix={s.suffix} />
            <p className="mt-3 text-slate-600 font-medium text-sm md:text-base">{s.label}</p>
            {s.sub && <p className="mt-1 text-slate-400 text-xs md:text-sm">{s.sub}</p>}
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 bg-green-50 border border-green-100 rounded-full px-2.5 py-0.5">
              Verified
            </span>
          </motion.div>
        ))}
        {PLACEHOLDERS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i + 2) * 0.1 }}
            className="stat-cell"
            data-testid={`trust-stat-placeholder-${i}`}
          >
            <span className="font-numbers font-bold tracking-tighter text-slate-300 text-5xl md:text-6xl">—</span>
            <p className="mt-3 text-slate-600 font-medium text-sm md:text-base">{p.label}</p>
            <span className="mt-3 inline-flex items-center text-[11px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5">
              Verified data coming soon
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
