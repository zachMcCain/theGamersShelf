import React from 'react';

const LeftSideBar = ({ handleDisplay }) => (
  <div id="leftSideBar">
    <button
      type="button"
      onClick={() => {
        handleDisplay('displaySuggestions');
      }}
    >
      Suggestions
    </button>
    <hr />
    <button
      type="button"
      onClick={() => {
        handleDisplay('displayCollection');
      }}
    >
      Collection
    </button>
    <hr />
    <button
      type="button"
      onClick={() => {
        handleDisplay('displayWishlist');
      }}
    >
      Wishlist
    </button>
    <hr />
  </div>
);

export default LeftSideBar;
