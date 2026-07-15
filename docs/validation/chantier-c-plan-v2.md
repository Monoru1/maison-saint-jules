# Chantier C — plan de correction matière V2

**Question obligatoire :** si Maison Saint-Jules devait recevoir demain le prix
mondial de la meilleure expérience numérique, qu’est-ce qui lui manque encore ?

**Réponse :** des matières vivantes qui obéissent à une cause physique. L’eau et
les tissus actuels racontent la bonne intention, mais leurs boucles et leur
symétrie laissent encore voir l’effet numérique.

## Audit avant modification

### Solide et préservé

- parcours spatial continu, navigation directe et réservation toujours accessibles ;
- images AVIF/WebP responsives, pré-rendu de 14 routes et absence de CLS critique ;
- cadrages mobile/tablette dédiés et arrêt du moteur caméra en mouvement réduit ;
- palette, photographie et narration concrète conformes à la bible ;
- baseline post-chantier B : performance 85, accessibilité 96, LCP 3422 ms sur `/`.

### Artificiel ou générique

- le rideau d’eau est formé de deux panneaux CSS symétriques et de dégradés bleus ;
- les filets et caustiques répètent des motifs courts et parfaitement réguliers ;
- la ligne d’eau horizontale est une translation linéaire d’un motif radial ;
- le mouvement du lin est une oscillation uniforme de neuf secondes ;
- les pages enrichies partagent encore une structure éditoriale trop identique.

## Lot de production autorisé

| Zone                     | Intention artistique                                                                                      | Technique retenue                                                                                          | Risque                                                          | Repli                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Transition vers `/bains` | La matière tombe avec gravité, absorbe l’ancienne pièce, puis se rompt au centre sans devenir deux portes | Canvas WebGL natif, shader fragment multi-échelle, texture du plan révélé réfractée, ouverture asymétrique | compilation shader, GPU faible, coût de remplissage plein écran | photographie du bain + masque vertical sobre ; navigation immédiate en mouvement réduit |
| Eau calme des Bains      | L’eau reflète la pierre et la lampe ; seules quelques perturbations locales trahissent sa présence        | shader dédié échantillonnant la photographie du bassin, déplacement limité à la zone d’eau                 | effet trop visible ou « gel » numérique                         | image responsive intacte, sans animation                                                |
| Suites / tissus          | Donner du poids au lin déjà présent dans les images, sans fabriquer un rideau synthétique                 | déplacement très localisé sur la zone textile, amplitude inférieure à 2 cm perçus, repos longs             | boucle mécanique, déformation de l’architecture                 | photographie fixe ; aucun voile CSS décoratif                                           |
| Qualité de scène         | Ne jamais lancer une matière coûteuse sur un appareil qui ne peut pas la rendre proprement                | gestionnaire `high / balanced / essential`, DPR plafonné, FPS réduit, pause hors visibilité                | mauvaise détection d’appareil                                   | niveau essentiel choisi par défaut en cas de doute                                      |

## Lois de réalisation

1. Aucune dépendance 3D n’est ajoutée : le besoin tient dans deux surfaces et
   quelques kilo-octets de shaders.
2. Le canvas ne contient aucune information ; le DOM, les images alternatives et
   les liens restent la source accessible.
3. Le mouvement s’arrête lorsque l’onglet est masqué et le contexte WebGL est
   détruit au démontage.
4. DPR maximum : 1,5 en niveau élevé, 1,15 en intermédiaire.
5. Niveau essentiel sur petit mobile, économie de données, mouvement réduit ou
   WebGL absent.
6. L’eau ne reçoit jamais une teinte bleue autonome : sa couleur vient du plan de
   pierre qu’elle réfracte.
7. Le lot est refusé si Lighthouse régresse sous 85 en performance ou 96 en
   accessibilité sur la page d’accueil sans justification documentée.

## Validation attendue

- transition Bains testée dans les deux sens, au clavier et au tactile ;
- captures 1440, 834 et 375 px ;
- preuve du fallback mouvement réduit et WebGL indisponible ;
- aucune erreur console ou fuite de contexte ;
- tests, lint, typecheck, build, pré-rendu et Lighthouse CI verts ;
- comparaison visuelle : aucune symétrie rigide, aucun bleu plastique, aucune
  boucle courte perceptible.
