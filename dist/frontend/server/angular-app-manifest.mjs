
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
    'index.html': {size: 12187, hash: 'a7bd4fb508e7f79008625d594f7b625d3d82d1693b32e948cb83ba3f26c83a38', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
