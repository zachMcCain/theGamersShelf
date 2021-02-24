import React from 'react';

class GameDetails extends React.Component {
  constructor(props) {
    super(props)
    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.removeGame(this.props.game.name)
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
          <span>Player count: {this.props.game.min_players}-{this.props.game.max_players}</span><br></br>
          <span>Minimum age: {this.props.game.min_age}</span><br></br>
          <span>Playtime: {this.props.game.min_playtime}-{this.props.game.max_playtime} mins</span>
          {/* <span>Price: {this.props.game.price}</span> */}
          <p></p>
        </div>
      </div>
    )

  }
}


export default GameDetails;