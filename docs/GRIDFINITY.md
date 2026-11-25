# Gridfinity: plates and independent trays

Open **Gridfinity** beside Organizer and Drawer. Standard projects use a 42 mm Gridfinity grid and are independent of the ordinary organizer and its
20 mm mounting system.

## Fit to drawer

Choose **Gridfinity → Fit to drawer** and enter the measured inside width and depth. Clearance per side reduces each dimension by twice the entered value. The suggested rows and columns fill this area with equal cells. Adjust either count to choose a different pitch (36–84 mm on each axis).

The plates split along cell boundaries to fit the configured print bed with a 2 mm edge margin. Lay the plates edge to edge. A tray can span a seam whenever every foot has a free socket. Each tray uses the pitch of this project. For third-party trays with a standard 42 mm pitch, choose the standard Gridfinity project mode.

For example, on a 270 × 270 mm print bed at zero installation clearance, a 255 × 572 mm drawer gives 6 × 14 cells of 42.5 × 40.857 mm (rounded) across three plates. A 280 × 480 mm drawer gives 7 × 12 cells of 40 × 40 mm across four plates. Use **Drawer dimensions** to adjust an existing set.

## Build a set

1. A new project starts with a 4 × 4 plate and one 2 × 2 tray. Choose a plate in
   **Assembly parts**, then **+ Tray** to add an independent 1 × 1 tray to its
   first free position. Select the tray and open **Dimensions** to resize it.
2. **+ Plate** adds a separate 4 × 4 plate beside the existing plates. Each plate
   has its own dimensions, color and socket clearance. Plates can be printed
   separately and placed next to one another; no joining or gluing is required
   by the generated models. The app does not generate plate connectors.
3. Select a part, then drag it on the model. Positions snap to 42 mm cells.
   Dragging a plate moves its trays with it. A tray can move to another plate
   when its entire footprint fits in free cells. **Tray baseplate** also moves
   a tray to a chosen plate, finding a free position if its old position is busy.
4. **Grid position** accepts X/Y offsets in millimetres, snapped to 42 mm.
   In standard projects, tray offsets start at the selected baseplate. In drawer-fit projects, they start at the drawer grid origin. **Rotate 90°** swaps its occupied grid dimensions while keeping
   its own compartment layout and dimensions.
5. **Duplicate** creates an independent copy. Duplicating a plate also copies its
   trays. A duplicated tray needs free space on its current plate. Renaming a
   part helps identify it in the parts list.
6. Selecting a tray immediately opens compartment controls on the right, even
   in **Entire set**. Click a compartment floor or badge, choose the number of
   parts and split along length or width. Select a divider to drag it or enter
   exact dimensions. **Edit part** optionally opens the part separately; it is
   not required for splitting.

Drag a T/P badge or an outer wall without a separate selection click. The part
follows the pointer continuously. A green frame marks an available grid position;
a red frame marks an invalid position. Release on green to snap to the grid.
Release on red, press Escape or leave the window to restore the starting position.
A move is one undo step. Plates carry their attached trays.

Rotation keeps the current position when possible. If a neighbor or plate edge
blocks it, the tray moves to the nearest free position on the grid. Other
parts stay in place. If there is no space, the assembly stays unchanged.

The dimensions below the settings belong to the selected named part. Plate offsets are measured from the assembly origin. Position changes placement, not the size of the model.

New parts use `#95B9C6`. Saved colors are preserved. Compartment edges remain
visible on unselected trays; these preview outlines do not affect exported colors.
**New project** creates a named independent set; **+ Variant** copies the current
set. **My projects** supports search, rename, download and deletion with confirmation.


Overlapping plates, overlapping trays and tray overhangs are rejected. A resize
that would strand a tray is rejected without deleting or moving it. Move trays
before shrinking a plate. A plate containing trays cannot be deleted; move or
remove them first. At least one plate remains. Undo restores edits and deletions;
a pointer drag is one undo step and Escape cancels it. Limits: 32 plates,
128 trays, 1–8 cells per plate/tray axis; up to 128 compartments per tray.

