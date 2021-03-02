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
    let { signupUser } = this.props;
    let { name, password, secondPassword } = this.state;
    this.setState({ name: '', password: '', secondPassword: '' });
    signupUser(name, password, secondPassword)
      .then((result) => {
        console.log('result of signup', result);
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
        <input type="password" name="secondPassword" onChange={this.handleChange} />
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
