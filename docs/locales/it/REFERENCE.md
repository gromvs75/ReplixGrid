<a id="replixgrid-user-guide"></a>
# Manuale utente di ReplixGrid

Progetta un organizer con misure in millimetri, verifica l’accoppiamento dei pezzi e scaricali per lo slicer. Per iniziare, segui l’esempio illustrato della capsula nella guida rapida. Questo manuale descrive le singole impostazioni.

[Apri ReplixGrid](https://grid.replixcast.com/?lang=it) · [Guida rapida](USER-GUIDE.md) · [Installazione locale](../../../README.md#local-installation)

| Sezioni del manuale |
| --- |
| [Area di lavoro e viste](#workspace-and-views) |
| [Forma e dimensioni](#shape-and-dimensions) |
| [Scomparti e divisori](#compartments-and-dividers) |
| [Altezza delle pareti e aperture](#wall-heights-and-cutouts) |
| [Angoli, bordi e decorazione](#corners-edges-and-decoration) |
| [Inserti, livelli e coperchi](#inserts-tiers-and-lids) |
| [Rivestimenti interi e pannelli](#sleeves-and-panels) |
| [Progetti e copie di sicurezza](#projects-and-backups) |
| [Impostazioni di stampa e suddivisione](#print-setup-and-sectioning) · [Download e preparazione nello slicer](#download-and-slice) |
| [Varianti del progetto](#project-variants) · [Stili condivisi](#shared-styles) |
| [Disposizione degli organizer nel cassetto](#drawer-arrangements) · [Piastre di montaggio](#mounting-plates) |
| [Rilievo SVG personalizzato](#custom-svg-relief) · [Studio dei motivi](#pattern-studio) |
| [Esportare l’intero cassetto](#whole-drawer-export) |
| [Risoluzione dei problemi](#troubleshooting) |

<a id="start-a-new-project"></a>
## Iniziare un nuovo progetto

Al primo avvio l’area di lavoro è vuota. La guida a sinistra propone tre passaggi: **Scegli una forma → Imposta le dimensioni → Aggiungi scomparti**. Scegli una forma, regola le dimensioni e premi **Avanti: scomparti**. Concludi con **Fine** oppure **Lascia senza divisori**. Dopo aver scelto una forma, puoi chiudere la guida con **×**. Puoi anche aprire un progetto salvato o un file JSON.

**Sugli schermi piccoli:** quando la finestra del browser è larga al massimo 1400 px, la procedura guidata appare **sotto il modello**, senza coprire l’anteprima. Scorri la **pagina verso il basso** per raggiungere la procedura guidata, i passaggi successivi e i pulsanti per passare agli scomparti e terminare. Scorri di nuovo verso l’alto per vedere il modello. Nelle finestre più larghe, la procedura guidata rimane accanto al menu a sinistra.

Riapri la guida da **Aiuto → Guida: tre passaggi**. Aprirla non modifica il modello. Scegliere un’altra forma sostituisce il modello attuale; l’azione può essere annullata.

La guida rapida, il manuale e il menu di aiuto usano la lingua dell’interfaccia. Il video resta in inglese.

Passaggi, suggerimenti e conferme della guida sono tradotti. La riga del modello salvato si chiama **Progetto precedente**. I nomi effettivi in **I miei progetti** restano quelli salvati dall’utente.

Uso **Nuovo progetto** nella barra superiore per tornare a questo inizio pulito. Il tuo lavoro attuale viene salvato prima; una bozza non nominata viene conservata **I miei progetti**. I progetti esistenti, le varianti, le fessure di filamento e la configurazione della stampante non vengono eliminati. Il pannello mostra una miniatura etichettata **Progetto precedente** con **Salvato in «I miei progetti»**; fare clic su quella riga per riaprire la libreria. La tela viene sgomberata immediatamente e rimane vuota fino a quando non si sceglie una nuova forma, proprio come su una prima visita. Fino a quando non si sceglie una nuova forma, il risparmio e l'esportazione sono disabilitati. Si può invece aprire un progetto da **I miei progetti** o importarne JSON file. Rinfrescando questa scheda di avvio vuoto mantiene la schermata di avvio; riapertura di un progetto esistente ripristina il modello. Le visite di ritorno ordinarie riprendono il lavoro salvato.

Scelta **Forma → Base → Crea da modello** mentre la modifica sostituisce ancora la costruzione all'interno del progetto attuale e può essere annullata. Uso **Nuovo progetto** quando si desidera un modello separato.

<a id="workspace-and-views"></a>
## Area di lavoro e viste

Aprire uno strumento in alto a sinistra. **Forma** cambia il corpo e i suoi accessori. **Scomparti** cambia il layout. **Rivestimento** progetta una copertura esterna separata. **Stampa** imposta il volume di stampa, fessure di filamento e tagli di sezione facoltativi. Fare clic su un numero di scompartimento, parete o divisore sul modello per aprire le sue impostazioni a destra. Se una parte è difficile da cliccare, espandere **Tutte le pareti e i compartimenti** e selezionarlo per nome.

Seleziona una sezione nel menu a sinistra. Le impostazioni si aprono in un pannello mobile nella parte inferiore dell’anteprima; scena e griglia restano visibili dietro il pannello. Il menu a sinistra rimane disponibile. La freccia riduce il pannello e **×** lo chiude. Seleziona un’altra sezione per cambiarne le impostazioni. Il pannello a destra resta dedicato alla parete o allo scomparto selezionato.

Trascina lo sfondo per ruotare il modello, usa la rotella per lo zoom e trascina con il tasto destro per spostare la vista. **Restituisci la fotocamera** ripristina l’inquadratura. **Dall’alto** facilita la selezione di scomparti stretti e lo spostamento dei divisori; **3D** mostra altezze e assemblaggio. **Griglia** attiva una griglia con linee ogni 10 mm e linee principali ogni 50 mm. I pulsanti sopra il modello mostrano separatamente organizer, inserti, rivestimento e coperchio; **Insieme** mostra insieme i pezzi disponibili. Per più livelli, apri il menu accanto a **Organizer**: **Visualizza pila** mostra tutta la pila, mentre un livello numerato permette di modificarlo singolarmente. L’editor inferiore resta aperto. Nella vista completa, **Rivestimento** e **Inserti** includono i pezzi di tutti i livelli. Nelle finestre strette, i pulsanti passano su una riga sotto gli strumenti. Quando mostri solo il coperchio, **Sotto** ne visualizza il lato inferiore. **Esc** chiude il pannello degli strumenti. Le frecce curve annullano o ripristinano una modifica.

Utilizzare la barra superiore per scegliere un linguaggio di interfaccia o passare tra aspetto chiaro, scuro e sistema. I nomi di controllo in questa guida seguono la lingua di interfaccia selezionata.

<a id="shape-and-dimensions"></a>
## Forma e dimensioni

Sotto **Forma → Base**, scegliere un profilo di base e altezza, quindi fare clic su **Crea da modello**. Il pulsante sostituisce la costruzione corrente. Salvare una copia di nome prima se si desidera mantenere entrambi i disegni. **Spazi semplici** offre anche un corpo vuoto e un punto di partenza di quattro componenti.

| Base | Quando scegliere |
| --- | --- |
| Arrotondato | Un'impronta rettangolare con angoli esterni regolabili. |
| Capsula | Un lungo corpo con estremità semicircolari. Il modello inclinato porta l'inclinazione attraverso entrambe le estremità curve. |
| Circolo | Un organizer rotondo dimensionato per diametro. |
| Ovale | Un profilo curvo allungato con larghezza e profondità regolabili separatamente. |
| Mielecombe | Un gruppo di celle esagonali che condividono pareti. Selezionare una cella per regolare la sua altezza. |

Scegli **Liscio** per un cerchio di livello, **Inclinato** per un continuo aumento, o **Gradini** per livelli di altezza distinti. Le dimensioni sotto le scelte descrivono il modello che stai per creare. Una volta creato, modificare il modello sotto **Dimensioni**. La larghezza e la profondità misurano l'impronta esterna. Utilizzare le dimensioni interne dello scomparto selezionato quando dimensionarlo per un oggetto. Su una base curva, controllare anche le estremità di restringimento in **Dall’alto** vista.

![Capsule Sloped con una fascia bassa per l'accesso, un'estremità alta per oggetti lunghi e due divisori trasversali](../../images/capsule-sloped.jpg)

In **Forma** → **Ulteriori**, regola gli spessori di pareti e fondo. Pareti più spesse riducono lo spazio interno. **Inclinabile su base piana** inclina le pareti in avanti fino a 25°, lasciando il fondo orizzontale. Un bordo superiore in pendenza, invece, cambia l’altezza delle pareti lungo il corpo. Con l’inclinazione attiva, controlla gli ingombri finali nella finestra di download.

<a id="exact-internal-dimensions"></a>
## Dimensioni interne precise

Seleziona uno scomparto e apri **Dimensioni interne** a destra, oppure fai clic sulla quota blu nel modello. Scegli larghezza o profondità e inserisci i millimetri. Fai clic fuori dal campo o premi **Enter** per applicare; **Escape** annulla. Nel pannello destro usa **Applica**. I valori non validi non modificano il modello. Ogni modifica confermata si annulla in un solo passaggio.

Il divisore arancione è la sua posizione attuale; la linea blu schiacciata prevede la nuova posizione. La chiusura più vicina si muove sull'asse scelto, mantenendo invariata la dimensione del corpo esterno e lo spessore della parete. Il pannello mostra le dimensioni vicine interessate. Se non c'è divisore su quell'asse, regolare le dimensioni generali o dividere il vano prima.

In una semplice riga, inizia con il compartimento 1 e continua in ordine; l'ultimo scomparto prende il resto. Le dimensioni del quartiere non sono bloccate, quindi la modifica di un scomparto precedente può ridimensionare uno successivo.

Sono supportati angoli arrotondati, forme a capsula, smussi e raccordi interni. La linea blu misura lo spazio interno lungo il centro dello scomparto, appena sopra il fondo. Le curve possono ridurre lo spazio in altri punti: prevedi un gioco e verifica l’intero ingombro dell’oggetto. La modifica precisa degli scomparti non è ancora disponibile per cerchi, ovali, forme a nido d’ape e pareti inclinate.

Seleziona una parete o un divisore per modificare la sua altezza direttamente sul modello. Le pareti piatte mostrano un valore; i profili a due punti mostrano valori A/B. Le regole a parete e passo-passo corrispondono al pannello giusto. Queste etichette modificano l'altezza, non la lunghezza della parete o lo spessore globale.

<a id="compartments-and-dividers"></a>
## Scomparti e divisori

Per un layout rapido, utilizzare **Scomparti → + Scomparto** per dividere il più grande scomparto. **- Scomparto** fonde una coppia vicina. In un nido d'ape, questi controlli aggiungono o rimuovono una cella esterna e conservano la dimensione degli altri. Due celle a nido d'ape vicine condividono una parete alta come la cella più alta.

Per un layout esatto, passare a **Dall’alto** e selezionare il compartimento che si desidera dividere. Scegliere **Numero di parti**, poi **Diviso di larghezza** per dividere la larghezza in scomparti più stretti, o **Diviso in modo approfondito** per fare quelli più scamoscianti. È possibile dividere di nuovo uno dei risultati. Per una porta matita accanto a due piccoli vassoi, prima dividere la larghezza in due, poi dividere solo la parte in due.

![Top-view esempio con una baia completa e due scomparti più piccoli](../../images/compartment-splits.svg)

Selezionare il divisore per trascinarlo, o regolare **Primo scomparto** sotto **Posizione della partizione**. Solo il divisore selezionato si muove; altre posizioni divisori rimangono fissi. I comparti adiacenti cambiano dimensione. Spostamenti che lasciano troppo poco spazio vengono respinti. Controllare le nuove dimensioni interne su ogni lato. **Rimuovere la partizione** combina i compartimenti e può anche rimuovere i divisori nidiati all'interno della divisione.

<a id="wall-heights-and-cutouts"></a>
## Altezza delle pareti e aperture

Seleziona una parete esterna o un divisore. **Un'altezza** crea un bordo uniforme; **Due punti** regola le altezze alle estremità A e B indicate nel modello. **Diretto**, **Ondulato** e **Zigzag** definiscono il profilo del bordo. La lunghezza d’onda imposta la distanza tra ripetizioni. In un modello a gradini, modificare un gradino aggiorna anche parete e divisore collegati.

Utilizzare **Collegare le altezze dei muri adiacenti** per fare una parete esterna seguire i suoi vicini. Per un divisore, **Adatta alle pareti adiacenti** copie le due altezze finali una volta. Ripetere la vestibilità dopo aver cambiato le pareti vicine. **Come gli altri** restituisce la parete selezionata all'altezza comune.

Aprire **Ritaglio nel muro** per fare un'apertura di accesso. Scegli uno scoop liscio, semicerchio o rettangolare, imposta la larghezza e la profondità, quindi spostalo lungo la parete. La posizione scorre dall'estremità A alla B. La profondità viene misurata dal bordo superiore. Ispezionare il labbro rimanente sopra il fondo. Scegliere **Nessun ritaglio** per riempire l'apertura. Honeycomb utilizza l'altezza della cella invece.

<a id="corners-edges-and-decoration"></a>
## Angoli, bordi e decorazione

Apri **Forma → Angoli e smussi**. Tre controlli influenzano diverse parti della stampa.

| Controllo | Dove guardare | Cosa cambia |
| --- | --- | --- |
| Angoli esterni | Vista superiore, profilo esterno | Arrotondare gli angoli di impronta o tagliarli a 45°. Zero dà un angolo quadrato. Disponibile sulla famiglia rettangolare di basi. |
| Scomparti interni radiali | Vista superiore, all'interno di una baia | Rotonde la giunzione verticale dove due pareti si incontrano. |
| Bordo superiore di pareti e divisori | Sezione trasversale attraverso una parete | **Smusso** taglia un bevel piatto e **Arrotondamento** curva il labbro. Entrambi i lati delle pareti esterne e dei divisori ricevono la finitura. **Nessuna** ripristina il labbro quadrato. |

![Sezioni trasversali a parete che mostrano angoli superiori squadrati e arrotondati con lo stesso spessore della parete](../../images/top-edge-profiles.svg)

Ad esempio, su una parete da 2 mm si prova una smussi da 0,5 mm. Ogni lato perde 0,5 mm al piano superiore, lasciando una striscia piana da 1 mm. La dimensione massima visualizzata dipende dallo spessore della parete. Con **Arrotondamento**, il valore è il raggio in millimetri.

- **Colore dell'organizzatore** cambia l'anteprima e le esportazioni di colore-capable. Scegliere un orologio, un colore personalizzato o un colore di filamento configurato. Assegnare la fessura del filamento effettivo all'esportazione.
- **Bordo inferiore** aggiunge una fascia di proiezione intorno alla base. Scegli un assetto liscio, a strisce o a passo e imposta la sua altezza. Una manica compatibile può poggiare su di esso. Trim richiede un corpo finoto, singolo pezzo ed è disponibile sul primo livello. I pannelli separati siedono sopra di esso con l'offset bordo selezionato.
- **Rilievo dell'organizzatore** aggiunge un modello sollevato direttamente alla parete esterna. Scorrere il catalogo del modello, impostare la dimensione del pattern e l'altezza di rilievo, e guardare l'aggiornamento del modello durante il trascinamento come ogni calcolo termina. Il valore finale utilizza la massima precisione. L'interno rimane liscio. Le proiezioni aumentano le dimensioni esterne. Scegliere **Liscio** per rimuovere il rilievo.
- **Firma e distintivo** mette lettere o un simbolo su un lato selezionato. Inserire il testo, scegliere un carattere, impostare l'altezza della lettera e la posizione verticale, quindi scegliere le lettere sollevate o l'incisione e impostare la sua altezza o profondità. Una stella o un cuore possono accompagnare il testo. Su organizer circolari e ovali, testo e icone seguono la parete curva, compreso in STL e 3MF esportazioni. La spaziatura delle lettere è misurata lungo la superficie. Scegli Fronte, Posteriore, Sinistra o Destra per centrare l'iscrizione da quel lato. Su cerchi e ovali con altezze di parete collegate o variabili, lettering rimane al di sotto del profilo di parete più basso e cutout. Le lettere a nido d'ape non sono ancora supportate; le rivestimenti che coprono il lato scelto e il rilievo possono anche impedire la lettering. La scrittura a parete piana richiede ancora un profilo costante. Se l'iscrizione viene eseguita in un ritaglio o supera il volto disponibile, abbassare la posizione o ridurre la dimensione della lettera.

<a id="inserts-tiers-and-lids"></a>
## Inserti, livelli e coperchi

**Inserti rimovibili.** Seleziona uno scomparto e apri **Inserto baia** a destra. **Vuoto** crea un contenitore aperto, **Per piccole cose** una griglia con righe e colonne regolabili, **Per maniglie** sedi per penne o utensili. Indica il diametro interno; l’app ne dispone quante ne entrano. Scegli un contorno adattato allo scomparto, arrotondato, circolare, ovale o esagonale e un colore. **Rimuovere l'inserto** rimuove l’inserto. Anche un inserto vuoto è un pezzo stampabile.

L'inserto segue il suo scomparto con almeno 0,5 mm di distanza. Le sue pareti e il fondo sono di 1,2 mm di spessore e la sua altezza si regola per terminare circa 1 mm sotto il bordo. Un inserto in un organizer inclinato esce lungo il pendio. Isolare **Inserti** per ispezionare, quindi esportare **Organizer e accessori**.

**Vassoi bloccati.** Iniziare con un cerchio di livello, poi aprire **Forma → Livelli → + Livello**. È possibile utilizzare due a cinque livelli; **- Livello** rimuove un pareggio. I livelli condividono un'impronta ma possono avere scomparti diversi, altezze, colori e decorazioni.

1. Nel menu a tendina accanto a **Organizer** sopra il modello, scegliere **Livello 1**, **Livello 2**, o un altro livello.
2. Modificare il livello selezionato con la forma abituale, il compartimento, i comandi di rilievo e di shell, cambiando il livello non copia le impostazioni ad altri livelli.
3. Scegli **Visualizza pila** nella stessa discesa per ispezionare tutti i livelli e gli accessori insieme. Utilizzare **Insieme**, **Organizer**, **Inserti**, **Rivestimento** o **Coperchio** per mostrare le parti di cui hai bisogno. Torna a un livello numerato per continuare a modificarlo.
4. In **Forma** → **Livelli**, regola **Gioco di adattamento** e prova l’accoppiamento con un piccolo campione prima di stampare tutta la pila. Abbassa i divisori che superano il bordo. Servono pareti verticali e un bordo di appoggio continuo.

Rilievo incorporato e SVG decorano l'esterno di ogni tier mentre i collettori di accoppiamento, le lingue e le prese rimangono lisce. Le rivestimenti e i pannelli decorativi Wrapped possono coprire i singoli livelli. Per i pannelli, tenere **Offset del bordo** almeno 3 mm in modo da sgomberare i collettori di accoppiamento.

Con un rivestimento avvolgente, una linguetta all’interno della parete inferiore entra in una sede sotto il fondo del vassoio superiore. Larghezza, profondità e altezza utile degli scomparti non cambiano; ogni sede aggiunge 2,2 mm all’altezza esterna della pila. I rivestimenti si incontrano su una fascia di appoggio di 0,8 mm. Si infilano dall’alto: separa i livelli prima di rimuoverli. Ogni rivestimento viene esportato separatamente con il numero del livello.

**Bordo inferiore** è disponibile solo sul primo livello (più basso): scegliere liscio, anelli o passi. Con un rivestimento avvolta compatibile, l'assetto supporta anche il rivestimento. I pannelli separati siedono sopra il bordo con l'offset selezionato. I nuovi livelli superiori non ereditano l'assetto. Se la lingua non può adattarsi allo spessore della parete, ridurre **Gioco di adattamento**; l'applicazione non addensa automaticamente la parete.

**Coperchio.** Apri **Forma** → **Coperchio** e premi **+ Copertina**. Il bordo superiore deve avere altezza uniforme e i divisori non devono sporgere. Inclinazione, nido d’ape e stampa suddivisa non sono compatibili. **Esterno** copre l’esterno; **A incasso** è una piastra di 2 mm a filo dell’interno. La sua sede lascia 0,35 mm di gioco per lato e spazio sopra divisori e inserti. Servono almeno 2 mm di parete e 4 mm di profondità interna. Aggiungi un incavo o una maniglia per sollevarlo. Il coperchio esterno ha un bordo di centraggio con gioco di 0,5 mm. Regola motivo, dimensione, profondità, altezza del bordo e finitura. La maniglia può essere cilindrica o allungata, con dimensioni, altezza, smussi e raccordi regolabili. Si stampa separatamente e si incolla. L’anteprima mostra il coperchio esterno sollevato e quello interno inserito. Nell’esportazione il coperchio è disposto in piano per la stampa.

**Motivo bicolore** è disponibile per entrambi i tipi di coperchio. Scegli ramo d’ulivo, foglie di ginkgo, felce, onde, ciottoli, anelli di crescita o celle di Voronoi, quindi i colori di base e motivo. La piastra di 3,2 mm comprende un fondo pieno di 1,6 mm e uno strato decorato di 1,6 mm. Bordo esterno e maniglia aumentano l’altezza totale. Per il coperchio a incasso servono almeno 5,2 mm di profondità interna. Esporta in 3MF per mantenere insieme le due parti colorate e assegna i filamenti. Per ulivo, ginkgo, felce, onde e anelli, **Motivo traforato** crea aperture nello strato superiore. **Motivo in rilievo** lascia vuote le aperture profonde 1,6 mm, mostrando il fondo; disattivalo per un intarsio liscio. I coperchi a incasso in rilievo si stampano con il fondo verso il basso, quelli esterni con il motivo verso il basso. Controlla i ponti sopra gli incavi nello slicer.

![Sei modelli di coperchio bicolore](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Rivestimenti interi e pannelli

Aprire **Rivestimento** e scegliere un modello. Una scocca viene stampata separatamente dall'organizer. Se si desidera il modello sul corpo stesso, utilizzare **Forma → Rilievo dell'organizzatore**.

| Modalità Shell | Adattamento e montaggio |
| --- | --- |
| **Intorno al corpo** | Una manica senza fondo segue l'altezza del perimetro e della parete. Scorrerla sopra il corpo dall'alto, seguendo la direzione della parete su un modello inclinato. Il pannello indica se una sporgenza di supporto è presente o la manica poggia sul tavolo. |
| **Pannelli decorativi** | I pannelli incorniciati separati coprono i lati selezionati e lasciano gli angoli esposti. Scegliere i lati e regolare **Offset del bordo**. Pannelli in colla senza fissaggio. Con perni nascosti, premere ogni pannello dritto sulla sua parete di corrispondenza per un fissaggio permanente. |

![Vista superiore di una manica che avvolge gli angoli e pannelli separati che terminano prima di ogni angolo](../../images/shell-fit.svg)

Scegliere il modello, impostare la sua dimensione e set **Spessore del guscio**. Per una manica a un pezzo, regolare **Larghezza del bordo** per il suo telaio solido. Pannelli decorativi hanno un telaio fisso; uso **Offset del bordo** per posizionarli sul muro. Sottotitolo **Atterraggio**, **Gioco su ciascun lato** imposta il divario tra manica e organizer. Una distanza di 0,5 mm su ogni lato aggiunge 1 mm su due lati opposti prima di contare lo spessore della shell. Confronta **Insieme** con l'isolato **Rivestimento** vista per giudicare il risultato. **↓ Scarica la shell** esporta la copertura separatamente, e **Rimuovere il guscio** lo rimuove dal design.

I pannelli richiedono una base rettangolare compatibile. Selezionarli non modifica spessore delle pareti o spazio interno. I fissaggi nascosti richiedono pareti di almeno 3,2 mm senza rilievo. Per pareti più sottili, comprese quelle da 2,4 mm, usa pannelli senza fissaggi e incollali. Le pareti non vengono ispessite automaticamente. Il margine del pannello misura la distanza dal bordo della faccia; il gioco del rivestimento avvolgente regola lo scorrimento. Con una fascia inferiore, il margine in basso parte dalla sua sommità; fissaggi e sedi seguono lo stesso profilo. Sui livelli impilati servono almeno 3 mm di margine per lasciare liberi i bordi di accoppiamento.

<a id="projects-and-backups"></a>
## Progetti e copie di sicurezza

Uso **I miei progetti → Salva una copia** per nominare un disegno o fare una variante prima di sperimentare. Il progetto aperto salva automaticamente in questo browser. La libreria ti permette di cercare, aprire, rinominare, eliminare o scaricare un progetto. **Salva progetto** nella barra superiore scarica una modificabile JSON rinforzi. Uso **Apri** caricare quel file, incluso su un altro computer o in un'installazione locale.

Una copia di recupero locale temporanea protegge le modifiche mentre il database del browser sta salvando; la riapertura ripristina quella copia se una scrittura è stata interrotta. Un'istantanea di ultima riuscita separata può recuperare una sessione corrente danneggiata, inclusa la cronologia di undo. Se nessuna copia valida può essere ripristinata, il salvataggio automatico si ferma invece di sostituire il progetto memorizzato con un modello di avviamento.

Cambiando questi invalida il controllo precedente; un vecchio risultato non può essere scaricato come nuovo modello. I calcoli non eseguiti mantengono modifiche. Un'anteprima bloccata segnala un errore dopo due minuti; la successiva modifica della geometria inizia un nuovo calcolo.

Quando lo stesso progetto o cassetto viene modificato in più schede, le modifiche in conflitto vengono salvate come una **Copy from another tab**. L'altra versione viene mantenuta, e la scheda di modifica continua con la sua copia. Confrontare le versioni in **I miei progetti** o il selettore del cassetto e rinominare la copia se si desidera tenerla. Riaprire una scheda organizer ripristina il proprio progetto salvato.

Mantenere un backup scaricato prima di cancellare i dati del browser. Ogni indirizzo del browser e del sito ha una propria libreria. Le slot di filamento sono memorizzate separatamente per la stampante nel browser. Impostare di nuovo quando si sposta su un altro dispositivo. Per l'applicazione locale scaricabile, vedere [Installazione locale](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Impostazioni di stampa e suddivisione

Sotto **Stampa**, selezionare la stampante e la configurazione della testa o scegliere **Dimensioni personalizzate**. Controllare la larghezza, la profondità e l'altezza della costruzione. Il preset fornisce il volume di stampa. Scegli la stampante, l'ugello, il materiale e i profili di slicing nel vostro slicer.

Se il modello supera il piano di stampa, usa i tagli proposti oppure scegli due o tre sezioni, quando disponibili. Controlla le giunzioni con **Allontanare le parti**. La divisione porta le pareti ad almeno 5 mm e il fondo ad almeno 3 mm: verifica nuovamente le misure interne. Prima rimuovi rivestimenti e inserti. I modelli a più livelli, inclinati, circolari, ovali o a nido d’ape richiedono la stampa in un unico pezzo. **Restituisce il modello solido** disattiva la divisione. Ricontrolla gli spessori se vuoi ripristinare le misure precedenti.

**↓ Joint sample** downloads accoppiamento termina per provare alla stessa scala e le impostazioni di stampa del corpo finale. Mettili separatamente con le loro basi giù. Dopo il raffreddamento, i perni nominali Ø 3.2 × 8 mm si adattano a fori Ø 3.3 mm, profondi 4,5 mm su ogni lato della cucitura. Controllare l'allineamento, quindi utilizzare pin e colla per assemblare le sezioni stampate. Uso **↓ Scarica tutte le parti** per l'organizer a sezione stessa.

<a id="download-and-slice"></a>
## Download e preparazione nello slicer

1. In **Stampa** → **Slicer filaments**, usa gli stessi numeri e colori dello slicer. Su Snapmaker U1, gli slot 1–4 corrispondono alle testine T0–T3. Puoi configurare fino a 16 slot, ciascuno con colore e nome del materiale. Il colore è un riferimento approssimativo, non una simulazione della tonalità stampata o miscelata; imposta le miscele esatte nello slicer. Seleziona una scheda e premi **Delete filament from slot N** per eliminare il filamento. Gli altri numeri non cambiano: eliminando lo slot 6, il 7 resta il 7. **+ Slot N** riutilizza il numero libero più basso; il limite resta 16. L’eliminazione non cambia il colore del modello. Gli slot rimossi non vengono proposti né associati automaticamente all’esportazione; scegline un altro o assegnalo nello slicer. Colori diversi consentono l’abbinamento automatico. Se due slot hanno lo stesso colore, scegli quello voluto per ogni pezzo nella finestra di download.
2. Clicca su **↓ Scarica**. Scegli **Organizer e accessori**, **Solo guscio** o **L'intero set**, in base a quali parti hai bisogno. Per un modello a sezione, esporta il kit.
3. Per 3MF, assegnare una fessura di filamento ad ogni parte o lasciarlo per l'assegnazione nella fessura. Orca può utilizzare il primo filamento per parti senza assegnazione.
4. Leggi le dimensioni di ogni parte e le istruzioni per ruotarlo a 90° sul piano di stampa. Il controllo si riserva 2 mm ai bordi del piano di stampa. Scarica con il formato pulsante nella parte inferiore del dialogo.
5. Aprire il risultato nel vostro slicer a **Scala al 100% in millimetri**. Organizzare il set completo, controllare sporgenze e dettagli sottili, e visualizzare in anteprima il primo strato e divisori. Per una stampa multicolore, verificare l'assegnazione del filamento di ogni parte prima di slicing.

| Formato | Scegli per | Cosa fare con il download |
| --- | --- | --- |
| STL | Geometria per stampa monocolore | Aprire la STL nella fette. Estrarre la ZIP prima se l'esportazione contiene diversi STL. |
| 3MF | Un kit con parti separate, colori e assegnazioni di filamento | Apritelo nel vostro slicer e verificate le parti e le fessure. ReplixGrid lascia la stampante e i profili materiali alla fessura. |
| OBJ + MTL | Un modello colorato per uno strumento che accetta OBJ | Tenere insieme la geometria e il file materiale. Il modello utilizza millimetri con Z in su. |
| Progetto JSON | Proseguendo per modificare scomparti, dimensioni o accessori | Utilizzare **Salva progetto** e riaprirlo con **Apri** in ReplixGrid. |


Per usare lo stesso colore digitale dello slicer, inserisci il **HEX code** di sei caratteri, per esempio `#E63522`, accanto al selettore del colore. Il `#` iniziale è facoltativo. Un codice valido aggiorna subito l’anteprima. Un valore incompleto o errato non viene applicato; uscendo dal campo torna il colore salvato. Il codice non simula l’aspetto reale del filamento, l’illuminazione o la miscelazione fisica dei colori.

<a id="troubleshooting"></a>
## Risoluzione dei problemi

| Che cosa vedi | Cosa controllare |
| --- | --- |
| L'oggetto si adatta alle dimensioni esterne ma non si adatta in una baia | Selezionare lo scomparto e controllare le misure interne. Permette lo spessore della parete, le estremità curve, il raggio d'angolo interno e gli inserti rimovibili. |
| La selezione di un divisore continua a selezionare la parete davanti | Passare a **Dall’alto** o aprire **Tutte le pareti e i compartimenti** sulla destra. |
| Il coperchio o il prossimo livello non possono essere aggiunti | Controllare un cerchio di livello, altezza esterna uguale, divisori sporgenti, inclinazione o stampa divisa. Per uno stack, controllare anche clip di shell legacy e la distanza in forma rispetto allo spessore della parete. |
| Una parte supera il piano di stampa, anche se l'impronta sembrava abbastanza piccola | Tilt, rilievo, assetto e rivestimenti possono estendersi oltre la base. Controllare la configurazione e la rotazione della stampante selezionata. |
| I dispositivi di fissaggio nascosti del pannello non sono disponibili | Utilizzare pareti di almeno 3.2 mm di spessore senza rilievo, o lasciare elementi di fissaggio fuori e incollare i pannelli. |
| I pannelli si sovrappongono al bordo inferiore o al cerchio in un vecchio design | Impostare un bordo di offset di almeno 3 mm per piastre. L'offset inferiore viene misurato dalla parte superiore del bordo inferiore. Rigenerare e scaricare le parti dopo aver modificato le impostazioni. |
| Una stampa scaricata ha i colori sbagliati | Utilizzare 3MF, abbinare i numeri di slot in **Stampa**, quindi ispezionare le assegnazioni per parte nella fessura. STL trasporta solo la geometria. |
| Manca un disegno salvato su un altro dispositivo | Trasferire il suo progetto JSON e utilizzare **Apri**. Le librerie del browser sono locali per ogni dispositivo e indirizzo del sito. |

<a id="project-variants"></a>
## Varianti del progetto

Fare clic su **+ Variante** nella barra superiore o aprire **I miei progetti** e selezionare **Nuova variante**. Inserisci un nome e fai clic su **Crea variante**. La nuova variante è una copia indipendente; l'originale rimane salvata. Un originale non chiamato viene mantenuto come **Bozza**.

Utilizzare il selettore accanto a **+ Variante** per passare tra i modelli correlati, o scegliere uno sotto **Varianti di questo progetto** nei miei progetti. Ogni variante salva automaticamente e mantiene la propria cronologia disfare/redo dopo aver commutato o ricaricato. Una variante appena creata inizia con una storia vuota.

Utilizzare **Progetto separato → Salva una copia** per creare un progetto non correlato. Rinominare o eliminare singoli modelli nei miei progetti; cancellare l'originale non cancella le sue varianti.

**↓ Scarica** esporta il modello selezionato per la stampa. **Salva progetto** scarica quel modello come modificabile JSON; **File** su una scheda di libreria scarica il modello corrispondente. JSON contiene un modello, senza le relative varianti o cronologia annulla. Salva ogni modello separatamente per trasferire o eseguire il backup del set completo.


<a id="shared-styles"></a>
## Stili condivisi

1. Aprire un progetto con i colori e i modelli che si desidera riutilizzare.
2. Sotto **Forma → Stile comune**, inserire un nome e fare clic su **Salva lo stile attuale**.
3. Apri un altro progetto o variante, torna allo stile **Stile comune** e seleziona lo stile salvato.
4. Scegli **Colori**, **Motivi**, o entrambi. Review **Verrà applicato** e qualsiasi **Verrà ignorato** messaggi, quindi fare clic su **Applica stile**.

Uno stile cattura il colore e il rilievo dell'organizer, più i colori e i modelli di un rivestimento esistente e coperchio. Uno stile corpo liscio rimuove il rilievo del corpo della destinazione. Dimensioni, layout del compartimento, spessori della parete, vestibilità del coperchio, maniglie e sgomberi della shell rimangono invariati.

L'applicazione è un passo annullato e crea una copia indipendente: in seguito le modifiche a un organizer non cambiano gli altri.

Un progetto JSON conserva l'aspetto applicato, ma non include la libreria in stile salvato. Per riutilizzare uno stile su un altro dispositivo, aprire il progetto in stile JSON lì e salvare il suo stile attuale di nuovo.


<a id="drawer-arrangements"></a>
## Disposizione degli organizer nel cassetto

Scegli **Drawer** accanto a **Organizer**, poi **Create drawer**. Inserisci la lunghezza, la larghezza, l'altezza e lo sdoganamento misurati. La pulizia si applica sia alle pareti dei cassetti che tra i vassoi.

I nuovi cassetti iniziano a 180 × 280 mm, con il bordo anteriore segnato in basso. **Vista rotativa di 90°** cambia solo l'orientamento di visualizzazione; le dimensioni del cassetto, le coordinate del vassoio e i modelli esportati rimangono invariati. Le disposizioni del cassetto esistenti conservano le loro dimensioni. I cassetti salvati si aprono con lunghezza orizzontale e larghezza verticale; le etichette delle dimensioni seguono la rotazione manuale della vista.

Utilizzare **New organizer** per creare un vassoio direttamente nel cassetto. Impostare le sue dimensioni, quindi modificare scomparti e accessori nel solito editor organizer. **← Back to drawer** torna al suo posizionamento. **Add saved organizer** aggiunge una copia indipendente di un progetto o variante salvata; modificarlo non cambia mai la sua fonte.

Trascinare i vassoi in alto a vista o inserire le coordinate X/Y misurate dall’angolo in alto a sinistra ai limiti esterni del vassoio. Ruotare di 90 gradi, duplicare o rimuovere i vassoi. I tasti freccia spostano un vassoio concentrato di 1 mm (Shift: 10 mm).

Il diagramma mostra rettangoli esterni montati, tra cui rivestimenti, rifiniture, coperchi e piastre. Le forme curve vengono controllate in modo conservativo piuttosto che strettamente nidificata. Vengono evidenziati conflitti di altezza, di sdoganamento e di altezza. Attendere il controllo della geometria prima di affidarsi allo stato di forma.

I cassetti salvano localmente in questo browser, separatamente dai progetti dell'organizer. Scaricare un file JSON del cassetto per il backup o il trasferimento; aprirne uno crea una copia separata del cassetto. Seleziona un vassoio e scegli **Download selected tray** per la sua esportazione STL, 3MF o OBJ con i controlli di formato della stampante esistenti.

<a id="mounting-plates"></a>
### Piastre di montaggio

In **Drawer → Drawer base**, scegliere **Mounting plate**. La lunghezza del cassetto/larghezza e la clearance della parete determinano l'area coperta. Inserire la larghezza e la profondità utilizzabili della **Letto stampante 3D** separatamente: queste dimensioni determinano la dimensione massima della sezione e quindi il numero di sezioni. Il calcolo comprende proiezioni articolari e un margine di stampa di 2 mm su ogni bordo del piano di stampa. Le dimensioni non devono essere multiple della griglia di peg da 20 mm; le sezioni di bordo si adattano allo spazio rimanente.

**Download sections (ZIP)** crea un 3MF numerato per ogni stampa, una mappa di montaggio SVG e un elenco di coordinate. La mappa conserva l’orientamento originale del cassetto, indipendentemente dalla vista: R indica le righe dall’alto in basso e C le colonne da sinistra a destra. Inserisci dall’alto i giunti a coda di rondine. Stampa prima **Download joint sample**, con due piccole sezioni adiacenti, e verifica l’accoppiamento. La giunzione usa una distanza di 0,05 mm e una tolleranza di profilo di 0,03 mm. Tra le sezioni ancora libere possono rimanere una sottile fessura e un leggero gioco.

Con la modalità a piastre abilitate, i download del vassoio includono le prese laterali per la posizione e la rotazione del vassoio. Le dimensioni del vano interno sono conservate. Il vassoio diventa più alto di 2,1 mm; tra cui la piastra di 2 mm, il controllo del cassetto aggiunge 4.1 mm. Dopo aver spostato o ruotato un vassoio, scaricalo di nuovo: le prese devono corrispondere alle posizioni del peg.

Lo sdoganamento radiale a presa è di 0,12 mm. Stampare un piccolo organizer che spazia da due sezioni per verificare la vestibilità con le impostazioni del materiale e dello strato. Le prese mantengono l'organizer lateralmente; sollevarlo verso l'alto per rimuoverlo. Export utilizza solo la geometria: scegli la stampante e i profili dei materiali nella fessura e ispeziona i tetti delle prese prima della stampa.

Il fissaggio supporta attualmente organizer non divisi e senza inclinazione, con almeno tre sedi completamente supportate. I vassoi piccoli potrebbero richiedere uno spostamento o un ingrandimento. Livelli superiori e rivestimenti mantengono la geometria. Disattiva la modalità piastra per esportare il modello originale senza sedi. I progetti sorgente salvati non cambiano.

<a id="custom-svg-relief"></a>
## Rilievo SVG personalizzato

Sotto **Forma → Rilievo dell'organizzatore → My SVGs**, scegliere **Upload SVG** o rilasciare un file nell'area di caricamento. Selezionare una miniatura salvata per riutilizzarlo. La stessa libreria è disponibile sotto **Forma → Coperchio → My SVGs** e **Rivestimento → Pattern → My SVGs**. Ogni obiettivo mantiene le proprie impostazioni di schema e posizionamento.

Scegli **Single motif** o **Repeat**, selezionare le pareti esterne, e regolare la larghezza del motivo in millimetri, rotazione, orizzontale / verticale offset, e ripetere il gap. Larghezza e altezza mantengono le proporzioni originali. Il posizionamento è incentrato su ogni lato selezionato; su corpi curvi i lati corrispondono a quattro settori esterni. L'offset verticale positivo sposta il motivo verso l'alto. Il modello segue il contorno esterno. Le ripetizioni sono posizionate solo dove un motivo completo si inserisce sotto il bordo superiore, intorno ritagli e all'interno di ogni lato. I motivi singoli sono ritagliati a questi confini. La profondità del rilievo utilizza l'esistente **Profondità del sollievo / Intensità** controllo. Le pareti originali e i comparti interni sono conservati; le dimensioni esterne aumentano. Attendere fino a quando l'anteprima aggiornata termina, quindi controllare e scaricare la parte.

I SVG supportati contengono percorsi riempiti, poligoni, rettangoli, cerchi o ellisse, compresi i fori e le trasformazioni di gruppo. Converti testo e tratti in percorsi riempiti prima di esportare dal tuo editor vettoriale. Foto, riferimenti esterni, filtri, maschere, percorsi di ritaglio, gradienti, blocchi di stile CSS e riferimenti a elementi riutilizzabili ( `use` ) non sono supportati. Le definizioni vuote o inutilizzate contenenti forme supportate vengono ignorate. I colori diventano una forma unica sollevata utilizzando il colore dell'organizer. I limiti sono 200 KB, 512 elementi XML, 128 forme riempite e 6.000 punti di contorno campionati; modelli eccessivamente complessi o ripetizioni eccessive vengono respinti con un messaggio. Le curve sono approssimate da contorni poligonali per la stampa.

Ogni progetto incorpora una copia indipendente dei suoi contorni utilizzati, quindi i progetti scaricati possono essere riaperti su un altro dispositivo senza la sorgente SVG o la biblioteca. Eliminare una voce di libreria lascia i progetti esistenti invariati. **Stile comune** trasporta anche corpo personalizzato, coperchio e shell pattern ad un altro organizer.

<a id="choose-an-svg-for-its-intended-use"></a>
### Scegliere un SVG adatto all’uso

Un SVG è un formato di disegno, non una garanzia di geometria stampabile. **Il successo dell'importazione significa solo che sono stati letti i contorni riempiti supportati.** La superficie scelta, la dimensione e la modalità di applicazione devono ancora passare il controllo della geometria.

| Uso intenzionato | Ciò che le aree riempite diventano | Cosa preparare |
| --- | --- | --- |
| Rilievo dell'organizer | Materiale rialzato attaccato ad una parete solida | I motivi separati e i fori interni possono funzionare perché la parete li supporta. |
| Modello di coperchio rialzato | Materiale rialzato su un supporto solido | I fori interni sono consentiti; tenere l'intero disegno all'interno del telaio disponibile e liberare dall'atterraggio della maniglia. |
| Lid attraverso le aperture | Materiale rimosso dal coperchio | Ogni pezzo rimanente deve connettersi al coperchio circostante. I dettagli interni chiusi hanno bisogno di ponti stencil. |
| Conchiglia montata o pannelli decorativi | Aperture tagliate attraverso la copertura | Utilizzare un disegno compatibile con stencil. La struttura e il modello rimanenti devono formare materiale collegato. |

Per preparare un file:

1. Mantieni i tracciati pieni e le forme utili. Converti il testo e **i tratti in contorni pieni** nell’editor vettoriale. Una linea con `fill="none"` è un tratto, non una superficie piena.
2. Elimina i rettangoli di sfondo, a meno che tutta la loro area debba diventare rilievo o apertura. I colori SVG non separano i materiali; le forme bianche non ritagliano automaticamente quelle scure sottostanti.
3. Controlla i tracciati composti. Un commento «foro» non crea un foro: il verso dei tracciati e `fill-rule` determinano il riempimento.
4. Per i fori passanti, collega i dettagli racchiusi al materiale circostante con ponti. Aumentare la distanza tra le ripetizioni **non** fissa un dettaglio isolato nel motivo. In alternativa, usa il rilievo sul coperchio.
5. Per la ripetizione è preferibile un file con un solo motivo. Se contiene già una griglia, la larghezza ridimensiona **l’intera griglia**, non ogni motivo separatamente. I dettagli piccoli possono diventare troppo sottili.
6. Attendi il completamento corretto del calcolo e della verifica di esportazione, poi controlla il modello nello slicer. Se il calcolo fallisce, può restare visibile l’ultima anteprima valida, che non rappresenta le impostazioni attuali non riuscite.

La sagoma piena di una foglia può diventare un rilievo oppure un’apertura. Una nervatura completamente circondata resta sostenuta dal fondo in modalità rilievo, ma può staccarsi se si ritaglia la foglia circostante. Una griglia esagonale è adatta alla foratura se i ponti di materiale restano collegati e abbastanza spessi. Un disegno multicolore composto da tratti deve prima essere convertito in contorni pieni.

<a id="svg-lids-and-perforated-shells"></a>
### Coperchi SVG e rivestimenti traforati

Aggiungere un coperchio, quindi scegliere **My SVGs**. **Raised relief (decoration)** fa un singolo coperchio collegato con il motivo su un supporto solido; impostare la sua altezza di rilievo (0.2–1 mm) e il colore di base. **Through stencil (cut)** rimuove le aree SVG riempite attraverso il coperchio. Entrambe le modalità conservano un telaio di bordo 2 mm e il labbro di atterraggio.

Per un rivestimento, selezionare **My SVGs**, quindi un disegno della libreria. Le aree riempite diventano attraverso le aperture. Utilizzare un motivo o ripetizioni sui lati selezionati di una manica avvolta. Su **Pannelli decorativi**, il disegno viene ripetuto in modo indipendente su ogni pannello selezionato; le strutture esistenti e le posizioni di montaggio sono mantenute. La dimensione iniziale del motivo tiene conto dell'altezza della shell.

Su coperchi e rivestimenti, solo i motivi completi sono collocati all'interno del telaio disponibile, compresi i singoli motivi. Se non si adatta, ridurre la dimensione o l'offset. Dettagli interni chiusi (ad esempio il centro di una cutout a forma di anello) possono diventare isole sciolte.

I modelli sono inclusi nelle esportazioni individuali, nei kit completi e nei lavori di stampa a tutto tondo. Passare indietro a **Built-in** rimuove il modello personalizzato solo da quel bersaglio.

<a id="download-ready-to-use-stencil-svgs"></a>
### Scaricare stencil SVG pronti all’uso

Questi esempi contengono contorni pieni con ponti di materiale. Le zone nere diventano aperture in modalità **Through stencil (cut)**. Salva i file dei collegamenti seguenti con estensione `.svg`. Se il browser mostra il disegno, usa il comando per salvare la pagina e conserva l’estensione.

| Scarica | Modello | Larghezza di partenza consigliata |
| --- | --- | --- |
| [Foglie organiche — scaricare SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinque foglie con ponti che collegano i dettagli interni | 20 mm; ridurre per un rivestimento basso |
| [Doppia esagono — scaricare SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Una piastrella a doppio esagonale con quattro ponti e un'apertura centrale | 20–24 mm; usare **Repeat** per una griglia |

**Su un coperchio:** aggiungere un coperchio sotto **Forma → Coperchio**, aperto **My SVGs**, e caricare entrambi i file. Scegli **Through stencil (cut)**. Iniziare con **Single motif** per ispezionare o selezionare **Repeat** per riempire l'area disponibile con copie complete. Impostare la larghezza, la rotazione e gli offset X/Y. Ripetere la spaziatura è il divario tra copie complete, non la larghezza dei loro ponti interni. Iniziare con 4 mm di spaziatura. Il file foglia è già un gruppo di cinque foglie: la larghezza scala l'intero gruppo.

**Sul rivestimento:** apri **Rivestimento** → **Pattern** → **My SVGs**, oppure la scheda **Rivestimento** nello studio, e seleziona il file dalla libreria condivisa. I rivestimenti supportano solo aperture passanti. **Repeat** ripete il motivo attorno al rivestimento; **Ulteriori** → **SVG walls** seleziona i lati del rivestimento avvolgente. I pannelli decorativi usano i lati selezionati per i pannelli. Ogni superficie conserva le proprie impostazioni di posizione e spessore. Cambiando scheda, l’anteprima mostra il pezzo corrispondente.

Se un motivo non si adatta, ridurre la sua larghezza o offset. Su un rivestimento basso, prova 12–16 mm per il gruppo fogliare. Aumentare lo spessore della shell può ingrandire il suo bordo automatico e lasciare meno spazio per il disegno. Scaling down inoltre restringe i ponti: ispezionarli nel vostro slicer e stampare un piccolo campione per il vostro ugello e materiale. Ripetere la spaziatura non può allargare i ponti interni. Attendere l'anteprima corrente per finire, quindi utilizzare **↓ Scarica** controllare ed esportare il coperchio o la shell.

<a id="numeric-sliders-and-valid-ranges"></a>
### Cursori numerici e intervalli validi

Le impostazioni numeriche mostrano **Min** e **Max** sopra una sottile traccia verde, con un marcatore bianco per la geometria corrente. I tappi finali rossi segnano l'esterno dell'intervallo consentito; non sono un punteggio di resistenza alla stampa. Trascina il marcatore, usa i tasti freccia mentre si concentra, o digita un numero esatto e premi Invio. Il campo numerico e il cursore utilizzano gli stessi limiti. Alcuni limiti cambiano con il modello; un valore all'interno del range di esportazione di un altro conflitto.

<a id="whole-drawer-export"></a>
## Esportare l’intero cassetto

Scegli **Drawer → Print entire drawer** per preparare tutti i vassoi, i loro accessori e tutte le sezioni della piastra di montaggio abilitate. I vassoi montati ricevono prese per le loro posizioni salvate; i vassoi normali di freeplacement mantengono le basi esistenti. I progetti di stampaggio a spacco includono le loro parti e i loro perni.

Set **Printer bed length** (orizzontale), **Printer bed width** (verticale), altezza di stampa e spaziatura. Le dimensioni iniziali provengono dalle impostazioni della piastra di montaggio o dall'area di stampa del primo vassoio; le successive impostazioni di esportazione vengono salvate con questo cassetto. Le sezioni della piastra di montaggio vengono rigenerate per il piano di stampa scelto.

La disposizione usa gli ingombri reali dei pezzi esportati, un margine di 2 mm ai bordi del piano e la distanza scelta. I pezzi possono ruotare di 90°; i componenti di un coperchio multicolore rimangono insieme. Il numero di piani indicato si riferisce a questa disposizione e non garantisce il minimo possibile. Supporti, brim, torri di spurgo, zone escluse della stampante e lavori separati per materiale non sono inclusi. Riserva lo spazio necessario e verifica il risultato nello slicer. Non sono incorporati profili della stampante né assegnazioni dei filamenti.

Lo ZIP contiene **bed-NN.3mf** per ogni piano di stampa, abbinamento **bed-NN.svg** diagrammi, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** e un elenco di parti numerate in **README.txt**. Aprire ciascuno 3MF come lavoro di stampa separato, mantenere le posizioni relative dei suoi oggetti, utilizzare millimetri a scala 100% e assegnare filamenti. I diagrammi SVG diagrammi mostrano rettangoli di confine; i 3MF contiene la geometria stampabile completa. Le coordinate di montaggio del cassetto usano sempre la lunghezza orizzontalmente e la larghezza verticalmente.

Le modifiche al layout o alle impostazioni di esportazione invalidano il calcolo precedente. La chiusura della finestra annulla la preparazione. Le parti individuali di grandi dimensioni sono segnalate piuttosto che scalate silenziosamente o divise automaticamente.

<a id="pattern-studio"></a>
### Studio dei motivi

Scegli **Raised relief (decoration)** per il rilievo o **Through stencil (cut)** per le aperture passanti. I rivestimenti supportano solo le aperture. L’altezza appare solo in modalità rilievo e la distanza solo con le ripetizioni. **Material thickness** modifica anteprima ed esportazione: 1,2–6 mm per un coperchio SVG, 1–4 mm per un rivestimento. I valori predefiniti sono 3,2 mm per il rilievo e 2 mm per lo stencil; lo spessore scelto resta al cambio di modalità. L’altezza del rilievo è inclusa nello spessore. Un coperchio SVG a incasso richiede una profondità interna almeno pari allo spessore della piastra più 2 mm. **Ulteriori** contiene il colore del coperchio o i lati del rivestimento. **Which SVG files work?** spiega requisiti e preparazione.

Apri **Forma** → **Coperchio** → **My SVGs** oppure **Rivestimento** → **Pattern** → **My SVGs**. Le schede **Coperchio** e **Rivestimento** condividono la libreria ma mantengono impostazioni indipendenti. Cambiando scheda viene mostrato il pezzo corrispondente; se non esiste ancora, resta visibile l’insieme. Puoi tornare alla vista completa sopra il modello. Larghezza, rotazione, distanza e X/Y posizionano il motivo; il pulsante centrale ripristina posizione e rotazione. Il coperchio supporta rilievo e aperture; il rivestimento solo aperture. Cornici e zone di fissaggio restano intatte. **×** o **Escape** chiude lo studio attivo conservando le modifiche. Le frecce cambiano la scheda selezionata.
