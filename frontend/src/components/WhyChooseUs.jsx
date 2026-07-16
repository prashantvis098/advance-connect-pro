import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Award, Users, FileBarChart, MessageSquareText,
  TrendingUp, Compass, Zap, BadgeCheck,
} from "lucide-react";

const CARDS = [
  { n: "01", icon: Award, title: "9+ Years Experience", desc: "Nearly a decade of deep, hands-on marketplace work — policies, algorithms and growth levers mastered across every category.", span: "md:col-span-7" },
  { n: "02", icon: BadgeCheck, title: "Marketplace Specialists", desc: "Amazon, Flipkart and Meesho only. We don't dabble — we specialise.", span: "md:col-span-5" },
  { n: "03", icon: Users, title: "Dedicated Account Managers", desc: "A dedicated manager who knows your business, your catalog and your goals.", span: "md:col-span-4" },
  { n: "04", icon: MessageSquareText, title: "Transparent Reporting", desc: "Honest numbers, clear communication. You always know exactly where your money goes.", span: "md:col-span-4" },
  { n: "05", icon: TrendingUp, title: "Growth Focus", desc: "Every decision — listings, ads, pricing — is measured against one thing: your sales growth.", span: "md:col-span-4" },
  { n: "06", icon: FileBarChart, title: "Weekly Performance Reports", desc: "Sales, spend, rank and account health — reported to you every single week.", span: "md:col-span-4" },
  { n: "07", icon: Compass, title: "Business Strategy", desc: "Beyond account management — category strategy, seasonal planning and marketplace expansion.", span: "md:col-span-4" },
  { n: "08", icon: Zap, title: "Fast Support", desc: "Account suspended? Listing blocked? We respond fast, because downtime costs you sales.", span: "md:col-span-4" },
];

const TiltCard = ({ card, i }) => {
  const ref = useRef(null);
  const Icon = card.icon;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${card.span}`}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="why-card group h-full"
        data-testid={`why-card-${card.n}`}
      >
        <div className="flex items-start justify-between">
          <span className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white icon-swap">
            <Icon size={22} />
          </span>
          <span className="font-numbers text-sm text-slate-300 tracking-widest">{card.n}</span>
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[#0B1220] mt-8">
          {card.title}
        </h3>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-3">{card.desc}</p>
      </div>
    </motion.div>
  );
};

export const WhyChooseUs = () => (
  <section id="why" className="bg-white py-24 md:py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mb-16 md:mb-20"
      >
        <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">
          Why Advance Connect
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="why-choose-heading">
          Built to grow your marketplace business.
        </h2>
        <p className="text-slate-500 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
          We are not a listing service. We are the growth team behind your Amazon,
          Flipkart and Meesho storefronts — accountable, transparent and obsessed with results.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6" data-testid="why-choose-grid">
        {CARDS.map((c, i) => (
          <TiltCard key={c.n} card={c} i={i} />
        ))}
      </div>
    </div>
  </section>
);
