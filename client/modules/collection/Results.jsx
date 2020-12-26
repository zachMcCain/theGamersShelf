import React from 'react';


// Props right now for each of these is an entire game.
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.captureGame = this.captureGame.bind(this);
  }

  captureGame() {
    var game = this.props.result;
    this.props.addGame(game);
    this.props.close();
  }

  // Define a function that on click, supplies props.result to the passed down props.addGame

  render() {
    // console.log(this.props.result)
    return (
      <div className="results">
        <div>{this.props.result.name}</div>
        <div onClick={this.captureGame}>Add to Collection</div>
        <img src={this.props.result.images.small}/>
      </div>
    )
  }
}


export default Results;