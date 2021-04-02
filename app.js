const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = require('./mysqlconn');
const sessionStore = new MySQLStore({ } , con.promise());

app.use(expressSession({
    store: sessionStore, 
    secret: 'CharlieAndTheChocolateFactory', 
    resave: false, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 600000,
        httpOnly: false
    }
}));

// Import routers
const poiRouter = require('./routes/poi');
const addNewRouter = require('./routes/addNew');

app.use(express.static('public'));

// if the user is logged in
app.get('/logged', (req, res) => {
    res.json({username: req.session.username || null} );
});

// login page
app.get('/login', (req, res, next) => {
    res.sendFile(`${process.env.PWD}/public/login.html`)
});

// Login route
app.post('/login', (req, res) => {
    con.query(`SELECT * FROM poi_users WHERE username=? AND password=?`,
        [req.body.username, req.body.password], (error, results, fields) => {
            if(results.length == 1) {
                req.session.username = req.body.username;
                res.json({"username": req.body.username});
            } else {
                res.status(401).json({ error: "Incorrect login Info!" });
            }
        });
});

// Logout route
app.post('/logout', (req, res) => {
    req.session = null;
    res.json({'success': 1 });
});

// Middleware to protect POST and DELETE routes from access by not logged in users
app.use( (req, res, next) => {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) { 
            next();
        } else {
            res.status(401).json({error: "Please log in!"});
        }
    }
});

app.use('/poi', poiRouter);
app.use('/addNew', addNewRouter);

// if 404, use 404.html page
app.use(function (req, res, next) {
    res.status(404).sendFile(`${process.env.PWD}/public/404.html`)
  })


// listen on port 3000
app.listen(3000);