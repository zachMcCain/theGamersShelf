require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const games = require('../database/games.js');
const users = require('../database/users.js');
const bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json())


//////// LOGIN ROUTES /////////
app.get('/login', (req, res) => {
  console.log('login GET request body: ', req.body)
  // res.send(express.static(path.join(__dirname, '../public/login')))
})

app.post('/login', (req, res) => {
  console.log('login POST request body: ', req.body);
  users.checkUserCredentials(req.body, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result);
    }
  })
});


//////// SIGNUP ROUTES /////////
app.get('/signup', (req, res) => {
  console.log('signup GET request body: ', req.body)
  res.send(`<h1>Welcome to the signup page!</h1>`)
})

app.post('/signup', (req, res) => {
  console.log('signup POST request body: ', req.body)
  users.addNewUser(req.body, (error, response) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(response)
    }
  });
});


/////// COLLECTION ROUTES ///////

app.post('/api/addToUserCollection', function(req, res) {
  console.log('The data sent: ', req.body);
  games.addGameToDatabase(req.body, (result => res.send(result)));
  // res.send('Hello world');
})

app.get('/api/getUserCollection', function(req, res) {
  games.getUserInfo(1, (result) => {
    res.send(result);
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})