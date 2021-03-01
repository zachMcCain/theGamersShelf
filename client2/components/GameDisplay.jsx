/* eslint-disable prefer-const */
import React from 'react';
import GameCard from './gameDisplay/GameCard'

const GameDisplay = (props) => {
  let gameCards = <GameCard />;
  return (
    <div id="gameDisplayArea">
      {gameCards}
    </div>
  );
};

export default GameDisplay;
