import React from 'react';
import Game from './collection/Game.jsx'
import AddGame from './collection/AddGame.jsx';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let games;
    if (this.props.open) {
      games = this.props.games.map((game) => {
        return <Game game={game} key={game}/>;
      })
    } else {
      games = <Game />;
    }

    return (
      <div>
        <AddGame />
        <h4 id="collection" onClick={this.props.openShelf}>My Collection</h4>
        {games}
      </div>
    )
  }
}


export default Collection;