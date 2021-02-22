import React from 'react';

// Change state based on typing into fields
// Grab that state when submitted and send in an axios request
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

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value.toString()})
  }

  render () {
    return (
      <div className="signup_container">
        <h5>Sign Up:</h5>
        Username: <input
          // defaultValue="username"
          onChange={this.handleChange}
          name='username'
          type="text"></input><br></br>
        Password: <input
          // defaultValue="password"
          onChange={this.handleChange}
          name='firstPassword'
          type="text"></input><br></br>
        Confirm Password: <input
          // defaultValue="confirm password"
          onChange={this.handleChange}
          name='secondPassword'
          type="text"></input><br></br>
        <input
          type="submit"
          value="Sign Up"
          onClick={this.props.signup.bind(this)}></input>
        <button
          onClick={this.props.login}>Go to Login</button>
      </div>
    )
  }

}

export default Signup;