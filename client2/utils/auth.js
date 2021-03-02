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
        // console.log('time to update games', result.data)
        let { records } = result.data.collection;
        let suggestions = result.data.suggestions.suggestions.records;
        let games = {};
        games.games = [];
        games.suggestions = [];
        for (let i = 0; i < records.length; i += 1) {
          games.games.push(records[i]._fields[0].properties);
        }
        for (let i = 0; i < suggestions.length; i += 1) {
          games.suggestions.push(suggestions[i]._fields[0].properties);
        }
        return games;
      }
      window.alert('Login credentials invalid');
      throw new Error();
    });
};

export { signupUser, loginUser };
