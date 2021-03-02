/* eslint-disable prefer-const */
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
        drop={drop}
      />
    );
  } else if (signup) {
    dropdown = (
      <Signup
        switchDrop={switchDrop}
        signupUser={signupUser}
        loginUser={loginUser}
        updateUserAndCollection={updateUserAndCollection}
        drop={drop}
      />
    );
  }

  let name = user || 'Guest';

  return (
    <div id="profile">
      <div id="username">
        <h5 className="login">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
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
      {/* <div id="profilePic"> */}
      {/* <div /> */}
      {/* </div> */}
      {dropdown}
    </div>
  );
};

export default Profile;
