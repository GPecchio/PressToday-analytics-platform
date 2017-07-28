var http = require("http");
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var passport = require('passport');
const LocalStrategy = require('passport-local');

const usersData = require('./usersData.json');
const stocksData = require('./stocksData.json');

//start body-parser configuration
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

//create app server
var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});

//rest api to get users
app.get('/users', function (req, res) {
    res.send(JSON.stringify(usersData));
});

//rest api to get stocks
app.get('/stocks', function (req, res) {
    res.send(JSON.stringify(stocksData));
});