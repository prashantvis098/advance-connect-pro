import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { Phone, Mail, MapPin, Clock, ArrowUp, Loader2, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { BUSINESS } from "../config/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Amazon Account Management",
  "Flipkart Account Management",
  "Meesho Account Management",
  "Amazon PPC & Advertising",
  "Marketplace SEO",
  "Catalog Management",
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export const PremiumFooter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const goTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Subscribed! Marketplace growth tips are on their way.");
      setEmail("");
    } catch {
      toast.error("Please enter a valid email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#070d1a] border-t border-white/5 pt-16 pb-8" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="footer-newsletter" data-testid="footer-newsletter">
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white">Marketplace growth tips, monthly.</h3>
            <p className="text-slate-500 text-sm mt-1.5">Practical Amazon, Flipkart & Meesho insights. No spam, ever.</p>
          </div>
          <form onSubmit={subscribe} className="flex gap-2.5 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="footer-newsletter-input"
              data-testid="newsletter-email-input"
            />
            <button type="submit" disabled={loading} className="btn-primary px-6 py-3 text-sm font-semibold shrink-0 flex items-center gap-2 disabled:opacity-60" data-testid="newsletter-subscribe-btn">
              {loading && <Loader2 size={14} className="animate-spin" />} Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-16">
          <div data-testid="footer-col-company">
            <Logo dark size={30} />
            <p className="text-slate-500 text-sm leading-relaxed mt-5 max-w-xs">
              India's trusted marketplace growth partner. Helping businesses sell successfully on Amazon, Flipkart and Meesho since 2016.
            </p>
            <div className="flex gap-2.5 mt-6">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  onClick={(e) => { e.preventDefault(); toast.info(`${label} profile coming soon`); }}
                  className="footer-social"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div data-testid="footer-col-links">
            <p className="footer-col-title font-numbers">Quick Links</p>
            <ul className="flex flex-col gap-3 mt-5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); goTo(l.href); }} className="footer-link-item" data-testid={`footer-link-${l.label.toLowerCase().replace(" ", "-")}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-testid="footer-col-services">
            <p className="footer-col-title font-numbers">Marketplace Services</p>
            <ul className="flex flex-col gap-3 mt-5">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); goTo("#services"); }} className="footer-link-item">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-testid="footer-col-contact">
            <p className="footer-col-title font-numbers">Contact</p>
            <ul className="flex flex-col gap-3.5 mt-5 text-sm">
              <li><a href={BUSINESS.phoneHref} className="footer-link" data-testid="footer-phone-link"><Phone size={14} /> {BUSINESS.phone}</a></li>
              <li><a href={BUSINESS.emailHref} className="footer-link" data-testid="footer-email-link"><Mail size={14} /> {BUSINESS.email}</a></li>
              <li><span className="footer-link cursor-default"><MapPin size={14} /> {BUSINESS.location}</span></li>
              <li><span className="footer-link cursor-default"><Clock size={14} /> Mon – Sat · 10 AM – 7 PM IST</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#top" onClick={(e) => { e.preventDefault(); toast.info("Privacy Policy page coming soon"); }} className="text-slate-600 text-xs hover:text-slate-400 transition-colors duration-300" data-testid="footer-privacy-link">Privacy Policy</a>
            <a href="#top" onClick={(e) => { e.preventDefault(); toast.info("Terms page coming soon"); }} className="text-slate-600 text-xs hover:text-slate-400 transition-colors duration-300" data-testid="footer-terms-link">Terms</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="footer-top-btn"
              aria-label="Back to top"
              data-testid="footer-back-to-top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
