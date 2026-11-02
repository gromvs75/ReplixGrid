"""Reviewed UI terminology; reapply after updating seed translations."""
import json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]/'src/locales'
langs=['en','de','fr','es','el','it','uk','cs','pl','zh-CN']
terms={
'Форма':['Shape','Form','Forme','Forma','Σχήμα','Forma','Форма','Tvar','Kształt','形状'],
'Отсеки':['Compartments','Fächer','Compartiments','Compartimentos','Θήκες','Scomparti','Відсіки','Přihrádky','Przegródki','分格'],
'Оболочка':['Shell','Hülle','Habillage','Carcasa','Περίβλημα','Rivestimento','Оболонка','Plášť','Osłona','外壳'],
'Вставки':['Inserts','Einsätze','Inserts','Insertos','Ένθετα','Inserti','Вставки','Vložky','Wkłady','内衬'],
'Печать':['Print','Drucken','Impression','Impresión','Εκτύπωση','Stampa','Друк','Tisk','Druk','打印'],
'Принтер':['Printer','Drucker','Imprimante','Impresora','Εκτυπωτής','Stampante','Принтер','Tiskárna','Drukarka','打印机'],
'Свой размер':['Custom size','Eigene Größe','Dimensions personnalisées','Tamaño personalizado','Προσαρμοσμένο μέγεθος','Dimensioni personalizzate','Власний розмір','Vlastní rozměry','Własny rozmiar','自定义尺寸'],
'Вместе':['Assembly','Zusammen','Assemblage','Conjunto','Συναρμολόγηση','Insieme','Разом','Sestava','Razem','组装视图'],
'Органайзер':['Organizer','Organizer','Organiseur','Organizador','Οργανωτής','Organizer','Органайзер','Organizér','Organizer','收纳盒'],
'◈ Объем':['◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 3D','◈ 三维'],
'▦ Сверху':['▦ Top','▦ Oben','▦ Dessus','▦ Superior','▦ Κάτοψη','▦ Dall’alto','▦ Зверху','▦ Shora','▦ Z góry','▦ 俯视'],
'▦ Сетка':['▦ Grid','▦ Raster','▦ Grille','▦ Cuadrícula','▦ Πλέγμα','▦ Griglia','▦ Сітка','▦ Mřížka','▦ Siatka','▦ 网格'],
'мм':['mm','mm','mm','mm','mm','mm','мм','mm','mm','毫米'],
'А':['A','A','A','A','A','A','А','A','A','A'],
'Б':['B','B','B','B','B','B','Б','B','B','B'],
'Одна насадка':['Single extruder','Ein Extruder','Un extrudeur','Un extrusor','Ένας εξωθητής','Un estrusore','Один екструдер','Jeden extruder','Jeden ekstruder','单挤出头'],
'Две насадки':['Dual extruder','Zwei Extruder','Deux extrudeurs','Dos extrusores','Δύο εξωθητές','Due estrusori','Два екструдери','Dva extrudery','Dwa ekstrudery','双挤出头'],
'Только левая насадка':['Left extruder only','Nur linker Extruder','Extrudeur gauche uniquement','Solo extrusor izquierdo','Μόνο αριστερός εξωθητής','Solo estrusore sinistro','Лише лівий екструдер','Pouze levý extruder','Tylko lewy ekstruder','仅左挤出头'],
'Только правая насадка':['Right extruder only','Nur rechter Extruder','Extrudeur droit uniquement','Solo extrusor derecho','Μόνο δεξιός εξωθητής','Solo estrusore destro','Лише правий екструдер','Pouze pravý extruder','Tylko prawy ekstruder','仅右挤出头'],
'Фаска':['Chamfer','Fase','Chanfrein','Chaflán','Λοξότμηση','Smusso','Фаска','Zkosení','Faza','倒角'],
'Горка':['Sloped','Ansteigend','En pente','En pendiente','Κεκλιμένο','Inclinato','Гірка','Svažující se','Pochyły','斜坡'],
'Соты':['Honeycomb','Waben','Nid d’abeille','Panal','Κηρήθρα','Nido d’ape','Стільники','Plástev','Plaster miodu','蜂窝'],
'Крышка':['Lid','Deckel','Couvercle','Tapa','Καπάκι','Coperchio','Кришка','Víko','Pokrywka','盖子'],
'Сохранить проект':['Save project','Projekt speichern','Enregistrer le projet','Guardar proyecto','Αποθήκευση έργου','Salva progetto','Зберегти проєкт','Uložit projekt','Zapisz projekt','保存项目'],
}
for i,lang in enumerate(langs):
 p=root/(lang+'.json');d=json.loads(p.read_text())
 for source,values in terms.items():d[source]=values[i]
 # Configurations share terminology with the printer selector.
 d['Quick Swap · одна насадка']='Quick Swap · '+d['Одна насадка']
 d['Quick Swap · две насадки']='Quick Swap · '+d['Две насадки']
 for mark in ['А','Б']:
  for key in list(d):
   if key.startswith(mark+' ·'):d[key]=d[mark]+' · '+d[key].split('·',1)[-1].strip()
 if lang=='en':
  d.update({'Ровный':'Flat','Вставка в отсек':'Compartment insert','Настроим отсек':'Compartment settings','до наклона · мм':'before tilt · mm','Ширина стола':'Build width','Глубина стола':'Build depth','Высота печати':'Build height','Глубина выреза':'Cutout depth','Сохранено в этом браузере':'Saved in this browser','Сохраняем…':'Saving…','Шаблон готов. Выберите стенку или отсек, чтобы изменить его.':'Template ready. Select a wall or compartment to edit it.','↶ Все изменения можно отменить':'↶ All changes can be undone','Простые заготовки':'Basic templates','Заменит конструкцию. Можно отменить ↶.':'Replaces the current design. You can undo this ↶.','Край отсека слишком низкий для вставки. Поднимите его.':'The compartment rim is too low for an insert. Increase its height.','Кайма':'Border','Стол':'Build volume','Внешний контур':'Outer contour','Отмена':'Cancel','Перегородка':'Divider','Подпись и значок':'Label and icon','Рельеф органайзера':'Organizer relief','Скругление':'Rounded','Выраженность':'Relief height','Глубина':'Depth','Толщина стенок':'Wall thickness','Готовые сценарии':'Presets','Обычный / резервный режим':'Normal / backup mode','Одна насадка · без Quick Swap':'Single extruder · without Quick Swap','Ярусы':'Tiers','Выпуклая':'Embossed','Утопленная':'Engraved','Прямой':'Straight','Волнистый':'Wavy','Лепестки':'Petals','Проверка и скачивание':'Check and download'})
 if lang=='de':
  d.update({'Печать по частям':'In Teilen drucken','левого':'linken','переднего':'vorderen','края':'Rand','Вернуть цельную модель':'Als Ganzes drucken','↓ Образец защёлки':'↓ Teststück für Rastverbindung','Как напечатать образец':'Teststück drucken','Раздвинуть части':'Teile auseinanderziehen','Швы:':'Trennstellen:','мм от':'mm vom','Вставка в отсек':'Facheinsatz','Форма органайзера':'Form des Organizers','Рельеф органайзера':'Oberflächenrelief','Выраженность':'Reliefhöhe','Скруглённый':'Abgerundet','Проверка и скачивание':'Prüfen und herunterladen','Одна насадка · без Quick Swap':'Ein Extruder · ohne Quick Swap','Части помещаются с защёлками. Возможен поворот на столе на 90°.':'Die Teile passen einschließlich der Rastverbindungen auf die Druckplatte, gegebenenfalls um 90° gedreht.','Введите область печати вашего принтера. Места разрезов и защёлок подберём сами.':'Geben Sie den Bauraum Ihres Druckers an. Trennstellen und Rastverbindungen werden automatisch platziert.'})
 if lang=='zh-CN':
  d.update({'Настроим отсек':'分格设置','Вставка в отсек':'分格内衬','Браузерная мастерская · ранний MVP':'浏览器设计工作室 · 早期版本','Фон — поворот · колесико — масштаб · правая кнопка — сдвиг':'拖动背景旋转 · 滚轮缩放 · 右键拖动平移','Большие вещи или маленькие?':'要收纳大物件还是小物件？','Разделите пространство под них.':'按物件大小划分空间。','Без выреза':'无缺口','Вырез в стенке':'侧壁缺口','Скругление':'圆角','Ровный':'等高','Ступеньки':'阶梯','Основа':'底部形状','Профиль высоты':'高度轮廓','до наклона · мм':'倾斜前 · 毫米','Выраженность':'浮雕高度','Сохранено в этом браузере':'已保存在此浏览器中','мм внутри':'毫米（内部）','мм длина':'毫米（长度）','мм от':'毫米，距','по ширине':'沿宽度','по глубине':'沿深度','Разделить':'分割','Ярусы':'层数','Край стенки':'侧壁顶边','Подпись и значок':'文字与图标','Выпуклая':'凸字','Утопленная':'凹字','Одна насадка · без Quick Swap':'单挤出头 · 无 Quick Swap','Сейчас доступны без разделения для печати.':'目前不支持与分件打印同时使用。','нет':'无','не выбрана':'未选择','один лоток':'单层','Толщина стенок':'壁厚','Толщина дна':'底厚','Высота букв':'字高','Глубина гравировки':'雕刻深度','Общая высота':'总高度','Ширина':'宽度','Глубина':'深度','Проверка и скачивание':'检查并下载','Печать по частям':'分件打印','СБОРКА':'组装','Внешний контур':'外轮廓'})
 if lang=='zh-CN':
  d.update({'Размеры':'尺寸','Форма органайзера':'收纳盒形状','Форма перехода':'过渡形状','Форма шаблона':'模板形状','Форма вставки':'内衬形状','Цвет органайзера':'收纳盒颜色','Рельеф органайзера':'收纳盒浮雕','МОЙ ОРГАНАЙЗЕР':'我的收纳盒','ИДЕЯ ДЛЯ ФОРМЫ':'形状灵感','Обновляем форму…':'正在更新模型…','Повторяет высоты и переходы органайзера':'跟随收纳盒的高度和过渡轮廓','Простые заготовки':'基础模板','Скруглённый':'圆角矩形','Круг':'圆形','Заменит конструкцию. Можно отменить ↶.':'将替换当前设计，可撤销 ↶。','↶ Все изменения можно отменить':'↶ 所有更改均可撤销','Вставки пока доступны без разделения для печати.':'内衬目前不支持分件打印。','Пока доступно без разделения для печати.':'目前不支持分件打印。','Наклонное основание печатается целиком. Отключите наклон для разделения.':'倾斜底座需整体打印。请关闭倾斜后再分件。','Выбор задаёт только область печати. Проверьте конфигурацию головки и Quick Swap; пластик и режим печати выбираются в слайсере.':'此选项仅设置打印空间。请核对打印头和 Quick Swap 配置；耗材与打印参数需在切片软件中选择。','Дно остаётся горизонтальным, его толщина не меняется. Стенки наклоняются вперёд без клина снизу. Отсеки и стенки можно выбирать на модели или в правой панели. Печать целиком; необходимость поддержек проверьте в слайсере.':'底面保持水平且厚度不变，侧壁向前倾斜，底部不添加楔形块。可在模型或右侧面板中选择分格和侧壁。模型需整体打印；请在切片软件中检查是否需要支撑。'})
 p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
(root/'catalogs.json').write_text(json.dumps({l:json.loads((root/(l+'.json')).read_text()) for l in langs},ensure_ascii=False,separators=(',',':'))+'\n')
