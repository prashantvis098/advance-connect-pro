import { motion } from "framer-motion";
import {
  Store, ShoppingBag, Package, Megaphone, BarChart3, Search,
  Layers, ListChecks, Boxes, Truck, HeartPulse, Briefcase,
} from "lucide-react";

const SERVICES = [
  { icon: ShoppingBag, title: "Amazon Account Management", desc: "Complete Seller Central operations, growth and protection.", span: "md:col-span-6 lg:col-span-5", featured: true },
  { icon: Store, title: "Flipkart Account Management", desc: "End-to-end Seller Hub management and event readiness.", span: "md:col-span-6 lg:col-span-4" },
  { icon: Package, title: "Meesho Account Management", desc: "Supplier panel operations built for value commerce.", span: "md:col-span-6 lg:col-span-3" },
  { icon: Megaphone, title: "Amazon PPC", desc: "Profit-first sponsored campaigns, not budget burners.", span: "md:col-span-6 lg:col-span-3" },
  { icon: BarChart3, title: "Flipkart Advertising", desc: "PLA and display campaigns tuned for ROI.", span: "md:col-span-6 lg:col-span-4" },
  { icon: Search, title: "Marketplace SEO", desc: "Keyword-rich titles, backend terms and rank strategy.", span: "md:col-span-6 lg:col-span-5", featured: true },
  { icon: Layers, title: "Catalog Management", desc: "Clean, complete, conversion-ready catalogs.", span: "md:col-span-6 lg:col-span-4" },
  { icon: ListChecks, title: "Product Listing", desc: "High-quality listings that pass QC the first time.", span: "md:col-span-6 lg:col-span-3" },
  { icon: Boxes, title: "Inventory Management", desc: "Never go out of stock during your best weeks.", span: "md:col-span-6 lg:col-span-5", featured: true },
  { icon: Truck, title: "Order Management", desc: "SLA-safe processing, returns and dispute handling.", span: "md:col-span-6 lg:col-span-4" },
  { icon: HeartPulse, title: "Account Health", desc: "Proactive monitoring, appeals and reinstatements.", span: "md:col-span-6 lg:col-span-4" },
  { icon: Briefcase, title: "Business Consulting", desc: "Category, pricing and expansion strategy that compounds.", span: "md:col-span-6 lg:col-span-4" },
];

export const ServicesGrid = () => (
  <section id="services" className="bg-white py-24 md:py-32" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mb-16"
      >
        <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">Services</p>
        <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="services-heading">
          Everything your marketplace business needs.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5" data-testid="services-grid">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
              className={s.span}
            >
              <div className={`service-card group ${s.featured ? "service-featured" : ""}`} data-testid={`service-card-${i}`}>
                <span className={`service-icon ${s.featured ? "service-icon-featured" : ""}`}>
                  <Icon size={20} />
                </span>
                <h3 className={`font-heading text-lg font-bold tracking-tight mt-5 ${s.featured ? "text-white" : "text-[#0B1220]"}`}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed mt-2 ${s.featured ? "text-slate-300" : "text-slate-500"}`}>{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
