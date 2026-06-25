GROF ONTWERP – Mijn Gezondheid PWA
============================================================

1. SITEMAP
-----------------------------------------------------------

Home (Dashboard)
├── Invoer (Gezondheidsgegevens toevoegen)
├── Overzicht (Gezondheidsgegevens filteren per periode)
└── Tools (BMI, Slaapcalculator, Data beheer)

2. PAGINASTRUCTUUR
-----------------------------------------------------------

┌─────────────────────────────────────────┐
│  HEADER                                 │
│  ├── Logo + App-titel                   │
│  ├── Navigatie (Dashboard/Invoer/       │
│  │   Overzicht/Tools)                   │
│  └── Thema-toggle + Taal-switch         │
├─────────────────────────────────────────┤
│                                         │
│  MAIN CONTENT (wisselt per pagina)      │
│                                         │
│  DASHBOARD:                             │
│  ├── Statistieken (4 kaarten)           │
│  ├── Water Tracker widget               │
│  ├── Recente invoer (laatste 5)         │
│  └── Snel-toevoegen knop                │
│                                         │
│  INVOER:                                │
│  ├── Formulier (datum, categorie,       │
│  │   omschrijving, waarde, eenheid)     │
│  ├── Converter (kcal↔kJ, MET)           │
│  └── Opslaan/Reset knoppen              │
│                                         │
│  OVERZICHT:                             │
│  ├── Filter (dag/week/maand)            │
│  ├── Samenvatting (totaal/gem/min/max)  │
│  └── Lijst met items + verwijder        │
│                                         │
│  TOOLS:                                 │
│  ├── BMI Calculator                     │
│  ├── Slaapcalculator                    │
│  └── Data beheer (export/import/reset)  │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  └── © 2026 Mijn Gezondheid PWA         │
└─────────────────────────────────────────┘

3. DATAMODEL (LocalStorage)
-----------------------------------------------------------

Key: "gezondheid-data"
Value: Array van Entry-objecten

Entry = {
    id:        String (timestamp),      // Unieke identifier
    datum:     String (YYYY-MM-DD),     // Datum van invoer
    categorie: String,                   // ontbijt/lunch/diner/
                                          // tussendoortje/sport/
                                          // water/slaap
    omschrijving: String,                // Beschrijving item
    waarde:    Number,                   // Numerieke waarde
    eenheid:   String                    // kcal/kJ/gram/ml/
                                          // minuten/uren
}

Key: "gezondheid-water"
Value: Object met datums als keys

WaterData = {
    "2026-06-25": 1500,  // ml water per dag
    "2026-06-24": 2000
}

Key: "gezondheid-lang"
Value: String "nl" of "en"

Key: "gezondheid-theme"
Value: String "light" of "dark"

4. FUNCTIONELE EISEN MAPPING
-----------------------------------------------------------

F1  Create  → Invoer-formulier + LocalStorage.setItem()
F2  Read    → Dashboard + Overzicht + filter per periode
F3  Delete  → Verwijder-knop in Overzicht + confirm dialog
F5  Data    → Datum, categorie, omschrijving, waarde, eenheid
F6  Storage → LocalStorage (geen server)
F7  Manifest→ manifest.json met icons, theme, display
F8  Offline → Service Worker met cache-first strategie
F9  Responsive→ Mobile-first CSS, breakpoints 480px & 768px
F10 Semantisch→ <header>, <nav>, <main>, <footer>, <section>
F11 Taalswitch→ JSON-translaties NL/EN, LocalStorage opslag

5. TECHNISCHE ARCHITECTUUR
-----------------------------------------------------------

Frontend:  HTML5, CSS3 (custom properties), Vanilla JS
Storage:   LocalStorage (client-side, geen backend)
PWA:       Manifest.json + Service Worker (Cache API)
Styling:   Mobile-first, CSS Grid & Flexbox
Icons:     PNG icons (72x72 t/m 512x512)
Fonts:     Google Fonts (Inter) via CDN

6. RESPONSIVE BREAKPOINTS
-----------------------------------------------------------

Mobile  (default):  < 480px  → 1 kolom, gestapelde layout
Tablet  (480-768px):          → 2 kolommen stats
Desktop (> 768px):            → 4 kolommen stats, breder
