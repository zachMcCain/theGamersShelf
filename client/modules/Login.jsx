/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import { loginUser } from '../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toString() });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    let { updateGames, updateSuggestions, updateUser } = this.props;
    loginUser(username, password)
      .then((games) => {
        console.log('Games from login: ', games);
        updateSuggestions(games.suggestions);
        return updateGames(games.games);
      })
      .then(() => {
        updateUser(username);
      });
  }

  render() {
    let { signup } = this.props;
    return (
      <div>
        <h5>Login:</h5>
        <form>
          Username:
          <input
            onChange={this.handleChange}
            name="username"
            type="text"
          />
          Password:
          <input
            onChange={this.handleChange}
            name="password"
            type="text"
          />
          <input
            onClick={this.handleSubmit}
            type="submit"
            defaultValue="Submit"
          />
        </form>
        <div>
          <button type="button" onClick={signup}>Go to Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Login;
