import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: []
    }
  }

  render() {
    console.log('Game props: ', this.props);
    return (
      <div className="game">
        <div className="gameTitle">{this.props.game}</div><div className="gameDescription">{this.props.description}</div>
        <img src={this.props.image}/>
      </div>
    )
  }
}


export default Game;