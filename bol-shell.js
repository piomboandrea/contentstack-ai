/* BOL-SHELL: de echte look and feel van partnerplatform.bol.com rond elke variant.
   Tekent de header (blauwe balk met logo, zoekbalk, Nieuws & Storingen, Account, NL; witte navigatierij met
   Beleid, Aanbod, Bestellingen & Verzenden, Zichtbaarheid, Financiën en de gele knop Start met verkopen),
   de breadcrumb van deze pagina en de blauwe footer. Laadt de echte bol-fonts (Graphik en Produkt, met CORS
   vrijgegeven op assets.s-bol.com) en zet alle bol-tokens als CSS-variabelen op :root.

   Gebruik (synchroon, als EERSTE element in <body>, niet in <head> en zonder defer):
     <body>
       <script src="../bol-shell.js"></script>
       <main class="bolx-content"> ... de variant ... </main>
     </body>

   Opties, vóór het script zetten:
     window.BOL_SHELL = { breadcrumb: false }   // variant tekent zelf de breadcrumb in haar hero
     window.BOL_SHELL = { sticky: false }       // header niet sticky (voor gepinde scroll-scènes)

   Tokens (op :root, gebruik ze in je eigen CSS):
     --bol-blue           #0000A4   merkblauw: header, footer, titels (brand-background-high / brand-text-high)
     --bol-blue-action    #0000FF   interactief: primaire knop, links (brand-interactive-default)
     --bol-blue-hover     #0561FD   hover op knoppen en links
     --bol-blue-low       #D2E1FF   lichtblauw vlak (brand-background-low)
     --bol-blue-minimal   #EDF3FF   heel licht blauw vlak (brand-background-minimal)
     --bol-ink            #131313   tekst
     --bol-ink-medium     #6D6D6D   secundaire tekst
     --bol-border         #D8D8D8   lijnen en randen
     --bol-grey           #F6F6F6   lichtgrijs vlak (neutral-background-medium)
     --bol-disabled       #E9E9E9
     --bol-yellow         #FDB501   accent 1: gele knop Start met verkopen (donkere tekst erop)
     --bol-orange         #FB9700   accent 1 hover
     --bol-red            #CC0720   accent 2 (enkel voor fouten of nadruk, spaarzaam)
     --bol-green          #045338   accent 3 (enkel spaarzaam)
     --bol-bronze         #FFE0C7   partnerkleur (badge)
     --bol-radius-1/2/4/6 4px / 8px / 16px / 24px
     --bol-shadow-1/2     de twee bol-schaduwen
     --bol-font-body      Graphik (400 en 600)
     --bol-font-display   Produkt (300, 700 en 900; koppen in 700, grote titels in 900)
     --bol-container      1200px
     --bol-header-h       hoogte van de sticky header (152px desktop, 80px gsm), voor je eigen sticky/top

   API: BolShell.base (map van de schil, bv. '../'), BolShell.headerHeight(), BolShell.tokens. */
