import axios from 'axios'

// SIGNUP UTILS
const signupUser = function (event) {
  let username = this.state.username;
  let password = this.state.firstPassword;
  let secondPass = this.state.secondPassword;
  console.log('signup user ran')
  console.log('password: ', password, ' second pass: ', secondPass)
  if (password === secondPass /*&& password.length > 5*/) {
    let user = {name: username, password: password}
    axios.post('/signup', user)
    .then(result => console.log('result of signup: ', result))
  } else {
    console.log('Error in signup')
  }
  // console.log('user: ', user)
  // axios.post('/signup', user)
  // .then(result => console.log('result of post: ', result))
}

// LOGIN UTILS
const loginUser = function (event) {
  let username = this.state.username;
  let password = this.state.password;
  let user = {username, password}
  axios.post('/login', user)
  .then(result => console.log('result of login: ', result))
}

//

export {signupUser}