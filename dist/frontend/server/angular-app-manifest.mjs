
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/event/*"
  },
  {
    "renderMode": 0,
    "route": "/checkout"
  },
  {
    "renderMode": 0,
    "route": "/success"
  },
  {
    "renderMode": 0,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1090, hash: 'dd65b9f9333046e0be37ed8d97a0e7cc9af824039b82b87b48bf5ed4b643f57b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1630, hash: '8c68c9cfca44f5fd8860cec06f25deafac3ff185d5b4086672b29e02945ada99', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8483, hash: '0a00cf92c10e46cb128ea21a21db398abeef979df02aae4f285b6fd91d04939c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
