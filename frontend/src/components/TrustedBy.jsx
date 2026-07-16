import { ShoppingBag, Store, Package, Award, BadgeCheck, Building2 } from "lucide-react";

const ITEMS = [
  { icon: ShoppingBag, label: "Amazon Marketplace" },
  { icon: Store, label: "Flipkart Marketplace" },
  { icon: Package, label: "Meesho Marketplace" },
  { icon: Award, label: "9+ Years Experience" },
  { icon: BadgeCheck, label: "Marketplace Specialists" },
  { icon: Building2, label: "100+ Businesses", note: "placeholder until verified" },
];

export const TrustedBy = () => (
  <section className="trusted-band py-10 select-none" data-testid="trusted-by-marquee">
    <p className="font-numbers text-[11px] tracking-[0.4em] uppercase text-slate-500 text-center mb-7">
      Trusted Marketplace Growth Expertise
    </p>
    <div className="marquee-mask">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <div key={n} className="marquee-group" aria-hidden={n === 1}>
            {ITEMS.map(({ icon: Icon, label, note }) => (
              <span key={`${n}-${label}`} className="trust-chip" data-testid={n === 0 ? `trust-chip-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : undefined}>
                <Icon size={16} className="text-blue-400 shrink-0" />
                <span className="whitespace-nowrap">{label}</span>
                {note && <em className="text-[10px] text-slate-500 not-italic ml-1">({note})</em>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
