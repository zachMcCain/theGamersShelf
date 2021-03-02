/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import axios from 'axios';

// SIGNUP UTILS

// Unbound signup utility
const signupUser = (username, firstPassword, secondPassword) => {
  if (firstPassword === secondPassword && firstPassword.length > 5) {
    let user = { name: username, password: firstPassword };
    return axios.post('/signup', user)
      .then((result) => {
        if (!result.data) {
          window.alert('Signup failed. User already exists');
          throw new Error('User already exists');
        } else {
          window.alert('Signup Successful!');
          // loginUser.bind(this);
          // login as the new user based on the name provided
        }
      });
  }
  window.alert('Password must be at least 6 characters long');
  return Promise.reject(new Error());
};

// LOGIN UTILS

// unbound login utility
const loginUser = (name, password) => {
  let user = { name, password };

  return axios.post('/login', user)
    .then((result) => {
      if (result.data) {
        console.log('time to update games', result.data);
        let { collection, suggestions, wishlist } = result.data;
        // let {suggestions} = result.data.suggestions.records;
        // let wishlist = result.data.wishlist.records;
        let games = {};
        games.games = [];
        games.suggestions = [];
        games.wishlist = [];
        for (let i = 0; i < collection.length; i += 1) {
          games.games.push(collection[i]._fields[0].properties);
        }
        for (let i = 0; i < suggestions.length; i += 1) {
          games.suggestions.push(suggestions[i]._fields[0].properties);
        }
        for (let i = 0; i < wishlist.length; i += 1) {
          games.wishlist.push(wishlist[i]._fields[0].properties);
        }
        return games;
      }
      window.alert('Login credentials invalid');
      throw new Error();
    });
};

export { signupUser, loginUser };
