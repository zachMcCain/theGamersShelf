import axios from 'axios'

// SIGNUP UTILS
const signupUser = (user, password) => {
  user = {user, password}
  axios.post('/signup', user)
  .then(result => console.log('result of post: ', result))
}

// LOGIN UTILS


//