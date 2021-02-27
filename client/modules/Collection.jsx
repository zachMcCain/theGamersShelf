/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import Game from './collection/Game';
import AddGame from './collection/AddGame';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addGameWindow: false,
    };
    this.openAddGame = this.openAddGame.bind(this);
  }

  openAddGame() {
    let { addGameWindow } = this.state;
    this.setState({ addGameWindow: !addGameWindow });
  }

  render() {
    let { games, removeGame, addGame } = this.props;
    let { addGameWindow } = this.state;
    games = games.map((game) => (
      <Game
        game={game}
        key={game.id}
        image={game.images_medium}
        description={game.description_preview}
        removeGame={removeGame}
      />
    ));
    let newGame;
    if (addGameWindow) {
      newGame = (
        <AddGame
          close={this.openAddGame}
          addGame={addGame}
        />
      );
    }

    return (
      <div id="collection">
        <div>
          <h4>My Collection</h4>
          <div className="centeringDiv">
            <button type="button" className="addGameButton" onClick={this.openAddGame}>Add Game</button>
            {newGame}
          </div>
          <div className="gameContainer">
            {games}
          </div>
        </div>
      </div>
    );
  }
}

export default Collection;
