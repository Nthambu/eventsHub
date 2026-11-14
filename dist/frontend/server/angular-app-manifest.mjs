
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
    'index.csr.html': {size: 1226, hash: '92fca692c2c52b7c9112cdc1bb7e4a1e3b8df0a68b748fa5863cc30a8d093371', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1766, hash: 'e2512b6743cf1f014e58604e07bb03d94607d71c14e89f09746fcacaa4c9b279', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 12201, hash: 'c3d04dcced23781fd66ef9d8f1f0b7cf0f93266ab438fedf5a47f7e027aba50c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
