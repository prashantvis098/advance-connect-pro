# Advance Connect — Marketplace Growth Website (PRD)

## Original Problem Statement
Build India's most premium Marketplace Growth website for **Advance Connect** — a lead-generation machine (not a portfolio). 9+ years helping businesses sell on Amazon, Flipkart, Meesho. Scope for phase 1: Homepage only (Navigation, Hero with 3D command center, Logo, Loader, Trust Bar, Why Choose Us, Contact section, Design System).

## Verified Business Details
- Name: Advance Connect (Sole Proprietorship), Contact: Ritesh
- Phone/WhatsApp: +91 96695 03302 · Email: advanceconnectindiaa@gmail.com
- Location: Bhopal, Madhya Pradesh (exact office address TBD)
- Config single source of truth: `/app/frontend/src/config/business.js`
- **No fake stats allowed** — only "9+ Years" and "3 marketplaces" verified; other stats show elegant "Verified data coming soon" placeholders.

## Architecture
- **Frontend**: React 19, Tailwind, Framer Motion, Lenis smooth scroll, React Three Fiber + Drei (3D hero), sonner toasts. Fonts: Satoshi (headings), Inter (body), Space Grotesk (numbers).
- **Backend**: FastAPI + MongoDB (`leads` collection). Lead notifications emailed via Emergent-managed email proxy (Resend playbook) to business email — fire-and-forget so form never blocks.
- **Colors**: Primary #0B1220, Accent #2563EB, Success #22C55E, BG #F8FAFC.

## Implemented (June 2026 — Phase 1, tested 100% backend + frontend)
- Premium loader (animated AC logo stroke-draw, progress bar, blue glow)
- AC monogram logo (SVG, light/dark variants, favicon, animation)
- Glass sticky navbar (transparent → light glass on scroll, mobile menu)
- 3D Marketplace Command Center hero (floating glass dashboards, charts, particles, grid floor, mouse-parallax camera)
- Masked line-by-line hero headline reveal, magnetic CTA buttons
- Glass lead form (name/phone/email/business/marketplace/sales/challenge) → POST `/api/leads` → Mongo + email notification, inline success state
- Editorial marquee band, animated trust counters with verified/placeholder badges
- Why Choose Us: 7 numbered bento cards with 3D tilt hover
- Contact section: click-to-call / WhatsApp / email cards + Bhopal Google Maps embed + location card
- Footer, cursor glow + dot, fully responsive (no overflow at 390px)

## API
- `POST /api/leads` — create lead (validates email, min lengths), sends email notification
- `GET /api/leads` — list leads (⚠️ currently unauthenticated — protect when admin panel is built)

## Implemented (June 2026 — Phase 2, tested 100% frontend)
Full homepage now has 14 sections in order: Hero → Trusted By marquee (glass chips, "100+ Businesses" clearly marked placeholder) → About timeline (5 GSAP milestones + mini counters) → Why Choose Us (8 bento cards) → Marketplace Expertise (Amazon/Flipkart/Meesho spotlight cards) → Services bento (12 services, featured dark cards) → Command Center (3D-tilt laptop mockup with animated dashboard: revenue/orders/inventory/health, sales bars, performance ring, "illustrative" disclaimer) → Workflow (6-step GSAP vertical timeline) → Success Metrics (verified counters + placeholders) → Case Studies (3 placeholder scenarios, Challenge→Solution→Result, animated graphs) → Testimonials (auto-slider, video-style placeholders — no fake names) → FAQ (6-item glass accordion) → Contact → Footer. GSAP + ScrollTrigger added. New nav anchors: #about, #services, #case-studies.

## Implemented (June 2026 — Phase 3, tested 100%)
- **AI Marketplace Consultant**: floating glass chat widget (bottom-right) powered by GPT-5.4 via Emergent LLM key; streaming replies (`POST /api/chat`, text/plain stream, in-memory sessions + Mongo `chat_messages` log); suggested questions, typing animation, Book Consultation + WhatsApp CTAs; guided strictly by verified-facts system prompt (no fake stats).
- **Contact redesign**: split layout — 6 business info tiles (Ritesh, phone, WhatsApp, email, Bhopal, hours) + glass contact form (source=contact_form → /api/leads → email notification).
- **Map section**: glass Google Maps embed for Bhopal + Get Directions/Call/WhatsApp + office hours card.
- **Premium footer**: 4 columns, newsletter (`POST /api/newsletter`, idempotent upsert), social icons (toast placeholders), Privacy/Terms (toast placeholders), back-to-top.
- **Sticky lead gen**: floating WhatsApp/Call/Book buttons (bottom-left, appear after 700px scroll); 3 CTA bands (after Services, Success Metrics, FAQ).
- **SEO**: meta description/keywords, canonical, Open Graph, Twitter card, JSON-LD Organization + LocalBusiness schemas.

## API
- `POST /api/leads` — create lead + email notification · `GET /api/leads` (⚠️ unauthenticated)
- `POST /api/chat` — streaming AI consultant (GPT-5.4, Emergent LLM key; no rate limit yet)
- `POST /api/newsletter` — subscribe email (upsert)

## Implemented (June 2026 — Phase 4: Performance & Polish, tested 100%)
- Hero3D: particle count 500 (220 on low-end/mobile), 2 panels on mobile, dpr cap 1.25 mobile, rendering pauses (frameloop="never") when hero leaves viewport, memoized geometry.
- React.lazy for MapSection + AIConsultant; GSAP triggers once:true; reduced backdrop-blur; translate3d cursor; faster loader.
- Micro-interactions: button ripple, focus-visible outlines, skip-to-content link, prefers-reduced-motion, bigger touch targets.
- SEO: robots.txt, sitemap.xml, og:image (generated brand banner), twitter summary_large_image.
- QA (iteration_4): zero console errors, no overflow at 1920/1366/768/390/344, all forms/CTAs/AI chat verified.

## Backlog
- **P0**: Admin panel (protect GET /api/leads; view leads/chats/newsletter; edit placeholder stats); rate-limit /api/chat
- **P1**: Real Privacy Policy & Terms pages; real social profile URLs; real case studies/testimonials; exact office address on map
- **P2**: CRM/WhatsApp Business webhook for leads; auto-reply email to leads; og:image asset

## Notes
- Minor: marketplace select uses HTML5 `required`, so the custom JS toast for empty marketplace never fires (harmless).
- created_at stored as ISO string in Mongo (converted on read).
