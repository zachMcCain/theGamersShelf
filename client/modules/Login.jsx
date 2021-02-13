import React from 'react';

const Login = (props) => {
  return (
    <div>Login:
      <form>
        <input name='username' defaultValue='username' type="text"></input>
        <input name='password' defaultValue='password' type="text"></input>
        <input type='submit' defaultValue='Submit'></input>
      </form>
    </div>
  )
}

export default Login;