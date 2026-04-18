
'use strict';

const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

// Seleziono gli elementi del DOM
const listaFotoElem = document.querySelector('#photo-list');
const loadingMsgElem = document.querySelector('#loadingMsg');
const errorMsgElem = document.querySelector('#errorMsg');

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
    });

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
            <div class="col-12 col-md-6 col-lg-4>
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
}