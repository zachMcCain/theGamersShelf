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
      <div>Login:
        <form>
          <input name='username' defaultValue='username' type="text"></input>
          <input name='password' defaultValue='password' type="text"></input>
          <input type='submit' defaultValue='Submit'></input>
        </form>
        <div>
          <button onClick={this.props.signup}>Go to Sign Up</button>
        </div>
      </div>
    )

  }
}

export default Login;