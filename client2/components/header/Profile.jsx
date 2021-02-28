import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Profile = ({ login, signup, drop, switchDrop }) => {
  let dropdown = <div />;
  if (login) {
    dropdown = <Login switchDrop={switchDrop} />;
  } else if (signup) {
    dropdown = <Signup switchDrop={switchDrop} />;
  }

  return (
    <div id="profile">
      <div id="username">
        <h5 className="login">
          Welcome Guest!
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
