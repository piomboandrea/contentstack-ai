# Design System: bol fulfilmentpartners, variant "Levende cijfers" (stitch-skill)

Semantisch designsysteem volgens de stitch-skill workflow, toegepast op de pagina "Ontdek Fulfilment Partners via bol" van partnerplatform.bol.com. Alle tokens komen uit `../bol-shell.js` en staan als CSS-variabelen op `:root`. Dit document legt geen eigen palet op: de stijl is bol, het verschil zit in de indeling, de interactie en de beweging.

Plek op het spectrum: Interactief. Concept: Levende cijfers. Elk cijfer op de pagina leeft: het telt op als het in beeld komt, reageert op een slider of op een keuze van de bezoeker.

## 1. Visuele sfeer

- Dichtheid 4 van 10 ("daily app balanced"): veel lucht rond titels en tegels, maar geen galerie. Een verkooppartner wil snel scannen.
- Variantie 6 van 10 ("offset asymmetric"): splitsingen van 7/5, 5/7 en 4/8, een bento-raster voor de voordelen, trapjes (offset) in de stappen en de partnerkaarten. Nooit drie identieke kaarten naast elkaar.
- Beweging 5 van 10 ("fluid CSS"): micro-beweging overal, maar rustig en zakelijk. Enkel transform en opacity, hardware-versneld. De beweging ondersteunt het cijfer, ze leidt nooit af.
- Sfeer: wit en helder, bol-blauw draagt de hiërarchie, lichtblauwe vlakken geven ritme, twee volledig blauwe scènes (het 60%-tegel en het ecosysteem-blok) geven diepte. Het voelt als een goed verlicht magazijn: ordelijk, open, in beweging.

## 2. Kleuren en rollen (bol-tokens)

