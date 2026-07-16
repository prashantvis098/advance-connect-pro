import { Logo } from "./Logo";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { BUSINESS } from "../config/business";

export const Footer = () => (
  <footer className="bg-[#070d1a] border-t border-white/5 py-14" data-testid="site-footer">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
        <div className="max-w-sm">
          <Logo dark size={32} />
          <p className="text-slate-500 text-sm leading-relaxed mt-5">
            India's trusted marketplace growth partner. Helping businesses sell
            successfully on Amazon, Flipkart and Meesho since 2016.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <a href={BUSINESS.phoneHref} className="footer-link" data-testid="footer-phone-link">
            <Phone size={15} /> {BUSINESS.phone}
          </a>
          <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="footer-link" data-testid="footer-whatsapp-link">
            <MessageCircle size={15} /> WhatsApp — {BUSINESS.contactPerson}
          </a>
          <a href={BUSINESS.emailHref} className="footer-link" data-testid="footer-email-link">
            <Mail size={15} /> {BUSINESS.email}
          </a>
          <span className="footer-link cursor-default">
            <MapPin size={15} /> {BUSINESS.location}
          </span>
        </div>
      </div>
      <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <p className="text-slate-600 text-xs">Amazon · Flipkart · Meesho Growth Specialists</p>
      </div>
    </div>
  </footer>
);
