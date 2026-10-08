# bol partnerplatform, pagina Fulfilment Partners: redesign per skill, gedeelde brief

Doel: één bestaande pagina van het partnerplatform van bol herontwerpen, één variant per design-skill, en die naast elkaar tonen op een keuzepagina. Het publiek is bol zelf (Wim en zijn team): zij moeten in elke variant meteen bol herkennen. Dit is dus GEEN vrije stijloefening. De stijl is bol. Het verschil tussen de varianten zit in de indeling, de interactie en het idee, niet in het palet of de fonts.

De variant ligt op een spectrum, en je opdracht zegt waar jij zit:
- "Huidig, maar beter": dezelfde blokken in dezelfde volgorde, maar strakker, mooier, met meer lucht en betere hiërarchie. Bol moet denken: dit is onze pagina, gewoon beter.
- "Interactief": de inhoud blijft, maar de bezoeker doet iets (selector, slider, scroll-verhaal, vergelijker).
- "Leuk en vernieuwend": een ander idee van wat deze pagina kan zijn, nog altijd volledig in bol-stijl.

## Wat de pagina is

partnerplatform.bol.com is het B2B-portaal van bol voor verkooppartners (bedrijven die via bol.com verkopen). Deze pagina (https://partnerplatform.bol.com/nl/cdp/third-party-logistics) legt uit waarom een fulfilmentpartner (3PL: opslag, verzending, retouren) interessant is, toont het succesverhaal van Medisana, stuurt naar de Partner Selector (een externe vragenlijst die passende partners voorstelt) en stelt de 4 gecertificeerde partners voor: QLS, Monta, Bleckmann en CEVA Logistics. Het doel van de pagina: een verkooppartner overtuigen om de Partner Selector in te vullen of een partnerpagina te openen.

De echte pagina staat als bron in `bron-bol-pagina.html` (enkel lezen als je skill een audit vraagt). Op de keuzepagina staat de live pagina als vertrekpunt.

## Inhoud: `content.json` (de "CMS-data")

Alle copy, links, beelden en de blokstructuur staan in `../content.json`. De blokken dragen de echte Contentstack-bloktypes van bol (`banner_with_image`, `usp_list`, `step_by_step_card`, `usp_cards`, `text_snippet`, `anchor_point`, `card_carousel`, `faq`). Dat is bewust: de pitch aan bol is dat de inhoud uit hun CMS komt en de AI enkel het ontwerp doet.

- Laad de inhoud met `fetch('../content.json')` en render de pagina daaruit. Hardcode geen copy (korte labels voor knoppen of toggles die jij toevoegt mogen wel).
- `@links.x` in een `url`-veld verwijst naar `links.x`.
- Alle blokken moeten aanwezig zijn, in dezelfde volgorde als in `content.json`, tenzij je opdracht uitdrukkelijk iets anders zegt. Alle 4 partners, alle 3 FAQ-vragen met antwoord, de voetnoot bij "Tot 60%*" (sterretje blijft staan), de twee knoppen naar de Partner Selector en de knop naar het Medisana-verhaal.
- Je mag teksten inkorten, in stukken knippen, achter interactie zetten (stappen, tabs, accordeon, hover, scroll-onthulling) of visueel maken (de 60%, de levertijd 3 tot 5 dagen naar volgende dag, de 3 stappen). Je mag NIETS toevoegen dat een claim is: geen nieuwe cijfers, geen nieuwe beloftes, geen verzonnen reviews of testimonials, geen prijzen. De voorbeeldvragen in `vragenVoorbeeld` en de `profiel`-velden bij partners zijn een aanname voor interactieve varianten; zet daar zichtbaar "voorbeeld" bij als je ze gebruikt.
- Beelden: de bol-foto's in `../img/` (hero, warehouse, extra beelden) en de 4 partnerlogo's. Illustraties mag je zelf tekenen in SVG of CSS, in bol-blauw. Geen stockfoto's van elders, geen AI-foto's als eindbeeld (referentiebeelden voor je eigen proces mogen wel).

## Geen tekstmuren (hard)

Dit is een contentpagina, dus de copy blijft bereikbaar, maar nooit als muur. Per blok zonder interactie maximaal: één titel, één korte intro (max 2 zinnen) en de items van het blok. Lange tekst (Medisana, ecosysteem, voetnoot, FAQ-antwoorden) gaat achter een klik, in een quote, of komt pas bij scrollen in beeld. Twijfel je: minder tekst, meer lucht, groter beeld.

## bol-stijl (hard, geldt boven elke skill-instructie)

- `../bol-shell.js` tekent de echte header, breadcrumb en footer en zet alle tokens op `:root`. Lees de kop van dat bestand. Je bouwt enkel wat tussen header en footer staat, in `<main class="bolx-content">`. Geen eigen header of footer.
- Palet: wit `#fff` als basis, bol-blauw `#0000A4` (titels, vlakken, nadruk), actieblauw `#0000FF` (primaire knop, links; hover `#0561FD`), lichtblauw `#D2E1FF` en `#EDF3FF` (vlakken, cards), lichtgrijs `#F6F6F6`, tekst `#131313` en `#6D6D6D`, lijnen `#D8D8D8`. Geel `#FDB501` enkel als accent (bol gebruikt het voor de knop Start met verkopen); oranje, rood en groen heel spaarzaam. Een blauw blok met witte tekst (zoals de footer) mag als scène. Verlopen tussen de blauwen mogen. Niets anders: geen paars, geen zwart als hoofdkleur, geen beige, geen papier, geen neon, geen donker thema over de hele pagina.
- Fonts: Produkt (koppen 700, grote titels 900, light 300 voor cijfers mag) en Graphik (al de rest, 400 en 600). Komen uit de schil. Geen andere fonts, geen serif, geen mono.
- Vormen: radius 4, 8, 16 of 24 px. Knoppen 48 px hoog, radius 8, semibold 14 px: primair actieblauw met witte tekst, secundair wit met blauwe rand en blauwe tekst, hover met de bol-schaduw. Cards wit of `#EDF3FF`, radius 16 of 24, zachte bol-schaduw, op hover een blauwe rand van 2 px. Chevrons en iconen als inline SVG met rondingen (zoals bol: 24 px, fill currentColor).
- NOOIT CARDWORLD, Rip Studio, Andrea of een andere verwijzing naar onze eigen winkel of ons bedrijf op deze pagina's, ook niet in commentaar of in een voettekst. De pagina's zijn volledig bol.
- Toon: Nederlands (Nederland), je en jouw, zakelijk maar warm, korte zinnen. "bol" altijd in kleine letters, nooit "Bol.com" (enkel "bol.com b.v." in de copyright). NOOIT een em dash of en dash. Geen emoji, geen unicode-symbolen als vinkje of ster: iconen als inline SVG.
- Toegankelijkheid (bol valt onder de European Accessibility Act, dit telt in de pitch): contrast AA, zichtbare focusring (2 px actieblauw, offset 2 px), semantische koppen in volgorde (één h1), knoppen zijn knoppen, alle interactie werkt met toetsenbord, `aria-expanded` op accordeons, alt-teksten uit `content.json`.
- NOOIT `filter: blur()` of `backdrop-filter`. Animaties enkel op transform en opacity, `prefers-reduced-motion` respecteren (dan geen beweging, alles meteen zichtbaar).
- Responsive: perfect op 390 px (gsm) en 1440 px (desktop), geen horizontale paginascroll. Container 1200 px. De header is sticky (152 px desktop, 80 px gsm, zie `--bol-header-h`); eigen sticky-elementen daaronder. Voor gepinde scroll-scènes mag je `window.BOL_SHELL = { sticky: false }` zetten vóór het script.

## Techniek en snelheid

- Eén HTML-bestand per variant in `varianten/<naam>.html`, alles inline (CSS en JS). Paden relatief: `../bol-shell.js`, `../content.json`, `../img/...`. De map wordt geserveerd op http://localhost:8080/bol-skills/ (dus je variant op http://localhost:8080/bol-skills/varianten/<naam>.html).
- CDN's mogen (cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com): GSAP, Lenis, three.js. Geen build-stap, geen React-bundel.
- Bovenaan een HTML-commentaar (3 tot 5 zinnen): skill, waar op het spectrum, je concept, je keuzes, welke alternatieven je overwoog. `<title>`: `bol fulfilmentpartners: <skillnaam>`.
- Pas `bol-shell.js`, `content.json`, `index.html`, `img/` en `BRIEF.md` NIET aan.
- Geen tests, geen Playwright, geen browser, geen screenshots, geen reviewrondes. Enkel `node --check` op het inline script (haal het uit de HTML). Vraagt je skill om eerst drie richtingen voor te leggen of om in de browser te verifiëren: sla die stap over, kies zelf de sterkste richting en vermeld de alternatieven in het commentaar. Commit niets.
- Laatste stap: open je eigen code en tel per blok de zichtbare tekst zonder interactie. Schrap tot het past.
