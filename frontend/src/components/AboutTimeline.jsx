import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Target, TrendingUp, Handshake, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { icon: Rocket, title: "Company Started", desc: "Advance Connect begins in Bhopal with a single mission — help Indian businesses sell online, properly." },
  { icon: Target, title: "Marketplace Expertise", desc: "Deep specialisation built across Amazon, Flipkart and Meesho — listings, policies, ads and algorithms." },
  { icon: TrendingUp, title: "Business Growth", desc: "Sellers managed end-to-end: catalog, advertising, account health and week-on-week sales growth." },
  { icon: Handshake, title: "Long-Term Partnerships", desc: "Clients stay for years, not months — built on transparent reporting and honest communication." },
  { icon: Sparkles, title: "Today", desc: "A trusted growth partner with 9+ years of marketplace experience, still obsessed with every seller's numbers." },
];

const MiniCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const s = performance.now();
    const tick = (now) => {
      const p = Math.min((now - s) / 1400, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return (
    <div ref={ref} className="about-counter">
      <span className="font-numbers text-4xl md:text-5xl font-bold tracking-tighter text-[#0B1220]">{v}{suffix}</span>
      <p className="text-slate-500 text-sm mt-1.5">{label}</p>
    </div>
  );
};

export const AboutTimeline = () => {
  const lineRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: wrapRef.current, start: "top 70%", end: "bottom 65%", scrub: 0.6 },
        }
      );
      gsap.utils.toArray(".about-milestone").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-[#F8FAFC] py-24 md:py-32 overflow-hidden" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">About Advance Connect</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="about-heading">
                Nine years of doing one thing exceptionally well.
              </h2>
              <p className="text-slate-500 text-base md:text-lg mt-6 leading-relaxed max-w-md">
                We grow marketplace businesses. Not websites, not social media — marketplaces. That focus is our advantage.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <MiniCounter target={9} suffix="+" label="Years" />
                <MiniCounter target={3} suffix="" label="Marketplaces" />
                <MiniCounter target={100} suffix="%" label="Focus" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative" ref={wrapRef}>
            <div className="about-line-track" aria-hidden="true">
              <div ref={lineRef} className="about-line-fill" />
            </div>
            <div className="flex flex-col gap-6">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={m.title} className="about-milestone pl-16 md:pl-20 relative" data-testid={`about-milestone-${i}`}>
                    <span className="about-node">
                      <Icon size={18} />
                    </span>
                    <div className="about-card group">
                      <span className="font-numbers text-xs text-slate-400 tracking-[0.25em]">CHAPTER 0{i + 1}</span>
                      <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[#0B1220] mt-2">{m.title}</h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-2.5">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
