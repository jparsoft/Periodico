//Necesario para exportar router
const { Router } = require('express');
const router = Router();
//////////////////////////////////
// Necesarios para web scrapping
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
//////////////////////////////////
//const environment = require('..img/');
let fecha = new Date();
let anio = fecha.getFullYear();
let mes = formatearNumero(fecha.getMonth());
let dia = formatearNumero(fecha.getDate());

let urlLider = `https://www.lidersanantonio.cl/impresa/${anio}/${mes}/${dia}/papel/`
let urlImagenes = '';

async function extraerUrl() {
    const $ = await request({
        uri: urlLider,
        transform: body => cheerio.load(body)
    });
    const data = $('.no-gutters .page a').children();
    urlImagenes = String(data[0].attribs.src);


}
function formatearNumero(numero) {
    let formateado;
    if (numero < 10) {
        formateado = `0${String(numero)}`;
    } else {
        formateado = String(numero);
    }
    return formateado;
}

async function obtenerImagenes() {
    await extraerUrl();
    for (let index = 1; index < 21; index++) {
        let numpag = formatearNumero(index);
        try {
            request(urlImagenes.replace(`pag_01`, `pag_${numpag}`)).pipe(fs.createWriteStream(`./src/img/${numpag}.jpg`));
        } catch (e) {
            console.log(e);
        }


    }

}

router.get('/', async (req, res) => {
    await obtenerImagenes();
    res.json({
        text: `url :${urlImagenes} fecha:${anio}/${mes}/${dia}`
    });
});

router.get('/test', (req, res) => {
    res.json({
        text: 'Test'
    });
});

// exportar modulo
module.exports = router;
