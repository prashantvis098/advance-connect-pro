import { useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Store, Package, Check, ArrowUpRight } from "lucide-react";

const PLATFORMS = [
  {
    icon: ShoppingBag, name: "Amazon", tag: "India's largest marketplace",
    color: "#F59E0B",
    points: [
      "Full Seller Central account management",
      "A+ content, Brand Store & catalog growth",
      "Amazon PPC — Sponsored Products, Brands & Display",
      "Buy Box, ranking & account health optimization",
    ],
  },
  {
    icon: Store, name: "Flipkart", tag: "The homegrown giant",
    color: "#2563EB",
    points: [
      "Flipkart Seller Hub management end-to-end",
      "Listing quality, rich content & category strategy",
      "Flipkart Ads — PLA & display campaigns",
      "Big Billion Days & event sale preparation",
    ],
  },
  {
    icon: Package, name: "Meesho", tag: "India's value commerce leader",
    color: "#EC4899",
    points: [
      "Meesho Supplier Panel management",
      "Price-competitive catalog & bulk listing strategy",
      "Meesho Ads & visibility optimization",
      "Returns control & margin protection",
    ],
  },
];

const PlatformCard = ({ p, i }) => {
  const ref = useRef(null);
  const Icon = p.icon;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={ref} onMouseMove={onMove} className="platform-card group" data-testid={`expertise-card-${p.name.toLowerCase()}`}>
        <div className="platform-spot" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/12 bg-white/5" style={{ color: p.color }}>
              <Icon size={26} />
            </span>
            <ArrowUpRight size={20} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 platform-arrow" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mt-8">{p.name}</h3>
          <p className="text-slate-400 text-sm mt-1.5">{p.tag}</p>
          <ul className="mt-7 flex flex-col gap-3">
            {p.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                <Check size={15} className="text-green-400 mt-0.5 shrink-0" /> {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export const MarketplaceExpertise = () => (
  <section className="bg-[#0B1220] py-24 md:py-32 relative overflow-hidden" data-testid="expertise-section">
    <div className="expertise-glow" aria-hidden="true" />
    <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-16"
      >
        <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-400 mb-5">Marketplace Expertise</p>
        <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]" data-testid="expertise-heading">
          Three marketplaces. One growth team.
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {PLATFORMS.map((p, i) => <PlatformCard key={p.name} p={p} i={i} />)}
      </div>
    </div>
  </section>
);
