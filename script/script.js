'use strict';

const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

// Seleziono gli elementi del DOM
const listaFotoElem = document.querySelector('#photo-list');
const loadingMsgElem = document.querySelector('#loadingMsg');
const errorMsgElem = document.querySelector('#errorMsg');
const overlayElem = document.querySelector('#overlay');
const overlayImageElem = document.querySelector('#overlay-immagine');
const closeOverlayElem = document.querySelector('#close-overlay');

// Mostro il messaggio di caricamento
if (loadingMsgElem !== null) {
    loadingMsgElem.textContent = 'Caricamento...';
}

// Chiamata API
fetch(API_URL)
    // Quando arriva la risposta la trasformo in JSON
    .then((response) => {
        return response.json();
    })
    // Quando arrivano i dati veri, li passo alla funzione che crea le card
    .then((fotoArray) => {
        stampaCard(fotoArray);
    })
    // Se si presenta qualche errore, lo stampo in console
    .catch((error) => {
        console.error(error);
    })
    // Alla fine rimuovo il messaggio di caricamento
    .finally(() => {
        if (loadingMsgElem !== null) {
            loadingMsgElem.textContent = '';
        }
    });

// funzione che apre l'overlay mostrando l'immagine cliccata
function openOverlay(imageUrl, imageTitle) {

    // controllo di sicurezza: verifico che gli elementi esistano nel DOM
    // se uno dei due è null, esco dalla funzione per evitare errori
    if (overlayElem === null || overlayImageElem === null) {
        return;
    }

    // imposto il percorso dell'immagine grande
    overlayImageElem.src = imageUrl;
    // imposto il testo alternativo (utile per accessibilità)
    overlayImageElem.alt = imageTitle;
    // rimuovo la classe 'd-none' per rendere visibile l'overlay
    overlayElem.classList.remove('d-none');
}

// funzione che riceve un array di foto e genera le card nel DOM
function stampaCard(fotoArray) {
    // se il contenitore non esiste, esco dalla funzione
    if (listaFotoElem === null) {
        return;
    }

    // creo una variabile vuota dove salverò tutto l'HTML delle card
    let markupFinale = '';

    // ciclo tutte le foto ricevute dall'API
    for (const foto of fotoArray) {

        // Per ogni foto aggiungo una card alla stringa HTML
        markupFinale += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="photo-card">
                
                    <!-- pin sopra la card -->
                    <img src="./img/pin.svg" alt="pin rosso" class="pin">
                
                    <!-- immagine della foto -->
                    <img src="${foto.url}" alt="${foto.title}" class="card-image">
                
                    <!-- testo -->
                    <div class="card-text">
                        <p class="date">${foto.date}</p>
                        <h2 class="title">${foto.title}</h2>
                    </div>
                </div>
            </div>
        `;

    }

    // inserisco tutto l'HTML generato dentro al contenitore
    listaFotoElem.innerHTML = markupFinale;

    const cardImageElems = document.querySelectorAll('.card-image');


    // 3. Uso il forEach per collegare ogni immagine ai suoi dati
    fotoArray.forEach((foto, i) => {
        cardImageElems[i].addEventListener('click', function () {
            
            openOverlay(foto.url, foto.title);
        });
    });

}


// Gestione della chiusura dell'overlay (requisito: solo tramite bottone)
if (closeOverlayElem !== null) {
    closeOverlayElem.addEventListener('click', function() {
        
        if (overlayElem !== null) {
            overlayElem.classList.add('d-none');
        }
    });
}