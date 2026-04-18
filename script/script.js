// @ts-check
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