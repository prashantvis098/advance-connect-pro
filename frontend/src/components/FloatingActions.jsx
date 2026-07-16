import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { BUSINESS } from "../config/business";

export const FloatingActions = ({ onBookAudit }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="floating-actions"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="floating-stack"
        >
          <a
            href={BUSINESS.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="float-btn float-whatsapp"
            aria-label="WhatsApp us"
            data-testid="floating-whatsapp-btn"
          >
            <MessageCircle size={20} />
          </a>
          <a href={BUSINESS.phoneHref} className="float-btn float-call" aria-label="Call us" data-testid="floating-call-btn">
            <Phone size={19} />
          </a>
          <button onClick={onBookAudit} className="float-book" data-testid="floating-book-btn">
            <CalendarCheck size={16} /> <span className="hidden sm:inline">Book Consultation</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
