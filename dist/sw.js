if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),f={module:{uri:t},exports:o,require:c};i[t]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-17862d8c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.js",revision:"011319a9ce698511ff12607e2ff3371d"},{url:"index.html",revision:"2c113093158eeb5746cd4920fb6033d9"},{url:"main.css",revision:"2b1f14e9ebcc4407c37a9699b9951a28"},{url:"manifest.json",revision:"a6276811ee556e407b35c721a8f25695"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
