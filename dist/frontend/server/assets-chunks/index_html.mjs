export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>EventHub — Browse &amp; Book Live Event Tickets</title>
  <base href="/">

  <!-- Responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

  <!-- SEO -->
  <meta name="description" content="Browse upcoming events and buy tickets securely online. Powered by EventHub.">
  <meta name="theme-color" content="#1a56db">

  <!-- Open Graph -->
  <meta property="og:title" content="EventHub — Browse &amp; Book Live Event Tickets">
  <meta property="og:description" content="Browse upcoming events and buy tickets securely online.">
  <meta property="og:type" content="website">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- Prevent FOUC on mobile -->
  <style>
    body { margin: 0; background: #ffffff; }
  </style>
  <!-- Paystack Inline JS — loaded once, used by checkout component -->
  <script src="https://js.paystack.co/v1/inline.js"></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">

.nav[_ngcontent-ng-c3483483169] {
  height: 60px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.nav-brand[_ngcontent-ng-c3483483169] {
  display: flex;
  align-items: center;
  gap: 14px;
}
.nav-logo[_ngcontent-ng-c3483483169] {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.nav-badge-fifa[_ngcontent-ng-c3483483169] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(26, 86, 219, 0.18);
  border: 1px solid #1a56db;
  color: #93c5fd;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.fifa-svg[_ngcontent-ng-c3483483169] {
  width: 44px;
  height: 16px;
  fill: #60a5fa;
}
.lp-hero[_ngcontent-ng-c3483483169] {
  padding: 36px 20px 32px;
  text-align: center;
  background:
    linear-gradient(
      180deg,
      #f8fafc 0%,
      #ffffff 100%);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.hero-strip-wrapper[_ngcontent-ng-c3483483169] {
  width: 100%;
  overflow: hidden;
  margin-bottom: 24px;
  -webkit-mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%);
  mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%);
}
.hero-strip[_ngcontent-ng-c3483483169] {
  display: flex;
  gap: 10px;
  width: max-content;
  animation: _ngcontent-ng-c3483483169_strip-scroll 10s linear infinite;
}
.hero-strip[_ngcontent-ng-c3483483169]:hover {
  animation-play-state: paused;
}
@keyframes _ngcontent-ng-c3483483169_strip-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.strip-tile[_ngcontent-ng-c3483483169] {
  width: 100px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.strip-tile-img[_ngcontent-ng-c3483483169] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 10px;
}
.strip-tile-emoji[_ngcontent-ng-c3483483169] {
  font-size: 24px;
  z-index: 0;
  opacity: 0.6;
}
.lp-hero-title[_ngcontent-ng-c3483483169] {
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10px;
  letter-spacing: -0.03em;
  text-align: center;
}
.lp-hero-sub[_ngcontent-ng-c3483483169] {
  font-size: 15px;
  color: #64748b;
  max-width: 620px;
  margin: 0 auto;
  text-align: center;
}
.lp-grid[_ngcontent-ng-c3483483169] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
  padding: 36px 32px 56px;
  max-width: 1280px;
  margin: 0 auto;
}
.event-card[_ngcontent-ng-c3483483169] {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  cursor: pointer;
}
.event-card[_ngcontent-ng-c3483483169]:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.16);
  border-color: #cbd5e1;
}
.ecard-img[_ngcontent-ng-c3483483169] {
  width: 100%;
  height: 230px;
  min-height: 230px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
}
.ecard-img-photo[_ngcontent-ng-c3483483169] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.ecard-emoji[_ngcontent-ng-c3483483169] {
  font-size: 44px;
  z-index: 0;
}
.fifa-event-pill[_ngcontent-ng-c3483483169] {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: rgba(15, 23, 42, 0.85);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #f8fafc;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 0.02em;
}
.ecard-body[_ngcontent-ng-c3483483169] {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 20px;
  gap: 16px;
}
.ecard-header-group[_ngcontent-ng-c3483483169] {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.ecard-title[_ngcontent-ng-c3483483169] {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 8px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
}
.ecard-meta[_ngcontent-ng-c3483483169] {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
  text-align: center;
}
.meta-item[_ngcontent-ng-c3483483169] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.ecard-tags-wrapper[_ngcontent-ng-c3483483169] {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
}
.ecard-tags[_ngcontent-ng-c3483483169] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6px;
}
.tag-blue[_ngcontent-ng-c3483483169] {
  background: #eff6ff;
  color: #000000;
  border: 1px solid #dbeafe;
  font-weight: 600;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 20px;
}
.ecard-action[_ngcontent-ng-c3483483169] {
  width: 100%;
  margin-top: auto;
}
.ecard-btn[_ngcontent-ng-c3483483169] {
  width: 100%;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  background: #1a56db;
}
.ecard-btn[_ngcontent-ng-c3483483169]:hover {
  background: #1e40af;
}
.lp-footer[_ngcontent-ng-c3483483169] {
  text-align: center;
  padding: 24px;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lp-footer-sub[_ngcontent-ng-c3483483169] {
  font-size: 11px;
  color: #94a3b8;
}
@media (max-width: 1024px) {
  .lp-grid[_ngcontent-ng-c3483483169] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .lp-grid[_ngcontent-ng-c3483483169] {
    grid-template-columns: 1fr;
    padding: 20px 16px 40px;
  }
  .lp-hero-title[_ngcontent-ng-c3483483169] {
    font-size: 24px;
  }
}
/*# sourceMappingURL=/landing-page.css.map */</style></head>
<body><!--nghm-->
  <app-root ng-version="20.3.32" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-landing-page _nghost-ng-c3483483169="" ngh="0"><header _ngcontent-ng-c3483483169="" class="nav"><div _ngcontent-ng-c3483483169="" class="nav-brand"><span _ngcontent-ng-c3483483169="" class="nav-logo">🎟️ EventHub</span><span _ngcontent-ng-c3483483169="" class="nav-badge-fifa"><svg _ngcontent-ng-c3483483169="" viewBox="0 0 100 24" fill="currentColor" class="fifa-svg"><text _ngcontent-ng-c3483483169="" x="2" y="18" font-family="Arial Black, Impact, sans-serif" font-size="20" font-weight="900" letter-spacing="1.5">FIFA</text></svg><span _ngcontent-ng-c3483483169="">SANCTIONED FIXTURE</span></span></div><div _ngcontent-ng-c3483483169="" class="nav-links"><!--container--><span _ngcontent-ng-c3483483169="" class="nav-link nav-link--active">Upcoming Matches &amp; Events</span></div></header><section _ngcontent-ng-c3483483169="" class="lp-hero"><!--container--><h1 _ngcontent-ng-c3483483169="" class="lp-hero-title">Official Match Tickets &amp; Events</h1><p _ngcontent-ng-c3483483169="" class="lp-hero-sub">Select your ticket category and secure verified seats instantly via Paystack</p></section><div _ngcontent-ng-c3483483169="" class="lp-status"><div _ngcontent-ng-c3483483169="" class="lp-spinner"></div><div _ngcontent-ng-c3483483169="" class="lp-status-text">Fetching official events…</div></div><!--container--><!--container--><!--container--><footer _ngcontent-ng-c3483483169="" class="lp-footer"><div _ngcontent-ng-c3483483169="">© 2026 Madfuns Ticketing · Talanta Stadium International Showcase</div><div _ngcontent-ng-c3483483169="" class="lp-footer-sub">🛡️ PCI DSS Level 1 Certified Payments via Paystack</div></footer></app-landing-page><!--container--></app-root>
<script src="scripts.js" defer=""></script><script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"771307b75317f95e3eba3c5966327a06108eb656ebf808c016e9c85431d3a578":{"b":[{"id":"259dd734-b8cd-4dac-9c1f-7ca433d6f2c8","name":"futboll ke","description":"bayern vs ajax","venue":"Talanta stadium","city":"Nairobi","state":"Kenya","event_date":"2026-10-29T02:25:00.000Z","ticket_types":[{"name":"Frankline Nthamburi","price":2500,"available":200,"description":"Gen z connect"}],"facebook_url":"https://facebook.com","image_url":"https://facebook.com","active":true,"created_at":"2026-10-28T23:21:01.329Z","updated_at":"2026-10-28T23:21:01.329Z"},{"id":"d3353b91-2f8c-48eb-a54b-8f5434620179","name":"mixtest","description":"overnight with kali jones","venue":"city sinema","city":"Kampala","state":"Uganda","event_date":"2026-10-29T02:35:00.000Z","ticket_types":[{"name":"Frankline Nthamburi","price":1,"available":20,"description":"millenuals vibe"}],"facebook_url":"https://facebook.com","image_url":"https://facebook.com","active":true,"created_at":"2026-10-28T23:32:30.203Z","updated_at":"2026-10-31T22:02:12.217Z"},{"id":"19552f80-0c93-402f-94e6-8e5cd2b38ae1","name":"Grand Opening: Raila Amollo International Stadium Talanta | FC Bayern Munich vs. AFC Ajax","description":"Join us for the historic, grand opening of the brand-new Raila Amollo International Stadium Talanta in Nairobi, Kenya! Celebrate this monumental sporting milestone with an elite, high-octane international friendly match between German powerhouse FC Bayern Munich and Dutch football giants AFC Ajax. Experience world-class football, live entertainment, and a celebration of Kenyan sporting excellence.","venue":"Raila Amollo International Stadium Talanta","city":"Nairobi","state":"Kenya","event_date":"2027-01-05T13:00:00.000Z","ticket_types":[{"name":"Regular Admission Ticket","price":50,"available":40000,"description":"Regular "},{"name":"VIP Hospitality Ticket","price":400,"available":20000,"description":"Vip"}],"facebook_url":"https://facebook.com","image_url":"https://res.cloudinary.com/gdlvxwfi/image/upload/v1793304545/mr4o0ewvs8wfiwrif7od.jpg","active":true,"created_at":"2026-10-29T20:11:53.924Z","updated_at":"2026-10-31T11:26:02.793Z"}],"h":{},"s":200,"st":"OK","u":"https://madfuns-backend.onrender.com/events","rt":"json"},"__nghData__":[{"t":{"11":"t0","15":"t1","20":"t2","21":"t3","22":"t4"},"c":{"11":[],"15":[],"20":[{"i":"t2","r":1}],"21":[],"22":[]}},{"c":{"0":[{"i":"c3483483169","r":1}]}}]}</script></body></html>`;