- **Wit** (#FFFFFF, `html`/`body`): basisvlak van de pagina en van kaarten.
- **bol-blauw** (#0000A4, `--bol-blue`): h1, h2, h3, grote cijfers, blauwe scènes met witte tekst (60%-tegel, ecosysteem, "Levertijd nu").
- **Actieblauw** (#0000FF, `--bol-blue-action`): primaire knop, links, actieve toggles, de gevulde dag-stippen, de slidervulling, de focusring.
- **Hoverblauw** (#0561FD, `--bol-blue-hover`): hover op knoppen en links.
- **Lichtblauw** (#D2E1FF, `--bol-blue-low`): lege dag-stippen, slidertrack, het selector-vlak.
- **Minimaal blauw** (#EDF3FF, `--bol-blue-minimal`): hero-vlak, stappen-vlak, tegels, tellerkaart, aangevinkte situaties.
- **Lichtgrijs** (#F6F6F6, `--bol-grey`): niet gebruikt in deze variant; de blauwen dragen het ritme.
- **Inkt** (#131313, `--bol-ink`): lopende tekst.
- **Inkt medium** (#6D6D6D, `--bol-ink-medium`): labels, bijschriften, voetnoot, FAQ-subtitel.
- **Lijn** (#D8D8D8, `--bol-border`): randen van toggles, FAQ-scheidingslijnen.
- **Geel** (#FDB501, `--bol-yellow`): enkel in de schil (knop Start met verkopen). Niet in de content.
- **Oranje, rood, groen**: niet gebruikt.
- Verlopen: enkel tussen bol-blauw en actieblauw (135 graden) op de twee blauwe scènes, en van minimaal blauw naar wit in de hero.
- Schaduwen: `--bol-shadow-1` op kaarten in rust, `--bol-shadow-2` op hover. Geen gekleurde schaduw, geen gloed.

Maximaal één accent (actieblauw). Geen paars, geen neon, geen zwart als hoofdkleur, geen beige, geen donker thema.

## 3. Typografie (uit de schil)

- **Display: Produkt** (`--bol-font-display`). h1 in 900, clamp(34px, 4.2vw, 56px), regelafstand 1.05, letterspatiëring -0.01em. h2 in 700, clamp(26px, 3vw, 38px). h3 in 700, 20px. Titels in bol-blauw. Hiërarchie door gewicht en kleur, niet door schreeuwende grootte.
- **Cijfers: Produkt 300 (light)**, tabular-nums. Hero-teller 64px, tellerkaart clamp(56px, 7vw, 88px), het 60%-cijfer clamp(72px, 9vw, 128px), stapnummers 48px, het cijfer 4 in het ecosysteem-blok clamp(96px, 12vw, 160px). Cijfers zijn de hoofdpersonen van deze variant en krijgen daarom het lichtste gewicht: groot, maar nooit zwaar.
- **Body: Graphik** (`--bol-font-body`), 400 op 16px/24px, intro's 18px/28px, labels 600 op 14px/20px, bijschriften 13px/18px. Maximaal 65 tekens per regel.
- **Verboden**: elk ander lettertype, serif, mono, hoofdletters als stijlmiddel, Inter.

## 4. Componenten

- **Knoppen**: 48px hoog, radius 8px, Graphik 600 14px, padding 0 24px, icoon 24px rechts. Primair: actieblauw met witte tekst, hover hoverblauw plus `--bol-shadow-2`. Secundair: wit met actieblauwe rand en tekst. Actief: 1px omlaag (translateY). Geen gloed, geen eigen cursor. Externe links openen in een nieuw venster met een sr-only melding.
- **Kaarten en tegels**: wit of minimaal blauw, radius 24px, `--bol-shadow-1`, rand 2px transparant die op hover actieblauw wordt. Partnerkaarten ademen op hover (scale 1 naar 1.015, 2.8s, oneindig). Het 60%-tegel is een blauwe scène met wit cijfer.
- **Levertijd-vergelijker (hero)**: witte kaart, slider van 1 tot 7 dagen (native `input type="range"`, thumb 28px wit met actieblauwe rand, track 6px), een `output` met het cijfer, twee rijen van 7 dag-stippen (18px, lege stip lichtblauw, gevulde stip actieblauw via een opacity-laag) en een referentierij met het Medisana-voorbeeld. Een pulserend stipje (opacity) markeert de referentie. Een bijschrift zegt uitdrukkelijk dat het een voorbeeld is en geen voorspelling.
- **Situatie-toggles**: knoppen met `aria-pressed`, 56px minimaal, radius 16px, vinkvak 24px radius 4px dat bij aanvinken invult (opacity en scale). Een tellerkaart telt mee.
- **Dag-stippen**: 7 stippen per rij, gevuld tot het gekozen aantal, met 40ms stagger per stip. Halve vulling (opacity .4) voor een bereik zoals "3 tot 5 dagen".
- **Accordeon (FAQ)**: knop in h3 met `aria-expanded` en `aria-controls`, chevron draait 180 graden, het antwoord fadet in (opacity en translateY). Geen hoogte-animatie.
- **Disclosure**: tekstknop met chevron voor de voetnoot en het Medisana-verhaal, `aria-expanded`.
- **Formulieren**: label boven de slider, geen zwevende labels, focusring 2px actieblauw met offset 2px op alles.
- **Laadtoestand**: de pagina rendert uit `content.json`; lukt dat niet, dan één korte melding in bol-stijl. Geen spinner.

## 5. Lay-out

- Container 1200px met 16px zijmarge, zoals de schil. Secties met verticale ruimte clamp(48px, 7vw, 96px).
- CSS Grid overal, geen flex-rekensommen. Hero 7/5 (tekst links, vergelijker rechts, foto onder de vergelijker). Groeiambities 5/7 (tellerkaart links, toggles rechts). Stappen 3 kolommen met trapje (kolom 2 zakt 40px, kolom 3 zakt 80px). Voordelen als bento van 4 kolommen: het 60%-tegel beslaat 2 bij 2, vier kleinere tegels eromheen. Medisana 6/6 (foto links). Ecosysteem 4/8 (cijfer links). Selector 6/6 (tekst links, voorbeeldvragen rechts). Partners 4 kolommen met trapje op de even kaarten. FAQ 4/8.
- Onder 900px alles in één kolom, in DOM-volgorde. De vergelijker staat direct onder de h1 zodat ze op 390px boven de vouw staat.
- Partnerkaarten op gsm als horizontale scroll met scroll-snap (bewust, binnen de container); de pagina zelf scrollt nooit horizontaal.
- Geen overlappende elementen, geen absolute positionering voor inhoud. Elk element heeft zijn eigen zone.
- Tiktargets minimaal 44px, knoppen 48px.
- Sticky header van de schil blijft; ankers krijgen `scroll-margin-top` van `--bol-header-h`.

## 6. Beweging en interactie

- Enkel `transform` en `opacity`. Nooit top, left, width, height, blur of backdrop-filter.
- Easing: cubic-bezier(.2,.7,.2,1) voor onthullingen (weinig overshoot, voelt als een veer met damping 20), cubic-bezier(.34,1.56,.64,1) voor kleine pops (stippen, vinkjes).
- Tellers: easeOutCubic over 1.1 tot 1.6 seconden, gestart door IntersectionObserver bij 50% zichtbaarheid, één keer. Op het einde een kleine pop (translateY 6px naar 0).
- Scroll-onthulling: opacity 0 en translateY 16px naar rust, 0.6s, stagger 60 tot 90ms per item (waterval).
- Perpetuele micro-beweging: het referentiestipje pulseert (opacity .35 naar 1, 2.4s). Partnerkaarten ademen enkel op hover. Meer niet: bol is rustig.
- `prefers-reduced-motion: reduce`: geen enkele animatie of transitie, alle tellers staan meteen op hun eindwaarde, alle onthullingen zijn meteen zichtbaar.
- Geen scroll-hijacking, geen Lenis, geen GSAP: alles in vanilla CSS en JS, hardware-versneld.

## 7. Anti-patronen (verboden)

- Geen em dash en geen en dash, nergens. Geen emoji, geen unicode-vinkjes of sterren: iconen zijn inline SVG met ronde hoeken.
- Geen ander lettertype dan Produkt en Graphik. Geen Inter, geen serif, geen mono.
- Geen paars, geen neon, geen zwart als hoofdkleur, geen beige, geen gekleurde gloed.
- Geen blur, geen backdrop-filter, geen animatie op layout-eigenschappen.
- Geen nieuwe cijfers of claims: elk cijfer komt uit `content.json` (60%, 3 tot 5 dagen, volgende dag, 4 partners, 3 stappen, 6 situaties, 2 landen uit "Nederland en België"). De voorbeeldvragen dragen zichtbaar het label "Voorbeeld".
- Geen tekstmuren: per blok één titel, één intro van maximaal twee zinnen en de items. Lange tekst zit achter een klik of komt gefaseerd in beeld.
- Geen vultekst ("Scroll verder", pijltjes die stuiteren), geen tweede CTA in de hero.
- Geen drie identieke kaarten op een rij zonder offset, geen gecentreerde hero.
- Geen eigen header of footer, geen eigen breadcrumb: dat doet de schil.
- Geen "Bol.com": altijd "bol" in kleine letters.

## Overwogen en bewust niet gedaan

- Inline foto in de h1 (de signatuurtechniek van de skill): afgewezen omdat een beeld in de h1 de toegankelijke naam van de kop vervuilt of de alt-tekst uit `content.json` verliest. De hero-foto staat als eigen beeld onder de vergelijker, met de alt uit de CMS-data.
- Gepinde scroll-scène waarin de levertijd van 5 naar 1 dag krimpt: te zwaar en te theatraal voor bol.
- Volledig werkende mini Partner Selector in de hero: te veel claims; de voorbeeldvragen staan nu in het selector-blok met een live teller en het label "Voorbeeld".
