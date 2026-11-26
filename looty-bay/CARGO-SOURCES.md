# Cargaisons de Looty Bay

Les placements ont été extraits le **26 novembre 2026** du client ROB RUN installé. La couche comprend **170 emplacements aléatoires dans 28 bâtiments** et **8 cargaisons fixes**. Elle ne décrit pas l’état actuel d’un serveur.

## Ce que les données permettent d’affirmer

- `CityLocationContextBuilder.BuildRandomCargos` définit les entités **489 à 658**, avec position et rotation, sans référence à un objet ou à une probabilité.
- `CityLocationContextBuilder.BuildStaticCargos` définit les entités **481 à 488**, avec une référence explicite à la cargaison : **3 `weapon_box_1` au commissariat** et **5 `bank_cash_bag` à la banque**.
- `CityLocationContextBuilder.BuildBuildings` rattache chacun des 178 points à exactement un bâtiment. L’association aux lieux du site suit les identifiants des bâtiments et leurs positions géographiques.
- Les noms des cargaisons proviennent de `CargoViewDescriptions`, des configurations visuelles associées et de la localisation française. Les buissons en croissance/matures existent en trois raretés ; les réactifs existent en deux variantes.
- Les quatre icônes locales de `assets/cargo/` sont extraites des sprites référencés par ces mêmes configurations et de l’atlas `_fullspriteatlas_4k` du client. Les trois raretés d’un même état de buisson partagent leur sprite. Visuels ROB RUN © Kefir.

Le binaire analysé, `GameAssembly.dll`, a pour SHA-256 :

```text
2dc3326915eb1e62e86dee32d9fd64f8020623f6220de747272cd7ade767b5cf
```

Méthodes : `BuildStaticCargos` (13536, adresse `0x184314640`), `BuildRandomCargos` (13537, `0x1843043a0`), `BuildBuildings` (13539, `0x1841e34d0`). Les références statiques de `CargoDescriptions` utilisées pour les points fixes sont `WeaponBox1` (offset `0x288`) et `BankCashBag` (`0x08`). Les huit objets de la scène de ville concordent avec ces types.

## Projection sur le fond existant

Les coordonnées conservées dans `cargo-data.js` et le CSV sont celles du jeu : **X, Y (altitude), Z**. La carte affiche le plan X/Z. Des points à des étages différents peuvent se superposer.

La projection vers les pourcentages du fond existant a été calibrée par recalage des maillages de la minimap du client sur l’image intégrée à la page : 67 correspondances géométriques retenues, erreur médiane de 0,36 pixel sur une image de 2048 × 1678. C’est un placement visuel estimé ; les coordonnées du jeu restent la référence.

```text
horizontal (%) = X × 0.07477773191944688 + 52.07358661630479
vertical (%)   = Z × -0.09126626637129154 + 68.80237453904158
```

Deux incohérences des références de marqueurs du client ont été prises en compte : les deux pharmacies référencent `city_pharmacy_shop_west`, et les références de deux supérettes ne correspondent pas à leur côté géographique. Les associations du site utilisent les identifiants et coordonnées, sans déduire le côté à partir de ces seuls noms.

## Limites à préserver

- **Un emplacement aléatoire ne garantit ni la présence d’une cargaison, ni son type.** Les signalements ci-dessous complètent les positions du client, avec leur provenance et leurs limites.
- La quantité affichée correspond à des **emplacements potentiels**, pas à une quantité de butin présente simultanément.
- Les huit cargaisons fixes ont un type défini ; elles peuvent déjà avoir été prises dans une session. Leur disponibilité n’a pas été vérifiée en direct.
- Aucun taux d’apparition, délai de renouvellement ou prix de vente n’est ajouté avec cette couche.
- Les **14 conteneurs extérieurs** de la source EveryGameStat restent distincts de ces cargaisons en bâtiment.
- Les trois caisses et cinq sacs figuraient déjà dans les relations d’objets du site. La couche ajoute leurs positions sans doubler leurs quantités.
- Les plants et réactifs sont consultables/recherchables dans le catalogue, avec leur utilisation et les lieux signalés pour leur famille. Un témoignage sur des plantes ne confirme pas toutes leurs raretés ou tous leurs états.

## Types signalés — recherche du 27 novembre 2026

| Lieu | Famille | Précision et preuve |
| --- | --- | --- |
| Gunshop East | Plantes uniquement, observé en jeu | Observation du contributeur. [ShowGamer](https://showgamer.com/en/guides/7553-kak-vyrashchivat-rasteniya-v-rob-run-gde-nayti-i-kak-zarabotat-dengi) cite aussi l’armurerie du sud de Downtown pour les plantes ; le guide ne démontre pas leur exclusivité. |
| Equipment Store East | Plantes | [Témoignage Reddit](https://www.reddit.com/r/robrun/comments/1y4nnqi/comment/19t4ztbjxuctc/?force-legacy-sct=1) : près de la caisse du magasin tactique au sud de Downtown. Le joueur corrige explicitement son identification initiale comme armurerie. |
| Rusty’s Burgers | Plantes | ShowGamer cite les environs du café. L’emplacement intérieur exact reste inconnu. |
| Station-service | Réactifs | [Rob Run Helper](https://robrunhelper.tips/) cite le garage et l’arrière-boutique. Itinéraire communautaire que l’auteur indique ne pas avoir encore vérifié en jeu. |
| Electronics Store East | Réactifs | Le même itinéraire cite l’arrière-boutique du magasin de Downtown au nord de la station-service. Même réserve. |

Ces cinq signalements portent sur des lieux, sans assigner de variante à une entité de placement. Seule l’observation du contributeur à Gunshop East est formulée comme « uniquement », avec sa provenance visible. Les autres familles possibles restent inconnues.

Les guides citent également des pharmacies, bijouteries et hôtels pour les plantes, ainsi que des supérettes et garages de cottages pour les réactifs. Les noms ou localisations insuffisamment précis ne sont pas associés automatiquement à tous les bâtiments de ces catégories.

La poursuite de l’analyse native retrouve `BuildingData.RandomCargos` sous forme de `ReferenceMapData<LocationRandomCargoDescription, RandomCargoData>`. Le modèle lit la cargaison depuis les données répliquées de session. Les placements ne contiennent toujours pas de table de sélection des types ; aucune table exhaustive par commerce n’a été récupérée.

## Fichiers et vérification

- `cargo-data.js` : données de placement, provenance, projection et huit variantes de plants/réactifs.
- `cargo-locations.csv` : export des 178 points et de leurs coordonnées de jeu ; le type d’objet reste vide pour les points aléatoires.
- `tests/cargo-data.test.cjs` : contrôles de couverture, d’identifiants, de correspondance aux lieux, des types fixes et de l’absence d’associations spéculatives.

Depuis la racine du dépôt :

```sh
node --test tests/cargo-data.test.cjs
python -m http.server 8766
```

Ouvrir ensuite `/looty-bay/`. Les liens `#cargaisons`, `#cargaison/481` et `#objet/reagents_1` ouvrent respectivement la vue d’ensemble, un point précis et une fiche de réactifs.
