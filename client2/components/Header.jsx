import React from 'react';
import Profile from './header/Profile';

const Header = (props) => (
  <div id="header">
    <div id="title">
      <h1>The Gamer&apos;s Shelf</h1>
    </div>
    <div>
      <Profile />
    </div>
  </div>
);

export default Header;
