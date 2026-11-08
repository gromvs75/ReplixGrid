<a id="replixgrid-user-guide"></a>
# Guía del usuario de ReplixGrid

Diseñe un organizador con medidas en milímetros, compruebe el encaje de las piezas y descárguelas para su laminador (slicer). Para empezar, siga el ejemplo ilustrado de la cápsula en la guía rápida. Este manual explica cada ajuste.

[Abrir ReplixGrid](https://grid.replixcast.com/?lang=es) [Inicio rápido](USER-GUIDE.md) · [Instalación local](../../../README.md#local-installation)

| Secciones del manual |
| --- |
| [Área de trabajo y vistas](#workspace-and-views) |
| [Forma y dimensiones](#shape-and-dimensions) |
| [Compartimentos y separadores](#compartments-and-dividers) |
| [Altura de paredes y recortes](#wall-heights-and-cutouts) |
| [Esquinas, bordes y decoración](#corners-edges-and-decoration) |
| [Insertos, niveles y tapas](#inserts-tiers-and-lids) |
| [Carcasas enteras y paneles](#sleeves-and-panels) |
| [Proyectos y copias de seguridad](#projects-and-backups) |
| [Configuración de impresión y división en partes](#print-setup-and-sectioning) · [Descarga y preparación en el laminador](#download-and-slice) |
| [Variantes de proyecto](#project-variants) · [Estilos compartidos](#shared-styles) |
| [Distribución de organizadores en cajones](#drawer-arrangements) · [Placas de montaje](#mounting-plates) |
| [Relieve SVG personalizado](#custom-svg-relief) · [Estudio de patrones](#pattern-studio) |
| [Exportar todo el cajón](#whole-drawer-export) |
| [Solución de problemas](#troubleshooting) |

<a id="start-a-new-project"></a>
## Iniciar un nuevo proyecto

Al iniciar por primera vez, el área de trabajo está vacía. La guía de la izquierda tiene tres pasos: **Elige una forma → Define las dimensiones → Añade compartimentos**. Elige una forma, ajusta las dimensiones y pulsa **Siguiente: compartimentos**. Termina con **Listo** o **Dejar sin separadores**. Tras elegir una forma, puedes cerrar la guía con **×**. También puedes abrir un proyecto guardado o un archivo JSON.

**En pantallas pequeñas:** si la ventana del navegador tiene un ancho de 1400 px o menos, el asistente aparece **debajo del modelo** para no tapar la vista previa. Desplácese **hacia abajo en la página** para acceder al asistente, a los pasos siguientes y a los botones para pasar a los compartimentos y finalizar. Vuelva a subir para ver el modelo. En ventanas más anchas, el asistente permanece junto al menú izquierdo.

Vuelve a abrir la guía desde **Ayuda → Guía: tres pasos**. Abrirla no modifica el modelo. Elegir otra forma sustituye el modelo actual; puedes deshacer esa acción.

El inicio rápido, la guía del usuario y el menú de ayuda utilizan el idioma de la interfaz. El vídeo sigue en inglés.

Los pasos, consejos y confirmaciones de la guía están traducidos. La fila del modelo guardado se llama **Proyecto anterior**. Los nombres reales en **Mis proyectos** se mantienen tal como los guardaste.

Uso **Nuevo proyecto** en la barra superior para volver a este comienzo limpio. Su trabajo actual se guarda primero; un borrador sin nombre se mantiene en **Mis proyectos**. No se eliminan proyectos, variantes, ranuras de filamento y configuración de impresora. El panel muestra una miniatura etiquetada **Proyecto anterior** con **Guardado en «Mis proyectos»**; haga clic en esa fila para reabrir su biblioteca. El lienzo se limpia inmediatamente y permanece vacío hasta que elija una nueva forma, al igual que en una primera visita. Hasta que elija una nueva forma, el ahorro y la exportación están desactivados. Usted puede abrir un proyecto desde **Mis proyectos** o importar su JSON archivo. Refrescar esta pestaña de arranque vacío mantiene la pantalla de inicio; la reapertura de un proyecto existente restaura el modelo. Visitas ordinarias de retorno reanudar trabajo salvado.

Elegir **Forma → Base → Crear desde plantilla Las celdas alveolares son demasiado pequeñas para el espesor de pared.** mientras la edición todavía reemplaza la construcción dentro del proyecto actual y puede ser deshecha. Uso **Nuevo proyecto** cuando desea un modelo separado.

<a id="workspace-and-views"></a>
## Área de trabajo y vistas

Abra una herramienta en la parte superior izquierda. **Forma** cambia el cuerpo y sus accesorios. **Compartimentos** cambia el diseño. **Carcasa** diseña una cubierta exterior separada. **Impresión** establece el volumen de impresión, ranuras de filamento y cortes de sección opcionales. Haga clic en un número de compartimento, pared o divisor en el modelo para abrir su configuración a la derecha. Si una parte es difícil de hacer clic, ampliar **Todas las paredes y compartimentos** y seleccionarlo por nombre.

Seleccione una sección en el menú izquierdo. Sus ajustes se abren en un panel flotante en la parte inferior de la vista previa; la escena y la cuadrícula siguen visibles detrás. El panel complementa el menú izquierdo. La flecha lo contrae y **×** lo cierra. Seleccione otra sección para cambiar de ajustes. El panel derecho conserva las opciones de la pared o del compartimento seleccionado.

Arrastre el fondo para girar el modelo, use la rueda para acercar o alejar y arrastre con el botón derecho para desplazar la vista. **Cámara de retorno** restablece el encuadre. **Superior** facilita seleccionar compartimentos estrechos y mover separadores; **3D** muestra las alturas y el conjunto. **Cuadrícula** activa una cuadrícula de 10 mm con líneas principales cada 50 mm. Los botones sobre el modelo muestran por separado el organizador, los insertos, la carcasa o la tapa; **Conjunto** muestra las piezas disponibles juntas. Para varios niveles, abra el menú junto a **Organizador**: **Ver pila** muestra toda la pila y un nivel numerado permite editarlo por separado. El editor inferior sigue abierto. En la vista apilada, **Carcasa** e **Insertos** incluyen piezas de todos los niveles. En ventanas estrechas, estos botones pasan a otra fila bajo la barra de herramientas. Al mostrar solo la tapa, **Abajo** permite revisar su cara inferior. **Esc** cierra el panel de herramientas. Las flechas curvas deshacen o rehacen cambios.

Utilice la barra superior para elegir un lenguaje de interfaz o cambiar entre luz, apariencia oscura y sistema. Los nombres de control en esta guía siguen el idioma de interfaz seleccionado.

<a id="shape-and-dimensions"></a>
## Forma y dimensiones

Bajo **Forma → Base**, elegir un perfil de base y altura, luego haga clic en **Crear desde plantilla Las celdas alveolares son demasiado pequeñas para el espesor de pared.**. El botón reemplaza la construcción actual. Guardar una copia nombrada primero si desea guardar ambos diseños. **Espacios en blanco simples** también ofrece un cuerpo vacío y un punto de partida de cuatro componentes.

| Base | Cuándo elegirlo |
| --- | --- |
| Redonda | Una huella rectangular con esquinas exteriores ajustables. |
| Cápsula | Un cuerpo largo con extremos semicirculares. La plantilla inclinada lleva la inclinación a través de ambos extremos curvados. |
| Circle | Un organizador redondo tamaño por diámetro. |
| Oval | Esbozo curvado alargado con ancho y profundidad ajustables por separado. |
| Honeycomb | Un racimo de células hexagonales que comparten paredes. Seleccione una célula para ajustar su altura. |

Elija **Suave** para un borde de nivel, **En pendiente** para un ascenso continuo, o **Escalones** para niveles de altura distintos. Las dimensiones debajo de las opciones describen la plantilla que está a punto de crear. Una vez creado, edite el modelo bajo **Dimensiones**. La anchura y la profundidad miden la huella exterior. Utilice las dimensiones internas del compartimento seleccionado al dimensionarlo para un objeto. En una base curvada, también comprobar los extremos de estrechamiento en **Superior** vista.

![cápsula inclinada con un extremo bajo para el acceso, un extremo alto para artículos largos y dos divisores transversales](../../images/capsule-sloped.jpg)

En **Forma** → **Adicional**, ajuste el grosor de paredes y fondo. Las paredes más gruesas reducen el espacio interior. **Inclinación sobre una base plana** inclina las paredes hacia delante hasta 25°, manteniendo el fondo horizontal. Un borde superior en pendiente, en cambio, modifica la altura de las paredes a lo largo del cuerpo. Con inclinación, compruebe los tamaños exteriores finales en la ventana de descarga.

<a id="exact-internal-dimensions"></a>
## Dimensiones interiores exactas

Seleccione un compartimento y abra **Dimensiones interiores** a la derecha, o pulse su cota azul en el modelo. Elija anchura o profundidad e introduzca milímetros. Pulse fuera del campo o **Enter** para aplicar; **Escape** cancela. En el panel derecho use **Aplicar**. Los valores incorrectos no cambian el modelo. Cada cambio confirmado puede deshacerse en un paso.

El divisor naranja es su posición actual; la línea azul desgarrada preve la nueva posición. El cierre más cercano se divide en el eje elegido se mueve, manteniendo el tamaño exterior del cuerpo y el espesor de la pared sin cambios. El panel muestra los tamaños vecinos afectados. Si no hay divisor en ese eje, ajustar las dimensiones generales o dividir el compartimento primero.

En una fila simple, empezar con el compartimento 1 y continuar en orden; el último compartimento toma el resto. Las dimensiones vecinales no están cerradas, por lo que la edición de un compartimento anterior puede cambiar el tamaño de uno más adelante.

Se admiten esquinas redondeadas, formas de cápsula, chaflanes y redondeos interiores. La línea azul mide el espacio interior por el centro del compartimento, justo encima del fondo. Las curvas pueden reducir el espacio en otros puntos: deje holgura y compruebe todo el contorno del objeto. La edición precisa de compartimentos aún no está disponible para círculos, óvalos, panales ni paredes inclinadas.

Seleccione una pared o un divisor para editar su altura directamente en el modelo. Las paredes planas muestran un valor; los perfiles de dos puntos muestran valores A/B. Las reglas de altura y de paredes escalonadas coinciden con el panel derecho. Estas etiquetas editan altura, no longitud de la pared o espesor global.

<a id="compartments-and-dividers"></a>
## Compartimentos y separadores

Para una distribución rápida, utilice **Compartimentos → + Compartimento** para dividir el compartimento más grande. **− Compartimento** fusiona un par vecino. En un panal de miel, estos controles agregan o eliminan una célula externa y preservan el tamaño de los demás. Dos células vecinas de panal de la familia comparten una pared tan alta como la célula más alta.

Para una distribución exacta, cambie a **Superior** y seleccione el compartimento que desea dividir. Elija **Número de piezas**, luego **Dividir de ancho** para dividir el ancho en compartimentos más estrechos, o **Dividir en profundidad** para hacer más suaves. Puede dividir uno de los resultados de nuevo. Para una bahía de lápiz junto a dos pequeñas bandejas, primero dividir el ancho en dos, entonces dividir sólo el lado de bandeja en profundidad.

![Ejemplo de vista superior con una bahía de profundidad completa y dos compartimentos más pequeños](../../images/compartment-splits.svg)

Seleccione el separador para arrastrarlo, o ajustar **Primer compartimento** bajo **Posición de partición**. Sólo el separador seleccionado se mueve; otras posiciones de divider permanecen fijas. Los compartimentos adyacentes cambian de tamaño. Los movimientos que dejan demasiado poco espacio son rechazados. Compruebe las nuevas dimensiones internas de cada lado. **Eliminar partición** combina los compartimentos y también puede eliminar los separadores anidad dentro de esa división.

<a id="wall-heights-and-cutouts"></a>
## Altura de paredes y recortes

Seleccione una pared exterior o un separador. **Una altura** crea un borde uniforme; **Dos puntos** permite ajustar las alturas de los extremos A y B marcados en el modelo. **Directo**, **Ondulado** y **Zigzag** definen el perfil del borde. La longitud de onda controla la distancia entre repeticiones. En una plantilla escalonada, modificar un escalón también ajusta la pared y el separador vinculados.

Usar **Conectar las alturas de paredes adyacentes.** para hacer una pared exterior seguir a sus vecinos. Para un separador, **Ajustar a paredes adyacentes** copia las dos alturas finales una vez. Repita el ajuste después de cambiar las paredes vecinas. **Como los demás** devuelve la pared seleccionada a la altura común.

Abrir **Recorte de pared** para hacer una apertura de acceso. Elija una cuchara suave, semicírculo o abertura rectangular, establecer el ancho y la profundidad, luego moverlo a lo largo de la pared. Posición corre desde el extremo A a B. La profundidad se mide desde el borde superior. Inspeccione el labio restante por encima del fondo. Elija **Sin recorte** para llenar la abertura.

<a id="corners-edges-and-decoration"></a>
## Esquinas, bordes y decoración

Abrir **Forma → Esquinas y chaflanes**. Tres controles afectan diferentes partes de la impresión.

| Control | Donde mirar | Lo que cambia |
| --- | --- | --- |
| esquinas externas | Vista superior, contorno exterior | Redondear las esquinas de la huella o cortarlas a 45°. Cero da una esquina cuadrada. Disponible en la familia rectangular de bases. |
| Compartimentos interiores radiales | Vista superior, dentro de una bahía | Redondea la unión vertical donde se encuentran dos paredes. Las bahías de la vista limitan el radio disponible. |
| borde superior de las paredes y divisores | Seccionamiento transversal a través de una pared | **Chaflán** corta una bisagra plana y **Redondeo** curva el labio. Ambos lados de las paredes exteriores y los separadores reciben el acabado. **Ninguno** restaura el labio cuadrado. |

![Las secciones transversales de la pared que muestran esquinas superiores cuadradas, acariciadas y redondeadas con el mismo espesor de la pared](../../images/top-edge-profiles.svg)

Por ejemplo, en una pared de 2 mm prueba un chamfer de 0,5 mm. Cada lado pierde 0,5 mm en la parte superior, dejando una tira plana de 1 mm. El tamaño máximo mostrado depende del espesor de la pared. Con **Redondeo**, el valor es el radio en milímetros.

- **Color del organizador** cambia la vista previa y las exportaciones de color. Elija un swatch, un color personalizado o un color de filamento configurado. Asignar la ranura de filamento real en la exportación.
- **Borde inferior** añade una banda de proyección alrededor de la base. Elija el corte liso, rayado o pisado y fijar su altura. Una manga compatible puede descansar en ella. Trim requiere un cuerpo de una pieza fija y está disponible en el primer nivel. Los paneles separados se sientan por encima de ella con el borde seleccionado.
- **Relieve organizador** añade un patrón elevado directamente a la pared exterior. Desplaza el catálogo de patrones, establece el tamaño del patrón y la altura del relieve, y observa la actualización del modelo durante el arrastre mientras cada cálculo termina. El valor final utiliza la precisión completa. El interior se mantiene suave. Las proyecciones aumentan las dimensiones externas. Elija **Suave** para eliminar el relieve.
- **Firma y credencial** pone letras o un símbolo en un lado seleccionado. Introduzca el texto, elija una fuente, fije la altura de la letra y la posición vertical, luego elija la letra elevada o el grabado y establezca su altura o profundidad. Una estrella o corazón pueden acompañar el texto. En organizadores circulares y ovalados, texto e iconos siguen la pared curvada, incluso en STL y 3MF exportaciones. El espaciado de cartas se mide a lo largo de la superficie. Elija Frontal, Rear, Izquierda o Derecha para centrar la inscripción en ese lado. En círculos y ovalados con alturas de pared enlazadas o variables, las letras se quedan por debajo del perfil de pared más bajo y el corte. La carta de Honeycomb todavía no está soportada; los proyectiles que cubren el lado elegido y el relieve también pueden prevenir el envío de cartas. Las letras de paredes planas todavía requieren un perfil de altura constante. Si la inscripción se ejecuta en un corte o excede la cara disponible, baja la posición o reduce el tamaño de la letra.

<a id="inserts-tiers-and-lids"></a>
## Insertos, niveles y tapas

**Insertos extraíbles.** Seleccione un compartimento y abra **Inserto de bahía** a la derecha. **Vacío** crea un recipiente abierto, **Para pequeñas cosas** una cuadrícula con filas y columnas ajustables y **Para manijas** alojamientos para bolígrafos o herramientas. Indique el diámetro interior; la aplicación coloca tantos como quepan. Elija un contorno adaptado al compartimento, redondeado, circular, ovalado o hexagonal y un color. **Quitar inserción** retira el inserto. Un inserto vacío también es una pieza imprimible.

El inserto sigue su compartimento con por lo menos 0,5 mm. Sus paredes y fondo son de 1,2 mm de espesor y su altura se ajusta para terminar aproximadamente 1 mm debajo del borde. Un inserto en un organizador inclinado sale a lo largo de la pendiente. Isolate **Insertos** para inspeccionarlos, luego exportar **Organizador y accesorios**. Los insertos requieren una impresión de una sola pieza.

**Bandejas apiladas.** Comience con un borde de nivel, luego abra **Forma → Niveles → + Nivel**. Usted puede utilizar de dos a cinco niveles; **− Nivel** quita un tier. Los niveles comparten una huella pero pueden tener diferentes compartimentos, alturas, colores y decoración.

1. En el desplegable junto a **Organizador** sobre el modelo, elija **Nivel 1**, **Nivel 2**, u otro nivel. Ese nivel se muestra por sí solo, y el editor de configuración actual permanece abierto.
2. Editar el tier seleccionado con los controles de forma, compartimento, relieve y carcasa habituales. Cambiar el tier no copia su configuración a otros niveles.
3. Elija **Ver pila** en el mismo desplegable para inspeccionar todos los niveles y accesorios juntos. Use **Conjunto**, **Organizador**, **Insertos**, **Carcasa** o **Tapa** para mostrar las partes que necesita. Regrese a un nivel numerado para continuar editándolo.
4. En **Forma** → **Niveles**, ajuste **Holgura de ajuste** y pruebe el encaje con una muestra pequeña antes de imprimir toda la pila. Baje los separadores que sobresalgan del borde. Para apilar se necesitan paredes verticales y un borde de apoyo continuo.

El relieve integrado y SVG decoran el exterior de cada tier mientras que los collares de apareamiento, las lenguas y las tomas se mantienen suaves. Las carcasas rotas y los paneles decorativos pueden cubrir los revestimientos individuales. Para los paneles, mantenga **Desplazamiento de borde** al menos 3 mm por lo que limpian los collares de apareamiento.

Con una carcasa envolvente, una lengüeta en la cara interior de la pared inferior encaja en un alojamiento bajo el fondo de la bandeja superior. La anchura, profundidad y altura útil de los compartimentos no cambian; cada alojamiento añade 2,2 mm a la altura exterior de la pila. Las carcasas se apoyan entre sí en una banda de 0,8 mm. Se deslizan desde arriba: separe los niveles antes de retirarlas. Cada carcasa se exporta por separado con su número de nivel.

**Borde inferior** está disponible en el primer nivel (oeste) sólo: elegir liso, anillos o pasos. Con una carcasa envuelta compatible, el borde también soporta la carcasa. Los paneles separados se sientan por encima del borde seleccionado con el offset. Nuevos niveles superiores no heredan el borde. Si la lengua no puede caber en el espesor de la pared, reducir **Holgura de ajuste**; la aplicación no engrosa la pared automáticamente.

**Tapa.** Abra **Forma** → **Tapa** y pulse **+ Portada**. El borde superior debe tener altura uniforme y los separadores no deben sobresalir. La inclinación, el panal y la impresión dividida son incompatibles. **Exterior** cubre el exterior; **Encajada** es una placa de 2 mm que queda enrasada por dentro. Su asiento deja 0,35 mm de holgura por lado y espacio sobre los separadores e insertos. Requiere paredes de al menos 2 mm y profundidad interior de 4 mm. Añada una muesca o un asa para levantarla. La tapa exterior tiene un reborde de centrado con 0,5 mm de holgura. Ajuste el patrón, tamaño, profundidad, altura del borde y acabado. El asa puede ser cilíndrica o alargada, con tamaño, altura, chaflanes y redondeos ajustables. Se imprime por separado y se pega. La vista previa eleva la tapa exterior y muestra la interior colocada. Al exportar, la tapa queda plana para imprimir.

**Motivo bicolor** está disponible para ambos tipos de tapa. Elija rama de olivo, hojas de ginkgo, helecho, olas, piedras de río, anillos de crecimiento o celdas de Voronoi, y los colores de base y patrón. La placa de 3,2 mm tiene una base sólida de 1,6 mm y una capa de patrón de 1,6 mm. El reborde exterior y el asa aumentan la altura total. La tapa encajada requiere al menos 5,2 mm de profundidad interior. Exporte en 3MF para mantener juntas las dos piezas de color y asigne sus filamentos. Para olivo, ginkgo, helecho, olas y anillos, **Patrón calado** crea aberturas en la capa superior. **Patrón en relieve** deja vacías esas aberturas de 1,6 mm y muestra la base inferior; desactívelo para una incrustación lisa. Las tapas encajadas con relieve se imprimen con la base abajo; las exteriores, con el patrón abajo. Revise los puentes sobre los huecos en el laminador.

![Seis patrones de tapa de dos toneladas](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Carcasas enteras y paneles

Abrir **Carcasa** y elegir un patrón. Una carcasa se imprime por separado del organizador. Si desea el patrón en el propio cuerpo, utilice **Forma → Relieve organizador**.

| Modo de Shell | Fito y montaje |
| --- | --- |
| **Alrededor del cuerpo** | Una manga sin fondo sigue el perímetro y las alturas de la pared. Diríjala sobre el cuerpo desde arriba, siguiendo la dirección de la pared en un modelo inclinado. El panel indica si una cornisa de soporte está presente o la manga descansa sobre la mesa. |
| **Paneles decorativos** | Los paneles enmarcados separados cubren los lados seleccionados y dejan las esquinas expuestas. Elija los lados y ajuste **Desplazamiento de borde**. Paneles de color sin sujeción. Con pins ocultos, presione cada panel directamente sobre su pared de juego para un apego permanente. |

![Vistas superiores de una manga envolviendo las esquinas y paneles separados que terminan antes de cada esquina](../../images/shell-fit.svg)

Elija el patrón, establecer su tamaño y conjunto **Espesor de la carcasa**. Para una manga de una sola pieza, ajuste **Ancho del borde** por su marco sólido. Paneles decorativos tienen un marco fijo; uso **Desplazamiento de borde** para colocarlos en la pared. Under **Aterrizaje**, **Espacio libre en cada lado** establece la brecha entre la manga y el organizador. Una brecha de 0,5 mm en cada lado añade 1 mm a través de dos lados opuestos antes de contar el espesor de la carcasa. Compare **Conjunto** con el aislado **Carcasa** ver para juzgar el resultado. **↓ Descargar shell** exporta la cubierta por separado, y **Quitar caparazón** lo quita del diseño.

Los paneles requieren una base rectangular compatible. Seleccionarlos no cambia el grosor de las paredes ni el espacio interior. Las fijaciones ocultas necesitan paredes de al menos 3,2 mm sin relieve. En paredes más finas, incluidas las de 2,4 mm, use paneles sin fijaciones y péguelos. Las paredes nunca se engrosan automáticamente. El margen del panel mide la distancia al borde de la cara; la holgura de la carcasa envolvente controla su encaje deslizante. Si hay moldura inferior, el margen inferior se mide desde su parte superior; fijaciones y alojamientos siguen ese perfil. En niveles apilados, deje al menos 3 mm de margen para no interferir con los rebordes de unión.

<a id="projects-and-backups"></a>
## Proyectos y copias de seguridad

Utilizar **Mis proyectos → Guardar una copia** para nombrar un diseño o hacer una variante antes de experimentar. El proyecto abierto se guarda automáticamente en este navegador. La biblioteca le permite buscar, abrir, renombrar, eliminar o descargar un proyecto. **Guardar proyecto** en la barra superior descarga una copia de seguridad JSON editable. Use **Abrir** para cargar ese archivo, incluso en otra computadora o en una instalación local.

Las ediciones comprometidas se guardan inmediatamente. Una copia de recuperación local temporal protege los cambios mientras la base de datos del navegador está guardando; la reapertura restaura esa copia si se interrumpió un escrito. Una instantánea separada de último éxito puede recuperar una sesión actual dañada, incluyendo la historia del deshacer. Si no se puede restaurar una copia válida, se detiene el ahorro automático en lugar de reemplazar el proyecto almacenado con un modelo de arranque.

Los cheques de exportación pertenecen a la revisión actual del proyecto, las piezas seleccionadas y la posición de montaje. Cambiar estos invalida el cheque anterior; un resultado viejo no se puede descargar como el nuevo modelo. Los cálculos fallidos conservan las ediciones. Una vista previa fija reporta un error después de dos minutos; la próxima edición de geometría comienza un nuevo cálculo.

Cuando el mismo proyecto o cajón se edita en varias pestañas, los cambios conflictivos se guardan como un **Copy from another tab**. La otra versión se mantiene, y la pestaña de edición continúa con su copia. Compare las versiones en **Mis proyectos** o el selector del cajón y renombre la copia si desea mantenerla. Reabrir una pestaña organizador restaura su propio proyecto guardado.

Mantenga una copia de seguridad descargada antes de limpiar los datos del navegador. Cada navegador y la dirección del sitio tiene su propia biblioteca. Las ranuras de Filament se almacenan por separado para la impresora en el navegador. Configurarla de nuevo cuando se mueve a otro dispositivo. Para la aplicación local descargable, vea [Instalación local](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Configuración de impresión y división en partes

Bajo **Impresión**, seleccione la configuración de la impresora y la cabeza o elija **Tamaño personalizado**. Compruebe la anchura, la profundidad y la altura de la construcción. El preset proporciona el volumen de impresión. Elija la impresora, la boquilla, el material y los perfiles de corte en su laminador.

Si el modelo no cabe en la base de impresión, use los cortes propuestos o elija dos o tres secciones cuando estén disponibles. Compruebe las uniones con **Separar las piezas**. La división aumenta el grosor de las paredes a un mínimo de 5 mm y el del fondo a 3 mm; vuelva a comprobar las medidas interiores. Retire antes las carcasas y los insertos. Los modelos apilados, inclinados, circulares, ovalados o de panal deben imprimirse de una sola pieza. **Devolver modelo sólido** desactiva la división. Revise de nuevo los grosores si quiere recuperar las medidas anteriores.

**↓ Joint sample** descarga los extremos de apareamiento para probar a la misma escala e imprimir ajustes como el cuerpo final. Ponlos separados con sus bases abajo. Después del enfriamiento, los pines nominales Ø 3.2 × 8 mm encajan en agujeros Ø 3.3 mm, 4.5 mm de profundidad en cada lado de la costura. Revise la alineación, luego use pins y pegamento para montar las secciones impresas. Uso **↓ Descargar todas las partes** para el organizador de sección en sí mismo.

<a id="download-and-slice"></a>
## Descarga y preparación en el laminador

1. En **Impresión** → **Slicer filaments**, use los mismos números y colores que en el laminador. En Snapmaker U1, los slots 1–4 corresponden a los cabezales T0–T3. Puede configurar hasta 16 slots, cada uno con color y nombre de material. El color es una referencia aproximada, no una simulación del tono impreso o mezclado; configure las mezclas exactas en el laminador. Seleccione una tarjeta y pulse **Delete filament from slot N** para borrar el filamento. Los demás números no cambian: al borrar el slot 6, el 7 sigue siendo el 7. **+ Slot N** reutiliza el número libre más bajo; el límite sigue siendo 16. Borrar un filamento no cambia el color del modelo. Los slots eliminados dejan de ofrecerse o asignarse automáticamente al exportar; elija otro o asígnelo en el laminador. Los colores distintos permiten la asignación automática. Si dos slots comparten color, seleccione el adecuado para cada pieza en la ventana de descarga.
2. Click **↓ Descargar**. Elija **Organizador y accesorios**, **Sólo carcasa** or **Todo el conjunto**, según qué partes necesita. Para un modelo de sección, exporte el kit.
3. Seleccione un formato a continuación. Para 3MF, asigne una ranura de filamento a cada parte o déjelo para la asignación en el laminador. Orca puede utilizar el primer filamento para piezas sin asignar.
4. Espere por la geometría y los controles de tamaño. Lea las dimensiones de cada parte y cualquier instrucción para girarla 90° en la base de impresión. El cheque se reserva 2 mm en los bordes de la base de impresión. Descargue con el botón de formato en la parte inferior del diálogo.
5. Abra el resultado en su laminador a escala **100% escala en milímetros**. Arregle el conjunto completo, compruebe los overhangs y los detalles delgados, y prevea la primera capa y separadores. Para una impresión multicolor, verifique la asignación de filamento de cada parte antes de cortar.

| Formato | Elija para | Qué hacer con la descarga |
| --- | --- | --- |
| STL | Geometría para una impresión de un solo color | Abra el STL en el laminador. Extraiga el ZIP primero si la exportación contiene varios STLs. |
| 3MF | Un kit con partes separadas, colores y asignaciones de filamentos | Abralo en su laminador y verifique las piezas y ranuras. ReplixLas hojas imprenta y los perfiles de material a la laminador. |
| OBJ + MTL | Un modelo de color para una herramienta que acepta OBJ | Mantén la geometría y el archivo de material juntos. El modelo utiliza milímetros con Z up. |
| Project JSON | Continuando con la edición de compartimentos, dimensiones o accesorios | Usar **Guardar proyecto** y reabrirlo con **Abrir** en ReplixGrid. |


Para usar el mismo color digital que en el laminador, introduzca el **HEX code** de seis caracteres, por ejemplo `#E63522`, junto al selector de color. El `#` inicial es opcional. Un código válido actualiza la vista previa al instante. El texto incompleto o incorrecto no se aplica; al salir del campo vuelve el color guardado. El código no simula el aspecto real del filamento, la iluminación ni una mezcla física de colores.

<a id="troubleshooting"></a>
## Solución de problemas

| ¿Qué ves? | Qué hacer para comprobar |
| --- | --- |
| El objeto se ajusta a las dimensiones exteriores pero no encajará en una bahía | Seleccione el compartimento y compruebe sus mediciones internas. Permita el espesor de la pared, los extremos curvados, el radio de esquina interior y los insertos extraíbles. |
| Seleccionar un separador sigue seleccionando la pared delante | Cambiar a **Superior** o abrir **Todas las paredes y compartimentos** a la derecha. |
| La tapa o el siguiente nivel no se puede añadir | Verifique un borde de nivel, igual de alturas externas, divisores de protrusión, imprenta de inclinación o división. Para una pila, también compruebe los clips de shell heredados y el ajuste de la limpieza en relación con el espesor de la pared. |
| Una parte supera la base de impresión, aunque la huella parecía lo suficientemente pequeña | Lea las dimensiones terminadas en el cuadro de diálogo de descarga. Tilt, relieve, trim y shells pueden extenderse más allá de la base. Compruebe la configuración y rotación de la impresora seleccionada. |
| Los sujetadores de panel ocultos no están disponibles | Usar paredes por lo menos 3,2 mm de espesor sin relieve, o dejar sujetadores y pegar los paneles. Cambiar a los paneles no espesa las paredes. |
| Los paneles superponen el borde inferior o del tier en un diseño antiguo | Establece una compensación de bordes de al menos 3 mm para los niveles. La compensación inferior se mide desde la parte superior del borde inferior. Regenerar y descargar las piezas después de cambiar la configuración. |
| Una impresión descargada tiene los colores equivocados | Use 3MF, coincida con los números de ranura en **Impresión**, luego inspeccione las asignaciones por parte en el laminador. STL sólo lleva geometría. |
| Falta un diseño guardado en otro dispositivo | Transferir su proyecto JSON y utilizar **Abrir**. Las bibliotecas del navegador son locales a cada dispositivo y dirección del sitio. |

<a id="project-variants"></a>
## Variantes de proyecto

Haga clic en **+ Variante** en la barra superior, o abra **Mis proyectos** y seleccione **Nueva variante**. Introduzca un nombre y haga clic en **Crear variante**. La nueva variante es una copia independiente; los restos originales se guardan. Un original sin nombre se mantiene como **Borrador**.

Utilice el selector junto a **+ Variante** para cambiar entre modelos relacionados, o elegir uno bajo **Variantes de este proyecto** en Mis proyectos. Cada variante guarda automáticamente y mantiene su propia historia de deshacer/redo después de cambiar o recargar. Una variante recién creada comienza con una historia vacía.

Uso **Proyecto independiente → Guardar una copia** para crear un proyecto no relacionado. Renombrar o eliminar modelos individuales en Mis proyectos; eliminar el original no elimina sus variantes.

**↓ Descargar** exporta el modelo seleccionado para imprimir. **Guardar proyecto** descargas que modelo como editable JSON; **Archivo** en una tarjeta de biblioteca descarga el modelo correspondiente. JSON contiene un modelo, sin sus variantes relacionadas o deshacer historia. Guardar cada modelo por separado para transferir o respaldar el conjunto completo.


<a id="shared-styles"></a>
## Estilos compartidos

1. Abra un proyecto con los colores y patrones que desea reutilizar.
2. Bajo **Forma → Estilo común**, escriba un nombre y haga clic en **Guardar estilo actual**.
3. Abra otro proyecto o variante, vuelva a **Estilo común**, y seleccione el estilo guardado.
4. Elija **Colores**, **Patrones**, o ambos. Repaso **Se aplicará** y los mensajes **Se omitirá**, luego haga clic en **Aplicar estilo**.

Un estilo captura el color y relieve del organizador, además de los colores y patrones de una carcasa y tapa existente. Un estilo suave del cuerpo elimina el relieve del cuerpo del destino. Dimensiones, diseños de compartimentos, grosores de la pared, ajuste de tapa, mangos y autorizaciones de la carcasa permanecen inalteradas. La falta de tapas o carcasas no se añaden.

La aplicación es un paso deshacer y crea una copia independiente: más tarde las ediciones a un organizador no cambian a los demás. Eliminar un estilo salvado no cambia los proyectos que ya lo utilizan.

Los estilos guardados pertenecen a este navegador y dirección del sitio. Un proyecto JSON preserva la apariencia aplicada, pero no incluye la biblioteca de estilo guardado. Para reutilizar un estilo en otro dispositivo, abra el estilo JSON del proyecto allí y guarde su estilo actual de nuevo.


<a id="drawer-arrangements"></a>
## Distribución de organizadores en cajones

Elija **Drawer** junto a **Organizador**, luego **Create drawer**. Introduzca la longitud, la anchura, la altura útil y la limpieza. La limpieza se aplica tanto en las paredes del cajón como entre las bandejas.

Los nuevos cajones comienzan en 180 × 280 mm, con el borde delantero marcado en la parte inferior. **Vista giratoria de 90°** cambia solamente la orientación de visualización; las dimensiones del cajón, las coordenadas de bandeja y los modelos exportados permanecen inalterables. Los arreglos de cajones existentes conservan sus dimensiones. Los cajones guardados se abren con longitud horizontal y ancho vertical; las etiquetas de dimensión siguen la rotación de la vista manual.

Utilizar **New organizer** para crear una bandeja directamente en el cajón. Establecer sus dimensiones, luego editar compartimentos y accesorios en el editor organizador habitual. **← Back to drawer** vuelve a su colocación. **Add saved organizer** añade una copia independiente de un proyecto o variante guardado; editar nunca cambia su fuente.

Arrastre bandejas en la vista superior o introduzca coordenadas X/Y medida desde la esquina superior izquierda hasta los límites exteriores de la bandeja. Rote por 90 grados, duplicar o eliminar bandejas. Las teclas de flecha mueven una bandeja enfocada por 1 mm (Shift: 10 mm). Arrangement undo/redo restaura las colocaciones y edita la bandeja completada.

El diagrama muestra rectángulos de unión exterior ensamblados, incluyendo carcasas, bordes, tapas y tigres. Las formas curvadas se verifican conservadoramente en lugar de anidar firmemente. Se destacan los conflictos de límites, limpieza y altura. Espere el control de geometría antes de confiar en el estado de ajuste. Elija la colocación gratuita o active una placa de montaje como se describe a continuación.

Los cajones guardan localmente en este navegador, por separado de los proyectos organizadores. Descargar un cajón Archivo JSON para copia de seguridad o transferencia; abrir uno crea una copia de cajón separada. Seleccione una bandeja y seleccione **Download selected tray** para su propia exportación STL, 3MF o OBJ con los controles de tamaño de impresora existentes.

<a id="mounting-plates"></a>
### Placas de montaje

In **Drawer → Drawer base**, elegir **Mounting plate**. Longitud del drenaje / ancho y la limpieza de la pared determinan el área cubierta. Introduzca el ancho y la profundidad utilizables del **cama de impresora 3D** por separado: estas dimensiones determinan el tamaño máximo de la sección y por lo tanto el número de secciones. El cálculo incluye proyecciones conjuntas y un margen de impresión de 2 mm en cada borde de la base de impresión. Las dimensiones no necesitan ser múltiples de la rejilla de 20 mm; las secciones del borde encajan en el espacio restante.

**Download sections (ZIP)** crea un 3MF numerado por impresión, un plano de montaje SVG y una lista de coordenadas. El plano conserva la orientación original del cajón, independientemente de la vista: R indica filas de arriba abajo y C columnas de izquierda a derecha. Encaje las uniones de cola de milano desde arriba. Imprima primero **Download joint sample**, con dos pequeñas secciones contiguas, y compruebe el ajuste. Las uniones usan una separación de 0,05 mm y una tolerancia de perfil de 0,03 mm. Entre las secciones sin montar los organizadores puede quedar una junta fina y un pequeño juego.

Con el modo de placa activado, las descargas de bandeja incluyen tomas inferiores para la posición y rotación de la bandeja. Se conservan las dimensiones del compartimento interno. La bandeja se convierte en 2.1 mm más alta; incluyendo la placa de 2 mm, el cajón de ajuste añade 4.1 mm. Después de mover o girar una bandeja, descargue de nuevo: sus tomas deben coincidir con las posiciones del peg.

La limpieza radial de Socket es de 0.12 mm. Imprima un pequeño organizador que abarca dos secciones para comprobar que se ajustan a su configuración de material y capa. Las tomas retienen el organizador lateralmente; levantarlo hacia arriba para eliminarlo. Exportar utiliza geometría solamente: elegir su impresora y perfiles de material en el laminador e inspeccionar los techos de socket antes de imprimir.

La fijación admite actualmente organizadores sin dividir ni inclinar, con al menos tres alojamientos totalmente apoyados. Las bandejas pequeñas pueden necesitar moverse o ampliarse. Los niveles superiores y las carcasas conservan su geometría. Desactive el modo de placa para exportar el modelo original sin fijaciones. Los proyectos de origen guardados no cambian.

<a id="custom-svg-relief"></a>
## Relieve SVG personalizado

Bajo **Forma → Relieve organizador → My SVGs**, elegir **Upload SVG** o soltar un archivo en el área de carga. Seleccione una miniatura guardada para reutilizarlo. La misma biblioteca está disponible bajo **Forma → Tapa → My SVGs** y **Carcasa → Pattern → My SVGs**. Cada objetivo mantiene su propio patrón y configuración de colocación.

Elija **Single motif** o **Repeat**, seleccionar las paredes exteriores, y ajustar la anchura del motivo en milímetros, rotación, offset horizontal/vertical, y la brecha de repetición. La anchura y la altura mantienen las proporciones originales. La colocación se centra en cada lado seleccionado; en los cuerpos curvados los lados corresponden a cuatro sectores exteriores. El offset vertical positivo mueve el motivo hacia arriba. El patrón sigue el contorno exterior. Las repeticiones se colocan sólo donde un motivo completo se ajusta por debajo del borde superior, alrededor de los recortes y dentro de cada lado. Los motivos individuales se cortan en estos límites. La profundidad de las actividades de relieve utiliza los recursos existentes **Profundidad de alivio / Intensidad** control. La pared original y los compartimentos internos se conservan; las dimensiones externas aumentan. Espere hasta que la vista previa actualizada termine, luego compruebe y descargue la parte.

Los SVG soportados contienen caminos llenos, polígonos, rectángulos, círculos o elipses, incluyendo agujeros y transformados de grupo. Convertir texto y trazos en caminos llenos antes de exportar desde su editor vectorial. Fotos, referencias externas, filtros, máscaras, caminos de recortado, gradientes, bloques de estilo CSS y referencias a elementos reutilizables ( `use` ) no son compatibles. Se ignoran las definiciones vacías o no utilizadas que contienen formas soportadas. Los colores se convierten en una sola forma elevada usando el color organizador. Los límites son 200 KB, 512 elementos XML, 128 formas llenas y 6.000 puntos de contorno muestreados; patrones excesivamente complejos o repeticiones excesivas se rechazan con un mensaje. Las curvas son aproximadas por contornos poligonales para imprimir.

Los SVG se procesan localmente en el navegador. La biblioteca permanece en este dispositivo. Cada proyecto incrusta una copia independiente de sus contornos usados, por lo que los proyectos descargados se pueden reabrir en otro dispositivo sin la fuente SVG o biblioteca. Eliminar una entrada de la biblioteca deja los proyectos existentes sin cambios. **Estilo común** también lleva patrones personalizados de cuerpo, tapa y carcasa a otro organizador.

<a id="choose-an-svg-for-its-intended-use"></a>
### Elegir un SVG adecuado para su uso

Un SVG es un formato de dibujo, no una garantía de geometría imprimible. **El éxito de la importación sólo significa que se leyeron los esbozos completos apoyados.** El modo de superficie, tamaño y aplicación elegido todavía necesita pasar el control de geometría.

| Uso previsto | Lo que las áreas llenas se convierten | Qué preparar |
| --- | --- | --- |
| Socorro organizador | Material elevado unido a una pared sólida | Los motivos separados y los agujeros interiores pueden funcionar porque la pared los apoya. |
| Patrón de tapas elevado | Material elevado en un soporte sólido | Se admiten agujeros interiores; mantenga todo el dibujo dentro del marco disponible y despeje el aterrizaje de la manija. |
| Lid a través de las aberturas | Material retirado de la tapa | Cada pieza restante debe conectarse a la tapa circundante. Los detalles internos cerrados necesitan puentes de plantilla. |
| Concha batida o paneles decorativos | Aperturas cortadas a través de la cubierta | Usar un dibujo compatible con plantillas. El marco y el patrón restantes deben formar material conectado. |

Para preparar un archivo:

1. Conserve los trazados rellenos y las formas básicas que necesite. Convierta el texto y **los trazos en contornos rellenos** en el editor vectorial. Una línea con `fill="none"` es un trazo, no una superficie rellena.
2. Elimine los rectángulos de fondo salvo que quiera convertir toda esa superficie en relieve o abertura. Los colores SVG no separan materiales; las figuras blancas no recortan automáticamente las oscuras que tienen debajo.
3. Revise los trazados compuestos. Un comentario que diga «agujero» no crea uno: el sentido de los trazados y `fill-rule` determinan el relleno.
4. Para aberturas pasantes, una los detalles encerrados al material circundante mediante puentes. Aumentar la separación entre repeticiones **no** sujeta un detalle aislado dentro del motivo. Como alternativa, use relieve en la tapa.
5. Para repetir, conviene un archivo con un solo motivo. Si ya contiene una cuadrícula, la anchura escala **toda la cuadrícula**, no cada motivo por separado. Los detalles pequeños pueden quedar demasiado finos.
6. Espere a que terminen correctamente el cálculo y la comprobación de exportación; después revise el modelo en el laminador. Si falla el cálculo, puede seguir visible la última vista previa válida, que no representa los ajustes actuales fallidos.

Una silueta de hoja rellena puede servir como relieve o como abertura. Una nervadura completamente encerrada queda sujeta al fondo en modo relieve, pero puede quedar suelta al recortar la hoja que la rodea. Una cuadrícula hexagonal sirve para perforar si los puentes de material permanecen unidos y tienen suficiente grosor. Un dibujo multicolor hecho con trazos debe convertirse primero en contornos rellenos.

<a id="svg-lids-and-perforated-shells"></a>
### Tapas SVG y carcasas perforadas

Añadir una tapa, luego elegir **My SVGs**. **Raised relief (decoration)** hace una sola tapa conectada con el motivo en un soporte sólido; establecer su altura de relieve (0.2-1 mm) y el color base. **Through stencil (cut)** elimina las áreas SVG llenas a través de la tapa. Ambos modos conservan un marco de borde de 2 mm y el labio sólido.

Para una carcasa, seleccione **My SVGs**, luego un dibujo de biblioteca. Las áreas llenas se convierten a través de aberturas. Utilice un motivo o repeticiones en los lados seleccionados de una manga envuelta. En **Paneles decorativos**, el dibujo se repite independientemente en cada panel seleccionado; los marcos existentes y las ubicaciones de montaje se conservan. El tamaño del motivo inicial toma en cuenta la altura de la carcasa.

En tapas y carcasas, sólo se colocan motivos completos dentro del marco disponible, incluyendo motivos individuales. Si no cabe, reducir el tamaño o offset. Los detalles interiores cerrados (por ejemplo el centro de un corte en forma de anillo) pueden llegar a ser islas sueltas. Añadir puentes en su editor vectorial o usar la decoración elevada en la tapa. La aplicación bloquea la geometría desconectada en lugar de piezas desechadoras silencios.

Los patrones están incluidos en las exportaciones individuales, los kits completos y los trabajos de impresión completos. Cambiar de nuevo a **Built-in** elimina el patrón personalizado sólo de ese objetivo. Eliminar una miniatura de la biblioteca no elimina los patrones embebidos de los proyectos.

<a id="download-ready-to-use-stencil-svgs"></a>
### Descargar plantillas SVG listas para usar

Estos ejemplos contienen contornos rellenos con puentes de material. Las zonas negras se convierten en aberturas en modo **Through stencil (cut)**. Guarde los archivos de los enlaces siguientes con la extensión `.svg`. Si el navegador muestra el dibujo, use su opción para guardar la página y conserve la extensión.

| Descargar | Patrón | Ancho de inicio sugerido |
| --- | --- | --- |
| [Hojas orgánicas — descarga SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinco hojas con puentes que conectan los detalles interiores | 20 mm; reducir para una carcasa baja |
| [Hexagon doble — descarga SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Una baldosa de doble hexágono con cuatro puentes y una apertura central | 20–24 mm; use **Repeat** para una cuadrícula |

**En una tapa:** añadir una tapa debajo **Forma → Tapa**, abierto **My SVGs**, y subir cualquier archivo. Elija **Through stencil (cut)**. Empieza con **Single motif** para inspeccionarlo, o seleccionar **Repeat** para llenar el área disponible con copias completas. Set ancho, rotación y X/Y offsets. Repita el espaciado es la brecha entre copias completas, no la anchura de sus puentes internos. Comience con espaciamiento de 4 mm. El archivo de hoja ya es un grupo de cinco hojas: ancho escala todo el grupo.

**En una carcasa:** abra **Carcasa** → **Pattern** → **My SVGs**, o la pestaña **Carcasa** del estudio, y seleccione el archivo de la biblioteca compartida. Las carcasas solo admiten aberturas pasantes. **Repeat** repite el motivo alrededor de la carcasa; **Adicional** → **SVG walls** selecciona las caras de una carcasa envolvente. Los paneles decorativos usan las caras de panel seleccionadas. Cada superficie conserva sus propios ajustes de posición y grosor. Al cambiar de pestaña se muestra la pieza correspondiente.

Si un motivo no cabe, reduzca su ancho o offset. En una carcasa baja, prueba 12–16 mm para el grupo de hoja. El aumento del espesor de la carcasa puede ampliar su frontera automática y dejar menos espacio para el dibujo. Escalar hacia abajo también estrecha los puentes: inspeccionarlos en su laminador e imprimir una pequeña muestra para su boquilla y material. Repita el espaciado no puede ensanchar puentes internos. Esperar la vista previa actual para terminar, luego utilizar **↓ Descargar** para comprobar y exportar la tapa o la carcasa.

<a id="numeric-sliders-and-valid-ranges"></a>
### Deslizadores numéricos y rangos válidos

Los ajustes numéricos muestran **Min** y **Max** por encima de una fina pista verde, con un marcador blanco para el valor actual. Las tapas de extremo rojo marcan el exterior del intervalo permitido; no son una calificación de fuerza de impresión. Arrastre el marcador, utilice las teclas de flecha mientras se centra, o escriba un número exacto y pulse Enter. El campo numérico y deslizante utilizan los mismos límites.

<a id="whole-drawer-export"></a>
## Exportar todo el cajón

Elija **Drawer → Print entire drawer** para preparar todas las bandejas, sus accesorios y cualquier sección de placas de montaje habilitadas. Bandejas montadas reciben tomas para sus posiciones guardadas; bandejas de colocación libre ordinarias mantienen sus bases existentes. Los proyectos de impresión dividida incluyen sus piezas y pasadores. Superposiciones, limpiezas insuficientes de cajones, montaje sin soporte o geometría inválida bloquean la descarga e identifican la bandeja afectada.

Set **Printer bed length** (horizontal), **Printer bed width** (vertical), altura de impresión y espaciamiento. Las dimensiones iniciales proceden de la configuración de la placa de montaje o del área de impresión de la primera bandeja; se guardan los ajustes de exportación subsiguientes con este cajón. Las secciones de la placa de montaje se regeneran para la base de impresión elegida.

La distribución usa las dimensiones exteriores reales de las piezas exportadas, un margen de 2 mm en los bordes de la base y la separación elegida. Las piezas pueden girar 90°; los componentes de una tapa multicolor permanecen juntos. El número de bases mostrado corresponde a esta distribución y no garantiza el mínimo posible. No se incluyen soportes, bordes de adhesión (brim), torres de purga, zonas excluidas de la impresora ni trabajos separados por material. Reserve espacio para ellos y compruebe el resultado en el laminador. No se incorporan perfiles de impresora ni asignaciones de filamentos.

El ZIP contiene **bed-NN.3mf** para cada base de impresión, emparejado **bed-NN.svg** diagramas, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** y una lista de partes numeradas en **README.txt**. Abre cada uno 3MF como un trabajo de impresión independiente, mantener las posiciones relativas de sus objetos, utilizar milímetros a escala 100% y asignar filamentos. El SVG diagramas que muestran los rectángulos ligados; los 3MF contiene toda la geometría imprimible. Las coordenadas de montaje del drenaje siempre usan longitud horizontal y ancho verticalmente.

Los cambios en la configuración de distribución o exportación invalidan el cálculo anterior. Cierre de la ventana cancela la preparación. Se reportan piezas individuales de tamaño superior en lugar de escalar silenciosamente o dividir automáticamente.

<a id="pattern-studio"></a>
### Estudio de patrones

Elija **Raised relief (decoration)** para relieve o **Through stencil (cut)** para aberturas pasantes. Las carcasas solo admiten aberturas. La altura se muestra solo en relieve y la separación solo en repetición. **Material thickness** cambia la vista previa y la exportación: 1,2–6 mm para una tapa SVG y 1–4 mm para una carcasa. Los valores predeterminados son 3,2 mm para relieve y 2 mm para plantilla; el grosor elegido se conserva al cambiar de modo. La altura del relieve está incluida en el grosor. Una tapa SVG encajada requiere una profundidad interior mínima igual al grosor de la placa más 2 mm. **Adicional** contiene el color de la tapa o las caras de la carcasa. **Which SVG files work?** explica los requisitos y la preparación.

Abra **Forma** → **Tapa** → **My SVGs** o **Carcasa** → **Pattern** → **My SVGs**. Las pestañas **Tapa** y **Carcasa** comparten biblioteca, pero guardan ajustes independientes. Cambiar de pestaña muestra esa pieza por separado; si aún no existe, permanece visible el conjunto. Puede volver a la vista conjunta sobre el modelo. Anchura, giro, separación y X/Y colocan el motivo; el botón de centrado restablece posición y giro. La tapa admite relieve y aberturas; la carcasa, solo aberturas. Se conservan marcos y zonas de fijación. **×** o **Escape** cierra el estudio activo sin perder los cambios. Las flechas del teclado cambian la pestaña enfocada.
