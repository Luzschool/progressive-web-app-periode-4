# Mijn Gezondheid PWA v2

Progressive Web App voor het bijhouden van gezondheidsgegevens.

## Nieuwe features in v2

- **Dark/Light mode** - Toggle tussen licht en donker thema
- **Animaties** - Slide-in bij items, bounce bij icons, fade transitions
- **Water Tracker** - Visuele waterfles met dagelijkse doelstelling (2500ml)
- **BMI Calculator** - Met kleurgecodeerde schaal en categorieën
- **Slaapcalculator** - Slaapduur + kwaliteitsindicatie
- **Data beheer** - Export/import JSON + reset alle data
- **4 pagina's** - Dashboard, Invoer, Overzicht, Tools

## Bestanden

| Bestand | Beschrijving |
|---------|-------------|
| `index.html` | Semantische HTML5 met alle pagina's |
| `styles.css` | Mobile-first responsive CSS + dark mode |
| `app.js` | JavaScript met alle functionaliteit |
| `sw.js` | Service Worker voor offline werking |
| `manifest.json` | PWA manifest voor installatie |
| `GROF_ONTWERP.md` | Sitemap, paginastructuur, datamodel |
| `REFLECTIEVERSLAG_TEMPLATE.md` | Template voor je reflectieverslag |
| `REKENWERK.csv` | Excel-compatibel rekenwerk (6 berekeningen) |

## Rekenfunctionaliteit

1. **kcal ↔ kJ**: `1 kcal = 4.184 kJ`
2. **MET-formule**: `kcal = MET × 70kg × uren`
3. **BMI**: `gewicht(kg) / (lengte(m))²`
4. **Slaapduur**: `wektijd - bedtijd` (met overnachting)
5. **Statistieken**: totaal, gemiddelde, minimum, maximum
6. **Water percentage**: `(ingenomen / 2500) × 100`

## Deployment

Upload alle bestanden naar GitHub Pages of SPL voor een live versie.
"# progressive-web-app-periode-4" 