**+ Variant** copies the whole assembly as an alternative project. It does not
add a tray to the current assembly. Old single-tray projects migrate to one
matching plate and tray without changing their geometry, colors or clearance.
Save project downloads the complete assembly JSON. Open accepts both old
single-pair files and new assembly files. Keep a downloaded backup: browser
storage is local to that browser.

## Plate type

Select a plate, then open **Plate type** and choose **Solid bottom** or **Open grid**.
Each plate has its own setting. New and older projects use a solid bottom unless
you change it. Open grid removes material through the centre of each cell while
retaining a support ledge beneath the tray feet. Both types use the same socket profile and clearance. The plate is 5.95 mm tall with mounting off and 7.55 mm tall with screw mounting on. On a 42 mm grid the openings are 31.6 mm wide; the bearing
ledge beneath each foot is 2 mm wide along the straight sides. The choice is saved
with the project and used by the preview and all export formats.

Compare material and print time in your slicer with identical settings; the saving
depends on the print settings. Test a small open-grid plate before printing a full
set.

## Baseplate mounting

Select a plate and open **Baseplate mounting**. Enable **Mounting with countersunk screws** to add through holes in the corner cells of the plate. The through hole is Ø3.5 mm and the 90° countersink is Ø6.5 mm. For a wooden drawer, use Ø3 mm wood screws with countersunk heads around Ø6 mm. Choose a length that won’t go through the drawer bottom. Seat each head below the socket floor before fitting a tray. The open-grid plate adds a bridge across each mounting cell. In **Fit to drawer**, the setting applies to all plates so trays can span seams at the same height.

## Geometry, color and fit

Standard tray footprint: grid cells × 42 − 0.5 mm. Plate footprint: grid cells × 42 mm.
Tray height includes the feet and can be set directly in millimeters (14–140 mm).
The inside floor is at Z = 7 mm, so usable depth below the stacking plane is the nominal tray height minus 7 mm.
Without mounting, the plate is 5.95 mm tall, including a 1.2 mm bottom. Tray wall thickness is
1.2–3 mm. Outer corner radius is 0–3.75 mm; inner vertical corner radius is
0–20 mm, limited by the available compartment size and preserved wall thickness.
These radii do not round the wall-to-floor joint. Standard feet and sockets
retain their reference profile.

Each tray and plate has its own color. The palette uses the already configured
printer and filament slots; there is no second printer setup. Selecting a slot
sets the part color. The shared export dialog allows an explicit filament slot
for each part.

**New plates default to 0.10 mm socket clearance per side.** A local comparison
print fitted more closely at 0.10 mm than at 0.15 mm. Existing saved values are
preserved. The setting remains adjustable from 0.10 to 0.20 mm per side and
changes plate sockets only, not tray feet. This result is specific to that print;
test a small 1 × 1 pair with your material at 100% scale. Third-party physical
compatibility has not been independently established.

## Easy access

Under Easy access, set the bottom fillet radius from 0 to 12 mm to roll small parts up the sides of each compartment. The radius adapts to shallow or narrow compartments. For the front finger notch, choose a smooth, half-round or rectangular profile and set its width and depth in millimetres. Depth is measured from the top edge. The notch lowers the centre of the front edge, including the stacking lip if fitted. Paired wall cutouts open the selected pair of opposite tray walls. Set the width and depth or choose Down to the tray floor. The openings rotate with the tray. Internal side grips add two ledges for lifting the tray from above. Each option can be used independently.

## Tray labels

