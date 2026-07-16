import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { category: "Amazon Seller · Electronics", theme: "Account management & PPC" },
  { category: "Flipkart Seller · Fashion", theme: "Catalog quality & event sales" },
  { category: "Meesho Supplier · Home Decor", theme: "Margin protection & growth" },
];

export const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden" data-testid="testimonials-section">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">Testimonials</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="testimonials-heading">
            Sellers who stayed for years.
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-5">
            Verified client testimonials are being collected and will appear here soon.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="testimonial-card"
              data-testid={`testimonial-slide-${idx}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="testimonial-video group" data-testid="testimonial-video-frame">
                    <span className="testimonial-play">
                      <Play size={22} className="ml-0.5" />
                    </span>
                    <span className="testimonial-video-label font-numbers">Video testimonial<br />coming soon</span>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Quote size={30} className="text-blue-200" />
                  <p className="font-heading text-xl md:text-2xl font-medium tracking-tight text-slate-400 leading-snug mt-4 italic">
                    "Verified client testimonial to be updated — real feedback from our
                    long-term sellers is on its way."
                  </p>
                  <div className="mt-7 flex items-center gap-4">
                    <span className="testimonial-avatar font-heading">AC</span>
                    <div>
                      <p className="font-heading font-bold text-[#0B1220]">{slide.category}</p>
                      <p className="text-slate-500 text-sm">{slide.theme}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`testimonial-dot ${i === idx ? "testimonial-dot-active" : ""}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-testid={`testimonial-dot-${i}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIdx((idx - 1 + SLIDES.length) % SLIDES.length)} className="testimonial-arrow" aria-label="Previous" data-testid="testimonial-prev">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setIdx((idx + 1) % SLIDES.length)} className="testimonial-arrow" aria-label="Next" data-testid="testimonial-next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
