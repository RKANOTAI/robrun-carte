# Carte interactive des districts — ROB RUN

Carte navigable de l'État (carte globale) de ROB RUN : les 10 districts, leurs 510 parcelles numérotées, les liaisons, les lieux (Motel de Lenny, Prison, Looty Bay), les Hangars et les 27 bâtiments spéciaux avec leurs bonus.

**➜ Ouvrir la carte : https://rkanotai.github.io/robrun-carte/**

## Fonctions

- Zoom et déplacement libres sur la texture d'origine du jeu (8192×8192, découpée en tuiles).
- Clic sur un district : niveau, bonus de vente du Hangar, bâtiments et parcelles qui en profitent.
- Clic sur une parcelle : bâtiments adjacents et bonus dont elle profite.
- Recherche : `Fallrock` ou `fallrock 12`. Lien direct : `#el-peso-7`.
- Légende cliquable pour repérer tous les bâtiments d'un type.

## Sources

- Fond de carte, grille des districts, parcelles, liaisons et emplacements de bâtiments : extraits des fichiers du client (texture `GlobalMap`, prefab `Runtime_RealmGrid_v0`). Identiques sur tous les serveurs.
- Types de bâtiments par emplacement : relevés en jeu (identiques sur tous les serveurs).
- Valeurs chiffrées des bonus : envoyées par le serveur, donc absentes des fichiers ; reprises de [robrun.info](https://robrun.info/en/guides/settlement-bonuses) et non vérifiées en jeu.

## Carte de Looty Bay

Carte de la ville (dossier `looty-bay/`) : les 35 lieux de Looty Bay, leurs points de butin, 154 objets rattachés aux lieux et 8 variantes de plants/réactifs d’origine non déterminée, ainsi que les points en extérieur (distributeurs, conteneurs de cargaison).

**➜ Ouvrir la carte : https://rkanotai.github.io/robrun-carte/looty-bay/**

- Clic sur un lieu : points de butin par type, objets trouvés sur place, butin aléatoire possible, clés et outils utilisables.
- Filtres par catégorie, quartier et type de butin ; recherche par lieu ou par objet (ex. `gold bar`).
- Onglet Objets : rareté, prix de base et prix au Fence selon la notoriété, lieux où trouver chaque objet.
- Lien direct : `#lieu/looty-bay-bank`, `#objet/gold_bar_1`.
- Onglet Cargaisons : 170 emplacements aléatoires et 8 cargaisons fixes, calques distincts, points cliquables avec altitude et décompte sur chaque fiche de lieu.
- Plants et réactifs recherchables (`plantweed`, `bidon`, `laboratoire`) ; leur commerce d’apparition reste explicitement non déterminé.
- Liens directs de cargaison : `#cargaisons`, `#cargaison/481`, `#objet/reagents_1`. [Sources et limites](looty-bay/CARGO-SOURCES.md), [coordonnées CSV](looty-bay/cargo-locations.csv).

Sources : données reprises de la carte interactive d'[EveryGameStat](https://everygamestat.com/rob-run/map) (version du jeu 0.7.0.4008, points de butin relevés le 15/11/2026). Le fond de carte est intégré à la page ; les icônes et images d'objets sont chargées depuis les serveurs d'EveryGameStat.

Projet de fan non officiel. ROB RUN et ses visuels © Kefir.
