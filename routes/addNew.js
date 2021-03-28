const express = require('express');
const addNewRouter = express.Router();
const con = require('../mysqlconn');

addNewRouter.get('/', (req, res, next) => {
    res.sendFile(`${process.env.PWD}/public/addNew.html`)
});

addNewRouter.post('/poi', (req,res) => {
    con.query('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description) VALUES (?,?,?,?,?,?,?)',[req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], (error,results, fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json({success: 1});
        }
    } );
});

module.exports = addNewRouter;