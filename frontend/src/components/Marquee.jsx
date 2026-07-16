const ITEMS = [
  "Amazon", "Flipkart", "Meesho", "Account Management", "Advertising",
  "Catalog Optimization", "Growth Strategy", "9+ Years of Expertise",
];

export const Marquee = () => (
  <div className="marquee-band py-5 select-none" data-testid="editorial-marquee" aria-hidden="true">
    <div className="marquee-track">
      {[0, 1].map((n) => (
        <div key={n} className="marquee-group">
          {ITEMS.map((t) => (
            <span key={`${n}-${t}`} className="marquee-item font-heading">
              {t} <span className="text-blue-500 mx-6">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
