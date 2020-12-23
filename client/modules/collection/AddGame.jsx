import React from 'react';
import axios from 'axios';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <div className="addGameContainer">
        <form id="addGame">
          <div>Search Game</div>
          <input type="text" name="Search" onChange={this.props.changeSearch}></input><button onClick={this.props.addGame}>Search</button>
          <div onClick={this.props.close}>Close</div>
        </form>
      </div>
    )
  }
}

export default AddGame;