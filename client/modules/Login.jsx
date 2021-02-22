import React from 'react';

const Login = (props) => {
  return (
    <div>Login:
      <form>
        <input name='username' defaultValue='username' type="text"></input>
        <input name='password' defaultValue='password' type="text"></input>
        <input type='submit' defaultValue='Submit'></input>
      </form>
      <div>
        <button onClick={props.signup}>Go to Sign Up</button>
      </div>
    </div>
  )
}

export default Login;