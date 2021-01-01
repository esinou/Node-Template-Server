const PORT = 3002;
var colors = require('colors');

const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use( cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(require('./routes/index'));

server.listen(PORT, () => {
    console.log("[NOM PROJET] running on port".yellow, `${PORT}`.grey);
});