Select a tray and open Tray label. On a lidded tray, the engraving or removable plate sits face up near the front edge of the lid. Slide the plate towards the front to secure it, or back and then up to remove it. On an open tray, choose an inclined (25°) or horizontal label shelf inside the rear wall. Both are readable from above. Use Letter height to set the size in millimetres. Replaceable label plate adds a recessed holder and a separate 30 × 5.4 × 1.2 mm plate. Press Enter to apply the text. On the shelf, lay the plate face up and slide it towards the lower edge under both tabs. Slide it uphill and lift to remove it. Choose Replaceable label plate in the download dialog to print a new inscription for the same holder. Whole-set downloads include the tray and plate separately.

## Tray lids

Select a tray and open Lid. Choose Plain for a flat cover or With stacking lip to support a second tray of the same footprint. Under Flush finger grip, choose through openings or a closed bottom. Both leave a centre bar level with the lid. The closed version has 5 mm finger pockets and adds 4.2 mm to the lid height. Print the lid face up with the grip, label pocket and stacking lip facing away from the bed. Print the removable tag beside it. For a tray with a stacking lip, the lid seats on the same shelf as an upper tray. For a plain tray, the locating pads enter the compartments and taper out above the rim. The download uses this orientation. Switch off Show lids to edit the compartments. The whole-set and plate-kit downloads include lids as individual print parts. Select Lid in the download dialog to print just the selected tray’s cover.

## Download

The common **Check and download** dialog offers the entire assembly, the selected
plate with its trays, the plate alone, or the selected tray. Choose STL, 3MF or OBJ.
Each part is checked for closed geometry and printer dimensions.

- **STL:** separate geometry files; no color information.
- **3MF:** separate objects, colors and selected filament assignments. One file per print bed, automatically arranged using the same packing as Drawer and the configured printer dimensions. Objects retain their positions within each bed.
- **OBJ:** separate objects with an MTL material file.

The outer ZIP includes the model files, both MIT notices, a README, the complete
assembly project and `assembly-layout.svg`. Model names such as
`plate-2-tray-3` match the numbered assembly layout. A partial export still
includes the full project and layout for reference. The shared download dialog shows the number of beds and their layouts. Each bed has a numbered 3MF and SVG; print-plan.json records placements. Packing uses the configured printer dimensions, a 2 mm edge margin and 5 mm spacing. Keep positions when importing each 3MF. Verify supports, brim and filament assignments in the slicer; printer profiles are not included. Drawer-fit mode divides the base into printable plates. Each tray prints in one piece.

## Compatibility and attribution

Select the lower tray and enable **Stacking → Stacking lip**. Place a tray with the same footprint on top. Only trays supporting another tray need the lip. It adds 3.8 mm to the printed height. Two 4-unit trays, with the lip enabled only on the lower one, stack to 56 mm. The option starts off for new and existing trays.

Gridfinity was created by Zack Freedman / Voidstar Lab LLC. Reference mating
dimensions are adapted from Kenneth Hodson's Gridfinity Rebuilt OpenSCAD under
MIT. See [third-party notices](../THIRD-PARTY-NOTICES.md) and the
[complete MIT notices](../public/licenses/GRIDFINITY-MIT.txt). ReplixGrid is
independent and is not endorsed or certified by Gridfinity's creator.

---

# По-русски

## Под размер ящика

Выберите **Gridfinity → Под размер ящика** и введите внутренние ширину и глубину. Монтажный зазор задаётся на сторону. Например, при зазоре 0,5 мм общая ширина и глубина комплекта уменьшаются на 1 мм. Программа предлагает число рядов и столбцов. Их можно менять вручную в пределах шага ячейки 36–84 мм по каждой оси.

Плиты делятся по границам ячеек с учётом размеров печатного стола и отступа 2 мм от краёв. Уложите их встык. Лоток можно поставить поперёк стыка, если под каждой опорой есть свободное гнездо. Опоры и гнёзда используют шаг этого комплекта. Для сторонних лотков с шагом 42 мм выбирайте стандартный режим Gridfinity.

