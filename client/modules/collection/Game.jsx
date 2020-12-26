import React from 'react';
import GameDetails from './GameDetails.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameDetails: false
    }
    this.openDetails = this.openDetails.bind(this)
  }

  openDetails() {
    this.setState({gameDetails: !this.state.gameDetails})
  }

  render() {
    let detailsPanel
    if (this.state.gameDetails) {
      detailsPanel = <GameDetails game={this.props.game} closeDetails={this.openDetails} removeGame={this.props.removeGame}/>
    } else {
      detailsPanel = <div></div>
    }

    return (
      <div className="game">
        <span className="gameTitle">{this.props.game.name}</span>
        <span onClick={this.openDetails}>details</span>
        {/* <div className="gameDescription">{this.props.description}</div> */}
        <img src={this.props.image}/>
        {detailsPanel}
      </div>
    )
  }
}


export default Game;