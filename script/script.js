// @ts-check
'use strict';

// Seleziono gli elementi del Dom
const listaFotoElem = document.querySelector('#photo-list');
const loadingMsgElem = document.querySelector('#loadingMsg');
const errorMsgElem = document.querySelector('#errorMsg');

if (loadingMsgElem !== null){
    loadingMsgElem.textContent = 'Caricamento...';
}