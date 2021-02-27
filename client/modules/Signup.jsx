/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import { signupUser } from '../utils/auth';

// If the response comes back good, change isloggedin state

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstPassword: '',
      secondPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toString() });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, firstPassword, secondPassword } = this.state;
    signupUser(username, firstPassword, secondPassword)
      .then(() => console.log('submit ran'))
      .catch((result) => console.log('submit failed', result));
  }

  render() {
    let { login } = this.props;
    return (
      <div className="signup_container">
        <h5>Sign Up:</h5>
        Username:
        <input
          onChange={this.handleChange}
          name="username"
          type="text"
        />
        <br />
        Password:
        <input
          onChange={this.handleChange}
          name="firstPassword"
          type="text"
        />
        <br />
        Confirm Password:
        <input
          onChange={this.handleChange}
          name="secondPassword"
          type="text"
        />
        <br />
        <input
          type="submit"
          value="Sign Up"
          onClick={this.handleSubmit}
        />
        <button
          type="button"
          onClick={login}
        >
          Go to Login
        </button>
      </div>
    );
  }
}

export default Signup;
