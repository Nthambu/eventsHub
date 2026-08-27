
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
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
    'index.csr.html': {size: 1198, hash: '41bf610abc63f576e2522f40803824f35de33bea0aeaf900659b5e15b8b8da28', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '1a492570ef6bc75bebbfa8cf5c10f216895089878873ec8acda0cde80995fd9e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7874, hash: 'bb065162ab80cb6f4fc5f35ac6c8fd77dced5c3ddabd0f2b3b0405ac6ba8a9e9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-7OKMOL4O.css': {size: 5567, hash: 'CnLuZNpFC+g', text: () => import('./assets-chunks/styles-7OKMOL4O_css.mjs').then(m => m.default)}
  },
};
