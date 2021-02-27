/* eslint-disable react/prop-types */
import React from 'react';

const Suggestion = ({ game }) => {
  console.log('Suggestion game', game);
  return (
    <div>{game.name}</div>
  );
};

export default Suggestion;
