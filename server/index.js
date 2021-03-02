/* eslint-disable no-console */
/* eslint-disable prefer-const */
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const games = require('../database/games.js');
const users = require('../database/users.js');
const suggestions = require('../database/suggestions.js');

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

/// ///// SIGNUP ROUTE /////////

app.post('/signup', (req, res) => {
  users.addNewUser(req.body)
    .then(() => res.send(true))
    .catch(() => res.send(false));
});

/// ///// LOGIN ROUTE /////////

app.post('/login', (req, res) => {
  console.log('login POST request body: ', req.body);
  users.checkUserCredentials(req.body)
    .then(() => {
      suggestions.getSuggestions(req.body.name)
        .then((result) => {
          let suggestions = { suggestions: result };
          console.log('Suggestions result: ', suggestions);
          // res.write(suggestions)
          return suggestions;
        })
        .then((suggestions) => (
          games.getUserInfo(req.body.name, (collection) => {
            let info = { collection, suggestions };
            res.send(info);
          })
          // res.send('success');
        ));
    })
    .catch(() => res.send(null));
});

/// //// COLLECTION ROUTES ///////

app.post('/api/addToUserCollection', (req, res) => {
  console.log('The data sent: ', req.body);
  // games.addGameToDatabase(req.body, (result => res.send(result)));
  users.addGameToUserCollection(req.body, ((result) => res.send(result)));
  // res.send('Hello world');
});

app.get('/api/getUserCollection', (req, res) => {
  games.getUserInfo('Test', (result) => {
    res.send(result);
  });
});

app.post('/api/removeFromUserCollection', (req, res) => {
  console.log('Connected to removal endpoint: ', req.body);
  if (req.body.user) {
    let { user, game } = req.body;
    users.removeGameFromCollection(user, game)
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    res.send('User not logged in');
  }
});

/// /// SUGGESTIONS ROUTES //////
app.post('/api/getUsersSuggestions', (req, res) => {
  console.log('hit suggestions', req.body.user);
  suggestions.getSuggestions(req.body.user)
    .then((result) => {
      // console.log('result of suggestions: ', result);
    });
  res.send('hit suggestions');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/// /// WISHLIST ROUTES /// ///
app.post('/api/addToWishlist', (req, res) => {
  console.log('hit add to wishlist: ', req.body);
  res.send('Hit add to wishlist route');
});

app.post('/api/removeFromWishlist', (req, res) => {
  console.log('hit remove from wishlist: ', req.body);
  res.send('Hit remove from wishlist route');
});
