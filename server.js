const express = require('express');
const res = require('express/lib/response');
const app = express();
const _ = require('underscore');
const servo = require('./models/servo.js')

const { Pool } = require('pg')
const pool = new Pool({ database: 'servo' });

const cors = require('cors');
app.use(cors());

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

app.get('/api/:owners', (req, res) => {
    let sql = `SELECT * FROM petrolStations WHERE owner = '${req.params.owners}' LIMIT 100;`
    pool.query(sql, (err, dbRes) => {
        res.json(dbRes.rows);
    })
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})