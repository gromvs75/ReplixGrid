<a id="replixgrid-user-guide"></a>
# Manuale utente di ReplixGrid

Progettare un organizzatore in millimetri, controllare la sua forma e scaricare le parti per il vostro slicer. Per una prima costruzione, seguire l'esempio della capsula illustrata. Utilizzare questo riferimento quando si desidera modificare una parte particolare del vostro design.

[Apri ReplixGrid](https://grid.replixcast.com/?lang=it) · [Guida rapida](USER-GUIDE.md) · [Installazione locale](../../../README.md#local-installation)

| Voglio... | Vai a |
| --- | --- |
| Selezionare una parete, ruotare il modello o annullare una modifica | [Area di lavoro e viste](#workspace-and-views) |
| Scegli una forma, cambia dimensioni o appoggia le pareti in avanti | [Forma e dimensioni](#shape-and-dimensions) |
| Montare un oggetto in un vano o spostare un divisore | [Scomparti e divisori](#compartments-and-dividers) |
| Abbassare una parete, modellare il bordo o tagliare un'apertura del dito | [Altezza delle pareti e aperture](#wall-heights-and-cutouts) |
| Ammorbidire un cerchio, aggiungere la texture o mettere un nome sul corpo | [Angoli, bordi e decorazione](#corners-edges-and-decoration) |
| Aggiungere una tazza rimovibile, impilare i vassoi o adattare un coperchio | [Inserti, livelli e coperchi](#inserts-tiers-and-lids) |
| Stampa una copertura decorativa per l'esterno | [Rivestimenti interi e pannelli](#sleeves-and-panels) |
| Riaprire un disegno o spostarlo in un altro computer | [Progetti e copie di sicurezza](#projects-and-backups) |
| Scegliere una stampante, dividere un grande modello o assegnare filamento | [Impostazioni di stampa e suddivisione](#print-setup-and-sectioning) · [Download e preparazione nello slicer](#download-and-slice) |
| Tenere disegni alternativi o riutilizzare colori e modelli | [Varianti del progetto](#project-variants) **[Stili condivisi](#shared-styles)** |
| Organizza gli organizzatori in un cassetto misurato o fissarli a un piatto | [Disposizione degli organizer nel cassetto](#drawer-arrangements)**[Piastre di montaggio](#mounting-plates) |
| Importa opere d'arte per pareti, coperchi o un guscio perforato | [Rilievo SVG personalizzato](#custom-svg-relief) **[Studio dei motivi](#pattern-studio)** |
| Scarica tutte le parti del cassetto predisposte per la stampante | [Esportare l’intero cassetto](#whole-drawer-export) |
| Scopri perché un controllo o un download non è disponibile | [Risoluzione dei problemi](#troubleshooting) |

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

Aprire uno strumento in alto a sinistra. **Forma** cambia il corpo e i suoi accessori. **Scomparti** cambia il layout. **Rivestimento** progetta una copertura esterna separata. **Stampa** imposta il volume di costruzione, fessure di filamento e tagli di sezione facoltativi. Fare clic su un numero di scompartimento, parete o divisore sul modello per aprire le sue impostazioni a destra. Se una parte è difficile da cliccare, espandere **Tutte le pareti e i compartimenti** e selezionarlo per nome.

Il pannello sinistro è la navigazione della sezione. Selezionare una sezione per aprire solo le sue impostazioni nell'editor centrale e galleggiante in fondo all'anteprima. La scena e la griglia continuano dietro l'editor; l'apertura non taglia l'anteprima. L'editor utilizza gruppi compatti; non sostituisce il menu a sinistra. Il suo chevron collassa l'editore e **×** lo chiude. Scegli un'altra sezione a sinistra per cambiare le impostazioni. Il pannello destro rimane dedicato alla parete o allo scomparto selezionato.

Trascinare lo sfondo per ruotare, scorrere per ingrandire e trascinare con il pulsante destro del mouse su padella. **Restituisci la fotocamera** ripristina l'inquadratura della fotocamera. **Dall’alto** aiuta a selezionare uno scomparto stretto o spostare un divisore. **3D** mostra le altezze della parete e l'assemblaggio finito. **Griglia** consente di attivare la griglia di riferimento, con linee sottili ogni 10 mm e linee principali ogni 50 mm. Utilizzare i pulsanti della parte incentrati sopra il modello per isolare l'organizzatore, gli inserti, la shell o il coperchio quando presente. **Insieme** mostra le parti disponibili insieme per la vista corrente. Per più livelli, scegliere **Visualizza pila** nella discesa accanto **Organizer** per mostrare l'intero stack; scegliere **Livello 1**, **Livello 2**, o un altro tier per tornare a quel livello. L'editor delle impostazioni inferiori rimane aperto. In vista pila, **Rivestimento** e **Inserti** includere parti da tutti i livelli. Su finestre più strette questi pulsanti si spostano alla propria riga sotto le barre degli strumenti. Con il coperchio isolato, scegliere **Inferiore** per ispezionare il suo lato inferiore. Rassegna **Articolo** per chiudere il pannello degli strumenti. Utilizzare le frecce curve sopra il modello per annullare o rifare un cambiamento di progettazione.

Utilizzare la barra superiore per scegliere un linguaggio di interfaccia o passare tra aspetto chiaro, scuro e sistema. I nomi di controllo in questa guida seguono la lingua di interfaccia selezionata.

<a id="shape-and-dimensions"></a>
## Forma e dimensioni

Sotto **Forma → Base**, scegliere un profilo di base e altezza, quindi fare clic su **Crea da modello**. Il pulsante sostituisce la costruzione corrente. Salvare una copia di nome prima se si desidera mantenere entrambi i disegni. **Spazi semplici** offre anche un corpo vuoto e un punto di partenza di quattro componenti.

| Base | Quando scegliere |
| --- | --- |
| Arrotondato | Un'impronta rettangolare con angoli esterni regolabili. |
| Capsula | Un lungo corpo con estremità semicircolari. Il modello inclinato porta l'inclinazione attraverso entrambe le estremità curve. |
| Circolo | Un organizzatore rotondo dimensionato per diametro. |
| Ovale | Un profilo curvo allungato con larghezza e profondità regolabili separatamente. |
| Mielecombe | Un gruppo di celle esagonali che condividono pareti. Selezionare una cella per regolare la sua altezza. |

Scegli **Flat** per un cerchio di livello, **Inclinato** per un continuo aumento, o **Gradini** per livelli di altezza distinti. Le dimensioni sotto le scelte descrivono il modello che stai per creare. Una volta creato, modificare il modello sotto **Dimensioni**. La larghezza e la profondità misurano l'impronta esterna. Utilizzare le dimensioni interne dello scomparto selezionato quando dimensionarlo per un oggetto. Su una base curva, controllare anche le estremità di restringimento in **Dall’alto** vista.

![Capsule Sloped con una fascia bassa per l'accesso, un'estremità alta per oggetti lunghi e due divisori trasversali](../../images/capsule-sloped.jpg)

**Forma → Ulteriori** contiene spessore della parete e del fondo. Le pareti dello spessore prendono spazio dai compartimenti. **Inclinabile su base piana** appoggiano le pareti in avanti fino a 25° mentre il fondo rimane orizzontale. Questo differisce da un bordo inclinato, che cambia altezza della parete lungo il corpo. Con inclinazione abilitata, utilizzare le dimensioni finite nella finestra di dialogo download per controllare lo spazio della parte stampata occuperà.

<a id="exact-internal-dimensions"></a>
## Dimensioni interne precise

Seleziona un compartimento e usa **Dimensioni interne** nel pannello destro, o fai clic sulla sua etichetta di dimensione blu direttamente sul modello. Scegli larghezza o profondità, inserisci millimetri e fai clic fuori dal campo in linea da applicare. Inserisci anche applica; Escape annulla. Il pannello destro mantiene il pulsante Applica. I valori non validi non possono cambiare il modello. Ogni modifica impegnata può essere annullata in un passaggio.

Il divisore arancione è la sua posizione attuale; la linea blu schiacciata prevede la nuova posizione. La chiusura più vicina si muove sull'asse scelto, mantenendo invariata la dimensione del corpo esterno e lo spessore della parete. Il pannello mostra le dimensioni vicine interessate. Se non c'è divisore su quell'asse, regolare le dimensioni generali o dividere il vano prima.

In una semplice riga, inizia con il compartimento 1 e continua in ordine; l'ultimo scomparto prende il resto. Le dimensioni del quartiere non sono bloccate, quindi la modifica di un scomparto precedente può ridimensionare uno successivo.

Gli angoli arrotondati, i contorni delle capsule, i chamfer e i filetti interni rimangono supportati. La linea blu misura l'effettiva portata interna al vano centrale, appena sopra il pavimento. Lo spazio può restringere altrove intorno alle curve: aggiungere spazio e controllare l'intera impronta dell'oggetto. Cerchio, ovale, a nido d'ape e pareti inclinate non supportano attualmente la modifica esatta del vano.

Seleziona una parete o un divisore per modificare la sua altezza direttamente sul modello. Le pareti piatte mostrano un valore; i profili a due punti mostrano valori A/B. Le regole a parete e passo-passo corrispondono al pannello giusto. Queste etichette modificano l'altezza, non la lunghezza della parete o lo spessore globale.

<a id="compartments-and-dividers"></a>
## Scomparti e divisori

Per un layout rapido, utilizzare **Scomparti → + Scomparto** per dividere il più grande scomparto. **- Scomparto** fonde una coppia vicina. In un nido d'ape, questi controlli aggiungono o rimuovono una cella esterna e conservano la dimensione degli altri. Due celle a nido d'ape vicine condividono una parete alta come la cella più alta.

Per un layout esatto, passare a **Dall’alto** e selezionare il compartimento che si desidera dividere. Scegliere **Numero di parti**, poi **Spalato in larghezza** per dividere la larghezza in scomparti più stretti, o **Spalato in profondità** per fare quelli più scamoscianti. È possibile dividere di nuovo uno dei risultati. Per una porta matita accanto a due piccoli vassoi, prima dividere la larghezza in due, poi dividere solo la parte in due.

![Top-view esempio con una baia completa e due scomparti più piccoli](../../images/compartment-splits.svg)

Selezionare il divisore per trascinarlo, o regolare **Primo scomparto** sotto **Posizione della partizione**. Solo il divisore selezionato si muove; altre posizioni divisori rimangono fissi. I comparti adiacenti cambiano dimensione. Spostamenti che lasciano troppo poco spazio vengono respinti. Controllare le nuove dimensioni interne su ogni lato. **Rimuovere la partizione** combina i compartimenti e può anche rimuovere i divisori nidiati all'interno della divisione.

<a id="wall-heights-and-cutouts"></a>
## Altezza delle pareti e aperture

Seleziona una parete esterna o divisore. **Un'altezza** imposta un livello superiore. **Due punti** ti permette di impostare le altezze alle estremità **A** e **B**, che sono contrassegnate sul modello. Scegli **Diretto**, **Ondulato** o **Zigzag** per modellare il bordo lungo la parete.

Utilizzare **Collegare le altezze dei muri adiacenti** per fare una parete esterna seguire i suoi vicini. Per un divisore, **Adatta alle pareti adiacenti** copie le due altezze finali una volta. Ripetere la vestibilità dopo aver cambiato le pareti vicine. **Come gli altri** restituisce la parete selezionata all'altezza comune.

Aprire **Ritaglio nel muro** per fare un'apertura di accesso. Scegli uno scoop liscio, semicerchio o rettangolare, imposta la larghezza e la profondità, quindi spostalo lungo la parete. La posizione scorre dall'estremità A alla B. La profondità viene misurata dal bordo superiore. Ispezionare il labbro rimanente sopra il pavimento. Scegliere **Nessun ritaglio** per riempire l'apertura. Honeycomb utilizza l'altezza della cella invece.

<a id="corners-edges-and-decoration"></a>
## Angoli, bordi e decorazione

Apri **Forma → Angoli e smussi**. Tre controlli influenzano diverse parti della stampa.

| Controllo | Dove guardare | Cosa cambia |
| --- | --- | --- |
| Angoli esterni | Vista superiore, profilo esterno | Arrotondare gli angoli di impronta o tagliarli a 45°. Zero dà un angolo quadrato. Disponibile sulla famiglia rettangolare di basi. |
| Scomparti interni radiali | Vista superiore, all'interno di una baia | Rotonde la giunzione verticale dove due pareti si incontrano. |
| Bordo superiore di pareti e divisori | Sezione trasversale attraverso una parete | **Smusso** taglia un bevel piatto e **Arrotondato** curva il labbro. Entrambi i lati delle pareti esterne e dei divisori ricevono la finitura. **Nessuna** ripristina il labbro quadrato. |

![Sezioni trasversali a parete che mostrano angoli superiori squadrati e arrotondati con lo stesso spessore della parete](../../images/top-edge-profiles.svg)

Ad esempio, su una parete da 2 mm si prova una chamfer da 0,5 mm. Ogni lato perde 0,5 mm al piano superiore, lasciando una striscia piana da 1 mm. La dimensione massima visualizzata dipende dallo spessore della parete. Con **Arrotondato**, il valore è il raggio in millimetri.

- **Colore dell'organizzatore** cambia l'anteprima e le esportazioni di colore-capable. Scegliere un orologio, un colore personalizzato o un colore di filamento configurato. Assegnare la fessura del filamento effettivo all'esportazione.
- **Bordo inferiore** aggiunge una fascia di proiezione intorno alla base. Scegli un assetto liscio, a strisce o a passo e imposta la sua altezza. Una manica compatibile può poggiare su di esso. Trim richiede un corpo finoto, singolo pezzo ed è disponibile sul primo livello. I pannelli separati siedono sopra di esso con l'offset bordo selezionato.
- **Rilievo dell'organizzatore** aggiunge un modello sollevato direttamente alla parete esterna. Scorrere il catalogo del modello, impostare la dimensione del pattern e l'altezza di rilievo, e guardare l'aggiornamento del modello durante il trascinamento come ogni calcolo termina. Il valore finale utilizza la massima precisione. L'interno rimane liscio. Le proiezioni aumentano le dimensioni esterne. Scegliere **Liscio** per rimuovere il rilievo.
- **Firma e distintivo** mette lettere o un simbolo su un lato selezionato. Inserire il testo, scegliere un carattere, impostare l'altezza della lettera e la posizione verticale, quindi scegliere le lettere sollevate o l'incisione e impostare la sua altezza o profondità. Una stella o un cuore possono accompagnare il testo. Su organizzatori circolari e ovali, testo e icone seguono la parete curva, compreso in STATO e 3MF esportazioni. La spaziatura delle lettere è misurata lungo la superficie. Scegli Fronte, Posteriore, Sinistra o Destra per centrare l'iscrizione da quel lato. Su cerchi e ovali con altezze di parete collegate o variabili, lettering rimane al di sotto del profilo di parete più basso e cutout. Le lettere a nido d'ape non sono ancora supportate; le gusci che coprono il lato scelto e il rilievo possono anche impedire la lettering. La scrittura a parete piana richiede ancora un profilo costante. Se l'iscrizione viene eseguita in un ritaglio o supera il volto disponibile, abbassare la posizione o ridurre la dimensione della lettera.

<a id="inserts-tiers-and-lids"></a>
## Inserti, livelli e coperchi

**Inserti rimovibili.** Selezionare un vano, quindi espandere **Inserto baia** sulla destra. **Vuoto** fa una tazza aperta. **Per piccole cose** aggiunge una griglia con righe e colonne regolabili. **Per maniglie** crea prese per penne o strumenti. Impostare il diametro interno dell'orbita e l'app si adatta al maggior numero di quanto lo consente l'inserto. Scegli una sagoma arrotondata, circolare, ovale o esagonale e un colore. **Rimuovere l'inserto** Sgombera quella baia. Una tazza vuota è ancora una parte stampabile.

L'inserto segue il suo scomparto con almeno 0,5 mm di distanza. Le sue pareti e il fondo sono di 1,2 mm di spessore e la sua altezza si regola per terminare circa 1 mm sotto il bordo. Un inserto in un organizzatore inclinato esce lungo il pendio. Isolare **Inserti** per ispezionare, quindi esportare **Organizer e accessori**.

**Vassoi bloccati.** Iniziare con un cerchio di livello, poi aprire **Forma → Livelli → + Livello**. È possibile utilizzare due a cinque livelli; **- Livello** rimuove un pareggio. I livelli condividono un'impronta ma possono avere scomparti diversi, altezze, colori e decorazioni.

1. Nel menu a tendina accanto a **Organizer** sopra il modello, scegliere **Livello 1**, **Livello 2**, o un altro livello.
2. Modificare il livello selezionato con la forma abituale, il compartimento, i comandi di rilievo e di shell, cambiando il livello non copia le impostazioni ad altri livelli.
3. Scegli **Visualizza pila** nella stessa discesa per ispezionare tutti i livelli e gli accessori insieme. Utilizzare **Insieme**, **Organizer**, **Inserti**, **Rivestimento** o **Coperchio** per mostrare le parti di cui hai bisogno. Torna a un livello numerato per continuare a modificarlo.
4. Sotto **Forma → Livelli**, regolare **Gioco di adattamento** e stampare un piccolo campione di vestibilità prima di impegnarsi a pieno stack.

Rilievo incorporato e SVG decorano l'esterno di ogni tier mentre i collettori di accoppiamento, le lingue e le prese rimangono lisce. Le gusci e i pannelli decorativi Wrapped possono coprire i singoli livelli. Per i pannelli, tenere **Offset del bordo** almeno 3 mm in modo da sgomberare i collettori di accoppiamento.

Con un guscio avvolto, una lingua all'interno della parete inferiore si adatta a una presa sotto il pavimento del vassoio superiore. Le larghezze di confronto, le profondità e le altezze utilizzabili rimangono invariate; ogni presa aggiunge 2,2 mm all'altezza esterna dello stack assemblato. Le conchiglie di corrispondenza si incontrano a una banda di supporto di 0,8 mm. Le conchiglie scivolano dall'alto; separano le piastre prima di rimuoverle.

**Bordo inferiore** è disponibile solo sul primo livello (più basso): scegliere liscio, anelli o passi. Con un guscio avvolta compatibile, l'assetto supporta anche il guscio. I pannelli separati siedono sopra il bordo con l'offset selezionato. I nuovi livelli superiori non ereditano l'assetto. Se la lingua non può adattarsi allo spessore della parete, ridurre **Gioco di adattamento**; l'applicazione non addensa automaticamente la parete.

**Lid.** In **Forma → Coperchio**, click **+ Copertina**. Utilizzare un cerchio superiore di livello con altezza parete esterna uguale e divisori a o sotto di esso. Tilt, a nido d'ape e la stampa sezionale prevengono questa vestibilità. Scegli **Esterno** per un tappo esterno o **A incasso** per un piatto di 2 mm che siede a filo all'interno del vassoio. L'opzione inset taglia un sedile nella parete superiore con spazio di 0,35 mm su ogni lato e lascia spazio sopra i divisori e gli inserti. Ha bisogno di almeno 2 mm di spessore della parete e 4 mm di profondità interna. Aggiungere un taglio a parete o un manico per sollevarlo. Il coperchio sovrapposto ha un cerchio di posizionamento con spazio di 0,5 mm. Scegli il suo modello superiore, la scala e la profondità, quindi impostare l'altezza del cerchio e la finitura. Per una maniglia, scegliere cilindrico o barra, impostare la sua dimensione e altezza, e facoltativamente chamfer o intorno ai suoi bordi. La maniglia stampa separatamente e incolla al coperchio. L'anteprima solleva il coperchio sovrapposto e mostra il coperchio inset seduto. Il coperchio esportato è piatto per la stampa.

**Modello bicolore.** Abilita su entrambi i coperchio in forma, quindi scegliere ramo di ulivo, foglie di Ginkgo, Fern frond, onde di marea, anelli di crescita di ciottoli del fiume o cellule di Voronoi. Scegli un colore base e un colore modello. La piastra da 3,2 mm ha un solido supporto da 1,6 mm e una faccia modellata da 1,6 mm. Il cerchio di posizionamento esterno e la maniglia opzionale aggiungono all'altezza complessiva. Per un coperchio a innesto, consentire almeno 5,2 mm di profondità interna. Esportazione 3MF mantenere entrambi i colori insieme come un coperchio, e assegnare le due parti alle fessure di filamento. Per ramo d'ulivo, foglie di Ginkgo, Fern frond, onde di marea e anelli di crescita, **Motivo traforato** rende il motivo fuori delle aperture in un foglio superiore continuo. Combinalo con **Motivo in rilievo** per esporre il supporto incassato attraverso le aperture. Abilitare **Motivo in rilievo** lasciare le aperture nella parte superiore 1,6 mm vuoto. Disabilitarlo per un intarsio liscio. I coperchi d'inset aumentati stampano il supporto prima; i coperchi sovrapposti stampano il volto verso il basso. Controllare il bridging sopra i recessi nell'affettatrice.

![Sei modelli di coperchio bicolore](../../images/lid-motifs.svg)

<a id="sleeves-and-panels"></a>
## Rivestimenti interi e pannelli

Aprire **Rivestimento** e scegliere un modello. Una scocca viene stampata separatamente dall'organizzatore. Se si desidera il modello sul corpo stesso, utilizzare **Forma → Rilievo dell'organizzatore**.

| Modalità Shell | Adattamento e montaggio |
| --- | --- |
| **Intorno al corpo** | Una manica senza fondo segue l'altezza del perimetro e della parete. Scorrerla sopra il corpo dall'alto, seguendo la direzione della parete su un modello inclinato. Il pannello indica se una sporgenza di supporto è presente o la manica poggia sul tavolo. |
| **Pannelli decorativi** | I pannelli incorniciati separati coprono i lati selezionati e lasciano gli angoli esposti. Scegliere i lati e regolare **Offset del bordo**. Pannelli in colla senza fissaggio. Con perni nascosti, premere ogni pannello dritto sulla sua parete di corrispondenza per un fissaggio permanente. |

![Vista superiore di una manica che avvolge gli angoli e pannelli separati che terminano prima di ogni angolo](../../images/shell-fit.svg)

Scegliere il modello, impostare la sua dimensione e set **Spessore del guscio**. Per una manica a un pezzo, regolare **Larghezza del bordo** per il suo telaio solido. Pannelli decorativi hanno un telaio fisso; uso **Offset del bordo** per posizionarli sul muro. Sottotitolo **Atterraggio**, **Gioco su ciascun lato** imposta il divario tra manica e organizzatore. Una distanza di 0,5 mm su ogni lato aggiunge 1 mm su due lati opposti prima di contare lo spessore della shell. Confronta **Insieme** con l'isolato **Rivestimento** vista per giudicare il risultato. **Scarica la shell** esporta la copertura separatamente, e **Rimuovere il guscio** lo rimuove dal design.

I pannelli richiedono una base rettangolare compatibile. La commutazione a pannelli conserva lo spessore della parete e lo spazio del vano. Le prese di montaggio nascoste richiedono pareti di spessore di almeno 3.2 mm senza rilievo. Per pareti più sottili, tra cui 2,4 mm, utilizzare pannelli senza fissaggi e incollarli in posizione. Lo spessore della parete non viene mai sollevato automaticamente. L'offset del bordo del pannello controlla il margine sul viso, mentre la clearance del manicotto controlla la vestibilità scorrevole. Con l'assetto inferiore, l'offset inferiore inizia nella parte superiore dell'assetto; i chiusure e le prese del pannello seguono lo stesso profilo. Le piastre richiedono almeno 3 mm di offset del bordo per sgomberare i loro colletti di accoppiamento.

<a id="projects-and-backups"></a>
## Progetti e copie di sicurezza

Uso **I miei progetti → Salva una copia** per nominare un disegno o fare una variante prima di sperimentare. Il progetto aperto salva automaticamente in questo browser. La libreria ti permette di cercare, aprire, rinominare, eliminare o scaricare un progetto. **Salva progetto** nella barra superiore scarica una modificabile JSON rinforzi. Uso **Apri** caricare quel file, incluso su un altro computer o in un'installazione locale.

Una copia di recupero locale temporanea protegge le modifiche mentre il database del browser sta salvando; la riapertura ripristina quella copia se una scrittura è stata interrotta. Un'istantanea di ultima riuscita separata può recuperare una sessione corrente danneggiata, inclusa la cronologia di undo. Se nessuna copia valida può essere ripristinata, il salvataggio automatico si ferma invece di sostituire il progetto memorizzato con un modello di avviamento.

Cambiando questi invalida il controllo precedente; un vecchio risultato non può essere scaricato come nuovo modello. I calcoli non eseguiti mantengono modifiche. Un'anteprima bloccata segnala un errore dopo due minuti; la successiva modifica della geometria inizia un nuovo calcolo.

Quando lo stesso progetto o cassetto viene modificato in più schede, le modifiche in conflitto vengono salvate come una **Copy from another tab**. L'altra versione viene mantenuta, e la scheda di modifica continua con la sua copia. Confrontare le versioni in **I miei progetti** o il selettore del cassetto e rinominare la copia se si desidera tenerla. Riaprire una scheda organizzatore ripristina il proprio progetto salvato.

Mantenere un backup scaricato prima di cancellare i dati del browser. Ogni indirizzo del browser e del sito ha una propria libreria. Le slot di filamento sono memorizzate separatamente per la stampante nel browser. Impostare di nuovo quando si sposta su un altro dispositivo. Per l'applicazione locale scaricabile, vedere [Installazione locale](../../../README.md#local-installation).

<a id="print-setup-and-sectioning"></a>
## Impostazioni di stampa e suddivisione

Sotto **Stampa**, selezionare la stampante e la configurazione della testa o scegliere **Dimensioni personalizzate**. Controllare la larghezza, la profondità e l'altezza della costruzione. Il preset fornisce il volume di costruzione. Scegli la stampante, l'ugello, il materiale e i profili di slicing nel vostro slicer.

Per un modello che supera il letto, utilizzare i tagli suggeriti o scegliere due o tre sezioni quando disponibile. Leggere le posizioni di cucitura proposte e utilizzare **Allontanare le parti** per vedere come si incontrano le sezioni. La divisione aumenta lo spessore della parete a almeno 5 mm e lo spessore del pavimento a almeno 3 mm. Ricontrollare le dimensioni interne. Rimuovere i gusci e gli inserti prima della scissione. Vassoi inclinati, modelli inclinati e il cerchio, basi ovali e a nido d'ape richiedono la stampa monopezzo. **Restituisce il modello solido** spegne la sezione. Controllare lo spessore di nuovo se si desidera ripristinare le dimensioni precedenti.

**Esempio comune** downloads accoppiamento termina per provare alla stessa scala e le impostazioni di stampa del corpo finale. Mettili separatamente con le loro basi giù. Dopo il raffreddamento, i perni nominali Ø 3.2 × 8 mm si adattano a fori Ø 3.3 mm, profondi 4,5 mm su ogni lato della cucitura. Controllare l'allineamento, quindi utilizzare pin e colla per assemblare le sezioni stampate. Uso **Scarica tutte le parti** per l'organizzatore a sezione stessa.

<a id="download-and-slice"></a>
## Download e preparazione nello slicer

1. In **Stampa**, configurare fessure di filamento se si desidera un file multicolor. Abbina numeri di slot e colori al tuo slicer. Su una Snapmaker U1, fessure 1-4 corrispondono a T0 – T3. Aggiungere fino a 16 slot, impostare ogni colore e nominare facoltativamente il suo materiale. Il colore è una guida visiva approssimativa, non una simulazione di un'ombra stampata o mista. Configurare colori esatti e mescolando nel vostro slicer. Selezionare qualsiasi carta di filamento e scegliere **Eliminare il filamento da slot N** per rimuoverlo. I numeri di slot rimanenti non cambiano: la fessura di cancellazione 6 foglie slot 7 come slot 7. **+ Fessura N** aggiunge il numero più basso disponibile di nuovo; il limite rimane a 16. Cancellare un filamento non cambia il colore del modello. Le slot non vengono più offerte o abbinate automaticamente all'esportazione; scegli un'altra slot esplicitamente o assegnala nella fettuccia. I colori distinti consentono all'app di abbinare i colori delle parti alle slot automaticamente. Se due slot condividono un colore, scegliere lo slot destinato per ogni parte nella finestra di dialogo download.
2. Clicca su **↓ Scarica**. Scegli **Organizer e accessori**, **Solo guscio** o **L'intero set**, in base a quali parti hai bisogno. Per un modello a sezione, esporta il kit.
3. Per 3MF, assegnare una fessura di filamento ad ogni parte o lasciarlo per l'assegnazione nella fessura. Orca può utilizzare il primo filamento per parti non firmate.
4. Leggi le dimensioni di ogni parte e le istruzioni per ruotarlo a 90° sul letto. Il controllo si riserva 2 mm ai bordi del letto. Scarica con il formato pulsante nella parte inferiore del dialogo.
5. Aprire il risultato nel vostro slicer a **Scala al 100% in millimetri**. Organizzare il set completo, controllare sporgenze e dettagli sottili, e visualizzare in anteprima il primo strato e divisori. Per una stampa multicolore, verificare l'assegnazione del filamento di ogni parte prima di slicing.

| Formato | Scegli per | Cosa fare con il download |
| --- | --- | --- |
| STATO | Geometria per stampa monocolore | Aprire la STL nella fette. Estrarre la ZIP prima se l'esportazione contiene diversi STL. |
| 3MF | Un kit con parti separate, colori e assegnazioni di filamento | Apritelo nel vostro slicer e verificate le parti e le fessure. ReplixGrid lascia la stampante e i profili materiali alla fessura. |
| OBJ + MTL | Un modello colorato per uno strumento che accetta OBJ | Tenere insieme la geometria e il file materiale. Il modello utilizza millimetri con Z in su. |
| Progetto JSON | Proseguendo per modificare scomparti, dimensioni o accessori | Utilizzare **Salva progetto** e riaprirlo con **Apri** in ReplixGrid. |


Per abbinare un colore digitale dal vostro slicer, incollare il suo sei cifre **Codice HEX**, per esempio `#E63522`, accanto al raccoglitore di colore. Il leader `#` è facoltativo. I codici validi aggiornano immediatamente l'anteprima; il testo incompleto o non valido non viene applicato e ritorna al colore salvato quando si lascia il campo. Un abbinamento HEX il codice non simula l'aspetto del filamento, l'illuminazione o una miscela di colore fisico.

<a id="troubleshooting"></a>
## Risoluzione dei problemi

| Che cosa vedi | Cosa controllare |
| --- | --- |
| L'oggetto si adatta alle dimensioni esterne ma non si adatta in una baia | Selezionare lo scomparto e controllare le misure interne. Permette lo spessore della parete, le estremità curve, il raggio d'angolo interno e gli inserti rimovibili. |
| La selezione di un divisore continua a selezionare la parete davanti | Passare a **Dall’alto** o aprire **Tutte le pareti e i compartimenti** sulla destra. |
| Il coperchio o il prossimo livello non possono essere aggiunti | Controllare un cerchio di livello, altezza esterna uguale, divisori sporgenti, inclinazione o stampa divisa. Per uno stack, controllare anche clip di shell legacy e la distanza in forma rispetto allo spessore della parete. |
| Una parte supera il letto, anche se l'impronta sembrava abbastanza piccola | Tilt, rilievo, assetto e gusci possono estendersi oltre la base. Controllare la configurazione e la rotazione della stampante selezionata. |
| I dispositivi di fissaggio nascosti del pannello non sono disponibili | Utilizzare pareti di almeno 3.2 mm di spessore senza rilievo, o lasciare elementi di fissaggio fuori e incollare i pannelli. |
| I pannelli si sovrappongono al bordo inferiore o al cerchio in un vecchio design | Impostare un bordo di offset di almeno 3 mm per piastre. L'offset inferiore viene misurato dalla parte superiore del bordo inferiore. Rigenerare e scaricare le parti dopo aver modificato le impostazioni. |
| Una stampa scaricata ha i colori sbagliati | Utilizzare 3MF, abbinare i numeri di slot in **Stampa**, quindi ispezionare le assegnazioni per parte nella fessura. STL trasporta solo la geometria. |
| Manca un disegno salvato su un altro dispositivo | Trasferire il suo progetto JSON e utilizzare **Apri**. Le librerie del browser sono locali per ogni dispositivo e indirizzo del sito. |

<a id="project-variants"></a>
## Varianti del progetto

Fare clic su **+ Variante** nella barra superiore o aprire **I miei progetti** e selezionare **Nuova variante**. Inserisci un nome e fai clic su **Crea variante**. La nuova variante è una copia indipendente; l'originale rimane salvata. Un originale non chiamato viene mantenuto come **Bozza**.

Utilizzare il selettore accanto a **+ Variante** per passare tra i modelli correlati, o scegliere uno sotto **Varianti di questo progetto** nei miei progetti. Ogni variante salva automaticamente e mantiene la propria cronologia disfare/redo dopo aver commutato o ricaricato. Una variante appena creata inizia con una storia vuota.

Utilizzare **Progetto separato → Salva una copia** per creare un progetto non correlato. Rinominare o eliminare singoli modelli nei miei progetti; cancellare l'originale non cancella le sue varianti.

**Scarica** esporta il modello selezionato per la stampa. **Salva progetto** scarica quel modello come modificabile JSON; **File** su una scheda di libreria scarica il modello corrispondente. JSON contiene un modello, senza le relative varianti o cronologia annulla. Salva ogni modello separatamente per trasferire o eseguire il backup del set completo.


<a id="shared-styles"></a>
## Stili condivisi

1. Aprire un progetto con i colori e i modelli che si desidera riutilizzare.
2. Sotto **Forma → Stile comune**, inserire un nome e fare clic su **Salva lo stile attuale**.
3. Apri un altro progetto o variante, torna allo stile **Stile comune** e seleziona lo stile salvato.
4. Scegli **Colori**, **Motivi**, o entrambi. Review **Verrà applicato** e qualsiasi **Verrà ignorato** messaggi, quindi fare clic su **Applica stile**.

Uno stile cattura il colore e il sollievo dell'organizzatore, più i colori e i modelli di un guscio esistente e coperchio. Uno stile corpo liscio rimuove il sollievo del corpo della destinazione. Dimensioni, layout del compartimento, spessori della parete, vestibilità del coperchio, maniglie e sgomberi della shell rimangono invariati.

L'applicazione è un passo annullato e crea una copia indipendente: in seguito le modifiche a un organizzatore non cambiano gli altri.

Un progetto JSON conserva l'aspetto applicato, ma non include la libreria in stile salvato. Per riutilizzare uno stile su un altro dispositivo, aprire il progetto in stile JSON lì e salvare il suo stile attuale di nuovo.


<a id="drawer-arrangements"></a>
## Disposizione degli organizer nel cassetto

Scegli **DRAWER** accanto a **Organizer**, poi **Create drawer**. Inserisci la lunghezza, la larghezza, l'altezza e lo sdoganamento misurati. La pulizia si applica sia alle pareti dei cassetti che tra i vassoi.

I nuovi cassetti iniziano a 180 × 280 mm, con il bordo anteriore segnato in basso. **Vista rotativa di 90°** cambia solo l'orientamento di visualizzazione; le dimensioni del cassetto, le coordinate del vassoio e i modelli esportati rimangono invariati. Le disposizioni del cassetto esistenti conservano le loro dimensioni. I cassetti salvati si aprono con lunghezza orizzontale e larghezza verticale; le etichette delle dimensioni seguono la rotazione manuale della vista.

Utilizzare **New organizer** per creare un vassoio direttamente nel cassetto. Impostare le sue dimensioni, quindi modificare scomparti e accessori nel solito editor organizzatore. **Torna al cassetto** torna al suo posizionamento. **Add saved organizer** aggiunge una copia indipendente di un progetto o variante salvata; modificarlo non cambia mai la sua fonte.

Trascinare i vassoi in alto a vista o inserire le coordinate X/Y misurate dall’angolo in alto a sinistra ai limiti esterni del vassoio. Ruotare di 90 gradi, duplicare o rimuovere i vassoi. I tasti freccia spostano un vassoio concentrato di 1 mm (Shift: 10 mm).

Il diagramma mostra rettangoli esterni montati, tra cui conchiglie, rifiniture, coperchi e piastre. Le forme curve vengono controllate in modo conservativo piuttosto che strettamente nidificata. Vengono evidenziati conflitti di altezza, di sdoganamento e di altezza. Attendere il controllo della geometria prima di affidarsi allo stato di forma.

I cassetti salvano localmente in questo browser, separatamente dai progetti dell'organizzatore. Scaricare un file JSON del cassetto per il backup o il trasferimento; aprirne uno crea una copia separata del cassetto. Seleziona un vassoio e scegli **Download selected tray** per la sua esportazione STL, 3MF o OBJ con i controlli di formato della stampante esistenti.

<a id="mounting-plates"></a>
### Piastre di montaggio

In **DRAWER → Drawer base**, scegliere **Mounting plate**. La lunghezza del cassetto/larghezza e la clearance della parete determinano l'area coperta. Inserire la larghezza e la profondità utilizzabili della **Letto stampante 3D** separatamente: queste dimensioni determinano la dimensione massima della sezione e quindi il numero di sezioni. Il calcolo comprende proiezioni articolari e un margine di stampa di 2 mm su ogni bordo del letto. Le dimensioni non devono essere multiple della griglia di peg da 20 mm; le sezioni di bordo si adattano allo spazio rimanente.

**Download sections (ZIP)** crea un numerato 3MF per lavoro di stampa, un SVG mappa di montaggio e un elenco di coordinate. La mappa utilizza l'orientamento del cassetto originale, indipendente dalla rotazione della vista. R indica righe dall'alto verso il basso, colonne C da sinistra a destra. Abbassare le coda di colomba adiacente al posto dall'alto. Prima stampa **Download joint sample**, contenente due piccole sezioni adiacenti; controllare l'assemblaggio con la stampante prima di stampare il set completo. I giunti utilizzano una cucitura di 0,05 mm e un'indennità di profilo di 0,03 mm. Una cucitura debole e un gioco leggero possono rimanere tra le sezioni nude.

Con la modalità a piastre abilitate, i download del vassoio includono le prese laterali per la posizione e la rotazione del vassoio. Le dimensioni del vano interno sono conservate. Il vassoio diventa più alto di 2,1 mm; tra cui la piastra di 2 mm, il controllo del cassetto aggiunge 4.1 mm. Dopo aver spostato o ruotato un vassoio, scaricalo di nuovo: le prese devono corrispondere alle posizioni del peg.

Lo sdoganamento radiale a presa è di 0,12 mm. Stampare un piccolo organizzatore che spazia da due sezioni per verificare la vestibilità con le impostazioni del materiale e dello strato. Le prese mantengono l'organizzatore lateralmente; sollevarlo verso l'alto per rimuoverlo. Export utilizza solo la geometria: scegli la stampante e i profili dei materiali nella fessura e ispeziona i tetti delle prese prima della stampa.

Il montaggio supporta attualmente gli organizzatori senza inclinazione, con almeno tre prese completamente supportate. I piccoli vassoi possono essere spostati o ingranditi. Le piastre e i gusci superiori mantengono la loro geometria esistente.

<a id="custom-svg-relief"></a>
## Rilievo SVG personalizzato

Sotto **Forma → Rilievo dell'organizzatore → My SVGs**, scegliere **Upload SVG** o rilasciare un file nell'area di caricamento. Selezionare una miniatura salvata per riutilizzarlo. La stessa libreria è disponibile sotto **Forma → Coperchio → My SVGs** e **Rivestimento → Modello → My SVGs**. Ogni obiettivo mantiene le proprie impostazioni di schema e posizionamento.

Scegli **Single motif** o **Repeat**, selezionare le pareti esterne, e regolare la larghezza del motivo in millimetri, rotazione, orizzontale / verticale offset, e ripetere il gap. Larghezza e altezza mantengono le proporzioni originali. Il posizionamento è incentrato su ogni lato selezionato; su corpi curvi i lati corrispondono a quattro settori esterni. L'offset verticale positivo sposta il motivo verso l'alto. Il modello segue il contorno esterno. Le ripetizioni sono posizionate solo dove un motivo completo si inserisce sotto il bordo superiore, intorno ritagli e all'interno di ogni lato. I motivi singoli sono ritagliati a questi confini. La profondità del rilievo utilizza l'esistente **Profondità del sollievo / Intensità** controllo. Le pareti originali e i comparti interni sono conservati; le dimensioni esterne aumentano. Attendere fino a quando l'anteprima aggiornata termina, quindi controllare e scaricare la parte.

I SVG supportati contengono percorsi riempiti, poligoni, rettangoli, cerchi o ellisse, compresi i fori e le trasformazioni di gruppo. Converti testo e ictus in percorsi riempiti prima di esportare dal tuo editor vettoriale. Foto, riferimenti esterni, filtri, maschere, percorsi di ritaglio, gradienti, blocchi di stile CSS e riferimenti a elementi riutilizzabili ( `use` ) non sono supportati. Le definizioni vuote o inutilizzate contenenti forme supportate vengono ignorate. I colori diventano una forma unica sollevata utilizzando il colore dell'organizzatore. I limiti sono 200 KB, 512 elementi XML, 128 forme riempite e 6.000 punti di contorno campionati; modelli eccessivamente complessi o ripetizioni eccessive vengono respinti con un messaggio. Le curve sono approssimate da contorni poligonali per la stampa.

Ogni progetto incorpora una copia indipendente dei suoi contorni utilizzati, quindi i progetti scaricati possono essere riaperti su un altro dispositivo senza la sorgente SVG o la biblioteca. Eliminare una voce di libreria lascia i progetti esistenti invariati. **Stile comune** trasporta anche corpo personalizzato, coperchio e shell pattern ad un altro organizzatore.

<a id="choose-an-svg-for-its-intended-use"></a>
### Scegliere un SVG adatto all’uso

Un SVG è un formato di disegno, non una garanzia di geometria stampabile. **Il successo dell'importazione significa solo che sono stati letti i contorni riempiti supportati.** La superficie scelta, la dimensione e la modalità di applicazione devono ancora passare il controllo della geometria.

| Uso intenzionato | Ciò che le aree riempite diventano | Cosa preparare |
| --- | --- | --- |
| Rilievo dell'organizzatore | Materiale rialzato attaccato ad una parete solida | I motivi separati e i fori interni possono funzionare perché la parete li supporta. |
| Modello di coperchio rialzato | Materiale rialzato su un supporto solido | I fori interni sono consentiti; tenere l'intero disegno all'interno del telaio disponibile e liberare dall'atterraggio della maniglia. |
| Lid attraverso le aperture | Materiale rimosso dal coperchio | Ogni pezzo rimanente deve connettersi al coperchio circostante. I dettagli interni chiusi hanno bisogno di ponti stencil. |
| Conchiglia montata o pannelli decorativi | Aperture tagliate attraverso la copertura | Utilizzare un disegno compatibile con stencil. La struttura e il modello rimanenti devono formare materiale collegato. |

Per preparare un file:

1. Convertire testo e **ictus a contorni** nel vostro redattore vettoriale. Una linea visibile con `fill="none"` è un ictus, non un'area riempita.
2. Rimuovere i rettangoli di sfondo a meno che non si desidera che l'intera area diventi sollievo o un'apertura. I colori SVG non separano i materiali e le forme bianche non cancellano automaticamente le forme più scure sotto.
3. Controllare i percorsi composti nell'editor vettoriale. Un commento che dice "buco" non crea uno: l'avvolgimento del percorso e `fill-rule` determinare se un'area interna è riempita.
4. Per le aperture, collegare i dettagli interni chiusi al materiale circostante con ponti. Aumentare il divario tra motivi ripetuti fa **non lo so** collegare un dettaglio allentato all'interno di un motivo. In alternativa, utilizzare sollevato sollievo sul coperchio.
5. Se l'SVG contiene già una griglia di motivi, la sua larghezza imposta la scala **tutta la griglia**, non ogni motivo. Le piccole caratteristiche possono diventare troppo sottili da stampare.
6. Se l'edificio non riesce, la scena può mantenere l'ultimo modello di successo; questo modello non rappresenta le attuali impostazioni fallite.

Una foglia con una vena completamente racchiusa può funzionare come sollievo, ma tagliare la foglia circostante può lasciare la vena sciolta. Una griglia esagonale riempita può lavorare come perforazioni se i restanti web rimangono collegati e abbastanza spessi; un'illustrazione multicolore disegnata con i colpi deve essere preparata prima.

<a id="svg-lids-and-perforated-shells"></a>
### Coperchi SVG e rivestimenti traforati

Aggiungere un coperchio, quindi scegliere **My SVGs**. **Rilievo aumentato (decorazione)** fa un singolo coperchio collegato con il motivo su un supporto solido; impostare la sua altezza di rilievo (0.2–1 mm) e il colore di base. **Attraverso stencil (taglio)** rimuove le aree SVG riempite attraverso il coperchio. Entrambe le modalità conservano un telaio di bordo 2 mm e il labbro di atterraggio.

Per un guscio, selezionare **My SVGs**, quindi un disegno della libreria. Le aree riempite diventano attraverso le aperture. Utilizzare un motivo o ripetizioni sui lati selezionati di una manica avvolta. Su **Pannelli decorativi**, il disegno viene ripetuto in modo indipendente su ogni pannello selezionato; le strutture esistenti e le posizioni di montaggio sono mantenute. La dimensione iniziale del motivo tiene conto dell'altezza della shell.

Su coperchi e gusci, solo i motivi completi sono collocati all'interno del telaio disponibile, compresi i singoli motivi. Se non si adatta, ridurre la dimensione o l'offset. Dettagli interni chiusi (ad esempio il centro di una cutout a forma di anello) possono diventare isole sciolte.

I modelli sono inclusi nelle esportazioni individuali, nei kit completi e nei lavori di stampa a tutto tondo. Passare indietro a **Built-in** rimuove il modello personalizzato solo da quel bersaglio.

<a id="download-ready-to-use-stencil-svgs"></a>
### Scaricare stencil SVG pronti all’uso

Questi esempi contengono contorni riempiti con ponti materiali. Le aree nere diventano aperture in modalità **Attraverso stencil (taglio)**. Salvare i link qui sotto come file `.svg`; se il browser visualizza il disegno, utilizzare **Salva la pagina come** e mantenere l'estensione `.svg`.

| Scarica | Modello | Larghezza di partenza consigliata |
| --- | --- | --- |
| [Foglie organiche — scaricare SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) | Cinque foglie con ponti che collegano i dettagli interni | 20 mm; ridurre per un guscio basso |
| [Doppia esagono — scaricare SVG](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg) | Una piastrella a doppio esagonale con quattro ponti e un'apertura centrale | 20–24 mm; usare **Repeat** per una griglia |

**Su un coperchio:** aggiungere un coperchio sotto **Forma → Coperchio**, aperto **My SVGs**, e caricare entrambi i file. Scegli **Attraverso stencil (taglio)**. Iniziare con **Single motif** per ispezionare o selezionare **Repeat** per riempire l'area disponibile con copie complete. Impostare la larghezza, la rotazione e gli offset X/Y. Ripetere la spaziatura è il divario tra copie complete, non la larghezza dei loro ponti interni. Iniziare con 4 mm di spaziatura. Il file foglia è già un gruppo di cinque foglie: la larghezza scala l'intero gruppo.

**Su un guscio:** aperto **Rivestimento → Modello → My SVGs**, o scegliere la scheda **Rivestimento** in studio, quindi selezionare lo stesso file dalla libreria condivisa. Le conchiglie usano sempre attraverso le aperture. Utilizzare **Repeat** per una banda intorno alla conchiglia; **Ulteriori → SVG walls** seleziona i lati di una conchiglia avvolta.

Se un motivo non si adatta, ridurre la sua larghezza o offset. Su un guscio basso, prova 12–16 mm per il gruppo fogliare. Aumentare lo spessore della shell può ingrandire il suo bordo automatico e lasciare meno spazio per il disegno. Scaling down inoltre restringe i ponti: ispezionarli nel vostro slicer e stampare un piccolo campione per il vostro ugello e materiale. Ripetere la spaziatura non può allargare i ponti interni. Attendere l'anteprima corrente per finire, quindi utilizzare **Scarica** controllare ed esportare il coperchio o la shell.

<a id="numeric-sliders-and-valid-ranges"></a>
### Cursori numerici e intervalli validi

Le impostazioni numeriche mostrano **Min.** e **Max.** sopra una sottile traccia verde, con un marcatore bianco per la geometria corrente. I tappi finali rossi segnano l'esterno dell'intervallo consentito; non sono un punteggio di resistenza alla stampa. Trascina il marcatore, usa i tasti freccia mentre si concentra, o digita un numero esatto e premi Invio. Il campo numerico e il cursore utilizzano gli stessi limiti. Alcuni limiti cambiano con il modello; un valore all'interno del range di esportazione di un altro conflitto.

<a id="whole-drawer-export"></a>
## Esportare l’intero cassetto

Scegli **DRAWER → Print entire drawer** per preparare tutti i vassoi, i loro accessori e tutte le sezioni della piastra di montaggio abilitate. I vassoi montati ricevono prese per le loro posizioni salvate; i vassoi normali di freeplacement mantengono le basi esistenti. I progetti di stampaggio a spacco includono le loro parti e i loro perni.

Set **Printer bed length** (orizzontale), **Printer bed width** (verticale), altezza di stampa e spaziatura. Le dimensioni iniziali provengono dalle impostazioni della piastra di montaggio o dall'area di stampa del primo vassoio; le successive impostazioni di esportazione vengono salvate con questo cassetto. Le sezioni della piastra di montaggio vengono rigenerate per il letto scelto.

Il layout utilizza caselle di rilegatura esportate reali, un margine di 2 mm ai bordi del letto e la spaziatura scelta. Le parti possono ruotare 90 gradi. I componenti del coperchio multicolore rimangono insieme. Il conteggio letto visualizzato è per questa disposizione, non un minimo garantito. Supporti, brim, torri di purge, zone di esclusione della stampante e diversi lavori materiali non sono inclusi; riservare spazio appropriato e controllare il risultato nel vostro slicer. Nessun profilo della stampante o le assegnazioni delle scanalature sono incorporate.

Lo ZIP contiene **bed-NN.3mf** per ogni letto, abbinamento **bed-NN.svg** diagrammi, **assembly.svg**, **print-plan.json**, **drawer.replixdrawer.json** e un elenco di parti numerate in **README.txt**. Aprire ciascuno 3MF come lavoro di stampa separato, mantenere le posizioni relative dei suoi oggetti, utilizzare millimetri a scala 100% e assegnare filamenti. I diagrammi SVG diagrammi mostrano rettangoli di confine; i 3MF contiene la geometria stampabile completa. Le coordinate di montaggio del cassetto usano sempre la lunghezza orizzontalmente e la larghezza verticalmente.

Le modifiche al layout o alle impostazioni di esportazione invalidano il calcolo precedente. La chiusura della finestra annulla la preparazione. Le parti individuali di grandi dimensioni sono segnalate piuttosto che scalate silenziosamente o divise automaticamente.

<a id="pattern-studio"></a>
### Studio dei motivi

Scegli **Rilievo aumentato (decorazione)** o **Attraverso stencil (taglio)** in cima alle impostazioni di destra. Le conchiglie supportano solo la modalità stencil. Le impostazioni mostrano altezza di rilievo solo per sollievo, e spaziatura solo per il posizionamento ripetitivo. **Spessore materiale** è modificabile: 1,2–6 mm per un SVG coperchio e 1-4 mm per un guscio. Cambia l'anteprima e l'esportazione insieme. I valori predefiniti del coperchio esistenti rimangono 3.2 mm per il sollievo e 2 mm per lo stencil; uno spessore scelto viene conservato durante le modalità di commutazione. L'altezza del coperchio è inclusa nello spessore del coperchio. Un inset SVG coperchio richiede profondità interna di almeno lo spessore della piastra più 2 mm. **Ulteriori** contiene il colore coperchio o la selezione della parete della shell. Aprire **Quali file SVG funzionano?** per i limiti di importazione e consulenza di preparazione.

Aprire **Forma → Coperchio → My SVGs** o **Rivestimento → Modello → My SVGs** per modificare i modelli accessori nel cassetto inferiore. **Coperchio** e **Rivestimento** le schede mantengono le impostazioni indipendenti durante la condivisione SVG biblioteca. Le schede di commutazione isolano automaticamente quella parte nell'anteprima. Se non viene ancora aggiunto, l'assemblaggio rimane visibile fino alla creazione della parte. Puoi ancora scegliere l'assemblaggio manualmente sopra il modello. Utilizzare la larghezza, la rotazione, l'intervallo e i controlli X/Y per posizionare i motivi; il pulsante centrale ripristina la posizione e la rotazione. Il coperchio supporta il sollievo sollevato o attraverso aperture. Le aperture conchiglia mantengono la cornice e le aree di montaggio. Chiudere con × o fuga mentre si concentra in studio; le modifiche rimangono salvate. I tasti freccia commutano la scheda di superficie concentrata.
