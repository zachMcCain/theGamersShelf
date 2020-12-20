import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: []
    }
  }

  render() {
    return (
      <div>{this.props.game}</div>
    )
  }
}


export default Game;