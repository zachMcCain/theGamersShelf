import React from 'react';
import Game from './collection/Game.jsx'

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let games;
    if (this.props.open) {
      games = this.props.games.map((game) => {
        return <Game game={game}/>;
      })
    } else {
      games = <Game />;
    }
    console.log('Games: ', games)
    return (
      <div>
        <h4 id="collection" onClick={this.props.openShelf}>My Collection</h4>
        {games}
      </div>
    )
  }
}


export default Collection;