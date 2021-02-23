import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }

  }
  render () {
    return (
      <div>
        <h5>Login:</h5>
        <form>
          Username:
          <input
            name='username'
            type="text"></input>
            Password:
          <input
            name='password'
            type="text"></input>
          <input
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