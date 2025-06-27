import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_Byr6-Cev.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Blog/simp1e-lab/","cacheDir":"file:///C:/Blog/simp1e-lab/node_modules/.astro/","outDir":"file:///C:/Blog/simp1e-lab/dist/","srcDir":"file:///C:/Blog/simp1e-lab/src/","publicDir":"file:///C:/Blog/simp1e-lab/public/","buildClientDir":"file:///C:/Blog/simp1e-lab/dist/","buildServerDir":"file:///C:/Blog/simp1e-lab/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://simp1e-lab.com/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Blog/simp1e-lab/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/layouts/Header.astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/posts/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/layouts/Footer.astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Blog/simp1e-lab/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/posts/[...page]@_@astro":"pages/posts/_---page_.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro":"pages/tags/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_PGEhcl4l.mjs","C:/Blog/simp1e-lab/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:\\Blog\\simp1e-lab\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Blog\\simp1e-lab\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_OrdBxyyf.mjs","C:/Blog/simp1e-lab/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CE6J2Qcx.mjs","~/components/base/GithubContributions.tsx":"_astro/GithubContributions.BO26zM9k.js","C:/Blog/simp1e-lab/src/components/base/NumberTicker":"_astro/NumberTicker.Dzsy-h2a.js","~/components/theme/ThemeToggle":"_astro/ThemeToggle.DSIgtadQ.js","@astrojs/react/client.js":"_astro/client.CK7dU2eQ.js","C:/Blog/simp1e-lab/src/pages/404.astro?astro&type=script&index=0&lang.ts":"_astro/404.astro_astro_type_script_index_0_lang.B75roJm5.js","C:/Blog/simp1e-lab/src/components/posts/toc/PostFeatures.astro?astro&type=script&index=0&lang.ts":"_astro/PostFeatures.astro_astro_type_script_index_0_lang.Cn8d17yf.js","C:/Blog/simp1e-lab/src/components/base/SkillsShowcase.astro?astro&type=script&index=0&lang.ts":"_astro/SkillsShowcase.astro_astro_type_script_index_0_lang.IUgv9P34.js","C:/Blog/simp1e-lab/src/components/posts/base/Prose.astro?astro&type=script&index=0&lang.ts":"_astro/Prose.astro_astro_type_script_index_0_lang.PqB_i6uC.js","C:/Blog/simp1e-lab/src/components/base/ZoomImage.astro?astro&type=script&index=0&lang.ts":"_astro/ZoomImage.astro_astro_type_script_index_0_lang.Bb_pmk_p.js","C:/Blog/simp1e-lab/src/components/posts/toc/TableOfContents.astro?astro&type=script&index=0&lang.ts":"_astro/TableOfContents.astro_astro_type_script_index_0_lang.bD318NhW.js","C:/Blog/simp1e-lab/src/components/posts/toc/MobileTocModal.astro?astro&type=script&index=0&lang.ts":"_astro/MobileTocModal.astro_astro_type_script_index_0_lang.DvlaPwW7.js","C:/Blog/simp1e-lab/src/components/base/SearchSwitch.astro?astro&type=script&index=0&lang.ts":"_astro/SearchSwitch.astro_astro_type_script_index_0_lang.DFvaZyVj.js","C:/Blog/simp1e-lab/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.Cf2AfnBD.js","astro:scripts/page.js":"_astro/page.CPvyyiTs.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Blog/simp1e-lab/src/pages/404.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".animate-typing\").forEach(t=>{const e=t.textContent||\"\";t.style.setProperty(\"--typing-width\",`${e.length}ch`)})});"],["C:/Blog/simp1e-lab/src/components/posts/toc/PostFeatures.astro?astro&type=script&index=0&lang.ts","function n(){const t=document.querySelectorAll(\"#backToTop, #backToTopDesktop\");t.length&&(window.scrollY>300?t.forEach(o=>o.classList.remove(\"opacity-0\",\"invisible\",\"translate-y-4\")):t.forEach(o=>o.classList.add(\"opacity-0\",\"invisible\",\"translate-y-4\")))}function s(){document.querySelectorAll(\"#backToTop, #backToTopDesktop\").forEach(c=>{c.addEventListener(\"click\",()=>{window.scrollTo({top:0,behavior:\"smooth\"})})});const o=document.getElementById(\"tocTrigger\"),e=document.getElementById(\"tocModal\");o?.addEventListener(\"click\",()=>{e?.classList.remove(\"opacity-0\",\"pointer-events-none\")}),window.addEventListener(\"scroll\",n)}document.addEventListener(\"astro:page-load\",s);"],["C:/Blog/simp1e-lab/src/components/base/SkillsShowcase.astro?astro&type=script&index=0&lang.ts","function s(){const e=document.querySelectorAll(\".flex.w-max\"),n=window.innerWidth,t=20,o=Math.max(.5,Math.min(1.5,n/1e3)),a=`${t*o}s`;e.forEach(i=>{i.style.animationDuration=a})}window.addEventListener(\"before-swap\",s);"],["C:/Blog/simp1e-lab/src/components/posts/toc/TableOfContents.astro?astro&type=script&index=0&lang.ts","function p(){const o=document.querySelectorAll(\"h1[id], h2[id], h3[id], h4[id]\"),a=document.querySelectorAll(\"[data-desktop-heading-link]\"),n=document.querySelector(\"[data-desktop-toc-list]\"),d=n?.parentElement;if(!a.length)return;let l=null,s=null;const u=new IntersectionObserver(t=>{t.forEach(i=>{if(i.intersectionRatio>0){const e=i.target.id;if(l===e)return;l=e,a.forEach(r=>{r.getAttribute(\"href\")===`#${e}`?(r.setAttribute(\"data-active\",\"\"),s&&window.cancelAnimationFrame(s),s=window.requestAnimationFrame(()=>{if(n&&d){const f=d.offsetHeight,h=r,m=h.offsetTop,g=h.offsetHeight,v=n.offsetHeight;let c=Math.max(0,m-f/2+g/2);c=Math.min(c,v-f),n.style.transition=\"transform 0.3s ease-out\",n.style.transform=`translateY(-${c}px)`}})):r.removeAttribute(\"data-active\")})}})},{rootMargin:\"-10px 0px -85% 0px\",threshold:[0,1]});return o.forEach(t=>u.observe(t)),setTimeout(()=>{const t=Array.from(o).find(i=>{const e=i.getBoundingClientRect();return e.top>10&&e.top<window.innerHeight*.33});t?document.querySelector(`[href=\"#${t.id}\"]`)?.setAttribute(\"data-active\",\"\"):a[0]?.setAttribute(\"data-active\",\"\")},100),()=>u.disconnect()}document.addEventListener(\"astro:page-load\",()=>{const o=p();document.addEventListener(\"astro:before-swap\",()=>{o?.()})});"],["C:/Blog/simp1e-lab/src/components/posts/toc/MobileTocModal.astro?astro&type=script&index=0&lang.ts","function L(){const o=document.getElementById(\"tocModal\"),u=o?.querySelectorAll(\"[data-heading-link]\");let r=!1;o?.addEventListener(\"click\",t=>{const e=t.target;if(e.closest(\"#tocClose\")){o.classList.add(\"opacity-0\",\"pointer-events-none\");return}if(e===o){o.classList.add(\"opacity-0\",\"pointer-events-none\");return}e.closest(\"[data-heading-link]\")&&o.classList.add(\"opacity-0\",\"pointer-events-none\")});const f=t=>{r||t.forEach(e=>{if(e.intersectionRatio>0){const s=e.target.id;requestAnimationFrame(()=>{u?.forEach(n=>{n.getAttribute(\"href\")===`#${s}`?n.setAttribute(\"data-active\",\"\"):n.removeAttribute(\"data-active\")})})}})},c=new IntersectionObserver(f,{rootMargin:\"-10px 0px -85% 0px\",threshold:[0,1]});document.querySelectorAll(\"h1[id], h2[id], h3[id], h4[id]\").forEach(t=>c.observe(t));const a=document.getElementById(\"tocTrigger\"),l=()=>{const t=o?.querySelector(\"[data-active]\");if(!t)return;const e=t.closest(\".overflow-y-auto\");if(!e)return;r=!0;const s=t.offsetTop-e.offsetHeight/2+t.offsetHeight/2,n=e.scrollTop,g=s-n,m=300,p=performance.now(),d=v=>{const h=v-p,i=Math.min(h/m,1),E=i<.5?4*i**3:1-Math.pow(-2*i+2,3)/2;e.scrollTop=n+g*E,i<1?requestAnimationFrame(d):r=!1};requestAnimationFrame(d)};return a?.addEventListener(\"click\",()=>{setTimeout(l,200)}),()=>{c.disconnect(),a?.removeEventListener(\"click\",l)}}document.addEventListener(\"astro:page-load\",()=>{const o=L();document.addEventListener(\"astro:before-swap\",()=>{o?.()})});"],["C:/Blog/simp1e-lab/src/components/base/SearchSwitch.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"search-input\"),e=document.getElementById(\"search-mask\"),p=document.getElementById(\"search-switch\"),t=document.getElementById(\"search-results\"),m=()=>{e?.classList.remove(\"hidden\"),e?.offsetHeight,e?.classList.remove(\"opacity-0\"),n?.focus()},o=()=>{e?.classList.add(\"opacity-0\"),n&&(n.value=\"\"),t&&(t.innerHTML=\"\"),setTimeout(()=>{e?.classList.add(\"hidden\")},200)},h=()=>{e?.classList.add(\"opacity-0\"),n&&(n.value=\"\"),t&&(t.innerHTML=\"\"),e?.classList.add(\"hidden\")};p?.addEventListener(\"click\",m);e?.addEventListener(\"click\",s=>{s.target===e&&o()});document.addEventListener(\"keydown\",s=>{s.key===\"Escape\"&&o(),s.ctrlKey&&s.key.toLowerCase()===\"k\"&&(s.preventDefault(),e?.classList.contains(\"hidden\")?m():o())});const v=async s=>{t&&(t.innerHTML=\"\");{const f=s.target,l=await pagefind.debouncedSearch(f.value);if(!l?.results&&l?.results.length===0){const a=document.createElement(\"div\");a.className=\"search-results-item text-center py-4 text-muted-foreground\",a.textContent=\"No results found\",t?.appendChild(a);return}if(l?.results)for(const a of l?.results){const c=await a.data(),r=document.createElement(\"a\");if(r.href=c.url,r.className=\"search-results-item\",r.innerHTML=`\n          <div class=\"search-results-title\">${c.meta.title}</div>\n          <div class=\"search-results-excerpt\">${c.excerpt}</div>\n        `,r.addEventListener(\"click\",h),t?.appendChild(r),c.sub_results)for(const d of c.sub_results){if(d.excerpt===c.excerpt)continue;const u=d.title.replace(/\\s*[Hh][1-6]$/g,\"\");if(!u)continue;const i=document.createElement(\"a\");i.href=d.url,i.className=\"search-results-item sub-result pl-4 border-l-2 border-accent\",i.innerHTML=`\n              <div class=\"search-results-title text-sm opacity-80\">${u}</div>\n              <div class=\"search-results-excerpt text-xs\">${d.excerpt}</div>\n            `,i.addEventListener(\"click\",h),t?.appendChild(i)}}}};n?.addEventListener(\"input\",v);"]],"assets":["/_astro/ec.e29js.css","/_astro/ec.8zarh.js","/_astro/index.CHrOP1yM.css","/apple-touch-icon.png","/favicon-16x16.png","/favicon-192x192.png","/favicon-2048x2048.png","/favicon-32x32.png","/favicon-512x512.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/og-image.jpg","/site.webmanifest","/fonts/DMMono-LICENSE.txt","/fonts/DMMono-Medium.ttf","/fonts/DMMono-Medium.woff2","/fonts/DMMono-Regular.ttf","/fonts/DMMono-Regular.woff2","/fonts/Geist-LICENSE.txt","/fonts/Geist[wght].woff2","/fonts/Lexend-LiCENSE.txt","/fonts/Lexend-VariableFont_wght.woff2","/fonts/Onest-LICENSE.txt","/fonts/Onest[wght].woff2","/fonts/ShangguSans-LICENSE.txt","/fonts/ShangguSansSC-VF.ttf","/fonts/ShangguSansSC-VF.woff2","/fonts/ZhudouSans-LICENSE.txt","/fonts/ZhudouSansVF-subset.woff2","/js/theme.js","/rss/styles.xsl","/projects/logo.png","/_astro/client.CK7dU2eQ.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.Cf2AfnBD.js","/_astro/GithubContributions.BO26zM9k.js","/_astro/index.DP00RREz.js","/_astro/index.mLUF0Zv5.js","/_astro/index.U3IA9L3b.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/NumberTicker.Dzsy-h2a.js","/_astro/page.CPvyyiTs.js","/_astro/Prose.astro_astro_type_script_index_0_lang.PqB_i6uC.js","/_astro/proxy.CNAGiAmR.js","/_astro/ThemeToggle.DSIgtadQ.js","/_astro/utils.Bzm_o1ou.js","/_astro/ZoomImage.astro_astro_type_script_index_0_lang.Bb_pmk_p.js","/fonts/woff2-fonts/DMMono-Medium.woff2","/fonts/woff2-fonts/DMMono-Regular.woff2","/fonts/woff2-fonts/ShangguSansSC-VF.woff2","/prismjs/themes/prism-vsc-dark-plus.css","/_astro/page.CPvyyiTs.js","/404.html","/robots.txt","/rss.xml","/tags/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"jbZvAJjLDK2sspHNfSoiB7kTd+3dn/n27hGYPT+2LQ4=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Blog\\simp1e-lab\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
