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
  let { name } = req.body;
  let userGames = {};
  users.checkUserCredentials(req.body)
    .then(() => (
      suggestions.getSuggestions(name)
    ))
    .then((suggestedGames) => {
      userGames.suggestions = suggestedGames.records;
      console.log('made it to suggested games');
      return games.getUserCollection(name);
    })
    .then((collection) => {
      console.log('made it to collection section');
      userGames.collection = collection.records;
      return games.getUserWishlist(name);
    })
    .then((wishlist) => {
      console.log('Made it to wishlist section');
      userGames.wishlist = wishlist.records;
      console.log('here are the user\'s games: ', userGames);
      res.send(userGames);
    })
    .catch(() => res.send(null));
});

/// //// COLLECTION ROUTES ///////

app.post('/api/addToUserCollection', (req, res) => {
  // console.log('The data sent: ', req.body);
  games.addGameToUserCollection(req.body, ((result) => res.send(result)));
});

app.get('/api/getUserCollection', (req, res) => {
  games.getUserInfo('Test', (result) => {
    res.send(result);
  });
});

app.post('/api/removeFromUserCollection', (req, res) => {
  if (req.body.user) {
    let { user, game } = req.body;
    games.removeGameFromCollection(user, game)
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    res.send('User not logged in');
  }
});

/// /// SUGGESTIONS ROUTES //////
app.post('/api/getUsersSuggestions', (req, res) => {
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
  games.addGameToUserWishlist(req.body, ((result) => res.send(result)));
});

app.post('/api/removeFromWishlist', (req, res) => {
  if (req.body.user) {
    let { user, game } = req.body;
    games.removeGameFromWishlist(user, game)
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    res.send('User not logged in');
  }
});
