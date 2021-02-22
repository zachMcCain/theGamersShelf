import axios from 'axios'

// SIGNUP UTILS
const signupUser = function (event) {
  let username = this.state.username;
  let password = this.state.firstPassword;
  let secondPass = this.state.secondPassword;

  if (password === secondPass && password.length > 5) {
    let user = {name: username, password: password}
    axios.post('/signup', user)
    .then(result => console.log('result of signup: ', result))
  } else {
    // alert that passwords do not match
  }
  // console.log('user: ', user)
  // axios.post('/signup', user)
  // .then(result => console.log('result of post: ', result))
}

// LOGIN UTILS


//

export {signupUser}