(function () {
  'use strict';
  if (window.BolShell) return;
  var d = document;
  var me = d.currentScript;
  var opts = window.BOL_SHELL || {};
  var src = (me && me.getAttribute('src')) || 'bol-shell.js';
  var base = src.replace(/bol-shell\.js.*$/, '');
  var PP = 'https://partnerplatform.bol.com';

  /* fonts: de echte bol-fonts, CORS staat open op assets.s-bol.com */
  var F = 'https://assets.s-bol.com/nl/static/assets/webfonts/';
  var fonts = d.createElement('style');
  fonts.textContent = [
    '@font-face{font-family:Graphik;src:url(' + F + 'Graphik/Graphik-Regular-Web.woff2)format("woff2");font-weight:400;font-style:normal;font-display:swap}',
    '@font-face{font-family:Graphik;src:url(' + F + 'Graphik/Graphik-Semibold-Web.woff2)format("woff2");font-weight:600;font-style:normal;font-display:swap}',
    '@font-face{font-family:Produkt;src:url(' + F + 'Produkt/Produkt-Light-Web.woff2)format("woff2");font-weight:300;font-style:normal;font-display:swap}',
    '@font-face{font-family:Produkt;src:url(' + F + 'Produkt/Produkt-Bold-Web.woff2)format("woff2");font-weight:700;font-style:normal;font-display:swap}',
    '@font-face{font-family:Produkt;src:url(' + F + 'Produkt/Produkt-Super-Web.woff2)format("woff2");font-weight:900;font-style:normal;font-display:swap}'
  ].join('');
  d.head.appendChild(fonts);

  var T = {
    blue: '#0000A4', blueAction: '#0000FF', blueHover: '#0561FD', blueLow: '#D2E1FF', blueMinimal: '#EDF3FF',
    ink: '#131313', inkMedium: '#6D6D6D', border: '#D8D8D8', grey: '#F6F6F6', disabled: '#E9E9E9',
    yellow: '#FDB501', orange: '#FB9700', red: '#CC0720', green: '#045338', bronze: '#FFE0C7',
    radius1: '4px', radius2: '8px', radius4: '16px', radius6: '24px',
    shadow1: '0 2px 2px rgba(3,3,27,.08), 0 0 2px rgba(3,3,27,.16)',
    shadow2: '0 3px 3px rgba(3,3,27,.08), 0 0 3px rgba(3,3,27,.16)',
    fontBody: 'Graphik, Arial, Helvetica, sans-serif', fontDisplay: 'Produkt, Arial, Helvetica, sans-serif',
    container: '1200px'
  };

  var page = d.createElement('style');
  page.textContent = [
    ':root{--bol-blue:' + T.blue + ';--bol-blue-action:' + T.blueAction + ';--bol-blue-hover:' + T.blueHover + ';--bol-blue-low:' + T.blueLow + ';--bol-blue-minimal:' + T.blueMinimal + ';',
    '--bol-ink:' + T.ink + ';--bol-ink-medium:' + T.inkMedium + ';--bol-border:' + T.border + ';--bol-grey:' + T.grey + ';--bol-disabled:' + T.disabled + ';',
    '--bol-yellow:' + T.yellow + ';--bol-orange:' + T.orange + ';--bol-red:' + T.red + ';--bol-green:' + T.green + ';--bol-bronze:' + T.bronze + ';',
    '--bol-radius-1:4px;--bol-radius-2:8px;--bol-radius-4:16px;--bol-radius-6:24px;',
    '--bol-shadow-1:' + T.shadow1 + ';--bol-shadow-2:' + T.shadow2 + ';',
    '--bol-font-body:' + T.fontBody + ';--bol-font-display:' + T.fontDisplay + ';--bol-container:1200px;--bol-header-h:152px}',
    '@media (max-width:767px){:root{--bol-header-h:80px}}',
    'html{background:#fff}',
    'body{margin:0;background:#fff;color:var(--bol-ink);font:400 16px/24px var(--bol-font-body);-webkit-font-smoothing:antialiased}',
    '.bolx-content{display:block;min-height:60vh}'
  ].join('');
  d.head.appendChild(page);

  var I = {
    search: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M10 2a8 8 0 1 0 4.906 14.32l5.387 5.387a1 1 0 0 0 1.414-1.414l-5.387-5.387A8 8 0 0 0 10 2m-6 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0" clip-rule="evenodd"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10M9 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-5 13a8 8 0 1 1 16 0 1 1 0 1 0 2 0c0-5.523-4.477-10-10-10S2 14.477 2 20a1 1 0 1 0 2 0" clip-rule="evenodd"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 2a7 7 0 0 0-7 7v3.586l-1.707 1.707A1 1 0 0 0 4 16h16a1 1 0 0 0 .707-1.707L19 12.586V9a7 7 0 0 0-7-7m5 10.586V9A5 5 0 0 0 7 9v3.586L6.414 14h11.172zM9 18a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 1 1 2 0 4 4 0 0 1-8 0 1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>',
    chevDown: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M5.293 8.793a1 1 0 0 1 1.414 0L12 14.086l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M9.793 16.707a1 1 0 0 1 0-1.414L13.086 12 9.793 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0" clip-rule="evenodd"/></svg>',
    chevLeft: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M14.207 16.707a1 1 0 0 0 0-1.414L10.914 12l3.293-3.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414 0" clip-rule="evenodd"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"/></svg>'
  };

  var nav = [
    ['Beleid', '/nl/l1op/beleid'], ['Aanbod', '/nl/l1op/aanbod'], ['Bestellingen &amp; Verzenden', '/nl/l1op/bestellingen-en-verzenden'],
    ['Zichtbaarheid', '/nl/l1op/zichtbaarheid'], ['Financi&euml;n', '/nl/l1op/financien']
  ];
  var crumbs = [
    ['Beleid', '/nl/l1op/beleid'], ['Verzend- &amp; Retourbeleid', '/nl/l2op/verzend-en-retour-beleid'],
    ['Bestelling behandelen en verzenden via eigen verzending', '/nl/idp/bestelling-behandelen-en-verzenden-via-eigen-verzendwijze'],
    ['Ontdek Fulfilment Partners via bol', null]
  ];

  /* ---------- header (shadow DOM, zodat de CSS van de variant hem niet raakt) ---------- */
  var host = d.createElement('div');
  host.className = 'bolx-header';
  host.style.cssText = 'display:block;' + (opts.sticky === false ? 'position:relative;' : 'position:sticky;top:0;') + 'z-index:900';
  var sr = host.attachShadow({ mode: 'open' });
  var css = [
    ':host{all:initial;display:block;font-family:' + T.fontBody + ';-webkit-font-smoothing:antialiased;color:' + T.ink + '}',
    '*{box-sizing:border-box}',
    'a{color:inherit;text-decoration:none}',
    'svg{width:24px;height:24px;display:block}',
    '.top{background:' + T.blue + ';color:#fff}',
    '.wrap{max-width:' + T.container + ';margin:0 auto;padding:16px}',
    '.r1{display:flex;align-items:center;gap:24px}',
    '@media (min-width:1024px){.r1{gap:80px}}',
    '.logo img{height:24px;width:auto;display:block}',
    '.search{flex:1;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;height:48px;background:#fff;border-radius:999px;padding:0 16px;border:1px solid ' + T.border + ';color:' + T.inkMedium + '}',
    '.search:focus-within{border:2px solid ' + T.blueAction + ';padding:0 15px}',
    '.search input{min-width:0;border:0;outline:0;font:400 16px/24px ' + T.fontBody + ';color:' + T.ink + ';background:none}',
    '.search input::placeholder{color:' + T.inkMedium + '}',
    '.search .go{color:' + T.blueAction + '}',
    '.right{display:flex;align-items:center;gap:24px;white-space:nowrap;font-size:16px;line-height:24px}',
    '.right a,.right button{display:inline-flex;align-items:center;gap:8px;background:none;border:0;padding:0;font:inherit;color:#fff;cursor:pointer}',
    '.right a:hover,.right button:hover{text-decoration:underline}',
    '.mob{display:none}',
    '.nav{background:#fff;border-bottom:1px solid ' + T.border + '}',
    '.nav .wrap{display:flex;align-items:center;gap:20px}',
    '.nav ul{display:flex;gap:8px;list-style:none;margin:0;padding:0}',
    '.nav li a{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;font-size:16px;line-height:24px;transition:background-color .2s,color .2s}',
    '.nav li a:hover{background:' + T.blueHover + ';color:#fff}',
    '.start{margin-left:auto;display:inline-flex;align-items:center;height:48px;padding:0 15px;border-radius:8px;border:1px solid transparent;background:' + T.yellow + ';color:' + T.ink + ';font-weight:600;font-size:14px;line-height:20px;transition:background-color .15s,box-shadow .15s}',
    '.start:hover{background:' + T.orange + ';box-shadow:' + T.shadow2 + '}',
    '@media (max-width:767px){.nav{display:none}.r1{gap:12px}.search,.right .lbl,.right .nl,.right .news{display:none}.mob{display:inline-flex}.right{gap:16px}.wrap{padding:16px}}'
  ].join('');
  var h = '<style>' + css + '</style>' +
    '<div class="top"><div class="wrap"><div class="r1">' +
      '<a class="logo" href="' + PP + '/nl" aria-label="Partnerplatform van bol"><img src="' + base + 'img/partnerplatform-logo.svg" alt="bol partnerplatform"></a>' +
      '<form class="search" role="search" onsubmit="return false"><span>' + I.search + '</span><input type="search" placeholder="Waar ben je naar op zoek?" aria-label="Zoeken op het partnerplatform"><span class="go"></span></form>' +
      '<div class="right">' +
        '<a class="news" href="' + PP + '/nl/nuop/nieuws-en-storingen">Nieuws &amp; Storingen</a>' +
        '<button type="button" aria-label="Account">' + I.user + '<span class="lbl">Account</span></button>' +
        '<button type="button" class="nl" aria-label="Taal: Nederlands">NL' + I.chevDown + '</button>' +
        '<button type="button" class="mob" aria-label="Zoeken">' + I.search + '</button>' +
        '<button type="button" class="mob" aria-label="Menu">' + I.menu + '</button>' +
      '</div>' +
    '</div></div></div>' +
    '<nav class="nav" aria-label="Hoofdnavigatie"><div class="wrap"><ul>' +
      nav.map(function (n) { return '<li><a href="' + PP + n[1] + '">' + n[0] + I.chevDown + '</a></li>'; }).join('') +
    '</ul><a class="start" href="' + PP + '/nl/cdp/verkopen-via-bol">Start met verkopen</a></div></nav>';
  sr.innerHTML = h;

  /* ---------- breadcrumb ---------- */
  var bc = null;
  if (opts.breadcrumb !== false) {
    bc = d.createElement('div');
    bc.className = 'bolx-breadcrumb';
    var sb = bc.attachShadow({ mode: 'open' });
    var last = crumbs[crumbs.length - 1], parent = crumbs[crumbs.length - 2];
    sb.innerHTML = '<style>' +
      ':host{all:initial;display:block;font-family:' + T.fontBody + ';-webkit-font-smoothing:antialiased;color:' + T.ink + '}' +
      'ol{max-width:' + T.container + ';margin:0 auto;padding:24px 16px 0;list-style:none;display:flex;flex-wrap:wrap;align-items:center;font-size:12px;line-height:16px}' +
      'li{display:flex;align-items:center}svg{width:24px;height:24px;color:' + T.inkMedium + '}' +
      'a{color:inherit;text-decoration:none}a:hover{text-decoration:underline}b{font-weight:600}' +
      '.m{display:none}@media (max-width:767px){.d{display:none}.m{display:flex}}' +
      '</style><ol aria-label="Kruimelpad">' +
      crumbs.map(function (c, i) { return '<li class="d">' + (i ? I.chevRight : '') + (c[1] ? '<a href="' + PP + c[1] + '">' + c[0] + '</a>' : '<b aria-current="page">' + c[0] + '</b>') + '</li>'; }).join('') +
      '<li class="m">' + I.chevLeft + '<a href="' + PP + parent[1] + '">' + parent[0] + '</a></li>' +
      '</ol>';
  }

  /* ---------- footer ---------- */
  var ft = d.createElement('div');
  ft.className = 'bolx-footer';
  var sf = ft.attachShadow({ mode: 'open' });
  var cols = [
    ['Categorie&euml;n', [['Aanbod', '/nl/l1op/aanbod'], ['Bestellingen &amp; Verzenden', '/nl/l1op/bestellingen-en-verzenden'], ['Zichtbaarheid', '/nl/l1op/zichtbaarheid'], ['Financi&euml;n', '/nl/l1op/financien'], ['Beleid', '/nl/l1op/beleid'], ['Nieuws &amp; Storingen', '/nl/nuop/nieuws-en-storingen']]],
    ['Handige links', [['Algemene voorwaarden', 'https://www.bol.com/nl/nl/tc/gebruikersvoorwaarden-zakelijke-verkopen-via-bol-com/'], ['Privacy', '/nl/sdp/privacyverklaring-zakelijke-verkopers-bol'], ['Cookiebeleid', '/nl/sdp/cookiebeleid']]],
    ['Over bol', [['Nieuws', 'https://over.bol.com/nl/nieuws/'], ['Duurzaamheid', 'https://over.bol.com/nl/Duurzaamheid/'], ['Service &amp; Support', '/nl/sdp/service-support']]]
  ];
  sf.innerHTML = '<style>' +
    ':host{all:initial;display:block;font-family:' + T.fontBody + ';-webkit-font-smoothing:antialiased}' +
    'footer{background:' + T.blue + ';color:#fff;padding:40px 0}@media (min-width:1024px){footer{padding:80px 0}}' +
    '.wrap{max-width:' + T.container + ';margin:0 auto;padding:0 16px;display:grid;gap:32px}@media (min-width:768px){.wrap{grid-template-columns:repeat(3,1fr)}}' +
    'h3{margin:0 0 24px;font:600 16px/24px ' + T.fontBody + '}ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}a{color:#fff;text-decoration:none;font-size:16px;line-height:24px}a:hover{text-decoration:underline}' +
    '.c{max-width:' + T.container + ';margin:40px auto 0;padding:0 16px;font-size:12px;line-height:16px;opacity:.9}' +
    '</style><footer><div class="wrap">' +
    cols.map(function (c) { return '<div><h3>' + c[0] + '</h3><ul>' + c[1].map(function (l) { return '<li><a href="' + (l[1].charAt(0) === '/' ? PP + l[1] : l[1]) + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>'; }).join('') +
    '</div><div class="c">&copy; 1999-' + new Date().getFullYear() + ' bol.com b.v.</div></footer>';

  /* plaatsen: header en breadcrumb meteen na het script, footer op het einde van body */
  var anchor = me && me.parentNode === d.body ? me : null;
  if (anchor) { d.body.insertBefore(host, anchor.nextSibling); if (bc) d.body.insertBefore(bc, host.nextSibling); }
  else { d.body.insertBefore(host, d.body.firstChild); if (bc) d.body.insertBefore(bc, host.nextSibling); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', function () { d.body.appendChild(ft); });
  else d.body.appendChild(ft);

  window.BolShell = {
    base: base,
    tokens: T,
    headerHeight: function () { return host.getBoundingClientRect().height; },
    version: '1.0'
  };
})();
