const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const environment= require('../environment');


// Import routes
const routes = require('./routes/index');

// Settingss
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
app.use(routes);

