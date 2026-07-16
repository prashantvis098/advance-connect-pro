import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, User, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "../config/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INFO = [
  { icon: User, label: "Primary Contact", value: BUSINESS.contactPerson, testid: "contact-info-person" },
  { icon: Phone, label: "Phone", value: BUSINESS.phone, href: BUSINESS.phoneHref, testid: "contact-info-phone" },
  { icon: MessageCircle, label: "WhatsApp", value: BUSINESS.phone, href: BUSINESS.whatsappHref, external: true, testid: "contact-info-whatsapp" },
  { icon: Mail, label: "Email", value: BUSINESS.email, href: BUSINESS.emailHref, testid: "contact-info-email" },
  { icon: MapPin, label: "Location", value: BUSINESS.location, testid: "contact-info-location" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat · 10 AM – 7 PM IST", testid: "contact-info-hours" },
];

const initial = { full_name: "", phone: "", email: "", business_name: "", marketplace: "", monthly_sales: "", challenge: "" };
const SALES_OPTIONS = ["Just Starting", "Under ₹1 Lakh", "₹1–5 Lakhs", "₹5–20 Lakhs", "₹20 Lakhs+"];

export const ContactSplit = () => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "contact_form" });
      setDone(true);
      toast.success("Message sent. We'll get back to you within a few hours.");
    } catch {
      toast.error("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0B1220] py-24 md:py-32 relative overflow-hidden" data-testid="contact-section">
      <div className="contact-glow" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-400 mb-5">Talk To Us</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]" data-testid="contact-heading">
                Your growth conversation starts here.
              </h2>
              <p className="text-slate-400 text-base md:text-lg mt-6 leading-relaxed max-w-md">
                One call is all it takes to understand what's holding your marketplace business back. Free, honest, no obligation.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INFO.map((it, i) => {
                const Icon = it.icon;
                const Tag = it.href ? "a" : "div";
                return (
                  <motion.div
                    key={it.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.07 }}
                  >
                    <Tag
                      href={it.href}
                      target={it.external ? "_blank" : undefined}
                      rel={it.external ? "noopener noreferrer" : undefined}
                      className="contact-info-tile group"
                      data-testid={it.testid}
                    >
                      <span className="contact-info-icon"><Icon size={17} /></span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-[0.15em] text-slate-500 font-numbers">{it.label}</span>
                        <span className="block text-sm text-slate-200 font-medium mt-1 truncate">{it.value}</span>
                      </span>
                    </Tag>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {done ? (
              <div className="glass-form p-12 flex flex-col items-center text-center gap-4 h-full justify-center" data-testid="contact-form-success">
                <span className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                  <CheckCircle2 size={34} className="text-green-400" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">Message Sent</h3>
                <p className="text-slate-300 text-sm max-w-xs leading-relaxed">
                  Thank you. Our marketplace expert will reach out within business hours.
                </p>
                <button onClick={() => { setForm(initial); setDone(false); }} className="text-blue-400 text-sm font-medium mt-2 hover:text-blue-300 transition-colors duration-200" data-testid="contact-form-reset">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="glass-form p-6 sm:p-9" data-testid="contact-form">
                <h3 className="font-heading text-xl font-bold text-white tracking-tight mb-6">Send us a message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input required minLength={2} className="glass-input" placeholder="Name" value={form.full_name} onChange={set("full_name")} data-testid="contact-input-name" />
                  <input required minLength={7} type="tel" className="glass-input" placeholder="Phone" value={form.phone} onChange={set("phone")} data-testid="contact-input-phone" />
                  <input required type="email" className="glass-input" placeholder="Email" value={form.email} onChange={set("email")} data-testid="contact-input-email" />
                  <input required className="glass-input" placeholder="Business Name" value={form.business_name} onChange={set("business_name")} data-testid="contact-input-business" />
                  <select required className="glass-input glass-select" value={form.marketplace} onChange={set("marketplace")} data-testid="contact-select-marketplace">
                    <option value="" disabled>Marketplace</option>
                    <option>Amazon</option>
                    <option>Flipkart</option>
                    <option>Meesho</option>
                    <option>Multiple Marketplaces</option>
                  </select>
                  <select className="glass-input glass-select" value={form.monthly_sales} onChange={set("monthly_sales")} data-testid="contact-select-sales">
                    <option value="" disabled>Monthly Sales</option>
                    {SALES_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <textarea rows={4} className="glass-input w-full mt-3.5 resize-none" placeholder="Your message…" value={form.challenge} onChange={set("challenge")} data-testid="contact-input-message" />
                <button type="submit" disabled={loading} className="btn-primary w-full mt-5 py-3.5 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-60" data-testid="contact-form-submit">
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
