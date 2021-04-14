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
    let { loginUser, updateUserAndCollection, drop } = this.props;
    let { name, password } = this.state;
    loginUser(name, password)
      .then((userData) => {
        console.log('Handle submit made it to then block', userData);
        let { games, suggestions, wishlist } = userData;
        updateUserAndCollection(name, games, suggestions, wishlist);
        drop();
      })
      .catch((error) => {
        console.log('error at login: ', error);
      });
  }

  render() {
    let { switchDrop } = this.props;
    return (
      <div id="loginDropdown">
        <p>Username</p>
        <input type="text" name="name" placeholder="Username" onChange={this.handleChange} />
        <br />
        <p>Password</p>
        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
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
