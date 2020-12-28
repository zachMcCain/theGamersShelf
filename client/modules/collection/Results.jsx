import React from 'react';
import GameDetails from './GameDetails.jsx';


// Props right now for each of these is an entire game.
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: false
    }
    this.captureGame = this.captureGame.bind(this);
    this.openDetails = this.openDetails.bind(this)
  }

  captureGame() {
    var game = this.props.result;
    this.props.addGame(game);
    this.props.close();
  }

  openDetails() {
    this.setState({gameDetails: !this.state.gameDetails})
  }

  // Define a function that on click, supplies props.result to the passed down props.addGame

  render() {
    let detailsPanel
    if (this.state.gameDetails) {
      detailsPanel = <GameDetails game={this.props.result} closeDetails={this.openDetails} removeGame={this.props.removeGame}/>
    } else {
      detailsPanel = <div></div>
    }
    // console.log(this.props.result)
    return (
      <div className="results">
        <button className="addGameButton" onClick={this.captureGame}>Add to Collection</button>
        <h1>{this.props.result.name}</h1>
        <img onClick={this.openDetails} src={this.props.result.images.medium}/>
        {detailsPanel}
      </div>
    )
  }
}


export default Results;