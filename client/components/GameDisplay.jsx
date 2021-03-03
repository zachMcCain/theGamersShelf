/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import GameCard from './gameDisplay/GameCard';
import GameDetail from './gameDisplay/GameDetail';

const GameDisplay = ({
  games, handleDisplay,
  displayIndividual, handleSelection,
  selectedGame, addGameToCollection,
  removeGameFromCollection, addGameToWishlist,
  removeGameFromWishlist,
}) => {
  let gameCards = (
    <div>
      <div />
      <div id="suggestSearch">
        <h5>
          Please login to see list!
        </h5>
      </div>
    </div>
  );
  if (games.length) {
    gameCards = games.map((game) => (
      <GameCard
        game={game}
        handleDisplay={handleDisplay}
        handleSelection={handleSelection}
        key={game.id}
      />
    ));
  }

  if (displayIndividual) {
    return (
      <GameDetail
        game={selectedGame}
        addGameToCollection={addGameToCollection}
        removeGameFromCollection={removeGameFromCollection}
        addGameToWishlist={addGameToWishlist}
        removeGameFromWishlist={removeGameFromWishlist}
      />
    );
  }
  return (
    <div id="gameDisplayArea">
      {gameCards}
    </div>
  );
};

export default GameDisplay;
