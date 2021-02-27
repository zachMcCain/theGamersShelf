/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React from 'react';
import GameDetails from './GameDetails';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDetails: false,
    };
    this.openDetails = this.openDetails.bind(this);
  }

  openDetails() {
    let { gameDetails } = this.state;
    this.setState({ gameDetails: !gameDetails });
  }

  render() {
    let detailsPanel;
    let { gameDetails } = this.state;
    let {
      game, removeGame, image, name,
    } = this.props;
    if (gameDetails) {
      detailsPanel = (
        <GameDetails
          game={game}
          closeDetails={this.openDetails}
          removeGame={removeGame}
        />
      );
    } else {
      detailsPanel = <div />;
    }

    return (
      <div className="game">
        {/* //   <span className="gameTitle">{this.props.game.name}</span>
      //   <span onClick={this.openDetails}>details</span> */}
        {/* <div className="gameDescription">{this.props.description}</div> */}
        <img
          onClick={this.openDetails}
          src={image}
          alt={name}
        />
        {detailsPanel}
      </div>
    );
  }
}

export default Game;
