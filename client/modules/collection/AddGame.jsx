import React from 'react';
import axios from 'axios';
import Results from './Results.jsx'

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      searchResults: []
    }
    this.searchGame = this.searchGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  searchGame(e) {
    e.preventDefault();
    // console.log('Searching for: ', this.state.name)
    axios.get(
      `https://api.boardgameatlas.com/api/search?name=${this.state.name}&client_id=qkHJZ2akQa&fuzzy_match=true&limit=20`
      )
      .then((results) => {
        // console.log('results of search: ', results.data.games)
        this.setState({searchResults: results.data.games})
      })
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({name: e.target.value})
  }

  render() {
    let results = <div></div>
    if (this.state.searchResults.length > 0) {
      // console.log('Search results should render')
      results = this.state.searchResults.map((result) => {
        return <Results result={result} addGame={this.props.addGame} key={result.id} close={this.props.close}/>
      })
    }

    return (
      // <div className="addGameContainer">
      <div className="modal">
        <form className="modal-main">
          <button className="right close" onClick={this.props.close}>x</button>
          <br></br>
          <br></br>
          <h3>Find Your Game</h3>

          <br/>
          <input
            type="text"
            name="Search"
            onChange={this.handleChange}></input>
            <br/>
          <button
            onClick={this.searchGame}
            className="addGameButton">
            Search
          </button>
          {results}
        </form>
      </div>
    )
  }
}

export default AddGame;