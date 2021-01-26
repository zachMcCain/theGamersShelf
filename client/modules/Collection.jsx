import React from 'react';
import Game from './collection/Game.jsx'
import AddGame from './collection/AddGame.jsx';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addGameWindow: false
    }
    this.openAddGame = this.openAddGame.bind(this);
  }

  openAddGame() {
    this.setState({addGameWindow: !this.state.addGameWindow})
  }

  render() {
    let games = this.props.games.map((game) => {
      return <Game
        game={game}
        key={game.id}
        image={game.images_medium}
        description={game.description_preview}
        removeGame={this.props.removeGame}/>;
    })
    let newGame;
    if (this.state.addGameWindow) {
      newGame = <AddGame close={this.openAddGame} changeSearch={this.props.changeSearch} addGame={this.props.addGame}/>;
    }

    return (
      <div id="collection">
        <div>
          <h4>My Collection</h4>
          <div className="centeringDiv">
            <button className="addGameButton" onClick={this.openAddGame}>Add Game</button>
            {newGame}
          </div>
          <div className="gameContainer">
            {games}
          </div>
        </div>
      </div>
    )
  }
}


export default Collection;