<a id="replixgrid-user-guide"></a>
# Uživatelská příručka ReplixGrid

Design organizátor v milimetrech, zkontrolujte jeho fit, a stáhnout díly pro kráječ. Pro první stavbu, postupujte podle ilustrované kapsle příkladu. Použijte tento odkaz, pokud chcete změnit určitou část vašeho návrhu.

[Otevřít ReplixGrid](https://grid.replixcast.com/?lang=cs) · [Rychlý start](USER-GUIDE.md) · [Místní instalace](../../../README.md#local-installation)

| Chci... | Přejít na |
| --- | --- |
| Vyberte zeď, otočte model nebo zopakujte změnu | [Pracovní plocha a pohledy](#workspace-and-views) |
| Vyberte si tvar, změňte rozměry nebo nakloňte stěny dopředu | [Tvar a rozměry](#shape-and-dimensions) |
| Vložit objekt do přihrádky nebo přesunout dělič | [Přihrádky a přepážky](#compartments-and-dividers) |
| Spusťte stěnu, tvarujte její hranu nebo ustřihněte otvor prstu | [Výška stěn a výřezy](#wall-heights-and-cutouts) |
| Zjemnit ráfek, přidat texturu nebo dát jméno na tělo | [Rohy, hrany a dekorace](#corners-edges-and-decoration) |
| Přidat odnímatelný hrnek, zásobník podnosy nebo namontovat víko | [Vložky, patra a víka](#inserts-tiers-and-lids) |
| Vytisknout dekorativní obal pro vnější stranu | [Jednodílné pláště a panely](#sleeves-and-panels) |
| Znovu otevřít návrh nebo jej přesunout do jiného počítače | [Projekty a zálohy](#projects-and-backups) |
| Vyberte si tiskárnu, rozdělte velký model nebo přiřaďte vlákno | [Nastavení tisku a rozdělení na části](#print-setup-and-sectioning) · [Stažení a příprava ve sliceru](#download-and-slice) |
| Udržovat alternativní návrhy nebo opakované barvy a vzory | [Varianty projektu](#project-variants) · [Sdílené styly](#shared-styles) |
| Uspořádat pořadače v měřeném šuplíku nebo je připevnit na desku | [Uspořádání organizérů v zásuvce](#drawer-arrangements) · [Montážní desky](#mounting-plates) |
| Importovat umělecká díla pro stěny, víčka nebo perforovanou skořápku | [Vlastní reliéf SVG](#custom-svg-relief) · [Studio vzorů](#pattern-studio) |
| Stáhnout všechny části zásuvky uspořádány pro tiskárnu | [Export celé zásuvky](#whole-drawer-export) |
| Zjistit, proč ovládání nebo stahování není k dispozici | [Řešení problémů](#troubleshooting) |

<a id="start-a-new-project"></a>
## Zahájení nového projektu

Při prvním spuštění je pracovní plocha prázdná. Průvodce vlevo nabízí tři kroky: **Vyberte tvar → Nastavte rozměry → Přidejte přihrádky**. Vyberte tvar, nastavte rozměry a klikněte na **Dále: přihrádky**. Dokončete tlačítkem **Hotovo** nebo **Ponechat bez přepážek**. Po výběru tvaru lze průvodce zavřít tlačítkem **×**. Můžete také otevřít uložený projekt nebo soubor JSON.

**Na malých obrazovkách:** při šířce okna prohlížeče nejvýše 1400 px se průvodce zobrazí **pod modelem**, aby nezakrýval náhled. Posuňte **stránku dolů**, abyste se dostali k průvodci, dalším krokům a tlačítkům pro přechod k přihrádkám a dokončení. Pro zobrazení modelu posuňte stránku zpět nahoru. V širších oknech zůstává průvodce vedle levé nabídky.

Průvodce znovu otevřete přes **Nápověda → Průvodce: tři kroky**. Samotné otevření model nemění. Výběr jiného tvaru nahradí aktuální model; tuto akci lze vrátit zpět.

Rychlý start, příručka i nabídka nápovědy používají zvolený jazyk rozhraní. Video zůstává v angličtině.

Kroky, rady i potvrzení v průvodci jsou přeloženy. Řádek uloženého modelu se jmenuje **Předchozí projekt**. Skutečné názvy v **Mých projektech** zůstávají takové, jaké jste uložili.

Použití **Nový projekt** v horní liště se vrátit k tomuto čistému startu. Vaše současná práce je uložena jako první; nejmenovaný návrh je zachován v **Moje projekty**. Stávající projekty, varianty, sloty vláken a konfigurace tiskárny se nezruší. Na panelu je označen miniaturní náhled. **Předchozí projekt** s **Uloženo v „Mých projektech“** Kliknutím na tento řádek znovu otevřete svou knihovnu. Plachta je okamžitě vyčištěna a zůstává prázdná, dokud si nevyberete nový tvar, stejně jako při první návštěvě. Dokud si nevyberete nový tvar, uložení a export jsou zakázány. Místo toho můžete otevřít projekt od **Moje projekty** nebo dovézt JSON Složka. Obnovení této karty empty- start udržuje úvodní obrazovku; znovuotevření stávajícího projektu obnoví model. Obyčejné zpáteční návštěvy pokračují v práci.

Výběr **Tvar → Warp → Vytvořit ze šablony** při úpravě stále nahrazuje výstavbu v rámci stávajícího projektu a lze ji odčinit. Použití **Nový projekt** když chceš samostatný model.

<a id="workspace-and-views"></a>
## Pracovní plocha a pohledy

Otevřete nástroj v levé horní části. **Tvar** mění tělo a jeho příslušenství. **Přihrádky** změní rozložení. **Plášť** navrhuje samostatný vnější kryt. **Tisk** nastavuje objem konstrukce, drážky vlákna a volitelné řezné řezy. Kliknutím na políčko číslo, zeď nebo dělič na modelu otevřete jeho nastavení vpravo. Pokud se část je těžké kliknout, expandovat **Všechny stěny a přihrádky** a vyberte ho podle jména.

Levý panel je navigace úseků. Zvolte sekci, která otevře pouze svá nastavení ve středu, plovoucí editor v dolní části náhledu. Scéna a mřížka pokračují za editorem; otevření není přerušeno náhled. Editor používá kompaktní skupiny, nenahrazuje levé menu. Jeho Chevron zkolabuje editor a **×** Zavři to. Pro přepnutí nastavení zvolte další část vlevo. Pravý panel zůstává věnován zvolené stěně nebo prostoru.

Přetáhněte pozadí otočit, posun přiblížit, a přetáhněte pravým tlačítkem myši na pánev. **Vraťte fotoaparát** obnovuje kamerový rámeček. **Shora** vám pomůže vybrat úzký prostor nebo přesunout dělič. **3D** zobrazuje výšky stěn a dokončenou montáž. **Mřížka** přepíná referenční mřížku s jemnými čarami každých 10 mm a velkými čarami každých 50 mm. Pomocí tlačítek na části, které jsou soustředěny nad modelem, izolujete pořadatele, vložky, krunýř nebo víko. **Sestava** zobrazuje dostupné části společně pro aktuální pohled. Pro více úrovní, vyberte **Zobrazit zásobník** v kapce vedle **Organizér** zobrazit celý stack; vybrat **Patro 1**, **Patro 2**, nebo jiný stupeň, aby se vrátil do této úrovně. Editor nastavení dna zůstává otevřený. Z pohledu stack, **Plášť** a **Vložky** zahrnují části ze všech úrovní. Na užších oknech se tato tlačítka přesunou do své vlastní řady pod nástrojové lišty. S izolovaným víkem, vyberte si **Dole** aby zkontrolovali jeho spodní stranu. Tisk **Esc** k uzavření panelu nástroje. Pomocí zakřivených šipek nad modelem můžete změnit nebo předělat změnu návrhu.

Použijte horní lištu pro volbu jazyka rozhraní nebo přepínání mezi světlým, tmavým a systémovým vzhledem. Řídicí názvy v této příručce postupujte podle zvoleného jazyka rozhraní.

<a id="shape-and-dimensions"></a>
## Tvar a rozměry

Pod **Tvar → Warp**, vyberte základní a výškový profil, pak klepněte na tlačítko **Vytvořit ze šablony**. Tlačítko nahrazuje aktuální konstrukci. Pokud si chcete nechat oba návrhy, nejprve si uložte jmenovanou kopii. **Jednoduché polotovary** také nabízí prázdné tělo a čtyřkompartmentový výchozí bod.

| Základ | Kdy si ho vybrat |
| --- | --- |
| Zaokrouhleno | Obdélníková stopa s nastavitelnými vnějšími rohy. |
| Tobolka | Dlouhé tělo s půlkruhovými konci. Sklápěcí šablona přenáší sklon přes oba zakřivené konce. |
| Kruh | Kulatý pořadatel o průměru. |
| Oval | Protáhlý zakřivený obrys s nastavitelnou šířkou a hloubkou. |
| Honeycomb | Shluk šestiúhelníkových buněk, které sdílejí stěny. Vyberte buňku pro nastavení výšky. |

Vyberte **Flat** pro úrovňový okraj, **Svažující se** pro průběžné zvýšení nebo **Stupně** pro odlišné úrovně výšky. Rozměry pod volbou popisují šablonu, kterou hodláte vytvořit. Po vytvoření, upravit model pod **Rozměry**. Šířka a hloubka měří vnější stopu. Při velikosti objektu použijte vnitřní rozměry vybraného prostoru. Na zakřivené základně, také zkontrolovat zúžení končí v **Shora** Pohled.

![Sklápěcí kapsle s nízkým koncem pro přístup, vysoký konec pro dlouhé položky a dva příčné děliče](../../images/capsule-sloped.jpg)

**Tvar → Dodatečné** obsahuje tloušťku stěny a dna. Silnější stěny zabírají prostor z prostorů. **Nakloňte na rovnou základnu** Zdi se nakloní dopředu až o 25 °, zatímco spodní část zůstane vodorovná. To se liší od sklopeného ráfku, který mění výšku stěny podél těla. Při zapnutém náklonu použijte dokončené rozměry v dialogovém okně stahování pro kontrolu místa, kde bude vytištěná část obsazena.

<a id="exact-internal-dimensions"></a>
## Přesné vnitřní rozměry

Vyberte prostor a použijte **Vnitřní rozměry** v pravém panelu, nebo klikněte na jeho modrý rozměr štítek přímo na modelu. Vyberte šířku nebo hloubku, zadejte milimetry a klepněte na tlačítko mimo inline pole pro použití. Zadejte také platí; Útěk ruší. Pravý panel si ponechá své tlačítko Použít. Neplatné hodnoty nemohou změnit model. Každá závazná editace může být zrušena v jednom kroku.

Pomerančový dělič je jeho aktuální polohou; ponořená modrá čára předpovídá novou polohu. Nejbližší uzavírací příčka na zvolené ose se pohybuje tak, aby vnější velikost těla a tloušťka stěny zůstala beze změny. Obraz ukazuje zasažené sousední velikosti. Pokud na této ose není žádný dělič, upravte celkové rozměry nebo nejprve rozdělte prostor.

V jednoduchém řádku, začít s oddílem 1 a pokračovat v pořadí; poslední přihrádka bere zbytek. Sousední rozměry nejsou zamčené, takže editace starší přihrádka může změnit velikost pozdější.

Zaokrouhlené rohy, kontury kapslí, šampóny a vnitřní filé zůstávají podporovány. Modrá čára měří skutečný vnitřní rozsah na ose prostoru, těsně nad podlahou. Prostor může zúžit jinde kolem křivek: přidat clearance a zkontrolovat celý objekt stopy. Kruh, ovál, plást a nakloněné stěny v současné době nepodporují přesnou úpravu prostoru.

Vyberte stěnu nebo dělič pro úpravu její výšky přímo na modelu. Ploché stěny ukazují jednu hodnotu; dvoubodové profily ukazují A / B hodnoty. Linked- výška a stepded- wall pravidla odpovídají pravé panelu. Tyto štítky editují výšku, ne délku stěny nebo celkovou tloušťku.

<a id="compartments-and-dividers"></a>
## Přihrádky a přepážky

Pro rychlé rozložení použijte **Přihrádky → + Přihrádka** k rozdělení největší přihrádky. **- Přihrádka** Spojuje sousední pár. Ve voštinovém plástu tyto ovládací prvky přidávají nebo odstraňují vnější buňku a zachovávají velikost ostatních. Dvě sousední voštinové buňky sdílejí zeď tak vysokou, jako je ta vyšší.

Pro přesné rozložení přepněte na **Shora** a vyberte prostor, který chcete rozdělit. Vyberte **Počet dílů**, pak **Rozdělit na šířku** k rozdělení šířky do užších oddílů, nebo **Rozdělit do hloubky** aby udělali mělčí. Můžete si znovu rozdělit jeden z výsledků. Pro tužkové pole vedle dvou malých podnosů, nejprve rozdělit šířku na dvě, pak rozdělit pouze na straně podnosy do hloubky.

![Top- view příklad s jedním plným hloubkovým zálivem a dvěma menšími oddíly](../../images/compartment-splits.svg)

Vyberte dělič přetáhnout, nebo upravit **První přihrádka** v rámci **Pozice oddílu**. Pouze zvolený dělič se pohybuje; ostatní dělicí pozice zůstávají pevné. Přilehlé přihrádky mění velikost. Pohyby, které zanechávají příliš málo místa, jsou zamítnuty. Zkontrolujte nové vnitřní rozměry na každé straně. **Odebrat oddíl** kombinuje přihrádky a může také odstranit děliče vnořené uvnitř tohoto rozdělení. Prohlédněte si zvýrazněný výběr a potvrzení před jeho odstraněním.

<a id="wall-heights-and-cutouts"></a>
## Výška stěn a výřezy

Vyberte vnější stěnu nebo dělič. **Jedna výška** Nastaví horní úroveň. **Dva body** umožňuje nastavit výšky na koncích **A** a **B**, které jsou vyznačeny na modelu. Vyberte **Přímo**, **Zvlněný** nebo **Cikcak** utvářet hranu podél zdi. Wavellerate řídí vzdálenost mezi opakování. Ve zkrocené šabloně, volba kroku upravuje jeho úroveň spolu s připojenou stěnou a děličem.

Použití **Spojte výšky sousedních stěn** aby vnější zeď následovala sousedy. Pro dělič, **Připevněte k přilehlým stěnám** Zkopíruje obě koncové výšky jednou. Opakujte fit po změně sousedních stěn. **Stejně jako ostatní.** vrací vybranou stěnu do společné výšky.

Otevřít **Nástěnný výřez** aby se dostal do průlomu. Vyberte hladký kopeček, půlkruh nebo obdélníkový otvor, nastavte šířku a hloubku a pak ji pohybujte podél stěny. Pozice běží od konce A do B. Hloubka se měří směrem dolů od horního okraje. Zkontrolujte zbývající ret nad podlahou. Vyberte **Žádný výřez** Zaplnit otvor. Honeycomb místo toho používá výšku buňky. Uříznuté kruhy a ovály nepodporují odřezky ve vnějších stěnách.

<a id="corners-edges-and-decoration"></a>
## Rohy, hrany a dekorace

Otevřít **Tvar → Rohy a zkosení**. Tři ovládací prvky ovlivňují různé části tisku.

| Kontrola | Kde hledat | Co se změní |
| --- | --- | --- |
| Vnější rohy | Horní pohled, vnější obrys | Okolo rohů stopy nebo nakrájet na 45 °. Nula dává čtvercový roh. K dispozici na obdélníkové rodině základen. |
| Radius uvnitř oddílů | Horní pohled, uvnitř zálivu | Objíždí vertikální křižovatku, kde se setkávají dvě stěny. Těsné zátoky omezují dostupné poloměry. |
| Horní okraj stěn a děličů | Křižovatka skrz zeď | **Zkosení** krájí se plochá souprava a **Zaoblený** Zakřivení rtu. Obě strany vnějších stěn a děličů se dostanou do cíle. **Bez úpravy** obnovuje čtvercový ret. |

![Nástěnné kříže zobrazující čtvercové, ostnaté a zaoblené horní rohy se stejnou tloušťkou stěny](../../images/top-edge-profiles.svg)

Například na stěně 2 mm zkuste lom 0,5 mm. Každá strana ztrácí 0,5 mm na samém vrcholu, takže 1 mm plochý pás. Maximální zobrazená velikost závisí na tloušťce stěny. S **Zaoblený**, Hodnota je poloměr v milimetrech.

- **Barva organizéru** mění náhled a vývoz schopný barvy. Vyberte si vzorek, vlastní barvu nebo konfigurovanou barvu vlákna. Přiřadit skutečný slot vlákna při vývozu.
- **Spodní lem** přidává projekční skupinu kolem základny. Vyberte hladký, pruhované nebo stepový střih a nastavte jeho výšku. Kompatibilní rukáv si na něm může odpočinout. Trim vyžaduje netkané, jednodílné tělo a je k dispozici v prvním patře. Samostatné panely sedí nad ním s vybranou hranou ofsetu.
- **Úleva pořadatele** přidává zvýšený vzor přímo k vnější stěně. Posuňte katalog vzorů, nastavte velikost vzoru a reliéfní výšku a sledujte aktualizaci modelu při přetažení při každém dokončení výpočtu. Konečná hodnota používá plnou přesnost. Uvnitř zůstává hladký. Projekce zvyšují vnější rozměry. Vyberte **Hladký** Odstranit úlevu.
- **Podpis a odznak** umístí písmo nebo symbol na zvolenou stranu. Zadejte text, vyberte font, nastavte výšku písmen a vertikální polohu, pak zvolte zvýšený zápis nebo gravírování a nastavte jeho výšku nebo hloubku. Hvězda nebo srdce mohou doprovázet text. Na kruhových a oválných organizátorů, text a ikony sledovat zakřivené stěny, včetně STL a 3MF vývoz. Rozteč písmen se měří podél povrchu. Vyberte přední, zadní, levá nebo pravá ke středu nápisu na této straně. Na kruzích a oválech s propojenými nebo proměnnými výškami stěn zůstává zápis pod nejnižším profilem stěny a výřezem. Psaní plášťů ještě není podporováno; skořepiny pokrývající zvolenou stranu a reliéf mohou také zabránit psaní. Psaní plochých stěn stále vyžaduje trvalý výškový profil. Pokud se nápis dostane do výřezu nebo překročí dostupnou tvář, zmenšte pozici nebo zmenšte velikost písmene.

<a id="inserts-tiers-and-lids"></a>
## Vložky, patra a víka

**Odnímatelné vložky.** Vyberte přihrádku a poté expandujte **Přihrádková vložka** napravo. **Prázdné** dělá otevřený hrnek. **Pro maličkosti** přidává mřížku s nastavitelnými řadami a sloupy. **Pro rukojeti** vytváří zásuvky pro pera nebo nástroje. Nastavte vnitřní průměr zásuvky a aplikace se vejde do tolika míst, kolik vložka dovolí. Vyberte si zaoblený, kulatý, oválný nebo šestihranný obrys a barvu. **Vyjměte vložku** Vykliďte ten záliv. Prázdný kelímek je stále vytisknutelná část.

Vložka následuje po své přihrádce s clearance nejméně 0,5 mm. Jeho stěny a dno mají tloušťku 1,2 mm a jeho výška se přizpůsobuje přibližně 1 mm pod okrajem. Na svahu se objeví vložka v šikmém pořadateli. Izolovat **Vložky** zkontrolovat je a pak vyvážet **Organizér a příslušenství**. Vložení vyžaduje jednodílný tisk.

**Skládané podnosy.** Začněte s úrovňovým ráfkem, pak otevřete **Tvar → úrovně → + Tier**. Můžete použít dvě až pět úrovní. **- Úroveň** Odstraňuje úroveň. Prvky sdílejí stopu, ale mohou mít různé oddíly, výšky, barvy a dekorace.

1. # In the dropdown beside # **Organizér** nad modelem, vybrat **Patro 1**, **Patro 2** Nebo jiný stupeň. Tato úroveň je zobrazena na vlastní pěst a aktuální editor nastavení zůstává otevřený.
2. Upravte zvolenou úroveň s obvyklým tvarem, prostorem, reliéfním a shellovým ovládáním. Změna úrovně nekopíruje její nastavení na jiné úrovně.
3. Vyberte **Zobrazit zásobník** ve stejném pádu pro kontrolu všech úrovní a příslušenství dohromady. Použití **Sestava**, **Organizér**, **Vložky**, **Plášť** nebo **Víko** ukázat součástky, které potřebujete. Vraťte se na číselnou úroveň a pokračujte v její úpravě.
4. Pod **Tvar → úrovně**, upravit **Montážní vůle** a vytisknout malý vzorek fit před závazkem k plné zásobníku. Spodní děliče, které stojí nad ráfkem. Stahování vyžaduje vzpřímené stěny a souvislý opěrný ráfek.

Built- in a SVG reliéf zdobí exteriér každé úrovně, zatímco pářící obojky, jazyky a zásuvky zůstávají hladké. Obalené skořápky a dekorativní panely mohou pokrývat jednotlivé úrovně. Pro panely, ponechejte **Odsazení okraje** alespoň 3 mm, aby vyčistili pářící obojky.

S balenou skořápkou se jazyk uvnitř spodní stěny vejde do zásuvky pod podlahou horního panelu. Rozměry, hloubky a použitelné výšky zůstávají nezměněny; každá zásuvka přidává 2,2 mm do vnější výšky sestaveného zásobníku. Odpovídající skořepiny se setkávají na úzkém nosném pásmu 0,8 mm. Sklápění nábojnic se posune z výšky; oddělte úrovně před jejich odstraněním. Každá nábojnice exportuje jako samostatná výšková část.

**Spodní lem** je k dispozici pouze na první (nejnižší) úrovni: zvolte hladké, kroužky nebo kroky. S kompatibilní obalené skořápky, lemování také podporuje skořápku. Samostatné panely sedí nad lemem s zvoleným offsetem hrany. Nové horní úrovně nezdědí střih. Pokud se jazyk nemůže vejít do tloušťky stěny, snížit **Montážní vůle**; aplikace automaticky nezhoustne stěnu. U obou rohů musí zůstat dostatek materiálu, aby podpíral tác nad ním.

**Lid.** V **Tvar → Víko**, cvaknout **+ obálka**. Používejte horní ráfek s rovnými výškami vnějších stěn a děliči na ni nebo pod ní. Tento postup zabraňuje potisku na plást, plást a řezivo. Vyberte **Vnější** pro vnější uzávěr nebo **Zapuštěné** pro 2 mm desku, která sedí flush uvnitř zásobníku. Možnost insetování ustřihne sedadlo v horní stěně s vůlí 0,35 mm na každé straně a nechá prostor nad děliči a vložkami. Potřebuje alespoň 2 mm tloušťky stěny a 4 mm vnitřní hloubky. Přidejte stěnový výřez nebo rukojeť, aby se zvedl. Překrývající se víko má polohovací ráfek s vůlí 0,5 mm. Vyberte si jeho horní vzor, měřítko a hloubku, pak nastavte výšku ráfku a dokončit. Pro rukojeť zvolte válcové nebo tyčové, nastavte jeho velikost a výšku a volitelně zaoblené nebo zaoblené hrany. Rukojeť tiskne odděleně a lepí se na víko. Náhled zvedne překrývající se víko a zobrazí vsazené víko. Vyvezené víko je ploché pro tisk.

**Twotonův vzor.** Povolit to buď víko fit, pak vybrat Olive větev, Ginkgo listy, Fern frond, Tidal vlny, Řeka oblázky růstové kroužky nebo Voronoi buněk. Vyberte si barvu základny a barvu vzoru. Deska 3.2 mm má pevnou podložku 1.6 mm a vzor 1.6 mm. Vnější lokační ráfek a volitelná rukojeť doplňují celkovou výšku. U zasunutého víka umožňujte vnitřní hloubku nejméně 5,2 mm. Vývoz 3MF udržet obě barvy pohromadě jako jedno víko, a přiřadit dvě části na vlákno sloty. Pro olivovou ratolest, Ginkgo listy, Fern frond, Přílivové vlny a růstové kroužky, **Prořezávaný vzor** dělá motiv z otvorů v kontinuálním horním listu. Zkombinuj to s **Vystouplý vzor** aby odhalila zapuštěnou podporu skrz otvory. Povolit **Vystouplý vzor** nechat otvory v horní části 1.6 mm prázdné. Vyřaďte ho pro hladký vstup. Zdvižené vložené víčka tisknou nejprve podklad; překrývající se víčka tisknou lícem dolů. Zkontrolujte přemostění přes zákoutí v kráječi.

![Šest dvoutónových víček](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Jednodílné pláště a panely

Otevřít **Plášť** a vyberte vzor. Schránka je vytištěna odděleně od pořadatele. Pokud chcete vzor na těle samotném, použijte **Tvar → Úleva pořadatele**.

| Režim Shell | Montáž a montáž |
| --- | --- |
| **Kolem těla** | Jeden bezedný rukáv následuje po obvodu a výšce stěny. Posuňte ho po těle shora, po směru stěny na nakloněný model. Obraz ukazuje, zda je na stole podpěra nebo rukáv. |
| **Dekorativní panely** | Samostatné zarámované panely pokrývají vybrané strany a zanechávají odkryté rohy. Vyberte si strany a upravte **Odsazení okraje**. Lepicí panely bez upevnění. Se skrytými kolíky přitlačte každý panel přímo na odpovídající stěnu pro trvalé připevnění. |

![Vrchní pohled na rukáv, který zabaluje rohy a samostatné panely končící před každým rohem](../../images/shell-fit.svg)

Vyberte vzor, nastavte jeho velikost a nastavte **Tloušťka pláště**. Pro jednodílné pouzdro, seřídit **Šířka lemu** pro jeho pevný rám. Dekorativní panely mají pevný rám; použití **Odsazení okraje** Postavit je na zeď. Pod **Přistání**, **Mezera na každé straně** nastavuje mezeru mezi rukávem a organizátorem. Mezera 0,5 mm na každé straně přidává 1 mm na dvě protilehlé strany, než počítáte tloušťku skořepiny. Porovnat **Sestava** s izolovaným **Plášť** aby posoudil výsledek. **Stáhnout shell** vývoz krycího materiálu odděleně a **Odstraňte plášť** Odstraní to z návrhu.

Panely vyžadují kompatibilní obdélníkový základ. Přepínání na panely zachovává tloušťku stěny a prostor prostoru. Skryté montážní zásuvky vyžadují stěny o tloušťce nejméně 3,2 mm bez reliéfu. Pro tenčí stěny, včetně 2,4 mm, použijte panely bez spojovacích prostředků a přilepte je na místo. Tloušťka stěny se nikdy nezvýší automaticky. Off hrany panelu ovládá okraj na obličeji, zatímco vůle rukávů ovládá posuvnou kondici. Při spodním lemu začíná spodní offset v horní části lemu; spojky a zásuvky panelů mají stejný profil. K vyčištění jejich pářících obojků je zapotřebí minimálně 3 mm hrany.

<a id="projects-and-backups"></a>
## Projekty a zálohy

Použití **Moje projekty → Uložit kopii** pojmenovat návrh nebo vytvořit variantu před experimentem. Otevřený projekt automaticky ukládá do tohoto prohlížeče. Knihovna umožňuje vyhledávání, otevírání, přejmenování, mazání nebo stahování projektu. **Uložit projekt** v horním baru ke stažení editovatelné JSON Záloha. Použití **Otevřít** načíst tento soubor, včetně jiného počítače nebo v místní instalaci.

Zadané edity jsou okamžitě uloženy. Dočasná lokální obnovovací kopie chrání změny, zatímco databáze prohlížeče je ukládání; znovuotevření obnoví, že kopie v případě, že byl přerušen zápis. Samostatný naposledy úspěšný snímek může obnovit poškozenou aktuální relaci, včetně historie zrušení. Pokud není možné obnovit platnou kopii, automatické ukládání zastaví místo nahrazení uloženého projektu startérem. Udržujte stažitelné zálohování JSON: vymazání dat prohlížeče nebo selhání obou úložišť nelze obnovit automaticky.

Kontroly exportu patří do současné revize projektu, vybraných částí a montážní polohy. Změna těchto neplatnosti předchozí kontroly, starý výsledek nelze stáhnout jako nový model. Neúspěšné výpočty zachovají úpravy. Po dvou minutách se objeví chyba, další úprava geometrie spustí nový výpočet.

Pokud je stejný projekt nebo zásuvka editována ve více kartách, jsou protichůdné změny uloženy jako samostatný **Copy from another tab**. Druhá verze je uchována a editační záložka pokračuje s její kopií. Porovnat verze v **Moje projekty** nebo volič zásuvky a přejmenovat kopii, pokud si ji chcete nechat. Obnovení karty organizátora obnoví svůj vlastní uložený projekt. Změny se mezi kartami automaticky neslučují.

Před čištěním dat prohlížeče si uchovejte staženou zálohu. Každý prohlížeč a adresa stránky má svou vlastní knihovnu. Filtrační sloty jsou uloženy samostatně pro tiskárnu v prohlížeči. Nastavte je znovu při přesunu do jiného zařízení. Pro stažitelnou lokální aplikaci viz [Místní instalace](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Nastavení tisku a rozdělení na části

Pod **Tisk**, vyberte si tiskárnu a konfiguraci hlavy nebo vyberte **Vlastní rozměry**. Zkontrolujte šířku, hloubku a výšku konstrukce. Preset dodá objem výroby. Vyberte si tiskárnu, trysku, materiál a řezné profily ve vašem kráječi.

Pro model, který přesahuje postel, použijte navržené řezy nebo vyberte dva nebo tři části, jsou-li k dispozici. Přečtěte si navrhované polohy švu a použití **Odsuňte díly od sebe** abychom viděli, jak se sekce setkají. Rozdělení zvyšuje tloušťku stěny na nejméně 5 mm a tloušťku podlahy na nejméně 3 mm. Projděte si vnitřní dimenze. Před rozdělením odstraňte skořápky a vložky. Skládané podnosy, nakloněné modely a kruhové, oválné a voštinové základny vyžadují jednodílný tisk. **Vraťte celý model** Vypíná oddělení. Znovu zkontrolujte tloušťku, pokud chcete obnovit starší rozměry.

**Společný vzorek** stažení páření končí vyzkoušet ve stejném měřítku a nastavení tisku jako konečné tělo. Umístěte je odděleně s jejich základnou dole. Po ochlazení se kolíky o jmenovité hodnotě Ø 3,2 × 8 mm vejdou do otvorů Ø 3,3 mm, na každé straně švu hluboké 4,5 mm. Zkontrolujte zarovnání, pak použijte čepy a lepidlo pro sestavení tištěných sekcí. Použití **Stáhnout všechny části** pro samotného organizátora.

<a id="download-and-slice"></a>
## Stažení a příprava ve sliceru

1. V nabídce **Tisk** nastavte sloty filamentu pro vícebarevný soubor. Čísla slotů a barvy slaďte se slicerem. U Snapmaker U1 odpovídají sloty 1–4 hlavám T0–T3. Použít lze až 16 slotů; každému nastavte barvu a volitelně název materiálu. Barva slouží jen pro orientaci, nesimuluje vytištěný ani míchaný odstín. Přesné barvy a míchání nastavte ve sliceru. Vyberte kartu filamentu a zvolte **Odstranit filament ze slotu N**. Ostatní čísla se nezmění: po odstranění slotu 6 zůstane slot 7 stále slotem 7. **+ Slot N** znovu přidá nejnižší volné číslo; limit zůstává 16. Odstranění filamentu nezmění barvu modelu. Odstraněné sloty se při exportu nenabízejí ani automaticky nepřiřazují; vyberte jiný slot nebo jej přiřaďte ve sliceru. Různé barvy umožňují automatické přiřazení částí ke slotům. Pokud mají dva sloty stejnou barvu, vyberte požadovaný slot pro každou část v dialogu stahování.
2. Kliknout **↓ Stáhnout**. Vyberte **Organizér a příslušenství**, **Pouze plášť** nebo **Celá sada** Podle toho, které části potřebujete. Pro rozdělený model, exportujte soupravu.
3. Vyberte níže uvedený formát. Pro 3MF, přiřaďte vlákno slot na každou část nebo jej nechte pro přiřazení v kráječi. Orca může použít první vlákno pro nepřidělené části.
4. Čekat na geometrii a velikost kontroly. Přečtěte si rozměry každé části a jakékoli instrukce otočit 90 ° na posteli. Kontrola si vyhrazuje 2 mm na posteli hrany. Stáhnout s formátem tlačítko v dolní části dialogu.
5. Otevřete výsledek ve vašem kráječ na **100% stupnice v milimetrech**. Uspořádat kompletní sadu, zkontrolovat převisy a tenké detaily, a náhled na první vrstvu a děliče. Pro multikolorní tisk ověřte přiřazení vlákna každé části před krájením.

| Formát | Vyberte si ji | Co dělat se stažením |
| --- | --- | --- |
| STL | Geometrie pro jednobarevný tisk | Otevřete STL v kráječi. Extrahovat ZIP jako první, pokud export obsahuje několik STL. |
| 3MF | Kit s oddělenými díly, barvami a filamenty | Otevřete jej v kráječi a ověřte díly a sloty. ReplixGrid nechává tiskárnu a materiálové profily na kráječ. |
| OBJ + MTL | Barevný model nástroje, který přijímá OBJ | Udržujte geometrii a materiálový soubor pohromadě. Model používá milimetry s Z nahoru. |
| Projekt JSON | Pokračování v úpravách oddílů, rozměrů nebo příslušenství | Použití **Uložit projekt** a znovu otevřít s **Otevřít** ípa ReplixGrid. |


Chcete-li porovnat digitální barvu z vašeho kráječe, vložte jeho šestimístný **Kód HEX**, například `#E63522`, vedle barevného výběrčího. Vedení `#` je nepovinné. Platné kódy aktualizují náhled okamžitě; neúplný nebo neplatný text se nepoužije a vrací se do uložené barvy, když opustíte pole. Odpovídající HEX kód nesimuluje vzhled vlákna, osvětlení nebo fyzikální barevnou směs.

<a id="troubleshooting"></a>
## Řešení problémů

| Co vidíš | Co zkontrolovat |
| --- | --- |
| Objekt odpovídá vnějším rozměrům, ale nevejde se do zátoky. | Zvolte prostor a zkontrolujte jeho vnitřní měření. Povolte tloušťku stěny, zakřivené konce, vnitřní poloměr rohu a odnímatelné vložky. |
| Výběr děliče pokračuje v výběru zdi vpředu | Přepnout na **Shora** nebo otevřené **Všechny stěny a přihrádky** napravo. |
| Víko nebo další úroveň nelze přidat | Zkontrolujte, zda se jedná o úrovňový ráfek, rovné vnější výšky, vyčnívající děliče, naklápěcí nebo štípací tisk. U zásobníku zkontrolujte také pozůstatkové svorky a propustnost uložení vzhledem k tloušťce stěny. Built- in a SVG reliéf jsou podporovány na jednotlivých úrovních; plochy páření zůstávají hladké. |
| Část je větší než postel, i když stopa se zdála dost malá | V dialogovém okně ke stažení si přečtěte dokončené rozměry. Sklopení, reliéf, lemování a skořepiny mohou přesahovat základnu. Zkontrolujte zvolenou konfiguraci tiskárny a rotaci. |
| Skryté spojovací prostředky nejsou k dispozici | Používejte stěny o tloušťce nejméně 3,2 mm bez reliéfu, nebo zanechte spojovací prostředky a přilepte panely. Přechod na panely stěny nezhušťuje. |
| Panely překrývají spodní obrubník nebo ráfek ve starém provedení | Nastavte hranu nejméně 3 mm pro úrovně. Dolní část je měřena od horní části spodního lemu. Obnovte a stáhněte části po změně nastavení. |
| Stáhnutý tisk má špatné barvy | Použití 3MF, zápas čísla slot v **Tisk**, pak zkontrolovat per- část úkoly v kráječi. STL přenáší pouze geometrii. |
| Chybí návrh uložený na jiném zařízení | Převod projektu JSON a použití **Otevřít**. Knihovny prohlížečů jsou místní pro každé zařízení a adresu webu. |

<a id="project-variants"></a>
## Varianty projektu

Kliknout **+ Varianta** v horním panelu, nebo otevřené **Moje projekty** a vybrat **Nová varianta**. Zadejte jméno a klepněte na **Vytvořit variantu**. Nová varianta je nezávislá kopie, původní zůstává uložená. Nepojmenovaný originál je zachován jako **Koncept**.

Použijte volič vedle **+ Varianta** přepínat mezi souvisejícími modely, nebo vybrat jeden pod **Varianty tohoto projektu** v mých projektech. Každá varianta automaticky ušetří a po přepnutí nebo opětovném načtení si uchovává svou vlastní historii odd / redo. Nově vytvořená varianta začíná prázdnou historií.

Použití **Samostatný projekt → Uložit kopii** vytvořit nesouvisející projekt. Přejmenovat nebo smazat jednotlivé modely v Mých projektech; smazání originálu nevymaže jeho varianty.

**Stáhnout** exportuje vybraný model pro tisk. **Uložit projekt** stahuje tento model jako editovatelný JSON; **Soubor** na kartě knihovny stahuje odpovídající model. JSON obsahuje jeden model, bez jeho souvisejících variant nebo vrátit historii. Každý model uložte zvlášť pro přenos nebo zálohování kompletní sady.


<a id="shared-styles"></a>
## Sdílené styly

1. Otevřete projekt s barvami a vzory, které chcete znovu použít.
2. Pod **Tvar → Společný styl**, zadejte jméno a klikněte **Uložit aktuální styl**.
3. Otevřít jiný projekt nebo variantu, návrat **Společný styl**, a vyberte uložený styl.
4. Vyberte **Barvy**, **Vzory** Nebo obojí. Přezkum **Bude použito** a **Bude přeskočeno** zprávy, pak klepněte **Použít styl**.

Styl zachycuje barvu organizátora a reliéf, plus barvy a vzory stávající skořápky a víka. Hladký styl těla odstraňuje reliéf těla cíle. Rozměry, rozvržení prostoru, tloušťka stěny, víko fit, rukojeti a stírací otvory zůstávají beze změny. Chybějící víčka nebo skořepiny nejsou přidány. Nekompatibilní nastavení vzoru jsou přeskočeny s vysvětlením; kompatibilní nastavení lze stále použít. Vložit barvy a filament- slot přiřazení nejsou přenášeny.

Aplikace je jeden krok zpět a vytváří nezávislou kopii: později edituje na jednoho organizátora nemění ostatní. Smazání uloženého stylu nemění projekty, které jej již používají.

Uložené styly patří k tomuto prohlížeči a adrese stránky. Projekt JSON zachovává použitý vzhled, ale nezahrnuje knihovnu ve stylu Saved-. Chcete-li znovu použít styl na jiném zařízení, otevřete styl projektu JSON tam a uložit jeho současný styl znovu.


<a id="drawer-arrangements"></a>
## Uspořádání organizérů v zásuvce

Vyberte **DRAWER** vedle **Organizér**, pak **Create drawer**. Zadejte naměřenou vnitřní délku, šířku, použitelnou výšku a výšku. Clearance platí jak na stěnách zásuvky, tak mezi tácy.

Nové zásuvky začínají na 180 × 280 mm, přičemž přední okraj je vyznačen dole. **Otočit pohled o 90 °** mění pouze orientaci zobrazení; rozměry zásuvky, souřadnice podstavce a exportované modely zůstávají nezměněny. Stávající uspořádání zásuvek si zachovává jejich rozměry. Uložené zásuvky otevřené s délkou horizontální a šířkou svislé; štítky dimenzí se řídí ručním zobrazením rotace. Tlačítko pro střídání zásobníků se otáčí pouze zvoleným zásobníkem.

Použití **New organizer** vytvořit podnos přímo v šuplíku. Nastavte rozměry, pak upravte přihrádky a příslušenství v obvyklém editoru pořadatelů. **Zpět do zásuvky** se vrací na své místo. **Add saved organizer** přidává nezávislou kopii uloženého projektu nebo varianty; editace nikdy nemění svůj zdroj.

Přetáhněte podložky v horním pohledu nebo zadejte X / Y souřadnice měřené z levého horního rohu na vnější okraje podložky. Otočit o 90 stupňů, duplikovat nebo odstranit podložky. Šipky přesunout cílený podnos o 1 mm (Shift: 10 mm). Uspořádání zpět / redo obnovuje umístění a dokončené upravy podložky.

Schéma ukazuje smontované vnější ohraničující obdélníky, včetně skořápek, lemování, víček a úrovní. Zakřivené tvary jsou kontrolovány konzervativně spíše než pevně vnořené. Ohraničení, vůle a střety výšky jsou zvýrazněny. Čekejte na kontrolu geometrie před spoléháním na stav uložení. Vyberte volné umístění nebo umožněte montážní desku, jak je popsáno níže.

Kresliče ukládají v tomto prohlížeči místně, odděleně od organizátorů projektů. Stáhnout zásuvku JSON soubor pro zálohování nebo přenos; otevření jednoho vytvoří samostatnou kopii zásuvky. Vyberte podnos a vyberte **Download selected tray** pro své vlastní STL, 3MF nebo OBJ export se stávajícími printersize kontrolami. Souřadnice se nestávají umístěním potisku.

<a id="mounting-plates"></a>
### Montážní desky

V **DRAWER → Drawer base**, vybrat **Mounting plate**. Délka odsávače / šířka a světlost stěny určují pokrytou plochu. Zadejte použitelnou šířku a hloubku **3D tiskárna postel** samostatně: tyto rozměry určují maximální velikost průřezu, a tedy počet úseků. Výpočet zahrnuje kloubové výčnělky a 2 mm tiskařský okraj na každé posteli hrany. Rozměry nemusí být násobky větrací mřížky o průměru 20 mm; úseky hran vyhovují zbývajícímu prostoru.

**Download sections (ZIP)** vytvoří jedno číslo 3MF na tiskovou práci, SVG montážní mapa a seznam souřadnic. Mapa využívá původní orientaci zásuvky, nezávisle na otočení pohledu. R označuje řádky od shora dolů, C sloupce zleva doprava. Spodní přilehlé ocasy na místo shora. První tisk **Download joint sample**, obsahující dvě malé přilehlé sekce; před vytištěním celé sady zkontrolujte montáž s tiskárnou. Spojky používají 0,05 mm šev a 0,03 mm profil příspěvek. Slabý šev a mírná hra mohou zůstat mezi holými úseky.

Se zapnutým deskovým módem se stahování zásobníku skládá z podstavců pro umístění a rotaci zásobníku. Rozměry vnitřních prostorů jsou zachovány. Zásobník je o 2,1 mm vyšší, včetně desky 2 mm, přidává kontrola uložení zásuvky 4,1 mm. Po posunutí nebo otáčení zásobníku jej opět stáhněte: jeho zásuvky musí odpovídat polohám kolíku. Výměna odkládací plochy také mění původ pegu.

Radiální vůle socket je 0,12 mm. Vytiskněte malý pořadač s dvěma oddíly pro kontrolu vyhovujících nastavení materiálu a vrstvy. Zásuvky udržují pořadatele bočně; zdvihněte jej nahoru, abyste ho odstranili. Export používá pouze geometrii: zvolte tiskárnu a materiálové profily v kráječi a před tiskem zkontrolujte střešní zásuvky.

Montáž v současné době podporuje nerozdělené organizátory bez náklonu, s nejméně třemi plně podporovanými zásuvkami. Malé podnosy může být třeba přesunout nebo zvětšit. Vyšší úrovně a skořepiny si zachovají svou stávající geometrii. Vypněte režim vypínání desky pro export původního nezamontovaného modelu. Uložené zdrojové projekty zůstávají nezměněny.

<a id="custom-svg-relief"></a>
## Vlastní reliéf SVG

Pod **Tvar → Úleva pořadatele → My SVGs**, vybrat **Upload SVG** nebo upustit soubor do oblasti nahrávání. Pro její opětovné použití zvolte uložený náhled. Stejná knihovna je k dispozici pod **Tvar → Víko → My SVGs** a **Plášť → Vzorec → My SVGs**. Každý cíl si udržuje svůj vlastní vzor a nastavení umístění.

Vyberte **Single motif** nebo **Repeat**, vyberte vnější stěny, a upravit šířku motivu v milimetrech, rotace, horizontální / vertikální ofsetu, a opakovat mezeru. Šířka a výška udržují původní rozměry. Umístění je soustředěno na každou zvolenou stranu; na zakřivených tělech odpovídají strany čtyřem vnějším sektorům. Pozitivní vertikální posun posune motiv nahoru. Vzor následuje po vnějším obrysu. Opakování se umístí pouze tam, kde se kompletní motiv vejde pod horní okraj, kolem řezu a uvnitř každé strany. Na těchto hranicích jsou přistřiženy jednotlivé motivy. Relief hloubka používá existující **Relief deep / Intensity** Kontrolu. Původní stěny a vnitřní prostory jsou zachovány; vnější rozměry se zvyšují. Počkejte, až aktualizovaný náhled dokončí, pak zkontrolujte a stáhnout část.

Podporované SVG obsahují vyplněné cesty, polygony, obdélníky, kruhy nebo elipsy, včetně otvorů a skupinových transformací. Převést text a tahy na vyplněné cesty před exportem z vašeho vektorového editoru. Fotografie, externí reference, filtry, masky, výstřihové cesty, gradienty, CSS stylové bloky a odkazy na opakovaně použitelné prvky ( `use` ) nejsou podporovány. Prázdné nebo nepoužité definice obsahující podporované tvary jsou ignorovány. Barvy se stávají jedním zvýšeným tvarem pomocí barvy organizátora. Mezní hodnoty jsou 200 KB, 512 XML prvků, 128 vyplněných tvarů a 6000 vzorkovaných kontur; příliš složité vzory nebo nadměrné opakování se zamítají se zprávou. Křivky jsou aproximovány polygonálními obrysy pro tisk.

SVG jsou zpracovávány lokálně v prohlížeči. Knihovna zůstane na tomto zařízení. Každý projekt obsahuje nezávislou kopii použitých kontur, takže stažené projekty lze znovu otevřít na jiném zařízení bez zdroje SVG nebo do knihovny. Odstranění vstupu do knihovny ponechává stávající projekty nezměněné. **Společný styl** Také nese vlastní tělo, víko a shell vzory k jinému organizátorovi. Chybějící víčka nebo skořápky jsou přeskočeny, stejně jako s built- ve stylech. Udržet stažený projekt jako zálohu.

<a id="choose-an-svg-for-its-intended-use"></a>
### Výběr SVG podle účelu

An SVG je formát výkresu, není zárukou potiskovatelné geometrie. **Importovat úspěch pouze znamená, že podporované vyplněné obrysy byly přečteny.** Zvolený povrch, velikost a aplikační režim musí ještě projít kontrolou geometrie.

| Zamýšlené použití | Co se naplněné oblasti stanou | Co připravit |
| --- | --- | --- |
| Reliéf na organizátory | Povrchovaný materiál připevněný k pevné stěně | Samostatné motivy a vnitřní otvory mohou fungovat, protože je podporuje zeď. |
| Vzor zvýšeného víka | Povrchovaný materiál na pevné podložce | Vnitřní otvory jsou povoleny; celý nákres uchovávejte v dostupném rámu a mimo přistání rukojeti. |
| Prolijte otvory | Materiál odstraněný z víka | Každý zbývající kus se musí připojit k okolnímu víku. Uzavřené vnitřní detaily potřebují mosty. |
| Obalené skořápky nebo ozdobné desky | Otvory proříznuté přes kryt | Použít stencilokompatibilní výkres. Zbývající rám a vzor musí tvořit připojený materiál. |

Pro přípravu souboru:

1. Udržujte zamýšlené vyplněné cesty nebo základní tvary. Převést text a **zdvihy do obrysů** ve vašem vektorovém editoru. Viditelná čára s `fill="none"` je mrtvice, ne vyplněná oblast.
2. Odstraňte pozadí obdélníky, pokud nechcete, aby se celá oblast stala reliéfem nebo otvorem. SVG barvy neoddělují materiály a bílé tvary automaticky nemažou tmavší tvary pod nimi.
3. Zkontrolujte cesty ve vektorovém editoru. Komentář říká "díra" nevytváří jeden: cesta je navíjení a `fill-rule` určit, zda je vnitřní oblast vyplněna.
4. Pro průchozí otvory připojte uzavřené vnitřní detaily k okolnímu materiálu s mosty. Zvyšování mezery mezi opakovanými motivy dělá **ne** připojit volný detail uvnitř motivu. Alternativně použijte zvednutou reliéf na víko.
5. Pro opakovaný režim preferujte jeden motiv. Pokud SVG již obsahuje mřížku motivů, jeho šířka nastavení stupnice **celá mřížka**, ne každý motiv. Malé rysy mohou být příliš tenké na tisk.
6. Vyčkejte na úspěšnou kontrolu konstrukce a exportu, pak si prohlédněte náhled kráječe. Pokud budova selže, scéna si může ponechat poslední úspěšný model; tento model nereprezentuje současné neúspěšné nastavení.

Například pevná silueta může fungovat jak jako reliéf, tak jako otvor ve tvaru letáku. List s plně uzavřenou žílou může fungovat jako reliéf, ale odřezávání okolního listu může nechat žílu volnou. Naplněná šestiúhelníková mřížka může fungovat jako perforace, pokud zbývající pavučiny zůstanou spojeny a dostatečně tlusté; nejprve je třeba připravit multikolorní ilustraci taženou údery.

<a id="svg-lids-and-perforated-shells"></a>
### Víka SVG a perforované pláště

Přidat víko, pak vybrat **My SVGs**. **Povrchová reliéf (výzdoba)** tvoří jediné připojené víko s motivem na pevné podložce; nastavuje jeho reliéfní výšku (0,2-1 mm) a základní barvu. **Přes šablonu (řez)** odstraňuje naplněné SVG plochy skrz víko. Oba režimy zachovávají 2 mm hranový rám a pářící ret. Samostatná rukojeť udržuje pevné přistání; posun výkresu, pokud je s ním jediný motiv v rozporu. Vnější a vnitřní uložení používají stejné ovládací prvky. SVG Barvy uměleckých děl nejsou dováženy jako samostatná vlákna.

Pro shell, vyberte **My SVGs** a pak kresbu do knihovny. Naplněné oblasti se stávají otvory. Použijte jeden motiv nebo se opakuje na vybraných stranách zabaleného rukávu. Zapnout **Dekorativní panely**, Kresba se opakuje nezávisle na každém vybraném panelu; stávající rámy a montážní místa jsou zachována. Počáteční velikost motivu bere v úvahu výšku skořepiny. Nastavte šířku rámu, velikost motivu, rotaci, polohu a rozestup podle potřeby. Vnitřní oddíly organizátora a světlice zůstávají nezměněny.

Na víčka a skořepiny, pouze kompletní motivy jsou umístěny uvnitř dostupného rámu, včetně jednoduchých motivů. Pokud není vhodné, zmenšit velikost nebo ofsetu. Uzavřené vnitřní detaily (například centrum ring- tvarovaný výřezy) se mohou stát volné ostrovy. Přidat mosty ve vašem vektorovém editoru nebo použít zvýšený dekorace na víku. Aplikace blokuje odpojenou geometrii místo tiše odkládací kusy. Vyhněte se velmi úzkým pavučinám a zkontrolujte malý zkušební tisk pro váš materiál a trysku.

Vzor je zahrnut do individuálních exportů, kompletních souprav a tiskových úloh v celozásuvce. Přepínání zpět na **Built-in** Odstraní vlastní vzor pouze z tohoto cíle. Odstranění miniatury knihovny neodstraňuje vložené vzory z projektů.

<a id="download-ready-to-use-stencil-svgs"></a>
### Stažení hotových šablon SVG

Tyto příklady obsahují vyplněné obrysy s materiálními mosty. Černé oblasti se stávají otvory v **Přes šablonu (řez)** režim. Uložit odkazy níže jako `.svg` soubory; pokud prohlížeč zobrazí výkres, použijte **Uložit stránku jako** a zachovat `.svg` prodloužení.

| Stáhnout | Vzorec | Navrhovaná startovní šířka |
| --- | --- | --- |
| [Organické listy - stáhnout SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Pět listů s mosty spojujícími vnitřní detaily | 20 mm; zmenšit pro nízkou slupku |
| [Dvojitý šestiúhelník - stáhnout SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Jedna dvojitá šestiúhelníková dlaždice se čtyřmi mosty a středovým otvorem | 20-24 mm; použití **Repeat** pro mřížku |

**Na víku:** přidat víko pod **Tvar → Víko**, otevřené **My SVGs** a nahrajte oba soubory. Vyberte **Přes šablonu (řez)**. Začněte s **Single motif** zkontrolovat, nebo vybrat **Repeat** k vyplnění dostupného prostoru kompletní kopie. Nastavit kompenzaci šířky, rotace a X / Y. Opakované rozestupy jsou mezery mezi úplnými kopiemi, nikoli šířkou jejich vnitřních mostů. Začněte s rozestupem 4 mm. Soubor listů je již skupina pěti listů: šířka škály celé skupiny.

**Na krunýři:** otevřené **Plášť → Vzorec → My SVGs**, nebo si vybrat **Plášť** tab ve studiu, pak vyberte stejný soubor ze sdílené knihovny. Nábojnice se vždy používají přes otvory. Použití **Repeat** pro pásmo kolem krunýře; **Dodatečné → SVG walls** vybere strany zabalené skořápky. Dekorativní panely používají vybrané strany panelu. Každý povrch si zachovává vlastní umístění a nastavení tloušťky. Výměna studiových karet ukazuje odpovídající část.

Pokud se motiv nehodí, zmenšte jeho šířku nebo posun. Na nízké krunýři zkuste 12- 16 mm pro listovou skupinu. Zvyšování tloušťky skořepiny může zvětšit jeho automatický okraj a zanechat méně prostoru pro kreslení. Zúžení také zužuje mosty: zkontrolujte je ve vašem kráječi a vytiskněte malý vzorek pro vaši trysku a materiál. Opakované rozestupy nemohou rozšířit vnitřní mosty. Vyčkejte na dokončení aktuálního náhledu a pak použijte **Stáhnout** zkontrolovat a exportovat víko nebo krunýř.

<a id="numeric-sliders-and-valid-ranges"></a>
### Číselné posuvníky a povolené rozsahy

Zobrazovat číselné nastavení **Min** a **Maxi.** nad tenkou zelenou tratí, s bílou značkou pro aktuální hodnotu. Červené koncové uzávěry označují vnější z povoleného intervalu; nejsou hodnocením pevnosti tisku. Přetáhněte značku, pomocí kláves se šipkami při soustředění, nebo zadejte přesné číslo a stiskněte Enter. Číselné pole a posuvník používají stejné limity. Některé limity se mění s modelem; hodnota uvnitř rozsahu posuvníku může být stále v rozporu s jiným nastavením, takže postupujte podle jakéhokoliv varování geometrie před vývozem.

<a id="whole-drawer-export"></a>
## Export celé zásuvky

Vyberte **DRAWER → Print entire drawer** pro přípravu všech podnosů, jejich příslušenství a libovolných částí montážních desek. Montované podnosy dostávají zásuvky pro jejich uložené pozice; běžné volnočasové podnosy si ponechávají své stávající základny. Projekty rozstřikování zahrnují jejich části a špendlíky. Překrývání, nedostatečná čidla zásuvky, nepodporovaná montáž nebo neplatná geometrie blokují stahování a identifikují postižený podnos.

Nastavit **Printer bed length** (horizontální), **Printer bed width** (vertikální), výška a rozteč tisku. Počáteční rozměry pocházejí z nastavení montážní desky nebo z tiskového prostoru prvního zásobníku. Následné nastavení exportu je uloženo v tomto šuplíku. Pro zvolené lůžko se regenerují montážní desky. To nepovoluje podnosy ani nemodifikuje uložené zdrojové projekty.

Rozvržení používá skutečné exportované ohraničení boxy, 2 mm okraj na okraji postele a zvolené rozestupy. Části mohou otáčet 90 stupňů. Multicolour víka komponenty zůstat pohromadě. Zobrazený počet lůžek je pro toto uspořádání, není zaručeno minimum. Podpory, brim, proplachovací věže, tiskárny vyloučení zóny a různé materiálové práce nejsou zahrnuty; rezervujte vhodný prostor a zkontrolujte výsledek ve vašem kráječi. Žádný profil tiskárny nebo slot vlákna nejsou vloženy.

V roce ZIP obsahuje **bed-NN.3mf** pro každou postel, odpovídající **bed-NN.svg** diagramy, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** a očíslovaný seznam částí v **README.txt**. Otevřít každý 3MF jako samostatnou tiskovou práci si uchovejte relativní polohy svých objektů, použijte milimetry ve 100% měřítku a přiřaďte vlákna. V roce SVG Schémata ukazují ohraničující obdélníky; 3MF obsahuje celou tisknutelnou geometrii. Souřadnice pro montáž kabelů vždy používají délku vodorovně a šířku svisle.

Změny rozložení nebo nastavení exportu neruší předchozí výpočet. Zavření okna ruší přípravu. Přerostlé jednotlivé díly jsou hlášeny spíše než tiše zmenšené nebo automaticky rozdělené. Velmi velké sady může být třeba exportovat v menších skupinách.

<a id="pattern-studio"></a>
### Studio vzorů

Vyberte **Povrchová reliéf (výzdoba)** nebo **Přes šablonu (řez)** v horní části pravé ruky nastavení. Nábojnice podporují pouze šablonový režim. Nastavení ukazuje reliéfní výšku pouze pro reliéfní a mezery pouze pro opakované umístění. **Materiál tloušťka** je editovatelná: 1.2-6 mm pro SVG víko a 1-4 mm pro krunýř. Mění to náhled a export společně. Stávající výpadky víka zůstávají 3,2 mm pro reliéf a 2 mm pro šablonu; zvolená tloušťka je zachována při přepínání režimů. Výška reliéfu je zahrnuta v tloušťce víka. Inset SVG víko vyžaduje vnitřní hloubku alespoň tloušťky desky plus 2 mm. **Dodatečné** obsahuje barvu víčka nebo výběr stěny shellu. Otevřít **Které soubory SVG fungují?** pro dovozní limity a doporučení pro přípravu.

Otevřít **Tvar → Víko → My SVGs** nebo **Plášť → Vzorec → My SVGs** editovat vzory příslušenství v dolní zásuvce. **Víko** a **Plášť** Tagy udržují nezávislá nastavení při sdílení SVG Knihovna. Přepínací karty automaticky izolují tuto část v náhledu. Pokud se ještě nepřidá, zůstává sestava viditelná až do vytvoření části. Nad modelem si stále můžete vybrat Montáž ručně. Pomocí ovládačů šířky, rotace, intervalu a X / Y pro umístění motivů; centrální tlačítko resetuje pozici a rotaci. Víko podporuje zvednutou reliéfu nebo otvory. Otvory uliček udržují rám a montážní plochy. Blízko s × nebo Escape při soustředění ve studiu; edity zůstávají uloženy. Klávesy se šipkami přepínají na cílenou plochu.
