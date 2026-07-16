import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IndianRupee, ShoppingCart, Boxes, HeartPulse, TrendingUp, Activity } from "lucide-react";

const Num = ({ target, prefix = "", suffix = "", dur = 1500 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const s = performance.now();
    const tick = (now) => {
      const p = Math.min((now - s) / dur, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, dur]);
  return <span ref={ref}>{prefix}{v.toLocaleString("en-IN")}{suffix}</span>;
};

const STATS = [
  { icon: IndianRupee, label: "Revenue", value: <Num target={842} prefix="₹" suffix="K" />, delta: "+18.4%", up: true },
  { icon: ShoppingCart, label: "Orders", value: <Num target={1264} />, delta: "+12.1%", up: true },
  { icon: Boxes, label: "Inventory", value: <Num target={96} suffix="%" />, delta: "In stock", up: true },
  { icon: HeartPulse, label: "Account Health", value: <Num target={98} suffix="/100" />, delta: "Excellent", up: true },
];

const BARS = [42, 58, 50, 70, 64, 82, 76, 92, 86, 100];

export const CommandCenter = () => {
  const laptopRef = useRef(null);

  const onMove = (e) => {
    const r = laptopRef.current.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
    laptopRef.current.style.transform = `perspective(1400px) rotateX(${rx + 4}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    laptopRef.current.style.transform = "perspective(1400px) rotateX(4deg) rotateY(0deg)";
  };

  return (
    <section className="bg-[#0B1220] py-24 md:py-32 relative overflow-hidden" data-testid="command-center-section">
      <div className="cc-glow" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="font-numbers text-xs tracking-[0.35em] uppercase text-blue-400 mb-5">Marketplace Command Center</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]" data-testid="command-center-heading">
            Your entire marketplace,<br />on one screen.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-6 leading-relaxed">
            This is how we watch your business — revenue, orders, inventory and account
            health, monitored daily by your dedicated manager.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="laptop-stage"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div ref={laptopRef} className="laptop" data-testid="laptop-mockup">
            <div className="laptop-screen">
              <div className="dash" data-testid="dashboard-mockup">
                <div className="dash-side">
                  <span className="dash-logo" />
                  {[...Array(5)].map((_, i) => <span key={i} className={`dash-nav ${i === 0 ? "dash-nav-active" : ""}`} />)}
                </div>
                <div className="dash-main">
                  <div className="dash-head">
                    <div>
                      <p className="dash-title">Marketplace Overview</p>
                      <p className="dash-sub">Amazon · Flipkart · Meesho</p>
                    </div>
                    <span className="dash-live"><span className="dash-live-dot" /> LIVE</span>
                  </div>

                  <div className="dash-stats">
                    {STATS.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.label} className="dash-stat" data-testid={`dash-stat-${s.label.toLowerCase().replace(" ", "-")}`}>
                          <span className="dash-stat-icon"><Icon size={13} /></span>
                          <p className="dash-stat-label">{s.label}</p>
                          <p className="dash-stat-value font-numbers">{s.value}</p>
                          <span className="dash-stat-delta">{s.delta}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="dash-charts">
                    <div className="dash-panel dash-panel-wide">
                      <div className="flex items-center justify-between mb-3">
                        <p className="dash-panel-title"><TrendingUp size={12} className="inline mr-1.5 text-green-400" />Sales Growth</p>
                        <span className="dash-panel-tag font-numbers">12 weeks</span>
                      </div>
                      <div className="dash-bars">
                        {BARS.map((h, i) => (
                          <span key={i} className="dash-bar" style={{ "--h": `${h}%`, animationDelay: `${i * 0.08}s` }} />
                        ))}
                      </div>
                    </div>
                    <div className="dash-panel">
                      <p className="dash-panel-title mb-3"><Activity size={12} className="inline mr-1.5 text-blue-400" />Performance Score</p>
                      <div className="dash-ring-wrap">
                        <svg viewBox="0 0 100 100" className="dash-ring">
                          <circle cx="50" cy="50" r="42" className="dash-ring-bg" />
                          <circle cx="50" cy="50" r="42" className="dash-ring-fill" />
                        </svg>
                        <span className="dash-ring-num font-numbers"><Num target={94} /></span>
                      </div>
                      <p className="dash-ring-label">Growth indicators trending up</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-base" />
          </div>
          <p className="text-slate-500 text-xs text-center mt-10 italic" data-testid="dashboard-disclaimer">
            Illustrative dashboard preview — your real numbers are shared in weekly reports.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
