//Necesario para exportar router
const { Router } = require('express');
const router = Router();
//////////////////////////////////
// Necesarios para web scrapping
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
//////////////////////////////////
//const environment = require('./environment');

router.get('/', (req, res) => {
    res.json({
        text: 'Hola mundo'
    });
});

router.get('/test', (req, res) => {
    res.json({
        text: 'Test'
    });
});

// exportar modulo
module.exports = router;
