import React from 'react';

const Signup = ({ switchDrop }) => (
  <div id="loginDropdown">
    <input type="text" />
    <br />
    <input type="password" />
    <br />
    <input type="password" />
    <br />
    <button type="button" name="login" className="switchDropdown" onClick={switchDrop}>
      login
    </button>
    <button type="submit" name="signup">
      Signup
    </button>
  </div>
);

export default Signup;