Например, для ящика 255 × 572 мм, стола 270 × 270 мм и нулевого монтажного зазора предлагаются 6 × 14 ячеек размером примерно 42,5 × 40,857 мм и три плиты. Для ящика 280 × 480 мм получаются 7 × 12 ячеек размером 40 × 40 мм и четыре плиты. Кнопка **Размеры ящика** открывает параметры уже созданного комплекта.

## Несколько плит и разных лотков

Новый проект содержит плиту 4 × 4 и лоток 2 × 2. В **Составе комплекта** выберите
плиту и нажмите **+ Лоток**: появится независимый лоток 1 × 1 на свободном месте.
Выберите его и задайте собственные размеры, цвет и отсеки. **+ Плита** добавляет
соседнюю плиту 4 × 4. Каждую плиту можно напечатать отдельно и поставить рядом
с другой; соединители и склейка моделью не предусмотрены.

Выберите деталь и перетащите её по сетке с шагом 42 мм. Плита перемещается вместе
со своими лотками. Лоток можно перенести на другую плиту мышью или через поле
**Плита для лотка**. Если прежнее место занято, список плит подбирает свободное.
**Положение на сетке** задаёт X/Y в миллиметрах. В стандартном режиме положение лотка отсчитывается от его плиты, в режиме под размер ящика — от начала общей сетки. **Повернуть 90°** меняет размещение лотка,
сохраняя его внутреннюю разметку.

**Дублировать** создаёт независимую копию; плита копируется вместе с лотками.
Для копии лотка нужно свободное место на текущей плите. **Редактировать деталь**
открывает выбранную деталь отдельно. Выделяйте пол отсека или его номер,
разделяйте отсек и двигайте перегородки привычными инструментами. Точные размеры
задаются в общем блоке длины/ширины с кнопкой **Применить**. **Весь комплект**
возвращает к размещению деталей.

Все ячейки под лотком должны быть свободны и покрыты плитами. Уменьшение плиты,
на которой лотки перестают помещаться, отклоняется с сообщением: сначала
перенесите лотки. Занятую плиту нельзя удалить вместе с лотками незаметно.
В комплекте остаётся хотя бы одна плита. Изменения и удаление отменяются;
перетаскивание — один шаг истории, Escape отменяет движение. Максимум:
32 плиты, 128 лотков, 1–8 ячеек по каждой оси детали, 128 отсеков в лотке.

**+ Вариант** копирует весь комплект как альтернативный проект. Для второго
лотка используйте **+ Лоток**. Старые проекты открываются как одна плита
с одним лотком, сохраняя геометрию, цвет и зазор. Сохраняйте резервную копию
через **Сохранить проект**. **Открыть** принимает и прежний формат пары,
и новый файл всего комплекта. Автосохранение действует в текущем браузере.

## Тип плиты

Выберите плиту и откройте **Тип плиты**: **Сплошное дно** или **Решётчатая**.
Настройка независима для каждой плиты. Новые и старые проекты сохраняют сплошное
дно, пока вы сами не переключите вариант. В решётчатой плите сквозные отверстия
по центру ячеек уменьшают количество материала. Под опорами лотков остаётся
бортик: 2 мм вдоль прямых сторон, ширина отверстия — 31,6 мм. Профиль гнёзд и посадочный зазор одинаковы у обоих вариантов. Высота плиты без крепления — 5,95 мм, с креплением — 7,55 мм. Выбор сохраняется
в проекте и применяется в предпросмотре и во всех форматах экспорта.

Расход пластика и время сравнивайте в слайсере с одинаковыми настройками.
Перед печатью полного комплекта напечатайте небольшой образец для проверки посадки.

## Подписи лотков

Выберите лоток и откройте «Подпись лотка». При выбранной крышке гравировка или сменная табличка располагается сверху у её переднего края. Сдвиньте табличку к переднему краю под упоры. Для снятия сдвиньте назад и поднимите. У открытого лотка подпись находится на наклонной площадке внутри у задней стенки и видна сверху. Размер текста в миллиметрах задаётся в поле «Высота букв». Введите текст и нажмите Enter. Табличка размером 30 × 5,4 × 1,2 мм подходит ко всем лоткам с таким держателем. На площадке положите табличку надписью вверх и сдвиньте вниз по наклону под два упора. Чтобы снять, сдвиньте её вверх по наклону и поднимите. Для замены текста выберите «Сменная табличка» в окне скачивания. При скачивании всего комплекта лоток и табличка раскладываются по столам отдельно.

