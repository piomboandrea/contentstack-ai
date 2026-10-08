# ui-skills (improve-ui + baseline-ui): audit en bouwplan, variant "Huidig, opgeruimd"

## Design language
- Audited surface: partnerplatform.bol.com/nl/cdp/third-party-logistics, stuk tussen `<h1` en `<footer` (bron-bol-pagina.html, uitgepakt in scratchpad/bron-main.html).
- Design sources: tokens op `:root` uit `bol-shell.js` (kleuren, radius 4/8/16/24, shadow-1/2, Produkt/Graphik, container 1200, header-h); de regels in BRIEF.md; typografische schaal uit de opdracht (bron-CSS is extern, niet in het bestand).
- Documented decisions: knoppen 48 px, radius 8, 14 px semibold; cards wit of #EDF3FF, radius 16/24, hover blauwe rand 2 px; focusring 2 px actieblauw offset 2; één h1, koppen in volgorde; "bol" klein; geen em dash.
- Governing owners and consumers: bol-shell.js (header, breadcrumb, footer, tokens) en content.json (alle copy en blokvolgorde); de variant bezit enkel `<main class="bolx-content">`.
- Explicit exceptions: None documented.

## Findings
| # | Problem | Evidence | Proposed change | Scope | Confidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Blokritme klopt niet: elk blok `my-10` (40 px), maar de slotzin van de stappen (r. 98-108) en de voetnoot (r. 189-199) zijn losse blokken, dus 80 px van hun inhoud; het partnerblok gebruikt `my-20` plus `py-24` (r. 270). | bron-main.html r. 12, 43, 98, 111, 189, 270 | Eén ritme: 64 px desktop, 40 px gsm tussen blokken; slotzin en voetnoot in hun eigen blok, voetnoot 12/16 in #6D6D6D. | Alle blokken | Hoog |
| 2 | In het blok Voordelen zijn de 5 itemtitels `<h2>` onder een `<h2>`; stappen, partners en FAQ gebruiken `<h3>`. Elk item heeft bovendien een lege `<a href="">` (focusbare lege link). | r. 116 vs 123, 136, 149, 162, 175; lege links r. 126, 139, 152, 165, 178 | Itemtitels als `<h3>` Graphik 600; geen link als er geen label of url is. | Blok voordelen | Hoog |
| 3 | De lijst met 6 signalen staat in 5 aparte `<ul>` (visueel paragraafgaten, voorgelezen als 5 lijsten); copyfouten "aanoperationele", "logistiekeprocessen", QLS mist "helpt", CEVA "wereldspelers", "fullfillment". | r. 19-34, 30, 295, 349 | Eén `<ul>` met 6 `<li>`; copy komt uit content.json (daar al gecorrigeerd). | Blokken groeiambities, partners | Hoog |

Andere kandidaten (niet in tabel, wel meegenomen in de bouw): hero-intro van 2 lange zinnen in een koptekststijl (r. 2); 4 partnerkaarten in een carrousel van 3 breed, dus de 4e partner pas na een klik (r. 284-366); drie opeenvolgende tekstblokken ecosysteem, selector en losse knop (r. 232-269); iconen op 60 % opacity (r. 119); stappen met ";" en "." als zinseinde (r. 63, 76, 89); hero-beeld verborgen op gsm (r. 7).

## Improve first
Finding 1 (blokritme): het raakt elk blok, kost niets extra in de bouw en is precies wat "huidig, maar beter" voor bol zichtbaar maakt.

## Bouwplan (ui-skills.html)
- Raster: container 1200, 12 kolommen, gutter 24; tekstblokken kolom 3 tot 10 (zoals bol), hero tekst 1 tot 7 en beeld 8 tot 12, voordelen en partners volle breedte.
- Ritme 8 px: blokafstand 64/40, h2 marge 16, intro marge 32/24, lijstgap 8, cardpadding 24.
- Schaal: h1 Produkt 900 40/48 gsm en 48/56 desktop; h2 Produkt 700 24/32 en 28/36; h3 Graphik 600 18/24; body 16/24; klein 14/20 en 12/16; cijfers Produkt 300.
- Hero: eerste zin van de intro (kort() helper, data uit content.json), knop primair, beeld radius 24, ook op gsm.
- Voordelen: grijze card radius 24, 3 plus 2 gecentreerd op een 6-kolomsraster, iconen 24 px actieblauw, voetnoot 12/16 in de card.
- Medisana: card #EDF3FF, quote zichtbaar, voor/na als twee tegels, lange tekst achter een knop met aria-expanded, CTA naar het verhaal.
- Ecosysteem (max 2 zinnen) als korte intro boven de selector-card (banner met beeld uit extraBeelden, 3 items, knop primair).
- Partners: 4 cards op één rij (desktop), scroll-snap op gsm, hover rand 2 px, chevron rechts; FAQ als accordeon met aria-expanded, open state #EDF3FF plus rand.
- Opruimpas met baseline-ui: afstanden, hiërarchie, uitlijning knoppen, contrast, focus; daarna `node --check` op het inline script.
