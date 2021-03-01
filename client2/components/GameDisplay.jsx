/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import GameCard from './gameDisplay/GameCard';

const GameDisplay = ({ games }) => {
  let gameCards = <div />;
  if (games.length) {
    gameCards = games.map((game) => (
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
