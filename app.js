const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = require('./mysqlconn');

// Import routers
const poiRouter = require('./routes/poi');
const addNewRouter = require('./routes/addNew');

app.use(express.static('public'));
app.use('/poi', poiRouter);
app.use('/addNew', addNewRouter);


// listen on port 3000
app.listen(3000);