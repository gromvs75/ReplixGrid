<a id="replixgrid-user-guide"></a>
# Podręcznik użytkownika ReplixGrid

Projektowanie organizatora w milimetrach, sprawdzanie jego dopasowania i pobieranie części do krajalnicy. Dla pierwszej budowy, postępuj według ilustrowanego przykładu kapsułki. Użyj tego odniesienia, gdy chcesz zmienić określoną część projektu.

[Otwórz ReplixGrid](https://grid.replixcast.com/?lang=pl) · [Szybki start](USER-GUIDE.md) · [Instalacja lokalna](../../../README.md#local-installation)

| Chcę... | Idź do |
| --- | --- |
| Wybierz ścianę, obróć model lub cofnij zmianę | [Obszar roboczy i widoki](#workspace-and-views) |
| Wybierz kształt, zmień wymiary lub pochyl ściany do przodu | [Kształt i wymiary](#shape-and-dimensions) |
| Umieścić obiekt w przedziale lub przenieść dzielnik | [Przegródki i ścianki działowe](#compartments-and-dividers) |
| Obniżyć ścianę, ukształtować jej krawędź lub wyciąć otwór palca | [Wysokość ścianek i wycięcia](#wall-heights-and-cutouts) |
| Zmiękczyć obręcz, dodać tekstury lub umieścić nazwę na ciele | [Narożniki, krawędzie i dekoracje](#corners-edges-and-decoration) |
| Dodaj wyjmowany kubek, stos tacki lub dopasować pokrywę | [Wkłady, piętra i pokrywy](#inserts-tiers-and-lids) |
| Wydrukuj dekoracyjną okładkę na zewnątrz | [Osłony jednoczęściowe i panele](#sleeves-and-panels) |
| Ponownie otworzyć projekt lub przenieść go do innego komputera | [Projekty i kopie zapasowe](#projects-and-backups) |
| Wybierz drukarkę, podziel duży model lub przypisz żarnik | [Ustawienia druku i podział na części](#print-setup-and-sectioning) · [Pobieranie i przygotowanie w slicerze](#download-and-slice) |
| Zachować alternatywne projekty lub ponowne użycie kolorów i wzorców | [Warianty projektu](#project-variants) · [Wspólne style](#shared-styles) |
| Zorganizować organizatorów w mierzonej szufladzie lub ustawić je na płycie | [Układ organizerów w szufladzie](#drawer-arrangements) · [Płyty montażowe](#mounting-plates) |
| Import dzieł sztuki do ścian, pokrywek lub perforowanej powłoki | [Własny relief SVG](#custom-svg-relief) · [Studio wzorów](#pattern-studio) |
| Pobierz wszystkie części szuflady ułożone dla drukarki | [Eksport całej szuflady](#whole-drawer-export) |
| Dowiedz się, dlaczego kontrola lub pobieranie nie jest dostępne | [Rozwiązywanie problemów](#troubleshooting) |

<a id="start-a-new-project"></a>
## Rozpoczęcie nowego projektu

Przy pierwszym uruchomieniu obszar roboczy jest pusty. Przewodnik po lewej prowadzi przez trzy kroki: **Wybierz kształt → Ustaw wymiary → Dodaj przegródki**. Wybierz kształt, ustaw wymiary i kliknij **Dalej: przegródki**. Zakończ przyciskiem **Gotowe** lub **Pozostaw bez przegród**. Po wybraniu kształtu możesz zamknąć przewodnik przyciskiem **×**. Możesz też otworzyć zapisany projekt lub plik JSON.

Otwórz przewodnik ponownie przez **Pomoc → Przewodnik: trzy kroki**. Samo otwarcie nie zmienia modelu. Wybranie innego kształtu zastępuje bieżący model; tę czynność można cofnąć.

Szybki start, podręcznik i menu pomocy używają wybranego języka interfejsu. Film pozostaje w języku angielskim.

Kroki, wskazówki i potwierdzenia w przewodniku są przetłumaczone. Wiersz zapisanego modelu nosi nazwę **Poprzedni projekt**. Rzeczywiste nazwy w **Moich projektach** pozostają takie, jak je zapisano.

Stosowanie **Nowy projekt** w górnym barze, aby powrócić do tego czystego początku. Twoja bieżąca praca jest najpierw zapisywana; nienazwany szkic jest zachowany w **Moje projekty**. Istniejące projekty, warianty, szczeliny żarowe i konfiguracja drukarki nie są usuwane. Panel pokazuje miniaturę z etykietą **Poprzedni projekt** z **Zapisano w „Moich projektach”**; kliknij ten wiersz, aby ponownie otworzyć bibliotekę. Płótno jest natychmiast wyczyszczone i pozostaje puste aż do wyboru nowego kształtu, tak jak na pierwszej wizycie. Dopóki nie wybierzesz nowego kształtu, oszczędzanie i eksport są wyłączone. Zamiast tego można otworzyć projekt z **Moje projekty** lub import JSON Plik. Odświeżenie tej zakładki empty- start utrzymuje ekran startowy; ponowne otwarcie istniejącego projektu przywraca model. Zwykłe wizyty powrotne wznawiają uratowaną pracę.

Wybór **Kształt → Baza → Utwórz z szablonu** podczas edycji nadal zastępuje budowę w ramach obecnego projektu i może być cofnięty. Stosowanie **Nowy projekt** kiedy chcesz mieć osobny model.

<a id="workspace-and-views"></a>
## Obszar roboczy i widoki

Otwórz narzędzie w lewym górnym rogu. **Kształt** zmienia korpus i jego akcesoria. **Przegródki** zmienia układ. **Osłona** projektuje oddzielną zewnętrzną osłonę. **Druk** ustawia objętość budowy, szczeliny żarowe i opcjonalne cięcia sekcji. Kliknij numer przedziału, ścianę lub rozdzielacz na modelu, aby otworzyć ustawienia po prawej stronie. Jeśli część jest trudna do kliknięcia, rozszerzyć **Wszystkie ściany i przedziały** i wybrać go po imieniu.

Lewy panel to nawigacja sekcji. Wybierz sekcję, która otworzy tylko swoje ustawienia w centralnym, pływającym edytorze na dole podglądu. Scena i siatka nadal za edytorem; otwarcie nie odcina podglądu. Edytor używa kompaktowych grup; nie zastępuje lewego menu. Jego szewron upada edytor i **×** Zamykam. Wybierz inną sekcję po lewej, aby zmienić ustawienia. Prawy panel pozostaje poświęcony wybranej ścianie lub przegródce.

Przeciągnij tło, aby obrócić, przewiń, aby powiększyć i przeciągnij prawym przyciskiem myszy na patelnię. **Kamera zwrotna** Przywraca obraz kamery. **Z góry** pomaga wybrać wąski przedział lub przenieść dzielnik. **3D** pokazuje wysokość ściany i ukończony montaż. **Sieć** przełącza siatkę odniesienia, z cienkimi liniami co 10 mm i głównymi liniami co 50 mm. Użyj przycisków części wyśrodkowanych nad modelem, aby odizolować organizatora, wkładki, powłokę lub pokrywę. **Razem** pokazuje dostępne części razem dla bieżącego widoku. Dla wielu poziomów, wybierz **Wyświetl stos** in the dropdown beside **Organizer** aby pokazać cały stos; wybierz **Poziom 1**, **Poziom 2** lub inny poziom, aby powrócić do tego poziomu. Edytor ustawień dolnych pozostaje otwarty. W widoku stosu, **Osłona** oraz **Wkłady** obejmują części ze wszystkich poziomów. Na węższych oknach przyciski te przesuwają się do własnego wiersza poniżej pasków narzędzi. Z pokrywą odizolowaną, wybierz **Dół** by sprawdzić jego spód. Prasa **Esc** zamknąć panel narzędzi. Użyj zakrzywionych strzałek nad modelem, aby cofnąć lub ponownie zmienić projekt.

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

Wybierz **Flat** dla obręczy poziomej, **Pochyły** dla ciągłego wzrostu, lub **Stopnie** dla różnych poziomów wzrostu. Wymiary poniżej wyborów opisują szablon, który masz zamiar stworzyć. Po utworzeniu, edytuj model pod **Wymiary**. Szerokość i głębokość mierzy zewnętrzny ślad. Wymiary wewnętrzne wybranego przedziału należy mierzyć dla danego obiektu. Na zakrzywionej podstawie, również sprawdzić zwężenie końców w **Z góry** Widok.

![Kapsułka z niskim końcem dla dostępu, wysoki koniec dla długich przedmiotów i dwa przegrody poprzeczne](../../images/capsule-sloped.jpg)

**Kształt → Dodatkowe** zawiera ściankę i grubość dna. Grubsze ściany zajmują przestrzeń z przedziałów. **Przechyl na płaskiej podstawie** przechylić ściany do przodu o 25 °, podczas gdy dno pozostaje poziome. Różni się to od pochylonej obręczy, która zmienia wysokość ściany wzdłuż ciała. Przy włączonym nachyleniu, użyj gotowych wymiarów w oknie pobierania, aby sprawdzić miejsce, w którym będzie zajmowana drukowana część.

<a id="exact-internal-dimensions"></a>
## Dokładne wymiary wewnętrzne

Wybierz przedział i użyj **Wymiary wewnętrzne** w prawym panelu, lub kliknij jego niebieską etykietę wymiaru bezpośrednio na modelu. Wybierz szerokość lub głębokość, wprowadź milimetry i kliknij poza pole inline do zastosowania. Wprowadź również stosuje się; Anulowanie ucieczki. Prawy panel zachowuje przycisk Zastosuj. Nieprawidłowe wartości nie mogą zmienić modelu. Każda zaangażowana edycja może zostać cofnięta w jednym kroku.

Pomarańczowy dzielnik jest jego bieżącą pozycją; przekreślona niebieska linia przedstawia nową pozycję. Najbliższy otwór na wybranej osi przesuwa się, utrzymując zewnętrzny rozmiar ciała i grubość ścianki bez zmian. Panel pokazuje dotknięte sąsiadujące rozmiary. Jeżeli na tej osi nie ma rozdzielacza, dostosuj wymiary całkowite lub najpierw podziel przedział.

W prostym rzędzie, rozpocząć od przedziału 1 i kontynuować w kolejności; ostatni przedział zajmuje resztę. Sąsiadne wymiary nie są zablokowane, więc edycja wcześniejszego przedziału może zmienić rozmiar późniejszego.

Zaokrąglone narożniki, kontury kapsuły, szampary i wewnętrzne filety pozostają obsługiwane. Niebieska linia mierzy rzeczywisty wewnętrzny rozpiętość na linii środkowej przedziału, tuż nad podłogą. Przestrzeń może zawęzić się gdzie indziej wokół krzywych: dodać prześwit i sprawdzić cały ślad obiektu. Koło, owalne, plaster miodu i przechylone ściany nie wspierają obecnie dokładnej edycji przedziału.

Wybierz ścianę lub rozdzielacz, aby edytować jej wysokość bezpośrednio na modelu. Płaskie ściany pokazują jedną wartość; dwupunktowe profile pokazują wartości A / B. Reguły Linked- high i Stepped- wall pasują do prawego panelu. Te etykiety edytują wysokość, nie długość ściany lub globalną grubość.

<a id="compartments-and-dividers"></a>
## Przegródki i ścianki działowe

Dla szybkiego układu, użyj **Przegródki → + Przedział** do podziału największego przedziału. **− Przedział** Łączy sąsiadującą parę. W plastrze miodu, te urządzenia sterujące dodają lub usuwają zewnętrzną komórkę i zachowują wielkość pozostałych. Dwie sąsiadujące komórki plastra miodu dzielą ścianę tak wysoką jak ta wyższa.

Aby uzyskać dokładny układ, przełącz na **Z góry** i wybierz przedział, który chcesz podzielić. Wybierz **Liczba części** Więc... **Podział na szerokość** podział szerokości na mniejsze przedziały, lub **Podziel się na części** do robienia płytszych. Możesz znowu podzielić jeden z wyników. Na ołówek obok dwóch małych tac, najpierw podzielić szerokość na dwa, a następnie podzielić tylko stronę tacki w głębokości.

![Przykład widoku z jedną zatoką głębokości pełnej i dwoma mniejszymi przegródkami](../../images/compartment-splits.svg)

Wybierz dzielnik, aby go przeciągnąć lub dostosować **Pierwsza komora** poniżej **Położenie przegrody**. Tylko wybrane ruchy dzielnika; pozostałe pozycje dzielnika pozostają stałe. Przyległe przedziały zmieniają rozmiar. Ruchy, które pozostawiają zbyt mało miejsca są odrzucane. Sprawdzić nowe wymiary wewnętrzne z każdej strony. **Usuń partycję** łączy przedziały i może również usunąć dzielniki zagnieżdżone wewnątrz tego podziału. Przejrzyj zaznaczony wybór i potwierdzenie przed jego usunięciem.

<a id="wall-heights-and-cutouts"></a>
## Wysokość ścianek i wycięcia

Wybierz zewnętrzną ścianę lub rozdzielacz. **Jedna wysokość** ustawia szczyt poziomu. **Dwa punkty** pozwala ustawić wysokość na końcach **A** oraz **B**, które są oznaczone na modelu. Wybierz **Bezpośrednie**, **Faliste** lub **Zygzak** Kształtować krawędź wzdłuż ściany. Wavelprovidence kontroluje odległość między powtórzeniami. W szablonie stopniowym, wybór stopnia dostosowuje swój poziom wraz z połączoną ścianą i rozdzielaczem.

Stosowanie **Połącz wysokości sąsiednich ścian** Żeby na zewnątrz ściana podążała za sąsiadami. Dla rozdzielacza, **Dopasuj do sąsiednich ścian** raz skopiuje dwie wysokości końcowe. Powtórzyć dopasowanie po zmianie sąsiednich ścian. **Jak inni.** zwraca wybraną ścianę do wspólnej wysokości.

Otwórz **Wycięcie w ścianie** Aby uzyskać dostęp do otwarcia. Wybierz gładką gałkę, średnik lub prostokątny otwór, ustawić szerokość i głębokość, a następnie przenieść go wzdłuż ściany. Pozycja biegnie od końca A do B Głębokość mierzy się w dół od górnej krawędzi. Sprawdzić pozostałe wargi nad podłogą. Wybierz **Brak wycięcia** by wypełnić otwór. Zamiast tego Honeycomb używa wysokości komórek. Stepped koła i owale nie wspierają wycinanki w zewnętrznych ścianach.

<a id="corners-edges-and-decoration"></a>
## Narożniki, krawędzie i dekoracje

Otwórz **Kształt → Narożniki i fazowania**. Trzy urządzenia sterujące wpływają na różne części druku.

| Kontrola | Gdzie szukać | Co to zmienia? |
| --- | --- | --- |
| narożniki zewnętrzne | Widok górny, obrys zewnętrzny | Okrąg rogów stóp lub wyciąć je w 45 °. Zero daje kwadrat narożnik. Dostępny na prostokątnej rodzinie baz. |
| Promień wewnątrz przedziałów | Widok z góry, wewnątrz zatoki | Zaokrągla pionowe skrzyżowanie, gdzie spotykają się dwie ściany. Napięte zatoki ograniczają dostępny promień. |
| Górna krawędź ścian i dzielników | Odcinek krzyża przez ścianę | **Faza** wycina płaski kołek i **Zaokrąglone** Zakrzywia wargę. Obie strony ścian zewnętrznych i dzielników otrzymują wykończenie. **Bez obróbki** Przywraca kwadratową wargę. |

![Przegrody ścienne o tej samej grubości ścianki, kwadratowe, szare i zaokrąglone narożniki](../../images/top-edge-profiles.svg)

Na przykład, na ścianie 2 mm spróbuj szamfer 0,5 mm. Każda strona traci 0,5 mm na samej górze, pozostawiając płaski pasek o grubości 1 mm. Maksymalny wyświetlany rozmiar zależy od grubości ścianki. Z **Zaokrąglone**, wartość jest promieniem w milimetrach.

- **Kolor organizera** zmienia podgląd i kolorowy eksport. Wybierz swatch, niestandardowy kolor lub konfigurowany kolor żarnika. Przypisanie rzeczywistego szczeliny żarnika przy wywozie.
- **Dolna listwa** dodaje zespół projekcyjny wokół bazy. Wybierz gładkie, paski lub depilacji i ustawić jego wysokość. Kompatybilny rękaw może na nim spoczywać. Trim wymaga nieprzechylonego, jednoczęściowego korpusu i jest dostępny na pierwszym poziomie. Oddzielne panele siedzą nad nim z wybranym przesunięciem krawędzi.
- **Płaskorzeźba organizatora** dodaje wzniesiony wzór bezpośrednio do zewnętrznej ściany. Przewiń katalog wzorów, ustaw rozmiar wzoru i wysokość ulgi, i oglądaj aktualizację modelu podczas przeciągania jak każda kalkulacja kończy. Wartość końcowa wykorzystuje pełną precyzję. Wewnątrz jest gładko. Projekcje zwiększają wymiary zewnętrzne. Wybierz **Gładkie** aby usunąć ulgę.
- **Podpis i odznaka** umieszcza napis lub symbol na wybranej stronie. Wprowadź tekst, wybierz czcionkę, ustaw wysokość litery i pozycję pionową, a następnie wybierz podniesione litery lub grawerowanie i ustaw wysokość lub głębokość. Gwiazda lub serce mogą towarzyszyć tekst. Na okrągłych i owalnych organizatorów, tekst i ikony po zakrzywionej ścianie, w tym w STL oraz 3MF Wywóz. Odstęp literowy mierzy się wzdłuż powierzchni. Wybierz przód, tył, lewo lub prawo, aby wyśrodkować napis z tej strony. Na kręgach i owalach z połączonymi lub zmiennymi wysokościami ścian, napisy pozostaje poniżej najniższego profilu ściany i wycinanie. Napisy na plastrze miodu nie są jeszcze obsługiwane; muszle pokrywające wybraną stronę i ulga może również zapobiec napisach. Napisy na ścianie płaskiej nadal wymagają profilu na wysokość stałą. Jeżeli napis biegnie do wycięcia lub przekracza dostępną twarz, obniżyć pozycję lub zmniejszyć rozmiar litery.

<a id="inserts-tiers-and-lids"></a>
## Wkłady, piętra i pokrywy

**Usuwalne wkładki.** Wybierz przedział, a następnie powiększ **Włóż do przegródki** Po prawej. **Pusty** robi otwarty kubek. **Na drobne rzeczy** dodaje siatkę z regulowanymi wierszami i kolumnami. **Do uchwytów** tworzy gniazda do długopisów lub narzędzi. Ustaw wewnętrzną średnicę gniazda, a aplikacja zmieści się z taką liczbą, na jaką pozwala wkładka. Wybierz dopasowany, zaokrąglony, okrągły, owalny lub sześciokątny obrys i kolor. **Wyjąć wkładkę** Oczyszcza zatokę. Pusty kubek to wciąż część do wydruku.

Wkładka podąża za przegrodą z prześwitem co najmniej 0,5 mm. Jego ściany i dno są o grubości 1,2 mm, a jego wysokość dostosowuje się, aby zakończyć około 1 mm poniżej obręczy. Wstawić w przechylony organizator wychodzi wzdłuż zbocza. Izolacja **Wkłady** do kontroli, a następnie eksportu **Organizator i akcesoria**. Wkłady wymagają drukowania jednoczęściowego.

**Tace w zestawie.** Zacznij od obręczy poziomej, a następnie otwórz **Kształt → Poziomy → + Poziom**. Możesz użyć dwóch do pięciu poziomów; **− Poziom** usuwa poziom. Tiers wspólne ślad, ale może mieć różne przedziały, wysokości, kolory i dekoracje.

1. In the dropdown beside **Organizer** powyżej modelu, wybierz **Poziom 1**, **Poziom 2** albo inny poziom. Ten poziom jest wyświetlany samodzielnie, a bieżący edytor ustawień pozostaje otwarty.
2. Edytuj zaznaczony poziom z typowym kształtem, przedziałem, ulgą i powłoką. Zmiana poziomu nie kopiuje ustawień do innych poziomów.
3. Wybierz **Wyświetl stos** w tym samym spadku do kontroli wszystkich poziomów i akcesoriów razem. Stosowanie **Razem**, **Organizer**, **Wkłady**, **Osłona** lub **Pokrywka** Aby pokazać części, których potrzebujesz. Powrót do poziomu liczbowego, aby kontynuować jego edytowanie.
4. Pod **Kształt → Poziomy**, dostosować **Luz pasujący** i wydrukować małą dopasowaną próbkę przed zobowiązaniem się do pełnego stosu. Niższe dzielniki stojące nad obręczą. Stacking wymaga pionowych ścian i ciągłego podparcia obręczy.

Wbudowane i SVG Relief udekorować na zewnątrz każdego poziomu, podczas gdy godowe obroże, języki i gniazda pozostają gładkie. Owinięte powłoki i panele dekoracyjne mogą pokrywać poszczególne poziomy. Do paneli, przechowywać **Przesunięcie krawędzi** co najmniej 3 mm, aby oczyścić obroże godowe.

Z owiniętą powłoką, język wewnątrz dolnej ściany pasuje do gniazda pod podłogą górnej tacki. Szerokości, głębokości i wysokości użytkowej pozostają niezmienione; każde gniazdo dodaje 2,2 mm do zmontowanej wysokości zewnętrznej stosu. Dopasowywanie muszli spotykają się na wąskim 0,8 mm taśmy nośnej. Skorupy przesuwają się z góry; oddzielają poziomy przed ich usunięciem. Każda skorupa eksportuje jako oddzielną część z numerami rzędowymi.

**Dolna listwa** jest dostępny tylko na pierwszym (najniższym) poziomie: wybrać gładkie, pierścienie lub kroki. Dzięki kompatybilnej obudowanej powłoce, wykończenie wspiera również powłokę. Oddzielne panele siedzą nad wykończeniem z wybranym przesunięciem krawędzi. Nowe górne poziomy nie dziedziczą wykończenia. Jeśli język nie może zmieścić się w grubości ściany, zmniejszyć **Luz pasujący**; aplikacja nie zagęszcza ściany automatycznie. Wycinanie ścian musi pozostawiać wystarczającą ilość materiału w pobliżu obu narożników, aby podtrzymać tacę nad nim.

**Lid.** W **Kształt → Pokrywka**, kliknij **+ Okładka**. Stosować poziome górne obręcze o równych zewnętrznych wysokościach ścian i przegrodach na lub poniżej. Odchylenie, plaster miodu i druk sekcyjny zapobiegają temu dopasowaniu. Wybierz **Nakładana** w przypadku zewnętrznej pokrywy lub **Wpuszczana** dla płyty 2 mm, która siedzi spłukać wewnątrz tacki. Opcja inset wycina siedzenie w górnej ścianie z prześwitem 0,35 mm z każdej strony i pozostawia miejsce powyżej dzielników i wkładek. Wymaga co najmniej 2 mm grubości ścianki i 4 mm głębokości wewnętrznej. Dodaj wycinanie ścian lub uchwyt, aby go podnieść. Pokrywa nakładająca się na siebie ma obręcz o prześwicie 0,5 mm. Wybierz jego górny wzór, skalę i głębokość, a następnie ustawić wysokość obręczy i zakończyć. Dla uchwytu wybrać cylindryczny lub pręt, ustawić jego rozmiar i wysokość, a opcjonalnie chamfer lub okrągłe jego krawędzie. Rękojeść drukuje się oddzielnie i klei do pokrywy. Podgląd podnosi pokrywę nakładającą się na siebie i pokazuje wpuszczoną pokrywę siedzącą. Eksportowana pokrywa jest płaska do drukowania.

**Dwutonowy wzór.** Włącz go na pokrywie dopasowania, a następnie wybierz gałąź Olive, liści Ginkgo, Fern liści, fale pływowe, Rzeczne kamyki Pierścienie wzrostu lub komórki Voronoi. Wybierz kolor podstawowy i kolor wzorca. Płyta o grubości 3,2 mm ma solidne podłoże o grubości 1,6 mm i powierzchnię o wymiarach 1,6 mm. Zewnętrzna obręcz lokalizacji i opcjonalny uchwyt dodać do całkowitej wysokości. W przypadku wpuszczonej pokrywy należy zapewnić głębokość wewnętrzną co najmniej 5,2 mm. Wywóz 3MF aby zachować oba kolory razem jako jedną pokrywę, i przypisać dwie części do szczeliny żarnika. Dla gałązki oliwnej, liści Ginkgo, liści Fern, fal pływowych i pierścieni wzrostu, **Wzór ażurowy** sprawia, że motyw z otworów w ciągłej blachy górnej. Połącz to z **Wypukły wzór** Aby zdemaskować wpuszczone oparcie przez otwory. Włącz **Wypukły wzór** pozostawić otwory w górnej części 1,6 mm puste. Wyłącz go dla gładkiej inlay. Najpierw podwieszane pokrywy wtykowe drukują podkład; pokrywają się pokrywy drukowane wzorowane twarzą do dołu. Sprawdź pomosty nad wgłębieniami w krajalnicy.

![Sześć dwutonowych wzorów pokrywy](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Osłony jednoczęściowe i panele

Otwórz **Osłona** i wybrać wzór. Skorupa drukowana jest oddzielnie od organizatora. Jeśli chcesz wzór na samym ciele, użyj **Kształt → Płaskorzeźba organizatora**.

| Tryb powłoki | Dopasowanie i montaż |
| --- | --- |
| **Wokół ciała** | Jeden bezdenny rękaw podąża za krawędzią i wysokościami ścian. Przesuń go nad korpusem z góry, podążając za kierunkiem ściany na pochylonym modelu. Panel wskazuje, czy na stole znajduje się rama podparcia czy rękaw. |
| **Panele dekoracyjne** | Oddzielne ramowane panele pokrywają wybrane boki i pozostawiają odsłonięte narożniki. Wybierz boki i dostosuj **Przesunięcie krawędzi**. Płyty klejowe bez elementów złącznych. Z ukrytymi szpilkami, nacisnąć każdy panel prosto na jego pasującą ścianę, aby uzyskać trwałe mocowanie. |

![Górny widok rękawa owijania narożników i oddzielnych paneli kończących się przed każdym rogiem](../../images/shell-fit.svg)

Wybierz wzór, ustaw jego rozmiar i zestaw **Grubość skorupy**. Na rękaw jednoczęściowy, regulować **Szerokość obrzeża** za jego solidną ramę. Panele dekoracyjne mają stałą ramę; zastosowanie **Przesunięcie krawędzi** Ustawić ich na ścianie. Pod **Lądowanie**, **Prześwit z każdej strony** ustawia lukę między rękawem i organizatorem. Przepaść 0,5 mm z każdej strony dodaje 1 mm przez dwa przeciwległe boki, zanim policzysz grubość powłoki. Porównaj **Razem** z odizolowanym **Osłona** pogląd, aby ocenić wynik. **Pobierz powłokę** wywozi pokrywę oddzielnie, oraz **Usuń skorupę** usuwa go z projektu.

Panele wymagają kompatybilnej prostokątnej podstawy. Przełączanie na panele zachowuje grubość ścianki i przestrzeń przedziału. Ukryte gniazda montażowe wymagają ścian o grubości co najmniej 3,2 mm bez ulgi. Dla cieńszych ścian, w tym 2,4 mm, należy używać paneli bez elementów złącznych i przyklejać je na miejscu. Grubość ścianki nigdy nie jest podnoszona automatycznie. Offset krawędzi panelu kontroluje margines na twarzy, podczas gdy prześwit rękawa kontroluje przesuwne dopasowanie. Z dolnym wykończeniem, dolna offset zaczyna się u góry wykończenia; złącza i gniazda panelowe podążają za tym samym profilem. W celu oczyszczenia kołnierzy godowych konieczne jest przesunięcie krawędzi o co najmniej 3 mm.

<a id="projects-and-backups"></a>
## Projekty i kopie zapasowe

Stosowanie **Moje projekty → Zapisz kopię** nazwy projektu lub wykonania wariantu przed eksperymentem. Otwarty projekt zapisuje automatycznie w tej przeglądarce. Biblioteka pozwala na wyszukiwanie, otwieranie, zmianę nazwy, usuwanie lub pobieranie projektu. **Zapisz projekt** w górnym pasku pobiera edytowalne JSON Wsparcie. Stosowanie **Otwarte** wczytanie tego pliku, w tym na innym komputerze lub w instalacji lokalnej.

Powierzone edycje są zapisywane natychmiast. Tymczasowa, lokalna kopia odzyskiwania chroni zmiany, podczas gdy baza danych przeglądarki jest zapisywana; ponownie otwiera odtwarzanie kopii, jeśli zapis został przerwany. Oddzielny, zakończony powodzeniem migawka może odzyskać uszkodzoną bieżącą sesję, w tym historię cofnięcia. Jeśli nie można przywrócić poprawnej kopii, automatyczne zapisywanie zatrzymuje się zamiast zastępowania przechowywanego projektu modelem startowym. Zachowaj do pobrania kopie zapasowe JSON: nie można automatycznie odzyskać odczytu danych przeglądarki lub awarii obu mechanizmów przechowywania.

Kontrole eksportu należą do bieżącej rewizji projektu, wybranych części i pozycji montażowej. Zmiana tych unieważnia poprzednią kontrolę; stary wynik nie może być pobrany jako nowy model. Nieudane obliczenia zatrzymują edycje. Zablokowany podgląd zgłasza błąd po dwóch minutach; następna edycja geometrii rozpoczyna nowe obliczenia.

Kiedy ten sam projekt lub szuflada jest edytowana w wielu zakładkach, sprzeczne zmiany są zapisywane jako osobne **Copy from another tab**. Druga wersja jest przechowywana, a zakładka edycji kontynuuje swoją kopię. Porównaj wersje w **Moje projekty** lub wybielacz szuflady i zmienić nazwę kopii, jeśli chcesz go zatrzymać. Ponowne otwarcie zakładki organizatora przywraca swój własny zapisany projekt. Zmiany nie są automatycznie łączone pomiędzy zakładkami.

Zachowaj pobraną kopię zapasową przed wyczyszczeniem danych przeglądarki. Każda przeglądarka i adres strony ma własną bibliotekę. Szczeliny na włókna są przechowywane oddzielnie dla drukarki w przeglądarce. Ustaw je ponownie przy przechodzeniu do innego urządzenia. Aby pobrać aplikację lokalną, zobacz [Instalacja lokalna](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Ustawienia druku i podział na części

Pod **Druk**, wybrać konfigurację drukarki i głowy lub wybrać **Własny rozmiar**. Sprawdzić szerokość, głębokość i wysokość budowy. Zaprogramowany system dostarcza objętość budowy. Wybrać profile drukarki, dyszy, materiału i krojenia w krajalnicy.

Dla modelu, który przekracza łóżko, należy użyć proponowanych cięć lub wybrać dwie lub trzy sekcje, jeśli są dostępne. Przeczytaj proponowane pozycje szwu i zastosowanie **Rozsuń części** Zobaczyć, jak spotykają się sekcje. Rozdzielanie zwiększa grubość ścianki do co najmniej 5 mm, a grubość podłogi do co najmniej 3 mm. Odtworzyć wewnętrzne wymiary. Zdjąć muszle i wkładki przed podziałem. Tace układane, modele pochylone oraz podstawy okrągłe, owalne i plastry miodu wymagają drukowania jednoczęściowego. **Zwróć model bryłowy** wyłączniki odcinające. Sprawdź grubość ponownie, jeśli chcesz przywrócić wcześniejsze wymiary.

**Wspólna próbka** Pobieranie końcówek krycia, aby spróbować w tej samej skali i ustawienia drukowania, co ciało końcowe. Umieść je oddzielnie z opuszczonymi bazami. Po ochłodzeniu nominalne sworznie Ø 3,2 × 8 mm mieszczą się w otworach Ø 3,3 mm, o głębokości 4,5 mm z każdej strony szwu. Sprawdzić ustawienie, a następnie użyć szpilek i kleju do montażu drukowanych sekcji. Stosowanie **Pobierz wszystkie części** dla secesyjnego organizatora.

<a id="download-and-slice"></a>
## Pobieranie i przygotowanie w slicerze

1. W **Druk**, skonfigurować szczeliny żarnika, jeśli chcesz plik multicolor. Dopasuj numery gniazd i kolory do krajalnicy. W sprawie Snapmaker U1, szczeliny 1-4 odpowiadają T0 – T3. Dodać do 16 szczelin, ustawić każdy kolor i opcjonalnie nazwać jego materiał. Kolor to przybliżony przewodnik wizualny, a nie symulacja zadrukowanego lub mieszanego cienia. Konfiguracja dokładnych kolorów i mieszanie w krajalnicy. Wybierz dowolną kartę żarnika i wybierz **Usuń żarnik ze szczeliny N** by ją usunąć. Pozostałe numery slotów nie zmieniają się: usunięcie slot 6 pozostawia slot 7 jako slot 7. **+ Slot N** ponownie dodaje najniższy dostępny numer; limit pozostaje na 16. Usuwanie żarnika nie zmienia koloru modelu. Usunięte sloty nie są już oferowane lub automatycznie dopasowywane przy wywozie; wybierz inny slot wyraźnie lub przypisz go do krajalnicy. Różne kolory pozwalają aplikacji dopasować kolory części do szczelin automatycznie. Jeśli dwa sloty dzielą kolor, wybierz zamierzony slot dla każdej części w oknie pobierania.
2. Kliknij **↓ Pobierz**. Wybierz **Organizator i akcesoria**, **Tylko powłoka** lub **Cały zestaw**, według jakich części potrzebujesz. Dla oddzielnego modelu, eksportować zestaw.
3. Wybierz format poniżej. Dla 3MF, przypisz szczelinę żarnika do każdej części lub zostaw ją do przypisania w krajalnicy. Orca może użyć pierwszego żarnika dla nieprzypisanych części.
4. Odczytaj wymiary każdej części i każdą instrukcję, aby obrócić ją o 90 ° na łóżku. Czek rezerwuje 2 mm na krawędziach łóżka. Pobierz za pomocą przycisku formatu na dole okna dialogowego.
5. Otwórz wynik w krajalnicy na **Skala 100% w milimetrach**. Ustaw kompletny zestaw, sprawdź overhangs i cienkie szczegóły, i podgląd pierwszej warstwy i dzielników. W przypadku druku wielokolorowego przed krojeniem należy zweryfikować przypisanie każdej części żarnika.

| Format | Wybierz go dla | Co zrobić z pobraniem |
| --- | --- | --- |
| STL | Geometria dla jednokolorowego druku | Otwórz STL w krajalnicy. Wyciągnij ZIP najpierw, jeśli wywóz zawiera kilka STL. |
| 3MF | Zestaw z oddzielnymi częściami, kolorami i przydziałami żarnika | Otwórz go w krajalnicy i zweryfikować części i szczeliny. ReplixGrid pozostawia drukarkę i profile materiału do krajalnicy. |
| OBJ + MTL | Kolorowy model dla narzędzia, które akceptuje OBJ | Utrzymuj geometrię i plik materiału razem. Model używa milimetrów z Z do góry. |
| Projekt JSON | Kontynuowanie edycji przedziałów, wymiarów lub akcesoriów | Stosowanie **Zapisz projekt** i ponownie otworzyć **Otwarte** w ReplixGrid. |


Aby dopasować kolor cyfrowy z krajalnicy, wklej jego sześciocyfrowy **Kod HEX**, na przykład `#E63522`, obok wybielacza kolorów. Prowadzący `#` jest fakultatywny. Ważne kody aktualizują podgląd natychmiast; niekompletny lub nieprawidłowy tekst nie jest stosowany i wraca do zapisanego koloru po opuszczeniu pola. Pasujące HEX kod nie symuluje wyglądu żarnika, oświetlenia ani mieszaniny kolorów fizycznych.

<a id="troubleshooting"></a>
## Rozwiązywanie problemów

| Co widzisz? | Co sprawdzić |
| --- | --- |
| Obiekt pasuje do zewnętrznych wymiarów, ale nie zmieści się w zatoce | Wybierz przedział i sprawdź jego pomiary wewnętrzne. Zezwalaj na grubość ścianki, zakrzywione końce, promień narożnika wewnątrz i wyjmowane wkładki. |
| Wybór dzielnika ciągle wybiera ścianę z przodu | Przełącz na **Z góry** lub otwarte **Wszystkie ściany i przedziały** Po prawej. |
| Nie można dodać pokrywy lub następnego poziomu | Sprawdzić poziome obręcze, równe wysokości zewnętrzne, wystające dzielniki, przechył lub druk podzielony. Dla stosu, również sprawdzić stare klipy powłoki i prześwit dopasowania w stosunku do grubości ściany. Built- in i SVG ulgi są wspierane na poszczególnych poziomach; powierzchnie krycia pozostają gładkie. |
| Część przekracza łóżko, chociaż ślad wydaje się dość mały. | Przeczytaj ukończone wymiary w oknie pobierania. Przechylenie, ulga, wykończenie i powłoki mogą wykraczać poza podstawę. Sprawdź wybraną konfigurację drukarki i rotację. |
| Ukryte złącza paneli są niedostępne | Używać ścian o grubości co najmniej 3,2 mm bez ulgi, lub pozostawić złącza i przykleić panele. Zmiana na panele nie zagęszcza ścian. |
| Panele nakładają się na dolną krawędź lub obręcz poziomą w starej konstrukcji | Ustaw offset krawędzi co najmniej 3 mm dla poziomów. Dolne offset jest mierzony od góry dolnego wykończenia. Regeneruj i pobierz części po zmianie ustawień. |
| Ściągnięty odcisk ma złe kolory. | Stosowanie 3MF, dopasować numery gniazd w **Druk** Potem sprawdź przydziały w krajalnicy. STL posiada tylko geometrię. |
| Brakuje projektu zapisanego na innym urządzeniu. | Przenieść swój projekt JSON i stosowanie **Otwarte**. Biblioteki przeglądarek są lokalne dla każdego urządzenia i adresu strony. |

<a id="project-variants"></a>
## Warianty projektu

Kliknij **+ Wariant** w górnym pasku, lub otwarte **Moje projekty** i wybierz **Nowy wariant**. Wprowadź nazwę i kliknij **Utwórz wariant**. Nowy wariant jest niezależną kopią, oryginał pozostaje zapisany. Nienazwany oryginał jest zachowany jako **Szkic**.

Użyj pokrętła wyboru obok **+ Wariant** przełączanie się między powiązanymi modelami lub wybór jednego pod **Warianty tego projektu** w moich projektach. Każdy wariant zapisuje automatycznie i zachowuje własną historię cofnięcia / ponownego wykonania po przełączeniu lub ponownym załadowaniu. Nowo stworzony wariant zaczyna się od pustej historii.

Stosowanie **Osobny projekt → Zapisz kopię** stworzenie niepowiązanego projektu. Zmień nazwę lub usuń poszczególne modele w Moje projekty; usunięcie oryginału nie usuwa jego wariantów.

**Pobieranie** eksportuje wybrany model druku. **Zapisz projekt** pobiera ten model jako edytowalny JSON; **Plik** na karcie bibliotecznej pobiera odpowiedni model. JSON zawiera jeden model, bez jego powiązanych wariantów lub historii cofnięcia. Zapisz każdy model oddzielnie do przeniesienia lub kopii zapasowej całego zestawu.


<a id="shared-styles"></a>
## Wspólne style

1. Otwórz projekt kolorami i wzorami, które chcesz ponownie wykorzystać.
2. Pod **Kształt → Wspólny styl**, wprowadź nazwę i kliknij **Zapisz bieżący styl**.
3. Otwórz inny projekt lub wariant, powrócić do **Wspólny styl**, i wybrać zapisany styl.
4. Wybierz **Kolory**, **Wzory** Albo jedno i drugie. Przegląd **Zostanie zastosowane** oraz **Zostanie pominięte** wiadomości, a następnie kliknij **Zastosuj styl**.

Styl rejestruje kolor organizatora i ulgę, plus kolory i wzory istniejącej powłoki i pokrywy. Styl gładkiego ciała usuwa ulgę ciała przeznaczenia. Wymiary, układy przedziału, grubość ścianki, dopasowanie pokrywy, uchwyty i przepustki powłoki pozostają niezmienione. Brakujące pokrywy lub powłoki nie są dodawane. Niekompatybilne ustawienia wzorca są pomijane z wyjaśnieniem; kompatybilne ustawienia mogą być nadal stosowane. Wstaw kolory i przydziały gniazda plików nie są przenoszone.

Aplikacja jest jednym krokiem cofania i tworzy niezależną kopię: później edytuje do jednego organizatora nie zmienia innych. Usuwanie zapisanego stylu nie zmienia projektów, które już go używają.

Zapisane style należą do tej przeglądarki i adresu strony. Projekt JSON zachowuje zastosowany wygląd, ale nie zawiera ocalonej biblioteki stylu. Aby ponownie użyć stylu na innym urządzeniu, otworzyć tam styl projektu JSON i zapisać jego aktualny styl ponownie.


<a id="drawer-arrangements"></a>
## Układ organizerów w szufladzie

Wybierz **DRAWER** obok **Organizer** Więc... **Create drawer**. Wprowadzić zmierzoną długość, szerokość, użyteczną wysokość i prześwit. Prześwit stosuje się zarówno na ścianach szuflady, jak i między tacami.

Nowe szuflady zaczynają się od 180 × 280 mm, a przednia krawędź jest zaznaczona na dole. **Obróć widok o 90 °** zmienia tylko orientację przeglądania; wymiary szuflady, współrzędne tacki i eksportowane modele pozostają bez zmian. Istniejące urządzenia szuflady zachowują swoje wymiary. Oszczędzane szuflady otwarte z długością poziomą i szerokością pionową; etykiety wymiarów podążają za ręczną rotacją widoku. Przycisk rotacji tacki obraca tylko wybraną tacę.

Stosowanie **New organizer** aby stworzyć tacę bezpośrednio w szufladzie. Ustaw jego wymiary, a następnie edytuj przedziały i akcesoria w zwykłym edytorze organizatora. **Powrót do szuflady** powraca do swojego położenia. **Add saved organizer** dodaje niezależną kopię zapisanego projektu lub wariantu; jego edycja nigdy nie zmienia jego źródła.

Przeciągnij tacki w widoku górnym lub wprowadź współrzędne X / Y mierzone od lewego górnego rogu do zewnętrznych granic tacki. Obróć o 90 stopni, powiel lub usuń tacki. Klawisze strzałek przesuwają tacę ogniskową o 1 mm (Shift: 10 mm). Układ cofnij / ponownie przywraca miejsca i ukończone edycje tacki.

Diagram pokazuje zmontowane zewnętrzne prostokąty, w tym muszle, wykończenia, pokrywy i poziomy. Zakrzywione kształty są sprawdzane zachowawczo, a nie szczelnie zagnieżdżone. Podświetlone są konflikty graniczne, prześwitowe i wysokości. Poczekać na kontrolę geometrii przed poleganiem na stanie dopasowania. Wybierz wolne umieszczenie lub umożliwić montaż płyty, jak opisano poniżej.

Drawers zapisać lokalnie w tej przeglądarce, oddzielnie od projektów organizacyjnych. Pobierz szufladę JSON plik do tworzenia kopii zapasowej lub transferu; otwarcie jednego tworzy osobną kopię szuflady. Wybierz tacę i wybierz **Download selected tray** dla własnego STL, 3MF lub OBJ wywóz z istniejącymi kontrolami wielkości printera. Współrzędne kreślarskie nie stają się położeniem print- bed.

<a id="mounting-plates"></a>
### Płyty montażowe

W **DRAWER → Drawer base**, wybierz **Mounting plate**. Długość / szerokość kredensu i prześwit ściany określają obszar pokryty. Podaj użyteczną szerokość i głębokość **Łóżko drukarki 3D** osobno: wymiary te określają maksymalny rozmiar sekcji, a tym samym liczbę sekcji. Obliczenie obejmuje wspólne projekcje i marżę drukowania 2 mm na każdej krawędzi łoża. Wymiary nie muszą być wielokrotnością siatki 20 mm; sekcje krawędzi pasują do pozostałej przestrzeni.

**Download sections (ZIP)** tworzy jeden numer 3MF na druk pracy, SVG mapa montażowa i lista współrzędnych. Mapa używa oryginalnej orientacji szuflady, niezależnie od rotacji widoku. R wskazuje wiersze od góry do dołu, kolumny C od lewej do prawej. Niższe sąsiadujące dovetails na miejsce z góry. Pierwszy druk **Download joint sample**, zawierające dwie małe przyległe sekcje; sprawdź montaż z drukarką przed wydrukowaniem pełnego zestawu. W stawach stosuje się szew 0,05 mm i dodatek profilu 0,03 mm. Słabe szwy i lekka gra może pozostać między gołymi sekcjami.

Przy włączonym trybie płytkowym, pobieranie tacki obejmuje gniazda podziemne dla pozycji tacki i jej rotacji. Wewnętrzne wymiary przedziału są zachowane. Taca staje się o 2,1 mm wyższa; w tym płyta 2 mm, kontrola dopasowania szuflady dodaje 4,1 mm. Po przesunięciu lub obróceniu tacki, pobrać ją ponownie: jej gniazda muszą pasować do pozycji peg. Zmiana klirensu szuflady również zmienia pochodzenie peg.

Prześwit radiacyjny gniazda wynosi 0,12 mm. Wydrukuj mały organizator rozmieszczający dwie sekcje, aby sprawdzić, czy pasuje do ustawień materiału i warstwy. Gniazdo zachowuje organizator po bokach; podnieś go do góry, aby go usunąć. Eksportuj wykorzystuje tylko geometrię: wybierz drukarkę i profile materiałowe w krajalnicy i sprawdź dachy gniazda przed drukowaniem.

Montaż obecnie obsługuje nierozdzielone organizatory bez przechyłu, z co najmniej trzema w pełni obsługiwanymi gniazdami. Małe tacki mogą wymagać przesunięcia lub powiększenia. Górne poziomy i powłoki zachowują swoją istniejącą geometrię. Wyłącz tryb płyty, aby eksportować oryginalny niezamontowany model. Oszczędzone projekty źródłowe pozostają niezmienione.

<a id="custom-svg-relief"></a>
## Własny relief SVG

Pod **Kształt → Płaskorzeźba organizatora → My SVGs**, wybierz **Upload SVG** lub wrzucić plik do obszaru wysyłania. Wybierz zapisaną miniaturę, aby ją ponownie wykorzystać. Ta sama biblioteka jest dostępna pod **Kształt → Pokrywka → My SVGs** oraz **Osłona → Wzór → My SVGs**. Każdy cel zachowuje swój własny wzór i ustawienia rozmieszczenia.

Wybierz **Single motif** lub **Repeat**, wybrać ściany zewnętrzne, i dostosować szerokość motywu w milimetrach, obrót, poziome / pionowe przesunięcie, i powtórzyć szczelinę. Szerokość i wysokość zachowują oryginalne proporcje. Umieszczenie jest skoncentrowane na każdej wybranej stronie; na zakrzywionych ciałach boki odpowiadają czterem sektorom zewnętrznym. Pozytywne przesunięcie pionowe przesuwa motyw w górę. Wzór jest zgodny z obrysem zewnętrznym. Powtórzenia umieszcza się tylko wtedy, gdy kompletny motyw pasuje pod górną obręczą, wokół wycięć i w obrębie każdej strony. Pojedyncze motywy są przycięte do tych granic. Relief głębokość wykorzystuje istniejące **Głębokość / Intensywność** Kontrola. Oryginalne ściany i przedziały wewnętrzne są zachowane; wymiary zewnętrzne zwiększają się. Poczekać, aż zaktualizowany podgląd się zakończy, a następnie sprawdzić i pobrać część.

Obsługiwane SVG zawierają wypełnione ścieżki, wielokąty, prostokąty, koła lub elipsy, w tym otwory i transformaty grupowe. Przelicz tekst i pociągnięcia na wypełnione ścieżki przed wywozem z edytora wektorowego. Zdjęcia, odniesienia zewnętrzne, filtry, maski, ścieżki wycinające, gradienty, bloki stylu CSS i odniesienia do elementów wielokrotnego użytku ( `use` ) nie są wspierane. Puste lub niewykorzystane definicje zawierające obsługiwane kształty są ignorowane. Kolory stają się pojedynczym uniesionym kształtem przy użyciu koloru organizatora. Limity to 200 KB, 512 XML elementów, 128 wypełnionych kształtów i 6000 wybranych punktów konturu; zbyt złożone wzory lub nadmierne powtarzanie są odrzucane komunikatem. Krzywe są zbliżone poligonalnymi konturami do druku.

SVG są przetwarzane lokalnie w przeglądarce. Biblioteka pozostaje na tym urządzeniu. Każdy projekt zawiera niezależną kopię używanych konturów, dzięki czemu pobrane projekty można ponownie otworzyć na innym urządzeniu bez źródła SVG lub biblioteki. Usunięcie wpisu do biblioteki pozostawia istniejące projekty bez zmian. **Wspólny styl** Nosi również niestandardowe wzory ciała, pokrywy i powłoki do innego organizatora. Brakujące pokrywy lub muszle są pomijane, jak w built- w stylach. Zachowaj pobrany projekt jako kopię zapasową.

<a id="choose-an-svg-for-its-intended-use"></a>
### Dobór SVG do zastosowania

An SVG jest formatem rysunku, a nie gwarancją wydrukowanej geometrii. **Import sukcesu oznacza tylko obsługiwane wypełnione zarysy zostały przeczytane.** Wybrana powierzchnia, rozmiar i tryb aplikacji nadal muszą przejść kontrolę geometrii.

| Przewidywane stosowanie | Co się zapełnione obszary | Co przygotować |
| --- | --- | --- |
| Relief organizatora | Podniesiony materiał przymocowany do ściany stałej | Oddzielne motywy i wewnętrzne otwory mogą działać, ponieważ ściana je wspiera. |
| Wzbogacony wzór pokrywy | Materiał podwieszany na podłożu stałym | Dopuszczalne są otwory wewnętrzne; należy zachować cały rysunek wewnątrz dostępnej ramy i z dala od rękojeści lądowania. |
| Pokrywa przez otwory | Materiał usunięty z pokrywy | Każda pozostała część musi być połączona z otaczającą pokrywą. Zamknięte detale wewnętrzne wymagają zszywania mostów. |
| Owinięte powłoki lub panele dekoracyjne | Otwieranie przecinane przez pokrywę | Użyj rysunku kompatybilnego ze stencil-. Pozostała rama i wzór muszą tworzyć podłączony materiał. |

Aby przygotować plik:

1. Zachować zamierzone wypełnione ścieżki lub podstawowe kształty. Przelicz tekst i **pociągnięcia do konturów** w edytorze wektorów. Widoczna linia z `fill="none"` jest udar, a nie wypełniony obszar.
2. Usuń prostokąty tła, chyba że chcesz, aby cały obszar stał się ulgą lub otworem. Kolory SVG nie oddzielają materiałów i białe kształty nie automatycznie usuwać ciemniejsze kształty pod spodem.
3. Sprawdź ścieżki złożone w edytorze wektorowym. Komentarz mówiący "dziura" nie tworzy jednego: ścieżka jest nawijanie i `fill-rule` określić, czy obszar wewnętrzny jest wypełniony.
4. Do otworów można połączyć zamknięte detale wewnętrzne z otaczającym materiałem z mostami. Zwiększenie różnic między powtarzającymi się motywami **nie** załączyć luźny szczegół wewnątrz motywu. Alternatywnie, należy użyć podniesionej ulgi na pokrywie.
5. Preferuj jeden motyw dla trybu powtarzania. Jeśli SVG już zawiera siatkę motywów, jego ustawienie szerokości skaluje **cała siatka** Nie każdy motyw. Małe funkcje mogą stać się zbyt cienkie, aby drukować.
6. Poczekajmy na udaną kontrolę budowy i eksportu, a następnie sprawdźcie podgląd krajalnic. Jeśli budowa nie wypali, scena może zachować ostatni udany model; ten model nie reprezentuje aktualnych nieudanych ustawień.

Na przykład sylwetka liścia litego może działać zarówno jako otwór w kształcie liści, jak i jako otwór w kształcie liści. Liść z całkowicie zamkniętą żyłą może działać jako ulga, ale wycinanie otaczającego go liścia może pozostawić żyłę luźną. Wypełniona siatka sześciokątna może działać jako perforacja, jeśli pozostałe wstęgi pozostają połączone i wystarczająco grube; najpierw musi być przygotowana wielokolorowa ilustracja z pociągnięciami.

<a id="svg-lids-and-perforated-shells"></a>
### Pokrywy SVG i perforowane osłony

Dodaj pokrywę, a następnie wybierz **My SVGs**. **Wzniesiona ulga (dekoracja)** sprawia, że pojedyncza połączona pokrywa z motywem na solidnym podłożu; ustawić jego wysokość ulgi (0.2-1 mm) i kolor podstawowy. **Przez stempel (cięcie)** usuwa wypełniony SVG powierzchnie przez pokrywę. Oba tryby zachowują ramę krawędzi 2 mm i wargę godową. Oddzielny uchwyt utrzymuje stałe lądowanie; przesuwać rysunek, jeśli jeden motyw koliduje z nim. Zewnętrzne i wgłębione urządzenia sterujące muszą być zgodne z tą samą kontrolą. SVG kolory graficzne nie są importowane jako oddzielne włókna.

Dla powłoki, wybierz **My SVGs** Potem rysowanie w bibliotece. Wypełnione obszary stają się przez otwory. Stosować jeden motyw lub powtórzyć po wybranych stronach owiniętego rękawa. On **Panele dekoracyjne**, rysunek jest powtarzany niezależnie na każdym wybranym panelu; istniejące ramy i lokalizacje montowania są zachowane. Początkowy rozmiar motywu uwzględnia wysokość powłoki. Ustaw szerokość ramki, rozmiar motywu, rotację, położenie i odstępy w zależności od potrzeb. Wewnętrzne przedziały organizatora i prześwit powłoki pozostają niezmienione.

Na pokrywach i muszlach, tylko kompletne motywy są umieszczone wewnątrz dostępnej ramki, w tym pojedynczych motywów. Jeśli żaden nie pasuje, zmniejszyć rozmiar lub offsetu. Zamknięte wewnętrzne szczegóły (na przykład środek wycinania pierścienia) mogą stać się luźne wyspy. Dodaj mosty w edytorze wektorowym lub użyj podniesionej dekoracji na pokrywie. Bloki aplikacji odłączone geometrię zamiast cicho wyrzucania elementów. Unikaj bardzo wąskich wstęg i sprawdź mały druk testowy dla materiału i dyszy.

Wzory są zawarte w indywidualnym eksporcie części, kompletnych zestawach i całej szufladzie. Przełączanie z powrotem do **Built-in** usuwa niestandardowy wzór tylko z tego celu. Usuwanie miniatury biblioteki nie usuwa wbudowanych wzorców z projektów.

<a id="download-ready-to-use-stencil-svgs"></a>
### Pobieranie gotowych szablonów SVG

Przykłady te zawierają pełne kontury z materialnymi mostami. Czarne obszary stają się otwory w **Przez stempel (cięcie)** tryb. Zapisz linki poniżej jako `.svg` pliki; jeśli przeglądarka wyświetla rysunek, użyj **Zapisz stronę jako** i zachować `.svg` rozszerzenie.

| Pobieranie | Wzór | Sugerowana szerokość startowa |
| --- | --- | --- |
| [Liście organiczne - pobierz SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Pięć liści z mostami łączącymi wewnętrzne szczegóły | 20 mm; zmniejszyć o niską powłokę |
| [Podwójny sześciokąt - pobierz SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Jedna dachówka dwusześciokątna z czterema mostami i otworem środkowym | 20- 24 mm; stosowanie **Repeat** dla sieci |

**Na pokrywie:** dodać pokrywę pod **Kształt → Pokrywka**, open **My SVGs**, i przesłać każdy plik. Wybierz **Przez stempel (cięcie)**. Zacznij od **Single motif** do kontroli, lub wybrać **Repeat** wypełnić dostępny obszar kompletnymi kopiami. Ustaw szerokość, obrót i przesunięcia X / Y. Powtórzonym odstępem jest przerwa między kompletnymi kopiami, a nie szerokość ich mostów wewnętrznych. Rozstaw na 4 mm. Plik liść jest już grupą pięciu liści: szerokość skaluje całą grupę.

**Na skorupie:** otwarte **Osłona → Wzór → My SVGs** lub wybrać **Osłona** tab w studiu, a następnie wybierz ten sam plik ze współdzielonej biblioteki. Powłoki zawsze są używane przez otwory. Stosowanie **Repeat** dla zespołu otaczającego skorupę; **Dodatkowe → SVG walls** wybiera boki zawiniętej powłoki. Dekoracyjne panele korzystają z wybranych boków paneli. Każda powierzchnia zachowuje własne ustawienia rozmieszczenia i grubości. Przełączanie kart studyjnych pokazuje odpowiednią część.

Jeżeli motyw nie pasuje, należy zmniejszyć jego szerokość lub offset. Na niskiej powłoce, spróbuj 12- 16 mm dla grupy liści. Rosnąca grubość powłoki może powiększyć automatyczną granicę i pozostawić mniej miejsca na rysunek. Skalowanie w dół zawęża również mosty: sprawdź je w krajalnicy i wydrukuj małą próbkę dyszy i materiału. Powtarzające się odstępy nie mogą poszerzać wewnętrznych mostów. Poczekaj, aż bieżący podgląd się skończy, a następnie użyj **Pobieranie** w celu sprawdzenia i wywozu pokrywy lub powłoki.

<a id="numeric-sliders-and-valid-ranges"></a>
### Suwaki liczbowe i dopuszczalne zakresy

Pokaż ustawienia numeryczne **Min** oraz **Max** powyżej cienkiej zielonej ścieżki, z białym markerem dla bieżącej wartości. Czerwona końcówka kapsli oznacza zewnętrzną część dozwolonego przedziału; nie są one wskaźnikiem wytrzymałości na drukowanie. Przeciągnij marker, użyj klawiszy strzałek podczas koncentracji lub wpisz dokładną liczbę i naciśnij Enter. Pole numeryczne i suwak używają tych samych granic. Niektóre ograniczenia zmieniają się z modelem; wartość wewnątrz zakresu suwaka może nadal kolidować z innym ustawieniem, więc przed wywozem postępuj zgodnie z każdym ostrzeżeniem geometrii.

<a id="whole-drawer-export"></a>
## Eksport całej szuflady

Wybierz **DRAWER → Print entire drawer** przygotowanie wszystkich tac, ich akcesoriów i wszelkich włączonych sekcji płyt montażowych. Oprawione tace otrzymują gniazda do swoich zapisanych pozycji; zwykłe tace do wolnych miejsc zachowują swoje istniejące bazy. Projekty drukowania fragmentarycznego obejmują ich części i pinezki. Overlaps, niewystarczające przepustki szuflady, nieobsługiwane montaż lub nieprawidłowa geometria zablokować pobieranie i zidentyfikować dotkniętą tacę.

Ustaw **Printer bed length** (poziomo), **Printer bed width** (pionowe), wysokość druku i odstępy. Początkowe wymiary pochodzą z ustawień płyty montażowej lub obszaru wydruku pierwszej tacki; kolejne ustawienia eksportowe są zapisywane w tej szufladzie. Części płyt montażowych są regenerowane dla wybranego łóżka. Nie przenosi to tac ani nie modyfikuje zapisanych projektów źródłowych.

Układ wykorzystuje faktycznie wywożone bounding boksy, marża 2 mm na krawędziach łóżka i wybrane odstępy. Części mogą obracać się o 90 stopni. Wielokolorowe elementy pokrywy pozostają razem. Wyświetlana liczba łóżek jest dla tego układu, nie gwarantowane minimum. Wspiera, brzeg, wieże czyści, strefy wyłączające drukarkę i różne zadania materiałowe nie są włączone; zarezerwować odpowiednią przestrzeń i sprawdzić wynik w kroju. Brak profilu drukarki lub przydziałów szczeliny żarnika są wbudowane.

W przypadku ZIP zawiera **bed-NN.3mf** dla każdego łóżka, dopasowanie **bed-NN.svg** schematy, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** oraz wykaz części ponumerowanych w **README.txt**. Otwórz każdy 3MF jako oddzielne zadanie drukowania, zachować względne pozycje jego obiektów, używać milimetrów w 100% skali i przypisać włókna. W przypadku SVG diagramy pokazują bounding prostokąty; 3MF zawiera pełną geometrię druku. Współrzędne zespołu ciągnika zawsze wykorzystują długość poziomą i szerokość pionową.

Zmiany w ustawieniach układu lub eksportu unieważniają poprzednią kalkulację. Zamknięcie okna anuluje przygotowanie. Przerośnięte poszczególne części są zgłaszane raczej niż po cichu skalowane lub automatycznie dzielone. Bardzo duże zestawy mogą wymagać eksportu w mniejszych grupach.

<a id="pattern-studio"></a>
### Studio wzorów

Wybierz **Wzniesiona ulga (dekoracja)** lub **Przez stempel (cięcie)** w górnej części ustawień prawej ręki. Powłoki obsługują tylko tryb stencil. Ustawienia pokazują wysokość ulgi tylko dla ulgi, a odstępy tylko dla ponownego umieszczenia. **Grubość materiału** jest edytowalne: 1.2- 6 mm dla SVG pokrywa i 1- 4 mm dla powłoki. Zmienia podgląd i eksport razem. Istniejące domyślne pokrywy pozostają na poziomie 3,2 mm dla zwijaczy i 2 mm dla szyldów; wybrana grubość jest zachowana podczas przełączania trybów. W grubość pokrywy wliczona jest wysokość odprężenia. Inset SVG pokrywa wymaga wewnętrznej głębokości co najmniej grubości płyty plus 2 mm. **Dodatkowe** zawiera kolor pokrywy lub wybór ściany powłoki. Otwórz **Które pliki SVG działają?** w odniesieniu do limitów przywozu i porad dotyczących przygotowania.

Otwórz **Kształt → Pokrywka → My SVGs** lub **Osłona → Wzór → My SVGs** do edycji wzorów akcesoriów w dolnej szufladzie. **Pokrywka** oraz **Osłona** tab zachować niezależne ustawienia podczas udostępniania SVG Biblioteka. Przełączanie kart automatycznie izoluje tę część w podglądzie. Jeżeli nie jest jeszcze dodawany, zespół pozostaje widoczny aż do momentu utworzenia części. Możesz jeszcze ręcznie wybrać Montaż nad modelem. Użyj szerokości, rotacji, interwału i sterowania X / Y do pozycji motywów; środkowy przycisk resetuje pozycję i rotację. Pokrywa podtrzymuje podniesioną ulgę lub poprzez otwory. Otwory powłoki zachowują ramę i obszary montażowe. Zamknij za pomocą × lub Escape podczas skupienia w studio; edycje pozostają zapisane. Klawisze strzałek przełączać skupiony powierzchnia karta.
