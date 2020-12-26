import React from 'react';

class GameDetails extends React.Component {
  constructor(props) {
    super(props)
    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeGame(this.props.game.id)
  }

  render() {
    return (
      <div className="gameDetails">
        <div onClick={this.props.closeDetails}>Close Details</div>
        <div>{this.props.game.name}</div>
        <div onClick={this.remove}>Remove from Collection</div>
        <img src={this.props.game.image_url}/>
        <div>{this.props.game.description_preview}</div>
        <div>Minimum players: {this.props.game.min_players}</div>
        <div>Maximum players: {this.props.game.max_players}</div>
      </div>
    )

  }
}


export default GameDetails;