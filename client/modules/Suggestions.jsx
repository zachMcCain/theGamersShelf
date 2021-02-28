/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import Suggestion from './suggestions/Suggestion';

const Suggestions = ({ games, openShelf }) => {
  let suggestions;
  if (games.length) {
    suggestions = games.map((game) => (
      <Suggestion game={game} />
    ));
  }
  return (
    <div>
      <h4 id="suggestions" onClick={openShelf}>Suggestions</h4>
      {suggestions}
    </div>
  );
};

export default Suggestions;
