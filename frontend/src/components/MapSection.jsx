import { motion } from "framer-motion";
import { Navigation, Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { BUSINESS } from "../config/business";

const ACTIONS = [
  { icon: Navigation, label: "Get Directions", href: "https://www.google.com/maps/dir/?api=1&destination=Bhopal,Madhya+Pradesh,India", external: true, testid: "map-directions-btn" },
  { icon: Phone, label: "Call", href: BUSINESS.phoneHref, testid: "map-call-btn" },
  { icon: MessageCircle, label: "WhatsApp", href: BUSINESS.whatsappHref, external: true, testid: "map-whatsapp-btn", green: true },
];

export const MapSection = () => (
  <section className="bg-[#F8FAFC] py-24 md:py-28" data-testid="map-section">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
      >
        <div>
          <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-4">Visit Us</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black tracking-tighter text-[#0B1220]" data-testid="map-heading">
            Based in Bhopal. Working across India.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <a
                key={a.label}
                href={a.href}
                target={a.external ? "_blank" : undefined}
                rel={a.external ? "noopener noreferrer" : undefined}
                className={a.green ? "map-action map-action-green" : "map-action"}
                data-testid={a.testid}
              >
                <Icon size={16} /> {a.label}
              </a>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="map-glass"
        data-testid="map-container"
      >
        <iframe
          title="Advance Connect — Bhopal, Madhya Pradesh"
          src={BUSINESS.mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(30%) contrast(1.05)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="map-info-card" data-testid="map-info-card">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold text-[#0B1220] text-sm">{BUSINESS.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{BUSINESS.location}</p>
              <p className="text-slate-400 text-[11px] mt-0.5 italic">Exact office address to be updated</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-100">
            <Clock size={14} className="text-green-600 shrink-0" />
            <p className="text-xs text-slate-600 font-medium">Mon – Sat · 10 AM – 7 PM IST</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
