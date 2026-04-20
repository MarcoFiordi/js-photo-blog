'use strict';
// attiva la modalità strict → evita errori comuni

// URL dell’API da cui recupero le immagini
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';


// ==========================
// SELEZIONE ELEMENTI DOM
// ==========================

// contenitore delle card
const listaFotoElem = document.querySelector('#photo-list');

// messaggio di caricamento
const loadingMsgElem = document.querySelector('#loadingMsg');

// messaggio di errore
const errorMsgElem = document.querySelector('#errorMsg');

// overlay fullscreen
const overlayElem = document.querySelector('#overlay');

// immagine dentro overlay
const overlayImageElem = document.querySelector('#overlay-immagine');

// bottone chiusura overlay
const closeOverlayElem = document.querySelector('#close-overlay');


// ==========================
// MESSAGGIO DI CARICAMENTO
// ==========================

// mostro il loading prima della chiamata API
if (loadingMsgElem !== null) {
    loadingMsgElem.textContent = 'Caricamento...';
}


// ==========================
// CHIAMATA API
// ==========================

fetch(API_URL)

    // converto la risposta in JSON
    .then((response) => {
        return response.json();
    })

    // quando arrivano i dati, creo le card
    .then((fotoArray) => {
        stampaCard(fotoArray);
    })

    // gestione errore
    .catch((error) => {
        console.error(error);

        // messaggio visibile all’utente
        if (errorMsgElem !== null) {
            errorMsgElem.textContent = 'Errore nel caricamento delle foto';
        }
    })

    // rimuovo il loading in ogni caso
    .finally(() => {
        if (loadingMsgElem !== null) {
            loadingMsgElem.textContent = '';
        }
    });


// ==========================
// FUNZIONE APERTURA OVERLAY
// ==========================

// apre l’overlay mostrando l’immagine cliccata
function openOverlay(imageUrl, imageTitle) {

    // controllo di sicurezza
    if (overlayElem === null || overlayImageElem === null) {
        return;
    }

    // imposto immagine
    overlayImageElem.src = imageUrl;

    // imposto descrizione
    overlayImageElem.alt = imageTitle;

    // mostro overlay
    overlayElem.classList.remove('d-none');
}


// ==========================
// FUNZIONE CHIUSURA OVERLAY
// ==========================

// chiude l’overlay
function closeOverlay() {

    // nascondo overlay
    if (overlayElem !== null) {
        overlayElem.classList.add('d-none');
    }

    // pulisco immagine
    if (overlayImageElem !== null) {
        overlayImageElem.src = '';
        overlayImageElem.alt = '';
    }
}


// ==========================
// FUNZIONE CREAZIONE CARD
// ==========================

// genera le card a partire dai dati API
function stampaCard(fotoArray) {

    // controllo contenitore
    if (listaFotoElem === null) {
        return;
    }

    // stringa che conterrà tutto il markup
    let markupFinale = '';

    // ciclo tutte le foto
    for (const foto of fotoArray) {

        // costruisco HTML della card
        markupFinale += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="photo-card">

                    <!-- pin -->
                    <img src="./img/pin.svg" alt="pin rosso" class="pin">

                    <!-- immagine -->
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

    // inserisco tutto nel DOM
    listaFotoElem.innerHTML = markupFinale;


    // ==========================
    // EVENTI CLICK
    // ==========================

    // seleziono immagini appena create
    const cardImageElems = listaFotoElem.querySelectorAll('.card-image');

    // aggiungo listener click
    for (let i = 0; i < cardImageElems.length; i++) {

        cardImageElems[i].addEventListener('click', function () {

            // apro overlay con dati corretti
            openOverlay(fotoArray[i].url, fotoArray[i].title);
        });
    }
}


// ==========================
// EVENTO CHIUSURA OVERLAY
// ==========================

// collego bottone alla funzione di chiusura
if (closeOverlayElem !== null) {
    closeOverlayElem.addEventListener('click', closeOverlay);
}