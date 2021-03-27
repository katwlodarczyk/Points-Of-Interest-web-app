const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
const con = require('./mysqlconn');


// Import routers
const poiRouter = require('./routes/poi');

app.get('/addNew', (req,res) => {
    res.sendfile("./public/addNew.html")
});

app.post('/addNew', (req,res) => {
    con.query('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description) VALUES (?,?,?,?,?,?,?)',[req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], (error,results, fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json({success: 1});
        }
    } );
});

app.use(express.static('public'));
app.use('/poi', poiRouter);

// listen on port 3000
app.listen(3000);