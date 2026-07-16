import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "Which marketplaces do you manage?", a: "We specialise in Amazon, Flipkart and Meesho — India's three biggest marketplaces. This focus means we know each platform's policies, algorithms and growth levers inside out." },
  { q: "What does the free marketplace audit include?", a: "A detailed review of your account health, listings, keywords, pricing, advertising and competition — with a clear, honest list of what's holding your sales back. No obligation." },
  { q: "How do you charge for account management?", a: "Pricing depends on your catalog size, marketplaces and goals. After your free audit, we share a transparent proposal — no hidden fees, no lock-ins you don't understand." },
  { q: "How soon can I expect results?", a: "Listing and catalog improvements often show impact within weeks. Advertising and ranking growth compounds over 2–3 months. We set honest expectations upfront and track everything in weekly reports." },
  { q: "Can you help with a suspended account or blocked listings?", a: "Yes — account health and reinstatement support is one of our core services. We move fast, because every day of downtime costs you sales." },
  { q: "Do I keep full control of my seller account?", a: "Always. The account, brand and customer relationships remain 100% yours. We work as your growth team with transparent access and complete reporting." },
];

const FaqItem = ({ f, i, open, toggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.6, delay: i * 0.06 }}
    className={`faq-item ${open ? "faq-item-open" : ""}`}
  >
    <button className="faq-trigger" onClick={toggle} data-testid={`faq-trigger-${i}`} aria-expanded={open}>
      <span className="font-heading font-bold text-base md:text-lg tracking-tight text-[#0B1220] pr-6">{f.q}</span>
      <span className={`faq-plus ${open ? "faq-plus-open" : ""}`}><Plus size={18} /></span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          data-testid={`faq-content-${i}`}
        >
          <p className="text-slate-500 text-sm md:text-base leading-relaxed px-6 md:px-8 pb-6">{f.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F8FAFC] py-24 md:py-32" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">FAQ</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="faq-heading">
            Questions sellers ask us.
          </h2>
        </div>
        <div className="flex flex-col gap-3.5">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} f={f} i={i} open={open === i} toggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};
