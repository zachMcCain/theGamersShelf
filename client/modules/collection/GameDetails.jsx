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
      <div className="modal">
        <div className="modal-main details">
          <h1>{this.props.game.name}</h1>
          <button className="left addGameButton" onClick={this.remove}>Remove from Collection</button>
          <button className="right addGameButton" onClick={this.props.closeDetails}>Close Details</button>
          <br></br>
          {/* Find a way to cause a vertical split here */}
          <div className="centeringDiv">
            <img src={this.props.game.image_url}/>
          </div>
          <p>{this.props.game.description_preview}</p>
          <p>Player count: {this.props.game.min_players}-{this.props.game.max_players}</p>
        </div>
      </div>
    )

  }
}


export default GameDetails;