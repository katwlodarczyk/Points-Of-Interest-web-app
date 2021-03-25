const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const mysql = require('mysql2');

const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mysql'});

con.connect( err=> {
    if(err) {
        console.log(`Error connecting to mysql: ${err}`);
        process.exit(1);
    } else { 
        console.log('connected to mysql ok');

        app.use(express.static('public'));

        // routes
        app.get('/poi', (req,res) => {
            con.query(`SELECT * FROM pointsofinterest`, (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });

        app.get('/poi/:name', (req, res) => {
            con.query(`SELECT * FROM pointsofinterest WHERE name=?`,
                [req.params.name], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });

        app.get('/poi/region/:region', (req, res) => {
            con.query(`SELECT * FROM pointsofinterest WHERE region=?`,
                [req.params.region], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });

        app.get('/poi/country/:country', (req, res) => {
            con.query(`SELECT * FROM pointsofinterest WHERE country=?`,
                [req.params.country], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });

        app.get('/poi/type/:type', (req, res) => {
            con.query(`SELECT * FROM pointsofinterest WHERE type=?`,
                [req.params.type], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });


        app.get('/poi/id/:id', (req, res) => {
            con.query(`SELECT * FROM pointsofinterest WHERE id=?`,
                [req.params.id], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        })

        app.post('/poi/add-new/', (req,res) => {
            con.query('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description,recommendations) VALUES (?,?,?,?,?,?,?,?)',[req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description, req.body.recommendations], (error,results, fields)=> {
                if(error) {
                    res.status(500).json({error: error});
                } else {
                    res.json({success: 1});
                }
            } );
        });

        app.post('/poi/:name/recommend', (req,res) => {
            con.query('UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE name=?', [req.params.name], (error,results,fields)=> {
                if(error) {
                    res.status(500).json({error: error});
                } else if(results.affectedRows==1) {
                    res.json({'message': 'Successfully recommended.'});
                } else {
                    res.status(404).json({error: 'No rows updated, could not find a point of interest with matching name'});
                }
            } );
        });


        // const addNew = {
        //     name: "Szczecin",
        //     type:"city",
        //     country:"Poland",
        //     region:"Westpomeranian",
        //     lon:53.44,
        //     lat:14.54,
        //     description: "Great city, Kat's hometown",
        //     recommendations: 0 
        //  }
     
        //  const response = await fetch(`/poi/add-new/`, {
        //      method: 'POST',
        //      headers: {
        //          'Content-Type' : 'application/json'
        //      },
        //      body: JSON.stringify(addNew)
        //  });
     
        //  if(response.status == 404) {
        //      alert("Error. The point of interest has not been added!");
        //  } else {
        //      const data = await response.json();
        //      alert(`You have added a new point of interest.`)
        //  }

        // listen on port 3000
        app.listen(3000);
    }
});