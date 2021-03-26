const express = require('express');
const poiRouter = express.Router();
const con = require('../mysqlconn');


poiRouter.get('/', (req,res) => {
    con.query(`SELECT * FROM pointsofinterest`, (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/name/:name', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE name=?`,
        [req.params.name], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/region/:region', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE region=?`,
        [req.params.region], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/country/:country', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE country=?`,
        [req.params.country], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/type/:type', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE type=?`,
        [req.params.type], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.post('/add-new', (req,res) => {
    con.query('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description,recommendations) VALUES (?,?,?,?,?,?,?,?)',[req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description, req.body.recommendations], (error,results, fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json({success: 1});
        }
    } );
});

poiRouter.post('/:id/recommend', (req,res) => {
    con.query('UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?', [req.params.id], (error,results,fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else if(results.affectedRows==1) {
            res.json({'message': 'Successfully recommended.'});
        } else {
            res.status(404).json({error: 'No rows updated, could not find a point of interest with matching name'});
        }
    } );
});

module.exports = poiRouter;