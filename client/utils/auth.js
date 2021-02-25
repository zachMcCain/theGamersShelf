import axios from 'axios'

// SIGNUP UTILS

// Unbound signup utility
const signupUser = (username, firstPassword, secondPassword) => {
  if (firstPassword === secondPassword && firstPassword.length > 5) {
    let user = {name: username, password: firstPassword}
    return axios.post('/signup', user)
    .then(result => {
      if (!result.data) {
        window.alert('Signup failed. User already exists')
        throw new Error('User already exists');
      } else {
        window.alert('Signup Successful!')
        // loginUser.bind(this);
        // login as the new user based on the name provided
      }
    })
  } else {
    window.alert('Password must be at least 6 characters long')
    return Promise.reject('Password must be 6 characters long')
    // return new Error('Password must be 6 characters long')
    console.log('Error in signup')
  }
}



// LOGIN UTILS

// unbound login utility
const loginUser = (name, password) => {
  let user = {name, password}

  return axios.post('/login', user)
  .then(result => {
    console.log('result of login: ', result.data);
    if (result.data) {
      // console.log('time to update games', result.data)
      let records = result.data.collection.records;
      let suggestions = result.data.suggestions.suggestions.records;
      console.log('records: ', result.data)
      let games = {};
      games.games = []
      games.suggestions = []
      for (var i = 0; i < records.length; i++) {
        games.games.push(records[i]._fields[0].properties);
      }
      for (var i = 0; i < suggestions.length; i++) {
        games.suggestions.push(suggestions[i]._fields[0].properties);
      }
      return games;
    } else {
      window.alert('Login credentials invalid')
    }
  })
}


export {signupUser, loginUser}