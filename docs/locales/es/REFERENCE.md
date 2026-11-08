<a id="replixgrid-user-guide"></a>
# Guía del usuario de ReplixGrid

Diseñe un organizador en milímetros, compruebe su ajuste y descargue las partes para su cortador. Para una primera construcción, siga el ejemplo de cápsula ilustrada. Utilice esta referencia cuando desea cambiar una parte particular de su diseño.

[Abrir ReplixGrid](https://grid.replixcast.com/?lang=es) [Inicio rápido](USER-GUIDE.md) · [Instalación local](../../../README.md#local-installation)

| Quiero... | Ve. |
| --- | --- |
| Seleccione una pared, gire el modelo o deshacer un cambio | [Área de trabajo y vistas](#workspace-and-views) |
| Elige una forma, cambia las dimensiones o inclina las paredes hacia adelante | [Forma y dimensiones](#shape-and-dimensions) |
| Fitar un objeto en un compartimiento o mover un separador | [Compartimentos y separadores](#compartments-and-dividers) |
| Baja una pared, forma su borde o corta un dedo abriendo | [Altura de paredes y recortes](#wall-heights-and-cutouts) |
| Suavizar un borde, agregar textura o poner un nombre en el cuerpo | [Esquinas, bordes y decoración](#corners-edges-and-decoration) |
| Añadir una taza extraíble, apilar bandejas o caber una tapa | [Insertos, niveles y tapas](#inserts-tiers-and-lids) |
| Imprimir una cubierta decorativa para el exterior | [Carcasas enteras y paneles](#sleeves-and-panels) |
| Reabrir un diseño o moverlo a otro ordenador | [Proyectos y copias de seguridad](#projects-and-backups) |
| Elija una impresora, dividir un modelo grande o asignar filamento | [Configuración de impresión y división en partes](#print-setup-and-sectioning) · [Descarga y preparación en el laminador](#download-and-slice) |
| Mantener diseños alternativos o reutilizar colores y patrones | [Variantes de proyecto](#project-variants) [Estilos compartidos](#shared-styles) |
| Organizar organizadores en un cajón medido o fijarlos en un plato | [Distribución de organizadores en cajones](#drawer-arrangements) [Placas de montaje](#mounting-plates) |
| Importar obras de arte para paredes, tapas o una cáscara perforada | [Relieve SVG personalizado](#custom-svg-relief) [Estudio de patrones](#pattern-studio) |
| Descargue todas las piezas del cajón dispuestas para la impresora | [Exportar todo el cajón](#whole-drawer-export) |
| Desarrollar por qué un control o descarga no está disponible | [Solución de problemas](#troubleshooting) |

<a id="start-a-new-project"></a>
## Iniciar un nuevo proyecto

Al iniciar por primera vez, el área de trabajo está vacía. La guía de la izquierda tiene tres pasos: **Elige una forma → Define las dimensiones → Añade compartimentos**. Elige una forma, ajusta las dimensiones y pulsa **Siguiente: compartimentos**. Termina con **Listo** o **Dejar sin separadores**. Tras elegir una forma, puedes cerrar la guía con **×**. También puedes abrir un proyecto guardado o un archivo JSON.

Vuelve a abrir la guía desde **Ayuda → Guía: tres pasos**. Abrirla no modifica el modelo. Elegir otra forma sustituye el modelo actual; puedes deshacer esa acción.

El inicio rápido, la guía del usuario y el menú de ayuda utilizan el idioma de la interfaz. El vídeo sigue en inglés.

Los pasos, consejos y confirmaciones de la guía están traducidos. La fila del modelo guardado se llama **Proyecto anterior**. Los nombres reales en **Mis proyectos** se mantienen tal como los guardaste.

Uso **Nuevo proyecto** en la barra superior para volver a este comienzo limpio. Su trabajo actual se guarda primero; un borrador sin nombre se mantiene en **Mis proyectos**. No se eliminan proyectos, variantes, ranuras de filamento y configuración de impresora. El panel muestra una miniatura etiquetada **Proyecto anterior** con **Guardado en «Mis proyectos»**; haga clic en esa fila para reabrir su biblioteca. El lienzo se limpia inmediatamente y permanece vacío hasta que elija una nueva forma, al igual que en una primera visita. Hasta que elija una nueva forma, el ahorro y la exportación están desactivados. Usted puede abrir un proyecto desde **Mis proyectos** o importar su JSON archivo. Refrescar esta pestaña de arranque vacío mantiene la pantalla de inicio; la reapertura de un proyecto existente restaura el modelo. Visitas ordinarias de retorno reanudar trabajo salvado.

Elegir **Forma → Base → Crear desde plantilla Las celdas alveolares son demasiado pequeñas para el espesor de pared.** mientras la edición todavía reemplaza la construcción dentro del proyecto actual y puede ser deshecha. Uso **Nuevo proyecto** cuando desea un modelo separado.

<a id="workspace-and-views"></a>
## Área de trabajo y vistas

Abra una herramienta en la parte superior izquierda. **Forma** cambia el cuerpo y sus accesorios. **Compartimentos** cambia el diseño. **Carcasa** diseña una cubierta exterior separada. **Impresión** establece el volumen de construcción, ranuras de filamento y cortes de sección opcionales. Haga clic en un número de compartimiento, pared o divisor en el modelo para abrir su configuración a la derecha. Si una parte es difícil de hacer clic, ampliar **Todas las paredes y compartimentos** y seleccionarlo por nombre.

El panel izquierdo es la navegación de sección. Seleccione una sección para abrir sólo su configuración en el editor centrado, flotante en la parte inferior de la vista previa. La escena y la cuadrícula continúan detrás del editor; la apertura no corta la vista previa. El editor utiliza grupos compactos; no reemplaza el menú izquierdo. Su chevron colapsa el editor y **×** lo cierra. Elija otra sección a la izquierda para cambiar la configuración.

Arrastre el fondo para girar, desplazarse hacia el zoom y arrastre con el botón derecho del ratón para el panel. **Cámara de retorno** restaura el marco de la cámara. **Superior** le ayuda a seleccionar un compartimento estrecho o mover un separador. **3D** muestra las alturas de la pared y el montaje terminado. **Grid** gira la rejilla de referencia, con líneas finas cada 10 mm y líneas principales cada 50 mm. Utilice los botones de la parte centrados por encima del modelo para aislar el organizador, insertos, cáscara o tapa cuando esté presente. **Conjunto** muestra las partes disponibles juntas para la vista actual. Para múltiples niveles, elija **Ver pila** en la caída al lado **Organizador** para mostrar toda la pila; elegir **Nivel 1**, **Nivel 2**, u otro tier para volver a ese tier. El editor de la configuración inferior se mantiene abierto. En vista de la pila, **Carcasa** y **Insertos** incluir partes de todos los niveles. En ventanas más estrechas estos botones se mueven a su propia fila debajo de las barras de herramientas. Con la tapa aislada, elija **Bottom** para inspeccionar su desventaja. Prensa **Esc** para cerrar el panel de herramientas. Utilice las flechas curvas por encima del modelo para deshacer o rehacer un cambio de diseño.

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

Elija **Flat** para un borde de nivel, **En pendiente** para un ascenso continuo, o **Escalones** para niveles de altura distintos. Las dimensiones debajo de las opciones describen la plantilla que está a punto de crear. Una vez creado, edite el modelo bajo **Dimensiones**. La anchura y la profundidad miden la huella exterior. Utilice las dimensiones internas del compartimento seleccionado al dimensionarlo para un objeto. En una base curvada, también comprobar los extremos de estrechamiento en **Superior** vista.

![cápsula inclinada con un extremo bajo para el acceso, un extremo alto para artículos largos y dos divisores transversales](../../images/capsule-sloped.jpg)

**Forma → Adicional** contiene el espesor de la pared y del fondo. Las paredes delgadas toman espacio de los compartimentos. **Inclinación sobre una base plana** inclina las paredes hacia adelante por hasta 25° mientras que el fondo permanece horizontal. Esto difiere de un borde inclinado, que cambia la altura de la pared a lo largo del cuerpo. Con la inclinación activada, utilice las dimensiones terminadas en el diálogo de descarga para comprobar el espacio que la parte impresa ocupará.

<a id="exact-internal-dimensions"></a>
## Dimensiones interiores exactas

Seleccione un compartimento y uso **Dimensiones interiores** en el panel derecho, o haga clic en su etiqueta de dimensión azul directamente en el modelo. Elija la anchura o la profundidad, introduzca milímetros y haga clic fuera del campo en línea para aplicar. Entrar también aplica; Escape cancela. El panel derecho conserva su botón de aplicación. Los valores inválidos no pueden cambiar el modelo. Cada edición comprometida puede ser deshacerse en un solo paso.

El divisor naranja es su posición actual; la línea azul desgarrada preve la nueva posición. El cierre más cercano se divide en el eje elegido se mueve, manteniendo el tamaño exterior del cuerpo y el espesor de la pared sin cambios. El panel muestra los tamaños vecinos afectados. Si no hay divisor en ese eje, ajustar las dimensiones generales o dividir el compartimento primero.

En una fila simple, empezar con el compartimento 1 y continuar en orden; el último compartimento toma el resto. Las dimensiones vecinales no están cerradas, por lo que la edición de un compartimento anterior puede cambiar el tamaño de uno más adelante.

Las esquinas redondeadas, los contornos de cápsulas, las chamferes y los filetes interiores siguen soportados. La línea azul mide el lazo interno real en la línea central del compartimento, justo encima del suelo. El espacio puede estrechar otras curvas: añadir la limpieza y comprobar la huella de todo el objeto. Circle, oval, panal y paredes inclinadas no soportan actualmente la edición exacta del compartimento.

Seleccione una pared o un divisor para editar su altura directamente en el modelo. Las paredes planas muestran un valor; los perfiles de dos puntos muestran valores A/B. Las reglas de altura y de paredes escalonadas coinciden con el panel derecho. Estas etiquetas editan altura, no longitud de la pared o espesor global.

<a id="compartments-and-dividers"></a>
## Compartimentos y separadores

Para una distribución rápida, utilice **Compartimentos → + Compartimento** para dividir el compartimento más grande. **− Compartimento** fusiona un par vecino. En un panal de miel, estos controles agregan o eliminan una célula externa y preservan el tamaño de los demás. Dos células vecinas de panal de la familia comparten una pared tan alta como la célula más alta.

Para una distribución exacta, cambie a **Superior** y seleccione el compartimento que desea dividir. Elija **Número de piezas**, luego **Dividido en ancho** para dividir el ancho en compartimentos más estrechos, o **Dividir en profundidad** para hacer más suaves. Puede dividir uno de los resultados de nuevo. Para una bahía de lápiz junto a dos pequeñas bandejas, primero dividir el ancho en dos, entonces dividir sólo el lado de bandeja en profundidad.

![Ejemplo de vista superior con una bahía de profundidad completa y dos compartimentos más pequeños](../../images/compartment-splits.svg)

Seleccione el separador para arrastrarlo, o ajustar **Primer compartimento** bajo **Posición de partición**. Sólo el separador seleccionado se mueve; otras posiciones de divider permanecen fijas. Los compartimentos adyacentes cambian de tamaño. Los movimientos que dejan demasiado poco espacio son rechazados. Compruebe las nuevas dimensiones internas de cada lado. **Eliminar partición** combina los compartimentos y también puede eliminar los separadores anidad dentro de esa división.

<a id="wall-heights-and-cutouts"></a>
## Altura de paredes y recortes

Seleccione una pared exterior o un separador. **Una altura** establece una parte superior del nivel. **Dos puntos** le permiten fijar las alturas en los extremos **A** y **B**, que están marcados en el modelo. Elija **Directo**, **Ondulado** o **Zigzag** para configurar el borde a lo largo de la pared. Wavelength controla la distancia entre las repeticiones.

Usar **Conectar las alturas de paredes adyacentes.** para hacer una pared exterior seguir a sus vecinos. Para un separador, **Ajustar a paredes adyacentes** copia las dos alturas finales una vez. Repita el ajuste después de cambiar las paredes vecinas. **Como los otros** devuelve la pared seleccionada a la altura común.

Abrir **Recorte de pared** para hacer una apertura de acceso. Elija una cuchara suave, semicírculo o abertura rectangular, establecer el ancho y la profundidad, luego moverlo a lo largo de la pared. Posición corre desde el extremo A a B. La profundidad se mide desde el borde superior. Inspeccione el labio restante por encima del suelo. Elija **Sin recorte** para llenar la abertura.

<a id="corners-edges-and-decoration"></a>
## Esquinas, bordes y decoración

Abrir **Forma → Esquinas y chaflanes**. Tres controles afectan diferentes partes de la impresión.

| Control | Donde mirar | Lo que cambia |
| --- | --- | --- |
| esquinas externas | Vista superior, contorno exterior | Redondear las esquinas de la huella o cortarlas a 45°. Cero da una esquina cuadrada. Disponible en la familia rectangular de bases. |
| Compartimentos interiores radiales | Vista superior, dentro de una bahía | Redondea la unión vertical donde se encuentran dos paredes. Las bahías de la vista limitan el radio disponible. |
| borde superior de las paredes y divisores | Seccionamiento transversal a través de una pared | **Chaflán** corta una bisagra plana y **Redondeado** curva el labio. Ambos lados de las paredes exteriores y los separadores reciben el acabado. **Ninguno** restaura el labio cuadrado. |

![Las secciones transversales de la pared que muestran esquinas superiores cuadradas, acariciadas y redondeadas con el mismo espesor de la pared](../../images/top-edge-profiles.svg)

Por ejemplo, en una pared de 2 mm prueba un chamfer de 0,5 mm. Cada lado pierde 0,5 mm en la parte superior, dejando una tira plana de 1 mm. El tamaño máximo mostrado depende del espesor de la pared. Con **Redondeado**, el valor es el radio en milímetros.

- **Color del organizador** cambia la vista previa y las exportaciones de color. Elija un swatch, un color personalizado o un color de filamento configurado. Asignar la ranura de filamento real en la exportación.
- **Borde inferior** añade una banda de proyección alrededor de la base. Elija el corte liso, rayado o pisado y fijar su altura. Una manga compatible puede descansar en ella. Trim requiere un cuerpo de una pieza fija y está disponible en el primer nivel. Los paneles separados se sientan por encima de ella con el borde seleccionado.
- **Relieve organizador** añade un patrón elevado directamente a la pared exterior. Desplaza el catálogo de patrones, establece el tamaño del patrón y la altura del relieve, y observa la actualización del modelo durante el arrastre mientras cada cálculo termina. El valor final utiliza la precisión completa. El interior se mantiene suave. Las proyecciones aumentan las dimensiones externas. Elija **Suave** para eliminar el alivio.
- **Firma y credencial** pone letras o un símbolo en un lado seleccionado. Introduzca el texto, elija una fuente, fije la altura de la letra y la posición vertical, luego elija la letra elevada o el grabado y establezca su altura o profundidad. Una estrella o corazón pueden acompañar el texto. En organizadores circulares y ovalados, texto e iconos siguen la pared curvada, incluso en STL y 3MF exportaciones. El espaciado de cartas se mide a lo largo de la superficie. Elija Frontal, Rear, Izquierda o Derecha para centrar la inscripción en ese lado. En círculos y ovalados con alturas de pared enlazadas o variables, las letras se quedan por debajo del perfil de pared más bajo y el corte. La carta de Honeycomb todavía no está soportada; los proyectiles que cubren el lado elegido y el alivio también pueden prevenir el envío de cartas. Las letras de paredes planas todavía requieren un perfil de altura constante. Si la inscripción se ejecuta en un corte o excede la cara disponible, baja la posición o reduce el tamaño de la letra.

<a id="inserts-tiers-and-lids"></a>
## Insertos, niveles y tapas

**Inserciones extraíbles.** Seleccione un compartimento, luego amplíe **Inserto de bahía** a la derecha. **Vacío** hace una taza abierta. **Para pequeñas cosas** añade una cuadrícula con filas y columnas ajustables. **Para manijas** crea tomas para bolígrafos o herramientas. Establece el diámetro interior de la toma y la aplicación se ajusta tanto como la inserción permite. Elija un contorno ajustado, redondeado, circular, oval o hexagonal y un color. **Quitar inserción** despeja esa bahía. Una taza vacía sigue siendo una parte imprimible.

El inserto sigue su compartimento con por lo menos 0,5 mm. Sus paredes y fondo son de 1,2 mm de espesor y su altura se ajusta para terminar aproximadamente 1 mm debajo del borde. Un inserto en un organizador inclinado sale a lo largo de la pendiente. Isolate **Insertos** para inspeccionarlos, luego exportar **Organizador y accesorios**. Los insertos requieren una impresión de una sola pieza.

**Bandejas apiladas.** Comience con un borde de nivel, luego abra **Forma → Niveles → + Nivel**. Usted puede utilizar de dos a cinco niveles; **− Nivel** quita un tier. Los niveles comparten una huella pero pueden tener diferentes compartimentos, alturas, colores y decoración.

1. En el desplegable junto a **Organizador** sobre el modelo, elija **Nivel 1**, **Nivel 2**, u otro nivel. Ese nivel se muestra por sí solo, y el editor de configuración actual permanece abierto.
2. Editar el tier seleccionado con los controles de forma, compartimento, relieve y cáscara habituales. Cambiar el tier no copia su configuración a otros niveles.
3. Elija **Ver pila** en el mismo desplegable para inspeccionar todos los niveles y accesorios juntos. Use **Conjunto**, **Organizador**, **Insertos**, **Carcasa** o **Tapa** para mostrar las partes que necesita. Regrese a un nivel numerado para continuar editándolo.
4. Bajo **Forma → Niveles**, ajustar **Holgura de ajuste** e imprimir una pequeña muestra de ajuste antes de comprometerse a la pila completa. Divisores inferiores que están por encima del borde. El apilamiento requiere paredes verticales y un borde de soporte continuo.

El relieve integrado y SVG decoran el exterior de cada tier mientras que los collares de apareamiento, las lenguas y las tomas se mantienen suaves. Las cáscaras rotas y los paneles decorativos pueden cubrir los revestimientos individuales. Para los paneles, mantenga **Desplazamiento de borde** al menos 3 mm por lo que limpian los collares de apareamiento.

Con una cáscara envuelta, una lengua dentro de la pared inferior encaja en una toma debajo del suelo de la bandeja superior. Los anchos, profundidades y alturas utilizables permanecen inalterables; cada toma añade 2.2 mm a la altura exterior de la pila montada. Las cáscaras coincidentes se encuentran en una banda estrecha de soporte de 0.8 mm. Las cáscaras se deslizan desde arriba; separan los tigres antes de eliminarlas.

**Borde inferior** está disponible en el primer nivel (oeste) sólo: elegir liso, anillos o pasos. Con una cáscara envuelta compatible, el borde también soporta la cáscara. Los paneles separados se sientan por encima del borde seleccionado con el offset. Nuevos niveles superiores no heredan el borde. Si la lengua no puede caber en el espesor de la pared, reducir **Holgura de ajuste**; la aplicación no engrosa la pared automáticamente.

**Lid.** In **Forma → Tapa**, haga clic **+ Portada**. Use un borde superior de nivel con alturas de pared y divisores externos iguales en o debajo de él. Tilt, panal de miel e impresión seccional evitan este ajuste. Elija **Exterior** para una gorra exterior o **Encajada** para una placa de 2 mm que se sienta en el interior de la bandeja. La opción de entrada corta un asiento en la pared superior con una limpieza de 0,35 mm en cada lado y deja espacio por encima de los separadores e insertos. Necesita al menos 2 mm de espesor de pared y 4 mm de profundidad interior. Agregue un corte de pared o un mango para levantarlo. La tapa superpuesta tiene un borde de localización con desmontaje de 0,5 mm. Elija su patrón superior, escala y profundidad, a continuación, establecer la altura del borde y terminar. Para un mango, elija cilíndrico o bar, establecer su tamaño y altura, y opcionalmente chamfer o redondear sus bordes. El mango se imprime por separado y pegamento a la tapa. La vista previa eleva la tapa superpuesta y muestra la tapa de entrada sentado. La tapa exportada es plana para imprimir.

**Patrón de dos tonos.** Hágalo en forma de tapa, luego elija rama de Oliva, hojas de Ginkgo, Fern frond, olas de marea, rocallas de río Anillos de crecimiento o células de Voronoi. Elija un color base y un color de patrón. La placa de 3,2 mm tiene un respaldo sólido de 1,6 mm y una cara de patrón de 1,6 mm. El borde de localización exterior y el mango opcional añaden a la altura general. Para una tapa de entrada, permite al menos 5,2 mm de profundidad interior. Exportación en 3MF para mantener ambos colores juntos como una tapa, y asignar las dos partes a sus ranuras de filamento. Para la rama de Oliva, hojas de Ginkgo, Fern frond, olas de marea y anillos de crecimiento, **Patrón calado** hace que el motivo fuera de las aberturas en una hoja superior continua. Combinelo con **Patrón en relieve** para exponer el respaldo retrocedido a través de las aberturas. Habilitación **Patrón en relieve** para dejar las aberturas en la parte superior 1,6 mm vacías. Desactivarlo para una incrustación suave. Las tapas fijas elevadas imprimen el respaldo primero; tapas superpuestas imprimen la cara de patrón hacia abajo. Revise el puente sobre los recesos en el rebanado.

![Seis patrones de tapa de dos toneladas](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Carcasas enteras y paneles

Abrir **Carcasa** y elegir un patrón. Una cáscara se imprime por separado del organizador. Si desea el patrón en el propio cuerpo, utilice **Forma → Relieve organizador**.

| Modo de Shell | Fito y montaje |
| --- | --- |
| **Alrededor del cuerpo** | Una manga sin fondo sigue el perímetro y las alturas de la pared. Diríjala sobre el cuerpo desde arriba, siguiendo la dirección de la pared en un modelo inclinado. El panel indica si una cornisa de soporte está presente o la manga descansa sobre la mesa. |
| **Paneles decorativos** | Los paneles enmarcados separados cubren los lados seleccionados y dejan las esquinas expuestas. Elija los lados y ajuste **Desplazamiento de borde**. Paneles de color sin sujeción. Con pins ocultos, presione cada panel directamente sobre su pared de juego para un apego permanente. |

![Vistas superiores de una manga envolviendo las esquinas y paneles separados que terminan antes de cada esquina](../../images/shell-fit.svg)

Elija el patrón, establecer su tamaño y conjunto **Espesor de la carcasa**. Para una manga de una sola pieza, ajuste **Ancho del borde** por su marco sólido. Paneles decorativos tienen un marco fijo; uso **Desplazamiento de borde** para colocarlos en la pared. Under **Aterrizaje**, **Espacio libre en cada lado** establece la brecha entre la manga y el organizador. Una brecha de 0,5 mm en cada lado añade 1 mm a través de dos lados opuestos antes de contar el espesor de la cáscara. Compare **Conjunto** con el aislado **Carcasa** ver para juzgar el resultado. **Descargar shell** exporta la cubierta por separado, y **Quitar caparazón** lo quita del diseño.

Los paneles requieren una base rectangular compatible. Cambiar a paneles conserva el espesor de la pared y el espacio de compartimiento. Enchufes de montaje ocultos requieren paredes de por lo menos 3,2 mm de espesor sin relieve. Para paredes más finas, incluyendo 2.4 mm, use paneles sin sujetadores y pegarlos en su lugar. El espesor de la pared nunca se eleva automáticamente. El borde del panel controla el margen en la cara, mientras que la limpieza de la manga controla el ajuste deslizante. Con el borde inferior, el offset inferior comienza en la parte superior del borde; los sujetadores de panel y las tomas siguen el mismo perfil. Los niveles requieren al menos 3 mm de borde offset para limpiar sus collares de apareamiento.

<a id="projects-and-backups"></a>
## Proyectos y copias de seguridad

Utilizar **Mis proyectos → Guardar una copia** para nombrar un diseño o hacer una variante antes de experimentar. El proyecto abierto se guarda automáticamente en este navegador. La biblioteca le permite buscar, abrir, renombrar, eliminar o descargar un proyecto. **Guardar proyecto** en la barra superior descarga una copia de seguridad JSON editable. Use **Abrir** para cargar ese archivo, incluso en otra computadora o en una instalación local.

Las ediciones comprometidas se guardan inmediatamente. Una copia de recuperación local temporal protege los cambios mientras la base de datos del navegador está guardando; la reapertura restaura esa copia si se interrumpió un escrito. Una instantánea separada de último éxito puede recuperar una sesión actual dañada, incluyendo la historia del deshacer. Si no se puede restaurar una copia válida, se detiene el ahorro automático en lugar de reemplazar el proyecto almacenado con un modelo de arranque.

Los cheques de exportación pertenecen a la revisión actual del proyecto, las piezas seleccionadas y la posición de montaje. Cambiar estos invalida el cheque anterior; un resultado viejo no se puede descargar como el nuevo modelo. Los cálculos fallidos conservan las ediciones. Una vista previa fija reporta un error después de dos minutos; la próxima edición de geometría comienza un nuevo cálculo.

Cuando el mismo proyecto o cajón se edita en varias pestañas, los cambios conflictivos se guardan como un **Copy from another tab**. La otra versión se mantiene, y la pestaña de edición continúa con su copia. Compare las versiones en **Mis proyectos** o el selector del cajón y renombre la copia si desea mantenerla. Reabrir una pestaña organizador restaura su propio proyecto guardado.

Mantenga una copia de seguridad descargada antes de limpiar los datos del navegador. Cada navegador y la dirección del sitio tiene su propia biblioteca. Las ranuras de Filament se almacenan por separado para la impresora en el navegador. Configurarla de nuevo cuando se mueve a otro dispositivo. Para la aplicación local descargable, vea [Instalación local](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Configuración de impresión y división en partes

Bajo **Impresión**, seleccione la configuración de la impresora y la cabeza o elija **Tamaño personalizado**. Compruebe la anchura, la profundidad y la altura de la construcción. El preset proporciona el volumen de la construcción. Elija la impresora, la boquilla, el material y los perfiles de corte en su rebanado.

Para un modelo que exceda la cama, utilice los cortes sugeridos o elija dos o tres secciones cuando esté disponible. Lea las posiciones de costura propuestas y el uso **Separar las piezas** para ver cómo se reúnen las secciones. La división aumenta el espesor de la pared al menos 5 mm y el espesor del suelo al menos 3 mm. Revise las dimensiones internas. Retire las cáscaras e inserciones antes de dividir. Las bandejas apiladas, los modelos inclinados y el círculo, las bases ovaladas y de panal requieren una impresión de una sola pieza. **Devolver modelo sólido** apaga la sección. Revise el espesor de nuevo si desea restaurar dimensiones anteriores.

**Muestra conjunta** descarga los extremos de apareamiento para probar a la misma escala e imprimir ajustes como el cuerpo final. Ponlos separados con sus bases abajo. Después del enfriamiento, los pines nominales Ø 3.2 × 8 mm encajan en agujeros Ø 3.3 mm, 4.5 mm de profundidad en cada lado de la costura. Revise la alineación, luego use pins y pegamento para montar las secciones impresas. Uso **Descargar todas las piezas** para el organizador de sección en sí mismo.

<a id="download-and-slice"></a>
## Descarga y preparación en el laminador

1. In **Impresión**, configure las ranuras de filamento si desea un archivo multicolor. Coincide números de ranura y colores a su rebanada. En una Snapmaker U1, ranuras 1–4 corresponden a T0 – T3. Añadir hasta 16 ranuras, establecer cada color y opcionalmente nombrar su material. El color es una guía visual aproximada, no una simulación de un tono impreso o mixto. Configurar los colores exactos y mezclar en tu rebanado. Seleccione cualquier tarjeta de filamento y elija **Eliminar el filamento de la ranura N** para quitarlo. Los números de ranura restantes no cambian: eliminar ranura 6 hojas ranura 7 como ranura 7. **+ Ranura N** añade el menor número disponible de nuevo; el límite se mantiene a los 16. Eliminar un filamento no cambia el color del modelo. Las ranuras eliminadas ya no se ofrecen o coinciden automáticamente en la exportación; elegir otra ranura explícitamente o asignarlo en el rebanado. Colores distintos permiten que la aplicación coincida con los colores de parte a ranuras automáticamente. Si dos ranuras comparten un color, elija la ranura deseada para cada parte en el diálogo de descarga.
2. Click **↓ Descargar**. Elija **Organizador y accesorios**, **Sólo carcasa** or **Todo el conjunto**, según qué partes necesita. Para un modelo de sección, exporte el kit.
3. Seleccione un formato a continuación. Para 3MF, asigne una ranura de filamento a cada parte o déjelo para la asignación en el rebanado. Orca puede utilizar el primer filamento para piezas no firmadas.
4. Espere por la geometría y los controles de tamaño. Lea las dimensiones de cada parte y cualquier instrucción para girarla 90° en la cama. El cheque se reserva 2 mm en los bordes de la cama. Descargue con el botón de formato en la parte inferior del diálogo.
5. Abra el resultado en su rebanador a escala **100% escala en milímetros**. Arregle el conjunto completo, compruebe los overhangs y los detalles delgados, y prevea la primera capa y separadores. Para una impresión multicolor, verifique la asignación de filamento de cada parte antes de cortar.

| Formato | Elija para | Qué hacer con la descarga |
| --- | --- | --- |
| STL | Geometría para una impresión de un solo color | Abra el STL en el rebanado. Extraiga el ZIP primero si la exportación contiene varios STLs. |
| 3MF | Un kit con partes separadas, colores y asignaciones de filamentos | Abralo en su rebanada y verifique las piezas y ranuras. ReplixLas hojas imprenta y los perfiles de material a la rebanada. |
| OBJ + MTL | Un modelo de color para una herramienta que acepta OBJ | Mantén la geometría y el archivo de material juntos. El modelo utiliza milímetros con Z up. |
| Project JSON | Continuando con la edición de compartimentos, dimensiones o accesorios | Usar **Guardar proyecto** y reabrirlo con **Abrir** en ReplixGrid. |


Para que coincida con un color digital de su rebanada, pega sus seis dígitos **Código HEX** Por ejemplo `#E63522`, al lado del selector de color. El líder `#` es opcional. Los códigos válidos actualizan la vista previa inmediatamente; el texto incompleto o inválido no se aplica y se revierte al color guardado cuando usted sale del campo. Una coincidencia HEX el código no simula la apariencia del filamento, la iluminación o una mezcla de color físico.

<a id="troubleshooting"></a>
## Solución de problemas

| ¿Qué ves? | Qué hacer para comprobar |
| --- | --- |
| El objeto se ajusta a las dimensiones exteriores pero no encajará en una bahía | Seleccione el compartimento y compruebe sus mediciones internas. Permita el espesor de la pared, los extremos curvados, el radio de esquina interior y los insertos extraíbles. |
| Seleccionar un separador sigue seleccionando la pared delante | Cambiar a **Superior** o abrir **Todas las paredes y compartimentos** a la derecha. |
| La tapa o el siguiente nivel no se puede añadir | Verifique un borde de nivel, igual de alturas externas, divisores de protrusión, imprenta de inclinación o división. Para una pila, también compruebe los clips de shell heredados y el ajuste de la limpieza en relación con el espesor de la pared. |
| Una parte supera la cama, aunque la huella parecía lo suficientemente pequeña | Lea las dimensiones terminadas en el cuadro de diálogo de descarga. Tilt, relieve, trim y shells pueden extenderse más allá de la base. Compruebe la configuración y rotación de la impresora seleccionada. |
| Los sujetadores de panel ocultos no están disponibles | Usar paredes por lo menos 3,2 mm de espesor sin alivio, o dejar sujetadores y pegar los paneles. Cambiar a los paneles no espesa las paredes. |
| Los paneles superponen el borde inferior o del tier en un diseño antiguo | Establece una compensación de bordes de al menos 3 mm para los niveles. La compensación inferior se mide desde la parte superior del borde inferior. Regenerar y descargar las piezas después de cambiar la configuración. |
| Una impresión descargada tiene los colores equivocados | Use 3MF, coincida con los números de ranura en **Impresión**, luego inspeccione las asignaciones por parte en el rebanado. STL sólo lleva geometría. |
| Falta un diseño guardado en otro dispositivo | Transferir su proyecto JSON y utilizar **Abrir**. Las bibliotecas del navegador son locales a cada dispositivo y dirección del sitio. |

<a id="project-variants"></a>
## Variantes de proyecto

Haga clic en **+ Variante** en la barra superior, o abra **Mis proyectos** y seleccione **Nueva variante**. Introduzca un nombre y haga clic en **Crear variante**. La nueva variante es una copia independiente; los restos originales se guardan. Un original sin nombre se mantiene como **Borrador**.

Utilice el selector junto a **+ Variante** para cambiar entre modelos relacionados, o elegir uno bajo **Variantes de este proyecto** en Mis proyectos. Cada variante guarda automáticamente y mantiene su propia historia de deshacer/redo después de cambiar o recargar. Una variante recién creada comienza con una historia vacía.

Uso **Proyecto independiente → Guardar una copia** para crear un proyecto no relacionado. Renombrar o eliminar modelos individuales en Mis proyectos; eliminar el original no elimina sus variantes.

**Descargar** exporta el modelo seleccionado para imprimir. **Guardar proyecto** descargas que modelo como editable JSON; **Archivo** en una tarjeta de biblioteca descarga el modelo correspondiente. JSON contiene un modelo, sin sus variantes relacionadas o deshacer historia. Guardar cada modelo por separado para transferir o respaldar el conjunto completo.


<a id="shared-styles"></a>
## Estilos compartidos

1. Abra un proyecto con los colores y patrones que desea reutilizar.
2. Bajo **Forma → Estilo común**, escriba un nombre y haga clic en **Guardar estilo actual**.
3. Abra otro proyecto o variante, vuelva a **Estilo común**, y seleccione el estilo guardado.
4. Elija **Colores**, **Patrones**, o ambos. Repaso **Se aplicará** y los mensajes **Se omitirá**, luego haga clic en **Aplicar estilo**.

Un estilo captura el color y relieve del organizador, además de los colores y patrones de una cáscara y tapa existente. Un estilo suave del cuerpo elimina el alivio del cuerpo del destino. Dimensiones, diseños de compartimentos, grosores de la pared, ajuste de tapa, mangos y autorizaciones de la cáscara permanecen inalteradas. La falta de tapas o cáscaras no se añaden.

La aplicación es un paso deshacer y crea una copia independiente: más tarde las ediciones a un organizador no cambian a los demás. Eliminar un estilo salvado no cambia los proyectos que ya lo utilizan.

Los estilos guardados pertenecen a este navegador y dirección del sitio. Un proyecto JSON preserva la apariencia aplicada, pero no incluye la biblioteca de estilo guardado. Para reutilizar un estilo en otro dispositivo, abra el estilo JSON del proyecto allí y guarde su estilo actual de nuevo.


<a id="drawer-arrangements"></a>
## Distribución de organizadores en cajones

Elija **DRAWER** junto a **Organizador**, luego **Create drawer**. Introduzca la longitud, la anchura, la altura útil y la limpieza. La limpieza se aplica tanto en las paredes del cajón como entre las bandejas.

Los nuevos cajones comienzan en 180 × 280 mm, con el borde delantero marcado en la parte inferior. **Vista giratoria de 90°** cambia solamente la orientación de visualización; las dimensiones del cajón, las coordenadas de bandeja y los modelos exportados permanecen inalterables. Los arreglos de cajones existentes conservan sus dimensiones. Los cajones guardados se abren con longitud horizontal y ancho vertical; las etiquetas de dimensión siguen la rotación de la vista manual.

Utilizar **New organizer** para crear una bandeja directamente en el cajón. Establecer sus dimensiones, luego editar compartimentos y accesorios en el editor organizador habitual. **Volver al cajón** vuelve a su colocación. **Add saved organizer** añade una copia independiente de un proyecto o variante guardado; editar nunca cambia su fuente.

Arrastre bandejas en la vista superior o introduzca coordenadas X/Y medida desde la esquina superior izquierda hasta los límites exteriores de la bandeja. Rote por 90 grados, duplicar o eliminar bandejas. Las teclas de flecha mueven una bandeja enfocada por 1 mm (Shift: 10 mm). Arrangement undo/redo restaura las colocaciones y edita la bandeja completada.

El diagrama muestra rectángulos de unión exterior ensamblados, incluyendo conchas, bordes, tapas y tigres. Las formas curvadas se verifican conservadoramente en lugar de anidar firmemente. Se destacan los conflictos de límites, limpieza y altura. Espere el control de geometría antes de confiar en el estado de ajuste. Elija la colocación gratuita o active una placa de montaje como se describe a continuación.

Los cajones guardan localmente en este navegador, por separado de los proyectos organizadores. Descargar un cajón Archivo JSON para copia de seguridad o transferencia; abrir uno crea una copia de cajón separada. Seleccione una bandeja y seleccione **Download selected tray** para su propia exportación STL, 3MF o OBJ con los controles de tamaño de impresora existentes.

<a id="mounting-plates"></a>
### Placas de montaje

In **DRAWER → Drawer base**, elegir **Mounting plate**. Longitud del drenaje / ancho y la limpieza de la pared determinan el área cubierta. Introduzca el ancho y la profundidad utilizables del **cama de impresora 3D** por separado: estas dimensiones determinan el tamaño máximo de la sección y por lo tanto el número de secciones. El cálculo incluye proyecciones conjuntas y un margen de impresión de 2 mm en cada borde de la cama. Las dimensiones no necesitan ser múltiples de la rejilla de 20 mm; las secciones del borde encajan en el espacio restante.

**Download sections (ZIP)** crea uno numerado 3MF por trabajo de impresión, un SVG mapa de montaje y una lista de coordenadas. El mapa utiliza la orientación original del cajón, independiente de la rotación de la vista. R indica filas de arriba a abajo, columnas C de izquierda a derecha. Menores colas adyacentes en lugar desde arriba. Primera impresión **Download joint sample**, que contiene dos pequeñas secciones adyacentes; check assembly con su impresora antes de imprimir el conjunto completo. Las articulaciones utilizan una costura de 0,05 mm y una asignación de perfil de 0.03 mm. Una costura débil y un ligero juego pueden permanecer entre secciones desnudas.

Con el modo de placa activado, las descargas de bandeja incluyen tomas inferiores para la posición y rotación de la bandeja. Se conservan las dimensiones del compartimiento interno. La bandeja se convierte en 2.1 mm más alta; incluyendo la placa de 2 mm, el cajón de ajuste añade 4.1 mm. Después de mover o girar una bandeja, descargue de nuevo: sus tomas deben coincidir con las posiciones del peg.

La limpieza radial de Socket es de 0.12 mm. Imprima un pequeño organizador que abarca dos secciones para comprobar que se ajustan a su configuración de material y capa. Las tomas retienen el organizador lateralmente; levantarlo hacia arriba para eliminarlo. Exportar utiliza geometría solamente: elegir su impresora y perfiles de material en el rebanado e inspeccionar los techos de socket antes de imprimir.

El montaje actualmente soporta organizadores sin inclinación, con por lo menos tres tomas totalmente soportadas. Las bandejas pequeñas pueden ser movidas o ampliadas. Los niveles superiores y las cáscaras conservan su geometría existente. Apaga el modo de placa para exportar el modelo original sin montar. Los proyectos de fuente guardada permanecen sin cambios.

<a id="custom-svg-relief"></a>
## Relieve SVG personalizado

Bajo **Forma → Relieve organizador → My SVGs**, elegir **Upload SVG** o soltar un archivo en el área de carga. Seleccione una miniatura guardada para reutilizarlo. La misma biblioteca está disponible bajo **Forma → Tapa → My SVGs** y **Carcasa → Patrón → My SVGs**. Cada objetivo mantiene su propio patrón y configuración de colocación.

Elija **Single motif** o **Repeat**, seleccionar las paredes exteriores, y ajustar la anchura del motivo en milímetros, rotación, offset horizontal/vertical, y la brecha de repetición. La anchura y la altura mantienen las proporciones originales. La colocación se centra en cada lado seleccionado; en los cuerpos curvados los lados corresponden a cuatro sectores exteriores. El offset vertical positivo mueve el motivo hacia arriba. El patrón sigue el contorno exterior. Las repeticiones se colocan sólo donde un motivo completo se ajusta por debajo del borde superior, alrededor de los recortes y dentro de cada lado. Los motivos individuales se cortan en estos límites. La profundidad de las actividades de socorro utiliza los recursos existentes **Profundidad de alivio / Intensidad** control. La pared original y los compartimentos internos se conservan; las dimensiones externas aumentan. Espere hasta que la vista previa actualizada termine, luego compruebe y descargue la parte.

Los SVG soportados contienen caminos llenos, polígonos, rectángulos, círculos o elipses, incluyendo agujeros y transformados de grupo. Convertir texto y trazos en caminos llenos antes de exportar desde su editor vectorial. Fotos, referencias externas, filtros, máscaras, caminos de recortado, gradientes, bloques de estilo CSS y referencias a elementos reutilizables ( `use` ) no son compatibles. Se ignoran las definiciones vacías o no utilizadas que contienen formas soportadas. Los colores se convierten en una sola forma elevada usando el color organizador. Los límites son 200 KB, 512 elementos XML, 128 formas llenas y 6.000 puntos de contorno muestreados; patrones excesivamente complejos o repeticiones excesivas se rechazan con un mensaje. Las curvas son aproximadas por contornos poligonales para imprimir.

Los SVG se procesan localmente en el navegador. La biblioteca permanece en este dispositivo. Cada proyecto incrusta una copia independiente de sus contornos usados, por lo que los proyectos descargados se pueden reabrir en otro dispositivo sin la fuente SVG o biblioteca. Eliminar una entrada de la biblioteca deja los proyectos existentes sin cambios. **Estilo común** también lleva patrones personalizados de cuerpo, tapa y cáscara a otro organizador.

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

1. Mantén los caminos llenos previstos o las formas básicas. Convertir texto y **trazos para esbozar** en tu editor vectorial. Una línea visible con `fill="none"` es un derrame cerebral, no un área llena.
2. Quitar rectángulos de fondo a menos que desee que toda la zona se convierta en relieve o una abertura. Los colores SVG no separan materiales y formas blancas no borran automáticamente formas más oscuras debajo.
3. Comprobar los caminos compuestos en el editor vectorial. Un comentario que dice “agujero” no crea uno: el camino de enrollamiento y `fill-rule` determinar si un área interior está llena.
4. Para a través de las aberturas, conectar los detalles internos adjuntos al material circundante con puentes. Aumentar la brecha entre motivos repetidos **no** adjuntar un detalle suelto dentro de un motivo. Alternativamente, utilizar el alivio elevado en la tapa.
5. Preferir un solo motivo para el modo de repetición. Si el SVG ya contiene una rejilla de motivos, su ajuste de ancho escala la rejilla **cuadrícula completa**, no cada motivo. Las pequeñas características pueden llegar a ser demasiado delgadas para imprimir.
6. Esperar un cheque de construcción y exportación exitoso, luego inspeccionar la vista previa del rebanador. Si el edificio falla, la escena puede retener el último modelo exitoso; ese modelo no representa la configuración actual fallida.

Por ejemplo, una silueta de hoja sólida puede funcionar como alivio y como una abertura en forma de hoja. Una hoja con una vena totalmente cerrada puede funcionar como alivio, pero cortar la hoja circundante puede dejar la vena suelta. Una rejilla hexagonal llena puede funcionar como perforaciones si las telas restantes se mantienen conectadas y lo suficientemente gruesas; una ilustración multicolor dibujada con trazos debe ser preparada primero.

<a id="svg-lids-and-perforated-shells"></a>
### Tapas SVG y carcasas perforadas

Añadir una tapa, luego elegir **My SVGs**. **Alivio elevado (decoración)** hace una sola tapa conectada con el motivo en un soporte sólido; establecer su altura de alivio (0.2-1 mm) y el color base. **A través de la plantilla (corte)** elimina las áreas SVG llenas a través de la tapa. Ambos modos conservan un marco de borde de 2 mm y el labio sólido.

Para una cáscara, seleccione **My SVGs**, luego un dibujo de biblioteca. Las áreas llenas se convierten a través de aberturas. Utilice un motivo o repeticiones en los lados seleccionados de una manga envuelta. En **Paneles decorativos**, el dibujo se repite independientemente en cada panel seleccionado; los marcos existentes y las ubicaciones de montaje se conservan. El tamaño del motivo inicial toma en cuenta la altura de la concha.

En tapas y conchas, sólo se colocan motivos completos dentro del marco disponible, incluyendo motivos individuales. Si no cabe, reducir el tamaño o offset. Los detalles interiores cerrados (por ejemplo el centro de un corte en forma de anillo) pueden llegar a ser islas sueltas. Añadir puentes en su editor vectorial o usar la decoración elevada en la tapa. La aplicación bloquea la geometría desconectada en lugar de piezas desechadoras silencios.

Los patrones están incluidos en las exportaciones individuales, los kits completos y los trabajos de impresión completos. Cambiar de nuevo a **Built-in** elimina el patrón personalizado sólo de ese objetivo. Eliminar una miniatura de la biblioteca no elimina los patrones embebidos de los proyectos.

<a id="download-ready-to-use-stencil-svgs"></a>
### Descargar plantillas SVG listas para usar

Estos ejemplos contienen contornos llenos con puentes de material. Las áreas negras se convierten en aberturas en **A través de la plantilla (corte)** modo. Guardar los enlaces a continuación como `.svg` archivos; si el navegador muestra el dibujo, utilice **Guardar página como** y retener la extensión `.svg`.

| Descargar | Patrón | Ancho de inicio sugerido |
| --- | --- | --- |
| [Hojas orgánicas — descarga SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinco hojas con puentes que conectan los detalles interiores | 20 mm; reducir para una cáscara baja |
| [Hexagon doble — descarga SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Una baldosa de doble hexágono con cuatro puentes y una apertura central | 20–24 mm; use **Repeat** para una cuadrícula |

**En una tapa:** añadir una tapa debajo **Forma → Tapa**, abierto **My SVGs**, y subir cualquier archivo. Elija **A través de la plantilla (corte)**. Empieza con **Single motif** para inspeccionarlo, o seleccionar **Repeat** para llenar el área disponible con copias completas. Set ancho, rotación y X/Y offsets. Repita el espaciado es la brecha entre copias completas, no la anchura de sus puentes internos. Comience con espaciamiento de 4 mm. El archivo de hoja ya es un grupo de cinco hojas: ancho escala todo el grupo.

**En una cáscara:** open **Carcasa → Patrón → My SVGs**, or choose the **Carcasa** tab in the studio, then select the same file from the shared library. Shells always use through openings. Use **Repeat** for a band around the shell; **Adicional → SVG walls** selecciona los lados de una concha envuelta. Los paneles decorativos usan los lados de panel seleccionados y los correspondientes.

Si un motivo no cabe, reduzca su ancho o offset. En una cáscara baja, prueba 12–16 mm para el grupo de hoja. El aumento del espesor de la cáscara puede ampliar su frontera automática y dejar menos espacio para el dibujo. Escalar hacia abajo también estrecha los puentes: inspeccionarlos en su rebanada e imprimir una pequeña muestra para su boquilla y material. Repita el espaciado no puede ensanchar puentes internos. Esperar la vista previa actual para terminar, luego utilizar **Descargar** para comprobar y exportar la tapa o la cáscara.

<a id="numeric-sliders-and-valid-ranges"></a>
### Deslizadores numéricos y rangos válidos

Los ajustes numéricos muestran **Min** y **Max** por encima de una fina pista verde, con un marcador blanco para el valor actual. Las tapas de extremo rojo marcan el exterior del intervalo permitido; no son una calificación de fuerza de impresión. Arrastre el marcador, utilice las teclas de flecha mientras se centra, o escriba un número exacto y pulse Enter. El campo numérico y deslizante utilizan los mismos límites.

<a id="whole-drawer-export"></a>
## Exportar todo el cajón

Elija **DRAWER → Print entire drawer** para preparar todas las bandejas, sus accesorios y cualquier sección de placas de montaje habilitadas. Bandejas montadas reciben tomas para sus posiciones guardadas; bandejas de colocación libre ordinarias mantienen sus bases existentes. Los proyectos de impresión dividida incluyen sus piezas y pasadores. Superposiciones, limpiezas insuficientes de cajones, montaje sin soporte o geometría inválida bloquean la descarga e identifican la bandeja afectada.

Set **Printer bed length** (horizontal), **Printer bed width** (vertical), altura de impresión y espaciamiento. Las dimensiones iniciales proceden de la configuración de la placa de montaje o del área de impresión de la primera bandeja; se guardan los ajustes de exportación subsiguientes con este cajón. Las secciones de la placa de montaje se regeneran para la cama elegida.

El diseño utiliza cajas exportadas reales, un margen de 2 mm en los bordes de la cama y el espaciado elegido. Las piezas pueden girar 90 grados. Los componentes de tapa multicolor permanecen juntos. El recuento de la cama mostrado es para este arreglo, no un mínimo garantizado. Soportes, bordes, torres de purga, zonas de exclusión de la impresora y diferentes trabajos de material no están incluidos; reserve espacio apropiado y compr el resultado en su rebanado.

El ZIP contiene **bed-NN.3mf** para cada cama, emparejado **bed-NN.svg** diagramas, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** y una lista de partes numeradas en **README.txt**. Abre cada uno 3MF como un trabajo de impresión independiente, mantener las posiciones relativas de sus objetos, utilizar milímetros a escala 100% y asignar filamentos. El SVG diagramas que muestran los rectángulos ligados; los 3MF contiene toda la geometría imprimible. Las coordenadas de montaje del drenaje siempre usan longitud horizontal y ancho verticalmente.

Los cambios en la configuración de distribución o exportación invalidan el cálculo anterior. Cierre de la ventana cancela la preparación. Se reportan piezas individuales de tamaño superior en lugar de escalar silenciosamente o dividir automáticamente.

<a id="pattern-studio"></a>
### Estudio de patrones

Elija **Alivio elevado (decoración)** o **A través de la plantilla (corte)** en la parte superior de la configuración derecha. Shells solo soporta el modo stencil. Los ajustes muestran la altura de alivio sólo para el alivio, y espaciamiento sólo para la colocación de repetición. **Espesor de material** es editable: 1.2–6 mm para un SVG tapa y 1-4 mm para una cáscara. Cambia la vista previa y la exportación juntos. Los defectos de tapas existentes siguen siendo de 3.2 mm para el alivio y 2 mm para la plantilla; se conserva un grosor elegido al cambiar los modos. Altura de alivio se incluye en el espesor de tapa. Un inicio SVG tapa requiere profundidad interna de al menos el espesor de la placa más 2 mm. **Adicional** contiene color de tapa o selección de pared de concha. Abierto **¿Qué archivos SVG funcionan?** para los límites de importación y el asesoramiento de preparación.

Abierto **Forma → Tapa → My SVGs** o **Carcasa → Patrón → My SVGs** para editar patrones accesorios en el cajón inferior. **Tapa** y **Carcasa** las pestañas mantienen ajustes independientes mientras comparten SVG biblioteca. Las pestañas de conmutación se aíslan automáticamente que parte en la vista previa. Si aún no se añade, la asamblea permanece visible hasta que se crea la parte. Aún puedes elegir la Asamblea manualmente por encima del modelo. Utilice el ancho, la rotación, el intervalo y los controles X/Y a los motivos de posición; el botón central reajusta la posición y la rotación. La tapa apoya el alivio elevado o mediante aperturas. Las aberturas de Shell mantienen el marco y las áreas de montaje. Cerrar con × o Escape mientras se centra en el estudio; las ediciones permanecen guardadas. Las teclas de flecha cambian la pestaña de superficie enfocada.
