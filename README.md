# Contentstack AI-tussenlaag voor bol

Redesign van de bol-pagina [Ontdek Fulfilment Partners](https://partnerplatform.bol.com/nl/cdp/third-party-logistics), gemaakt met verschillende design-skills in de huisstijl van bol. Erbij zit een presentatie over hoe een Dignify AI-tussenlaag op Contentstack bol zelf pagina's laat bouwen, in plaats van blok per blok.

## Openen

De pagina's laden `content.json` op, dus ze hebben een lokale server nodig (dubbelklikken op het bestand werkt niet).

```bash
python3 -m http.server 8080
```

Open daarna http://localhost:8080/index.html

## Inhoud

| Bestand | Wat |
|---|---|
| `index.html` | Keuzepagina: start met de presentatie, daarna de ontwerpen, "Zo werkt het" en het voorstel voor bol |
| `presentatie.html` | De presentatie in acht hoofdstukken |
| `varianten/` | Eén ontwerp per skill, plus `huidig-kopie.html` (statische kopie van de huidige pagina) |
| `content.json` | Alle tekst, links, beelden en Contentstack-bloktypes van de pagina |
| `bol-shell.js` | Header, breadcrumb, footer, fonts en kleuren van bol |
| `BRIEF.md` | De brief die elke design-skill meekreeg |
| `bron-bol-pagina.html` | De originele pagina zoals opgehaald op 8 oktober 2026 |
| `img/` | Beelden en logo's |