## Крышки лотков

Выберите лоток и откройте раздел «Крышка». «Обычная» даёт плоский верх. Вариант «С бортиком» удерживает сверху лоток такой же длины и ширины. В меню «Ручка заподлицо» можно выбрать сквозную ручку или ручку с закрытым дном. В обоих случаях перемычка находится вровень с крышкой. Версия с закрытым дном имеет углубления 5 мм и добавляет 4,2 мм к высоте крышки. Печатайте крышку посадочной стороной на столе. Ручка, держатель таблички и бортик смотрят вверх. Сменная табличка печатается рядом. На лотке с бортиком крышка опирается на ту же площадку, что и верхний лоток. У лотка с обычным краем выступы крышки входят в отсеки и расширяются выше края. Эта ориентация уже задана в файле. Отключите «Показать крышки», чтобы редактировать отсеки. При скачивании комплекта крышки раскладываются по печатным столам как отдельные детали. Чтобы напечатать одну крышку, выберите лоток и укажите «Крышка» в окне скачивания.

## Крепление плиты

Выберите плиту и откройте **Крепление плиты**. Включите **Крепление потайными винтами и саморезами**. Сквозные отверстия появятся в угловых ячейках плиты. Диаметр сквозного отверстия — 3,5 мм, потая 90° — 6,5 мм. Для деревянного дна подойдёт саморез Ø3 мм с потайной головкой около Ø6 мм. Подберите длину по толщине дна и утопите головку ниже дна гнезда, чтобы лоток сел до конца. В решётчатой плите в ячейках с винтами появятся перемычки. В режиме **Под размер ящика** настройка действует на все плиты комплекта, чтобы лотки ровно садились поперёк стыков.

## Посадка и цветная печать

Для новых плит зазор по умолчанию — **0,10 мм на сторону**. В сравнительной
пробной печати он дал более плотную посадку, чем 0,15 мм. Сохранённые значения
не меняются. Диапазон настройки остаётся 0,10–0,20 мм; меняются только гнёзда
плиты, размеры опор лотка прежние. Результат относится к этой пробной печати,
а не ко всем принтерам и материалам. Совместимость с чужими деталями физически
не подтверждена. Начните с пары 1 × 1 при масштабе 100%.

У каждой плиты и каждого лотка свой цвет. Палитра использует существующие
настройки принтера и его слоты филаментов. В общем окне скачивания выберите
весь комплект, плиту с лотками, только плиту или выбранный лоток.
Для цвета используйте **3MF** и назначьте филамент каждой детали. STL не хранит
цвет; OBJ включает MTL. В ZIP также входят лицензии, файл всего проекта
и схема `assembly-layout.svg`, даже при экспорте части комплекта.

Gridfinity использует ту же раскладку по печатным столам, что и «Ящик», с размерами из существующих настроек принтера. Отступ от краёв — 2 мм, промежуток между деталями — 5 мм. В окне скачивания показываются число столов и схемы. Каждый стол сохраняется отдельным bed-NN.3mf и SVG; print-plan.json содержит координаты. При открытии 3MF сохраняйте расположение деталей. Схема сборки показывает конечное расположение плит и лотков. В режиме «Под размер ящика» основание делится на печатные плиты. Лотки печатаются целиком.
Профили принтера не передаются. Размеры, филаменты и расположение на столах
проверьте в слайсере.

