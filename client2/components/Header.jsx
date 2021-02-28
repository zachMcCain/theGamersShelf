import React from 'react';
import Profile from './header/Profile';

const Header = ({ login, signup, drop, switchDrop }) => (
  <div id="header">
    <div id="title">
      <h1>The Gamer&apos;s Shelf</h1>
    </div>
    <div>
      <Profile
        login={login}
        signup={signup}
        drop={drop}
        switchDrop={switchDrop}
      />
    </div>
  </div>
);

export default Header;
