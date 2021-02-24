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



//////// SIGNUP ROUTES /////////
// app.get('/signup', (req, res) => {
//   console.log('signup GET request body: ', req.body)
//   res.send(`<h1>Welcome to the signup page!</h1>`)
// })

app.post('/signup', (req, res) => {
  users.addNewUser(req.body)
  .then(result => res.send(true))
  .catch(error => res.send(false))
});


//////// LOGIN ROUTES /////////
// app.get('/login', (req, res) => {
//   console.log('login GET request body: ', req.body)
//   // res.send(express.static(path.join(__dirname, '../public/login')))
// })

app.post('/login', (req, res) => {
  console.log('login POST request body: ', req.body);
  users.checkUserCredentials(req.body)
  .then(result => {
    return games.getUserInfo(req.body.name, (result) => {
      res.send(result);
    })
    res.send('success')
  })
  .catch(result => res.send(null))
});



/////// COLLECTION ROUTES ///////

app.post('/api/addToUserCollection', function(req, res) {
  console.log('The data sent: ', req.body);
  // games.addGameToDatabase(req.body, (result => res.send(result)));
  users.addGameToUserCollection(req.body, (result => res.send(result)));
  // res.send('Hello world');
})

app.get('/api/getUserCollection', function(req, res) {
  games.getUserInfo('Test', (result) => {
    res.send(result);
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})