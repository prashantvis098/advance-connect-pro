import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SearchCheck, Compass, Settings2, Megaphone, TrendingUp, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { icon: SearchCheck, title: "Marketplace Audit", desc: "We analyse your accounts, listings, ads and competition — free, honest, detailed." },
  { icon: Compass, title: "Business Strategy", desc: "A clear growth roadmap: category focus, pricing, catalog priorities and ad budgets." },
  { icon: Settings2, title: "Optimization", desc: "Listings rebuilt, SEO applied, catalog cleaned, account health strengthened." },
  { icon: Megaphone, title: "Advertising", desc: "Profit-focused PPC campaigns launched and tuned across every marketplace." },
  { icon: TrendingUp, title: "Growth", desc: "Sales climb week on week — tracked in transparent reports you actually understand." },
  { icon: Rocket, title: "Scaling", desc: "New categories, new marketplaces, bigger inventory — growth that compounds." },
];

export const Workflow = () => {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: wrapRef.current, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        }
      );
      gsap.utils.toArray(".wf-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 46, x: i % 2 ? 30 : -30 },
          {
            opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
          }
        );
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-24 md:py-32 overflow-hidden" data-testid="workflow-section">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-600 mb-5">How We Work</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[#0B1220] leading-[1.05]" data-testid="workflow-heading">
            The marketplace growth workflow.
          </h2>
        </div>

        <div ref={wrapRef} className="relative">
          <div className="wf-line-track" aria-hidden="true">
            <div ref={lineRef} className="wf-line-fill" />
          </div>
          <div className="flex flex-col gap-10 md:gap-14">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const right = i % 2 === 1;
              return (
                <div key={s.title} className={`wf-step relative flex ${right ? "md:justify-end" : ""}`} data-testid={`workflow-step-${i + 1}`}>
                  <span className="wf-node font-numbers">{i + 1}</span>
                  <div className={`wf-card ml-16 ${right ? "md:ml-0 md:mr-[calc(50%+44px)] md:text-right" : "md:ml-[calc(50%+44px)]"}`}>
                    <span className={`wf-icon ${right ? "md:ml-auto" : ""}`}><Icon size={19} /></span>
                    <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[#0B1220] mt-4">
                      Step {i + 1} — {s.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-2.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
