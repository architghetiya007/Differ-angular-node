const express = require("express");
const mongoose = require("mongoose"); // mongoose for mongodb
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const path = require("path");
const client = require('./database');
const engines = require('consolidate');

const app = express();
app.use(cors());

client.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "/public/angular/"));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('view', __dirname + '/public/angular/');
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get('/webapp/*', function(req, res) {
  res.sendFile(__dirname + "/public/angular/" + "index.html");
});

var apiRouter = require('./app/routes/api/v1');
app.use('/api/v1', apiRouter);


app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.listen(port);
console.log("App listening on port " + port);
