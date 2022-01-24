const express = require('express');
const res = require('express/lib/response');
const app = express();
const _ = require('underscore');

const { Pool } = require('pg')

const pool = new Pool({
    database: 'servo'
})

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {


})

app.get('/api/stations/all', (req, res) => {

    let sql = 'select * from petrolStations Limit 500;'

    pool.query(sql, (err, dbRes) => {

        let result = res.json(dbRes.rows)
        console.log(result)
    })

})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})