<a id="replixgrid-user-guide"></a>
# Guide utilisateur ReplixGrid

Créez un organiseur aux dimensions en millimètres, vérifiez l’ajustement des pièces et téléchargez-les pour votre logiciel de découpe (slicer). Pour débuter, suivez l’exemple illustré de la capsule dans le guide de démarrage. Ce manuel détaille chaque réglage.

[Ouvrir ReplixGrid](https://grid.replixcast.com/?lang=fr) · [Démarrage rapide](USER-GUIDE.md) · [Installation locale](../../../README.md#local-installation)

| Rubriques du manuel |
| --- |
| [Espace de travail et vues](#workspace-and-views) |
| [Forme et dimensions](#shape-and-dimensions) |
| [Compartiments et cloisons](#compartments-and-dividers) |
| [Hauteur des parois et découpes](#wall-heights-and-cutouts) |
| [Angles, bords et décoration](#corners-edges-and-decoration) |
| [Inserts, étages et couvercles](#inserts-tiers-and-lids) |
| [Habillages monoblocs et panneaux](#sleeves-and-panels) |
| [Projets et sauvegardes](#projects-and-backups) |
| [Réglages d’impression et division en parties](#print-setup-and-sectioning) · [Téléchargement et préparation dans le slicer](#download-and-slice) |
| [Variantes de projet](#project-variants) · [Styles partagés](#shared-styles) |
| [Agencement des organiseurs dans un tiroir](#drawer-arrangements) · [Plaques de montage](#mounting-plates) |
| [Relief SVG personnalisé](#custom-svg-relief) · [Studio de motifs](#pattern-studio) |
| [Exporter tout le tiroir](#whole-drawer-export) |
| [Dépannage](#troubleshooting) |

<a id="start-a-new-project"></a>
## Commencer un nouveau projet

Au premier lancement, la zone de travail est vide. Le guide à gauche propose trois étapes: **Choisir une forme → Définir les dimensions → Ajouter des compartiments**. Choisissez une forme, réglez ses dimensions, puis cliquez sur **Suivant: compartiments**. Terminez avec **Terminé** ou **Garder sans cloisons**. Après avoir choisi une forme, vous pouvez fermer le guide avec **×**. Vous pouvez aussi ouvrir un projet enregistré ou un fichier JSON.

**Sur les petits écrans :** lorsque la fenêtre du navigateur mesure 1400 px de large ou moins, l’assistant se place **sous le modèle** pour ne pas masquer l’aperçu. Faites défiler la **page vers le bas** pour accéder à l’assistant, aux étapes suivantes et aux boutons permettant de passer aux compartiments et de terminer. Remontez la page pour revoir le modèle. Dans une fenêtre plus large, l’assistant reste à côté du menu de gauche.

Rouvrez le guide via **Aide → Guide : trois étapes**. Son ouverture ne modifie pas le modèle. Choisir une autre forme remplace le modèle actuel; cette action peut être annulée.

Le démarrage rapide, le guide utilisateur et le menu d’aide utilisent la langue de l’interface. La vidéo reste en anglais.

Les étapes, conseils et confirmations du guide sont traduits. La ligne du modèle enregistré porte le nom **Projet précédent**. Les noms réels dans **Mes projets** restent tels que vous les avez enregistrés.

Utilisez **Nouveau projet** dans la barre supérieure pour revenir à ce démarrage propre. Votre travail actuel est sauvegardé en premier; un avant-projet non nommé est conservé dans **Mes projets**. Les projets existants, les variantes, les emplacements de filament et la configuration de l'imprimante ne sont pas supprimés. Le panneau affiche une vignette étiquetée **Projet précédent** avec **Enregistré dans « Mes projets »**; cliquez sur cette ligne pour rouvrir votre bibliothèque. La toile est effacée immédiatement et reste vide jusqu'à ce que vous choisissiez une nouvelle forme, tout comme lors d'une première visite. Jusqu'à ce que vous choisissiez une nouvelle forme, l'enregistrement et l'exportation sont désactivés. Vous pouvez plutôt ouvrir un projet de **Mes projets** ou importer son fichier JSON.

Choisir **Forme → Socle → Créer à partir d'un modèle** pendant que l'édition remplace la construction à l'intérieur du projet actuel et peut être annulée. Utilisez **Nouveau projet** lorsque vous voulez un modèle séparé.

<a id="workspace-and-views"></a>
## Espace de travail et vues

Ouvrez un outil dans la partie supérieure gauche. **Forme** change le corps et ses accessoires. **Compartiments** change la disposition. **Habillage** conçoit une housse extérieure séparée. **Impression** définit le volume d’impression, les emplacements de filament et les coupes de section optionnelles. Cliquez sur un numéro de compartiment, un mur ou un cloison sur le modèle pour ouvrir ses réglages sur la droite. Si une partie est difficile à cliquer, étendre **Toutes les parois et compartiments** et sélectionner par nom.

Choisissez une rubrique dans le menu de gauche. Ses réglages s’ouvrent dans un panneau flottant en bas de l’aperçu, sans masquer la scène ni la grille derrière lui. Ce panneau complète le menu de gauche. La flèche le replie et **×** le ferme. Choisissez une autre rubrique pour changer de réglages. Le panneau de droite reste consacré à la paroi ou au compartiment sélectionné.

Faites glisser le fond pour tourner le modèle, utilisez la molette pour zoomer et le bouton droit en glissant pour déplacer la vue. **Caméra de retour** rétablit le cadrage. **Dessus** facilite la sélection des compartiments étroits et le déplacement des cloisons ; **3D** montre les hauteurs et l’assemblage. **Grille** affiche une grille espacée de 10 mm, avec des lignes principales tous les 50 mm. Les boutons au-dessus du modèle affichent séparément l’organiseur, les inserts, l’habillage ou le couvercle ; **Assemblage** montre les pièces disponibles ensemble. Pour plusieurs étages, ouvrez le menu à côté de **Organiseur** : **Afficher la pile** affiche toute la pile, tandis qu’un étage numéroté permet de le modifier seul. L’éditeur inférieur reste ouvert. Dans la vue empilée, **Habillage** et **Inserts** regroupent les pièces de tous les étages. Dans une fenêtre étroite, ces boutons passent sous la barre d’outils. Pour un couvercle affiché seul, **Dessous** permet d’examiner sa face inférieure. **Esc** ferme le panneau d’outils. Les flèches courbes annulent ou rétablissent une modification.

Utilisez la barre supérieure pour choisir un langage d'interface ou basculez entre l'apparence claire, sombre et système. Les noms de contrôle dans ce guide suivent le langage d'interface sélectionné.

<a id="shape-and-dimensions"></a>
## Forme et dimensions

Sous **Forme → Socle**, choisissez un profil de base et de hauteur, puis cliquez sur **Créer à partir d'un modèle**. Le bouton remplace la construction actuelle. Enregistrer une copie nommée d'abord si vous voulez garder les deux modèles. **Ebauches simples** offre également un corps vide et un point de départ à quatre compartiments.

| Base | Quand le choisir |
| --- | --- |
| arrondi | Une empreinte rectangulaire avec des coins extérieurs réglables. |
| Capsule | Un long corps avec des extrémités semi-circulaires. Le gabarit incliné porte l'inclinaison à travers les deux extrémités courbes. |
| Cercle | Un organiseur rond dimensionné par le diamètre. |
| Ovale | Un contour courbé allongé avec largeur et profondeur réglables séparément. |
| Honeycomb | Un groupe de cellules hexagonales qui partagent des murs. Sélectionnez une cellule pour ajuster sa hauteur. |

Choisissez **Lisse** pour une bord de niveau, **En pente** pour une montée continue, ou **Gradins** pour des niveaux de hauteur distincts. Les dimensions inférieures aux choix décrivent le modèle que vous êtes sur le point de créer. Une fois créé, modifiez le modèle sous **Dimensions**. Largeur et profondeur mesurent l'empreinte extérieure. Utilisez les dimensions intérieures du compartiment sélectionné pour le dimensionner pour un objet. Sur une base incurvée, vérifiez également les extrémités de rétrécissement dans la vue **Dessus**.

![Capsule inclinée avec une extrémité basse pour l'accès, une extrémité haute pour les objets longs et deux cloisons transversaux](../../images/capsule-sloped.jpg)

Dans **Forme** → **Supplémentaire**, réglez l’épaisseur des parois et du fond. Des parois plus épaisses réduisent l’espace intérieur. **Inclinable sur socle plat** incline les parois vers l’avant jusqu’à 25°, tout en gardant le fond horizontal. Un bord supérieur en pente change, lui, la hauteur des parois le long du corps. Vérifiez les dimensions extérieures finales dans la fenêtre de téléchargement lorsque l’inclinaison est active.

<a id="exact-internal-dimensions"></a>
## Dimensions intérieures précises

Sélectionnez un compartiment et ouvrez **Dimensions intérieures** à droite, ou cliquez sur sa cote bleue dans le modèle. Choisissez largeur ou profondeur et saisissez des millimètres. Cliquez hors du champ ou appuyez sur **Enter** pour valider ; **Escape** annule. Dans le panneau droit, utilisez **Appliquer**. Une valeur incorrecte ne modifie pas le modèle. Chaque modification validée peut être annulée en une étape.

Le cloison orange est sa position actuelle; la ligne bleue en tirets prévisualise la nouvelle position. La séparation la plus proche sur l'axe choisi se déplace, gardant la taille extérieure du corps et l'épaisseur de la paroi inchangée. Le panneau montre les tailles voisines affectées. S'il n'y a pas de cloison sur cet axe, ajuster les dimensions globales ou diviser le compartiment en premier.

Dans une rangée simple, commencer avec le compartiment 1 et continuer dans l'ordre; le dernier compartiment prend le reste. Les dimensions voisines ne sont pas verrouillées, de sorte que l'édition d'un compartiment antérieur peut redimensionner un compartiment ultérieur.

Les angles arrondis, la forme capsule, les chanfreins et les arrondis intérieurs sont pris en charge. La ligne bleue mesure la largeur intérieure au centre du compartiment, juste au-dessus du fond. Les courbes peuvent réduire l’espace ailleurs : prévoyez du jeu et vérifiez tout le contour de l’objet. Le réglage précis des compartiments n’est actuellement pas disponible pour les formes circulaires, ovales, en nid d’abeille ni pour les parois inclinées.

Sélectionnez un mur ou un cloison pour modifier sa hauteur directement sur le modèle. Les murs plats montrent une valeur; les profils à deux points indiquent des valeurs A/B. Les règles liées à la hauteur et à la paroi en marche correspondent au panneau droit. Ces étiquettes modifient la hauteur, non la longueur du mur ou l'épaisseur globale.

<a id="compartments-and-dividers"></a>
## Compartiments et cloisons

Pour une mise en page rapide, utilisez **Compartiments → + Compartiment** pour diviser le plus grand compartiment. **− Compartiment** fusionne une paire voisine. Dans un nid d'abeilles, ces commandes ajoutent ou retirent une cellule extérieure et préservent la taille des autres. Deux cellules voisines partagent un mur aussi haut que la cellule plus haute.

Pour une mise en page exacte, passez à **Dessus** et sélectionnez le compartiment que vous voulez diviser. Choisissez **Nombre de pièces**, puis **Diviser en largeur** pour diviser la largeur en compartiments plus étroits, ou **Diviser en profondeur** pour en faire des moins profonds. Vous pouvez diviser à nouveau l'un des résultats.

![Exemple de vue supérieure avec une baie pleine profondeur et deux compartiments plus petits](../../images/compartment-splits.svg)

Sélectionnez le cloison pour le faire glisser, ou ajustez **Premier compartiment** sous **Position des partitions**. Seul le cloison sélectionné se déplace; d'autres positions de cloison restent fixes. Les compartiments adjacents changent de taille. Les déplacements qui laissent trop peu d'espace sont rejetés. Vérifiez les nouvelles dimensions intérieures de chaque côté. **Supprimer la partition** combine les compartiments et peut également enlever les cloisons nichés à l'intérieur de cette division.

<a id="wall-heights-and-cutouts"></a>
## Hauteur des parois et découpes

Sélectionnez une paroi extérieure ou une cloison. **Une hauteur** crée un bord uniforme ; **Deux points** règle les hauteurs aux extrémités A et B indiquées sur le modèle. **Directe**, **Ondulé** et **Zigzag** définissent le profil du bord. La longueur d’onde règle l’écart entre répétitions. Dans un modèle à paliers, modifier un palier ajuste aussi les hauteurs de la paroi et de la cloison liées.

Utilisez **Relier les hauteurs des murs adjacents** pour faire suivre un mur extérieur à ses voisins. Pour un cloison, **Ajustement sur les murs adjacents** copie les deux hauteurs d'extrémité une fois. Répétez l'ajustement après avoir changé les murs voisins. **Comme les autres** retourne le mur sélectionné à la hauteur commune.

Ouvrir **Découpe du mur** pour faire une ouverture d'accès. Choisir une scoop lisse, une ouverture semi-cercle ou rectangulaire, régler la largeur et la profondeur, puis la déplacer le long du mur. La position s'étend de l'extrémité A à B. La profondeur est mesurée à partir du bord supérieur. Inspecter la lèvre restante au-dessus du sol. Choisir **Pas de découpe** pour remplir l'ouverture. Honeycomb utilise plutôt la hauteur des cellules.

<a id="corners-edges-and-decoration"></a>
## Angles, bords et décoration

Ouvrir **Forme → Coins et chanfreins**. Trois contrôles affectent différentes parties de l'impression.

| Contrôle | Où chercher | Ce que ça change |
| --- | --- | --- |
| Coins extérieurs | Vue en haut, contour extérieur | Tourner les coins de l'empreinte ou les couper à 45°. Zéro donne un coin carré. Disponible sur la famille rectangulaire de bases. |
| Compartiments intérieurs radieux | Vue supérieure, à l'intérieur d'une baie | Rondise la jonction verticale où deux murs se rencontrent. Les baies serrées limitent le rayon disponible. |
| Bord supérieur des murs et des cloisons | Coupe transversale à travers un mur | **Chanfrein** coupe un biseau plat et **Arrondi** courbe la lèvre. Les deux côtés des parois extérieures et les cloisons reçoivent la finition. **Aucune** restaure la lèvre carrée. |

![Coupes transversales murales montrant les coins supérieurs carrés, chanfreinés et arrondis avec la même épaisseur de paroi](../../images/top-edge-profiles.svg)

Par exemple, sur un mur de 2 mm, essayez une chanfrein de 0,5 mm. Chaque côté perd 0,5 mm au sommet, laissant une bande plate de 1 mm. La taille maximale affichée dépend de l'épaisseur du mur. Avec **Arrondi**, la valeur est le rayon en millimètres.

- **Couleur de l'organiseur** change l'aperçu et les exportations en fonction des couleurs. Choisissez un swatch, une couleur personnalisée ou une couleur de filament configurée. Affectez la emplacement réelle du filament à l'exportation.
- **Bordure inférieure** ajoutent une bande de projection autour de la base. Choisissez des garnitures lisses, rayées ou graduées et fixez sa hauteur. Un manchon compatible peut s'y reposer. Trim nécessite un corps d'une seule pièce et est disponible sur le premier niveau.
- **Soulagement de l'organisateur** ajoute un motif surélevé directement au mur extérieur. Faites défiler le catalogue de motifs, la taille de l'ensemble et la hauteur de relief, et regardez la mise à jour du modèle pendant le chargement comme chaque calcul se termine. La valeur finale utilise la pleine précision. L'intérieur reste lisse. Les projections augmentent les dimensions extérieures. Choisir **Lisse** pour enlever le relief.
- **Signature et badge** mettent du lettrage ou un symbole sur un côté sélectionné. Entrez le texte, choisissez une police, fixez la hauteur de la lettre et la position verticale, puis choisissez le lettrage ou la gravure relevée et fixez sa hauteur ou sa profondeur. Une étoile ou un cœur peut accompagner le texte. Sur les organisateurs circulaires et ovales, le texte et les icônes suivent le mur incurvé, y compris dans les exportations STL et 3MF. L'espacement des lettres est mesuré le long de la surface. Choisissez Front, Arrière, Gauche ou Droite pour centrer l'inscription sur ce côté. Sur les cercles et ovales avec des hauteurs de mur liées ou variables, le lettrage reste sous le profil mur le plus bas et coupé. Lettrage Honeycomb n'est pas encore supporté; les habillages couvrant le côté choisi et le relief peuvent également empêcher le le lettrage.

<a id="inserts-tiers-and-lids"></a>
## Inserts, étages et couvercles

**Inserts amovibles.** Sélectionnez un compartiment et ouvrez **Insertion de baie** à droite. **Vide** crée un récipient ouvert, **Pour les petites choses** une grille avec lignes et colonnes réglables, et **Pour les poignées** des logements pour stylos ou outils. Indiquez leur diamètre intérieur ; l’application en place autant que possible. Choisissez un contour ajusté au compartiment, arrondi, circulaire, ovale ou hexagonal, puis une couleur. **Retirer l'insert** retire l’insert. Même vide, celui-ci reste une pièce imprimable.

L'insert suit son compartiment avec un dégagement d'au moins 0,5 mm. Ses parois et son fond sont d'une épaisseur de 1,2 mm et sa hauteur s'ajuste à environ 1 mm au-dessous de la bord. Un insert dans un organiseur incliné sort le long de la pente. Isolate **Inserts** pour les inspecter, puis export **Organisateur et accessoires**. Les inserts nécessitent une seule pièce d'impression.

**Des plateaux empilés.** Commencez par une bord de niveau, puis ouvrez **Forme → Niveaux → + Niveau**. Vous pouvez utiliser deux à cinq niveaux; **− Niveau** supprime un niveau. Les niveaux partagent une empreinte mais peuvent avoir des compartiments, des hauteurs, des couleurs et des décorations différentes.

1. Dans le menu déroulant à côté de **Organiseur** au-dessus du modèle, choisissez **Niveau 1**, **Niveau 2**, ou un autre niveau. Ce niveau est affiché seul, et l'éditeur de paramètres reste ouvert.
2. Modifiez le niveau sélectionné avec les commandes de forme, de compartiment, de relief et de shell habituelles. Le changement de niveau ne copie pas ses paramètres à d'autres niveaux.
3. Choisissez **Afficher la pile** dans le même menu déroulant pour inspecter tous les niveaux et accessoires ensemble. Utilisez **Assemblage**, **Organiseur**, **Inserts**, **Habillage** ou **Couvercle** pour montrer les pièces dont vous avez besoin. Retournez à un niveau numéroté pour continuer à l'éditer.
4. Dans **Forme** → **Niveaux**, réglez **Jeu d'ajustement** et vérifiez l’ajustement sur un petit essai avant d’imprimer la pile complète. Abaissez les cloisons qui dépassent le bord. L’empilement exige des parois verticales et un rebord d’appui continu.

Le relief intégré et SVG décorent l'extérieur de chaque niveau tout en accouplement les cols, les languettes et les logements restent lisses. Les coquillages et les panneaux décoratifs peuvent couvrir les différents niveaux. Pour les panneaux, garder **Décalage de bord** au moins 3 mm afin qu'ils nettoient les cols accouplement.

Avec un habillage enveloppant, une languette à l’intérieur de la paroi inférieure entre dans un logement sous le fond du plateau supérieur. Largeur, profondeur et hauteur utiles des compartiments restent identiques ; chaque logement ajoute 2,2 mm à la hauteur extérieure de la pile. Les habillages se rejoignent sur une bande d’appui de 0,8 mm. Ils s’enfilent par le dessus : séparez les étages avant de les retirer. Chaque habillage est exporté séparément avec son numéro d’étage.

**Bordure inférieure** n'est disponible que sur le premier niveau (le plus bas): choisissez lisses, anneaux ou marches. Avec une enveloppe compatible, la garniture supporte également la habillage. Des panneaux séparés s'assoient au-dessus de la garniture avec l'offset du bord sélectionné. Les nouveaux niveaux supérieurs n'héritent pas de la garniture. Si la languette ne peut pas s'insérer dans l'épaisseur du mur, réduisez **Jeu d'ajustement**; l'application ne épaissit pas automatiquement le mur.

**Couvercle.** Ouvrez **Forme** → **Couvercle** et cliquez sur **+ Couverture**. Le bord supérieur doit être de hauteur uniforme, avec les cloisons à la même hauteur ou plus bas. L’inclinaison, le nid d’abeille et l’impression en sections sont incompatibles. **Coiffant** recouvre l’extérieur ; **Encastré** est une plaque de 2 mm affleurant à l’intérieur. Son logement prévoit un jeu de 0,35 mm par côté et laisse de la place au-dessus des cloisons et inserts. Il faut au moins 2 mm d’épaisseur de paroi et 4 mm de profondeur intérieure. Ajoutez une encoche ou une poignée pour le soulever. Le couvercle extérieur possède un rebord de centrage avec 0,5 mm de jeu. Réglez le motif, sa taille et sa profondeur, puis la hauteur et la finition du bord. La poignée peut être cylindrique ou allongée, avec dimensions, hauteur, chanfreins et arrondis réglables. Elle s’imprime séparément et se colle. L’aperçu montre le couvercle extérieur soulevé et le couvercle intérieur en place. Le fichier exporté place le couvercle à plat pour l’impression.

**Motif bicolore** est disponible pour les deux types de couvercles. Choisissez branche d’olivier, feuilles de ginkgo, fougère, vagues, galets, cernes du bois ou cellules de Voronoï, puis les couleurs du fond et du motif. La plaque de 3,2 mm comprend un fond plein de 1,6 mm et une couche à motif de 1,6 mm. Le rebord extérieur et la poignée augmentent la hauteur totale. Un couvercle encastré exige au moins 5,2 mm de profondeur intérieure. Exportez en 3MF pour conserver les deux pièces colorées ensemble et affectez leurs filaments. Pour l’olivier, le ginkgo, la fougère, les vagues et les cernes, **Motif ajouré** crée des ouvertures dans la couche supérieure. **Motif en relief** laisse ces ouvertures de 1,6 mm vides et révèle le fond ; désactivez-le pour une incrustation lisse. Les couvercles encastrés en relief s’impriment fond vers le bas, les couvercles extérieurs motif vers le bas. Vérifiez les ponts au-dessus des creux dans le slicer.

### Couleurs du couvercle et filaments

Choisissez une poignée cylindrique ou une barre pour afficher **Couleur de la poignée du couvercle**. L’option **Comme la base du couvercle** est activée par défaut : la poignée suit la couleur de base du couvercle. Choisir une autre couleur rend la poignée indépendante ; réactivez l’option pour rétablir le lien. La poignée reste une pièce imprimée séparément.

Cliquez sur l’échantillon à côté de **Couleur de base du couvercle**, **Couleur du motif du couvercle** ou **Couleur de la poignée du couvercle**. La fenêtre propose les **Filaments du slicer** de l’imprimante actuelle, une palette, une couleur personnalisée et un champ HEX à six caractères. Configurez vos couleurs dans **Impression → Filaments du slicer**. Les emplacements supprimés ne sont plus proposés ; les autres conservent leur numéro.

Les couleurs sont enregistrées dans le projet et exportées en 3MF et OBJ ; le STL ne contient pas de couleurs. Lors de l’export 3MF, une couleur correspondant à un seul emplacement sélectionne automatiquement ce filament. Si plusieurs emplacements ont la même couleur, choisissez l’emplacement dans la fenêtre d’export. Vérifiez les affectations dans le slicer. Les couleurs affichées sont approximatives et ne simulent pas le mélange physique des filaments.

![Six modèles de couvercle à deux tons](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Habillages monoblocs et panneaux

Ouvrez **Habillage** et choisissez un motif. Un shell est imprimé séparément de l'organiseur. Si vous voulez le motif sur le corps lui-même, utilisez **Forme → Soulagement de l'organisateur**.

| Mode Shell | Montage et montage |
| --- | --- |
| **Autour du corps** | Un manchon sans fond suit le périmètre et les hauteurs du mur. Glissez-le sur le corps d'en haut, en suivant la direction du mur sur un modèle incliné. Le panneau indique si un rebord de support est présent ou si le manchon repose sur la table. |
| **Panneaux décoratifs** | Des panneaux encadrés séparés recouvrent les côtés sélectionnés et laissent les coins exposés. Choisissez les côtés et ajustez **Décalage de bord**. Collez les panneaux sans attaches. Avec des goupilles cachées, appuyez tout droit sur le mur correspondant pour une fixation permanente. |

![Vue supérieure d'une manche enveloppant les coins et les panneaux séparés se terminant avant chaque coin](../../images/shell-fit.svg)

Choisissez le motif, définissez sa taille et set **Épaisseur de la coque**. Pour un manchon d'une pièce, ajustez **Largeur de la bordure** pour son cadre solide. Les panneaux décoratifs ont un cadre fixe; utilisez **Décalage de bord** pour les positionner sur le mur. Sous **Atterrissage**, **Dégagement de chaque côté** fixe l'écart entre le manchon et l'organiseur. Un écart de 0,5 mm de chaque côté ajoute 1 mm sur deux côtés opposés avant de compter l'épaisseur de la habillage. Comparer **Assemblage** avec la vue isolée **Habillage** pour juger du résultat. **↓ Télécharger le shell** exporte le couvercle séparément, et **Supprimer la coque** la retire du design.

Les panneaux exigent une base rectangulaire compatible. Leur sélection ne change ni l’épaisseur des parois ni l’espace intérieur. Les fixations cachées nécessitent des parois d’au moins 3,2 mm sans relief. Pour des parois plus fines, y compris 2,4 mm, utilisez des panneaux sans fixations et collez-les. Les parois ne sont jamais épaissies automatiquement. Le retrait du panneau règle la marge sur la face ; le jeu de l’habillage enveloppant règle son coulissement. Avec une bordure basse, le retrait inférieur se mesure depuis son sommet ; fixations et logements suivent le même profil. Pour les étages, prévoyez au moins 3 mm de retrait afin de dégager les rebords d’emboîtement.

<a id="projects-and-backups"></a>
## Projets et sauvegardes

Utilisez **Mes projets → Enregistrer une copie** pour nommer un dessin ou faire une variante avant d'expérimenter. Le projet ouvert enregistre automatiquement dans ce navigateur. La bibliothèque vous permet de rechercher, ouvrir, renommer, supprimer ou télécharger un projet. **Enregistrer le projet** dans la barre supérieure télécharge une sauvegarde JSON modifiable. Utilisez **Ouvrir** pour charger ce fichier, y compris sur un autre ordinateur ou dans une installation locale.

Une copie de récupération locale temporaire protège les changements pendant l'enregistrement de la base de données du navigateur; réinitialise la copie si une écriture a été interrompue. Un instantané séparé peut récupérer une session actuelle endommagée, y compris l'historique d'annulation. Si aucune copie valide ne peut être restaurée, l'enregistrement automatique s'arrête au lieu de remplacer le projet stocké par un modèle de démarrage. Gardez les sauvegardes JSON téléchargeables: la suppression des données du navigateur ou l'échec des deux mécanismes de stockage ne peut pas être récupéré automatiquement.

Les vérifications d'exportation appartiennent à la révision en cours du projet, aux pièces sélectionnées et à la position de montage. La modification de ces dernières invalide la vérification précédente; un ancien résultat ne peut pas être téléchargé comme nouveau modèle. Les calculs échoués conservent les modifications. Un aperçu décroché signale une erreur après deux minutes; la prochaine modification de géométrie commence un nouveau calcul.

Lorsque le même projet ou tiroir est édité dans plusieurs onglets, des modifications contradictoires sont enregistrées séparément **Copy from another tab**. L'autre version est conservée, et l'onglet d'édition continue avec sa copie. Comparez les versions dans **Mes projets** ou le sélecteur de tiroir et renommez la copie si vous voulez la conserver. Réouverture d'un onglet organiseur restaure son propre projet sauvegardé. Les modifications ne sont pas automatiquement fusionnées entre les onglets.

Gardez une sauvegarde téléchargée avant d'effacer les données du navigateur. Chaque navigateur et adresse du site a sa propre bibliothèque. Les emplacements filamentaires sont stockées séparément pour l'imprimante dans le navigateur. Configurez-les à nouveau lors du déplacement vers un autre appareil. Pour l'application locale téléchargeable, voir [Installation locale](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Réglages d’impression et division en parties

Sous **Impression**, sélectionnez la configuration de votre imprimante et de votre tête ou choisissez **Dimensions personnalisées**. Vérifiez la largeur, la profondeur et la hauteur de construction. Le préréglage fournit le volume d’impression. Choisissez l'imprimante, la buse, le matériau et les profils de coupe dans votre slicer.

Si le modèle dépasse le plateau, utilisez les découpes proposées ou choisissez deux ou trois sections lorsque cette option est disponible. Vérifiez les raccords avec **Écarter les pièces**. La division porte l’épaisseur des parois à au moins 5 mm et celle du fond à au moins 3 mm : contrôlez de nouveau les dimensions intérieures. Retirez d’abord les habillages et les inserts. Les modèles à étages, inclinés, circulaires, ovales ou en nid d’abeille doivent être imprimés d’un seul tenant. **Retourner le modèle solide** annule la division. Revérifiez les épaisseurs si vous souhaitez retrouver les dimensions initiales.

**↓ Joint sample** les téléchargements se terminent pour essayer à la même échelle et les paramètres d'impression que le corps final. Placez-les séparément avec leurs bases. Après refroidissement, les goupilles nominales Ø 3.2 × 8 mm s'inscrivent dans des trous Ø 3.3 mm, de 4,5 mm de profondeur de chaque côté de la couture. Vérifiez l'alignement, puis utilisez des broches et de la colle pour assembler les sections imprimées. Utilisation **↓ Télécharger toutes les parties** pour l'organiseur sectionné lui-même.

<a id="download-and-slice"></a>
## Téléchargement et préparation dans le slicer

1. Dans **Impression** → **Slicer filaments**, utilisez les mêmes numéros et couleurs que dans le slicer. Sur Snapmaker U1, les emplacements 1–4 correspondent aux têtes T0–T3. Vous pouvez configurer jusqu’à 16 emplacements, avec couleur et nom de matériau. La couleur sert de repère approximatif ; elle ne simule pas la teinte imprimée ou mélangée. Réglez les mélanges exacts dans le slicer. Sélectionnez une carte puis **Delete filament from slot N** pour supprimer le filament. Les autres numéros restent inchangés : supprimer l’emplacement 6 laisse le 7 au numéro 7. **+ Slot N** réutilise le plus petit numéro libre ; la limite reste 16. La suppression ne change pas la couleur du modèle. Les emplacements supprimés ne sont plus proposés ni associés automatiquement à l’export ; choisissez-en un autre ou affectez-le dans le slicer. Des couleurs distinctes permettent l’association automatique. Si deux emplacements ont la même couleur, choisissez celui voulu pour chaque pièce dans la fenêtre de téléchargement.
2. Cliquez sur **↓ Télécharger**. Choisir **Organisateur et accessoires**, **Coque uniquement** ou **L'ensemble**, selon les pièces dont vous avez besoin. Pour un modèle sectionné, exportez le kit.
3. Sélectionnez un format ci-dessous. Pour 3MF, assignez une emplacement de filament à chaque pièce ou laissez-la pour affectation dans le slicer. Orca peut utiliser le premier filament pour les pièces non assignées.
4. Attendez le contrôle de la géométrie et de la taille. Lisez les dimensions de chaque pièce et toute instruction pour le faire tourner à 90° sur le plateau. Le contrôle se réserve 2 mm sur les bords du plateau. Télécharger avec le bouton de format en bas de la boîte de dialogue.
5. Ouvrir le résultat dans votre slicer à l'échelle **Échelle 100 % en millimètres**. Disposer l'ensemble complet, vérifier les surplombs et les détails minces, et prévisualiser la première couche et les cloisons. Pour une impression multicolore, vérifier l'attribution du filament de chaque pièce avant de trancher.

| Format | Choisissez-le pour | Que faire avec le téléchargement |
| --- | --- | --- |
| STL | Géométrie pour une impression en une seule couleur | Ouvrir la STL dans la trancheuse. Extraire d'abord la ZIP si l'exportation contient plusieurs STL. |
| 3MF | Un kit avec des pièces séparées, des couleurs et des filaments | Ouvrez-le dans votre slicer et vérifiez les pièces et les emplacements. ReplixGrid laisse l'imprimante et les profils de matériau à la slicer. |
| OBJ + MTL | Un modèle coloré pour un outil qui accepte OBJ | Gardez la géométrie et le fichier matériel ensemble. Le modèle utilise des millimètres avec Z up. |
| Projet JSON | Continuer à modifier les compartiments, dimensions ou accessoires | Utilisez **Enregistrer le projet** et rouvrez-le avec **Ouvrir** dans ReplixGrid. |


Pour reprendre une couleur numérique du slicer, saisissez le **HEX code** à six caractères, par exemple `#E63522`, près du sélecteur de couleur. Le `#` initial est facultatif. Un code valide actualise immédiatement l’aperçu. Une saisie incomplète ou incorrecte n’est pas appliquée ; la couleur enregistrée revient en quittant le champ. Ce code ne simule ni l’aspect réel du filament, ni l’éclairage, ni le mélange physique des couleurs.

<a id="troubleshooting"></a>
## Dépannage

| Ce que vous voyez | Quoi vérifier |
| --- | --- |
| L'objet correspond aux dimensions extérieures mais ne s'insère pas dans une baie | Sélectionnez le compartiment et vérifiez ses mesures à l'intérieur. Permet l'épaisseur du mur, les extrémités courbes, le rayon intérieur du coin et les inserts amovibles. |
| Sélection d'un cloison continue de sélectionner le mur devant | Passez à **Dessus** ou ouvrez **Toutes les parois et compartiments** sur la droite. |
| Le couvercle ou le niveau suivant ne peut pas être ajouté | Vérifiez une bord de niveau, des hauteurs extérieures égales, des cloisons de saillie, des inclinaisons ou des scintillements. Pour une pile, vérifiez également les clips de habillage existants et le dégagement d'ajustement par rapport à l'épaisseur du mur. |
| Une partie dépasse le plateau bien que l'empreinte semblait assez petite | Lire les dimensions terminées dans la boîte de dialogue de téléchargement. Tilt, relief, garniture et shells peuvent s'étendre au-delà de la base. Vérifiez la configuration et la rotation de l'imprimante sélectionnée. |
| Les fixations de panneaux cachés ne sont pas disponibles | Utiliser des murs d'au moins 3,2 mm d'épaisseur sans relief, ou laisser les attaches et coller les panneaux. |
| Les panneaux chevauchent la garniture inférieure ou la bord de niveau dans une conception ancienne | Réglez un décalage de bord d'au moins 3 mm pour les niveaux. Le décalage inférieur est mesuré à partir du haut de la garniture inférieure. Régénérer et télécharger les pièces après avoir modifié les paramètres. |
| Une impression téléchargée a les mauvaises couleurs | Utilisez 3MF, correspondez aux numéros de emplacement dans **Impression**, puis inspectez les attributions par pièce dans le slicer. STL porte la géométrie seulement. |
| Une conception sauvegardée sur un autre appareil est manquante | Transférer son projet JSON et utiliser **Ouvrir**. Les bibliothèques de navigateur sont locales à chaque appareil et adresse du site. |

<a id="project-variants"></a>
## Variantes de projet

Cliquez sur **+ Variante** dans la barre supérieure, ou ouvrez **Mes projets** et sélectionnez **Nouvelle variante**. Entrez un nom et cliquez sur **Créer une variante**. La nouvelle variante est une copie indépendante; l'original reste sauvegardé. Un original non nommé est conservé sous **Brouillon**.

Utilisez le sélecteur à côté de **+ Variante** pour basculer entre les modèles associés, ou choisissez-en un sous **Variantes de ce projet** dans Mes projets. Chaque variante enregistre automatiquement et conserve sa propre histoire de déso/redo après commutation ou rechargement. Une variante nouvellement créée commence avec une histoire vide.

Utilisez **Projet séparé → Enregistrer une copie** pour créer un projet non lié. Renommer ou supprimer des modèles individuels dans Mes projets; supprimer l'original ne supprime pas ses variantes.

**↓ Télécharger** exporte le modèle sélectionné pour l'impression. **Enregistrer le projet** télécharger ce modèle en tant que JSON modifiable; **Fichier** sur une carte de bibliothèque télécharge le modèle correspondant. JSON contient un modèle, sans ses variantes connexes ou son historique de défaire.


<a id="shared-styles"></a>
## Styles partagés

1. Ouvrez un projet avec les couleurs et les motifs que vous souhaitez réutiliser.
2. Sous **Forme → Style commun**, saisissez un nom et cliquez sur **Enregistrer le style actuel**.
3. Ouvrez un autre projet ou variante, retournez au style **Style commun** et sélectionnez le style sauvegardé.
4. Choisissez **Couleurs**, **Motifs**, ou les deux. La revue **Sera appliqué** et tout **Sera ignoré** messages, puis cliquez **Appliquer le style**.

Un style capture la couleur et le relief de l'organiseur, ainsi que les couleurs et les motifs d'une habillage et d'un couvercle existants. Un style de corps lisse enlève le relief du corps de la destination. Dimensions, disposition des compartiments, épaisseurs de paroi, ajustement du couvercle, poignées et dégagements de habillage restent inchangés. Les couvercles ou les habillages manquants ne sont pas ajoutés.

L'application est une étape d'annulation et crée une copie indépendante: les modifications ultérieures à un organiseur ne changent pas les autres. La suppression d'un style sauvegardé ne modifie pas les projets qui l'utilisent déjà.

Les styles sauvegardés appartiennent à ce navigateur et à l'adresse du site. Un projet JSON préserve l'apparence appliquée, mais n'inclut pas la bibliothèque de style sauvegardé. Pour réutiliser un style sur un autre appareil, ouvrez le JSON du projet style et enregistrez à nouveau son style actuel.


<a id="drawer-arrangements"></a>
## Agencement des organiseurs dans un tiroir

Choisissez **Drawer** à côté de **Organiseur**, puis **Create drawer**. Entrez la longueur intérieure mesurée, la largeur, la hauteur utilisable et la jeu. La jeu s'applique à la fois aux murs du tiroir et entre les plateaux.

Les nouveaux tiroirs commencent à 180 × 280 mm, le bord avant étant marqué en bas. **Vue pivotante de 90°** ne change que l'orientation de la vue; les dimensions des tiroirs, les coordonnées des plateaux et les modèles exportés restent inchangées. Les tiroirs existants conservent leurs dimensions.

Utilisez **New organizer** pour créer un plateau directement dans le tiroir. Définissez ses dimensions, puis modifiez les compartiments et accessoires dans l'éditeur habituel de l'organiseur. **← Back to drawer** revient à son emplacement. **Add saved organizer** ajoute une copie indépendante d'un projet ou d'une variante sauvegardée; l'éditer ne change jamais sa source.

Faites glisser les plateaux en vue supérieure ou entrez les coordonnées X/Y mesurées du coin supérieur gauche au plateau. Rotation de 90 degrés, dupliquer ou enlever les plateaux. Les touches fléchées déplacent un plateau focalisé de 1 mm (Shift: 10 mm).

Le diagramme montre les rectangles de délimitation extérieurs assemblés, y compris les habillages, les garnitures, les couvercles et les niveaux. Les formes courbées sont vérifiées de façon prudente plutôt que étroitement nichées. Les conflits de bordure, de dégagement et de hauteur sont mis en évidence.

Les tiroirs économisent localement dans ce navigateur, séparément des projets de l'organiseur. Téléchargez un tiroir JSON pour sauvegarde ou transfert; l'ouverture d'un tiroir crée une copie séparée du tiroir. Sélectionnez un tiroir et choisissez **Download selected tray** pour sa propre exportation STL, 3MF ou OBJ avec les contrôles de taille d'imprimante existants.

<a id="mounting-plates"></a>
### Plaques de montage

Dans **Drawer → Drawer base**, choisissez **Mounting plate**. La longueur/la largeur du tiroir et le dégagement du mur déterminent la zone couverte. Entrez la largeur et la profondeur utilisables du plateau d'imprimante **Lit imprimante 3D** séparément: ces dimensions déterminent la taille maximale de la section et donc le nombre de sections. Le calcul inclut des projections de joint et une marge d'impression de 2 mm à chaque bord du plateau. Les dimensions ne doivent pas être multiples de la grille de 20 mm; les sections de bord correspondent à l'espace restant.

**Download sections (ZIP)** crée un fichier 3MF numéroté par impression, un plan d’assemblage SVG et une liste de coordonnées. Le plan conserve l’orientation initiale du tiroir, indépendamment de la vue : R désigne les rangées de haut en bas, C les colonnes de gauche à droite. Emboîtez les queues d’aronde par le dessus. Imprimez d’abord **Download joint sample**, composé de deux petites sections voisines, pour vérifier l’ajustement. Le joint prévoit un écart de 0,05 mm et une tolérance de profil de 0,03 mm. Un joint fin et un léger jeu peuvent subsister entre les sections seules.

Avec le mode plaque activé, les téléchargements de plateau comprennent des logements de position et de rotation inférieures de ce plateau. Les dimensions du compartiment interne sont préservées. Le plateau devient de 2,1 mm de haut; y compris la plaque de 2 mm, le contrôle de l'ajustement du tiroir ajoute 4,1 mm. Après le déplacement ou la rotation d'un plateau, téléchargez-le à nouveau: ses logements doivent correspondre aux positions de la cheville.

Le dégagement radial de la prise est de 0,12 mm. Imprimez un petit organiseur couvrant deux sections pour vérifier l'ajustement avec les réglages de votre matériau et de la couche. Les logements conservent l'organiseur latéralement; le soulever vers le haut pour le retirer. Exporter utilise seulement la géométrie: choisissez votre imprimante et les profils de matériau dans le slicer et inspectez les toits de la prise avant l'impression.

La fixation est actuellement disponible pour les organiseurs non divisés et sans inclinaison, avec au moins trois logements entièrement supportés. Les petits plateaux peuvent nécessiter un déplacement ou un agrandissement. Les étages supérieurs et habillages conservent leur géométrie. Désactivez le mode plaque pour exporter le modèle initial sans fixation. Les projets sources enregistrés restent inchangés.

<a id="custom-svg-relief"></a>
## Relief SVG personnalisé

Sous **Forme → Soulagement de l'organisateur → My SVGs**, choisissez **Upload SVG** ou déposez un fichier dans la zone de téléchargement. Sélectionnez une vignette enregistrée pour la réutiliser. La même bibliothèque est disponible sous **Forme → Couvercle → My SVGs** et **Habillage → Pattern → My SVGs**. Chaque cible conserve ses propres paramètres de configuration et de placement.

Choisir **Single motif** ou **Repeat**, sélectionner les murs extérieurs et ajuster la largeur du motif en millimètres, rotation, décalage horizontal/vertical et espace de répétition. Largeur et hauteur conservent les proportions d'origine. Placement est centré sur chaque côté sélectionné; sur les corps incurvés, les côtés correspondent à quatre secteurs extérieurs. Le décalage vertical positif déplace le motif vers le haut. Le motif suit le contour extérieur. Les répétitions sont placées seulement là où un motif complet s'adapte sous la bord supérieure, autour des découpes et à l'intérieur de chaque côté. Les motifs simples sont clippés à ces limites. La profondeur de déblocage utilise le contrôle existant **Profondeur de relief / Intensité**. Le mur d'origine et les compartiments internes sont préservés; les dimensions extérieures augmentent.

Les SVG supportés contiennent des chemins remplis, des polygones, des rectangles, des cercles ou des ellipses, y compris des trous et des transformations de groupe. Convertir le texte et les traits en chemins remplis avant d'exporter à partir de votre éditeur vectoriel. Photos, références externes, filtres, masques, chemins de coupure, gradients, blocs de style CSS et références aux éléments réutilisables ( `use` ) ne sont pas pris en charge. Les définitions vides ou non utilisées contenant des formes supportées sont ignorées. Les couleurs deviennent une seule forme relevée en utilisant la couleur de l'organiseur. Les limites sont de 200 KB, 512 éléments XML, 128 formes remplies et 6 000 points de contour échantillonnés; des motifs trop complexes ou des répétitions excessives sont rejetés avec un message. Les courbes sont approchées par des contours polygonaux pour l'impression.

Chaque projet intègre une copie indépendante de ses contours utilisés, de sorte que les projets téléchargés peuvent être rouverts sur un autre appareil sans la source SVG ou la bibliothèque. La suppression d'une entrée de bibliothèque laisse inchangés les projets existants. **Style commun** porte également des motifs de corps, de couvercle et de habillages personnalisés à un autre organiseur. Les couvercles ou les habillages manquants sont ignorés, comme avec les styles intégrés.

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

1. Conservez les tracés remplis et les formes utiles. Convertissez le texte et **les traits en contours remplis** dans l’éditeur vectoriel. Une ligne avec `fill="none"` est un trait, pas une surface remplie.
2. Supprimez les rectangles de fond, sauf si toute leur surface doit devenir un relief ou une ouverture. Les couleurs SVG ne séparent pas les matériaux ; une forme blanche ne découpe pas automatiquement les formes sombres situées dessous.
3. Vérifiez les tracés composés dans l’éditeur. Un commentaire « trou » ne crée pas de trou : le sens des tracés et `fill-rule` déterminent le remplissage.
4. Pour les ouvertures traversantes, reliez les détails enfermés au matériau environnant par des ponts. Augmenter l’écart entre les répétitions ne fixe **pas** un détail isolé dans le motif. Vous pouvez aussi utiliser un relief sur le couvercle.
5. Préférez un fichier contenant un seul motif pour la répétition. Si le fichier contient déjà une grille, la largeur redimensionne **toute la grille**, et non chaque motif séparément. Les petits détails risquent de devenir trop fins.
6. Attendez la réussite du calcul et de la vérification d’export, puis contrôlez l’aperçu dans le slicer. Après une erreur de calcul, la dernière prévisualisation valide peut rester affichée ; elle ne représente pas les réglages qui ont échoué.

Une silhouette de feuille pleine peut former un relief ou une ouverture. Une nervure entièrement entourée reste fixée au support en mode relief, mais risque de se détacher si le pourtour de la feuille est découpé. Une grille hexagonale convient aux perforations si les ponts de matière restent reliés et assez épais. Un dessin multicolore composé de traits doit d’abord être converti en contours remplis.

<a id="svg-lids-and-perforated-shells"></a>
### Couvercles SVG et habillages perforés

Ajouter un couvercle, puis choisir **My SVGs**. **Raised relief (decoration)** fait un seul couvercle connecté avec le motif sur un support solide; fixer sa hauteur de relief (0,2–1 mm) et sa couleur de base. **Through stencil (cut)** enlève les zones SVG remplies à travers le couvercle. Les deux modes conservent un cadre de bord de 2 mm et la lèvre accouplement. Une poignée séparée maintient un atterrissage solide; déplacer le dessin si un motif unique est en conflit avec lui.

Pour un shell, sélectionnez **My SVGs**, puis un dessin de bibliothèque. Les zones remplies deviennent par des ouvertures. Utilisez un motif ou répètez sur les côtés sélectionnés d'un manchon enveloppé. Sur **Panneaux décoratifs**, le dessin est répété indépendamment sur chaque panneau sélectionné; les cadres et les emplacements de montage existants sont conservés. La taille initiale du motif tient compte de la hauteur du shell. Réglez la largeur du cadre, la taille du motif, la rotation, la position et l'espacement au besoin.

Sur les couvercles et les habillages, seuls des motifs complets sont placés à l'intérieur du cadre disponible, y compris des motifs simples. Si aucun ne s'adapte, réduire la taille ou l'offset. Les détails intérieurs fermés (par exemple le centre d'une découpe en forme d'anneau) peuvent devenir des îles lâches. Ajouter des ponts dans votre éditeur vectoriel ou utiliser la décoration surélevée sur le couvercle. L'application bloque la géométrie déconnectée au lieu de jeter silencieusement des pièces.

Les motifs sont inclus dans les exportations de pièces individuelles, les kits complets et les travaux d'impression à tirage complet. Le passage à **Built-in** supprime le motif personnalisé seulement de cette cible. La suppression d'une vignette de bibliothèque ne supprime pas les motifs intégrés des projets.

<a id="download-ready-to-use-stencil-svgs"></a>
### Télécharger des pochoirs SVG prêts à utiliser

Ces exemples contiennent des contours remplis et des ponts de matière. Les zones noires deviennent des ouvertures en mode **Through stencil (cut)**. Enregistrez les fichiers des liens ci-dessous avec l’extension `.svg`. Si le navigateur affiche le dessin, utilisez sa commande d’enregistrement de la page et conservez cette extension.

| Télécharger | Motif | Largeur de départ suggérée |
| --- | --- | --- |
| [Feuilles organiques — télécharger SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinq feuilles avec des ponts reliant les détails intérieurs | 20 mm; réduire pour une habillage basse |
| [Double hexagone — télécharger SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Une tuile double-hexagone avec quatre ponts et une ouverture centrale | 20–24 mm; utiliser **Repeat** pour une grille |

**Sur un couvercle:** ajouter un couvercle sous **Forme → Couvercle**, ouvrir **My SVGs**, et télécharger l'un ou l'autre fichier. Choisissez **Through stencil (cut)**. Commencez par **Single motif** pour l'inspecter, ou sélectionnez **Repeat** pour remplir la zone disponible avec des copies complètes. Réglez la largeur, la rotation et les décalages X/Y. Répétez l'espacement est l'espacement entre les copies complètes, et non la largeur de leurs ponts internes. Commencez par un espacement de 4 mm.

**Sur un habillage :** ouvrez **Habillage** → **Pattern** → **My SVGs**, ou l’onglet **Habillage** du studio, puis choisissez le fichier dans la bibliothèque commune. Les habillages utilisent uniquement des ouvertures traversantes. **Repeat** répète le motif autour de l’habillage ; **Supplémentaire** → **SVG walls** permet de choisir les faces d’un habillage enveloppant. Pour les panneaux décoratifs, les faces de panneaux sélectionnées sont utilisées. Chaque surface conserve ses propres réglages de position et d’épaisseur. Changer d’onglet affiche la pièce correspondante.

Si un motif ne s'adapte pas, réduire sa largeur ou son décalage. Sur une habillage basse, essayez de 12 à 16 mm pour le groupe de feuilles. L'augmentation de l'épaisseur de la habillage peut élargir sa bordure automatique et laisser moins d'espace pour le dessin. L'écaillage réduit également les ponts: inspectez-les dans votre slicer et imprimez un petit échantillon pour votre buse et votre matériau. L'espacement répété ne peut pas élargir les ponts internes. Attendez la fin de l'aperçu actuel, puis utilisez **↓ Télécharger** de vérifier et d'exporter le couvercle ou la habillage.

<a id="numeric-sliders-and-valid-ranges"></a>
### Curseurs numériques et plages autorisées

Les réglages numériques montrent **Min** et **Max** au-dessus d'une piste verte mince, avec un marqueur blanc pour la valeur courante. Les bouchons rouges marquent l'extérieur de l'intervalle autorisé; ils ne sont pas une cote de force d'impression. Faites glisser le marqueur, utilisez les touches fléchées tout en focalisant, ou tapez un nombre exact et appuyez sur Entrée. Le champ numérique et le curseur utilisent les mêmes limites. Certaines limites changent avec le modèle; une valeur à l'intérieur de la plage d'un curseur peut toujours entrer en conflit avec un autre réglage, alors suivez n'importe quel avertissement de géométrie avant d'exporter.

<a id="whole-drawer-export"></a>
## Exporter tout le tiroir

Choisissez **Drawer → Print entire drawer** pour préparer tous les plateaux, leurs accessoires et toutes les sections de plaques de montage activées. Les plateaux montés reçoivent des logements pour leurs positions sauvegardées; les plateaux libres ordinaires gardent leurs bases existantes. Les projets d'impression fractionnée comprennent leurs pièces et leurs broches.

Ensemble **Printer bed length** (horizontale), **Printer bed width** (verticale), hauteur d'impression et espacement. Les dimensions initiales proviennent des réglages des plaques de montage ou de la zone d'impression du premier plateau; les paramètres d'exportation ultérieurs sont enregistrés avec ce tiroir. Les sections des plaques de montage sont régénérées pour le plateau choisi.

La disposition tient compte des dimensions extérieures réelles des pièces exportées, d’une marge de 2 mm au bord du plateau et de l’espacement choisi. Les pièces peuvent tourner de 90° ; les composants colorés d’un couvercle restent ensemble. Le nombre de plateaux affiché correspond à cette disposition, sans garantie de minimum. Les supports, bordures d’adhérence (brim), tours de purge, zones interdites de l’imprimante et travaux séparés par matériau ne sont pas pris en compte. Réservez l’espace nécessaire et vérifiez le résultat dans le slicer. Aucun profil d’imprimante ni aucune affectation de filament n’est intégré.

Le ZIP contient **bed-NN.3mf** pour chaque plateau, correspondant **bed-NN.svg** diagrammes, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** et une liste de pièces numérotées dans **README.txt**. Ouvrez chaque 3MF comme un travail d'impression séparé, conservez les positions relatives de ses objets, utilisez des millimètres à 100% d'échelle et assignez des filaments. Les diagrammes SVG montrent des rectangles limites; le 3MF contient la géométrie imprimable complète.

Les modifications apportées aux paramètres de mise en page ou d'exportation invalident le calcul précédent. La fermeture de la fenêtre annule la préparation. Les parties individuelles surdimensionnées sont signalées plutôt que scindées silencieusement ou automatiquement.

<a id="pattern-studio"></a>
### Studio de motifs

Choisissez **Raised relief (decoration)** pour un relief ou **Through stencil (cut)** pour des ouvertures traversantes. Les habillages acceptent uniquement les ouvertures. La hauteur apparaît seulement en mode relief, l’espacement seulement en répétition. **Material thickness** modifie l’aperçu et l’export : 1,2–6 mm pour un couvercle SVG, 1–4 mm pour un habillage. Par défaut, le couvercle mesure 3,2 mm en relief et 2 mm en pochoir ; une épaisseur choisie est conservée au changement de mode. La hauteur du relief est comprise dans l’épaisseur. Un couvercle SVG encastré exige une profondeur intérieure au moins égale à l’épaisseur de la plaque plus 2 mm. **Supplémentaire** contient la couleur du couvercle ou les faces de l’habillage. **Which SVG files work?** explique les exigences et la préparation.

Ouvrez **Forme** → **Couvercle** → **My SVGs** ou **Habillage** → **Pattern** → **My SVGs**. Les onglets **Couvercle** et **Habillage** partagent la bibliothèque, mais conservent des réglages indépendants. Changer d’onglet affiche la pièce seule ; si elle n’existe pas encore, l’assemblage reste visible. Vous pouvez toujours rétablir la vue d’ensemble au-dessus du modèle. Largeur, rotation, espacement et X/Y positionnent le dessin ; le bouton de centrage réinitialise position et rotation. Le couvercle accepte relief et ouvertures ; l’habillage, uniquement les ouvertures. Cadres et zones de fixation restent intacts. **×** ou **Escape** ferme le studio actif en conservant les modifications. Les flèches du clavier changent l’onglet sélectionné.
