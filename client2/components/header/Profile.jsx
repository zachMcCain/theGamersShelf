import React from 'react';

const Profile = (props) => (
  <div id="profile">
    <div id="username">
      <h5 className="login">
        Welcome Guest!
      </h5>
      <br />
      <h5 className="login">
        <button className="loginButton" type="button">
          LOGIN &#9660;
        </button>
      </h5>
    </div>
    <div id="spacer" />
    <div id="profilePic">
      <div />
    </div>
  </div>
);

export default Profile;
