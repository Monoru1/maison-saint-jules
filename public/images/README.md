# Images — Maison Saint-Jules

Arborescence par catégorie (`MediaCategory`) :

- `hotel/` — façade, intérieurs communs, patrimoine
- `suites/` — chambres et suites (`<slug>-cover.jpg`, `<slug>-01.jpg`…)
- `restaurant/` — table, cuisine, chef
- `spa/` — bassin, soins
- `gallery/` — sélection éditoriale transverse

## Conventions

- Format paysage recommandé : **1600×2000** (portrait suites) / **1600×1200** (paysage).
- Nommer d'après le contenu : `suite-jardin-cover.jpg`, `le-cabinet-table.jpg`.
- Renseigner `width`/`height` et un `focalPoint` (0→1) dans le descripteur
  `HotelImage` correspondant pour un cadrage stable et sans décalage (CLS).
- Aucune image sous licence non vérifiée : à défaut, laisser `src: null`
  (placeholder de marque).
