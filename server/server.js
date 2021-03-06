var http = require("http");
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var passport = require('passport');
const LocalStrategy = require('passport-local');
var jsonfile = require('jsonfile')

const usersData = require('./usersData.json');
const stocksData = require('./stocksData.json');

var usersFile = './usersData.json'
var stocksFile = './stocksData.json'

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
});

/*      Users       */
//rest api to get users
app.get('/api/users', function (req, res) {
    res.send(JSON.stringify(usersData));
});
//rest api to post new user
app.post('/api/users', (req, res) => {
  let user = {
    username: req.body.body.username,
    password: req.body.body.password,
    admin: req.body.body.admin
  };
  usersData.users.push(user)
  jsonfile.writeFile(usersFile, usersData, {spaces: 2}, 'utf-8', function (err) {
    if (err) throw err
  })
  res.send(usersData);
});
//rest api to update a user
app.put('/api/users/:username', (req, res) => {
  for (var i = 0; i < usersData.users.length; i++) {
    if(usersData.users[i].username === req.params.username){
      usersData.users[i] = {
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
      }
      jsonfile.writeFile(usersFile, usersData, {spaces: 2}, 'utf-8', function (err) {
        if (err) throw err
      })
      res.send(usersData)
      break
    }
  }
})
//rest api to delete a user
app.delete('/api/users/:username', (req, res) => {
  for (var i = 0; i < usersData.users.length; i++) {
    if(usersData.users[i].username === req.params.username){
      usersData.users.splice(i,1)
      jsonfile.writeFile(usersFile, usersData, {spaces: 2}, 'utf-8', function (err) {
        if (err) throw err
      })
      res.send(usersData)
      break
    }
  }
});

/*      Stocks      */
//rest api to get stocks
app.get('/api/stocks', function (req, res) {
    res.send(JSON.stringify(stocksData));
});
//rest api to post new stocks
app.post('/api/stocks', (req, res) => {
  let stock = {
    name: req.body.body.name,
    price: req.body.body.price,
    quantity: req.body.body.quantity
  };
  stocksData.stocks.push(stock);
  jsonfile.writeFile(stocksFile, stocksData, {spaces: 2}, 'utf-8', function (err) {
    if (err) throw err
  })
  res.send(stocksData)
});
//rest api to update a stock
app.put('/api/stocks/edit/:name', (req, res) => {
  for (var i = 0; i < stocksData.stocks.length; i++) {
    if(stocksData.stocks[i].name === req.params.name){
      stocksData.stocks[i] = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      }
      jsonfile.writeFile(stocksFile, stocksData, {spaces: 2}, 'utf-8', function (err) {
        if (err) throw err
      })
      res.send(stocksData)
      break
    }
  }
})
//rest api to sell a stock
app.put('/api/stocks/:name', (req, res) => {
  for (var i = 0; i < stocksData.stocks.length; i++) {
    if(stocksData.stocks[i].name === req.params.name){
      req.body.quantity = parseInt(req.body.quantity)
      stocksData.stocks[i].quantity = stocksData.stocks[i].quantity - req.body.quantity
      jsonfile.writeFile(stocksFile, stocksData, {spaces: 2}, 'utf-8', function (err) {
        if (err) throw err
      })
      res.send('worked') 
      break
    }
  }
})
//rest api to delete a stock
app.delete('/api/stocks/:name', (req, res) => {
  for (var i = 0; i < stocksData.stocks.length; i++) {
    if(stocksData.stocks[i].name === req.params.name){
      stocksData.stocks.splice(i,1)
      jsonfile.writeFile(stocksFile, stocksData, {spaces: 2}, 'utf-8', function (err) {
        if (err) throw err
      })
      res.send(stocksData)
      break
    }
  }
});
