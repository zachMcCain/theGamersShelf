import React from 'react';
import Game from './collection/Game.jsx'
import AddGame from './collection/AddGame.jsx';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let games;
    let newGame;
    if (this.props.open) {
      games = this.props.games.map((game) => {
        return <Game game={game} key={game}/>;
      })
      newGame = <AddGame />;
    } else {
      games = <Game />;
    }

    return (
      <div id="collection">
        <div onClick={this.props.openShelf}>home</div>
        <div>
          <h4>My Collection</h4>
          {newGame}
          {games}
        </div>
      </div>
    )
  }
}


export default Collection;