import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value.toString()})
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
            onClick={this.props.login.bind(this)}
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