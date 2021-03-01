/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    this.setState({ [e.target.name]: input });
  }

  handleSubmit() {
    let { loginUser, updateUserAndCollection } = this.props;
    let { name, password } = this.state;
    loginUser(name, password)
      .then((games) => {
        console.log('games at login: ', games);
        updateUserAndCollection(name, games.games);
      })
      .catch((error) => {
        console.log('error at login: ', error);
      });
  }

  render() {
    let { switchDrop } = this.props;
    return (
      <div id="loginDropdown">
        <input type="text" name="name" onChange={this.handleChange} />
        <br />
        <input type="password" name="password" onChange={this.handleChange} />
        <br />
        <button type="button" name="signup" className="switchDropdown" onClick={switchDrop}>
          signup
        </button>
        <button type="submit" name="login" onClick={this.handleSubmit}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
