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

Projet de fan non officiel. ROB RUN et ses visuels © Kefir.
