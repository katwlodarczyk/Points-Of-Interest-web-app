const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
const con = require('./mysqlconn');

// Set global options
let globalOptions =  {...}
// Initialize instance of AWN
let notifier = new AWN(globalOptions)

// Set custom options for next call if needed, it will override globals
let nextCallOptions = {...}
// Call one of available functions
notifier.success('Your custom message', nextCallOptions)


// Import routers
const poiRouter = require('./routes/poi');

app.use(express.static('public'));


app.use('/poi', poiRouter);

// listen on port 3000
app.listen(3000);