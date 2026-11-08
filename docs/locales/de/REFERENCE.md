<a id="replixgrid-user-guide"></a>
# ReplixGrid-Benutzerhandbuch

Einen Organizer in Millimetern entwerfen, seine Passform überprüfen und die Teile für Ihren Slicer herunterladen. Für einen ersten Build folgen Sie dem dargestellten Kapselbeispiel. Verwenden Sie diese Referenz, wenn Sie einen bestimmten Teil Ihres Designs ändern möchten.

[ReplixGrid öffnen](https://grid.replixcast.com/?lang=de) · [Schnellstart](USER-GUIDE.md) · [Lokale Installation](../../../README.md#local-installation)

| Ich möchte... | Gehen Sie zu |
| --- | --- |
| Wählen Sie eine Wand, drehen Sie das Modell oder machen Sie eine Änderung rückgängig | [Arbeitsbereich und Ansichten](#workspace-and-views) |
| Wählen Sie eine Form, ändern Sie die Abmessungen oder lehnen Sie die Wände nach vorne | [Form und Abmessungen](#shape-and-dimensions) |
| Setzen Sie ein Objekt in ein Fach oder bewegen Sie einen Teiler | [Fächer und Trennwände](#compartments-and-dividers) |
| Senken Sie eine Wand, formen Sie ihren Rand oder schneiden Sie eine Fingeröffnung | [Wandhöhen und Ausschnitte](#wall-heights-and-cutouts) |
| Weichen Sie einen Rand, fügen Sie Textur hinzu oder geben Sie einen Namen auf den Körper | [Ecken, Kanten und Gestaltung](#corners-edges-and-decoration) |
| Fügen Sie eine abnehmbare Tasse hinzu, stapeln Sie Schalen oder passen Sie einen Deckel an | [Einsätze, Ebenen und Deckel](#inserts-tiers-and-lids) |
| Drucken Sie eine dekorative Abdeckung für die Außenseite | [Umlaufende Hüllen und Einzelpaneele](#sleeves-and-panels) |
| Öffnen Sie ein Design oder verschieben Sie es auf einen anderen Computer | [Projekte und Sicherungskopien](#projects-and-backups) |
| Wählen Sie einen Drucker, teilen Sie ein großes Modell oder weisen Sie ein Filament zu | [Druckeinstellungen und Aufteilung](#print-setup-and-sectioning) · [Herunterladen und im Slicer vorbereiten](#download-and-slice) |
| Behalten Sie alternative Designs bei oder verwenden Sie Farben und Muster wieder | [Projektvarianten](#project-variants) · [Gemeinsame Stile](#shared-styles) |
| Organisatoren in einer vermessenen Schublade anordnen oder an einer Platte befestigen | [Organizer in Schubladen anordnen](#drawer-arrangements) · [Montageplatten](#mounting-plates) |
| Importieren Sie Kunstwerke für Wände, Deckel oder eine perforierte Schale | [Eigenes SVG-Relief](#custom-svg-relief) · [Musterstudio](#pattern-studio) |
| Laden Sie alle für den Drucker angeordneten Schubladenteile herunter | [Die gesamte Schublade exportieren](#whole-drawer-export) |
| Finden Sie heraus, warum ein Steuerelement oder Download nicht verfügbar ist | [Problemlösung](#troubleshooting) |

<a id="start-a-new-project"></a>
## Ein neues Projekt beginnen

Beim ersten Start ist die Arbeitsfläche leer. Der Assistent links führt durch drei Schritte: **Form auswählen → Maße festlegen → Fächer hinzufügen**. Wählen Sie eine Form, stellen Sie die Maße ein und klicken Sie auf **Weiter: Fächer**. Schließen Sie mit **Fertig** oder **Ohne Trennwände lassen** ab. Nach der Formauswahl können Sie den Assistenten mit **×** schließen. Alternativ öffnen Sie ein gespeichertes Projekt oder eine JSON-Datei.

Öffnen Sie den Assistenten erneut über **Hilfe → Assistent: drei Schritte**. Das Öffnen verändert das Modell nicht. Die Auswahl einer anderen Form ersetzt das aktuelle Modell und lässt sich rückgängig machen.

Schnellstart, Benutzerhandbuch und Hilfemenü verwenden die gewählte Oberflächensprache. Das Video ist weiterhin auf Englisch.

Alle Schritte, Hinweise und Speicherbestätigungen im Assistenten sind übersetzt. Die gespeicherte Arbeit erscheint unter **Vorheriges Projekt**. Die tatsächlichen Namen unter **Meine Projekte** bleiben unverändert.

Verwenden Sie **Neues Projekt** in der oberen Leiste, um zu diesem sauberen Start zurückzukehren. Ihre aktuelle Arbeit wird zuerst gespeichert; ein unbenannter Entwurf wird in **Meine Projekte** beibehalten. Bestehende Projekte, Varianten, Filamentschlitze und Druckerkonfiguration werden nicht gelöscht. Das Panel zeigt eine Miniaturansicht mit der Aufschrift **Vorheriges Projekt** mit **Unter „Meine Projekte“ gespeichert** gespeichert; klicken Sie auf diese Zeile, um Ihre Bibliothek wieder zu öffnen. Die Leinwand wird sofort gelöscht und bleibt leer, bis Sie eine neue Form auswählen, genau wie bei einem ersten Besuch. Bis Sie eine neue Form auswählen, sind Speichern und Exportieren deaktiviert. Sie können stattdessen ein Projekt aus **Meine Projekte** öffnen oder seine JSON-Datei importieren. Wenn Sie diesen Leerstart-Tab öffnen, bleibt der Startbildschirm erhalten; Wenn Sie ein bestehendes Projekt wieder öffnen, wird das Modell wieder hergestellt. Normale Rückkehrbesuche setzen die gespeicherte Arbeit wieder fort.

Auswahl **Form → Basis → Aus Vorlage erstellen** Während der Bearbeitung ersetzt immer noch die Konstruktion innerhalb des aktuellen Projekts und kann rückgängig gemacht werden. Verwendung **Neues Projekt** Wenn Sie ein separates Modell wünschen.

<a id="workspace-and-views"></a>
## Arbeitsbereich und Ansichten

Öffnen Sie ein Werkzeug oben links. **Form** verändert den Körper und sein Zubehör. **Fächer** ändert das Layout. **Hülle** entwirft eine separate äußere Abdeckung. **Drucken** stellt das Bauvolumen, die Filamentschlitze und optionale Schnitte ein. Klicken Sie auf eine Fachnummer, Wand oder Trennwand am Modell, um die Einstellungen rechts zu öffnen. Wenn ein Teil schwer zu klicken ist, erweitern Sie **Alle Wände und Fächer** und wählen Sie es nach Namen aus.

Das linke Feld ist Sektionsnavigation. Wählen Sie einen Abschnitt, um nur seine Einstellungen im zentrierten, schwebenden Editor am Ende der Vorschau zu öffnen. Die Szene und das Raster setzen sich hinter dem Editor fort; das Öffnen schneidet die Vorschau nicht ab. Der Editor verwendet kompakte Gruppen; es ersetzt nicht das linke Menü. Sein Chevron bricht den Editor zusammen und **×** schließt ihn. Wählen Sie einen anderen Abschnitt auf der linken Seite, um die Einstellungen zu ändern. Das rechte Feld bleibt der ausgewählten Wand oder dem ausgewählten Fach gewidmet.

Ziehen Sie den Hintergrund zum Drehen, scrollen Sie zum Zoom und ziehen Sie mit der rechten Maustaste zum Schwenken. **Kamera zurückgeben** stellt das Framing der Kamera wieder her. **Oben** hilft Ihnen, ein schmales Fach auszuwählen oder einen Trenner zu bewegen. **3D** zeigt Wandhöhen und die fertige Montage. **Netz** schaltet das Bezugsraster mit feinen Linien alle 10 mm und Hauptlinien alle 50 mm um. Verwenden Sie die Teiltasten, die über dem Modell zentriert sind, um den Organisator, die Einsätze, die Schale oder den Deckel zu isolieren, wenn sie vorhanden sind. **Zusammen** zeigt die verfügbaren Teile zusammen für die aktuelle Ansicht. Für mehrere Ebenen wählen Sie **Stapel anzeigen** im Dropdown neben **Organizer** um den gesamten Stapel zu zeigen; wählen **Ebene 1**, **Ebene 2** oder eine andere Stufe, um zu dieser Stufe zurückzukehren. Der untere Einstellungseditor bleibt geöffnet. in Stapelansicht, **Hülle** und **Einsätze** Teile aus allen Ebenen enthalten. Bei schmaleren Fenstern bewegen sich diese Tasten in ihre eigene Reihe unterhalb der Symbolleisten. Mit dem Deckel isoliert, wählen **Boden** um seine Unterseite zu untersuchen. Presse **Esc** das Werkzeugfeld zu schließen. Verwenden Sie die gebogenen Pfeile über dem Modell, um eine Designänderung rückgängig zu machen oder zu wiederholen.

Wählen Sie in der oberen Leiste eine Schnittstellensprache aus oder wechseln Sie zwischen hellem, dunklem und systemischem Erscheinungsbild.

<a id="shape-and-dimensions"></a>
## Form und Abmessungen

Wählen Sie unter **Form → Basis** ein Basis- und Höhenprofil, klicken Sie dann auf **Aus Vorlage erstellen**. Der Button ersetzt die aktuelle Konstruktion. Speichern Sie zuerst eine benannte Kopie, wenn Sie beide Designs beibehalten möchten. **Einfache Leerzeichen** bietet auch einen leeren Körper und einen Vier-Fach-Startpunkt.

| Basis | Wann man es wählt |
| --- | --- |
| abgerundet | Eine rechteckige Grundfläche mit verstellbaren Außenecken. |
| Kapsel | Ein langer Körper mit halbkreisförmigen Enden Die geneigte Schablone trägt die Steigung durch beide gekrümmten Enden. |
| Kreis | Ein runder Organisator, der nach Durchmesser bemessen ist. |
| Oval | Ein länglicher gekrümmter Umriss mit separat einstellbarer Breite und Tiefe. |
| Wabenkörper | Eine Gruppe von hexagonalen Zellen, die Wände teilen. Wählen Sie eine Zelle, um ihre Höhe anzupassen. |

Wählen Sie **Flat** für einen ebenen Rand, **Ansteigend** für einen kontinuierlichen Anstieg oder **Stufen** für unterschiedliche Höhenniveaus. Die Abmessungen unterhalb der Auswahlmöglichkeiten beschreiben die Vorlage, die Sie erstellen möchten. Einmal erstellt, bearbeiten Sie das Modell unter **Abmessungen**. Breite und Tiefe messen den Außenabdruck. Verwenden Sie die Innenabmessungen des ausgewählten Fachs, wenn Sie es für ein Objekt dimensionieren. Überprüfen Sie auf einer gekrümmten Basis auch die sich verengenden Enden in **Oben** Ansicht.

![Schräge Kapsel mit einem unteren Ende für den Zugang, einem hohen Ende für lange Gegenstände und zwei Querteilern](../../images/capsule-sloped.jpg)

**Form → Zusätzlich** enthält Wand- und Bodendicke. Dickere Wände nehmen Raum von den Fächern. **Auf einer flachen Unterlage kippbar** neigt die Wände um bis zu 25° nach vorne, während der Boden horizontal bleibt. Dies unterscheidet sich von einem geneigten Rand, der die Wandhöhe entlang des Körpers verändert. Wenn die Neigung aktiviert ist, verwenden Sie die fertigen Abmessungen im Download-Dialog, um den Raum zu überprüfen, den das gedruckte Teil einnehmen wird.

<a id="exact-internal-dimensions"></a>
## Exakte Innenmaße

Wählen Sie ein Kompartiment aus und verwenden Sie **Innenmaße** im rechten Bereich oder klicken Sie auf die blaue Dimension direkt auf dem Modell. Wählen Sie Breite oder Tiefe, geben Sie Millimeter ein und klicken Sie außerhalb des Inline-Feldes, um zu gelten. Geben Sie auch zu; Escape annulliert. Das rechte Feld behält seine Schaltfläche Anwenden. Ungültige Werte können das Modell nicht ändern. Jede engagierte Bearbeitung kann in einem Schritt rückgängig gemacht werden.

Der orangefarbene Trenner ist seine aktuelle Position; die gestrichelte blaue Linie zeigt die neue Position an. Der nächstliegende umschließende Trenner auf der gewählten Achse bewegt sich, wobei die äußere Körpergröße und Wandstärke unverändert bleiben. Das Panel zeigt die betroffenen Nachbargrößen. Wenn es keinen Trenner auf dieser Achse gibt, passen Sie die Gesamtabmessungen an oder teilen Sie das Fach zuerst.

Beginnen Sie in einer einfachen Zeile mit dem Fach 1 und fahren Sie in der Reihenfolge fort; das letzte Fach nimmt den Rest. Die benachbarten Abmessungen sind nicht verriegelt, so dass die Bearbeitung eines früheren Fachs die Größe eines späteren ändern kann.

Abgerundete Ecken, Kapselkonturen, Abschrägungen und innere Filets bleiben unterstützt. Die blaue Linie misst die tatsächliche innere Spannweite an der Fächermittellinie, knapp über dem Boden. Der Raum kann sich an anderer Stelle um Kurven verengen: Freiraum hinzufügen und den gesamten Objektabdruck überprüfen. Kreis-, Oval-, Waben- und geneigte Wände unterstützen derzeit keine exakte Fächerbearbeitung.

Wähle eine Wand oder einen Trenner, um seine Höhe direkt am Modell zu bearbeiten. Flache Wände zeigen einen Wert; Zwei-Punkt-Profile zeigen A/B-Werte. Linked-Height- und Stepp-Wand-Regeln passen zum rechten Panel. Diese Etiketten bearbeiten Höhe, nicht Wandlänge oder globale Dicke.

<a id="compartments-and-dividers"></a>
## Fächer und Trennwände

Für ein schnelles Layout verwenden Sie **Fächer → + Fach**, um das größte Kompartiment zu teilen. **− Fach** verschmilzt ein benachbartes Paar. In einer Wabe fügen diese Steuerelemente eine Außenzelle hinzu oder entfernen sie und bewahren die Größe der anderen. Zwei benachbarte Wabenzellen teilen sich eine Wand, die so hoch ist wie die größere Zelle.

Für ein genaues Layout wechseln Sie zu **Oben** und wählen das Fach, das Sie teilen möchten. Wählen Sie **Anzahl der Teile**, dann **Teilung in der Breite**, um die Breite in schmalere Fächer zu teilen, oder **Untergliederung in die Tiefe**, um flachere Fächer zu machen. Sie können eines der Ergebnisse erneut aufteilen. Für einen Bleistiftschacht neben zwei kleinen Schalen teilen Sie zuerst die Breite in zwei, dann teilen Sie nur die Schalenseite in der Tiefe.

![Beispiel in Draufsicht mit einem Tiefenschacht und zwei kleineren Fächern](../../images/compartment-splits.svg)

Wählen Sie den Teiler, um ihn zu ziehen, oder stellen Sie **Erstes Fach** unter **Partitionsposition** ein. Nur der ausgewählte Teiler bewegt sich; andere Teilerpositionen bleiben fixiert. Die benachbarten Fächer ändern sich in ihrer Größe. Bewegungen, die zu wenig Platz lassen, werden abgelehnt. Überprüfen Sie die neuen Innenabmessungen auf jeder Seite. **Partition entfernen** kombiniert die Fächer und kann auch Teiler entfernen, die sich in dieser Teilung befinden. Überprüfen Sie die hervorgehobene Auswahl und die Bestätigung, bevor Sie sie entfernen.

<a id="wall-heights-and-cutouts"></a>
## Wandhöhen und Ausschnitte

Wählen Sie eine Außenwand oder einen Trennwand. **Eine Höhe** setzt eine Ebene oben. **Zwei Punkte** können Sie die Höhen an den Enden **A** und **B** einstellen, die auf dem Modell markiert sind. Wählen Sie **Direkt**, **Wellig** oder **Zickzack**, um den Rand entlang der Wand zu formen. Die Wellenlänge steuert den Abstand zwischen den Wiederholungen. In einer Stufenvorlage passt die Auswahl eines Schritts seine Höhe zusammen mit der verbundenen Wand und dem Trennwand an.

Verwenden Sie **Verbinden Sie die Höhen benachbarter Wände**, damit eine Außenwand ihren Nachbarn folgt. Für einen Trenner kopiert **An angrenzende Wände anpassen** die beiden Endhöhen einmal. Wiederholen Sie die Passform, nachdem Sie die benachbarten Wände gewechselt haben. **Wie die anderen** gibt die ausgewählte Wand die gemeinsame Höhe zurück.

Öffne **Wandausschnitt**, um eine Greiföffnung zu machen. Wählen Sie eine glatte Schaufel, einen Halbkreis oder eine rechteckige Öffnung, stellen Sie die Breite und Tiefe ein und verschieben Sie sie entlang der Wand. Die Position verläuft von Ende A nach B. Die Tiefe wird von der oberen Kante nach unten gemessen. Inspizieren Sie die verbleibende Lippe über dem Boden. Wählen Sie **Kein Ausschnitt**, um die Öffnung zu füllen. Die Wabe verwendet stattdessen die Zellenhöhe. Stufenkreise und Ovale unterstützen keine Aussparungen in den Außenwänden.

<a id="corners-edges-and-decoration"></a>
## Ecken, Kanten und Gestaltung

Open **Form → Ecken und Fasen**. Drei Bedienelemente beeinflussen verschiedene Teile des Drucks.

| Kontrolle | Wohin zu schauen | Was es verändert |
| --- | --- | --- |
| Außenecken | Draufsicht, äußerer Umriss | Um die Ecken der Grundfläche herum oder bei 45° schneiden. Null ergibt eine quadratische Ecke. Verfügbar auf der rechteckigen Basenfamilie. |
| Radius innerhalb der Fächer | Draufsicht, innerhalb einer Bucht | Rundet den vertikalen Knotenpunkt, an dem sich zwei Wände treffen. Enge Abschnitte begrenzen den verfügbaren Radius. |
| Oberkante von Wänden und Trennwänden | Querschnitt durch eine Wand | **Fase** schneidet eine flache Abschrägung und **Abgerundet** krümmt die Lippe. Beide Seiten der Außenwände und Trennwände erhalten das Finish. **Keine** stellt die quadratische Lippe wieder her. |

![Wandquerschnitte mit quadratischen, abgeschrägten und abgerundeten oberen Ecken bei gleicher Wandstärke](../../images/top-edge-profiles.svg)

Zum Beispiel, auf einer 2 mm Wand versuchen Sie eine 0,5 mm Fase. Jede Seite verliert 0,5 mm ganz oben, so dass ein 1 mm flacher Streifen bleibt. Die maximale angezeigte Größe hängt von der Wandstärke ab. Bei **Abgerundet** ist der Wert der Radius in Millimetern.

- **Organizerfarbe** ändert die Vorschau und den farbfähigen Export. Wählen Sie eine Farbtafel, eine benutzerdefinierte Farbe oder eine konfigurierte Filamentfarbe. Weisen Sie den tatsächlichen Filamentschlitz beim Export zu.
- **Unterer Zierrand** fügt ein hervorstehendes Band um die Basis hinzu. Wählen Sie glatte, gestreifte oder gestufte Verkleidung und stellen Sie ihre Höhe ein. Eine kompatible Hülle kann darauf aufliegen. Verkleidung erfordert einen gebogenen, einteiligen Körper und ist auf der ersten Etage erhältlich. Separate Paneele sitzen darüber mit dem ausgewählten Kantenversatz.
- **Oberflächenrelief** fügt ein erhöhtes Muster direkt an die Außenwand hinzu. Scrollen Sie den Musterkatalog, stellen Sie die Mustergröße und die Reliefhöhe ein und beobachten Sie die Modellaktualisierung während des Ziehens, während jede Berechnung abgeschlossen ist. Der endgültige Wert verwendet volle Präzision. Das Innere bleibt glatt. Die Projektionen erhöhen die Außenmaße. Wählen Sie **Glatt**, um das Relief zu entfernen.
- **Unterschrift und Abzeichen** legt Schriftzug oder ein Symbol auf eine ausgewählte Seite. Geben Sie den Text ein, wählen Sie eine Schriftart, legen Sie die Buchstabenhöhe und die vertikale Position fest, wählen Sie dann den erhabenen Schriftzug oder die Gravur und legen Sie die Höhe oder Tiefe fest. Ein Stern oder Herz kann den Text begleiten. Auf kreisförmigen und ovalen Organisatoren folgen Text und Icons der gebogenen Wand, auch in STL und 3MF Ausfuhren. Der Buchstabenabstand wird entlang der Oberfläche gemessen. Wählen Sie Front, Rear, Left oder Right, um die Inschrift auf dieser Seite zu zentrieren. Auf Kreisen und Ovalen mit verbundenen oder variierenden Wandhöhen bleibt der Schriftzug unterhalb des untersten Wandprofils und -ausschnitts. Wabenbeschriftung wird noch nicht unterstützt; Schalen, die die gewählte Seite und das Relief bedecken, können auch die Beschriftung verhindern. Flat-Wand-Schriftzug erfordert immer noch ein konstantes Höhenprofil. Wenn die Inschrift in einen Ausschnitt läuft oder das verfügbare Gesicht übersteigt, senken Sie die Position oder reduzieren Sie die Buchstabengröße.

<a id="inserts-tiers-and-lids"></a>
## Einsätze, Ebenen und Deckel

**Abnehmbare Einsätze.** Wählen Sie ein Fach, dann erweitern Sie **Facheinsatz** rechts. **Leer** macht einen offenen Becher. **Für kleine Dinge** fügt ein Raster mit verstellbaren Reihen und Spalten hinzu. **Für Griffe** schafft Steckdosen für Stifte oder Werkzeuge. Stellen Sie den Innendurchmesser des Steckdosens ein und die App passt so viele wie der Einsatz erlaubt. Wählen Sie einen passenden, gerundeten, kreisförmigen, ovalen oder sechseckigen Umriss und eine Farbe. **Einsatz entfernen** löscht diese Bucht. Ein leerer Becher ist immer noch ein druckbares Teil.

Der Einsatz folgt seinem Fach mit mindestens 0,5 mm Abstand. Seine Wände und sein Boden sind 1,2 mm dick und seine Höhe stellt sich so ein, dass sie etwa 1 mm unter dem Rand enden. Ein Einsatz in einem geneigten Organisator kommt entlang der Steigung heraus. Isolieren Sie **Einsätze** um sie zu inspizieren, dann exportieren Sie **Organizer und Zubehör**. Einsätze erfordern einen einteiligen Druck.

**Gestapelte Schalen.** Beginnen Sie mit einem ebenen Rand, dann öffnen Sie **Form → Ebenen → + Stufe**. Sie können zwei bis fünf Ebenen verwenden; **− Stufe** entfernt eine Ebene. Ebenen teilen sich einen Fußabdruck, können jedoch unterschiedliche Fächer, Höhen, Farben und Dekorationen haben.

1. Wählen Sie im Dropdown neben **Organizer** über dem Modell **Ebene 1**, **Ebene 2** oder eine andere Ebene. Diese Ebene wird eigenständig angezeigt und der Editor für aktuelle Einstellungen bleibt geöffnet.
2. Bearbeiten Sie die ausgewählte Ebene mit den üblichen Formen-, Kompartiment-, Relief- und Shell-Bedienelementen; das Ändern der Ebene kopiert die Einstellungen nicht in andere Ebenen.
3. Wählen Sie **Stapel anzeigen** im selben Dropdown, um alle Ebenen und Zubehör zusammen zu inspizieren. Verwenden Sie **Zusammen**, **Organizer**, **Einsätze**, **Hülle** oder **Deckel**, um die benötigten Teile anzuzeigen. Kehren Sie zu einer nummerierten Ebene zurück, um sie weiter zu bearbeiten.
4. Unter **Form → Ebenen** passen Sie die **Passspiel** an und drucken ein kleines passendes Muster, bevor Sie sich auf den vollen Stapel festlegen. Untere Trennwände, die über dem Rand stehen. Stapeln erfordert aufrecht stehende Wände und einen durchgehenden Stützrand.

Eingebautes und SVG-Relief schmücken das Äußere jeder Ebene, während die passenden Kragen, Zungen und Steckdosen glatt bleiben. Umhüllte Schalen und dekorative Paneele können einzelne Ebenen abdecken. Bei Paneelen halten Sie den **Kantenversatz** mindestens 3 mm, damit sie die passenden Kragen freigeben.

Bei gewickelter Schale passt eine Zunge innerhalb der unteren Wand in eine Muffe unterhalb des Bodens der oberen Schale. Die Breiten, Tiefen und nutzbaren Höhen der Kammern bleiben unverändert. Jede Muffe erhöht die Außenhöhe des zusammengebauten Stapels um 2,2 mm. Passende Muscheln treffen sich in einem schmalen Stützband von 0,8 mm. Die Muscheln gleiten von oben auf; trennen die Etagen, bevor sie entfernt werden. Jede Schale wird als separates, nummeriertes Teil exportiert.

**Unterer Zierrand** ist nur auf der ersten (untersten) Ebene verfügbar: wählen Sie glatt, Ringe oder Stufen. Mit einer kompatiblen gewickelten Schale unterstützt die Verkleidung auch die Schale. Separate Paneele sitzen über der Verkleidung mit dem ausgewählten Kantenversatz. Neue obere Ebenen erben die Verkleidung nicht. Wenn die Zunge nicht in die Wandstärke passt, verringern Sie den **Passspiel**; die Anwendung verdickt die Wand nicht automatisch. Ein Wandausschnitt muss in der Nähe beider Ecken genug Material hinterlassen, um das Tablett darüber zu stützen.

**Lid.** In **Form → Deckel** klicken Sie auf **+ Abdeckung**. Verwenden Sie einen ebenen oberen Rand mit gleichen Außenwandhöhen und Trennwänden an oder darunter. Kippen, Waben- und Schnittdrucken verhindern diesen Sitz. Wählen Sie **Außenliegend** für eine Außenkappe oder **Innenliegend** für eine 2 mm Platte, die bündig in der Schale sitzt. Die Einsetzoption schneidet einen Sitz in der oberen Wand mit 0,35 mm Abstand auf jeder Seite und lässt Raum über Trennwänden und Einsätzen. Es braucht mindestens 2 mm Wandstärke und 4 mm Innentiefe. Fügen Sie einen Wandausschnitt oder einen Griff hinzu, um ihn anzuheben. Der überlappende Deckel hat einen Positionsrand mit 0,5 mm Abstand. Wählen Sie sein oberes Muster, Maßstab und Tiefe, dann legen Sie die Randhöhe und das Finish ein. Wählen Sie für einen Griff Zylinder oder Stange, stellen Sie seine Größe und Höhe ein und stellen Sie seine Ränder wahlweise ab und schneidet oder rundet seine Ränder ab. Der Griff druckt separat und klebt am Deckel an. Die Vorschau hebt den überlappenden Deckel an und zeigt den aufgesetzten Deckel. Der exportierte Deckel liegt flach zum Drucken.

**Zweitonmuster.** Aktivieren Sie es bei beiden Deckeln, dann wählen Sie Olive Branch, Ginkgo Leaves, Farn Frond, Tidal Waves, River Kieselsteine Growth Rings oder Voronoi Zellen. Wählen Sie eine Grundfarbe und eine Musterfarbe. Die 3,2 mm Platte hat eine solide 1,6 mm Rückseite und eine 1,6 mm gemusterte Fläche. Der äußere Rand und der optionale Griff erhöhen die Gesamthöhe. Bei einem eingeführten Deckel erlauben Sie mindestens 5,2 mm Innentiefe. Exportieren Sie in 3MF, um beide Farben als einen Deckel zusammenzuhalten, und weisen Sie die beiden Teile Ihren Filamentschlitzen zu. Bei einem Olive Branch, Ginkgo Leaves, Farn Frond, Tidal Waves und Growth Rings, **Durchbrochenes Muster** macht das Motiv aus Öffnungen in einem durchgehenden oberen Blatt. Kombinieren Sie es mit **Erhabenes Muster**, um den vertieften Rücken durch die Öffnungen freizulegen. Aktivieren Sie **Erhabenes Muster**, um die Öffnungen in den oberen 1,6 mm leer zu lassen. Deaktivieren Sie es für ein glattes Inlay.

![Sechs zweifarbige Deckelmuster](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Umlaufende Hüllen und Einzelpaneele

Öffnen Sie **Hülle** und wählen Sie ein Muster. Eine Shell wird separat vom Organisator gedruckt. Wenn Sie das Muster auf dem Körper selbst haben möchten, verwenden Sie **Form → Oberflächenrelief**.

| Shell-Modus | Passung und Montage |
| --- | --- |
| **Um den Körper herum** | Eine bodenlose Hülse folgt der Umfangs- und Wandhöhe und wird von oben in Wandrichtung auf einem gekippten Modell über den Körper geschoben. Die Platte zeigt an, ob eine Stützleiste vorhanden ist oder die Hülse auf dem Tisch aufliegt. |
| **Dekorplatten** | Separate gerahmte Paneele bedecken ausgewählte Seiten und lassen die Ecken frei. Wähle die Seiten und passe an **Kantenversatz**. Leimplatten ohne Befestigungen. Drücken Sie mit versteckten Stiften jedes Paneel direkt auf seine passende Wand für eine dauerhafte Befestigung. |

![Draufsicht auf eine Hülse, die die Ecken umhüllt, und separate Paneele, die vor jeder Ecke enden](../../images/shell-fit.svg)

Wählen Sie das Muster, stellen Sie seine Größe ein und stellen Sie **Schalendicke** ein. Für eine einteilige Hülle passen Sie **Randbreite** für ihren festen Rahmen an. Dekorative Paneele haben einen festen Rahmen; verwenden Sie **Kantenversatz**, um sie an der Wand zu positionieren. Unter **Landung** legt **Freiraum auf jeder Seite** den Abstand zwischen Hülle und Organisator fest. Ein Abstand von 0,5 mm auf jeder Seite fügt 1 mm über zwei gegenüberliegende Seiten hinzu, bevor Sie die Hülle zählen. Vergleichen Sie **Zusammen** mit der isolierten **Hülle** Ansicht, um das Ergebnis zu beurteilen. **Download Shell** exportiert den Deckel separat und **Schale entfernen** entfernt es aus dem Design.

Paneele erfordern einen kompatiblen rechteckigen Sockel. Der Wechsel zu Paneelen erhält Wandstärke und Fachraum. Versteckte Montagebuchsen erfordern Wände mit einer Wandstärke von mindestens 3,2 mm ohne Relief. Bei dünneren Wänden, einschließlich 2,4 mm, sind Paneele ohne Befestigungselemente zu verwenden und an Ort und Stelle zu verkleben. Die Wandstärke wird nie automatisch angehoben. Der Randversatz des Paneels steuert den Rand auf der Vorderseite, während der Abstand der Hülse den Schiebesitz steuert. Bei der unteren Verkleidung beginnt der untere Versatz an der Oberseite der Verkleidung; die Paneelbefestigungen und -buchsen folgen dem gleichen Profil. Die Ebenen benötigen einen Randversatz von mindestens 3 mm, um ihre passenden Kragen freizugeben.

<a id="projects-and-backups"></a>
## Projekte und Sicherungskopien

Verwendung **Meine Projekte → Kopie speichern** um ein Design zu benennen oder eine Variante vor dem Experimentieren zu machen. Das offene Projekt wird automatisch in diesem Browser gespeichert. Mit der Bibliothek können Sie ein Projekt suchen, öffnen, umbenennen, löschen oder herunterladen. **Projekt speichern** in der oberen Leiste ein editable herunterladen JSON Backup. Verwendung **Öffnen** diese Datei zu laden, auch auf einem anderen Computer oder in einer lokalen Installation.

Verpflichtete Bearbeitungen werden sofort gespeichert. Eine temporäre lokale Wiederherstellungskopie schützt Änderungen, während die Browserdatenbank gespeichert wird; das Wiedereröffnen stellt diese Kopie wieder her, wenn ein Schreibvorgang unterbrochen wurde. Ein separater, zuletzt erfolgreicher Snapshot kann eine beschädigte aktuelle Sitzung wiederherstellen, einschließlich des Rückgängigmachens der Historie. Wenn keine gültige Kopie wiederhergestellt werden kann, stoppt das automatische Speichern, anstatt das gespeicherte Projekt durch ein Startermodell zu ersetzen. Herunterladbare JSON-Backups aufbewahren: Löschen von Browserdaten oder Ausfall beider Speichermechanismen können nicht automatisch wiederhergestellt werden.

Exportprüfungen gehören zur aktuellen Projektrevision, ausgewählten Teilen und Montageposition. Durch deren Änderung wird die vorherige Überprüfung ungültig; ein altes Ergebnis kann nicht als neues Modell heruntergeladen werden. Fehlberechnungen behalten Bearbeitungen bei. Eine stagnierende Vorschau meldet einen Fehler nach zwei Minuten; die nächste Geometriebearbeitung startet eine neue Berechnung.

Wenn das gleiche Projekt oder die gleiche Schublade in mehreren Registerkarten bearbeitet wird, werden widersprüchliche Änderungen als separater Speicher gespeichert. **Copy from another tab**. Die andere Version wird beibehalten, und die Registerkarte zum Bearbeiten wird mit ihrer Kopie fortgesetzt. Vergleichen Sie die Versionen in **Meine Projekte** oder den Schubladen-Selektor und benennen Sie die Kopie um, wenn Sie sie behalten möchten. Durch das erneute Öffnen eines Organisator-Tabs wird das eigene gespeicherte Projekt wiederhergestellt. Änderungen werden nicht automatisch zwischen Tabs zusammengeführt.

Bewahren Sie ein heruntergeladenes Backup auf, bevor Sie Browserdaten löschen. Jeder Browser und jede Site-Adresse hat eine eigene Bibliothek. Filament-Slots werden separat für den Drucker im Browser gespeichert. Stellen Sie sie beim Wechsel zu einem anderen Gerät wieder ein. Für die herunterladbare lokale App siehe [Lokale Installation](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Druckeinstellungen und Aufteilung

Unter **Drucken** wählen Sie Ihre Drucker- und Kopfkonfiguration oder wählen Sie **Eigene Größe**. Überprüfen Sie die Buildbreite, Tiefe und Höhe. Die Voreinstellung liefert das Buildvolumen. Wählen Sie den Drucker, die Düse, das Material und die Schnittprofile in Ihrem Slicer.

Für ein Modell, das das Bett übersteigt, verwenden Sie die vorgeschlagenen Schnitte oder wählen Sie zwei oder drei Abschnitte, wenn verfügbar. Lesen Sie die vorgeschlagenen Nahtpositionen und verwenden Sie **Teile auseinanderziehen** um zu sehen, wie sich die Abschnitte treffen. Durch Splitting wird die Wandstärke auf mindestens 5 mm und die Bodenstärke auf mindestens 3 mm erhöht. Überprüfen Sie die Innenabmessungen erneut. Entfernen Sie Schalen und Einsätze vor dem Spalten. Gestapelte Tabletts, gekippte Modelle und die Kreis-, Oval- und Wabenbasis erfordern einen einteiligen Druck. **Als Ganzes drucken** schaltet die Sektionierung ab. Überprüfen Sie die Dicke erneut, wenn Sie frühere Abmessungen wiederherstellen möchten.

**Gemeinsame Probe** lädt Steckdosen herunter, um die gleichen Maßstäbe und Druckeinstellungen wie der endgültige Körper zu verwenden. Legen Sie sie separat mit ihren Basen nach unten. Nach dem Abkühlen passen die nominalen Ø 3,2 × 8 mm Stifte in Ø 3,3 mm Löcher, 4,5 mm tief auf jeder Seite der Naht. Überprüfen Sie die Ausrichtung, verwenden Sie dann Stifte und Kleber, um die gedruckten Abschnitte zusammenzusetzen. Verwenden Sie **Downloaden Sie alle Teile** für den geschnittenen Organisator selbst herunter.

<a id="download-and-slice"></a>
## Herunterladen und im Slicer vorbereiten

1. In **Drucken** konfigurieren Sie Filament-Slots, wenn Sie eine mehrfarbige Datei wünschen. Passen Sie die Slotnummern und Farben Ihrem Slicer an. Auf einem Snapmaker U1 entsprechen die Slotnummern 1-4 T0–T3. Fügen Sie bis zu 16 Slots hinzu, legen Sie jede Farbe fest und benennen Sie optional ihr Material. Farbe ist eine ungefähre visuelle Anleitung, keine Simulation eines gedruckten oder gemischten Farbtons. Konfigurieren Sie genaue Farben und mischen Sie in Ihrem Slicer. Wählen Sie eine beliebige Filamentkarte und wählen Sie **Leuchtkörper aus Schlitz N löschen**, um es zu entfernen. Die verbleibenden Slotnummern ändern sich nicht: Löschen des Slots 6 verlässt den Slot 7 als Slot 7. **+ Slot N** fügt die niedrigste verfügbare Nummer wieder hinzu; Das Limit bleibt bei 16. Löschen eines Filaments ändert nicht mehr die Modellfarbe. Entfernte Slots werden beim Export nicht mehr angeboten oder automatisch angepasst. Wählen Sie einen anderen Slot explizit oder weisen Sie ihn dem Slicer zu.
2. Klicken Sie auf **↓ Herunterladen**. Wählen Sie **Organizer und Zubehör**, **Nur Shell** oder **Das ganze Set**, je nachdem, welche Teile Sie benötigen. Exportieren Sie das Kit für ein geschnittenes Modell.
3. Legen Sie für 3MF jedem Teil einen Filamentschlitz zu oder lassen Sie ihn im Slicer zur Zuordnung. Orca kann den ersten Filament für nicht zugewiesene Teile verwenden.
4. Warten Sie auf die Geometrie- und Größenprüfungen. Lesen Sie die Abmessungen jedes Teils und jede Anweisung, es um 90° auf dem Bett zu drehen. Die Überprüfung reserviert 2 mm an den Bettkanten. Laden Sie es mit der Formatschaltfläche am unteren Rand des Dialogs herunter.
5. Öffnen Sie das Ergebnis in Ihrem Slicer im Maßstab **100% Skala in Millimetern**. Ordnen Sie den kompletten Satz an, überprüfen Sie Überhänge und dünne Details und sehen Sie die erste Schicht und die Teiler vor. Für einen mehrfarbigen Druck überprüfen Sie die Filamentzuordnung jedes Teils vor dem Schneiden.

| Format | Wählen Sie es für | Was tun mit dem Download |
| --- | --- | --- |
| STL | Geometrie für einen Einfarbendruck | Öffnen Sie das STL im Slicer und extrahieren Sie zuerst den ZIP, wenn der Export mehrere STLs enthält. |
| 3MF | Ein Kit mit separaten Teilen, Farben und Filamentzuordnungen | Öffnen Sie es in Ihrem Slicer und überprüfen Sie die Teile und Schlitze. ReplixGrid überlässt Drucker- und Materialprofile dem Slicer. |
| OBJ + MTL | Ein farbiges Modell für ein Tool, das OBJ akzeptiert | Halten Sie die Geometrie- und Materialdatei zusammen. Das Modell verwendet Millimeter mit Z up. |
| Projekt JSON | Weiterbearbeiten von Fächern, Abmessungen oder Zubehör | Verwenden Sie **Projekt speichern** und öffnen Sie es erneut mit **Öffnen** in ReplixGrid. |


Um eine digitale Farbe von Ihrem Slicer abzugleichen, fügen Sie den sechsstelligen **HEX-Code** ein, z. B. `#E63522`, neben den Farbwähler. Der führende `#` ist optional. Gültige Codes aktualisieren die Vorschau sofort; unvollständiger oder ungültiger Text wird nicht angewendet und kehrt zu der gespeicherten Farbe zurück, wenn Sie das Feld verlassen. Ein passender HEX-Code simuliert nicht das Aussehen des Filaments, die Beleuchtung oder eine physische Farbmischung.

<a id="troubleshooting"></a>
## Problemlösung

| Was du siehst | Was zu überprüfen ist |
| --- | --- |
| Das Objekt passt zu den Außenmaßen, passt aber nicht in eine Bucht | Das Fach auswählen und seine Innenmaße überprüfen; Wandstärke, gebogene Enden, Inneneckenradius und abnehmbare Einsätze berücksichtigen. |
| Die Auswahl eines Trenners hält die Auswahl der Wand vorn | Wechseln Sie zu **Oben** oder öffnen Sie **Alle Wände und Fächer** rechts. |
| Der Deckel oder die nächste Ebene kann nicht hinzugefügt werden | Bei einem Stapel sind auch alte Schalenclips und Passungsfreiheit in Bezug auf die Wandstärke zu prüfen. Eingebautes und SVG-Relief werden auf einzelnen Etagen unterstützt; die Gegenflächen bleiben glatt. |
| Ein Teil übertrifft das Bett, obwohl der Fußabdruck klein genug schien | Lesen Sie die fertigen Abmessungen im Download-Dialog. Kippen, Relief, Verkleidung und Schalen können sich über die Basis hinaus erstrecken. Überprüfen Sie die gewählte Druckerkonfiguration und -rotation. |
| Versteckte Plattenbefestigungen sind nicht verfügbar | Verwenden Sie Wände mit einer Dicke von mindestens 3,2 mm ohne Relief oder lassen Sie Befestigungselemente aus und verkleben Sie die Paneele; das Ändern von Paneelen verdickt die Wände nicht. |
| Paneele überlappen die Bodenverkleidung oder die Etagenfelge in einem alten Design | Bei Etagen ist ein Kantenversatz von mindestens 3 mm festzulegen. Der untere Versatz wird von der Oberseite der unteren Verkleidung aus gemessen. Die Teile werden nach Änderung der Einstellungen regeneriert und heruntergeladen. |
| Ein heruntergeladener Druck hat die falschen Farben | Verwenden Sie 3MF, passen Sie die Slotnummern in **Drucken** an und prüfen Sie dann die Einzelteilzuweisungen im Slicer. STL trägt nur Geometrie. |
| Ein auf einem anderen Gerät gespeichertes Design fehlt | Übertragen Sie das Projekt JSON und verwenden Sie **Öffnen**. Browserbibliotheken sind lokal für jedes Gerät und jede Site-Adresse. |

<a id="project-variants"></a>
## Projektvarianten

Klicken Sie in der oberen Leiste auf **+ Variante** oder öffnen Sie **Meine Projekte** und wählen Sie **Neue Variante**. Geben Sie einen Namen ein und klicken Sie auf **Variante erstellen**. Die neue Variante ist eine unabhängige Kopie; das Original bleibt gespeichert. Ein unbenanntes Original bleibt als **Entwurf** erhalten.

Verwenden Sie den Selektor neben **+ Variante**, um zwischen verwandten Modellen zu wechseln, oder wählen Sie unter **Varianten dieses Projekts** in Meine Projekte. Jede Variante speichert automatisch und behält nach dem Umschalten oder erneuten Laden ihren eigenen Rückgängig-/Wiederholverlauf. Eine neu erstellte Variante beginnt mit einem leeren Verlauf.

Verwenden Sie **Eigenständiges Projekt → Kopie speichern**, um ein nicht verwandtes Projekt zu erstellen. Einzelne Modelle in Meine Projekte umbenennen oder löschen; das Löschen des Originals löscht seine Varianten nicht.

**Download** exportiert das ausgewählte Modell zum Drucken. **Projekt speichern** lädt dieses Modell als editierbares JSON herunter; **Datei** lädt das entsprechende Modell auf einer Bibliothekskarte herunter. JSON enthält ein Modell, ohne die zugehörigen Varianten oder die Rückgängig-Historie. Speichern Sie jedes Modell separat, um das komplette Set zu übertragen oder zu sichern.


<a id="shared-styles"></a>
## Gemeinsame Stile

1. Öffnen Sie ein Projekt mit den Farben und Mustern, die Sie wiederverwenden möchten.
2. Geben Sie unter **Form → Gemeinsamer Stil** einen Namen ein und klicken Sie auf **Aktuellen Stil speichern**.
3. Öffnen Sie ein anderes Projekt oder eine andere Variante, kehren Sie zu **Gemeinsamer Stil** zurück und wählen Sie den gespeicherten Stil aus.
4. Wählen Sie **Farben**, **Muster** oder beides. Überprüfen Sie **Wird angewendet** und alle **Wird übersprungen** Nachrichten, dann klicken Sie auf **Stil anwenden**.

Ein Stil erfasst die Farbe und das Relief des Organisators sowie die Farben und Muster einer vorhandenen Schale und eines Deckels. Ein glatter Körperstil entfernt das Körperrelief des Ziels. Abmessungen, Fachlayouts, Wandstärken, Deckelsitz, Griffe und Schalenfreigaben bleiben unverändert. Fehlende Deckel oder Schalen werden nicht hinzugefügt. Inkompatible Mustereinstellungen werden mit einer Erklärung übersprungen; kompatible Einstellungen können immer noch angewendet werden. Farben und Filamentschlitzzuordnungen werden nicht übertragen.

Die Anwendung ist ein Rückgängig-Schritt und erstellt eine unabhängige Kopie: Spätere Änderungen an einem Organisator ändern die anderen nicht. Das Löschen eines gespeicherten Stils ändert keine Projekte, die ihn bereits verwenden.

Gespeicherte Stile gehören zu diesem Browser und dieser Website-Adresse. Ein Projekt JSON behält das verwendete Erscheinungsbild bei, enthält jedoch nicht die Bibliothek mit gespeichertem Stil. Um einen Stil auf einem anderen Gerät wiederzuverwenden, öffnen Sie dort das JSON des gestylten Projekts und speichern Sie seinen aktuellen Stil erneut.


<a id="drawer-arrangements"></a>
## Organizer in Schubladen anordnen

Wählen Sie **DRAWER** neben **Organizer**, dann **Create drawer**. Geben Sie die gemessene Innenlänge, Breite, nutzbare Höhe und Freiraum ein. Freiraum gilt sowohl an den Schubladenwänden als auch zwischen den Trays.

Neue Schubladen beginnen bei 180 × 280 mm, wobei die Vorderkante unten markiert ist. **Drehen um 90°** ändert nur die Sichtausrichtung; Schubladenabmessungen, Traykoordinaten und exportierte Modelle bleiben unverändert. Bestehende Schubladenanordnungen behalten ihre Abmessungen bei. Gespeicherte Schubladen mit horizontaler Länge und vertikaler Breite; Maßaufschriften folgen manueller Sichtdrehung. Der Traydrehknopf dreht nur das ausgewählte Tray.

Verwenden Sie **New organizer**, um ein Tablett direkt in der Schublade zu erstellen. Legen Sie die Abmessungen fest, bearbeiten Sie dann Fächer und Zubehör im üblichen Organizer-Editor. **Zurück zur Schublade** kehrt zu seiner Platzierung zurück. **Add saved organizer** fügt eine unabhängige Kopie eines gespeicherten Projekts oder einer gespeicherten Variante hinzu; die Bearbeitung ändert nie die Quelle.

Ziehen Sie die Schalen in der Draufsicht oder geben Sie die X/Y-Koordinaten ein, die von der oberen linken Ecke bis zur äußeren Begrenzung der Schale gemessen werden. Drehen Sie sie um 90 Grad, duplizieren oder entfernen Sie sie. Pfeiltasten bewegen eine fokussierte Schale um 1 mm (Umschaltwinkel: 10 mm). Anordnung stellt Platzierungen und abgeschlossene Schalenbearbeitungen wieder her.

Das Diagramm zeigt zusammengesetzte äußere Begrenzungsrechtecke, einschließlich Schalen, Verkleidungen, Deckel und Etagen. Gebogene Formen werden konservativ und nicht eng verschachtelt überprüft. Grenz-, Abstands- und Höhenkonflikte werden hervorgehoben. Warten Sie die Geometrieprüfung, bevor Sie sich auf den Passstatus verlassen. Wählen Sie die freie Platzierung oder aktivieren Sie eine Montageplatte, wie unten beschrieben.

Schubladen speichern lokal in diesem Browser, getrennt von Organizer-Projekten. Laden Sie eine Schubladen-JSON-Datei zur Sicherung oder Übertragung herunter; Öffnen Sie eine separate Schubladenkopie. Wählen Sie ein Fach aus und wählen Sie **Download selected tray** für den eigenen STL-, 3MF- oder OBJ-Export mit den vorhandenen Druckergrößenkontrollen.

<a id="mounting-plates"></a>
### Montageplatten

In **DRAWER → Drawer base** wählen Sie **Mounting plate**. Die Länge/Breite der Schublade und der Wandabstand bestimmen den abgedeckten Bereich. Geben Sie die nutzbare Breite und Tiefe des **3D-Druckerbett** separat ein: Diese Abmessungen bestimmen die maximale Abschnittsgröße und damit die Anzahl der Abschnitte. Die Berechnung umfasst gemeinsame Vorsprünge und einen Druckrand von 2 mm an jeder Bettkante. Die Abmessungen müssen nicht Vielfache des 20-mm-Stiftrasters sein; Randabschnitte passen zum verbleibenden Raum.

**Download sections (ZIP)** erzeugen pro Druckauftrag eine nummerierte 3MF, eine SVG-Montagekarte und eine Koordinatenliste. Die Karte verwendet die ursprüngliche Schubladenausrichtung, unabhängig von der Ansichtsdrehung. R zeigt Zeilen von oben nach unten, C Spalten von links nach rechts. Untere benachbarte Schwalbenschwänze von oben. Erster Druck **Download joint sample**, bestehend aus zwei kleinen angrenzenden Abschnitten; Prüfung der Montage mit Ihrem Drucker vor dem Drucken des vollen Satzes. Die Fugen verwenden eine 0,05-mm-Naht und eine 0,03-mm-Profilzulage. Eine schwache Naht und leichtes Spiel können zwischen nackten Abschnitten verbleiben.

Wenn der Plattenmodus aktiviert ist, enthalten die Tablett-Downloads unterseitige Steckdosen für die Position und Rotation dieses Tabletts. Die Abmessungen des Innenraums bleiben erhalten. Das Tablett wird 2,1 mm höher; einschließlich der 2-mm-Platte fügt die Prüfung der Schubladenpassung 4,1 mm hinzu. Nach dem Bewegen oder Drehen eines Tabletts müssen die Steckdosen an die Positionen der Steckdosen angepasst werden. Durch das Ändern des Schubladenabstands ändert sich auch der Ursprung des Steckdosens.

Der radiale Abstand der Buchse beträgt 0,12 mm. Drucken Sie einen kleinen Organizer, der zwei Abschnitte umfasst, um die Passung zu Ihren Material- und Schichteinstellungen zu überprüfen. Die Buchsen halten den Organizer seitlich; heben Sie ihn nach oben, um ihn zu entfernen. Exportieren Sie nur Geometrie: Wählen Sie Ihre Drucker- und Materialprofile im Slicer aus und inspizieren Sie die Buchsendächer vor dem Drucken.

Die Montage unterstützt derzeit ungespaltene Organisatoren ohne Neigung mit mindestens drei vollständig unterstützten Sockeln. Kleine Schalen müssen möglicherweise verschoben oder vergrößert werden. Obere Ebenen und Schalen behalten ihre bestehende Geometrie bei. Drehen Sie den Plattenmodus aus, um das ursprüngliche nicht montierte Modell zu exportieren. Gespeicherte Quellprojekte bleiben unverändert.

<a id="custom-svg-relief"></a>
## Eigenes SVG-Relief

Unter **Form → Oberflächenrelief → My SVGs** wählen Sie **Upload SVG** oder legen Sie eine Datei in den Upload-Bereich. Wählen Sie ein gespeichertes Thumbnail, um es wiederzuverwenden. Die gleiche Bibliothek steht unter **Form → Deckel → My SVGs** und **Hülle → Muster → My SVGs** zur Verfügung. Jedes Ziel behält seine eigenen Muster- und Platzierungseinstellungen bei.

Wählen Sie **Single motif** oder **Repeat**, wählen Sie die Außenwände aus und passen Sie die Motivbreite in Millimetern, die Rotation, den horizontalen/vertikalen Versatz und den Wiederholungsspalt an. Breite und Höhe halten die Originalproportionen bei. Die Platzierung ist auf jeder ausgewählten Seite zentriert; auf gekrümmten Körpern entsprechen die Seiten vier Außensektoren. Der positive vertikale Versatz bewegt das Motiv nach oben. Das Muster folgt der Außenkontur. Wiederholungen werden nur dort platziert, wo ein vollständiges Motiv unter den oberen Rand, um Ausschnitte und innerhalb jeder Seite passt. Einzelmotive werden an diesen Grenzen abgeschnitten. Die Relieftiefe verwendet die vorhandene **Relieftiefe/Intensität**. Die Originalwand und die Innenfächer bleiben erhalten; die Außenabmessungen nehmen zu. Warten Sie, bis die aktualisierte Vorschau beendet ist, dann überprüfen und laden Sie das Teil herunter.

Unterstützte SVGs enthalten gefüllte Pfade, Polygone, Rechtecke, Kreise oder Ellipsen, einschließlich Löcher und Gruppentransformationen. Konvertieren Sie Text und Striche in gefüllte Pfade, bevor Sie aus Ihrem Vektoreditor exportieren. Fotos, externe Referenzen, Filter, Masken, Clippingpfade, Gradienten, CSS-Style-Blöcke und Verweise auf wiederverwendbare Elemente ( `use` werden nicht unterstützt. Leere oder nicht verwendete Definitionen, die unterstützte Formen enthalten, werden ignoriert. Farben werden zu einer einzigen erhöhten Form mit der Organisatorfarbe. Die Grenzen sind 200 KB, 512 XML-Elemente, 128 gefüllte Shapes und 6.000 abgetastete Konturpunkte; zu komplexe Muster oder übermäßige Wiederholungen werden mit einer Nachricht verworfen. Kurven werden durch polygonale Konturen für den Druck angenähert.

SVGs werden lokal im Browser verarbeitet. Die Bibliothek bleibt auf diesem Gerät. Jedes Projekt bettet eine unabhängige Kopie seiner verwendeten Konturen ein, so dass heruntergeladene Projekte auf einem anderen Gerät ohne die Quelle SVG oder Bibliothek wieder geöffnet werden können. Das Löschen eines Bibliothekseintrags lässt bestehende Projekte unverändert. **Gemeinsamer Stil** trägt auch benutzerdefinierte Body-, Deckel- und Shell-Muster zu einem anderen Organisator. Fehlende Deckel oder Shells werden übersprungen, wie bei eingebauten Stilen. Halten Sie ein heruntergeladenes Projekt als Backup.

<a id="choose-an-svg-for-its-intended-use"></a>
### SVG für den Einsatzzweck auswählen

Ein SVG ist ein Zeichenformat, keine Garantie für druckbare Geometrie. **Import-Erfolg bedeutet nur, dass die unterstützten gefüllten Umrisse gelesen wurden.** Die gewählte Oberfläche, Größe und Anwendungsmodus müssen noch die Geometrieprüfung bestehen.

| Vorgesehene Verwendung | Was aus den gefüllten Bereichen wird | Was man vorbereiten sollte |
| --- | --- | --- |
| Organisatorentlastung | Erhöhtes Material, das an einer festen Wand befestigt ist | Separate Motive und innere Löcher können funktionieren, weil die Wand sie unterstützt. |
| Erhöhte Deckelstruktur | Erhitztes Material auf festem Untergrund | Innenlöcher sind erlaubt; halten Sie die gesamte Zeichnung innerhalb des verfügbaren Rahmens und frei von der Grifflandung. |
| Deckel durch Öffnungen | Vom Deckel entferntes Material | Jedes verbleibende Stück muss mit dem umgebenden Deckel verbunden sein, eingeschlossene innere Details benötigen Schablonenbrücken. |
| Umhüllte Schalen- oder Zierpaneele | Durch den Deckel geschnittene Öffnungen | Verwenden Sie eine schablonenkompatible Zeichnung. Der verbleibende Rahmen und das Muster müssen ein zusammenhängendes Material bilden. |

Um eine Datei vorzubereiten:

1. Konvertieren Sie Text und **Striche zu Umrissen** in Ihrem Vektor-Editor. Eine sichtbare Linie mit `fill="none"` ist ein Strich, kein gefüllter Bereich.
2. Entfernen Sie Hintergrundrechtecke, es sei denn, Sie möchten, dass der gesamte Bereich zu einem Relief oder einer Öffnung wird. SVG-Farben trennen keine Materialien und weiße Formen löschen nicht automatisch dunklere Formen darunter.
3. Ein Kommentar mit der Aufschrift "Loch" erzeugt keinen: Die Windung des Pfades und die `fill-rule` bestimmen, ob ein innerer Bereich gefüllt ist.
4. Verbinden Sie für Durchgangsöffnungen geschlossene innere Details mit dem umgebenden Material mit Brücken. Vergrößern der Lücke zwischen wiederholten Motiven tut **nicht** Befestigen Sie ein loses Detail in einem Motiv. Alternativ verwenden Sie ein erhöhtes Relief auf dem Deckel.
5. Wenn das SVG bereits ein Motivraster enthält, skaliert seine Breiteneinstellung das **gesamtes Netz**, nicht jedes Motiv. Kleine Merkmale können zu dünn werden, um gedruckt zu werden.
6. Warten Sie auf einen erfolgreichen Build- und Export-Check, dann überprüfen Sie die Slicer-Vorschau: Wenn das Gebäude ausfällt, behält die Szene möglicherweise das letzte erfolgreiche Modell bei; dieses Modell repräsentiert nicht die aktuellen fehlgeschlagenen Einstellungen.

Beispielsweise kann eine massive Blattsilhouette sowohl als Relief als auch als blattförmige Öffnung wirken, ein Blatt mit einer vollständig geschlossenen Vene kann als Relief wirken, aber das Ausschneiden der umgebenden Blätter kann die Vene lockern lassen, ein gefülltes Sechskantgitter kann als Perforation wirken, wenn die verbleibenden Stege verbunden und dick genug bleiben; es muss zuerst eine mehrfarbige, mit Strichen gezeichnete Darstellung erstellt werden.

<a id="svg-lids-and-perforated-shells"></a>
### SVG-Deckel und perforierte Hüllen

Fügen Sie einen Deckel hinzu und wählen Sie dann **My SVGs**. **Erhöhtes Relief (Dekoration)** macht einen einzelnen verbundenen Deckel mit dem Motiv auf einer festen Rückseite; stellen Sie seine Reliefhöhe (0,2–1 mm) und Grundfarbe ein. **Durch Schablone (geschnitten)** entfernen Sie die gefüllten SVG-Bereiche durch den Deckel. Beide Modi behalten einen 2 mm Randrahmen und die Gegenlippe. Ein separater Griff hält eine feste Landung; verschieben Sie die Zeichnung, wenn ein einzelnes Motiv mit ihr kollidiert. Äußere und eingesetzte Passungen verwenden die gleichen Bedienelemente. SVG-Kunstfarben werden nicht als separate Filamente importiert.

Für eine Schale wählen Sie **My SVGs**, dann eine Bibliothekszeichnung. Gefüllte Bereiche werden durch Öffnungen. Verwenden Sie ein Motiv oder wiederholen Sie es an ausgewählten Seiten einer umwickelten Hülle. Auf **Dekorplatten** wird die Zeichnung unabhängig voneinander auf jedem ausgewählten Paneel wiederholt; vorhandene Rahmen und Montageorte bleiben erhalten. Die anfängliche Motivgröße berücksichtigt die Schalenhöhe. Passen Sie die Rahmenbreite, Motivgröße, Rotation, Position und Abstand nach Bedarf an. Die inneren Fächer und der Schalenabstand des Organisators bleiben unverändert.

Auf Deckeln und Schalen werden nur vollständige Motive innerhalb des verfügbaren Rahmens platziert, einschließlich einzelner Motive. Wenn keine passen, verkleinern Sie die Größe oder versetzen Sie sie. Geschlossene innere Details (z. B. die Mitte eines ringförmigen Ausschnitts) können zu losen Inseln werden. Fügen Sie Brücken in Ihren Vektor-Editor ein oder verwenden Sie erhabene Dekoration auf dem Deckel. Die Anwendung blockiert getrennte Geometrie, anstatt Teile leise wegzuwerfen. Vermeiden Sie sehr schmale Stege und überprüfen Sie einen kleinen Testdruck für Ihr Material und Ihre Düse.

Muster sind in Exporten von Einzelteilen, Komplettkits und Druckaufträgen für den Vollzieher enthalten. Durch den Wechsel zu **Built-in** werden die benutzerdefinierten Muster nur von diesem Ziel entfernt. Durch das Löschen eines Bibliotheks-Miniaturbilds werden eingebettete Muster nicht aus Projekten entfernt.

<a id="download-ready-to-use-stencil-svgs"></a>
### Druckfertige SVG-Schablonen herunterladen

Diese Beispiele enthalten gefüllte Konturen mit Materialbrücken. Schwarze Bereiche werden zu Öffnungen im **Durch Schablone (geschnitten)** -Modus. Speichern Sie die Links unten als `.svg`-Dateien; wenn der Browser die Zeichnung anzeigt, verwenden Sie die **Seite speichern als** und behalten Sie die `.svg`-Erweiterung bei.

| Download | Muster | Vorgeschlagene Startbreite |
| --- | --- | --- |
| [Organische Blätter — Download SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Fünf Blätter mit Brücken, die die inneren Details verbinden | 20 mm; reduzieren für eine niedrige Schale |
| [Doppelhexagon — Download SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Eine Doppelsechskantplatte mit vier Brücken und einer Mittenöffnung | 20–24 mm; Verwendung **Repeat** für ein Raster |

**Auf einem Deckel:** einen Deckel unter **Form → Deckel** hinzufügen, **My SVGs** öffnen und eine der beiden Dateien hochladen. Wählen Sie **Durch Schablone (geschnitten)**. Beginnen Sie mit **Single motif**, um es zu inspizieren, oder wählen Sie **Repeat**, um den verfügbaren Bereich mit vollständigen Kopien zu füllen. Legen Sie Breite, Rotation und X/Y-Versatz fest. Wiederholen Sie den Abstand zwischen vollständigen Kopien, nicht die Breite ihrer internen Brücken. Beginnen Sie mit 4 mm Abstand. Die Blattdatei ist bereits eine Gruppe von fünf Blättern: Breite skaliert die gesamte Gruppe.

**Auf einer Schale:** offen **Hülle → Muster → My SVGs**, oder wählen Sie die Registerkarte **Hülle** im Studio, dann wählen Sie die gleiche Datei aus der freigegebenen Bibliothek. Shells verwenden immer durch Öffnungen. Verwenden Sie **Repeat** für ein Band um die Shell; **Zusätzlich → SVG walls** wählen Sie die Seiten einer umwickelten Shell aus. Dekorative Panels verwenden die ausgewählten Panelseiten. Jede Oberfläche behält ihre eigenen Platzierungs- und Dickeneinstellungen. Das Wechseln der Studio-Tabs zeigt den entsprechenden Teil.

Wenn ein Motiv nicht passt, verkleinern Sie dessen Breite oder Versatz. Auf einer niedrigen Schale versuchen Sie 12-16 mm für die Blattgruppe. Zunehmende Schalendicke kann den automatischen Rand vergrößern und weniger Platz für die Zeichnung lassen. Verkleinern verengt auch die Brücken: Inspizieren Sie sie in Ihrem Slicer und drucken Sie eine kleine Probe für Ihre Düse und Ihr Material. Wiederholen Sie den Abstand nicht, um die inneren Brücken zu erweitern. Warten Sie, bis die aktuelle Vorschau fertig ist, und verwenden Sie **Download**, um den Deckel oder die Schale zu überprüfen und zu exportieren.

<a id="numeric-sliders-and-valid-ranges"></a>
### Schieberegler und gültige Wertebereiche

Numerische Einstellungen zeigen **Min.** und **Max.** über einer dünnen grünen Spur, mit einem weißen Marker für den aktuellen Wert. Rote Endkappen markieren die Außenseite des zulässigen Intervalls; sie sind keine Druckstärkebewertung. Ziehen Sie den Marker, verwenden Sie Pfeiltasten, während Sie fokussiert sind, oder geben Sie eine genaue Zahl ein und drücken Sie Enter. Das numerische Feld und der Schieberegler verwenden die gleichen Grenzwerte. Einige Grenzwerte ändern sich mit dem Modell. Ein Wert innerhalb eines Schiebereglers kann immer noch mit einer anderen Einstellung kollidieren, also folgen Sie einer Geometriewarnung, bevor Sie exportieren.

<a id="whole-drawer-export"></a>
## Die gesamte Schublade exportieren

Wählen Sie **DRAWER → Print entire drawer**, um alle Tabletts, ihr Zubehör und alle aktivierten Montageplattenabschnitte vorzubereiten. Montierte Tabletts erhalten Steckdosen für ihre gespeicherten Positionen; gewöhnliche Freiplatz-Trays behalten ihre vorhandenen Basen. Split-Druckprojekte umfassen ihre Teile und Pins. Überlappungen, unzureichende Schubladenfreigaben, nicht unterstützte Montage oder ungültige Geometrie blockieren den Download und identifizieren das betroffene Tablett.

Set **Printer bed length** (horizontal), **Printer bed width** (vertikal), Druckhöhe und -abstand. Die Anfangsmaße stammen von den Montageplatteneinstellungen oder dem Druckbereich des ersten Tablars; nachfolgende Exporteinstellungen werden mit dieser Schublade gespeichert. Montageplattenabschnitte werden für das gewählte Bett regeneriert.

Das Layout verwendet tatsächlich exportierte Begrenzungsboxen, einen 2 mm Rand an den Bettkanten und den gewählten Abstand. Teile können sich um 90 Grad drehen. Mehrfarbige Deckelteile bleiben zusammen. Die angezeigte Bettenzahl ist für diese Anordnung kein garantiertes Minimum. Stützen, Krempen, Spültürme, Druckerausschlusszonen und verschiedene Materialaufgaben sind nicht enthalten. Reservieren Sie ausreichend Platz und überprüfen Sie das Ergebnis in Ihrem Slicer. Es sind keine Druckerprofile oder Filamentschlitzzuordnungen eingebettet.

Der ZIP enthält **bed-NN.3mf** für jedes Bett, übereinstimmende **bed-NN.svg** Diagramme, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** und eine Liste nummerierter Teile in **README.txt**. Öffnen Sie jedes 3MF als separaten Druckauftrag, behalten Sie die relative Position seiner Objekte bei, verwenden Sie Millimeter im Maßstab von 100% und weisen Sie Filamente zu. Die SVG-Diagramme zeigen begrenzende Rechtecke; das 3MF enthält die vollständige bedruckbare Geometrie. Die Schubladen-Montagekoordinaten verwenden immer die Länge horizontal und die Breite vertikal.

Änderungen der Layout- oder Exporteinstellungen machen die vorherige Berechnung ungültig. Das Schließen des Fensters bricht die Vorbereitung ab. Übergroße Einzelteile werden gemeldet, anstatt leise skaliert oder automatisch aufgeteilt zu werden. Sehr große Sätze müssen möglicherweise in kleinere Gruppen exportiert werden.

<a id="pattern-studio"></a>
### Musterstudio

Wählen Sie **Erhöhtes Relief (Dekoration)** oder **Durch Schablone (geschnitten)** an der Oberseite der rechten Einstellungen. Die Einstellungen unterstützen nur den Schablonenmodus. Die Einstellungen zeigen die Reliefhöhe nur für Relief und den Abstand nur für die wiederholte Platzierung. **Materialdicke** ist editierbar: 1,2-6 mm für einen SVG-Deckel und 1-4 mm für eine Schale. Sie ändert die Vorschau und den Export zusammen. Bestehende Deckelvorgaben bleiben 3,2 mm für Relief und 2 mm für Schablone; eine gewählte Dicke bleibt beim Schalten der Modi erhalten. Die Reliefhöhe ist in der Deckeldicke enthalten. Ein eingesetzter SVG-Deckel erfordert eine Innentiefe von mindestens der Plattendicke plus 2 mm. **Zusätzlich** enthält die Farb- oder Schalenwandauswahl. Öffnen **Welche SVG-Dateien funktionieren?** für Importgrenzen und Vorbereitungshinweise.

Öffnen Sie **Form → Deckel → My SVGs** oder **Hülle → Muster → My SVGs**, um Zubehörmuster in der unteren Schublade zu bearbeiten. **Deckel** und **Hülle** Registerkarten behalten unabhängige Einstellungen bei, während Sie die SVG-Bibliothek teilen. Das Wechseln der Registerkarten isoliert automatisch diesen Teil in der Vorschau. Wenn es noch nicht hinzugefügt wird, bleibt die Assembly sichtbar, bis das Teil erstellt wird. Sie können weiterhin die Assembly manuell über dem Modell auswählen. Verwenden Sie die Breite, Rotation, Intervall und X/Y-Steuerelemente, um Motive zu positionieren. Der Mittelknopf setzt Position und Rotation zurück. Der Deckel unterstützt erhöhte Reliefs oder durch Öffnungen. Shell-Öffnungen behalten den Rahmen und die Montagebereiche. Schließen Sie mit × oder Escape, während Sie im Studio fokussiert sind; Änderungen bleiben gespeichert. Pfeiltasten schalten die fokussierte Oberfläche.
