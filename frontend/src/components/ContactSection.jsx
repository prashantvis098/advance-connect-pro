import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { BUSINESS } from "../config/business";
import { MagneticButton } from "./MagneticButton";

const CHANNELS = [
  {
    icon: MessageCircle, label: "WhatsApp Us", value: BUSINESS.phone,
    href: BUSINESS.whatsappHref, accent: "text-green-400", testid: "contact-whatsapp-card",
    sub: "Fastest response — usually within minutes",
  },
  {
    icon: Phone, label: "Call Ritesh", value: BUSINESS.phone,
    href: BUSINESS.phoneHref, accent: "text-blue-400", testid: "contact-call-card",
    sub: "Mon–Sat · 10 AM – 7 PM IST",
  },
  {
    icon: Mail, label: "Email Us", value: BUSINESS.email,
    href: BUSINESS.emailHref, accent: "text-slate-300", testid: "contact-email-card",
    sub: "Detailed enquiries & documents",
  },
];

export const ContactSection = () => (
  <section id="contact" className="bg-[#0B1220] py-24 md:py-32 relative overflow-hidden">
    <div className="contact-glow" aria-hidden="true" />
    <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-400 mb-5">
              Talk To Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]" data-testid="contact-heading">
              Your growth conversation starts here.
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-6 leading-relaxed max-w-lg">
              One call is all it takes to understand what's holding your marketplace
              business back. Free, honest, no obligation.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col gap-4">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.label === "WhatsApp Us" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-testid={c.testid}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="contact-channel group"
                >
                  <span className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${c.accent} shrink-0`}>
                    <Icon size={22} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-heading font-bold text-white text-lg">{c.label}</span>
                    <span className="block text-slate-400 text-sm truncate">{c.sub}</span>
                  </span>
                  <span className="font-numbers text-sm text-slate-300 hidden sm:block group-hover:text-white transition-colors duration-300 truncate max-w-[220px]">
                    {c.value}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="map-frame" data-testid="contact-map">
            <iframe
              title="Advance Connect — Bhopal, Madhya Pradesh"
              src={BUSINESS.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(35%) contrast(1.05)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-pin-card" data-testid="contact-location-card">
              <MapPin size={18} className="text-blue-600 shrink-0" />
              <div>
                <p className="font-heading font-bold text-[#0B1220] text-sm">Advance Connect</p>
                <p className="text-slate-500 text-xs">{BUSINESS.location}</p>
                <p className="text-slate-400 text-[11px] mt-0.5 italic">Exact office address to be updated</p>
              </div>
            </div>
          </div>

          <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="block mt-6">
            <MagneticButton className="btn-whatsapp w-full py-4 text-base font-semibold flex items-center justify-center gap-2" data-testid="contact-whatsapp-cta">
              <MessageCircle size={20} /> Start a WhatsApp Conversation
            </MagneticButton>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);
