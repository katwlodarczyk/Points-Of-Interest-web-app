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

        // app.post('/song/:id/buy', (req, res) => {
        //     con.query('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?', [req.params.id], (error,results,fields)=> {
        //         if(error) {
        //             res.status(500).json({error: error});
        //         } else if(results.affectedRows==1) {
        //             res.json({'message': 'Successfully bought.'});
        //         } else {
        //             res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
        //         }
        //     } );
        // });

        // app.delete('/song/:id/delete', (req, res) => {
        //     con.query('DELETE FROM wadsongs WHERE id=?', [req.params.id], (error,results,fields)=> {
        //         if(error) {
        //             res.status(500).json({error: error});
        //         } else if(results.affectedRows==1) {
        //             res.json({'message': 'Successfully deleted.'});
        //         } else {
        //             res.status(404).json({error: 'Could not delete: could not find a record matching that ID'});
        //         }
        //     } );
        // });


        // listen on port 3000
        app.listen(3000);
    }
});