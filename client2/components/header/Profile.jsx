/* eslint-disable react/prop-types */
import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Profile = ({
  login, signup,
  drop, switchDrop,
  loginUser, signupUser,
  updateUserAndCollection, user,
}) => {
  let dropdown = <div />;
  if (login) {
    dropdown = (
      <Login
        switchDrop={switchDrop}
        loginUser={loginUser}
        updateUserAndCollection={updateUserAndCollection}
      />
    );
  } else if (signup) {
    dropdown = (
      <Signup
        switchDrop={switchDrop}
        signupUser={signupUser}
        updateUserAndCollection={updateUserAndCollection}
      />
    );
  }

  let name = user ? user : 'Guest'

  return (
    <div id="profile">
      <div id="username">
        <h5 className="login">
          Welcome {name}!
        </h5>
        <br />
        <h5 className="login">
          <button
            className="loginButton"
            type="button"
            onClick={drop}
          >
            LOGIN &#9660;
          </button>
        </h5>
      </div>
      <div id="spacer" />
      <div id="profilePic">
        <div />
      </div>
      {dropdown}
    </div>
  );
};

export default Profile;
