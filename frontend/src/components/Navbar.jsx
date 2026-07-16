import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, Phone } from "lucide-react";
import { BUSINESS } from "../config/business";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = ({ onBookAudit }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      data-testid="main-navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 nav-shell ${scrolled ? "nav-scrolled" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#top" onClick={(e) => { e.preventDefault(); goTo("#top"); }} data-testid="nav-logo-link">
          <Logo dark={!scrolled} size={34} />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(" ", "-")}`}
              onClick={(e) => { e.preventDefault(); goTo(l.href); }}
              className={`nav-link ${scrolled ? "nav-link-dark" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            data-testid="nav-call-link"
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${scrolled ? "text-slate-700 hover:text-blue-600" : "text-slate-300 hover:text-white"}`}
          >
            <Phone size={15} /> {BUSINESS.phone}
          </a>
          <MagneticButton
            data-testid="nav-book-consultation-btn"
            onClick={onBookAudit}
            className="btn-primary text-sm px-6 py-2.5"
          >
            Book Consultation
          </MagneticButton>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-slate-900" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mx-4 mb-4 rounded-2xl p-6 flex flex-col gap-4 mobile-menu-glass"
          data-testid="nav-mobile-menu"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => { e.preventDefault(); goTo(l.href); }}
              className="text-slate-900 font-heading font-medium text-lg"
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); onBookAudit(); }} className="btn-primary text-sm px-6 py-3 w-full" data-testid="nav-mobile-book-btn">
            Book Consultation
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};
