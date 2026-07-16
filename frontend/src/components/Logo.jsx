export const LogoMark = ({ size = 36, dark = false, animated = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={animated ? "ac-logo-animated" : ""}
    aria-label="Advance Connect logo"
  >
    <rect width="64" height="64" rx="16" fill={dark ? "#0B1220" : "#FFFFFF"} className="ac-logo-bg" />
    <path
      d="M14 44 L26 20 L32 32"
      fill="none"
      stroke="#2563EB"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ac-logo-stroke ac-stroke-a"
    />
    <path
      d="M50 24 A13 13 0 1 0 50 40"
      fill="none"
      stroke={dark ? "#F8FAFC" : "#0B1220"}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="ac-logo-stroke ac-stroke-c"
    />
    <circle cx="32" cy="32" r="3.4" fill="#22C55E" className="ac-logo-node" />
  </svg>
);

export const Logo = ({ dark = false, size = 36 }) => (
  <span className="flex items-center gap-3" data-testid="brand-logo">
    <LogoMark size={size} dark={dark} />
    <span
      className="font-heading font-bold tracking-tight leading-none"
      style={{ fontSize: size * 0.5, color: dark ? "#F8FAFC" : "#0B1220" }}
    >
      Advance<span style={{ color: "#2563EB" }}> Connect</span>
    </span>
  </span>
);
