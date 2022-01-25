const express = require('express');
const res = require('express/lib/response');
const app = express();
const _ = require('underscore');
const random = require('./models/random.js');
const servo = require('./models/servo.js');

const { Pool } = require('pg')
const pool = new Pool({ database: 'servo' });


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    let sql = "SELECT * FROM petrolStations;"
})


app.get('/api/stations/all', (req, res) => {
    let sql = "SELECT * FROM petrolStations;"
    function dbQuery(sql) {
        pool.query(sql, (err, dbRes) => {
            res.json(dbRes.rows)
        })
    }
    dbQuery(sql);
})

// app.get('/api/stats', (req, res) => {

// })

app.get('/api/owners', (req, res) => {
    let sql = `SELECT DISTINCT owner FROM petrolStations;`
    pool.query(sql, (err, dbRes) => {
        res.json(dbRes.rows);
    })
});

app.get('/api/stations/random', (req, res) => {
    let randomId = random.randomNumber()
    let sql = `SELECT * FROM petrolStations WHERE objectid = ${randomId}`;
    pool.query(sql, (err, dbRes) => {
        res.json(dbRes.rows)
    })
});

app.get('/api/stations/nearest', (req, res) => {
    const coordinates = { botLat: req.query.botLat, 
                        botLng: req.query.botLng,
                        topLat: req.query.topLat, 
                        topLng: req.query.topLng }
    const sql = servo.getPetrolStations(coordinates);
    console.log(sql);
    pool.query(sql, (err, dbRes) => {
        res.json(dbRes.rows)
    })
})

app.get('/api/stations/stats', (req, res) => {
    let sql = 'SELECT owner, count(*) FROM petrolStations GROUP BY owner ORDER BY count DESC;';
    pool.query(sql, (err, dbRes) => {
        res.json(dbRes.rows)
    })
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})