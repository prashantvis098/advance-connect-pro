import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { BUSINESS } from "../config/business";

export const CTABand = ({ title, subtitle, testid = "cta-band", onBookAudit }) => (
  <section className="cta-band" data-testid={testid}>
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="cta-band-inner"
      >
        <div className="cta-band-glow" aria-hidden="true" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-heading text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">{title}</h3>
            <p className="text-slate-400 text-sm md:text-base mt-2.5 leading-relaxed">{subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            <MagneticButton
              onClick={onBookAudit}
              className="btn-primary px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              data-testid={`${testid}-book-btn`}
            >
              Book Free Marketplace Audit <ArrowRight size={16} />
            </MagneticButton>
            <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" data-testid={`${testid}-whatsapp-btn`}>
              <MagneticButton className="btn-ghost px-7 py-3.5 text-sm font-medium flex items-center justify-center gap-2 w-full">
                <MessageCircle size={16} className="text-green-400" /> WhatsApp Us
              </MagneticButton>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
