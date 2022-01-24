const express = require('express');
const res = require('express/lib/response');
const app = express();
const _ = require('underscore');

app.use(express.static('public'));

app.get('/', (req, res) => {
    
})

app.listen(8080, () => {
    "Listening on port 8080";
})