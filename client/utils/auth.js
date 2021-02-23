import axios from 'axios'

// SIGNUP UTILS
const signupUser = function (event) {
  let username = this.state.username;
  let password = this.state.firstPassword;
  let secondPass = this.state.secondPassword;
  console.log('signup user ran')
  console.log('password: ', password, ' second pass: ', secondPass)
  if (password === secondPass && password.length > 5) {
    let user = {name: username, password: password}
    axios.post('/signup', user)
    .then(result => {
      if (!result.data) {
        window.alert('Signup failed. User already exists')
      } else {
        window.alert('Signup Successful!')
        // loginUser.bind(this);
        // login as the new user based on the name provided
      }
    })
  } else {
    window.alert('Username already exists')
    console.log('Error in signup')
  }
}

// LOGIN UTILS
const loginUser = function (event) {
  console.log('login ran', this)
  event ? event.preventDefault() : ''
  let name = this.state.username;
  let password = this.state.password;
  let user = {name, password}

  axios.post('/login', user)
  .then(result => console.log('result of login: ', result))
}

//

export {signupUser, loginUser}