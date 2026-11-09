<a id="replixgrid-user-guide"></a>
# Podręcznik użytkownika ReplixGrid

Zaprojektuj organizer z wymiarami w milimetrach, sprawdź dopasowanie części i pobierz je do slicera. Na początek skorzystaj z ilustrowanego przykładu kapsuły w szybkim starcie. Ten podręcznik opisuje poszczególne ustawienia.

[Otwórz ReplixGrid](https://grid.replixcast.com/?lang=pl) · [Szybki start](USER-GUIDE.md) · [Instalacja lokalna](../../../README.md#local-installation)

| Rozdziały podręcznika |
| --- |
| [Obszar roboczy i widoki](#workspace-and-views) |
| [Kształt i wymiary](#shape-and-dimensions) |
| [Przegródki i ścianki działowe](#compartments-and-dividers) |
| [Wysokość ścianek i wycięcia](#wall-heights-and-cutouts) |
| [Narożniki, krawędzie i dekoracje](#corners-edges-and-decoration) |
| [Wkłady, piętra i pokrywy](#inserts-tiers-and-lids) |
| [Osłony jednoczęściowe i panele](#sleeves-and-panels) |
| [Projekty i kopie zapasowe](#projects-and-backups) |
| [Ustawienia druku i podział na części](#print-setup-and-sectioning) · [Pobieranie i przygotowanie w slicerze](#download-and-slice) |
| [Warianty projektu](#project-variants) · [Wspólne style](#shared-styles) |
| [Układ organizerów w szufladzie](#drawer-arrangements) · [Płyty montażowe](#mounting-plates) |
| [Własny relief SVG](#custom-svg-relief) · [Studio wzorów](#pattern-studio) |
| [Eksport całej szuflady](#whole-drawer-export) |
| [Rozwiązywanie problemów](#troubleshooting) |

<a id="start-a-new-project"></a>
## Rozpoczęcie nowego projektu

Przy pierwszym uruchomieniu obszar roboczy jest pusty. Przewodnik po lewej prowadzi przez trzy kroki: **Wybierz kształt → Ustaw wymiary → Dodaj przegródki**. Wybierz kształt, ustaw wymiary i kliknij **Dalej: przegródki**. Zakończ przyciskiem **Gotowe** lub **Pozostaw bez przegród**. Po wybraniu kształtu możesz zamknąć przewodnik przyciskiem **×**. Możesz też otworzyć zapisany projekt lub plik JSON.

**Na małych ekranach:** gdy okno przeglądarki ma szerokość do 1400 px włącznie, kreator znajduje się **pod modelem** i nie zasłania podglądu. Przewiń **stronę w dół**, aby dotrzeć do kreatora, kolejnych kroków oraz przycisków przejścia do przegródek i zakończenia. Przewiń stronę z powrotem w górę, aby zobaczyć model. W szerszych oknach kreator pozostaje obok lewego menu.

Otwórz przewodnik ponownie przez **Pomoc → Przewodnik: trzy kroki**. Samo otwarcie nie zmienia modelu. Wybranie innego kształtu zastępuje bieżący model; tę czynność można cofnąć.

Szybki start, podręcznik i menu pomocy używają wybranego języka interfejsu. Film pozostaje w języku angielskim.

Kroki, wskazówki i potwierdzenia w przewodniku są przetłumaczone. Wiersz zapisanego modelu nosi nazwę **Poprzedni projekt**. Rzeczywiste nazwy w **Moje projekty** pozostają takie, jak je zapisano.

Stosowanie **Nowy projekt** w górnym barze, aby powrócić do tego czystego początku. Twoja bieżąca praca jest najpierw zapisywana; nienazwany szkic jest zachowany w **Moje projekty**. Istniejące projekty, warianty, szczeliny żarowe i konfiguracja drukarki nie są usuwane. Panel pokazuje miniaturę z etykietą **Poprzedni projekt** z **Zapisano w „Moich projektach”**; kliknij ten wiersz, aby ponownie otworzyć bibliotekę. Płótno jest natychmiast wyczyszczone i pozostaje puste aż do wyboru nowego kształtu, tak jak na pierwszej wizycie. Dopóki nie wybierzesz nowego kształtu, oszczędzanie i eksport są wyłączone. Zamiast tego można otworzyć projekt z **Moje projekty** lub import JSON Plik. Odświeżenie tej zakładki empty- start utrzymuje ekran startowy; ponowne otwarcie istniejącego projektu przywraca model. Zwykłe wizyty powrotne wznawiają uratowaną pracę.

Wybór **Kształt → Baza → Utwórz z szablonu** podczas edycji nadal zastępuje budowę w ramach obecnego projektu i może być cofnięty. Stosowanie **Nowy projekt** kiedy chcesz mieć osobny model.

<a id="workspace-and-views"></a>
## Obszar roboczy i widoki

Otwórz narzędzie w lewym górnym rogu. **Kształt** zmienia korpus i jego akcesoria. **Przegródki** zmienia układ. **Osłona** projektuje oddzielną zewnętrzną osłonę. **Druk** ustawia obszar roboczy, szczeliny żarowe i opcjonalne cięcia sekcji. Kliknij numer przedziału, ścianę lub rozdzielacz na modelu, aby otworzyć ustawienia po prawej stronie. Jeśli część jest trudna do kliknięcia, rozszerzyć **Wszystkie ściany i przedziały** i wybrać go po imieniu.

Wybierz sekcję w menu po lewej. Jej ustawienia otworzą się w panelu u dołu podglądu; model i siatka pozostają widoczne za nim. Panel uzupełnia lewe menu. Strzałka go zwija, a **×** zamyka. Aby zmienić grupę ustawień, wybierz inną sekcję. Panel po prawej nadal pokazuje ustawienia wybranej ścianki lub komory.

Przeciągnij tło, aby obrócić model; kółko myszy zmienia przybliżenie, a przeciąganie prawym przyciskiem przesuwa widok. **Kamera zwrotna** przywraca kadr. **Z góry** ułatwia wybór wąskich komór i przesuwanie przegród, a **3D** pokazuje wysokości i złożony model. **Siatka** włącza siatkę co 10 mm z głównymi liniami co 50 mm. Przyciski nad modelem pokazują osobno organizer, wkłady, osłonę lub pokrywę; **Razem** pokazuje dostępne części razem. Przy wielu poziomach otwórz menu obok **Organizer**: **Wyświetl stos** pokazuje całość, a numer poziomu pozwala edytować go oddzielnie. Dolny edytor pozostaje otwarty. W widoku stosu **Osłona** i **Wkłady** obejmują części wszystkich poziomów. W wąskim oknie przyciski przechodzą do osobnego wiersza pod narzędziami. Dla samej pokrywy **Od spodu** pokazuje jej spód. **Esc** zamyka panel narzędzia. Zakrzywione strzałki cofają i ponawiają zmiany.

Użyj górnego paska, aby wybrać język interfejsu lub przełączać między światłem, ciemnością i wyglądem systemu. Nazwy sterowania w tym przewodniku podążają za wybranym językiem interfejsu.

<a id="shape-and-dimensions"></a>
## Kształt i wymiary

Pod **Kształt → Baza**, wybierz profil bazowy i wysokość, a następnie kliknij **Utwórz z szablonu**. Przycisk zastępuje bieżącą konstrukcję. Zapisz najpierw nazwaną kopię, jeśli chcesz zachować oba wzory. **Proste półfabrykaty** oferuje również pusty korpus i czterokomorowy punkt startowy.

| Podstawa | Kiedy wybrać |
| --- | --- |
| Zaokrąglone | Prostokątny ślad z regulowanymi narożnikami zewnętrznymi. |
| kapsułki | Długie ciało z półkolistymi końcami. Pochylony szablon przenosi nachylenie przez obie zakrzywione końce. |
| Koło | Okrągły organizator wielkości średnicy. |
| Owalny | Podłużny kontur z oddzielnie regulowaną szerokością i głębokością. |
| Honeycomb | Klaster sześciokątnych komórek dzielących ściany. Wybierz komórkę, aby dostosować jej wysokość. |

Wybierz **Gładkie** dla obręczy poziomej, **Pochyły** dla ciągłego wzrostu, lub **Stopnie** dla różnych poziomów wzrostu. Wymiary poniżej wyborów opisują szablon, który masz zamiar stworzyć. Po utworzeniu, edytuj model pod **Wymiary**. Szerokość i głębokość mierzy zewnętrzny ślad. Wymiary wewnętrzne wybranego przedziału należy mierzyć dla danego obiektu. Na zakrzywionej podstawie, również sprawdzić zwężenie końców w **Z góry** Widok.

![Kapsułka z niskim końcem dla dostępu, wysoki koniec dla długich przedmiotów i dwa przegrody poprzeczne](../../images/capsule-sloped.jpg)

W **Kształt** → **Dodatkowe** ustaw grubość ścianek i dna. Grubsze ścianki zmniejszają miejsce w komorach. **Przechyl na płaskiej podstawie** pochyla ścianki do przodu maksymalnie o 25°, pozostawiając dno poziome. Pochylona górna krawędź zmienia natomiast wysokość ścianek wzdłuż korpusu. Przy włączonym pochyleniu sprawdź końcowe gabaryty w oknie pobierania.

<a id="exact-internal-dimensions"></a>
## Dokładne wymiary wewnętrzne

Wybierz komorę i otwórz **Wymiary wewnętrzne** po prawej albo kliknij niebieski wymiar na modelu. Wybierz szerokość lub głębokość i wpisz milimetry. Kliknięcie poza polem lub **Enter** zatwierdza, a **Escape** anuluje. W prawym panelu użyj **Zastosuj**. Nieprawidłowe wartości nie zmieniają modelu. Każdą zatwierdzoną zmianę można cofnąć jednym krokiem.

Pomarańczowy dzielnik jest jego bieżącą pozycją; przekreślona niebieska linia przedstawia nową pozycję. Najbliższy otwór na wybranej osi przesuwa się, utrzymując zewnętrzny rozmiar ciała i grubość ścianki bez zmian. Panel pokazuje dotknięte sąsiadujące rozmiary. Jeżeli na tej osi nie ma rozdzielacza, dostosuj wymiary całkowite lub najpierw podziel przedział.

W prostym rzędzie, rozpocząć od przedziału 1 i kontynuować w kolejności; ostatni przedział zajmuje resztę. Sąsiadne wymiary nie są zablokowane, więc edycja wcześniejszego przedziału może zmienić rozmiar późniejszego.

Obsługiwane są zaokrąglone narożniki, kapsuły, fazy i zaokrąglenia wewnętrzne. Niebieska linia mierzy wymiar wewnętrzny przez środek komory, tuż nad dnem. Przy krzywiznach może być mniej miejsca: zostaw luz i sprawdź cały obrys przedmiotu. Dokładna edycja komór nie jest jeszcze dostępna dla kół, owali, plastra miodu ani pochylonych ścianek.

Wybierz ścianę lub rozdzielacz, aby edytować jej wysokość bezpośrednio na modelu. Płaskie ściany pokazują jedną wartość; dwupunktowe profile pokazują wartości A / B. Reguły Linked- high i Stepped- wall pasują do prawego panelu. Te etykiety edytują wysokość, nie długość ściany lub globalną grubość.

<a id="compartments-and-dividers"></a>
## Przegródki i ścianki działowe

Dla szybkiego układu, użyj **Przegródki → + Przedział** do podziału największego przedziału. **− Przedział** Łączy sąsiadującą parę. W plastrze miodu, te urządzenia sterujące dodają lub usuwają zewnętrzną komórkę i zachowują wielkość pozostałych. Dwie sąsiadujące komórki plastra miodu dzielą ścianę tak wysoką jak ta wyższa.

Aby uzyskać dokładny układ, przełącz na **Z góry** i wybierz przedział, który chcesz podzielić. Wybierz **Liczba części** Więc... **Podział szerokości** podział szerokości na mniejsze przedziały, lub **Podział dogłębnie** do robienia płytszych. Możesz znowu podzielić jeden z wyników. Na ołówek obok dwóch małych tac, najpierw podzielić szerokość na dwa, a następnie podzielić tylko stronę tacki w głębokości.

![Przykład widoku z jedną zatoką głębokości pełnej i dwoma mniejszymi przegródkami](../../images/compartment-splits.svg)

Wybierz dzielnik, aby go przeciągnąć lub dostosować **Pierwsza komora** poniżej **Położenie przegrody**. Tylko wybrane ruchy dzielnika; pozostałe pozycje dzielnika pozostają stałe. Przyległe przedziały zmieniają rozmiar. Ruchy, które pozostawiają zbyt mało miejsca są odrzucane. Sprawdzić nowe wymiary wewnętrzne z każdej strony. **Usuń partycję** łączy przedziały i może również usunąć dzielniki zagnieżdżone wewnątrz tego podziału. Przejrzyj zaznaczony wybór i potwierdzenie przed jego usunięciem.

<a id="wall-heights-and-cutouts"></a>
## Wysokość ścianek i wycięcia

Wybierz zewnętrzną ściankę lub przegrodę. **Jedna wysokość** tworzy krawędź o stałej wysokości; **Dwa punkty** ustawia wysokości końców A i B oznaczonych na modelu. **Bezpośrednie**, **Faliste** i **Zygzak** określają profil krawędzi. Długość fali reguluje odstęp powtórzeń. W szablonie schodkowym zmiana stopnia zmienia też powiązaną ściankę i przegrodę.

Stosowanie **Połącz wysokości sąsiednich ścian** Żeby na zewnątrz ściana podążała za sąsiadami. Dla rozdzielacza, **Dopasuj do sąsiednich ścian** raz skopiuje dwie wysokości końcowe. Powtórzyć dopasowanie po zmianie sąsiednich ścian. **Podobnie jak inni** zwraca wybraną ścianę do wspólnej wysokości.

Otwórz **Wycięcie w ścianie** Aby uzyskać dostęp do otwarcia. Wybierz gładką gałkę, średnik lub prostokątny otwór, ustawić szerokość i głębokość, a następnie przenieść go wzdłuż ściany. Pozycja biegnie od końca A do B Głębokość mierzy się w dół od górnej krawędzi. Sprawdzić pozostałe wargi nad dnem. Wybierz **Brak wycięcia** by wypełnić otwór. Zamiast tego Honeycomb używa wysokości komórek. Stepped koła i owale nie wspierają wycinanki w zewnętrznych ścianach.

<a id="corners-edges-and-decoration"></a>
## Narożniki, krawędzie i dekoracje

Otwórz **Kształt → Narożniki i fazowania**. Trzy urządzenia sterujące wpływają na różne części druku.

| Kontrola | Gdzie szukać | Co to zmienia? |
| --- | --- | --- |
| narożniki zewnętrzne | Widok górny, obrys zewnętrzny | Okrąg rogów stóp lub wyciąć je w 45 °. Zero daje kwadrat narożnik. Dostępny na prostokątnej rodzinie baz. |
| Promień wewnątrz przedziałów | Widok z góry, wewnątrz zatoki | Zaokrągla pionowe skrzyżowanie, gdzie spotykają się dwie ściany. Napięte zatoki ograniczają dostępny promień. |
| Górna krawędź ścian i dzielników | Odcinek krzyża przez ścianę | **Faza** wycina płaski kołek i **Zaokrąglanie** Zakrzywia wargę. Obie strony ścian zewnętrznych i dzielników otrzymują wykończenie. **Bez obróbki** Przywraca kwadratową wargę. |

![Przegrody ścienne o tej samej grubości ścianki, kwadratowe, szare i zaokrąglone narożniki](../../images/top-edge-profiles.svg)

Na przykład, na ścianie 2 mm spróbuj szamfer 0,5 mm. Każda strona traci 0,5 mm na samej górze, pozostawiając płaski pasek o grubości 1 mm. Maksymalny wyświetlany rozmiar zależy od grubości ścianki. Z **Zaokrąglanie**, wartość jest promieniem w milimetrach.

- **Kolor organizera** zmienia podgląd i kolorowy eksport. Wybierz swatch, niestandardowy kolor lub konfigurowany kolor filamentu. Przypisanie rzeczywistego szczeliny filamentu przy wywozie.
- **Dolna listwa** dodaje zespół projekcyjny wokół bazy. Wybierz gładkie, paski lub depilacji i ustawić jego wysokość. Kompatybilny rękaw może na nim spoczywać. Trim wymaga nieprzechylonego, jednoczęściowego korpusu i jest dostępny na pierwszym poziomie. Oddzielne panele siedzą nad nim z wybranym przesunięciem krawędzi.
- **Płaskorzeźba organizatora** dodaje wzniesiony wzór bezpośrednio do zewnętrznej ściany. Przewiń katalog wzorów, ustaw rozmiar wzoru i wysokość reliefu, i oglądaj aktualizację modelu podczas przeciągania jak każda kalkulacja kończy. Wartość końcowa wykorzystuje pełną precyzję. Wewnątrz jest gładko. Projekcje zwiększają wymiary zewnętrzne. Wybierz **Gładkie** aby usunąć relief.
- **Podpis i odznaka** umieszcza napis lub symbol na wybranej stronie. Wprowadź tekst, wybierz czcionkę, ustaw wysokość litery i pozycję pionową, a następnie wybierz podniesione litery lub grawerowanie i ustaw wysokość lub głębokość. Gwiazda lub serce mogą towarzyszyć tekst. Na okrągłych i owalnych organizerów, tekst i ikony po zakrzywionej ścianie, w tym w STL oraz 3MF Wywóz. Odstęp literowy mierzy się wzdłuż powierzchni. Wybierz przód, tył, lewo lub prawo, aby wyśrodkować napis z tej strony. Na kręgach i owalach z połączonymi lub zmiennymi wysokościami ścian, napisy pozostaje poniżej najniższego profilu ściany i wycinanie. Napisy na plastrze miodu nie są jeszcze obsługiwane; osłony pokrywające wybraną stronę i relief może również zapobiec napisach. Napisy na ścianie płaskiej nadal wymagają profilu na wysokość stałą. Jeżeli napis biegnie do wycięcia lub przekracza dostępną twarz, obniżyć pozycję lub zmniejszyć rozmiar litery.

<a id="inserts-tiers-and-lids"></a>
## Wkłady, piętra i pokrywy

**Wyjmowane wkłady.** Wybierz komorę i otwórz **Włóż do przegródki** po prawej. **Pusty** tworzy otwarty pojemnik, **Na drobne rzeczy** siatkę z regulowanymi rzędami i kolumnami, a **Do uchwytów** gniazda na długopisy lub narzędzia. Podaj ich średnicę wewnętrzną; aplikacja zmieści tyle gniazd, ile się da. Wybierz obrys dopasowany do komory, zaokrąglony, okrągły, owalny lub sześciokątny oraz kolor. **Wyjąć wkładkę** usuwa wkład. Pusty wkład również jest częścią do wydruku.

Wkładka podąża za przegrodą z prześwitem co najmniej 0,5 mm. Jego ściany i dno są o grubości 1,2 mm, a jego wysokość dostosowuje się, aby zakończyć około 1 mm poniżej obręczy. Wstawić w przechylony organizator wychodzi wzdłuż zbocza. Izolacja **Wkłady** do kontroli, a następnie eksportu **Organizator i akcesoria**. Wkłady wymagają drukowania jednoczęściowego.

**Tace w zestawie.** Zacznij od obręczy poziomej, a następnie otwórz **Kształt → Poziomy → + Poziom**. Możesz użyć dwóch do pięciu poziomów; **− Poziom** usuwa poziom. Tiers wspólne ślad, ale może mieć różne przedziały, wysokości, kolory i dekoracje.

1. In the dropdown beside **Organizer** powyżej modelu, wybierz **Poziom 1**, **Poziom 2** albo inny poziom. Ten poziom jest wyświetlany samodzielnie, a bieżący edytor ustawień pozostaje otwarty.
2. Edytuj zaznaczony poziom z typowym kształtem, przedziałem, ulgą i powłoką. Zmiana poziomu nie kopiuje ustawień do innych poziomów.
3. Wybierz **Wyświetl stos** w tym samym spadku do kontroli wszystkich poziomów i akcesoriów razem. Stosowanie **Razem**, **Organizer**, **Wkłady**, **Osłona** lub **Pokrywka** Aby pokazać części, których potrzebujesz. Powrót do poziomu liczbowego, aby kontynuować jego edytowanie.
4. W **Kształt** → **Poziomy** ustaw **Luz pasujący** i sprawdź dopasowanie na małej próbce przed drukiem całej wieży. Obniż przegrody wystające ponad krawędź. Piętrowanie wymaga pionowych ścianek i ciągłej krawędzi podparcia.

Wbudowane i SVG Relief udekorować na zewnątrz każdego poziomu, podczas gdy godowe obroże, języki i gniazda pozostają gładkie. Owinięte powłoki i panele dekoracyjne mogą pokrywać poszczególne poziomy. Do paneli, przechowywać **Przesunięcie krawędzi** co najmniej 3 mm, aby oczyścić obroże godowe.

Przy osłonie obwodowej wypust po wewnętrznej stronie dolnej ścianki wchodzi w gniazdo pod dnem górnego pojemnika. Użyteczna szerokość, głębokość i wysokość komór pozostają bez zmian; każde gniazdo dodaje 2,2 mm do zewnętrznej wysokości stosu. Osłony stykają się na pasku podparcia o szerokości 0,8 mm. Nasuwają się od góry, więc przed zdjęciem rozdziel poziomy. Każda osłona eksportuje się osobno z numerem poziomu.

**Dolna listwa** jest dostępny tylko na pierwszym (najniższym) poziomie: wybrać gładkie, pierścienie lub kroki. Dzięki kompatybilnej obudowanej powłoce, wykończenie wspiera również powłokę. Oddzielne panele siedzą nad wykończeniem z wybranym przesunięciem krawędzi. Nowe górne poziomy nie dziedziczą wykończenia. Jeśli język nie może zmieścić się w grubości ściany, zmniejszyć **Luz pasujący**; aplikacja nie zagęszcza ściany automatycznie. Wycinanie ścian musi pozostawiać wystarczającą ilość materiału w pobliżu obu narożników, aby podtrzymać tacę nad nim.

**Pokrywa.** Otwórz **Kształt** → **Pokrywka** i kliknij **+ Okładka**. Górna krawędź musi mieć jednakową wysokość, a przegrody nie mogą ponad nią wystawać. Pochylenie, plaster miodu i druk dzielony są niezgodne z pokrywą. **Nakładana** nakłada się z zewnątrz; **Wpuszczana** to płyta 2 mm osadzona równo z krawędzią wewnątrz. Jej gniazdo ma luz 0,35 mm na stronę i zostawia miejsce nad przegrodami i wkładami. Potrzebne są ścianki od 2 mm i głębokość wewnętrzna od 4 mm. Dodaj wycięcie lub uchwyt do podnoszenia. Pokrywa zewnętrzna ma obrzeże centrujące z luzem 0,5 mm. Ustaw wzór, rozmiar, głębokość, wysokość obrzeża i wykończenie. Uchwyt może być walcowy lub podłużny, z regulacją rozmiaru, wysokości, faz i zaokrągleń. Drukuje się osobno i przykleja. Podgląd pokazuje pokrywę zewnętrzną uniesioną, a wewnętrzną osadzoną. Eksport układa pokrywę płasko do druku.

**Dwukolorowy wzór** jest dostępny dla obu rodzajów pokrywy. Wybierz gałązkę oliwną, liście miłorzębu, paproć, fale, kamyki rzeczne, słoje drewna lub komórki Voronoia oraz kolory podstawy i wzoru. Płyta 3,2 mm składa się z pełnego podłoża 1,6 mm i warstwy wzoru 1,6 mm. Zewnętrzne obrzeże i uchwyt zwiększają wysokość. Pokrywa wpuszczana potrzebuje głębokości wewnętrznej od 5,2 mm. Eksportuj 3MF, aby zachować razem obie kolorowe części, i przypisz filamenty. Dla oliwki, miłorzębu, paproci, fal i słojów **Wzór ażurowy** tworzy otwory w górnej warstwie. **Wypukły wzór** pozostawia je puste na głębokość 1,6 mm, odsłaniając podłoże; wyłącz go dla gładkiej intarsji. Wpuszczane pokrywy z reliefem drukuje się podłożem w dół, a nakładane — wzorem w dół. Sprawdź mosty nad zagłębieniami w slicerze.

### Kolory pokrywy i filamenty

Wybierz uchwyt cylindryczny lub listwę, aby wyświetlić **Kolor uchwytu pokrywy**. Domyślnie włączona jest opcja **Jak podstawa pokrywy**: uchwyt przyjmuje kolor podstawy pokrywy. Wybierz inny kolor, aby ustawić uchwyt niezależnie; ponownie włącz opcję, aby przywrócić powiązanie. Uchwyt nadal jest osobnym elementem do druku.

Kliknij próbkę obok **Kolor podstawy pokrywy**, **Kolor wzoru pokrywy** lub **Kolor uchwytu pokrywy**. Okno zawiera **Filamenty slicera** bieżącej drukarki, paletę, własny kolor i pole na sześciocyfrowy kod HEX. Dostępne kolory ustaw w **Druk → Filamenty slicera**. Usunięte sloty nie są wyświetlane; pozostałe zachowują numery.

Kolory są zapisywane w projekcie i eksportowane do 3MF oraz OBJ; STL nie zawiera kolorów. Przy eksporcie 3MF jednoznaczne dopasowanie koloru automatycznie wybiera zapisany slot filamentu. Jeśli kilka slotów ma ten sam kolor, wybierz slot ręcznie w oknie eksportu. Sprawdź przypisania w slicerze. Kolory na ekranie są orientacyjne i nie symulują fizycznego mieszania filamentów.

![Sześć dwutonowych wzorów pokrywy](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Osłony jednoczęściowe i panele

Otwórz **Osłona** i wybrać wzór. Skorupa drukowana jest oddzielnie od organizera. Jeśli chcesz wzór na samym ciele, użyj **Kształt → Płaskorzeźba organizatora**.

| Tryb powłoki | Dopasowanie i montaż |
| --- | --- |
| **Wokół ciała** | Jeden bezdenny rękaw podąża za krawędzią i wysokościami ścian. Przesuń go nad korpusem z góry, podążając za kierunkiem ściany na pochylonym modelu. Panel wskazuje, czy na stole znajduje się rama podparcia czy rękaw. |
| **Panele dekoracyjne** | Oddzielne ramowane panele pokrywają wybrane boki i pozostawiają odsłonięte narożniki. Wybierz boki i dostosuj **Przesunięcie krawędzi**. Płyty klejowe bez elementów złącznych. Z ukrytymi szpilkami, nacisnąć każdy panel prosto na jego pasującą ścianę, aby uzyskać trwałe mocowanie. |

![Górny widok rękawa owijania narożników i oddzielnych paneli kończących się przed każdym rogiem](../../images/shell-fit.svg)

Wybierz wzór, ustaw jego rozmiar i zestaw **Grubość skorupy**. Na rękaw jednoczęściowy, regulować **Szerokość obrzeża** za jego solidną ramę. Panele dekoracyjne mają stałą ramę; zastosowanie **Przesunięcie krawędzi** Ustawić ich na ścianie. Pod **Lądowanie**, **Prześwit z każdej strony** ustawia lukę między rękawem i organizerem. Przepaść 0,5 mm z każdej strony dodaje 1 mm przez dwa przeciwległe boki, zanim policzysz grubość powłoki. Porównaj **Razem** z odizolowanym **Osłona** pogląd, aby ocenić wynik. **↓ Pobierz powłokę** wywozi pokrywę oddzielnie, oraz **Usuń skorupę** usuwa go z projektu.

Panele wymagają zgodnej prostokątnej podstawy. Ich wybór nie zmienia grubości ścianek ani miejsca w komorach. Ukryte mocowania wymagają ścianek od 3,2 mm bez reliefu. Dla cieńszych, także 2,4 mm, użyj paneli bez mocowań i przyklej je. Ścianki nie są pogrubiane automatycznie. Margines panelu mierzy odległość od krawędzi powierzchni, a luz osłony obwodowej reguluje jej nasuwanie. Przy dolnej listwie dolny margines liczy się od jej góry; mocowania i gniazda podążają za tym profilem. Dla poziomów zostaw co najmniej 3 mm marginesu, aby nie kolidować z obrzeżami połączeń.

<a id="projects-and-backups"></a>
## Projekty i kopie zapasowe

Stosowanie **Moje projekty → Zapisz kopię** nazwy projektu lub wykonania wariantu przed eksperymentem. Otwarty projekt zapisuje automatycznie w tej przeglądarce. Biblioteka pozwala na wyszukiwanie, otwieranie, zmianę nazwy, usuwanie lub pobieranie projektu. **Zapisz projekt** w górnym pasku pobiera edytowalne JSON Wsparcie. Stosowanie **Otwarte** wczytanie tego pliku, w tym na innym komputerze lub w instalacji lokalnej.

Powierzone edycje są zapisywane natychmiast. Tymczasowa, lokalna kopia odzyskiwania chroni zmiany, podczas gdy baza danych przeglądarki jest zapisywana; ponownie otwiera odtwarzanie kopii, jeśli zapis został przerwany. Oddzielny, zakończony powodzeniem migawka może odzyskać uszkodzoną bieżącą sesję, w tym historię cofnięcia. Jeśli nie można przywrócić poprawnej kopii, automatyczne zapisywanie zatrzymuje się zamiast zastępowania przechowywanego projektu modelem startowym. Zachowaj do pobrania kopie zapasowe JSON: nie można automatycznie odzyskać odczytu danych przeglądarki lub awarii obu mechanizmów przechowywania.

Kontrole eksportu należą do bieżącej rewizji projektu, wybranych części i pozycji montażowej. Zmiana tych unieważnia poprzednią kontrolę; stary wynik nie może być pobrany jako nowy model. Nieudane obliczenia zatrzymują edycje. Zablokowany podgląd zgłasza błąd po dwóch minutach; następna edycja geometrii rozpoczyna nowe obliczenia.

Kiedy ten sam projekt lub szuflada jest edytowana w wielu zakładkach, sprzeczne zmiany są zapisywane jako osobne **Copy from another tab**. Druga wersja jest przechowywana, a zakładka edycji kontynuuje swoją kopię. Porównaj wersje w **Moje projekty** lub wybielacz szuflady i zmienić nazwę kopii, jeśli chcesz go zatrzymać. Ponowne otwarcie zakładki organizera przywraca swój własny zapisany projekt. Zmiany nie są automatycznie łączone pomiędzy zakładkami.

Zachowaj pobraną kopię zapasową przed wyczyszczeniem danych przeglądarki. Każda przeglądarka i adres strony ma własną bibliotekę. Szczeliny na włókna są przechowywane oddzielnie dla drukarki w przeglądarce. Ustaw je ponownie przy przechodzeniu do innego urządzenia. Aby pobrać aplikację lokalną, zobacz [Instalacja lokalna](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Ustawienia druku i podział na części

Pod **Druk**, wybrać konfigurację drukarki i głowy lub wybrać **Własny rozmiar**. Sprawdzić szerokość, głębokość i wysokość budowy. Zaprogramowany system dostarcza obszar roboczy. Wybrać profile drukarki, dyszy, materiału i krojenia w slicerze.

Jeśli model nie mieści się na stole drukarki, użyj proponowanych podziałów lub wybierz dwie albo trzy części, gdy są dostępne. Sprawdź połączenia przyciskiem **Rozsuń części**. Podział zwiększa grubość ścianek do co najmniej 5 mm, a dna do 3 mm; ponownie sprawdź wymiary wewnętrzne. Najpierw usuń osłony i wkłady. Modele piętrowe, pochylone, okrągłe, owalne i o strukturze plastra miodu wymagają druku w jednym kawałku. **Zwróć model bryłowy** wyłącza podział. Jeśli chcesz przywrócić poprzednie wymiary, ponownie sprawdź grubości.

**↓ Joint sample** Pobieranie końcówek krycia, aby spróbować w tej samej skali i ustawienia drukowania, co ciało końcowe. Umieść je oddzielnie z opuszczonymi bazami. Po ochłodzeniu nominalne sworznie Ø 3,2 × 8 mm mieszczą się w otworach Ø 3,3 mm, o głębokości 4,5 mm z każdej strony szwu. Sprawdzić ustawienie, a następnie użyć szpilek i kleju do montażu drukowanych sekcji. Stosowanie **↓ Pobierz wszystkie części** dla secesyjnego organizera.

<a id="download-and-slice"></a>
## Pobieranie i przygotowanie w slicerze

1. W **Druk** → **Slicer filaments** ustaw te same numery i kolory co w slicerze. W Snapmaker U1 sloty 1–4 odpowiadają głowicom T0–T3. Dostępnych jest do 16 slotów z kolorem i nazwą materiału. Kolor jest przybliżonym punktem odniesienia, nie symulacją wydruku lub mieszanki; dokładne mieszanie ustaw w slicerze. Wybierz kartę i kliknij **Delete filament from slot N**, aby usunąć filament. Pozostałe numery się nie zmieniają: po usunięciu slotu 6 slot 7 nadal ma numer 7. **+ Slot N** ponownie zajmuje najniższy wolny numer; limit pozostaje 16. Usunięcie filamentu nie zmienia koloru modelu. Usunięte sloty nie są proponowane ani dopasowywane automatycznie przy eksporcie; wybierz inny lub przypisz go w slicerze. Różne kolory pozwalają na automatyczne dopasowanie. Jeśli dwa sloty mają taki sam kolor, wybierz właściwy dla każdej części w oknie pobierania.
2. Kliknij **↓ Pobierz**. Wybierz **Organizator i akcesoria**, **Tylko powłoka** lub **Cały zestaw**, według jakich części potrzebujesz. Dla oddzielnego modelu, eksportować zestaw.
3. Wybierz format poniżej. Dla 3MF, przypisz szczelinę filamentu do każdej części lub zostaw ją do przypisania w slicerze. Orca może użyć pierwszego filamentu dla nieprzypisanych części.
4. Odczytaj wymiary każdej części i każdą instrukcję, aby obrócić ją o 90 ° na stole drukarki. Czek rezerwuje 2 mm na krawędziach stołu drukarki. Pobierz za pomocą przycisku formatu na dole okna dialogowego.
5. Otwórz wynik w slicerze na **Skala 100% w milimetrach**. Ustaw kompletny zestaw, sprawdź overhangs i cienkie szczegóły, i podgląd pierwszej warstwy i dzielników. W przypadku druku wielokolorowego przed krojeniem należy zweryfikować przypisanie każdej części filamentu.

| Format | Wybierz go dla | Co zrobić z pobraniem |
| --- | --- | --- |
| STL | Geometria dla jednokolorowego druku | Otwórz STL w slicerze. Wyciągnij ZIP najpierw, jeśli wywóz zawiera kilka STL. |
| 3MF | Zestaw z oddzielnymi częściami, kolorami i przydziałami filamentu | Otwórz go w slicerze i zweryfikować części i szczeliny. ReplixGrid pozostawia drukarkę i profile materiału do slicerze. |
| OBJ + MTL | Kolorowy model dla narzędzia, które akceptuje OBJ | Utrzymuj geometrię i plik materiału razem. Model używa milimetrów z Z do góry. |
| Projekt JSON | Kontynuowanie edycji przedziałów, wymiarów lub akcesoriów | Stosowanie **Zapisz projekt** i ponownie otworzyć **Otwarte** w ReplixGrid. |


Aby uzyskać ten sam kolor cyfrowy co w slicerze, wpisz sześciocyfrowy **HEX code**, np. `#E63522`, obok wyboru koloru. Początkowy `#` jest opcjonalny. Poprawny kod od razu aktualizuje podgląd. Niepełny lub nieprawidłowy kod nie jest stosowany; po opuszczeniu pola wraca zapisany kolor. Kod nie symuluje rzeczywistego wyglądu filamentu, oświetlenia ani fizycznego mieszania kolorów.

<a id="troubleshooting"></a>
## Rozwiązywanie problemów

| Co widzisz? | Co sprawdzić |
| --- | --- |
| Obiekt pasuje do zewnętrznych wymiarów, ale nie zmieści się w zatoce | Wybierz przedział i sprawdź jego pomiary wewnętrzne. Zezwalaj na grubość ścianki, zakrzywione końce, promień narożnika wewnątrz i wyjmowane wkładki. |
| Wybór dzielnika ciągle wybiera ścianę z przodu | Przełącz na **Z góry** lub otwarte **Wszystkie ściany i przedziały** Po prawej. |
| Nie można dodać pokrywy lub następnego poziomu | Sprawdzić poziome obręcze, równe wysokości zewnętrzne, wystające dzielniki, przechył lub druk podzielony. Dla stosu, również sprawdzić stare klipy powłoki i prześwit dopasowania w stosunku do grubości ściany. Built- in i SVG reliefu są wspierane na poszczególnych poziomach; powierzchnie krycia pozostają gładkie. |
| Część przekracza stół drukarki, chociaż ślad wydaje się dość mały. | Przeczytaj ukończone wymiary w oknie pobierania. Przechylenie, relief, wykończenie i powłoki mogą wykraczać poza podstawę. Sprawdź wybraną konfigurację drukarki i rotację. |
| Ukryte złącza paneli są niedostępne | Używać ścian o grubości co najmniej 3,2 mm bez reliefu, lub pozostawić złącza i przykleić panele. Zmiana na panele nie zagęszcza ścian. |
| Panele nakładają się na dolną krawędź lub obręcz poziomą w starej konstrukcji | Ustaw offset krawędzi co najmniej 3 mm dla poziomów. Dolne offset jest mierzony od góry dolnego wykończenia. Regeneruj i pobierz części po zmianie ustawień. |
| Ściągnięty odcisk ma złe kolory. | Stosowanie 3MF, dopasować numery gniazd w **Druk** Potem sprawdź przydziały w slicerze. STL posiada tylko geometrię. |
| Brakuje projektu zapisanego na innym urządzeniu. | Przenieść swój projekt JSON i stosowanie **Otwarte**. Biblioteki przeglądarek są lokalne dla każdego urządzenia i adresu strony. |

<a id="project-variants"></a>
## Warianty projektu

Kliknij **+ Wariant** w górnym pasku, lub otwarte **Moje projekty** i wybierz **Nowy wariant**. Wprowadź nazwę i kliknij **Utwórz wariant**. Nowy wariant jest niezależną kopią, oryginał pozostaje zapisany. Nienazwany oryginał jest zachowany jako **Szkic**.

Użyj pokrętła wyboru obok **+ Wariant** przełączanie się między powiązanymi modelami lub wybór jednego pod **Warianty tego projektu** w moich projektach. Każdy wariant zapisuje automatycznie i zachowuje własną historię cofnięcia / ponownego wykonania po przełączeniu lub ponownym załadowaniu. Nowo stworzony wariant zaczyna się od pustej historii.

Stosowanie **Osobny projekt → Zapisz kopię** stworzenie niepowiązanego projektu. Zmień nazwę lub usuń poszczególne modele w Moje projekty; usunięcie oryginału nie usuwa jego wariantów.

**↓ Pobierz** eksportuje wybrany model druku. **Zapisz projekt** pobiera ten model jako edytowalny JSON; **Plik** na karcie bibliotecznej pobiera odpowiedni model. JSON zawiera jeden model, bez jego powiązanych wariantów lub historii cofnięcia. Zapisz każdy model oddzielnie do przeniesienia lub kopii zapasowej całego zestawu.


<a id="shared-styles"></a>
## Wspólne style

1. Otwórz projekt kolorami i wzorami, które chcesz ponownie wykorzystać.
2. Pod **Kształt → Wspólny styl**, wprowadź nazwę i kliknij **Zapisz bieżący styl**.
3. Otwórz inny projekt lub wariant, powrócić do **Wspólny styl**, i wybrać zapisany styl.
4. Wybierz **Kolory**, **Wzory** Albo jedno i drugie. Przegląd **Zostanie zastosowane** oraz **Zostanie pominięte** wiadomości, a następnie kliknij **Zastosuj styl**.

Styl rejestruje kolor organizera i relief, plus kolory i wzory istniejącej powłoki i pokrywy. Styl gładkiego ciała usuwa relief ciała przeznaczenia. Wymiary, układy przedziału, grubość ścianki, dopasowanie pokrywy, uchwyty i przepustki powłoki pozostają niezmienione. Brakujące pokrywy lub powłoki nie są dodawane. Niekompatybilne ustawienia wzorca są pomijane z wyjaśnieniem; kompatybilne ustawienia mogą być nadal stosowane. Wstaw kolory i przydziały gniazda plików nie są przenoszone.

Aplikacja jest jednym krokiem cofania i tworzy niezależną kopię: później edytuje do jednego organizera nie zmienia innych. Usuwanie zapisanego stylu nie zmienia projektów, które już go używają.

Zapisane style należą do tej przeglądarki i adresu strony. Projekt JSON zachowuje zastosowany wygląd, ale nie zawiera ocalonej biblioteki stylu. Aby ponownie użyć stylu na innym urządzeniu, otworzyć tam styl projektu JSON i zapisać jego aktualny styl ponownie.


<a id="drawer-arrangements"></a>
## Układ organizerów w szufladzie

Wybierz **Drawer** obok **Organizer** Więc... **Create drawer**. Wprowadzić zmierzoną długość, szerokość, użyteczną wysokość i prześwit. Prześwit stosuje się zarówno na ścianach szuflady, jak i między tacami.

Nowe szuflady zaczynają się od 180 × 280 mm, a przednia krawędź jest zaznaczona na dole. **Obróć widok o 90 °** zmienia tylko orientację przeglądania; wymiary szuflady, współrzędne tacki i eksportowane modele pozostają bez zmian. Istniejące urządzenia szuflady zachowują swoje wymiary. Oszczędzane szuflady otwarte z długością poziomą i szerokością pionową; etykiety wymiarów podążają za ręczną rotacją widoku. Przycisk rotacji tacki obraca tylko wybraną tacę.

Stosowanie **New organizer** aby stworzyć tacę bezpośrednio w szufladzie. Ustaw jego wymiary, a następnie edytuj przedziały i akcesoria w zwykłym edytorze organizera. **← Back to drawer** powraca do swojego położenia. **Add saved organizer** dodaje niezależną kopię zapisanego projektu lub wariantu; jego edycja nigdy nie zmienia jego źródła.

Przeciągnij tacki w widoku górnym lub wprowadź współrzędne X / Y mierzone od lewego górnego rogu do zewnętrznych granic tacki. Obróć o 90 stopni, powiel lub usuń tacki. Klawisze strzałek przesuwają tacę ogniskową o 1 mm (Shift: 10 mm). Układ cofnij / ponownie przywraca miejsca i ukończone edycje tacki.

Diagram pokazuje zmontowane zewnętrzne prostokąty, w tym osłony, wykończenia, pokrywy i poziomy. Zakrzywione kształty są sprawdzane zachowawczo, a nie szczelnie zagnieżdżone. Podświetlone są konflikty graniczne, prześwitowe i wysokości. Poczekać na kontrolę geometrii przed poleganiem na stanie dopasowania. Wybierz wolne umieszczenie lub umożliwić montaż płyty, jak opisano poniżej.

Drawers zapisać lokalnie w tej przeglądarce, oddzielnie od projektów organizacyjnych. Pobierz szufladę JSON plik do tworzenia kopii zapasowej lub transferu; otwarcie jednego tworzy osobną kopię szuflady. Wybierz tacę i wybierz **Download selected tray** dla własnego STL, 3MF lub OBJ wywóz z istniejącymi kontrolami wielkości printera. Współrzędne kreślarskie nie stają się położeniem print- bed.

<a id="mounting-plates"></a>
### Płyty montażowe

W **Drawer → Drawer base**, wybierz **Mounting plate**. Długość / szerokość kredensu i prześwit ściany określają obszar pokryty. Podaj użyteczną szerokość i głębokość **Łóżko drukarki 3D** osobno: wymiary te określają maksymalny rozmiar sekcji, a tym samym liczbę sekcji. Obliczenie obejmuje wspólne projekcje i marżę drukowania 2 mm na każdej krawędzi łoża. Wymiary nie muszą być wielokrotnością siatki 20 mm; sekcje krawędzi pasują do pozostałej przestrzeni.

**Download sections (ZIP)** tworzy numerowany 3MF dla każdego wydruku, plan montażu SVG i listę współrzędnych. Plan zachowuje pierwotną orientację szuflady niezależnie od widoku: R oznacza rzędy od góry, C kolumny od lewej. Złącza na jaskółczy ogon wkładaj od góry. Najpierw wydrukuj **Download joint sample** z dwiema sąsiadującymi sekcjami i sprawdź dopasowanie. Szczelina wynosi 0,05 mm, a tolerancja profilu 0,03 mm. Między sekcjami bez zamontowanych pojemników mogą pozostać cienka szczelina i niewielki luz.

Przy włączonym trybie płytkowym, pobieranie tacki obejmuje gniazda podziemne dla pozycji tacki i jej rotacji. Wewnętrzne wymiary przedziału są zachowane. Taca staje się o 2,1 mm wyższa; w tym płyta 2 mm, kontrola dopasowania szuflady dodaje 4,1 mm. Po przesunięciu lub obróceniu tacki, pobrać ją ponownie: jej gniazda muszą pasować do pozycji peg. Zmiana klirensu szuflady również zmienia pochodzenie peg.

Prześwit radiacyjny gniazda wynosi 0,12 mm. Wydrukuj mały organizator rozmieszczający dwie sekcje, aby sprawdzić, czy pasuje do ustawień materiału i warstwy. Gniazdo zachowuje organizator po bokach; podnieś go do góry, aby go usunąć. Eksportuj wykorzystuje tylko geometrię: wybierz drukarkę i profile materiałowe w slicerze i sprawdź dachy gniazda przed drukowaniem.

Mocowanie obsługuje obecnie organizery niedzielone i bez pochylenia, z co najmniej trzema w pełni podpartymi gniazdami. Małe pojemniki mogą wymagać przesunięcia lub powiększenia. Górne poziomy i osłony zachowują geometrię. Wyłącz tryb płyty, aby wyeksportować pierwotny model bez mocowania. Zapisane projekty źródłowe nie zmieniają się.

<a id="custom-svg-relief"></a>
## Własny relief SVG

Pod **Kształt → Płaskorzeźba organizatora → My SVGs**, wybierz **Upload SVG** lub wrzucić plik do obszaru wysyłania. Wybierz zapisaną miniaturę, aby ją ponownie wykorzystać. Ta sama biblioteka jest dostępna pod **Kształt → Pokrywka → My SVGs** oraz **Osłona → Pattern → My SVGs**. Każdy cel zachowuje swój własny wzór i ustawienia rozmieszczenia.

Wybierz **Single motif** lub **Repeat**, wybrać ściany zewnętrzne, i dostosować szerokość motywu w milimetrach, obrót, poziome / pionowe przesunięcie, i powtórzyć szczelinę. Szerokość i wysokość zachowują oryginalne proporcje. Umieszczenie jest skoncentrowane na każdej wybranej stronie; na zakrzywionych ciałach boki odpowiadają czterem sektorom zewnętrznym. Pozytywne przesunięcie pionowe przesuwa motyw w górę. Wzór jest zgodny z obrysem zewnętrznym. Powtórzenia umieszcza się tylko wtedy, gdy kompletny motyw pasuje pod górną obręczą, wokół wycięć i w obrębie każdej strony. Pojedyncze motywy są przycięte do tych granic. Relief głębokość wykorzystuje istniejące **Głębokość / Intensywność** Kontrola. Oryginalne ściany i przedziały wewnętrzne są zachowane; wymiary zewnętrzne zwiększają się. Poczekać, aż zaktualizowany podgląd się zakończy, a następnie sprawdzić i pobrać część.

Obsługiwane SVG zawierają wypełnione ścieżki, wielokąty, prostokąty, koła lub elipsy, w tym otwory i transformaty grupowe. Przelicz tekst i pociągnięcia na wypełnione ścieżki przed wywozem z edytora wektorowego. Zdjęcia, odniesienia zewnętrzne, filtry, maski, ścieżki wycinające, gradienty, bloki stylu CSS i odniesienia do elementów wielokrotnego użytku ( `use` ) nie są wspierane. Puste lub niewykorzystane definicje zawierające obsługiwane kształty są ignorowane. Kolory stają się pojedynczym uniesionym kształtem przy użyciu koloru organizera. Limity to 200 KB, 512 XML elementów, 128 wypełnionych kształtów i 6000 wybranych punktów konturu; zbyt złożone wzory lub nadmierne powtarzanie są odrzucane komunikatem. Krzywe są zbliżone poligonalnymi konturami do druku.

SVG są przetwarzane lokalnie w przeglądarce. Biblioteka pozostaje na tym urządzeniu. Każdy projekt zawiera niezależną kopię używanych konturów, dzięki czemu pobrane projekty można ponownie otworzyć na innym urządzeniu bez źródła SVG lub biblioteki. Usunięcie wpisu do biblioteki pozostawia istniejące projekty bez zmian. **Wspólny styl** Nosi również niestandardowe wzory ciała, pokrywy i powłoki do innego organizera. Brakujące pokrywy lub osłony są pomijane, jak w built- w stylach. Zachowaj pobrany projekt jako kopię zapasową.

<a id="choose-an-svg-for-its-intended-use"></a>
### Dobór SVG do zastosowania

An SVG jest formatem rysunku, a nie gwarancją wydrukowanej geometrii. **Import sukcesu oznacza tylko obsługiwane wypełnione zarysy zostały przeczytane.** Wybrana powierzchnia, rozmiar i tryb aplikacji nadal muszą przejść kontrolę geometrii.

| Przewidywane stosowanie | Co się zapełnione obszary | Co przygotować |
| --- | --- | --- |
| Relief organizera | Podniesiony materiał przymocowany do ściany stałej | Oddzielne motywy i wewnętrzne otwory mogą działać, ponieważ ściana je wspiera. |
| Wzbogacony wzór pokrywy | Materiał podwieszany na podłożu stałym | Dopuszczalne są otwory wewnętrzne; należy zachować cały rysunek wewnątrz dostępnej ramy i z dala od rękojeści lądowania. |
| Pokrywa przez otwory | Materiał usunięty z pokrywy | Każda pozostała część musi być połączona z otaczającą pokrywą. Zamknięte detale wewnętrzne wymagają zszywania mostów. |
| Owinięte powłoki lub panele dekoracyjne | Otwieranie przecinane przez pokrywę | Użyj rysunku kompatybilnego ze stencil-. Pozostała rama i wzór muszą tworzyć podłączony materiał. |

Aby przygotować plik:

1. Zostaw potrzebne wypełnione ścieżki i proste kształty. Zamień tekst i **obrysy na wypełnione kontury** w edytorze wektorowym. Linia z `fill="none"` jest obrysem, a nie wypełnioną powierzchnią.
2. Usuń prostokąty tła, chyba że cały ich obszar ma stać się reliefem lub otworem. Kolory SVG nie rozdzielają materiałów; białe figury nie wycinają automatycznie ciemniejszych figur pod spodem.
3. Sprawdź ścieżki złożone. Komentarz „otwór” nie tworzy otworu: o wypełnieniu decydują kierunek ścieżki i reguła `fill-rule`.
4. Przy otworach przelotowych połącz zamknięte detale wewnętrzne z otoczeniem za pomocą mostków. Większy odstęp między powtórzeniami **nie** mocuje luźnego detalu wewnątrz wzoru. Alternatywnie użyj reliefu na pokrywie.
5. Do powtarzania najlepiej użyć pliku z jednym motywem. Jeśli SVG zawiera już siatkę, szerokość skaluje **całą siatkę**, nie każdy motyw osobno. Drobne szczegóły mogą stać się zbyt cienkie.
6. Poczekaj na pomyślne obliczenie modelu i sprawdzenie eksportu, a potem obejrzyj wynik w slicerze. Po błędzie obliczeń może pozostać ostatni poprawny podgląd; nie pokazuje on bieżących ustawień, które wywołały błąd.

Wypełniona sylwetka liścia nadaje się zarówno na relief, jak i na otwór. Całkowicie otoczony nerw liścia jest podparty podstawą w trybie reliefu, lecz po wycięciu otaczającego go liścia może pozostać luźnym elementem. Siatka sześciokątów nadaje się do perforacji, jeśli mostki materiału są połączone i wystarczająco grube. Wielokolorowy rysunek złożony z obrysów trzeba najpierw zamienić na wypełnione kontury.

<a id="svg-lids-and-perforated-shells"></a>
### Pokrywy SVG i perforowane osłony

Dodaj pokrywę, a następnie wybierz **My SVGs**. **Raised relief (decoration)** sprawia, że pojedyncza połączona pokrywa z motywem na solidnym podłożu; ustawić jego wysokość reliefu (0.2-1 mm) i kolor podstawowy. **Through stencil (cut)** usuwa wypełniony SVG powierzchnie przez pokrywę. Oba tryby zachowują ramę krawędzi 2 mm i wargę godową. Oddzielny uchwyt utrzymuje stałe lądowanie; przesuwać rysunek, jeśli jeden motyw koliduje z nim. Zewnętrzne i wgłębione urządzenia sterujące muszą być zgodne z tą samą kontrolą. SVG kolory graficzne nie są importowane jako oddzielne włókna.

Dla powłoki, wybierz **My SVGs** Potem rysowanie w bibliotece. Wypełnione obszary stają się przez otwory. Stosować jeden motyw lub powtórzyć po wybranych stronach owiniętego rękawa. On **Panele dekoracyjne**, rysunek jest powtarzany niezależnie na każdym wybranym panelu; istniejące ramy i lokalizacje montowania są zachowane. Początkowy rozmiar motywu uwzględnia wysokość powłoki. Ustaw szerokość ramki, rozmiar motywu, rotację, położenie i odstępy w zależności od potrzeb. Wewnętrzne przedziały organizera i prześwit powłoki pozostają niezmienione.

Na pokrywach i osłonach, tylko kompletne motywy są umieszczone wewnątrz dostępnej ramki, w tym pojedynczych motywów. Jeśli żaden nie pasuje, zmniejszyć rozmiar lub offsetu. Zamknięte wewnętrzne szczegóły (na przykład środek wycinania pierścienia) mogą stać się luźne wyspy. Dodaj mosty w edytorze wektorowym lub użyj podniesionej dekoracji na pokrywie. Bloki aplikacji odłączone geometrię zamiast cicho wyrzucania elementów. Unikaj bardzo wąskich wstęg i sprawdź mały druk testowy dla materiału i dyszy.

Wzory są zawarte w indywidualnym eksporcie części, kompletnych zestawach i całej szufladzie. Przełączanie z powrotem do **Built-in** usuwa niestandardowy wzór tylko z tego celu. Usuwanie miniatury biblioteki nie usuwa wbudowanych wzorców z projektów.

<a id="download-ready-to-use-stencil-svgs"></a>
### Pobieranie gotowych szablonów SVG

Te przykłady zawierają wypełnione kontury z mostkami materiału. Czarne obszary stają się otworami w trybie **Through stencil (cut)**. Zapisz pliki z poniższych linków z rozszerzeniem `.svg`. Jeśli przeglądarka wyświetli rysunek, użyj polecenia zapisania strony i zachowaj rozszerzenie.

| Pobieranie | Wzór | Sugerowana szerokość startowa |
| --- | --- | --- |
| [Liście organiczne - pobierz SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Pięć liści z mostami łączącymi wewnętrzne szczegóły | 20 mm; zmniejszyć o niską powłokę |
| [Podwójny sześciokąt - pobierz SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Jedna dachówka dwusześciokątna z czterema mostami i otworem środkowym | 20- 24 mm; stosowanie **Repeat** dla sieci |

**Na pokrywie:** dodać pokrywę pod **Kształt → Pokrywka**, open **My SVGs**, i przesłać każdy plik. Wybierz **Through stencil (cut)**. Zacznij od **Single motif** do kontroli, lub wybrać **Repeat** wypełnić dostępny obszar kompletnymi kopiami. Ustaw szerokość, obrót i przesunięcia X / Y. Powtórzonym odstępem jest przerwa między kompletnymi kopiami, a nie szerokość ich mostów wewnętrznych. Rozstaw na 4 mm. Plik liść jest już grupą pięciu liści: szerokość skaluje całą grupę.

**Na osłonie:** otwórz **Osłona** → **Pattern** → **My SVGs** albo kartę **Osłona** w studiu i wybierz plik ze wspólnej biblioteki. Osłony obsługują tylko otwory przelotowe. **Repeat** powiela wzór wokół osłony; **Dodatkowe** → **SVG walls** wybiera boki osłony obwodowej. Panele dekoracyjne korzystają z wybranych boków paneli. Każda powierzchnia zachowuje własne ustawienia położenia i grubości. Zmiana karty pokazuje odpowiednią część.

Jeżeli motyw nie pasuje, należy zmniejszyć jego szerokość lub offset. Na niskiej powłoce, spróbuj 12- 16 mm dla grupy liści. Rosnąca grubość powłoki może powiększyć automatyczną granicę i pozostawić mniej miejsca na rysunek. Skalowanie w dół zawęża również mosty: sprawdź je w slicerze i wydrukuj małą próbkę dyszy i materiału. Powtarzające się odstępy nie mogą poszerzać wewnętrznych mostów. Poczekaj, aż bieżący podgląd się skończy, a następnie użyj **↓ Pobierz** w celu sprawdzenia i wywozu pokrywy lub powłoki.

<a id="numeric-sliders-and-valid-ranges"></a>
### Suwaki liczbowe i dopuszczalne zakresy

Pokaż ustawienia numeryczne **Min** oraz **Max** powyżej cienkiej zielonej ścieżki, z białym markerem dla bieżącej wartości. Czerwona końcówka kapsli oznacza zewnętrzną część dozwolonego przedziału; nie są one wskaźnikiem wytrzymałości na drukowanie. Przeciągnij marker, użyj klawiszy strzałek podczas koncentracji lub wpisz dokładną liczbę i naciśnij Enter. Pole numeryczne i suwak używają tych samych granic. Niektóre ograniczenia zmieniają się z modelem; wartość wewnątrz zakresu suwaka może nadal kolidować z innym ustawieniem, więc przed wywozem postępuj zgodnie z każdym ostrzeżeniem geometrii.

<a id="whole-drawer-export"></a>
## Eksport całej szuflady

Wybierz **Drawer → Print entire drawer** przygotowanie wszystkich tac, ich akcesoriów i wszelkich włączonych sekcji płyt montażowych. Oprawione tace otrzymują gniazda do swoich zapisanych pozycji; zwykłe tace do wolnych miejsc zachowują swoje istniejące bazy. Projekty drukowania fragmentarycznego obejmują ich części i pinezki. Overlaps, niewystarczające przepustki szuflady, nieobsługiwane montaż lub nieprawidłowa geometria zablokować pobieranie i zidentyfikować dotkniętą tacę.

Ustaw **Printer bed length** (poziomo), **Printer bed width** (pionowe), wysokość druku i odstępy. Początkowe wymiary pochodzą z ustawień płyty montażowej lub obszaru wydruku pierwszej tacki; kolejne ustawienia eksportowe są zapisywane w tej szufladzie. Części płyt montażowych są regenerowane dla wybranego stołu drukarki. Nie przenosi to tac ani nie modyfikuje zapisanych projektów źródłowych.

Układ uwzględnia rzeczywiste wymiary zewnętrzne eksportowanych części, margines 2 mm przy krawędziach stołu oraz wybrany odstęp. Części mogą być obracane o 90°; kolorowe elementy pokrywy pozostają razem. Wyświetlana liczba stołów dotyczy tego układu i nie gwarantuje minimum. Podpory, brim, wieże czyszczące, wyłączone obszary drukarki i osobne zadania dla różnych materiałów nie są uwzględniane. Zostaw na nie miejsce i sprawdź wynik w slicerze. Plik nie zawiera profilu drukarki ani przypisań filamentów.

W przypadku ZIP zawiera **bed-NN.3mf** dla każdego stołu drukarki, dopasowanie **bed-NN.svg** schematy, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** oraz wykaz części ponumerowanych w **README.txt**. Otwórz każdy 3MF jako oddzielne zadanie drukowania, zachować względne pozycje jego obiektów, używać milimetrów w 100% skali i przypisać włókna. W przypadku SVG diagramy pokazują bounding prostokąty; 3MF zawiera pełną geometrię druku. Współrzędne zespołu ciągnika zawsze wykorzystują długość poziomą i szerokość pionową.

Zmiany w ustawieniach układu lub eksportu unieważniają poprzednią kalkulację. Zamknięcie okna anuluje przygotowanie. Przerośnięte poszczególne części są zgłaszane raczej niż po cichu skalowane lub automatycznie dzielone. Bardzo duże zestawy mogą wymagać eksportu w mniejszych grupach.

<a id="pattern-studio"></a>
### Studio wzorów

Wybierz **Raised relief (decoration)** dla reliefu albo **Through stencil (cut)** dla otworów przelotowych. Osłony obsługują tylko otwory. Wysokość jest widoczna tylko dla reliefu, odstęp tylko przy powtarzaniu. **Material thickness** zmienia podgląd i eksport: 1,2–6 mm dla pokrywy SVG, 1–4 mm dla osłony. Domyślna grubość wynosi 3,2 mm dla reliefu i 2 mm dla szablonu; wybrana grubość pozostaje po zmianie trybu. Wysokość reliefu wlicza się w grubość. Wpuszczana pokrywa SVG wymaga głębokości wewnętrznej co najmniej równej grubości płyty plus 2 mm. **Dodatkowe** zawiera kolor pokrywy lub wybór ścianek osłony. **Which SVG files work?** wyjaśnia wymagania i przygotowanie plików.

Otwórz **Kształt** → **Pokrywka** → **My SVGs** albo **Osłona** → **Pattern** → **My SVGs**. Karty **Pokrywka** i **Osłona** mają wspólną bibliotekę, ale osobne ustawienia. Zmiana karty pokazuje odpowiednią część; jeśli jeszcze jej nie dodano, pozostaje widoczny cały model. Widok całości można wybrać nad modelem. Szerokość, obrót, odstęp i X/Y określają położenie wzoru; przycisk centrowania resetuje położenie i obrót. Pokrywa obsługuje relief i otwory, osłona tylko otwory. Ramki i miejsca mocowania pozostają zachowane. **×** lub **Escape** zamyka aktywne studio, zachowując zmiany. Strzałki klawiatury zmieniają wybraną kartę.
