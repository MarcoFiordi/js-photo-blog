'use strict';

const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';

fetch(API_URL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        console.error(error);
    });