/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

const GameCard = ({ game, handleDisplay, handleSelection }) => (
  <div
    id="gameCard"
    onClick={() => {
      handleDisplay('displayIndividual');
      handleSelection(game);
    }}
  >
    <h2>{game.name}</h2>
    <img alt="board game" src={game.images_medium} />
    <p id="gameInfo">
      {game.description_preview.slice(0, 200)}
      <br />
      <br />
      ... see more
    </p>
  </div>
);

export default GameCard;