Шаг основания — 42 мм. Высота лотка задаётся в миллиметрах от 14 до 140. Номинальная высота включает опоры. Глубина до плоскости укладки
на 7 мм меньше номинальной высоты. Толщина стенки 1,2–3 мм, внешний радиус 0–3,75 мм,
внутренний — до 20 мм с ограничением по размеру отсека. Радиусы вертикальных
углов не скругляют стык стенки с дном. Плита без крепления имеет высоту 5,95 мм, включая дно толщиной 1,2 мм.
В разделе «Извлечение деталей» задайте радиус скругления дна от 0 до 12 мм. Скругление помогает подхватывать мелкие детали у стенки каждого отсека. В низких и узких отсеках радиус уменьшается автоматически. Для передней выемки выберите плавный, полукруглый или прямоугольный профиль и задайте ширину и глубину в миллиметрах. Глубина отсчитывается от верхнего края. Выемка понижает середину передней стенки вместе с бортиком для штабелирования, если он включён. Парные вырезы располагаются по центру двух выбранных противоположных стенок. Задайте ширину и глубину или включите До внутреннего дна. Вырезы поворачиваются вместе с лотком. Два внутренних боковых захвата позволяют поднять лоток сверху. Каждая настройка включается отдельно.

Выберите нижний лоток и включите **Штабелирование → Бортик для штабелирования**. Сверху установите лоток с такими же длиной и шириной. Бортик нужен каждому лотку, на который ставят следующий. Он добавляет 3,8 мм к высоте при печати. Два лотка по 4 единицы с бортиком только на нижнем занимают в стопке 56 мм. По умолчанию бортик выключен.

Автор Gridfinity — Zack Freedman / Voidstar Lab LLC. Размеры сопряжения взяты
из MIT-проекта Gridfinity Rebuilt Kenneth Hodson; оба уведомления входят
в экспорт. ReplixGrid — независимый проект без официальной сертификации.

### Проекты и начальный цвет

«Новый проект» запрашивает название и создаёт независимый комплект с одной плитой и лотком. «+ Вариант» создаёт именованную копию текущего комплекта; верхний список показывает только варианты этого проекта. Отдельные проекты открываются через «Мои проекты»: доступны поиск, переименование, скачивание файла и удаление с подтверждением. Удаление записи не удаляет другие варианты и ранее скачанные файлы.

Начальный цвет новых деталей — `#95B9C6`, общий для органайзера, оболочки, ящика и Gridfinity. Сохранённые явно выбранные цвета остаются прежними.

При выборе лотка в общем комплекте справа сразу открываются настройки отсеков. Выберите отсек на модели и разделите его по длине или ширине; перегородки можно выбирать и перемещать прямо на плите. Для перемещения самого лотка потяните его внешнюю стенку. Отдельный вид детали остаётся доступным, но для разделения не требуется.

В предпросмотре контуры отсеков видны у всех лотков, включая невыбранные. Стенки слегка затемнены; цвет контура адаптируется к цвету лотка. Метки T1, T2 обозначают лотки, P1 — плиту, числа внутри выбранного лотка — его отсеки. Эти визуальные подсказки не изменяют геометрию, цвета экспорта или назначение филаментов.

Поворот лотка на 90° сохраняет его положение, если хватает места. Если мешает сосед или край плиты, выбирается ближайшее свободное положение на сетке. Остальные детали не перемещаются; поворот и сдвиг отменяются одним действием. Если места нет, комплект остаётся без изменений.

### Плавное перемещение

Тяните метку T/P или внешнюю стенку без предварительного щелчка. Деталь плавно
следует за мышью. Зелёная рамка показывает допустимое положение на сетке,
красная — недопустимое. При отпускании на зелёной рамке деталь привязывается
к сетке. Отпускание на красной рамке, Escape или потеря фокуса окна возвращают
исходное положение. Перенос отменяется одним действием; плита переносит свои лотки.

Габариты под настройками относятся к выбранной детали. Положение лотка
отсчитывается от начала его плиты, положение плиты — от начала всего комплекта.
Изменение положения перемещает деталь, но не меняет её размер.
