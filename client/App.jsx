import React from 'react'
import Collection from './modules/Collection.jsx';
import Suggestions from './modules/Suggestions.jsx';
import Preferences from './modules/Preferences.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      suggestions: false,
      preferences: false,
      ownedGames: [
        // {name: 'Gloomhaven', id: '123', images: {thumb: "www"}}, {name: 'Scyth', id: '324', images: {medium: "www"}}
      ]
    }
    this.openShelf = this.openShelf.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.renderPreferences = this.renderPreferences.bind(this);
    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveGame = this.handleRemoveGame.bind(this);
  }

  openShelf(e) {
    let shelf = document.getElementById('shelf');
    if (shelf.style.display === "none") {
      shelf.style.display = "block";
      let collection = document.getElementById('collection');
      collection.style.display = "none"
      let suggestions = document.getElementById('suggestions');
      suggestions.style.display = "none"
      let preferences = document.getElementById('preferences');
      preferences.style.display = "none"
    } else {
      shelf.style.display = "none";
    }
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({name: e.target.value})
  }

  handleAddGame(game) {
    let games = this.state.ownedGames;
    let gameOwned = false;
    for (var i = 0; i < games.length; i++) {
      if (games[i].id === game.id) {
        gameOwned = true;
      }
    }
    if (!gameOwned) {
      game.images_medium = game.images.medium;
      games.unshift(game);
      axios.post('http://localhost:3000/api/addToUserCollection', game)
      this.setState({ownedGames: games})
    } else {
      window.alert('Error: Game already in collection!')
    }
  }

  handleRemoveGame(gameId) {

    var games = [];
    for (var i = 0; i < this.state.ownedGames.length; i++) {
      if (this.state.ownedGames[i].id !== gameId) {
        games.push(this.state.ownedGames[i]);
      }
    }
    this.setState({ownedGames: games});
  }

  renderCollection(e) {
    this.openShelf();
    let collection = document.getElementById('collection');
      collection.style.display = "block"
  }

  renderSuggestions(e) {
    this.openShelf();
    let suggestions = document.getElementById('suggestions');
    suggestions.style.display = "block"
  }

  renderPreferences(e) {
    this.openShelf();
    let preferences = document.getElementById('preferences');
    preferences.style.display = "block"
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/getUserCollection')
    .then(result => {
      console.log(result.data.records)
      let records = result.data.records;
      let games = []
      for (var i = 0; i < records.length; i++) {
        games.push(records[i]._fields[0].properties);
      }
      this.setState({ownedGames: games})
      // Each record is stored at result.data.records[i]._fields[0].properties
    });
  }

  render() {
    return (
      <div>
        <h1 className="site_title" onClick={this.openShelf}>Game On!</h1>
        <div id="shelf">
          <h4
          onClick={this.renderCollection}>My Collection</h4>
          <h4 onClick={this.renderSuggestions}>Suggestions</h4>
          <h4 onClick={this.renderPreferences}>Preferences</h4>
        </div>

          <Collection
          games={this.state.ownedGames}
          open={this.state.collection}
          addGame={this.handleAddGame}
          changeSearch={this.handleChange}
          removeGame={this.handleRemoveGame}/>

          <Suggestions
          open={this.state.suggestions}/>

          <Preferences
          open={this.state.preferences}/>
      </div>
    )
  }
}



export default App;