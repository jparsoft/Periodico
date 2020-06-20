const path = require('path');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const app = express();
const morgan = require('morgan');
//const mongoose = require('mongoose');
const PORT = 3200;
const environment = require('./environment');
// db conecction 
/*
mongoose.connect(environment.dbConexion)
    .then((s)=>console.info('db online'))
    .catch(err => console.error(err));
*/
// Import routes
//const routes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || environment.port); /* configure port*/
// app.set('routes', path.join(__dirname, 'routes'));

// Start server
app.listen(app.get('port'), () => {
    console.info(`Authentication server is alive on port: ${app.get('port')}`);
});


//Middelware
app.use(morgan('dev')); /* for url logs */
app.use(express.urlencoded({ extended: false }));/*server only plain text */



// Routes
//app.use(routes);

app.get('/', (req, res) => {
    res.json({
        text: 'Hola mundo'
    });
})
