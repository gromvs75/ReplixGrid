# Gridfinity: plates and independent trays

Open **Gridfinity** beside Organizer and Drawer. This workspace uses a 42 mm
Gridfinity grid and remains independent of the ordinary organizer and its
20 mm mounting system.

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
   Plate offsets are relative to the assembly origin; tray offsets are relative
   to its plate. **Rotate 90°** swaps its occupied grid dimensions while keeping
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
blocks it, the tray moves to the nearest free position on the same plate. Other
parts stay in place. If there is no space, the assembly stays unchanged.

The dimensions below the settings belong to the selected named part. Tray
position is measured from its plate origin; plate position is measured from the
assembly origin. Position changes placement, not the size of the model.

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

## Geometry, color and fit

Tray footprint: grid cells × 42 − 0.5 mm. Plate footprint: grid cells × 42 mm.
Tray height includes the feet and changes in 7 mm increments (14–140 mm).
The inside floor is at Z = 7 mm, so usable depth is total height minus 7 mm.
Plate height is 5.95 mm, including a 1.2 mm bottom. Tray wall thickness is
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
includes the full project and layout for reference. The shared download dialog shows the number of beds and their layouts. Each bed has a numbered 3MF and SVG; print-plan.json records placements. Packing uses the configured printer dimensions, a 2 mm edge margin and 5 mm spacing. Keep positions when importing each 3MF. Verify supports, brim and filament assignments in the slicer; printer profiles are not included. No individual part is cut to
fit a printer; choose plate and tray dimensions that fit your printer.

## Compatibility and attribution

Only the lower mating interface is implemented. There is no stacking lip,
magnet/screw holes, lids, shells or tier connectors in Gridfinity mode. Ordinary
organizer features and its separate 20 mm system remain unchanged.

Gridfinity was created by Zack Freedman / Voidstar Lab LLC. Reference mating
dimensions are adapted from Kenneth Hodson's Gridfinity Rebuilt OpenSCAD under
MIT. See [third-party notices](../THIRD-PARTY-NOTICES.md) and the
[complete MIT notices](../public/licenses/GRIDFINITY-MIT.txt). ReplixGrid is
independent and is not endorsed or certified by Gridfinity's creator.

---

# По-русски

## Несколько плит и разных лотков

Новый проект содержит плиту 4 × 4 и лоток 2 × 2. В **Составе комплекта** выберите
плиту и нажмите **+ Лоток**: появится независимый лоток 1 × 1 на свободном месте.
Выберите его и задайте собственные размеры, цвет и отсеки. **+ Плита** добавляет
соседнюю плиту 4 × 4. Каждую плиту можно напечатать отдельно и поставить рядом
с другой; соединители и склейка моделью не предусмотрены.

Выберите деталь и перетащите её по сетке с шагом 42 мм. Плита перемещается вместе
со своими лотками. Лоток можно перенести на другую плиту мышью или через поле
**Плита для лотка**. Если прежнее место занято, список плит подбирает свободное.
**Положение на сетке** задаёт X/Y в миллиметрах: для плиты — от начала сборки,
для лотка — от начала его плиты. **Повернуть 90°** меняет размещение лотка,
сохраняя его внутреннюю разметку.

**Дублировать** создаёт независимую копию; плита копируется вместе с лотками.
Для копии лотка нужно свободное место на текущей плите. **Редактировать деталь**
открывает выбранную деталь отдельно. Выделяйте пол отсека или его номер,
разделяйте отсек и двигайте перегородки привычными инструментами. Точные размеры
задаются в общем блоке длины/ширины с кнопкой **Применить**. **Весь комплект**
возвращает к размещению деталей.

Пересечения и выход лотка за границы плиты запрещены. Уменьшение плиты,
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

Gridfinity использует ту же раскладку по печатным столам, что и «Ящик», с размерами из существующих настроек принтера. Отступ от краёв — 2 мм, промежуток между деталями — 5 мм. В окне скачивания показываются число столов и схемы. Каждый стол сохраняется отдельным bed-NN.3mf и SVG; print-plan.json содержит координаты. При открытии 3MF сохраняйте расположение деталей. Схема сборки показывает конечное расположение плит и лотков. Крупные детали автоматически не разрезаются.
Профили принтера не передаются. Размеры, филаменты и расположение на столах
проверьте в слайсере.

Шаг основания — 42 мм, высоты — 7 мм. Высота включает опоры; внутренняя глубина
на 7 мм меньше. Толщина стенки 1,2–3 мм, внешний радиус 0–3,75 мм,
внутренний — до 20 мм с ограничением по размеру отсека. Радиусы вертикальных
углов не скругляют стык стенки с дном. Плита имеет высоту 5,95 мм.
Реализована только нижняя посадка: бортика штабелирования, магнитов, винтов,
крышек и оболочек в этом режиме нет. Обычный органайзер остаётся отдельным.

Автор Gridfinity — Zack Freedman / Voidstar Lab LLC. Размеры сопряжения взяты
из MIT-проекта Gridfinity Rebuilt Kenneth Hodson; оба уведомления входят
в экспорт. ReplixGrid — независимый проект без официальной сертификации.

### Проекты и начальный цвет

«Новый проект» запрашивает название и создаёт независимый комплект с одной плитой и лотком. «+ Вариант» создаёт именованную копию текущего комплекта; верхний список показывает только варианты этого проекта. Отдельные проекты открываются через «Мои проекты»: доступны поиск, переименование, скачивание файла и удаление с подтверждением. Удаление записи не удаляет другие варианты и ранее скачанные файлы.

Начальный цвет новых деталей — `#95B9C6`, общий для органайзера, оболочки, ящика и Gridfinity. Сохранённые явно выбранные цвета остаются прежними.

При выборе лотка в общем комплекте справа сразу открываются настройки отсеков. Выберите отсек на модели и разделите его по длине или ширине; перегородки можно выбирать и перемещать прямо на плите. Для перемещения самого лотка потяните его внешнюю стенку. Отдельный вид детали остаётся доступным, но для разделения не требуется.

В предпросмотре контуры отсеков видны у всех лотков, включая невыбранные. Стенки слегка затемнены; цвет контура адаптируется к цвету лотка. Метки T1, T2 обозначают лотки, P1 — плиту, числа внутри выбранного лотка — его отсеки. Эти визуальные подсказки не изменяют геометрию, цвета экспорта или назначение филаментов.

Поворот лотка на 90° сохраняет его положение, если хватает места. Если мешает сосед или край плиты, выбирается ближайшее свободное положение на той же плите. Остальные детали не перемещаются; поворот и сдвиг отменяются одним действием. Если места нет, комплект остаётся без изменений.

### Плавное перемещение

Тяните метку T/P или внешнюю стенку без предварительного щелчка. Деталь плавно
следует за мышью. Зелёная рамка показывает допустимое положение на сетке,
красная — недопустимое. При отпускании на зелёной рамке деталь привязывается
к сетке. Отпускание на красной рамке, Escape или потеря фокуса окна возвращают
исходное положение. Перенос отменяется одним действием; плита переносит свои лотки.

Габариты под настройками относятся к выбранной детали. Положение лотка
отсчитывается от начала его плиты, положение плиты — от начала всего комплекта.
Изменение положения перемещает деталь, но не меняет её размер.
