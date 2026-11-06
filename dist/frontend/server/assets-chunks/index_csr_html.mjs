export default `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>EventHub — Browse &amp; Book Live Event Tickets</title>
  <base href="/"/>

  <!-- Responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

  <!-- SEO -->
  <meta name="description" content="Browse upcoming events and buy tickets securely online. Powered by EventHub."/>
  <meta name="theme-color" content="#1a56db"/>

  <!-- Open Graph -->
  <meta property="og:title" content="EventHub — Browse &amp; Book Live Event Tickets"/>
  <meta property="og:description" content="Browse upcoming events and buy tickets securely online."/>
  <meta property="og:type" content="website"/>

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico"/>

  <!-- Prevent FOUC on mobile -->
  <style>
    body { margin: 0; background: #ffffff; }
  </style>

  <!-- Paystack Inline JS — required for popup payment flow -->
  <script src="https://js.paystack.co/v1/inline.js"></script>
<link rel="stylesheet" href="styles.css"></head>
<body ngcm="">
  <app-root></app-root>
<script src="scripts.js" defer=""></script><script src="main.js" type="module"></script></body>
</html>
`;