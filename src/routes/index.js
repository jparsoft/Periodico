//Necesario para exportar router
const { Router } = require('express');
const router = Router();
//////////////////////////////////
// Necesarios para web scrapping
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
//////////////////////////////////

// pdf kit
const PDF = require('pdfkit');
const doc = new PDF();

//////////////////////////////////

const ImagesToPDF = require('images-pdf');
const { throws } = require('assert');


//const environment = require('..img/');
let fecha = new Date();
let anio = fecha.getFullYear();
let month = fecha.getMonth();
console.log(parseInt(month) + 1);
let mes = formatearNumero(parseInt(month) + 1);
let dia = formatearNumero(fecha.getDate());


let urlImagenes = '';

async function extraerUrl() {
    
    try {
        let urlLider = `https://www.lidersanantonio.cl/impresa/${anio}/${mes}/${dia}/papel/`
        const $ = await request({
            uri: urlLider,
            transform: body => cheerio.load(body)
        });
        const data = $('.no-gutters .page a').children();
        urlImagenes = String(data[0].attribs.src);
    } catch (e) {
        let urlLider = `https://www.lidersanantonio.cl/impresa/${anio}/${mes}/${dia-1}/papel/`
        const $ = await request({
            uri: urlLider,
            transform: body => cheerio.load(body)
        });
        const data = $('.no-gutters .page a').children();
        urlImagenes = String(data[0].attribs.src);
        console.log('edicion anterior');
        
    }



}
function formatearNumero(numero) {
    let formateado;
    if (parseInt(numero) < 10) {
        formateado = `0${String(numero)}`;
    } else {
        formateado = String(numero);
    }
    return formateado;
}

async function obtenerImagenes() {
    await extraerUrl();
    return promise = await new Promise(function (resolve, reject) {
        for (let index = 1; index < 21; index++) {
            let numpag = formatearNumero(index);
            try {
                request(urlImagenes.replace(`pag_01`, `pag_${numpag}`)).pipe(fs.createWriteStream(`./src/img/${numpag}.jpg`));
                console.log(`descargando imagen ${numpag}`);
            } catch (e) {
                reject();
                console.log(e);
            }
        }
        resolve();
    });
}


async function generarPdf() {
    await obtenerImagenes();
    try {
        setTimeout(() => {
            console.log('generando pdf');
            new ImagesToPDF.ImagesToPDF().convertFolderToPDF('./src/img/', `./src/pdf/ellidersanantonio${anio}${mes}${dia}.pdf`);
        }, 3000);

    } catch (e) {
        console.error(e);
    }

}

router.get('/', async (req, res) => {
    await generarPdf();
    res.json({
        text: `url :${urlLider} fecha:${anio}/${mes}/${dia}`
    });
});

router.get('/test', (req, res) => {
    res.json({
        text: 'Test'
    });
});

//Crear pdf
generarPdf();
// exportar modulo
module.exports = router;
