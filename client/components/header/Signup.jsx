/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      secondPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    this.setState({ [e.target.name]: input });
  }

  handleSubmit() {
    let { signupUser, drop, loginUser } = this.props;
    let { name, password, secondPassword } = this.state;
    signupUser(name, password, secondPassword)
      .then((result) => {
        loginUser(name, password);
        console.log('result of signup', result);
        drop();
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
        <p>Confirm Password</p>
        <input type="password" name="secondPassword" placeholder="Confirm Password" onChange={this.handleChange} />
        <br />
        <button type="button" name="login" className="switchDropdown" onClick={switchDrop}>
          login
        </button>
        <button type="submit" name="signup" onClick={this.handleSubmit}>
          Signup
        </button>
      </div>
    );
  }
}

export default Signup;
