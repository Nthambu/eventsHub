
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
    'index.csr.html': {size: 1219, hash: 'da5f35f6c623ff493fea12bc820485067891c550a8b070c59d5981e276a9d605', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1759, hash: '0b593e7f6019981b7929dcf2f458d33b409ede86c4f814e0632c406af34e5b64', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7149, hash: 'd5c279db40f8aa1819916a7f6bbe08bb22aa87a2f2e547f2d6d7e32be0d6a701', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
