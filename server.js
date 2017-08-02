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

    console.log("Example app listening at http://%s:%s", host, port)
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
    admin: req.body.body.admin,
  };
  usersData.users.push(user)
  jsonfile.writeFile(usersFile, usersData, {spaces: 2}, 'utf-8', function (err) {
    if (err) throw err
  })
  res.send(usersData);
});

/* app.put('/api/users/:username', (request, response) => {

  let userName = request.params.username;

  let user = usersData.users.filter(user => {
    return user.name == userName;
  })[0];

  const index = usersData.users.indexOf(user);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    user[key] = request.body[key];
  });

  usersData.users[index] = contact;

  // response.json({ message: `User ${contactId} updated.`});
  response.json(contacts[index]);
}); */

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
    quantity: req.body.body.quantity,
  };
  stocksData.stocks.push(stock);
  jsonfile.writeFile(stocksFile, stocksData, {spaces: 2}, 'utf-8', function (err) {
    if (err) throw err
  })
  res.send(stocksData)
});
