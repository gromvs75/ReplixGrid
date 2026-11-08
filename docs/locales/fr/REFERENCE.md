<a id="replixgrid-user-guide"></a>
# Guide utilisateur ReplixGrid

Concevoir un organisateur en millimètres, vérifier son ajustement et télécharger les pièces pour votre trancheur. Pour une première construction, suivez l'exemple illustré de capsule. Utilisez cette référence lorsque vous souhaitez modifier une partie particulière de votre conception.

[Ouvrir ReplixGrid](https://grid.replixcast.com/?lang=fr) · [Démarrage rapide](USER-GUIDE.md) · [Installation locale](../../../README.md#local-installation)

| Je veux... | Allez à |
| --- | --- |
| Sélectionner un mur, faire pivoter le modèle ou annuler un changement | [Espace de travail et vues](#workspace-and-views) |
| Choisissez une forme, changez de dimensions ou penchez les murs vers l'avant | [Forme et dimensions](#shape-and-dimensions) |
| Placer un objet dans un compartiment ou déplacer un diviseur | [Compartiments et cloisons](#compartments-and-dividers) |
| Abaissez un mur, formez son bord ou coupez une ouverture de doigt | [Hauteur des parois et découpes](#wall-heights-and-cutouts) |
| Adoucir une jante, ajouter de la texture ou mettre un nom sur le corps | [Angles, bords et décoration](#corners-edges-and-decoration) |
| Ajouter une tasse amovible, des plateaux à empiler ou un couvercle | [Inserts, étages et couvercles](#inserts-tiers-and-lids) |
| Imprimer une housse décorative pour l'extérieur | [Habillages monoblocs et panneaux](#sleeves-and-panels) |
| Réouvrir une conception ou la déplacer vers un autre ordinateur | [Projets et sauvegardes](#projects-and-backups) |
| Choisissez une imprimante, divisez un grand modèle ou assignez un filament | [Réglages d’impression et division en parties](#print-setup-and-sectioning) · [Téléchargement et préparation dans le trancheur](#download-and-slice) |
| Conserver d'autres modèles ou réutiliser des couleurs et des motifs | [Variantes de projet](#project-variants) · [Styles partagés](#shared-styles) |
| Placer les organisateurs dans un tiroir mesuré ou les fixer sur une plaque | [Agencement des organiseurs dans un tiroir](#drawer-arrangements) · [Plaques de montage](#mounting-plates) |
| Importation d'œuvres d'art pour murs, couvercles ou coque perforée | [Relief SVG personnalisé](#custom-svg-relief) * [Studio de motifs](#pattern-studio) |
| Télécharger toutes les pièces de tiroir disposées pour l'imprimante | [Exporter tout le tiroir](#whole-drawer-export) |
| Découvrez pourquoi un contrôle ou un téléchargement n'est pas disponible | [Dépannage](#troubleshooting) |

<a id="start-a-new-project"></a>
## Commencer un nouveau projet

Au premier lancement, la zone de travail est vide. Le guide à gauche propose trois étapes: **Choisir une forme → Définir les dimensions → Ajouter des compartiments**. Choisissez une forme, réglez ses dimensions, puis cliquez sur **Suivant: compartiments**. Terminez avec **Terminé** ou **Garder sans cloisons**. Après avoir choisi une forme, vous pouvez fermer le guide avec **×**. Vous pouvez aussi ouvrir un projet enregistré ou un fichier JSON.

**Sur les petits écrans :** lorsque la fenêtre du navigateur mesure 1400 px de large ou moins, l’assistant se place **sous le modèle** pour ne pas masquer l’aperçu. Faites défiler la **page vers le bas** pour accéder à l’assistant, aux étapes suivantes et aux boutons permettant de passer aux compartiments et de terminer. Remontez la page pour revoir le modèle. Dans une fenêtre plus large, l’assistant reste à côté du menu de gauche.

Rouvrez le guide via **Aide → Guide: trois étapes**. Son ouverture ne modifie pas le modèle. Choisir une autre forme remplace le modèle actuel; cette action peut être annulée.

Le démarrage rapide, le guide utilisateur et le menu d’aide utilisent la langue de l’interface. La vidéo reste en anglais.

Les étapes, conseils et confirmations du guide sont traduits. La ligne du modèle enregistré porte le nom **Projet précédent**. Les noms réels dans **Mes projets** restent tels que vous les avez enregistrés.

Utilisez **Nouveau projet** dans la barre supérieure pour revenir à ce démarrage propre. Votre travail actuel est sauvegardé en premier; un avant-projet non nommé est conservé dans **Mes projets**. Les projets existants, les variantes, les fentes de filament et la configuration de l'imprimante ne sont pas supprimés. Le panneau affiche une vignette étiquetée **Projet précédent** avec **Enregistré dans « Mes projets »**; cliquez sur cette ligne pour rouvrir votre bibliothèque. La toile est effacée immédiatement et reste vide jusqu'à ce que vous choisissiez une nouvelle forme, tout comme lors d'une première visite. Jusqu'à ce que vous choisissiez une nouvelle forme, l'enregistrement et l'exportation sont désactivés. Vous pouvez plutôt ouvrir un projet de **Mes projets** ou importer son fichier JSON.

Choisir **Forme → Socle → Créer à partir d'un modèle** pendant que l'édition remplace la construction à l'intérieur du projet actuel et peut être annulée. Utilisez **Nouveau projet** lorsque vous voulez un modèle séparé.

<a id="workspace-and-views"></a>
## Espace de travail et vues

Ouvrez un outil dans la partie supérieure gauche. **Forme** change le corps et ses accessoires. **Compartiments** change la disposition. **Habillage** conçoit une housse extérieure séparée. **Impression** définit le volume de construction, les fentes de filament et les coupes de section optionnelles. Cliquez sur un numéro de compartiment, un mur ou un diviseur sur le modèle pour ouvrir ses réglages sur la droite. Si une partie est difficile à cliquer, étendre **Toutes les parois et compartiments** et sélectionner par nom.

Le panneau gauche est la navigation de section. Sélectionnez une section pour n'ouvrir que ses paramètres dans l'éditeur centré, flottant au bas de l'aperçu. La scène et la grille continuent derrière l'éditeur; l'ouvrir ne coupe pas l'aperçu. L'éditeur utilise des groupes compacts; il ne remplace pas le menu gauche. Son chevron s'effondre l'éditeur et **×** le ferme. Choisissez une autre section à gauche pour changer les paramètres. Le panneau droit reste dédié au mur ou au compartiment sélectionné.

Faites glisser l'arrière-plan pour faire pivoter, faites défiler pour zoomer et faites glisser avec le bouton droit de la souris vers le panoramique. **Caméra de retour** restaure le cadrage de la caméra. **Dessus** vous aide à sélectionner un compartiment étroit ou à déplacer un diviseur. **3D** montre les hauteurs du mur et l'assemblage fini. **Grille** Avec des lignes fines tous les 10 mm et des lignes principales tous les 50 mm, la grille de référence s'étend. Utilisez les boutons de pièce centrés au-dessus du modèle pour isoler l'organisateur, les inserts, la coque ou le couvercle lorsqu'il est présent. **Assemblage** montre les pièces disponibles ensemble pour la vue actuelle. Pour plusieurs niveaux, choisissez **Afficher la pile** dans le menu déroulant à côté **Organiseur** pour afficher la pile entière; choisissez **Niveau 1**, **Niveau 2**, ou un autre niveau pour revenir à ce niveau. L'éditeur de paramètres inférieur reste ouvert. En vue de la pile, **Habillage** et **Inserts** inclure des pièces de tous les niveaux. Sur les fenêtres plus étroites, ces boutons se déplacent à leur propre rangée au-dessous des barres d'outils. Avec le couvercle isolé, choisissez **En bas** pour inspecter son dessous. Appuyez sur **Essence** fermer le panneau d'outils. Utilisez les flèches courbes au-dessus du modèle pour annuler ou refaire un changement de conception.

Utilisez la barre supérieure pour choisir un langage d'interface ou basculez entre l'apparence claire, sombre et système. Les noms de contrôle dans ce guide suivent le langage d'interface sélectionné.

<a id="shape-and-dimensions"></a>
## Forme et dimensions

Sous **Forme → Socle**, choisissez un profil de base et de hauteur, puis cliquez sur **Créer à partir d'un modèle**. Le bouton remplace la construction actuelle. Enregistrer une copie nommée d'abord si vous voulez garder les deux modèles. **Ebauches simples** offre également un corps vide et un point de départ à quatre compartiments.

| Base | Quand le choisir |
| --- | --- |
| arrondi | Une empreinte rectangulaire avec des coins extérieurs réglables. |
| Capsule | Un long corps avec des extrémités semi-circulaires. Le gabarit incliné porte l'inclinaison à travers les deux extrémités courbes. |
| Cercle | Un organisateur rond dimensionné par le diamètre. |
| Ovale | Un contour courbé allongé avec largeur et profondeur réglables séparément. |
| Honeycomb | Un groupe de cellules hexagonales qui partagent des murs. Sélectionnez une cellule pour ajuster sa hauteur. |

Choisissez **Flat** pour une jante de niveau, **En pente** pour une montée continue, ou **Gradins** pour des niveaux de hauteur distincts. Les dimensions inférieures aux choix décrivent le modèle que vous êtes sur le point de créer. Une fois créé, modifiez le modèle sous **Dimensions**. Largeur et profondeur mesurent l'empreinte extérieure. Utilisez les dimensions intérieures du compartiment sélectionné pour le dimensionner pour un objet. Sur une base incurvée, vérifiez également les extrémités de rétrécissement dans la vue **Dessus**.

![Capsule inclinée avec une extrémité basse pour l'accès, une extrémité haute pour les objets longs et deux diviseurs transversaux](../../images/capsule-sloped.jpg)

**Forme → Supplémentaire** contient l'épaisseur du mur et du fond. Les parois plus épaisses prennent de l'espace des compartiments. **Inclinable sur socle plat** penche les murs vers l'avant jusqu'à 25° pendant que le fond reste horizontal. Ceci diffère d'une jante inclinée qui change la hauteur du mur le long du corps. Avec l'inclinaison activée, utilisez les dimensions finies dans la boîte de dialogue de téléchargement pour vérifier l'espace occupé par la partie imprimée.

<a id="exact-internal-dimensions"></a>
## Dimensions intérieures précises

Sélectionnez un compartiment et utilisez **Dimensions intérieures** dans le panneau droit, ou cliquez sur son étiquette de dimension bleue directement sur le modèle. Choisissez la largeur ou la profondeur, entrez des millimètres et cliquez à l'extérieur du champ d'application. Entrez également s'applique; Échappe annule. Le panneau droit conserve son bouton Appliquer. Les valeurs non valides ne peuvent pas changer le modèle. Chaque modification engagée peut être annulée en une seule étape.

Le diviseur orange est sa position actuelle; la ligne bleue en tirets prévisualise la nouvelle position. La séparation la plus proche sur l'axe choisi se déplace, gardant la taille extérieure du corps et l'épaisseur de la paroi inchangée. Le panneau montre les tailles voisines affectées. S'il n'y a pas de diviseur sur cet axe, ajuster les dimensions globales ou diviser le compartiment en premier.

Dans une rangée simple, commencer avec le compartiment 1 et continuer dans l'ordre; le dernier compartiment prend le reste. Les dimensions voisines ne sont pas verrouillées, de sorte que l'édition d'un compartiment antérieur peut redimensionner un compartiment ultérieur.

Les angles arrondis, les contours de la capsule, les chanfreins et les filets intérieurs restent supportés. La ligne bleue mesure la portée interne réelle à l'axe du compartiment, juste au-dessus du plancher. L'espace peut se rétrécir ailleurs autour des courbes: ajouter la clairance et vérifier l'empreinte de l'objet entier.

Sélectionnez un mur ou un diviseur pour modifier sa hauteur directement sur le modèle. Les murs plats montrent une valeur; les profils à deux points indiquent des valeurs A/B. Les règles liées à la hauteur et à la paroi en marche correspondent au panneau droit. Ces étiquettes modifient la hauteur, non la longueur du mur ou l'épaisseur globale.

<a id="compartments-and-dividers"></a>
## Compartiments et cloisons

Pour une mise en page rapide, utilisez **Compartiments → + Compartiment** pour diviser le plus grand compartiment. **− Compartiment** fusionne une paire voisine. Dans un nid d'abeilles, ces commandes ajoutent ou retirent une cellule extérieure et préservent la taille des autres. Deux cellules voisines partagent un mur aussi haut que la cellule plus haute.

Pour une mise en page exacte, passez à **Dessus** et sélectionnez le compartiment que vous voulez diviser. Choisissez **Nombre de pièces**, puis **Couper en largeur** pour diviser la largeur en compartiments plus étroits, ou **Séparer en profondeur** pour en faire des moins profonds. Vous pouvez diviser à nouveau l'un des résultats.

![Exemple de vue supérieure avec une baie pleine profondeur et deux compartiments plus petits](../../images/compartment-splits.svg)

Sélectionnez le diviseur pour le faire glisser, ou ajustez **Premier compartiment** sous **Position des partitions**. Seul le diviseur sélectionné se déplace; d'autres positions de diviseur restent fixes. Les compartiments adjacents changent de taille. Les déplacements qui laissent trop peu d'espace sont rejetés. Vérifiez les nouvelles dimensions intérieures de chaque côté. **Supprimer la partition** combine les compartiments et peut également enlever les diviseurs nichés à l'intérieur de cette division.

<a id="wall-heights-and-cutouts"></a>
## Hauteur des parois et découpes

Sélectionnez un mur extérieur ou un diviseur. **Une hauteur** fixe un haut de niveau. **Deux points** vous permettent de régler les hauteurs aux extrémités **A** et **B**, qui sont marqués sur le modèle. Choisissez **Directe**, **Ondulé** ou **Zigzag** pour façonner le bord le long du mur. La longueur d'onde contrôle la distance entre les répétitions. Dans un gabarit en marche, sélectionner une étape ajuste son niveau avec le mur relié et le diviseur.

Utilisez **Relier les hauteurs des murs adjacents** pour faire suivre un mur extérieur à ses voisins. Pour un diviseur, **Ajustement sur les murs adjacents** copie les deux hauteurs d'extrémité une fois. Répétez l'ajustement après avoir changé les murs voisins. **Comme les autres** retourne le mur sélectionné à la hauteur commune.

Ouvrir **Découpe du mur** pour faire une ouverture d'accès. Choisir une scoop lisse, une ouverture semi-cercle ou rectangulaire, régler la largeur et la profondeur, puis la déplacer le long du mur. La position s'étend de l'extrémité A à B. La profondeur est mesurée à partir du bord supérieur. Inspecter la lèvre restante au-dessus du sol. Choisir **Pas de découpe** pour remplir l'ouverture. Honeycomb utilise plutôt la hauteur des cellules.

<a id="corners-edges-and-decoration"></a>
## Angles, bords et décoration

Ouvrir **Forme → Coins et chanfreins**. Trois contrôles affectent différentes parties de l'impression.

| Contrôle | Où chercher | Ce que ça change |
| --- | --- | --- |
| Coins extérieurs | Vue en haut, contour extérieur | Tourner les coins de l'empreinte ou les couper à 45°. Zéro donne un coin carré. Disponible sur la famille rectangulaire de bases. |
| Compartiments intérieurs radieux | Vue supérieure, à l'intérieur d'une baie | Rondise la jonction verticale où deux murs se rencontrent. Les baies serrées limitent le rayon disponible. |
| Bord supérieur des murs et des cloisons | Coupe transversale à travers un mur | **Chanfrein** coupe un biseau plat et **Arrondi** courbe la lèvre. Les deux côtés des parois extérieures et les diviseurs reçoivent la finition. **Aucune** restaure la lèvre carrée. |

![Coupes transversales murales montrant les coins supérieurs carrés, chanfreinés et arrondis avec la même épaisseur de paroi](../../images/top-edge-profiles.svg)

Par exemple, sur un mur de 2 mm, essayez une chanfrein de 0,5 mm. Chaque côté perd 0,5 mm au sommet, laissant une bande plate de 1 mm. La taille maximale affichée dépend de l'épaisseur du mur. Avec **Arrondi**, la valeur est le rayon en millimètres.

- **Couleur de l'organiseur** change l'aperçu et les exportations en fonction des couleurs. Choisissez un swatch, une couleur personnalisée ou une couleur de filament configurée. Affectez la fente réelle du filament à l'exportation.
- **Bordure inférieure** ajoutent une bande de projection autour de la base. Choisissez des garnitures lisses, rayées ou graduées et fixez sa hauteur. Un manchon compatible peut s'y reposer. Trim nécessite un corps d'une seule pièce et est disponible sur le premier niveau.
- **Soulagement de l'organisateur** ajoute un motif surélevé directement au mur extérieur. Faites défiler le catalogue de motifs, la taille de l'ensemble et la hauteur de relief, et regardez la mise à jour du modèle pendant le chargement comme chaque calcul se termine. La valeur finale utilise la pleine précision. L'intérieur reste lisse. Les projections augmentent les dimensions extérieures. Choisir **Lisse** pour enlever le soulagement.
- **Signature et badge** mettent du lettrage ou un symbole sur un côté sélectionné. Entrez le texte, choisissez une police, fixez la hauteur de la lettre et la position verticale, puis choisissez le lettrage ou la gravure relevée et fixez sa hauteur ou sa profondeur. Une étoile ou un cœur peut accompagner le texte. Sur les organisateurs circulaires et ovales, le texte et les icônes suivent le mur incurvé, y compris dans les exportations STL et 3MF. L'espacement des lettres est mesuré le long de la surface. Choisissez Front, Arrière, Gauche ou Droite pour centrer l'inscription sur ce côté. Sur les cercles et ovales avec des hauteurs de mur liées ou variables, le lettrage reste sous le profil mur le plus bas et coupé. Lettrage Honeycomb n'est pas encore supporté; les coquilles couvrant le côté choisi et le relief peuvent également empêcher le le lettrage.

<a id="inserts-tiers-and-lids"></a>
## Inserts, étages et couvercles

**Inserts amovibles.** Sélectionnez un compartiment, puis développez **Insertion de baie** sur la droite. **Vide** fait une tasse ouverte. **Pour les petites choses** ajoute une grille avec des rangées et des colonnes réglables. **Pour les poignées** crée des prises pour les stylos ou les outils. Réglez le diamètre intérieur de la prise et l'application s'adapte autant que l'insert le permet. Choisissez un contour ajusté, arrondi, circulaire, ovale ou hexagonal et une couleur. **Retirer l'insert** nettoie cette baie. Une tasse vide est encore une partie imprimable.

L'insert suit son compartiment avec un dégagement d'au moins 0,5 mm. Ses parois et son fond sont d'une épaisseur de 1,2 mm et sa hauteur s'ajuste à environ 1 mm au-dessous de la jante. Un insert dans un organisateur incliné sort le long de la pente. Isolate **Inserts** pour les inspecter, puis export **Organisateur et accessoires**. Les inserts nécessitent une seule pièce d'impression.

**Des plateaux empilés.** Commencez par une jante de niveau, puis ouvrez **Forme → Niveaux → + Niveau**. Vous pouvez utiliser deux à cinq niveaux; **− Niveau** supprime un niveau. Les niveaux partagent une empreinte mais peuvent avoir des compartiments, des hauteurs, des couleurs et des décorations différentes.

1. Dans le menu déroulant à côté de **Organiseur** au-dessus du modèle, choisissez **Niveau 1**, **Niveau 2**, ou un autre niveau. Ce niveau est affiché seul, et l'éditeur de paramètres reste ouvert.
2. Modifiez le niveau sélectionné avec les commandes de forme, de compartiment, de relief et de shell habituelles. Le changement de niveau ne copie pas ses paramètres à d'autres niveaux.
3. Choisissez **Afficher la pile** dans le même menu déroulant pour inspecter tous les niveaux et accessoires ensemble. Utilisez **Assemblage**, **Organiseur**, **Inserts**, **Habillage** ou **Couvercle** pour montrer les pièces dont vous avez besoin. Retournez à un niveau numéroté pour continuer à l'éditer.
4. Sous **Forme → Niveaux**, ajustez **Jeu d'ajustement** et imprimez un petit échantillon d'ajustement avant de vous engager dans la pile complète. Diviseurs inférieurs qui se tiennent au-dessus de la jante.

Le relief intégré et SVG décorent l'extérieur de chaque niveau tout en accouplement les cols, les languettes et les prises restent lisses. Les coquillages et les panneaux décoratifs peuvent couvrir les différents niveaux. Pour les panneaux, garder **Décalage de bord** au moins 3 mm afin qu'ils nettoient les cols accouplement.

Avec une coquille enveloppée, une langue à l'intérieur du mur inférieur s'adapte à une prise sous le plancher du plateau supérieur. Les largeurs des compartiments, les profondeurs et les hauteurs utilisables restent inchangées; chaque prise ajoute 2,2 mm à la hauteur extérieure de la pile assemblée. Les coquilles correspondantes se rencontrent à une bande étroite de support de 0,8 mm. Les coquillages glissent d'en haut; séparez les niveaux avant de les enlever. Chaque coquillage exporte en tant que partie distincte numérotée.

**Bordure inférieure** n'est disponible que sur le premier niveau (le plus bas): choisissez lisses, anneaux ou marches. Avec une enveloppe compatible, la garniture supporte également la coquille. Des panneaux séparés s'assoient au-dessus de la garniture avec l'offset du bord sélectionné. Les nouveaux niveaux supérieurs n'héritent pas de la garniture. Si la languette ne peut pas s'insérer dans l'épaisseur du mur, réduisez **Jeu d'ajustement**; l'application ne épaissit pas automatiquement le mur.

**Casse-toi.** Dans **Forme → Couvercle**, cliquez sur **+ Couverture**. Utilisez une jante supérieure de niveau avec des hauteurs de paroi extérieures égales et des diviseurs à ou en dessous. L'impression en Tilt, en nid d'abeille et sectionnel empêche cette coupe. Choisissez **Coiffant** pour un capuchon extérieur ou **Encastré** pour une plaque de 2 mm qui s'installe à l'intérieur du plateau. L'option inset coupe un siège dans la paroi supérieure avec une clairance de 0,35 mm de chaque côté et laisse la place au-dessus des diviseurs et inserts. Il faut au moins 2 mm d'épaisseur de paroi et 4 mm de profondeur intérieure. Ajoutez une découpe murale ou une poignée pour le soulever. Le couvercle recoupant a une jante de localisation avec une clairance de 0,5 mm. Choisissez son motif supérieur, son échelle et sa profondeur, puis placez la hauteur et la finition de la jante. Pour une poignée, choisissez cylindrique ou barre, fixez sa taille et sa hauteur, et en option chanfreinez ou autour de ses bords.

**Un motif bicolore.** Activez-le sur chaque coupe de couvercle, puis choisissez la branche d'olive, les feuilles de Ginkgo, la fronde de fougère, les vagues de marée, les cailloux de rivière anneaux de croissance ou les cellules Voronoi. Choisissez une couleur de base et une couleur de motif. La plaque de 3,2 mm a un support solide de 1,6 mm et une face à motif de 1,6 mm. La jante de localisation extérieure et la poignée optionnelle ajoutent à la hauteur totale. Pour un couvercle encastré, laisser au moins 5,2 mm de profondeur intérieure. Exportations en 3MF pour garder les deux couleurs ensemble comme un seul couvercle, et attribuer les deux parties à vos fentes de filament. Pour la branche olive, les feuilles de Ginkgo, la fronde de fer, les vagues de marée et les anneaux de croissance, **Motif ajouré** fait le motif à partir d'ouvertures dans une feuille supérieure continue. Combinez-le avec **Motif en relief** pour exposer le support encastré à travers les ouvertures. Activer **Motif en relief** pour laisser les ouvertures vides dans la partie supérieure de 1,6 mm. Désactivez-le pour une incrustation lisse. Les couvercles encastrés surélevés impriment d'abord le support; les couvercles recoupent l'impression à motif vers le bas. Vérifiez le pont sur les recoins dans la trancheuse.

![Six modèles de couvercle à deux tons](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Habillages monoblocs et panneaux

Ouvrez **Habillage** et choisissez un motif. Un shell est imprimé séparément de l'organisateur. Si vous voulez le motif sur le corps lui-même, utilisez **Forme → Soulagement de l'organisateur**.

| Mode Shell | Montage et montage |
| --- | --- |
| **Autour du corps** | Un manchon sans fond suit le périmètre et les hauteurs du mur. Glissez-le sur le corps d'en haut, en suivant la direction du mur sur un modèle incliné. Le panneau indique si un rebord de support est présent ou si le manchon repose sur la table. |
| **Panneaux décoratifs** | Des panneaux encadrés séparés recouvrent les côtés sélectionnés et laissent les coins exposés. Choisissez les côtés et ajustez **Décalage de bord**. Collez les panneaux sans attaches. Avec des goupilles cachées, appuyez tout droit sur le mur correspondant pour une fixation permanente. |

![Vue supérieure d'une manche enveloppant les coins et les panneaux séparés se terminant avant chaque coin](../../images/shell-fit.svg)

Choisissez le motif, définissez sa taille et set **Épaisseur de la coque**. Pour un manchon d'une pièce, ajustez **Largeur de la bordure** pour son cadre solide. Les panneaux décoratifs ont un cadre fixe; utilisez **Décalage de bord** pour les positionner sur le mur. Sous **Atterrissage**, **Dégagement de chaque côté** fixe l'écart entre le manchon et l'organisateur. Un écart de 0,5 mm de chaque côté ajoute 1 mm sur deux côtés opposés avant de compter l'épaisseur de la coquille. Comparer **Assemblage** avec la vue isolée **Habillage** pour juger du résultat. **Télécharger le shell** exporte le couvercle séparément, et **Supprimer la coque** la retire du design.

Les panneaux nécessitent une base rectangulaire compatible. Le passage aux panneaux préserve l'épaisseur de la paroi et l'espace du compartiment. Les prises de montage cachées nécessitent des parois d'au moins 3,2 mm d'épaisseur sans relief. Pour les murs plus minces, y compris 2,4 mm, utiliser des panneaux sans attaches et les coller en place. L'épaisseur de la paroi n'est jamais relevée automatiquement. L'offset du bord du panneau contrôle la marge sur le visage, tandis que l'écartement du manchon contrôle l'ajustement coulissant. Avec les garnitures inférieures, l'offset inférieur commence en haut de la garniture; les fixations et les prises de panneaux suivent le même profil. Les niveaux doivent être décalés d'au moins 3 mm pour dégager leurs colliers d'accouplement.

<a id="projects-and-backups"></a>
## Projets et sauvegardes

Utilisez **Mes projets → Enregistrer une copie** pour nommer un dessin ou faire une variante avant d'expérimenter. Le projet ouvert enregistre automatiquement dans ce navigateur. La bibliothèque vous permet de rechercher, ouvrir, renommer, supprimer ou télécharger un projet. **Enregistrer le projet** dans la barre supérieure télécharge une sauvegarde JSON modifiable. Utilisez **Ouvrir** pour charger ce fichier, y compris sur un autre ordinateur ou dans une installation locale.

Une copie de récupération locale temporaire protège les changements pendant l'enregistrement de la base de données du navigateur; réinitialise la copie si une écriture a été interrompue. Un instantané séparé peut récupérer une session actuelle endommagée, y compris l'historique d'annulation. Si aucune copie valide ne peut être restaurée, l'enregistrement automatique s'arrête au lieu de remplacer le projet stocké par un modèle de démarrage. Gardez les sauvegardes JSON téléchargeables: la suppression des données du navigateur ou l'échec des deux mécanismes de stockage ne peut pas être récupéré automatiquement.

Les vérifications d'exportation appartiennent à la révision en cours du projet, aux pièces sélectionnées et à la position de montage. La modification de ces dernières invalide la vérification précédente; un ancien résultat ne peut pas être téléchargé comme nouveau modèle. Les calculs échoués conservent les modifications. Un aperçu décroché signale une erreur après deux minutes; la prochaine modification de géométrie commence un nouveau calcul.

Lorsque le même projet ou tiroir est édité dans plusieurs onglets, des modifications contradictoires sont enregistrées séparément **Copy from another tab**. L'autre version est conservée, et l'onglet d'édition continue avec sa copie. Comparez les versions dans **Mes projets** ou le sélecteur de tiroir et renommez la copie si vous voulez la conserver. Réouverture d'un onglet organisateur restaure son propre projet sauvegardé. Les modifications ne sont pas automatiquement fusionnées entre les onglets.

Gardez une sauvegarde téléchargée avant d'effacer les données du navigateur. Chaque navigateur et adresse du site a sa propre bibliothèque. Les fentes filamentaires sont stockées séparément pour l'imprimante dans le navigateur. Configurez-les à nouveau lors du déplacement vers un autre appareil. Pour l'application locale téléchargeable, voir [Installation locale](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Réglages d’impression et division en parties

Sous **Impression**, sélectionnez la configuration de votre imprimante et de votre tête ou choisissez **Dimensions personnalisées**. Vérifiez la largeur, la profondeur et la hauteur de construction. Le préréglage fournit le volume de construction. Choisissez l'imprimante, la buse, le matériau et les profils de coupe dans votre trancheur.

Pour un modèle qui dépasse le lit, utilisez les coupes suggérées ou choisissez deux ou trois sections quand elles sont disponibles. Lire les positions de couture proposées et l'utilisation **Écarter les pièces** pour voir comment les sections se rencontrent. Le fractionnement augmente l'épaisseur de la paroi à au moins 5 mm et l'épaisseur du plancher à au moins 3 mm. Revérifier les dimensions intérieures. Retirez les coquilles et insérez avant de les diviser. Les plateaux empilés, les modèles inclinés et le cercle, les bases ovales et en nid d'abeille nécessitent l'impression d'une seule pièce. **Retourner le modèle solide** Éteignez la section. Vérifiez à nouveau l'épaisseur si vous voulez restaurer des dimensions antérieures.

**Échantillon commun** les téléchargements se terminent pour essayer à la même échelle et les paramètres d'impression que le corps final. Placez-les séparément avec leurs bases. Après refroidissement, les goupilles nominales Ø 3.2 × 8 mm s'inscrivent dans des trous Ø 3.3 mm, de 4,5 mm de profondeur de chaque côté de la couture. Vérifiez l'alignement, puis utilisez des broches et de la colle pour assembler les sections imprimées. Utilisation **Télécharger toutes les parties** pour l'organisateur sectionné lui-même.

<a id="download-and-slice"></a>
## Téléchargement et préparation dans le trancheur

1. Dans **Impression**, configurer les fentes de filament si vous voulez un fichier multicolore. Correspondre les nombres de fentes et les couleurs de votre trancheur. Sur un Snapmaker U1, les fentes 1–4 correspondent à T0–T3. Ajouter jusqu'à 16 fentes, définir chaque couleur et éventuellement nommer son matériau. Couleur est un guide visuel approximatif, pas une simulation d'une nuance imprimée ou mixte. Configurer les couleurs exactes et mélanger dans votre trancheur. Sélectionnez n'importe quelle carte de filament et choisissez **Supprimer le filament de la fente N** pour le supprimer. Les numéros de fente restants ne changent pas: supprimer la fente 6 feuilles fente 7 comme fente 7. **+ Fente N** ajoute de nouveau le nombre le plus bas disponible; la limite reste à 16. Supprimer un filament ne change pas la couleur du modèle.
2. Cliquez sur **↓ Télécharger**. Choisir **Organisateur et accessoires**, **Coque uniquement** ou **L'ensemble**, selon les pièces dont vous avez besoin. Pour un modèle sectionné, exportez le kit.
3. Sélectionnez un format ci-dessous. Pour 3MF, assignez une fente de filament à chaque pièce ou laissez-la pour affectation dans le trancheur. Orca peut utiliser le premier filament pour les pièces non assignées.
4. Attendez le contrôle de la géométrie et de la taille. Lisez les dimensions de chaque pièce et toute instruction pour le faire tourner à 90° sur le lit. Le contrôle se réserve 2 mm sur les bords du lit. Télécharger avec le bouton de format en bas de la boîte de dialogue.
5. Ouvrir le résultat dans votre trancheur à l'échelle **Échelle 100 % en millimètres**. Disposer l'ensemble complet, vérifier les surplombs et les détails minces, et prévisualiser la première couche et les diviseurs. Pour une impression multicolore, vérifier l'attribution du filament de chaque pièce avant de trancher.

| Format | Choisissez-le pour | Que faire avec le téléchargement |
| --- | --- | --- |
| STL | Géométrie pour une impression en une seule couleur | Ouvrir la STL dans la trancheuse. Extraire d'abord la ZIP si l'exportation contient plusieurs STL. |
| 3MF | Un kit avec des pièces séparées, des couleurs et des filaments | Ouvrez-le dans votre trancheur et vérifiez les pièces et les fentes. ReplixGrid laisse l'imprimante et les profils de matériau à la trancheur. |
| OBJ + MTL | Un modèle coloré pour un outil qui accepte OBJ | Gardez la géométrie et le fichier matériel ensemble. Le modèle utilise des millimètres avec Z up. |
| Projet JSON | Continuer à modifier les compartiments, dimensions ou accessoires | Utilisez **Enregistrer le projet** et rouvrez-le avec **Ouvrir** dans ReplixGrid. |


Pour correspondre à une couleur numérique de votre trancheur, collez son code à six chiffres **Code HEX**, par exemple `#E63522`, à côté du sélectionneur de couleurs. Le premier `#` est facultatif. Les codes valides mettent à jour immédiatement l'aperçu; le texte incomplet ou invalide n'est pas appliqué et revient à la couleur enregistrée lorsque vous quittez le champ. Un code HEX correspondant ne simule pas l'apparence du filament, l'éclairage ou un mélange de couleurs physiques.

<a id="troubleshooting"></a>
## Dépannage

| Ce que vous voyez | Quoi vérifier |
| --- | --- |
| L'objet correspond aux dimensions extérieures mais ne s'insère pas dans une baie | Sélectionnez le compartiment et vérifiez ses mesures à l'intérieur. Permet l'épaisseur du mur, les extrémités courbes, le rayon intérieur du coin et les inserts amovibles. |
| Sélection d'un diviseur continue de sélectionner le mur devant | Passez à **Dessus** ou ouvrez **Toutes les parois et compartiments** sur la droite. |
| Le couvercle ou le niveau suivant ne peut pas être ajouté | Vérifiez une jante de niveau, des hauteurs extérieures égales, des diviseurs de saillie, des inclinaisons ou des scintillements. Pour une pile, vérifiez également les clips de coque existants et le dégagement d'ajustement par rapport à l'épaisseur du mur. |
| Une partie dépasse le lit bien que l'empreinte semblait assez petite | Lire les dimensions terminées dans la boîte de dialogue de téléchargement. Tilt, relief, garniture et shells peuvent s'étendre au-delà de la base. Vérifiez la configuration et la rotation de l'imprimante sélectionnée. |
| Les fixations de panneaux cachés ne sont pas disponibles | Utiliser des murs d'au moins 3,2 mm d'épaisseur sans relief, ou laisser les attaches et coller les panneaux. |
| Les panneaux chevauchent la garniture inférieure ou la jante de niveau dans une conception ancienne | Réglez un décalage de bord d'au moins 3 mm pour les niveaux. Le décalage inférieur est mesuré à partir du haut de la garniture inférieure. Régénérer et télécharger les pièces après avoir modifié les paramètres. |
| Une impression téléchargée a les mauvaises couleurs | Utilisez 3MF, correspondez aux numéros de fente dans **Impression**, puis inspectez les attributions par pièce dans le trancheur. STL porte la géométrie seulement. |
| Une conception sauvegardée sur un autre appareil est manquante | Transférer son projet JSON et utiliser **Ouvrir**. Les bibliothèques de navigateur sont locales à chaque appareil et adresse du site. |

<a id="project-variants"></a>
## Variantes de projet

Cliquez sur **+ Variante** dans la barre supérieure, ou ouvrez **Mes projets** et sélectionnez **Nouvelle variante**. Entrez un nom et cliquez sur **Créer une variante**. La nouvelle variante est une copie indépendante; l'original reste sauvegardé. Un original non nommé est conservé sous **Brouillon**.

Utilisez le sélecteur à côté de **+ Variante** pour basculer entre les modèles associés, ou choisissez-en un sous **Variantes de ce projet** dans Mes projets. Chaque variante enregistre automatiquement et conserve sa propre histoire de déso/redo après commutation ou rechargement. Une variante nouvellement créée commence avec une histoire vide.

Utilisez **Projet séparé → Enregistrer une copie** pour créer un projet non lié. Renommer ou supprimer des modèles individuels dans Mes projets; supprimer l'original ne supprime pas ses variantes.

**Télécharger** exporte le modèle sélectionné pour l'impression. **Enregistrer le projet** télécharger ce modèle en tant que JSON modifiable; **Fichier** sur une carte de bibliothèque télécharge le modèle correspondant. JSON contient un modèle, sans ses variantes connexes ou son historique de défaire.


<a id="shared-styles"></a>
## Styles partagés

1. Ouvrez un projet avec les couleurs et les motifs que vous souhaitez réutiliser.
2. Sous **Forme → Style commun**, saisissez un nom et cliquez sur **Enregistrer le style actuel**.
3. Ouvrez un autre projet ou variante, retournez au style **Style commun** et sélectionnez le style sauvegardé.
4. Choisissez **Couleurs**, **Motifs**, ou les deux. La revue **Sera appliqué** et tout **Sera ignoré** messages, puis cliquez **Appliquer le style**.

Un style capture la couleur et le relief de l'organisateur, ainsi que les couleurs et les motifs d'une coquille et d'un couvercle existants. Un style de corps lisse enlève le relief du corps de la destination. Dimensions, disposition des compartiments, épaisseurs de paroi, ajustement du couvercle, poignées et dégagements de coque restent inchangés. Les couvercles ou les coquilles manquants ne sont pas ajoutés.

L'application est une étape d'annulation et crée une copie indépendante: les modifications ultérieures à un organisateur ne changent pas les autres. La suppression d'un style sauvegardé ne modifie pas les projets qui l'utilisent déjà.

Les styles sauvegardés appartiennent à ce navigateur et à l'adresse du site. Un projet JSON préserve l'apparence appliquée, mais n'inclut pas la bibliothèque de style sauvegardé. Pour réutiliser un style sur un autre appareil, ouvrez le JSON du projet style et enregistrez à nouveau son style actuel.


<a id="drawer-arrangements"></a>
## Agencement des organiseurs dans un tiroir

Choisissez **DRAWER** à côté de **Organiseur**, puis **Create drawer**. Entrez la longueur intérieure mesurée, la largeur, la hauteur utilisable et la clairance. La clairance s'applique à la fois aux murs du tiroir et entre les plateaux.

Les nouveaux tiroirs commencent à 180 × 280 mm, le bord avant étant marqué en bas. **Vue pivotante de 90°** ne change que l'orientation de la vue; les dimensions des tiroirs, les coordonnées des plateaux et les modèles exportés restent inchangées. Les tiroirs existants conservent leurs dimensions.

Utilisez **New organizer** pour créer un plateau directement dans le tiroir. Définissez ses dimensions, puis modifiez les compartiments et accessoires dans l'éditeur habituel de l'organisateur. **Retour au tiroir** revient à son emplacement. **Add saved organizer** ajoute une copie indépendante d'un projet ou d'une variante sauvegardée; l'éditer ne change jamais sa source.

Faites glisser les plateaux en vue supérieure ou entrez les coordonnées X/Y mesurées du coin supérieur gauche au plateau. Rotation de 90 degrés, dupliquer ou enlever les plateaux. Les touches fléchées déplacent un plateau focalisé de 1 mm (Shift: 10 mm).

Le diagramme montre les rectangles de délimitation extérieurs assemblés, y compris les coquilles, les garnitures, les couvercles et les niveaux. Les formes courbées sont vérifiées de façon prudente plutôt que étroitement nichées. Les conflits de bordure, de dégagement et de hauteur sont mis en évidence.

Les tiroirs économisent localement dans ce navigateur, séparément des projets de l'organisateur. Téléchargez un tiroir JSON pour sauvegarde ou transfert; l'ouverture d'un tiroir crée une copie séparée du tiroir. Sélectionnez un tiroir et choisissez **Download selected tray** pour sa propre exportation STL, 3MF ou OBJ avec les contrôles de taille d'imprimante existants.

<a id="mounting-plates"></a>
### Plaques de montage

Dans **DRAWER → Drawer base**, choisissez **Mounting plate**. La longueur/la largeur du tiroir et le dégagement du mur déterminent la zone couverte. Entrez la largeur et la profondeur utilisables du lit d'imprimante **Lit imprimante 3D** séparément: ces dimensions déterminent la taille maximale de la section et donc le nombre de sections. Le calcul inclut des projections de joint et une marge d'impression de 2 mm à chaque bord du lit. Les dimensions ne doivent pas être multiples de la grille de 20 mm; les sections de bord correspondent à l'espace restant.

**Download sections (ZIP)** créent un nombre de 3MF par tâche d'impression, une carte d'assemblage SVG et une liste de coordonnées. La carte utilise l'orientation originale du tiroir, indépendamment de la rotation de la vue. R indique les rangées de haut en bas, les colonnes C de gauche à droite. Des queues de dos adjacentes inférieures en place d'en haut. Première impression **Download joint sample**, contenant deux petites sections adjacentes; vérifiez l'assemblage avec votre imprimante avant d'imprimer l'ensemble complet. Les joints utilisent une couture de 0,05 mm et un profilé de 0,03 mm.

Avec le mode plaque activé, les téléchargements de plateau comprennent des prises de position et de rotation inférieures de ce plateau. Les dimensions du compartiment interne sont préservées. Le plateau devient de 2,1 mm de haut; y compris la plaque de 2 mm, le contrôle de l'ajustement du tiroir ajoute 4,1 mm. Après le déplacement ou la rotation d'un plateau, téléchargez-le à nouveau: ses prises doivent correspondre aux positions de la cheville.

Le dégagement radial de la prise est de 0,12 mm. Imprimez un petit organisateur couvrant deux sections pour vérifier l'ajustement avec les réglages de votre matériau et de la couche. Les prises conservent l'organisateur latéralement; le soulever vers le haut pour le retirer. Exporter utilise seulement la géométrie: choisissez votre imprimante et les profils de matériau dans le trancheur et inspectez les toits de la prise avant l'impression.

Le montage prend actuellement en charge les organisateurs non éparpillés sans inclinaison, avec au moins trois sockets entièrement pris en charge. Les petits plateaux peuvent devoir être déplacés ou agrandis. Les niveaux supérieurs et les coquilles conservent leur géométrie existante.

<a id="custom-svg-relief"></a>
## Relief SVG personnalisé

Sous **Forme → Soulagement de l'organisateur → My SVGs**, choisissez **Upload SVG** ou déposez un fichier dans la zone de téléchargement. Sélectionnez une vignette enregistrée pour la réutiliser. La même bibliothèque est disponible sous **Forme → Couvercle → My SVGs** et **Habillage → Motif → My SVGs**. Chaque cible conserve ses propres paramètres de configuration et de placement.

Choisir **Single motif** ou **Repeat**, sélectionner les murs extérieurs et ajuster la largeur du motif en millimètres, rotation, décalage horizontal/vertical et espace de répétition. Largeur et hauteur conservent les proportions d'origine. Placement est centré sur chaque côté sélectionné; sur les corps incurvés, les côtés correspondent à quatre secteurs extérieurs. Le décalage vertical positif déplace le motif vers le haut. Le motif suit le contour extérieur. Les répétitions sont placées seulement là où un motif complet s'adapte sous la jante supérieure, autour des découpes et à l'intérieur de chaque côté. Les motifs simples sont clippés à ces limites. La profondeur de déblocage utilise le contrôle existant **Profondeur de relief / Intensité**. Le mur d'origine et les compartiments internes sont préservés; les dimensions extérieures augmentent.

Les SVG supportés contiennent des chemins remplis, des polygones, des rectangles, des cercles ou des ellipses, y compris des trous et des transformations de groupe. Convertir le texte et les traits en chemins remplis avant d'exporter à partir de votre éditeur vectoriel. Photos, références externes, filtres, masques, chemins de coupure, gradients, blocs de style CSS et références aux éléments réutilisables ( `use` ) ne sont pas pris en charge. Les définitions vides ou non utilisées contenant des formes supportées sont ignorées. Les couleurs deviennent une seule forme relevée en utilisant la couleur de l'organisateur. Les limites sont de 200 KB, 512 éléments XML, 128 formes remplies et 6 000 points de contour échantillonnés; des motifs trop complexes ou des répétitions excessives sont rejetés avec un message. Les courbes sont approchées par des contours polygonaux pour l'impression.

Chaque projet intègre une copie indépendante de ses contours utilisés, de sorte que les projets téléchargés peuvent être rouverts sur un autre appareil sans la source SVG ou la bibliothèque. La suppression d'une entrée de bibliothèque laisse inchangés les projets existants. **Style commun** porte également des motifs de corps, de couvercle et de coquilles personnalisés à un autre organisateur. Les couvercles ou les coquilles manquants sont ignorés, comme avec les styles intégrés.

<a id="choose-an-svg-for-its-intended-use"></a>
### Choisir un SVG adapté à l’usage

Un SVG est un format de dessin, pas une garantie de géométrie imprimable. **Le succès d'importation signifie seulement que les contours remplis pris en charge ont été lus.** La surface choisie, la taille et le mode d'application doivent encore passer la vérification de géométrie.

| Utilisation prévue | Ce que deviennent les zones remplies | Quoi préparer |
| --- | --- | --- |
| Aide aux organisateurs | Matériau relevé attaché à une paroi solide | Des motifs séparés et des trous intérieurs peuvent fonctionner parce que le mur les soutient. |
| Motif de couvercle relevé | Matériel soulevé sur support solide | Des trous intérieurs sont autorisés; gardez l'ensemble du dessin à l'intérieur du cadre disponible et hors de l'atterrissage de la poignée. |
| Couvercle à travers les ouvertures | Matériau enlevé du couvercle | Chaque pièce restante doit se connecter au couvercle environnant. Les détails intérieurs fermés nécessitent des ponts pochoirs. |
| Revêtement ou panneaux décoratifs | Ouvertures coupées à travers le couvercle | Utilisez un dessin compatible avec le pochoir. Le cadre et le motif restants doivent former un matériau connecté. |

Pour préparer un fichier:

1. Convertissez le texte et **traits sur les contours** dans votre éditeur vectoriel. Une ligne visible avec `fill="none"` est une course, pas une zone remplie.
2. Supprimer les rectangles d'arrière-plan à moins que vous vouliez que toute cette zone devienne un relief ou une ouverture. Les couleurs SVG ne séparent pas les matériaux et les formes blanches n'effacent pas automatiquement les formes plus foncées en dessous.
3. Vérifiez les chemins composés dans l'éditeur vectoriel. Un commentaire disant que le trou ne crée pas un: l'enroulement du chemin et `fill-rule` déterminent si une zone intérieure est remplie.
4. Pour les ouvertures, raccordez les détails intérieurs fermés au matériau environnant avec des ponts. L'augmentation de l'écart entre les motifs répétés ne **pas** fixer un détail lâche à l'intérieur d'un motif.
5. Préférez un seul motif pour le mode répétitif. Si le SVG contient déjà une grille de motifs, son réglage de largeur écaille la grille **grille complète**, pas chaque motif. De petites caractéristiques peuvent devenir trop minces à imprimer.
6. Attendez une vérification de construction et d'exportation réussie, puis inspectez l'aperçu du trancheur. Si le bâtiment échoue, la scène peut conserver le dernier modèle réussi; ce modèle ne représente pas les paramètres actuels échoués.

Par exemple, une silhouette de feuille solide peut fonctionner à la fois comme relief et comme une ouverture en forme de feuille. Une feuille avec une veine entièrement fermée peut fonctionner comme relief, mais la coupe de la feuille environnante peut laisser la veine libre. Une grille d'hexagone rempli peut fonctionner comme perforations si les autres toiles restent connectées et assez épaisses; une illustration multicolore dessinée avec des traits doit d'abord être préparée.

<a id="svg-lids-and-perforated-shells"></a>
### Couvercles SVG et habillages perforés

Ajouter un couvercle, puis choisir **My SVGs**. **Relèvement (décoration)** fait un seul couvercle connecté avec le motif sur un support solide; fixer sa hauteur de relief (0,2–1 mm) et sa couleur de base. **Par pochoir (coupé)** enlève les zones SVG remplies à travers le couvercle. Les deux modes conservent un cadre de bord de 2 mm et la lèvre accouplement. Une poignée séparée maintient un atterrissage solide; déplacer le dessin si un motif unique est en conflit avec lui.

Pour un shell, sélectionnez **My SVGs**, puis un dessin de bibliothèque. Les zones remplies deviennent par des ouvertures. Utilisez un motif ou répètez sur les côtés sélectionnés d'un manchon enveloppé. Sur **Panneaux décoratifs**, le dessin est répété indépendamment sur chaque panneau sélectionné; les cadres et les emplacements de montage existants sont conservés. La taille initiale du motif tient compte de la hauteur du shell. Réglez la largeur du cadre, la taille du motif, la rotation, la position et l'espacement au besoin.

Sur les couvercles et les coquilles, seuls des motifs complets sont placés à l'intérieur du cadre disponible, y compris des motifs simples. Si aucun ne s'adapte, réduire la taille ou l'offset. Les détails intérieurs fermés (par exemple le centre d'une découpe en forme d'anneau) peuvent devenir des îles lâches. Ajouter des ponts dans votre éditeur vectoriel ou utiliser la décoration surélevée sur le couvercle. L'application bloque la géométrie déconnectée au lieu de jeter silencieusement des pièces.

Les motifs sont inclus dans les exportations de pièces individuelles, les kits complets et les travaux d'impression à tirage complet. Le passage à **Built-in** supprime le motif personnalisé seulement de cette cible. La suppression d'une vignette de bibliothèque ne supprime pas les motifs intégrés des projets.

<a id="download-ready-to-use-stencil-svgs"></a>
### Télécharger des pochoirs SVG prêts à utiliser

Ces exemples contiennent des contours remplis avec des ponts matériels. Les zones noires deviennent des ouvertures en mode **Par pochoir (coupé)**. Enregistrez les liens ci-dessous sous les fichiers `.svg`; si le navigateur affiche le dessin, utilisez **Enregistrer la page sous** et conservez l'extension `.svg`.

| Télécharger | Motif | Largeur de départ suggérée |
| --- | --- | --- |
| [Feuilles organiques — télécharger SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinq feuilles avec des ponts reliant les détails intérieurs | 20 mm; réduire pour une coque basse |
| [Double hexagone — télécharger SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Une tuile double-hexagone avec quatre ponts et une ouverture centrale | 20–24 mm; utiliser **Repeat** pour une grille |

**Sur un couvercle:** ajouter un couvercle sous **Forme → Couvercle**, ouvrir **My SVGs**, et télécharger l'un ou l'autre fichier. Choisissez **Par pochoir (coupé)**. Commencez par **Single motif** pour l'inspecter, ou sélectionnez **Repeat** pour remplir la zone disponible avec des copies complètes. Réglez la largeur, la rotation et les décalages X/Y. Répétez l'espacement est l'espacement entre les copies complètes, et non la largeur de leurs ponts internes. Commencez par un espacement de 4 mm.

**Sur une coque:** ouvert **Habillage → Motif → My SVGs**, ou choisissez l'onglet **Habillage** dans le studio, puis sélectionnez le même fichier dans la bibliothèque partagée. Les Shells utilisent toujours par des ouvertures. Utilisez **Repeat** pour une bande autour de la coquille; **Supplémentaire → SVG walls** sélectionne les côtés d'une coquille enveloppée. Les panneaux décoratifs utilisent les côtés du panneau sélectionné. Chaque surface conserve ses propres réglages de placement et d'épaisseur.

Si un motif ne s'adapte pas, réduire sa largeur ou son décalage. Sur une coquille basse, essayez de 12 à 16 mm pour le groupe de feuilles. L'augmentation de l'épaisseur de la coquille peut élargir sa bordure automatique et laisser moins d'espace pour le dessin. L'écaillage réduit également les ponts: inspectez-les dans votre trancheur et imprimez un petit échantillon pour votre buse et votre matériau. L'espacement répété ne peut pas élargir les ponts internes. Attendez la fin de l'aperçu actuel, puis utilisez **Télécharger** de vérifier et d'exporter le couvercle ou la coque.

<a id="numeric-sliders-and-valid-ranges"></a>
### Curseurs numériques et plages autorisées

Les réglages numériques montrent **Min.** et **Max** au-dessus d'une piste verte mince, avec un marqueur blanc pour la valeur courante. Les bouchons rouges marquent l'extérieur de l'intervalle autorisé; ils ne sont pas une cote de force d'impression. Faites glisser le marqueur, utilisez les touches fléchées tout en focalisant, ou tapez un nombre exact et appuyez sur Entrée. Le champ numérique et le curseur utilisent les mêmes limites. Certaines limites changent avec le modèle; une valeur à l'intérieur de la plage d'un curseur peut toujours entrer en conflit avec un autre réglage, alors suivez n'importe quel avertissement de géométrie avant d'exporter.

<a id="whole-drawer-export"></a>
## Exporter tout le tiroir

Choisissez **DRAWER → Print entire drawer** pour préparer tous les plateaux, leurs accessoires et toutes les sections de plaques de montage activées. Les plateaux montés reçoivent des prises pour leurs positions sauvegardées; les plateaux libres ordinaires gardent leurs bases existantes. Les projets d'impression fractionnée comprennent leurs pièces et leurs broches.

Ensemble **Printer bed length** (horizontale), **Printer bed width** (verticale), hauteur d'impression et espacement. Les dimensions initiales proviennent des réglages des plaques de montage ou de la zone d'impression du premier plateau; les paramètres d'exportation ultérieurs sont enregistrés avec ce tiroir. Les sections des plaques de montage sont régénérées pour le lit choisi.

La disposition utilise des boîtes de délimitation effectivement exportées, une marge de 2 mm aux bords du lit et l'espacement choisi. Les pièces peuvent tourner à 90 degrés. Les composants de couvercle multicolore restent ensemble. Le nombre de lits affiché est pour cet arrangement, pas un minimum garanti. Les supports, brim, tours de purge, zones d'exclusion des imprimantes et différents travaux de matériaux ne sont pas inclus; réservez un espace approprié et vérifiez le résultat dans votre trancheur. Aucun profil d'imprimante ou emplacement de filament n'est intégré.

Le ZIP contient **bed-NN.3mf** pour chaque lit, correspondant **bed-NN.svg** diagrammes, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** et une liste de pièces numérotées dans **README.txt**. Ouvrez chaque 3MF comme un travail d'impression séparé, conservez les positions relatives de ses objets, utilisez des millimètres à 100% d'échelle et assignez des filaments. Les diagrammes SVG montrent des rectangles limites; le 3MF contient la géométrie imprimable complète.

Les modifications apportées aux paramètres de mise en page ou d'exportation invalident le calcul précédent. La fermeture de la fenêtre annule la préparation. Les parties individuelles surdimensionnées sont signalées plutôt que scindées silencieusement ou automatiquement.

<a id="pattern-studio"></a>
### Studio de motifs

Choisir **Relèvement (décoration)** ou **Par pochoir (coupé)** en haut des paramètres de droite. Les coquilles supportent le mode stencil uniquement. Les réglages montrent la hauteur de relief seulement pour le relief, et l'espacement seulement pour le placement répété. **Épaisseur du matériau** est modifiable: 1.2–6 mm pour un SVG couvercle et 1–4 mm pour une coque. Il change l'aperçu et l'export ensemble. Les valeurs par défaut du couvercle restent de 3,2 mm pour le relief et de 2 mm pour le pochoir; une épaisseur choisie est conservée lors du changement de mode. La hauteur de relief est incluse dans l'épaisseur du couvercle. Un encart SVG le couvercle nécessite une profondeur interne d'au moins l'épaisseur de la plaque plus 2 mm. **Supplémentaire** contient la couleur du couvercle ou la sélection du mur de coque. Ouvrir **Quels fichiers SVG fonctionnent?** pour les limites d'importation et les conseils de préparation.

Ouvrir **Forme → Couvercle → My SVGs** ou **Habillage → Motif → My SVGs** pour modifier les motifs accessoires dans le tiroir inférieur. **Couvercle** et **Habillage** les onglets conservent des paramètres indépendants tout en partageant la bibliothèque SVG. Le changement d'onglet isole automatiquement cette partie dans l'aperçu. Si elle n'est pas encore ajoutée, l'assemblage reste visible jusqu'à ce que la pièce soit créée. Vous pouvez toujours choisir Assemblage manuellement au-dessus du modèle. Utilisez les commandes largeur, rotation, intervalle et X/Y pour positionner les motifs; le bouton central réinitialise la position et la rotation. Le couvercle supporte le relief relevé ou par des ouvertures.
