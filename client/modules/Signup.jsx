import React from 'react';
import {signupUser} from '../utils/auth.js'

// If the response comes back good, change isloggedin state

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstPassword: '',
      secondPassword: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value.toString()})
  }

  handleSubmit(e) {
    e.preventDefault();
    let username = this.state.username;
    let firstPassword = this.state.firstPassword;
    let secondPassword = this.state.secondPassword;
    signupUser(username, firstPassword, secondPassword)
    .then(result => console.log('submit ran'))
    .catch(result => console.log('submit failed', result))
  }

  render () {
    return (
      <div className="signup_container">
        <h5>Sign Up:</h5>
        Username: <input
          onChange={this.handleChange}
          name='username'
          type="text"></input><br></br>
        Password: <input
          onChange={this.handleChange}
          name='firstPassword'
          type="text"></input><br></br>
        Confirm Password: <input
          onChange={this.handleChange}
          name='secondPassword'
          type="text"></input><br></br>
        <input
          type="submit"
          value="Sign Up"
          onClick={this.handleSubmit}></input>
        <button
          onClick={this.props.login}>Go to Login</button>
      </div>
    )
  }

}

export default Signup;