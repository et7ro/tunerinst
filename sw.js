if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const o=s||("document"in self?document.currentScript.src:"")||location.href;if(e[o])return;let l={};const t=s=>i(s,o),u={module:{uri:o},exports:l,require:t};e[o]=Promise.all(r.map((s=>u[s]||t(s)))).then((s=>(n(...s),l)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/drums-B1UP0yVW.js",revision:null},{url:"assets/drums-CXWP4PG9.css",revision:null},{url:"assets/index-BDo-KuqO.css",revision:null},{url:"assets/index-C43-a9W6.js",revision:null},{url:"assets/metronome-B158qKWr.js",revision:null},{url:"assets/metronome-DM1SBZWR.css",revision:null},{url:"assets/metronome-worker.js",revision:null},{url:"assets/piano-B-nhTZQc.js",revision:null},{url:"assets/piano-Ce5Ks3cw.css",revision:null},{url:"assets/privacyPolicy-9Zf0ktr2.js",revision:null},{url:"assets/privacyPolicy-jzMfcNTw.css",revision:null},{url:"assets/settings-BiryZXB6.css",revision:null},{url:"assets/settings-DZnz9kw3.js",revision:null},{url:"assets/tuner-processor.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"index.html",revision:"91cf75d3914a02e74400ecc6f7a5752b"},{url:"./img/icons/android-chrome-192x192.png",revision:"5442cc2f94ea74454b8137fa7d9504c5"},{url:"./img/icons/android-chrome-512x512.png",revision:"8ae4d547320bf84241c02649e657e45e"},{url:"./img/icons/android-chrome-maskable-192x192.png",revision:"7d73f9740cba6704c98911b8638e1895"},{url:"./img/icons/android-chrome-maskable-512x512.png",revision:"2a3cdc880b74693d5c43b86629285711"},{url:"manifest.webmanifest",revision:"7100db4c073dd6f933c9bc8453ce028f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
