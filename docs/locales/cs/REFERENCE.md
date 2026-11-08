<a id="replixgrid-user-guide"></a>
# Uživatelská příručka ReplixGrid

Navrhněte organizér s rozměry v milimetrech, ověřte, zda díly pasují, a stáhněte je pro slicer. Pro začátek použijte ilustrovaný příklad kapsle v rychlém startu. Tato příručka popisuje jednotlivá nastavení.

[Otevřít ReplixGrid](https://grid.replixcast.com/?lang=cs) · [Rychlý start](USER-GUIDE.md) · [Místní instalace](../../../README.md#local-installation)

| Části příručky |
| --- |
| [Pracovní plocha a pohledy](#workspace-and-views) |
| [Tvar a rozměry](#shape-and-dimensions) |
| [Přihrádky a přepážky](#compartments-and-dividers) |
| [Výška stěn a výřezy](#wall-heights-and-cutouts) |
| [Rohy, hrany a dekorace](#corners-edges-and-decoration) |
| [Vložky, patra a víka](#inserts-tiers-and-lids) |
| [Jednodílné pláště a panely](#sleeves-and-panels) |
| [Projekty a zálohy](#projects-and-backups) |
| [Nastavení tisku a rozdělení na části](#print-setup-and-sectioning) · [Stažení a příprava ve sliceru](#download-and-slice) |
| [Varianty projektu](#project-variants) · [Sdílené styly](#shared-styles) |
| [Uspořádání organizérů v zásuvce](#drawer-arrangements) · [Montážní desky](#mounting-plates) |
| [Vlastní reliéf SVG](#custom-svg-relief) · [Studio vzorů](#pattern-studio) |
| [Export celé zásuvky](#whole-drawer-export) |
| [Řešení problémů](#troubleshooting) |

<a id="start-a-new-project"></a>
## Zahájení nového projektu

Při prvním spuštění je pracovní plocha prázdná. Průvodce vlevo nabízí tři kroky: **Vyberte tvar → Nastavte rozměry → Přidejte přihrádky**. Vyberte tvar, nastavte rozměry a klikněte na **Dále: přihrádky**. Dokončete tlačítkem **Hotovo** nebo **Ponechat bez přepážek**. Po výběru tvaru lze průvodce zavřít tlačítkem **×**. Můžete také otevřít uložený projekt nebo soubor JSON.

**Na malých obrazovkách:** při šířce okna prohlížeče nejvýše 1400 px se průvodce zobrazí **pod modelem**, aby nezakrýval náhled. Posuňte **stránku dolů**, abyste se dostali k průvodci, dalším krokům a tlačítkům pro přechod k přihrádkám a dokončení. Pro zobrazení modelu posuňte stránku zpět nahoru. V širších oknech zůstává průvodce vedle levé nabídky.

Průvodce znovu otevřete přes **Nápověda → Průvodce: tři kroky**. Samotné otevření model nemění. Výběr jiného tvaru nahradí aktuální model; tuto akci lze vrátit zpět.

Rychlý start, příručka i nabídka nápovědy používají zvolený jazyk rozhraní. Video zůstává v angličtině.

Kroky, rady i potvrzení v průvodci jsou přeloženy. Řádek uloženého modelu se jmenuje **Předchozí projekt**. Skutečné názvy v **Moje projekty** zůstávají takové, jaké jste uložili.

Použití **Nový projekt** v horní liště se vrátit k tomuto čistému startu. Vaše současná práce je uložena jako první; nejmenovaný návrh je zachován v **Moje projekty**. Stávající projekty, varianty, sloty vláken a konfigurace tiskárny se nezruší. Na panelu je označen miniaturní náhled. **Předchozí projekt** s **Uloženo v „Mých projektech“** Kliknutím na tento řádek znovu otevřete svou knihovnu. Plachta je okamžitě vyčištěna a zůstává prázdná, dokud si nevyberete nový tvar, stejně jako při první návštěvě. Dokud si nevyberete nový tvar, uložení a export jsou zakázány. Místo toho můžete otevřít projekt od **Moje projekty** nebo dovézt JSON Složka. Obnovení této karty empty- start udržuje úvodní obrazovku; znovuotevření stávajícího projektu obnoví model. Obyčejné zpáteční návštěvy pokračují v práci.

Výběr **Tvar → Warp → Vytvořit ze šablony** při úpravě stále nahrazuje výstavbu v rámci stávajícího projektu a lze ji odčinit. Použití **Nový projekt** když chceš samostatný model.

<a id="workspace-and-views"></a>
## Pracovní plocha a pohledy

Otevřete nástroj v levé horní části. **Tvar** mění tělo a jeho příslušenství. **Přihrádky** změní rozložení. **Plášť** navrhuje samostatný vnější kryt. **Tisk** nastavuje tiskový prostor, drážky vlákna a volitelné řezné řezy. Kliknutím na políčko číslo, zeď nebo dělič na modelu otevřete jeho nastavení vpravo. Pokud se část je těžké kliknout, expandovat **Všechny stěny a přihrádky** a vyberte ho podle jména.

Vyberte sekci v levé nabídce. Její nastavení se otevře v plovoucím panelu ve spodní části náhledu; model a mřížka zůstávají viditelné za ním. Panel doplňuje levou nabídku. Šipka jej sbalí a **×** zavře. Jinou skupinu nastavení otevřete výběrem další sekce. Pravý panel dál zobrazuje nastavení vybrané stěny nebo přihrádky.

Tažením za pozadí model otočíte, kolečkem změníte přiblížení a tažením pravým tlačítkem posunete pohled. **Vraťte fotoaparát** obnoví výchozí záběr. **Shora** usnadňuje výběr úzkých přihrádek a posouvání přepážek; **3D** ukazuje výšky a sestavu. **Mřížka** zapíná mřížku s krokem 10 mm a hlavními čarami po 50 mm. Tlačítka nad modelem zobrazují zvlášť organizér, vložky, plášť nebo víko; **Sestava** zobrazí dostupné díly společně. U více pater otevřete nabídku vedle **Organizér**: **Zobrazit zásobník** ukáže celou sestavu, číslo patra otevře dané patro k úpravě. Dolní editor zůstává otevřený. V pohledu na celou sestavu zahrnují **Plášť** a **Vložky** díly všech pater. V úzkém okně se tlačítka přesunou pod nástroje. U samostatně zobrazeného víka ukáže **Zespodu** jeho spodní stranu. **Esc** zavře panel nástroje. Zakřivené šipky slouží k vrácení a opakování změn.

Použijte horní lištu pro volbu jazyka rozhraní nebo přepínání mezi světlým, tmavým a systémovým vzhledem. Řídicí názvy v této příručce postupujte podle zvoleného jazyka rozhraní.

<a id="shape-and-dimensions"></a>
## Tvar a rozměry

Pod **Tvar → Warp**, vyberte základní a výškový profil, pak klepněte na tlačítko **Vytvořit ze šablony**. Tlačítko nahrazuje aktuální konstrukci. Pokud si chcete nechat oba návrhy, nejprve si uložte jmenovanou kopii. **Jednoduché polotovary** také nabízí prázdné tělo a čtyřkompartmentový výchozí bod.

| Základ | Kdy si ho vybrat |
| --- | --- |
| Zaokrouhleno | Obdélníková stopa s nastavitelnými vnějšími rohy. |
| Tobolka | Dlouhé tělo s půlkruhovými konci. Sklápěcí šablona přenáší sklon přes oba zakřivené konce. |
| Kruh | Kulatý organizér o průměru. |
| Oval | Protáhlý zakřivený obrys s nastavitelnou šířkou a hloubkou. |
| Honeycomb | Shluk šestiúhelníkových buněk, které sdílejí stěny. Vyberte buňku pro nastavení výšky. |

Vyberte **Hladký** pro úrovňový okraj, **Svažující se** pro průběžné zvýšení nebo **Stupně** pro odlišné úrovně výšky. Rozměry pod volbou popisují šablonu, kterou hodláte vytvořit. Po vytvoření, upravit model pod **Rozměry**. Šířka a hloubka měří vnější stopu. Při velikosti objektu použijte vnitřní rozměry vybraného prostoru. Na zakřivené základně, také zkontrolovat zúžení končí v **Shora** Pohled.

![Sklápěcí kapsle s nízkým koncem pro přístup, vysoký konec pro dlouhé položky a dva příčné děliče](../../images/capsule-sloped.jpg)

V **Tvar** → **Dodatečné** nastavíte tloušťku stěn a dna. Silnější stěny zmenšují místo v přihrádkách. **Nakloňte na rovnou základnu** nakloní stěny dopředu až o 25°, přičemž dno zůstane vodorovné. Svažující se horní okraj naopak mění výšku stěn podél těla. Při zapnutém náklonu ověřte konečné vnější rozměry v okně stahování.

<a id="exact-internal-dimensions"></a>
## Přesné vnitřní rozměry

Vyberte přihrádku a otevřete **Vnitřní rozměry** vpravo nebo klikněte na modrou kótu v modelu. Zvolte šířku či hloubku a zadejte milimetry. Kliknutí mimo pole nebo **Enter** hodnotu potvrdí, **Escape** ji zruší. V pravém panelu použijte **Použít**. Neplatné hodnoty model nezmění. Každou potvrzenou změnu lze vrátit jedním krokem.

Pomerančový dělič je jeho aktuální polohou; ponořená modrá čára předpovídá novou polohu. Nejbližší uzavírací příčka na zvolené ose se pohybuje tak, aby vnější velikost těla a tloušťka stěny zůstala beze změny. Obraz ukazuje zasažené sousední velikosti. Pokud na této ose není žádný dělič, upravte celkové rozměry nebo nejprve rozdělte prostor.

V jednoduchém řádku, začít s oddílem 1 a pokračovat v pořadí; poslední přihrádka bere zbytek. Sousední rozměry nejsou zamčené, takže editace starší přihrádka může změnit velikost pozdější.

Podporovány jsou zaoblené rohy, kapsle, zkosení a vnitřní zaoblení. Modrá čára měří vnitřní rozměr středem přihrádky těsně nad dnem. U zakřivení může být místa méně: ponechte vůli a zkontrolujte celý obrys předmětu. Přesná úprava přihrádek zatím není dostupná pro kruhy, ovály, voštiny ani nakloněné stěny.

Vyberte stěnu nebo dělič pro úpravu její výšky přímo na modelu. Ploché stěny ukazují jednu hodnotu; dvoubodové profily ukazují A / B hodnoty. Linked- výška a stepded- wall pravidla odpovídají pravé panelu. Tyto štítky editují výšku, ne délku stěny nebo celkovou tloušťku.

<a id="compartments-and-dividers"></a>
## Přihrádky a přepážky

Pro rychlé rozložení použijte **Přihrádky → + Přihrádka** k rozdělení největší přihrádky. **- Přihrádka** Spojuje sousední pár. Ve voštinovém plástu tyto ovládací prvky přidávají nebo odstraňují vnější buňku a zachovávají velikost ostatních. Dvě sousední voštinové buňky sdílejí zeď tak vysokou, jako je ta vyšší.

Pro přesné rozložení přepněte na **Shora** a vyberte prostor, který chcete rozdělit. Vyberte **Počet dílů**, pak **Rozdělit na šířku** k rozdělení šířky do užších oddílů, nebo **Rozdělit do hloubky** aby udělali mělčí. Můžete si znovu rozdělit jeden z výsledků. Pro tužkové pole vedle dvou malých podnosů, nejprve rozdělit šířku na dvě, pak rozdělit pouze na straně podnosy do hloubky.

![Top- view příklad s jedním plným hloubkovým zálivem a dvěma menšími oddíly](../../images/compartment-splits.svg)

Vyberte dělič přetáhnout, nebo upravit **První přihrádka** v rámci **Pozice oddílu**. Pouze zvolený dělič se pohybuje; ostatní dělicí pozice zůstávají pevné. Přilehlé přihrádky mění velikost. Pohyby, které zanechávají příliš málo místa, jsou zamítnuty. Zkontrolujte nové vnitřní rozměry na každé straně. **Odebrat oddíl** kombinuje přihrádky a může také odstranit děliče vnořené uvnitř tohoto rozdělení. Prohlédněte si zvýrazněný výběr a potvrzení před jeho odstraněním.

<a id="wall-heights-and-cutouts"></a>
## Výška stěn a výřezy

Vyberte vnější stěnu nebo přepážku. **Jedna výška** vytvoří stejně vysoký okraj; **Dva body** nastaví výšky konců A a B označených v modelu. **Přímo**, **Zvlněný** a **Cikcak** určují průběh hrany. Vlnová délka nastavuje rozestup opakování. U stupňovité šablony změna stupně upraví i připojenou stěnu a přepážku.

Použití **Spojte výšky sousedních stěn** aby vnější zeď následovala sousedy. Pro dělič, **Připevněte k přilehlým stěnám** Zkopíruje obě koncové výšky jednou. Opakujte fit po změně sousedních stěn. **Jako ostatní** vrací vybranou stěnu do společné výšky.

Otevřít **Nástěnný výřez** aby se dostal do průlomu. Vyberte hladký kopeček, půlkruh nebo obdélníkový otvor, nastavte šířku a hloubku a pak ji pohybujte podél stěny. Pozice běží od konce A do B. Hloubka se měří směrem dolů od horního okraje. Zkontrolujte zbývající ret nad dnem. Vyberte **Žádný výřez** Zaplnit otvor. Honeycomb místo toho používá výšku buňky. Uříznuté kruhy a ovály nepodporují odřezky ve vnějších stěnách.

<a id="corners-edges-and-decoration"></a>
## Rohy, hrany a dekorace

Otevřít **Tvar → Rohy a zkosení**. Tři ovládací prvky ovlivňují různé části tisku.

| Kontrola | Kde hledat | Co se změní |
| --- | --- | --- |
| Vnější rohy | Horní pohled, vnější obrys | Okolo rohů stopy nebo nakrájet na 45 °. Nula dává čtvercový roh. K dispozici na obdélníkové rodině základen. |
| Radius uvnitř oddílů | Horní pohled, uvnitř zálivu | Objíždí vertikální křižovatku, kde se setkávají dvě stěny. Těsné zátoky omezují dostupné poloměry. |
| Horní okraj stěn a děličů | Křižovatka skrz zeď | **Zkosení** krájí se plochá souprava a **Filé** Zakřivení rtu. Obě strany vnějších stěn a děličů se dostanou do cíle. **Bez úpravy** obnovuje čtvercový ret. |

![Nástěnné kříže zobrazující čtvercové, ostnaté a zaoblené horní rohy se stejnou tloušťkou stěny](../../images/top-edge-profiles.svg)

Například na stěně 2 mm zkuste lom 0,5 mm. Každá strana ztrácí 0,5 mm na samém vrcholu, takže 1 mm plochý pás. Maximální zobrazená velikost závisí na tloušťce stěny. S **Filé**, Hodnota je poloměr v milimetrech.

- **Barva organizéru** mění náhled a vývoz schopný barvy. Vyberte si vzorek, vlastní barvu nebo konfigurovanou barvu vlákna. Přiřadit skutečný slot vlákna při vývozu.
- **Spodní lem** přidává projekční skupinu kolem základny. Vyberte hladký, pruhované nebo stepový střih a nastavte jeho výšku. Kompatibilní rukáv si na něm může odpočinout. Trim vyžaduje netkané, jednodílné tělo a je k dispozici v prvním patře. Samostatné panely sedí nad ním s vybranou hranou ofsetu.
- **Úleva pořadatele** přidává zvýšený vzor přímo k vnější stěně. Posuňte katalog vzorů, nastavte velikost vzoru a reliéfní výšku a sledujte aktualizaci modelu při přetažení při každém dokončení výpočtu. Konečná hodnota používá plnou přesnost. Uvnitř zůstává hladký. Projekce zvyšují vnější rozměry. Vyberte **Hladký** Odstranit reliéf.
- **Podpis a odznak** umístí písmo nebo symbol na zvolenou stranu. Zadejte text, vyberte font, nastavte výšku písmen a vertikální polohu, pak zvolte zvýšený zápis nebo gravírování a nastavte jeho výšku nebo hloubku. Hvězda nebo srdce mohou doprovázet text. Na kruhových a oválných organizátorů, text a ikony sledovat zakřivené stěny, včetně STL a 3MF vývoz. Rozteč písmen se měří podél povrchu. Vyberte přední, zadní, levá nebo pravá ke středu nápisu na této straně. Na kruzích a oválech s propojenými nebo proměnnými výškami stěn zůstává zápis pod nejnižším profilem stěny a výřezem. Psaní plášťů ještě není podporováno; skořepiny pokrývající zvolenou stranu a reliéf mohou také zabránit psaní. Psaní plochých stěn stále vyžaduje trvalý výškový profil. Pokud se nápis dostane do výřezu nebo překročí dostupnou tvář, zmenšte pozici nebo zmenšte velikost písmene.

<a id="inserts-tiers-and-lids"></a>
## Vložky, patra a víka

**Vyjímatelné vložky.** Vyberte přihrádku a otevřete **Přihrádková vložka** vpravo. **Prázdné** vytvoří otevřenou nádobku, **Pro maličkosti** mřížku s nastavitelnými řádky a sloupci a **Pro rukojeti** otvory pro pera nebo nástroje. Zadejte vnitřní průměr otvorů; aplikace jich rozmístí tolik, kolik se vejde. Vyberte obrys podle přihrádky, zaoblený, kruhový, oválný nebo šestiúhelníkový a barvu. **Vyjměte vložku** vložku odstraní. I prázdná vložka je tisknutelný díl.

Vložka následuje po své přihrádce s clearance nejméně 0,5 mm. Jeho stěny a dno mají tloušťku 1,2 mm a jeho výška se přizpůsobuje přibližně 1 mm pod okrajem. Na svahu se objeví vložka v šikmém pořadateli. Izolovat **Vložky** zkontrolovat je a pak vyvážet **Organizér a příslušenství**. Vložení vyžaduje jednodílný tisk.

**Skládané podnosy.** Začněte s úrovňovým ráfkem, pak otevřete **Tvar → úrovně → + Tier**. Můžete použít dvě až pět úrovní. **- Úroveň** Odstraňuje úroveň. Prvky sdílejí stopu, ale mohou mít různé oddíly, výšky, barvy a dekorace.

1. # In the dropdown beside # **Organizér** nad modelem, vybrat **Patro 1**, **Patro 2** Nebo jiný stupeň. Tato úroveň je zobrazena na vlastní pěst a aktuální editor nastavení zůstává otevřený.
2. Upravte zvolenou úroveň s obvyklým tvarem, prostorem, reliéfním a shellovým ovládáním. Změna úrovně nekopíruje její nastavení na jiné úrovně.
3. Vyberte **Zobrazit zásobník** ve stejném pádu pro kontrolu všech úrovní a příslušenství dohromady. Použití **Sestava**, **Organizér**, **Vložky**, **Plášť** nebo **Víko** ukázat součástky, které potřebujete. Vraťte se na číselnou úroveň a pokračujte v její úpravě.
4. V **Tvar** → **úrovně** nastavte **Montážní vůle** a ověřte spojení na malé zkušební části před tiskem celé sestavy. Snižte přepážky, které vyčnívají nad okraj. Stohování vyžaduje svislé stěny a souvislý opěrný okraj.

Built- in a SVG reliéf zdobí exteriér každé úrovně, zatímco pářící obojky, jazyky a zásuvky zůstávají hladké. Obalené pláště a dekorativní panely mohou pokrývat jednotlivé úrovně. Pro panely, ponechejte **Odsazení okraje** alespoň 3 mm, aby vyčistili pářící obojky.

U obvodového pláště zapadá výstupek uvnitř spodní stěny do drážky pod dnem horního patra. Využitelná šířka, hloubka a výška přihrádek se nemění; každá drážka přidává 2,2 mm k vnější výšce sestavy. Pláště se stýkají na opěrném pásku širokém 0,8 mm. Nasouvají se shora, proto před sejmutím oddělte patra. Každý plášť se exportuje zvlášť s číslem patra.

**Spodní lem** je k dispozici pouze na první (nejnižší) úrovni: zvolte hladké, kroužky nebo kroky. S kompatibilní obalené pláště, lemování také podporuje skořápku. Samostatné panely sedí nad lemem s zvoleným offsetem hrany. Nové horní úrovně nezdědí střih. Pokud se jazyk nemůže vejít do tloušťky stěny, snížit **Montážní vůle**; aplikace automaticky nezhoustne stěnu. U obou rohů musí zůstat dostatek materiálu, aby podpíral tác nad ním.

**Víko.** Otevřete **Tvar** → **Víko** a klikněte na **+ obálka**. Horní okraj musí mít stejnou výšku a přepážky nesmějí vyčnívat. Náklon, voštiny a dělený tisk nejsou slučitelné s víkem. **Vnější** překrývá vnější okraj; **Zapuštěné** je deska 2 mm zapuštěná do roviny horní hrany. Její osazení má vůli 0,35 mm na každé straně a ponechává místo nad přepážkami a vložkami. Vyžaduje stěny alespoň 2 mm a vnitřní hloubku 4 mm. Pro zvedání přidejte výřez nebo úchyt. Vnější víko má vodicí okraj s vůlí 0,5 mm. Nastavte vzor, velikost, hloubku, výšku okraje a jeho úpravu. Úchyt může být válcový či podlouhlý, s nastavitelnou velikostí, výškou, zkosením a zaoblením. Tiskne se zvlášť a přilepí se. Náhled ukazuje vnější víko zvednuté a vnitřní usazené. Export položí víko naplocho pro tisk.

**Dvoubarevný vzor** je dostupný pro oba typy víka. Vyberte olivovou větvičku, listy jinanu, kapradinu, vlny, říční oblázky, letokruhy nebo Voroného buňky a barvy podkladu i vzoru. Deska 3,2 mm má plný podklad 1,6 mm a vzorovanou vrstvu 1,6 mm. Vnější okraj a úchyt zvětšují celkovou výšku. Zapuštěné víko potřebuje vnitřní hloubku alespoň 5,2 mm. Exportujte 3MF, aby obě barevné části zůstaly spolu, a přiřaďte filamenty. Pro olivu, jinan, kapradinu, vlny a letokruhy vytváří **Prořezávaný vzor** otvory v horní vrstvě. **Vystouplý vzor** je nechává prázdné do hloubky 1,6 mm a odhaluje podklad; vypněte jej pro hladkou vložku. Zapuštěná reliéfní víka se tisknou podkladem dolů, vnější víka vzorem dolů. Ve sliceru zkontrolujte mosty nad prohlubněmi.

![Šest dvoutónových víček](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Jednodílné pláště a panely

Otevřít **Plášť** a vyberte vzor. Schránka je vytištěna odděleně od organizéru. Pokud chcete vzor na těle samotném, použijte **Tvar → Úleva pořadatele**.

| Režim Shell | Montáž a montáž |
| --- | --- |
| **Kolem těla** | Jeden bezedný rukáv následuje po obvodu a výšce stěny. Posuňte ho po těle shora, po směru stěny na nakloněný model. Obraz ukazuje, zda je na stole podpěra nebo rukáv. |
| **Dekorativní panely** | Samostatné zarámované panely pokrývají vybrané strany a zanechávají odkryté rohy. Vyberte si strany a upravte **Odsazení okraje**. Lepicí panely bez upevnění. Se skrytými kolíky přitlačte každý panel přímo na odpovídající stěnu pro trvalé připevnění. |

![Vrchní pohled na rukáv, který zabaluje rohy a samostatné panely končící před každým rohem](../../images/shell-fit.svg)

Vyberte vzor, nastavte jeho velikost a nastavte **Tloušťka pláště**. Pro jednodílné pouzdro, seřídit **Šířka lemu** pro jeho pevný rám. Dekorativní panely mají pevný rám; použití **Odsazení okraje** Postavit je na zeď. Pod **Přistání**, **Mezera na každé straně** nastavuje mezeru mezi rukávem a organizátorem. Mezera 0,5 mm na každé straně přidává 1 mm na dvě protilehlé strany, než počítáte tloušťku skořepiny. Porovnat **Sestava** s izolovaným **Plášť** aby posoudil výsledek. **↓ Stáhnout shell** vývoz krycího materiálu odděleně a **Odstraňte plášť** Odstraní to z návrhu.

Panely potřebují kompatibilní obdélníkovou základnu. Jejich výběr nemění tloušťku stěn ani místo v přihrádkách. Skryté úchyty vyžadují stěny alespoň 3,2 mm bez reliéfu. U tenčích stěn, včetně 2,4 mm, použijte panely bez úchytů a přilepte je. Stěny se automaticky nezesilují. Odsazení panelu určuje vzdálenost od hrany plochy, vůle obvodového pláště určuje jeho nasouvání. Se spodním lemem se dolní odsazení měří od jeho horní hrany; úchyty a otvory sledují stejný profil. U pater ponechte alespoň 3 mm odsazení, aby panely nekolidovaly s dosedacími okraji.

<a id="projects-and-backups"></a>
## Projekty a zálohy

Použití **Moje projekty → Uložit kopii** pojmenovat návrh nebo vytvořit variantu před experimentem. Otevřený projekt automaticky ukládá do tohoto prohlížeče. Knihovna umožňuje vyhledávání, otevírání, přejmenování, mazání nebo stahování projektu. **Uložit projekt** v horním baru ke stažení editovatelné JSON Záloha. Použití **Otevřít** načíst tento soubor, včetně jiného počítače nebo v místní instalaci.

Zadané edity jsou okamžitě uloženy. Dočasná lokální obnovovací kopie chrání změny, zatímco databáze prohlížeče je ukládání; znovuotevření obnoví, že kopie v případě, že byl přerušen zápis. Samostatný naposledy úspěšný snímek může obnovit poškozenou aktuální relaci, včetně historie zrušení. Pokud není možné obnovit platnou kopii, automatické ukládání zastaví místo nahrazení uloženého projektu startérem. Udržujte stažitelné zálohování JSON: vymazání dat prohlížeče nebo selhání obou úložišť nelze obnovit automaticky.

Kontroly exportu patří do současné revize projektu, vybraných částí a montážní polohy. Změna těchto neplatnosti předchozí kontroly, starý výsledek nelze stáhnout jako nový model. Neúspěšné výpočty zachovají úpravy. Po dvou minutách se objeví chyba, další úprava geometrie spustí nový výpočet.

Pokud je stejný projekt nebo zásuvka editována ve více kartách, jsou protichůdné změny uloženy jako samostatný **Copy from another tab**. Druhá verze je uchována a editační záložka pokračuje s její kopií. Porovnat verze v **Moje projekty** nebo volič zásuvky a přejmenovat kopii, pokud si ji chcete nechat. Obnovení karty organizátora obnoví svůj vlastní uložený projekt. Změny se mezi kartami automaticky neslučují.

Před čištěním dat prohlížeče si uchovejte staženou zálohu. Každý prohlížeč a adresa stránky má svou vlastní knihovnu. Filtrační sloty jsou uloženy samostatně pro tiskárnu v prohlížeči. Nastavte je znovu při přesunu do jiného zařízení. Pro stažitelnou lokální aplikaci viz [Místní instalace](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Nastavení tisku a rozdělení na části

Pod **Tisk**, vyberte si tiskárnu a konfiguraci hlavy nebo vyberte **Vlastní rozměry**. Zkontrolujte šířku, hloubku a výšku konstrukce. Preset dodá objem výroby. Vyberte si tiskárnu, trysku, materiál a řezné profily ve vašem sliceru.

Pokud model přesahuje tiskovou podložku, použijte navržené řezy nebo zvolte dvě či tři části, jsou-li dostupné. Spoje zkontrolujte pomocí **Odsuňte díly od sebe**. Rozdělení zvětší tloušťku stěn alespoň na 5 mm a dna na 3 mm; znovu ověřte vnitřní rozměry. Před rozdělením odstraňte pláště a vložky. Patrové, nakloněné, kruhové, oválné a voštinové modely je nutné tisknout vcelku. **Vraťte celý model** rozdělení vypne. Chcete-li obnovit původní rozměry, znovu zkontrolujte tloušťky.

**↓ Joint sample** stažení páření končí vyzkoušet ve stejném měřítku a nastavení tisku jako konečné tělo. Umístěte je odděleně s jejich základnou dole. Po ochlazení se kolíky o jmenovité hodnotě Ø 3,2 × 8 mm vejdou do otvorů Ø 3,3 mm, na každé straně švu hluboké 4,5 mm. Zkontrolujte zarovnání, pak použijte čepy a lepidlo pro sestavení tištěných sekcí. Použití **↓ Stáhněte si všechny díly** pro samotného organizátora.

<a id="download-and-slice"></a>
## Stažení a příprava ve sliceru

1. V **Tisk** → **Slicer filaments** nastavte stejná čísla a barvy jako ve sliceru. U Snapmaker U1 odpovídají sloty 1–4 hlavám T0–T3. Lze nastavit až 16 slotů s barvou a názvem materiálu. Barva je přibližná orientační pomůcka, nikoli simulace vytištěného nebo smíchaného odstínu; přesné směsi nastavte ve sliceru. Vyberte kartu a klikněte na **Delete filament from slot N** pro odstranění filamentu. Ostatní čísla se nemění: po odstranění slotu 6 zůstává slot 7 číslem 7. **+ Slot N** znovu použije nejnižší volné číslo; limit zůstává 16. Odstranění nemění barvu modelu. Odstraněné sloty se při exportu nenabízejí ani automaticky nepřiřazují; vyberte jiný nebo jej přiřaďte ve sliceru. Různé barvy umožňují automatické párování. Mají-li dva sloty stejnou barvu, vyberte správný pro každý díl v okně stahování.
2. Kliknout **↓ Stáhnout**. Vyberte **Organizér a příslušenství**, **Pouze plášť** nebo **Celá sada** Podle toho, které části potřebujete. Pro rozdělený model, exportujte soupravu.
3. Vyberte níže uvedený formát. Pro 3MF, přiřaďte vlákno slot na každou část nebo jej nechte pro přiřazení v sliceru. Orca může použít první vlákno pro nepřidělené části.
4. Čekat na geometrii a velikost kontroly. Přečtěte si rozměry každé části a jakékoli instrukce otočit 90 ° na tiskové podložce. Kontrola si vyhrazuje 2 mm na tiskové podložce hrany. Stáhnout s formátem tlačítko v dolní části dialogu.
5. Otevřete výsledek ve vašem slicer na **100% stupnice v milimetrech**. Uspořádat kompletní sadu, zkontrolovat převisy a tenké detaily, a náhled na první vrstvu a děliče. Pro multikolorní tisk ověřte přiřazení vlákna každé části před krájením.

| Formát | Vyberte si ji | Co dělat se stažením |
| --- | --- | --- |
| STL | Geometrie pro jednobarevný tisk | Otevřete STL v sliceru. Extrahovat ZIP jako první, pokud export obsahuje několik STL. |
| 3MF | Kit s oddělenými díly, barvami a filamenty | Otevřete jej v sliceru a ověřte díly a sloty. ReplixGrid nechává tiskárnu a materiálové profily na slicer. |
| OBJ + MTL | Barevný model nástroje, který přijímá OBJ | Udržujte geometrii a materiálový soubor pohromadě. Model používá milimetry s Z nahoru. |
| Projekt JSON | Pokračování v úpravách oddílů, rozměrů nebo příslušenství | Použití **Uložit projekt** a znovu otevřít s **Otevřít** ípa ReplixGrid. |


Pro stejnou digitální barvu jako ve sliceru zadejte vedle výběru barvy šestimístný **HEX code**, například `#E63522`. Úvodní `#` je volitelný. Platný kód okamžitě aktualizuje náhled. Neúplný nebo chybný kód se nepoužije; po opuštění pole se vrátí uložená barva. Kód nesimuluje skutečný vzhled filamentu, osvětlení ani fyzické míchání barev.

<a id="troubleshooting"></a>
## Řešení problémů

| Co vidíš | Co zkontrolovat |
| --- | --- |
| Objekt odpovídá vnějším rozměrům, ale nevejde se do zátoky. | Zvolte prostor a zkontrolujte jeho vnitřní měření. Povolte tloušťku stěny, zakřivené konce, vnitřní poloměr rohu a odnímatelné vložky. |
| Výběr děliče pokračuje v výběru zdi vpředu | Přepnout na **Shora** nebo otevřené **Všechny stěny a přihrádky** napravo. |
| Víko nebo další úroveň nelze přidat | Zkontrolujte, zda se jedná o úrovňový ráfek, rovné vnější výšky, vyčnívající děliče, naklápěcí nebo štípací tisk. U zásobníku zkontrolujte také pozůstatkové svorky a propustnost uložení vzhledem k tloušťce stěny. Built- in a SVG reliéf jsou podporovány na jednotlivých úrovních; plochy páření zůstávají hladké. |
| Část je větší než tiskovou podložku, i když stopa se zdála dost malá | V dialogovém okně ke stažení si přečtěte dokončené rozměry. Sklopení, reliéf, lemování a skořepiny mohou přesahovat základnu. Zkontrolujte zvolenou konfiguraci tiskárny a rotaci. |
| Skryté spojovací prostředky nejsou k dispozici | Používejte stěny o tloušťce nejméně 3,2 mm bez reliéfu, nebo zanechte spojovací prostředky a přilepte panely. Přechod na panely stěny nezhušťuje. |
| Panely překrývají spodní obrubník nebo ráfek ve starém provedení | Nastavte hranu nejméně 3 mm pro úrovně. Dolní část je měřena od horní části spodního lemu. Obnovte a stáhněte části po změně nastavení. |
| Stáhnutý tisk má špatné barvy | Použití 3MF, zápas čísla slot v **Tisk**, pak zkontrolovat per- část úkoly v sliceru. STL přenáší pouze geometrii. |
| Chybí návrh uložený na jiném zařízení | Převod projektu JSON a použití **Otevřít**. Knihovny prohlížečů jsou místní pro každé zařízení a adresu webu. |

<a id="project-variants"></a>
## Varianty projektu

Kliknout **+ Varianta** v horním panelu, nebo otevřené **Moje projekty** a vybrat **Nová varianta**. Zadejte jméno a klepněte na **Vytvořit variantu**. Nová varianta je nezávislá kopie, původní zůstává uložená. Nepojmenovaný originál je zachován jako **Koncept**.

Použijte volič vedle **+ Varianta** přepínat mezi souvisejícími modely, nebo vybrat jeden pod **Varianty tohoto projektu** v mých projektech. Každá varianta automaticky ušetří a po přepnutí nebo opětovném načtení si uchovává svou vlastní historii odd / redo. Nově vytvořená varianta začíná prázdnou historií.

Použití **Samostatný projekt → Uložit kopii** vytvořit nesouvisející projekt. Přejmenovat nebo smazat jednotlivé modely v Mých projektech; smazání originálu nevymaže jeho varianty.

**↓ Stáhnout** exportuje vybraný model pro tisk. **Uložit projekt** stahuje tento model jako editovatelný JSON; **Soubor** na kartě knihovny stahuje odpovídající model. JSON obsahuje jeden model, bez jeho souvisejících variant nebo vrátit historii. Každý model uložte zvlášť pro přenos nebo zálohování kompletní sady.


<a id="shared-styles"></a>
## Sdílené styly

1. Otevřete projekt s barvami a vzory, které chcete znovu použít.
2. Pod **Tvar → Společný styl**, zadejte jméno a klikněte **Uložit aktuální styl**.
3. Otevřít jiný projekt nebo variantu, návrat **Společný styl**, a vyberte uložený styl.
4. Vyberte **Barvy**, **Vzory** Nebo obojí. Přezkum **Bude použito** a **Bude přeskočeno** zprávy, pak klepněte **Použít styl**.

Styl zachycuje barvu organizátora a reliéf, plus barvy a vzory stávající pláště a víka. Hladký styl těla odstraňuje reliéf těla cíle. Rozměry, rozvržení prostoru, tloušťka stěny, víko fit, rukojeti a stírací otvory zůstávají beze změny. Chybějící víčka nebo skořepiny nejsou přidány. Nekompatibilní nastavení vzoru jsou přeskočeny s vysvětlením; kompatibilní nastavení lze stále použít. Vložit barvy a filament- slot přiřazení nejsou přenášeny.

Aplikace je jeden krok zpět a vytváří nezávislou kopii: později edituje na jednoho organizátora nemění ostatní. Smazání uloženého stylu nemění projekty, které jej již používají.

Uložené styly patří k tomuto prohlížeči a adrese stránky. Projekt JSON zachovává použitý vzhled, ale nezahrnuje knihovnu ve stylu Saved-. Chcete-li znovu použít styl na jiném zařízení, otevřete styl projektu JSON tam a uložit jeho současný styl znovu.


<a id="drawer-arrangements"></a>
## Uspořádání organizérů v zásuvce

Vyberte **Drawer** vedle **Organizér**, pak **Create drawer**. Zadejte naměřenou vnitřní délku, šířku, použitelnou výšku a výšku. Clearance platí jak na stěnách zásuvky, tak mezi tácy.

Nové zásuvky začínají na 180 × 280 mm, přičemž přední okraj je vyznačen dole. **Otočit pohled o 90 °** mění pouze orientaci zobrazení; rozměry zásuvky, souřadnice podstavce a exportované modely zůstávají nezměněny. Stávající uspořádání zásuvek si zachovává jejich rozměry. Uložené zásuvky otevřené s délkou horizontální a šířkou svislé; štítky dimenzí se řídí ručním zobrazením rotace. Tlačítko pro střídání zásobníků se otáčí pouze zvoleným zásobníkem.

Použití **New organizer** vytvořit podnos přímo v šuplíku. Nastavte rozměry, pak upravte přihrádky a příslušenství v obvyklém editoru pořadatelů. **← Back to drawer** se vrací na své místo. **Add saved organizer** přidává nezávislou kopii uloženého projektu nebo varianty; editace nikdy nemění svůj zdroj.

Přetáhněte podložky v horním pohledu nebo zadejte X / Y souřadnice měřené z levého horního rohu na vnější okraje podložky. Otočit o 90 stupňů, duplikovat nebo odstranit podložky. Šipky přesunout cílený podnos o 1 mm (Shift: 10 mm). Uspořádání zpět / redo obnovuje umístění a dokončené upravy podložky.

Schéma ukazuje smontované vnější ohraničující obdélníky, včetně skořápek, lemování, víček a úrovní. Zakřivené tvary jsou kontrolovány konzervativně spíše než pevně vnořené. Ohraničení, vůle a střety výšky jsou zvýrazněny. Čekejte na kontrolu geometrie před spoléháním na stav uložení. Vyberte volné umístění nebo umožněte montážní desku, jak je popsáno níže.

Kresliče ukládají v tomto prohlížeči místně, odděleně od organizátorů projektů. Stáhnout zásuvku JSON soubor pro zálohování nebo přenos; otevření jednoho vytvoří samostatnou kopii zásuvky. Vyberte podnos a vyberte **Download selected tray** pro své vlastní STL, 3MF nebo OBJ export se stávajícími printersize kontrolami. Souřadnice se nestávají umístěním potisku.

<a id="mounting-plates"></a>
### Montážní desky

V **Drawer → Drawer base**, vybrat **Mounting plate**. Délka odsávače / šířka a světlost stěny určují pokrytou plochu. Zadejte použitelnou šířku a hloubku **3D tiskárna postel** samostatně: tyto rozměry určují maximální velikost průřezu, a tedy počet úseků. Výpočet zahrnuje kloubové výčnělky a 2 mm tiskařský okraj na každé tiskové podložce hrany. Rozměry nemusí být násobky větrací mřížky o průměru 20 mm; úseky hran vyhovují zbývajícímu prostoru.

**Download sections (ZIP)** vytvoří číslovaný 3MF pro každý tisk, montážní plán SVG a seznam souřadnic. Plán zachovává původní orientaci zásuvky bez ohledu na pohled: R jsou řádky shora dolů, C sloupce zleva doprava. Rybinové spoje zasuňte shora. Nejprve vytiskněte **Download joint sample** se dvěma sousedními sekcemi a ověřte spojení. Spára je 0,05 mm a přídavek profilu 0,03 mm. Mezi samotnými sekcemi může zůstat jemná spára a malá vůle.

Se zapnutým deskovým módem se stahování zásobníku skládá z podstavců pro umístění a rotaci zásobníku. Rozměry vnitřních prostorů jsou zachovány. Zásobník je o 2,1 mm vyšší, včetně desky 2 mm, přidává kontrola uložení zásuvky 4,1 mm. Po posunutí nebo otáčení zásobníku jej opět stáhněte: jeho zásuvky musí odpovídat polohám kolíku. Výměna odkládací plochy také mění původ pegu.

Radiální vůle socket je 0,12 mm. Vytiskněte malý pořadač s dvěma oddíly pro kontrolu vyhovujících nastavení materiálu a vrstvy. Zásuvky udržují organizéru bočně; zdvihněte jej nahoru, abyste ho odstranili. Export používá pouze geometrii: zvolte tiskárnu a materiálové profily v sliceru a před tiskem zkontrolujte střešní zásuvky.

Uchycení je nyní dostupné pro nedělené organizéry bez náklonu s alespoň třemi plně podepřenými otvory. Malé nádoby může být nutné posunout nebo zvětšit. Horní patra a pláště zachovávají svou geometrii. Vypněte režim desky, chcete-li exportovat původní model bez uchycení. Uložené zdrojové projekty zůstávají beze změny.

<a id="custom-svg-relief"></a>
## Vlastní reliéf SVG

Pod **Tvar → Úleva pořadatele → My SVGs**, vybrat **Upload SVG** nebo upustit soubor do oblasti nahrávání. Pro její opětovné použití zvolte uložený náhled. Stejná knihovna je k dispozici pod **Tvar → Víko → My SVGs** a **Plášť → Pattern → My SVGs**. Každý cíl si udržuje svůj vlastní vzor a nastavení umístění.

Vyberte **Single motif** nebo **Repeat**, vyberte vnější stěny, a upravit šířku motivu v milimetrech, rotace, horizontální / vertikální ofsetu, a opakovat mezeru. Šířka a výška udržují původní rozměry. Umístění je soustředěno na každou zvolenou stranu; na zakřivených tělech odpovídají strany čtyřem vnějším sektorům. Pozitivní vertikální posun posune motiv nahoru. Vzor následuje po vnějším obrysu. Opakování se umístí pouze tam, kde se kompletní motiv vejde pod horní okraj, kolem řezu a uvnitř každé strany. Na těchto hranicích jsou přistřiženy jednotlivé motivy. Relief hloubka používá existující **Relief deep / Intensity** Kontrolu. Původní stěny a vnitřní prostory jsou zachovány; vnější rozměry se zvyšují. Počkejte, až aktualizovaný náhled dokončí, pak zkontrolujte a stáhnout část.

Podporované SVG obsahují vyplněné cesty, polygony, obdélníky, kruhy nebo elipsy, včetně otvorů a skupinových transformací. Převést text a tahy na vyplněné cesty před exportem z vašeho vektorového editoru. Fotografie, externí reference, filtry, masky, výstřihové cesty, gradienty, CSS stylové bloky a odkazy na opakovaně použitelné prvky ( `use` ) nejsou podporovány. Prázdné nebo nepoužité definice obsahující podporované tvary jsou ignorovány. Barvy se stávají jedním zvýšeným tvarem pomocí barvy organizátora. Mezní hodnoty jsou 200 KB, 512 XML prvků, 128 vyplněných tvarů a 6000 vzorkovaných kontur; příliš složité vzory nebo nadměrné opakování se zamítají se zprávou. Křivky jsou aproximovány polygonálními obrysy pro tisk.

SVG jsou zpracovávány lokálně v prohlížeči. Knihovna zůstane na tomto zařízení. Každý projekt obsahuje nezávislou kopii použitých kontur, takže stažené projekty lze znovu otevřít na jiném zařízení bez zdroje SVG nebo do knihovny. Odstranění vstupu do knihovny ponechává stávající projekty nezměněné. **Společný styl** Také nese vlastní tělo, víko a shell vzory k jinému organizátorovi. Chybějící víčka nebo pláště jsou přeskočeny, stejně jako s built- ve stylech. Udržet stažený projekt jako zálohu.

<a id="choose-an-svg-for-its-intended-use"></a>
### Výběr SVG podle účelu

An SVG je formát výkresu, není zárukou potiskovatelné geometrie. **Importovat úspěch pouze znamená, že podporované vyplněné obrysy byly přečteny.** Zvolený povrch, velikost a aplikační režim musí ještě projít kontrolou geometrie.

| Zamýšlené použití | Co se naplněné oblasti stanou | Co připravit |
| --- | --- | --- |
| Reliéf na organizátory | Povrchovaný materiál připevněný k pevné stěně | Samostatné motivy a vnitřní otvory mohou fungovat, protože je podporuje zeď. |
| Vzor zvýšeného víka | Povrchovaný materiál na pevné podložce | Vnitřní otvory jsou povoleny; celý nákres uchovávejte v dostupném rámu a mimo přistání rukojeti. |
| Prolijte otvory | Materiál odstraněný z víka | Každý zbývající kus se musí připojit k okolnímu víku. Uzavřené vnitřní detaily potřebují mosty. |
| Obalené pláště nebo ozdobné desky | Otvory proříznuté přes kryt | Použít stencilokompatibilní výkres. Zbývající rám a vzor musí tvořit připojený materiál. |

Pro přípravu souboru:

1. Ponechte potřebné vyplněné cesty a základní tvary. Ve vektorovém editoru převeďte text a **tahy na vyplněné obrysy**. Čára s `fill="none"` je tah, nikoli vyplněná plocha.
2. Odstraňte obdélníky pozadí, pokud se celá jejich plocha nemá stát reliéfem nebo otvorem. Barvy SVG nerozdělují materiály; bílé tvary automaticky nevyřezávají tmavé tvary pod nimi.
3. Zkontrolujte složené cesty. Komentář „otvor“ žádný otvor nevytvoří: výplň určuje směr cesty a pravidlo `fill-rule`.
4. U průchozích otvorů propojte uzavřené vnitřní detaily s okolním materiálem pomocí můstků. Větší rozestup opakování **nepřipevní** volný detail uvnitř motivu. Alternativou je reliéf na víku.
5. Pro opakování je vhodnější soubor s jedním motivem. Pokud SVG už obsahuje mřížku, šířka mění měřítko **celé mřížky**, ne jednotlivých motivů. Malé detaily mohou být příliš tenké.
6. Počkejte na úspěšný výpočet a kontrolu exportu, poté zkontrolujte výsledek ve sliceru. Při chybě výpočtu může zůstat poslední platný náhled; ten neodpovídá aktuálním nastavením, která selhala.

Vyplněná silueta listu může tvořit reliéf i otvor. Zcela obklopená žilka je v režimu reliéfu podepřena podkladem, ale po vyříznutí okolního listu může zůstat volná. Šestiúhelníková mřížka se hodí pro perforaci, pokud jsou zbývající můstky materiálu propojené a dostatečně silné. Vícebarevnou kresbu tvořenou tahy je nejprve nutné převést na vyplněné obrysy.

<a id="svg-lids-and-perforated-shells"></a>
### Víka SVG a perforované pláště

Přidat víko, pak vybrat **My SVGs**. **Raised relief (decoration)** tvoří jediné připojené víko s motivem na pevné podložce; nastavuje jeho reliéfní výšku (0,2-1 mm) a základní barvu. **Through stencil (cut)** odstraňuje naplněné SVG plochy skrz víko. Oba režimy zachovávají 2 mm hranový rám a pářící ret. Samostatná rukojeť udržuje pevné přistání; posun výkresu, pokud je s ním jediný motiv v rozporu. Vnější a vnitřní uložení používají stejné ovládací prvky. SVG Barvy uměleckých děl nejsou dováženy jako samostatná vlákna.

Pro shell, vyberte **My SVGs** a pak kresbu do knihovny. Naplněné oblasti se stávají otvory. Použijte jeden motiv nebo se opakuje na vybraných stranách zabaleného rukávu. Zapnout **Dekorativní panely**, Kresba se opakuje nezávisle na každém vybraném panelu; stávající rámy a montážní místa jsou zachována. Počáteční velikost motivu bere v úvahu výšku skořepiny. Nastavte šířku rámu, velikost motivu, rotaci, polohu a rozestup podle potřeby. Vnitřní oddíly organizátora a světlice zůstávají nezměněny.

Na víčka a skořepiny, pouze kompletní motivy jsou umístěny uvnitř dostupného rámu, včetně jednoduchých motivů. Pokud není vhodné, zmenšit velikost nebo ofsetu. Uzavřené vnitřní detaily (například centrum ring- tvarovaný výřezy) se mohou stát volné ostrovy. Přidat mosty ve vašem vektorovém editoru nebo použít zvýšený dekorace na víku. Aplikace blokuje odpojenou geometrii místo tiše odkládací kusy. Vyhněte se velmi úzkým pavučinám a zkontrolujte malý zkušební tisk pro váš materiál a trysku.

Vzor je zahrnut do individuálních exportů, kompletních souprav a tiskových úloh v celozásuvce. Přepínání zpět na **Built-in** Odstraní vlastní vzor pouze z tohoto cíle. Odstranění miniatury knihovny neodstraňuje vložené vzory z projektů.

<a id="download-ready-to-use-stencil-svgs"></a>
### Stažení hotových šablon SVG

Tyto příklady obsahují vyplněné obrysy s materiálovými můstky. Černé oblasti se v režimu **Through stencil (cut)** stanou otvory. Soubory z odkazů níže uložte s příponou `.svg`. Pokud prohlížeč zobrazí kresbu, použijte uložení stránky a příponu zachovejte.

| Stáhnout | Vzorec | Navrhovaná startovní šířka |
| --- | --- | --- |
| [Organické listy - stáhnout SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Pět listů s mosty spojujícími vnitřní detaily | 20 mm; zmenšit pro nízkou slupku |
| [Dvojitý šestiúhelník - stáhnout SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Jedna dvojitá šestiúhelníková dlaždice se čtyřmi mosty a středovým otvorem | 20-24 mm; použití **Repeat** pro mřížku |

**Na víku:** přidat víko pod **Tvar → Víko**, otevřené **My SVGs** a nahrajte oba soubory. Vyberte **Through stencil (cut)**. Začněte s **Single motif** zkontrolovat, nebo vybrat **Repeat** k vyplnění dostupného prostoru kompletní kopie. Nastavit kompenzaci šířky, rotace a X / Y. Opakované rozestupy jsou mezery mezi úplnými kopiemi, nikoli šířkou jejich vnitřních mostů. Začněte s rozestupem 4 mm. Soubor listů je již skupina pěti listů: šířka škály celé skupiny.

**Na plášti:** otevřete **Plášť** → **Pattern** → **My SVGs** nebo kartu **Plášť** ve studiu a vyberte soubor ze společné knihovny. Pláště podporují pouze průchozí otvory. **Repeat** opakuje motiv kolem pláště; **Dodatečné** → **SVG walls** vybírá strany obvodového pláště. Dekorativní panely používají vybrané strany panelů. Každý povrch si zachovává vlastní nastavení polohy a tloušťky. Přepnutí karty zobrazí odpovídající díl.

Pokud se motiv nehodí, zmenšte jeho šířku nebo posun. Na nízké plášti zkuste 12- 16 mm pro listovou skupinu. Zvyšování tloušťky skořepiny může zvětšit jeho automatický okraj a zanechat méně prostoru pro kreslení. Zúžení také zužuje mosty: zkontrolujte je ve vašem sliceru a vytiskněte malý vzorek pro vaši trysku a materiál. Opakované rozestupy nemohou rozšířit vnitřní mosty. Vyčkejte na dokončení aktuálního náhledu a pak použijte **↓ Stáhnout** zkontrolovat a exportovat víko nebo plášť.

<a id="numeric-sliders-and-valid-ranges"></a>
### Číselné posuvníky a povolené rozsahy

Zobrazovat číselné nastavení **Min** a **Max** nad tenkou zelenou tratí, s bílou značkou pro aktuální hodnotu. Červené koncové uzávěry označují vnější z povoleného intervalu; nejsou hodnocením pevnosti tisku. Přetáhněte značku, pomocí kláves se šipkami při soustředění, nebo zadejte přesné číslo a stiskněte Enter. Číselné pole a posuvník používají stejné limity. Některé limity se mění s modelem; hodnota uvnitř rozsahu posuvníku může být stále v rozporu s jiným nastavením, takže postupujte podle jakéhokoliv varování geometrie před vývozem.

<a id="whole-drawer-export"></a>
## Export celé zásuvky

Vyberte **Drawer → Print entire drawer** pro přípravu všech podnosů, jejich příslušenství a libovolných částí montážních desek. Montované podnosy dostávají zásuvky pro jejich uložené pozice; běžné volnočasové podnosy si ponechávají své stávající základny. Projekty rozstřikování zahrnují jejich části a špendlíky. Překrývání, nedostatečná čidla zásuvky, nepodporovaná montáž nebo neplatná geometrie blokují stahování a identifikují postižený podnos.

Nastavit **Printer bed length** (horizontální), **Printer bed width** (vertikální), výška a rozteč tisku. Počáteční rozměry pocházejí z nastavení montážní desky nebo z tiskového prostoru prvního zásobníku. Následné nastavení exportu je uloženo v tomto šuplíku. Pro zvolené lůžko se regenerují montážní desky. To nepovoluje podnosy ani nemodifikuje uložené zdrojové projekty.

Rozložení vychází ze skutečných vnějších rozměrů exportovaných dílů, okraje 2 mm na tiskové podložce a zvolených rozestupů. Díly se mohou otočit o 90°; barevné části víka zůstávají pohromadě. Zobrazený počet podložek platí pro toto rozložení a nezaručuje minimum. Podpěry, brim, čisticí věže, zakázané oblasti tiskárny a samostatné úlohy pro různé materiály nejsou zahrnuty. Ponechte pro ně místo a výsledek ověřte ve sliceru. Soubor neobsahuje profil tiskárny ani přiřazení filamentů.

V roce ZIP obsahuje **bed-NN.3mf** pro každou tiskovou podložku, odpovídající **bed-NN.svg** diagramy, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** a očíslovaný seznam částí v **README.txt**. Otevřít každý 3MF jako samostatnou tiskovou práci si uchovejte relativní polohy svých objektů, použijte milimetry ve 100% měřítku a přiřaďte vlákna. V roce SVG Schémata ukazují ohraničující obdélníky; 3MF obsahuje celou tisknutelnou geometrii. Souřadnice pro montáž kabelů vždy používají délku vodorovně a šířku svisle.

Změny rozložení nebo nastavení exportu neruší předchozí výpočet. Zavření okna ruší přípravu. Přerostlé jednotlivé díly jsou hlášeny spíše než tiše zmenšené nebo automaticky rozdělené. Velmi velké sady může být třeba exportovat v menších skupinách.

<a id="pattern-studio"></a>
### Studio vzorů

Zvolte **Raised relief (decoration)** pro reliéf nebo **Through stencil (cut)** pro průchozí otvory. Pláště podporují pouze otvory. Výška se zobrazuje jen u reliéfu, rozestup jen u opakování. **Material thickness** mění náhled i export: 1,2–6 mm pro SVG víko, 1–4 mm pro plášť. Výchozí tloušťka je 3,2 mm pro reliéf a 2 mm pro šablonu; zvolená hodnota zůstává při změně režimu. Výška reliéfu je součástí tloušťky. Zapuštěné SVG víko vyžaduje vnitřní hloubku alespoň tloušťka desky plus 2 mm. **Dodatečné** obsahuje barvu víka nebo výběr stěn pláště. **Which SVG files work?** vysvětluje požadavky a přípravu souborů.

Otevřete **Tvar** → **Víko** → **My SVGs** nebo **Plášť** → **Pattern** → **My SVGs**. Karty **Víko** a **Plášť** sdílejí knihovnu, ale mají nezávislá nastavení. Přepnutí zobrazí příslušný díl; pokud ještě neexistuje, zůstává viditelná sestava. Pohled na celek lze zvolit nad modelem. Šířka, otočení, rozestup a X/Y určují polohu motivu; centrovací tlačítko resetuje polohu a otočení. Víko podporuje reliéf i otvory, plášť jen otvory. Rámy a místa uchycení zůstávají zachovány. **×** nebo **Escape** zavře aktivní studio a ponechá změny. Šipky klávesnice přepínají vybranou kartu.
