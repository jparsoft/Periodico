const path = require('path');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const app = express();

//const environment = require('./environment');

app.get('/', (req, res) => {
    res.json({
        text: 'Hola mundo'
    });
});

module.exports;
