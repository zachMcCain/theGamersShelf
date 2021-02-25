require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const games = require('../database/games.js');
const users = require('../database/users.js');
const suggestions = require('../database/suggestions.js');
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
    suggestions.getSuggestions(req.body.name)
    .then(result => {
      let suggestions = {suggestions: result}
      console.log('Suggestions result: ', suggestions)
      // res.write(suggestions)
      return suggestions
    })
    .then(suggestions => {
      return games.getUserInfo(req.body.name, (collection) => {
        let info = {collection: collection, suggestions: suggestions}
        res.send(info);
      })
      res.send('success')
    })
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

app.post('/api/removeFromUserCollection', function(req, res) {
  console.log('Connected to removal endpoint: ', req.body);
  if (req.body.user) {
    let user = req.body.user;
    let game = req.body.game;
    users.removeGameFromCollection(user, game)
    .then(result => res.send(result))
    .catch(error => res.send(error))
  } else {
    res.send('User not logged in')
  }
})

////// SUGGESTIONS ROUTES
app.post('/api/getUsersSuggestions', (req, res) => {
  console.log('hit suggestions')
  suggestions.getSuggestions(req.body.user)
  .then(result => {
    console.log('result of suggestions: ', result)
  })
  res.send('hit suggestions')
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})