const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
const con = require('./mysqlconn');

// Import routers
const poiRouter = require('./routes/poi');

app.use(express.static('public'));


app.use('/poi', poiRouter);

// listen on port 3000
app.listen(3000);