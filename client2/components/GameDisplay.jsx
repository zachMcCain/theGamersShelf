/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import GameCard from './gameDisplay/GameCard';

const GameDisplay = ({ collection }) => {
  let gameCards = <div />;
  if (collection.length) {
    gameCards = collection.map((game) => (
      <GameCard game={game} />
    ));
  }

  return (
    <div id="gameDisplayArea">
      {gameCards}
    </div>
  );
};

export default GameDisplay;
