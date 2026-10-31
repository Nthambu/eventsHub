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
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">

.lp-hero[_ngcontent-ng-c2520364203] {
  padding: 40px 24px 28px;
  text-align: center;
}
.lp-hero-badge[_ngcontent-ng-c2520364203] {
  display: inline-block;
  background: #eef3ff;
  color: #1447c0;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}
.lp-hero-title[_ngcontent-ng-c2520364203] {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.lp-hero-sub[_ngcontent-ng-c2520364203] {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}
.lp-status[_ngcontent-ng-c2520364203] {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px;
  text-align: center;
}
.lp-status-title[_ngcontent-ng-c2520364203] {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.lp-status-sub[_ngcontent-ng-c2520364203] {
  font-size: 13px;
  color: var(--text-secondary);
}
.lp-status-text[_ngcontent-ng-c2520364203] {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 12px;
}
.lp-spinner[_ngcontent-ng-c2520364203] {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: #1a56db;
  border-radius: 50%;
  animation: _ngcontent-ng-c2520364203_lp-spin 0.8s linear infinite;
}
@keyframes _ngcontent-ng-c2520364203_lp-spin {
  to {
    transform: rotate(360deg);
  }
}
.lp-grid[_ngcontent-ng-c2520364203] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 32px 48px;
  max-width: 1280px;
  margin: 0 auto;
}
.event-card[_ngcontent-ng-c2520364203] {
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  border-radius: 14px;
  overflow: hidden;
}
.event-card[_ngcontent-ng-c2520364203]:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.15);
}
.event-card[_ngcontent-ng-c2520364203]:focus-visible {
  outline: 2px solid #1a56db;
  outline-offset: 2px;
}
.ecard-emoji[_ngcontent-ng-c2520364203] {
  font-size: 40px;
  position: relative;
  z-index: 0;
}
.ecard-img-photo[_ngcontent-ng-c2520364203] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.ecard-tags[_ngcontent-ng-c2520364203] {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}
.ecard-btn[_ngcontent-ng-c2520364203] {
  width: 100%;
  justify-content: center;
  font-size: 13px;
  padding: 9px;
  border-radius: 8px;
}
.meta-item[_ngcontent-ng-c2520364203] {
  display: block;
}
.nav-link--active[_ngcontent-ng-c2520364203] {
  color: #fff !important;
  font-weight: 500;
}
.lp-footer[_ngcontent-ng-c2520364203] {
  text-align: center;
  padding: 20px 24px;
  font-size: 11px;
  color: var(--text-muted);
  border-top: 0.5px solid var(--border);
}
.dropdown-menu[_ngcontent-ng-c2520364203] {
  animation: _ngcontent-ng-c2520364203_fadeIn 0.15s ease-out;
}
@keyframes _ngcontent-ng-c2520364203_fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 900px) {
  .lp-grid[_ngcontent-ng-c2520364203] {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 20px 36px;
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .lp-grid[_ngcontent-ng-c2520364203] {
    grid-template-columns: 1fr;
    padding: 0 14px 28px;
    gap: 14px;
  }
  .lp-hero[_ngcontent-ng-c2520364203] {
    padding: 22px 16px 18px;
  }
  .lp-hero-title[_ngcontent-ng-c2520364203] {
    font-size: 20px;
  }
}
@media (max-width: 768px) {
  .lp-hero[_ngcontent-ng-c2520364203] {
    padding: 28px 16px 20px;
  }
  .lp-hero-title[_ngcontent-ng-c2520364203] {
    font-size: 22px;
  }
}
/*# sourceMappingURL=/landing-page.css.map */</style></head>
<body><!--nghm-->
  <app-root ng-version="20.3.32" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-landing-page _nghost-ng-c2520364203="" ngh="0"><div _ngcontent-ng-c2520364203="" class="nav"><span _ngcontent-ng-c2520364203="" class="nav-logo">🎟️ EventHub</span><div _ngcontent-ng-c2520364203="" class="nav-links"><span _ngcontent-ng-c2520364203="" class="nav-link nav-link--active">Events</span></div></div><div _ngcontent-ng-c2520364203="" class="lp-hero"><div _ngcontent-ng-c2520364203="" class="lp-hero-badge">🎉 Live events near you</div><h1 _ngcontent-ng-c2520364203="" class="lp-hero-title">Upcoming Events</h1><p _ngcontent-ng-c2520364203="" class="lp-hero-sub">Browse and grab your tickets before they sell out</p></div><div _ngcontent-ng-c2520364203="" class="lp-status"><div _ngcontent-ng-c2520364203="" class="lp-spinner"></div><div _ngcontent-ng-c2520364203="" class="lp-status-text">Fetching events…</div></div><!--container--><!--container--><!--container--><footer _ngcontent-ng-c2520364203="" class="lp-footer"><span _ngcontent-ng-c2520364203="">© 2026 EventHub · Secure payments powered by Paystack</span></footer></app-landing-page><!--container--></app-root>
<script src="scripts.js" defer=""></script><script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"771307b75317f95e3eba3c5966327a06108eb656ebf808c016e9c85431d3a578":{"b":[{"id":"259dd734-b8cd-4dac-9c1f-7ca433d6f2c8","name":"futboll ke","description":"bayern vs ajax","venue":"Talanta stadium","city":"Nairobi","state":"Kenya","event_date":"2026-10-29T02:25:00.000Z","ticket_types":[{"name":"Frankline Nthamburi","price":2500,"available":200,"description":"Gen z connect"}],"facebook_url":"https://facebook.com","image_url":"https://facebook.com","active":true,"created_at":"2026-10-28T23:21:01.329Z","updated_at":"2026-10-28T23:21:01.329Z"},{"id":"d3353b91-2f8c-48eb-a54b-8f5434620179","name":"mixtest","description":"overnight with kali jones","venue":"city sinema","city":"Kampala","state":"Uganda","event_date":"2026-10-29T02:35:00.000Z","ticket_types":[{"name":"Frankline Nthamburi","price":2500,"available":200,"description":"millenuals vibe"}],"facebook_url":"https://facebook.com","image_url":"https://facebook.com","active":true,"created_at":"2026-10-28T23:32:30.203Z","updated_at":"2026-10-29T20:40:57.769Z"},{"id":"19552f80-0c93-402f-94e6-8e5cd2b38ae1","name":"Grand Opening: Raila Amollo International Stadium Talanta | FC Bayern Munich vs. AFC Ajax","description":"Join us for the historic, grand opening of the brand-new Raila Amollo International Stadium Talanta in Nairobi, Kenya! Celebrate this monumental sporting milestone with an elite, high-octane international friendly match between German powerhouse FC Bayern Munich and Dutch football giants AFC Ajax. Experience world-class football, live entertainment, and a celebration of Kenyan sporting excellence.","venue":"Raila Amollo International Stadium Talanta","city":"Nairobi","state":"Kenya","event_date":"2027-01-05T13:00:00.000Z","ticket_types":[{"name":"Regular Admission Ticket","price":50,"available":40000,"description":"Regular "},{"name":"VIP Hospitality Ticket","price":400,"available":20000,"description":"Vip"}],"facebook_url":"https://facebook.com","image_url":"https://res.cloudinary.com/gdlvxwfi/image/upload/v1793304545/mr4o0ewvs8wfiwrif7od.jpg","active":true,"created_at":"2026-10-29T20:11:53.924Z","updated_at":"2026-10-31T11:26:02.793Z"}],"h":{},"s":200,"st":"OK","u":"https://madfuns-backend.onrender.com/events","rt":"json"},"__nghData__":[{"t":{"13":"t0","14":"t1","15":"t2"},"c":{"13":[{"i":"t0","r":1}],"14":[],"15":[]}},{"c":{"0":[{"i":"c2520364203","r":1}]}}]}</script></body></html>`;