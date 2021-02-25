import React from 'react';
import {loginUser} from '../utils/auth.js'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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
    let password = this.state.password;
    loginUser(username, password)
    .then((games) => {
      console.log('Games from login: ', games)
      this.props.updateSuggestions(games.suggestions);
      return this.props.updateGames(games.games);
    })
    .then(result => {
      this.props.updateUser(username)
    })
  }

  render () {
    return (
      <div>
        <h5>Login:</h5>
        <form>
          Username:
          <input
            onChange={this.handleChange}
            name='username'
            type="text"></input>
            Password:
          <input
          onChange={this.handleChange}
            name='password'
            type="text"></input>
          <input
            onClick={this.handleSubmit}
            type='submit'
            defaultValue='Submit'></input>
        </form>
        <div>
          <button onClick={this.props.signup}>Go to Sign Up</button>
        </div>
      </div>
    )

  }
}

export default Login;