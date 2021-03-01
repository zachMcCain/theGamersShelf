import React from 'react';

const Login = ({ switchDrop }) => (
  <div id="loginDropdown">
    <input type="text" />
    <br />
    <input type="password" />
    <br />
    <button type="button" name="signup" className="switchDropdown" onClick={switchDrop}>
      signup
    </button>
    <button type="submit" name="login">
      Login
    </button>
  </div>
);

export default Login;
