/* Maakt content.js uit content.json. Nodig om de ontwerpen als los bestand (file://) te openen:
   daar mag de browser content.json niet ophalen. Draai opnieuw na elke wijziging aan content.json:
   node maak-content-js.js */
const fs = require('fs');
const path = require('path');
const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8'));
const js = `/* Gemaakt door maak-content-js.js uit content.json, niet met de hand aanpassen. */
window.BOL_CONTENT = ${JSON.stringify(json)};
/* Enkel als los bestand geopend: geef content.json uit deze kopie, want de browser blokkeert het ophalen. */
(function () {
  if (location.protocol !== 'file:' || !window.fetch) return;
  var orig = window.fetch;
  window.fetch = function (u) {
    var s = typeof u === 'string' ? u : (u && u.url) || String(u);
    if (/content\\.json([?#]|$)/.test(s)) {
      return Promise.resolve(new Response(JSON.stringify(window.BOL_CONTENT), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    return orig.apply(this, arguments);
  };
})();
`;
fs.writeFileSync(path.join(__dirname, 'content.js'), js);
console.log('content.js gemaakt');
