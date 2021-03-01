/* eslint-disable react/prop-types */
import React from 'react';

const GameCard = ({ game }) => (
  <div id="gameCard">
    <img alt="board game" src={game.images_medium} />
    <p>{game.name}</p>
  </div>
);

export default GameCard;
