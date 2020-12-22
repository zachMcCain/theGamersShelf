import React from 'react'
import Collection from './modules/Collection.jsx';
import Suggestions from './modules/Suggestions.jsx';
import Preferences from './modules/Preferences.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      suggestions: false,
      preferences: false,
      ownedGames: ['Gloomhaven', 'Scyth']
    }
    this.openShelf = this.openShelf.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.renderPreferences = this.renderPreferences.bind(this);
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

  render() {
    return (
      <div>
        <h1>The Gamer's Shelf</h1>
        <div id="shelf">
          <h4
          onClick={this.renderCollection}>My Collection</h4>
          <h4 onClick={this.renderSuggestions}>Suggestions</h4>
          <h4 onClick={this.renderPreferences}>Preferences</h4>
        </div>

          <Collection
          openShelf={this.openShelf}
          games={this.state.ownedGames}
          open={this.state.collection}/>

          <Suggestions
          openShelf={this.openShelf}
          open={this.state.suggestions}/>

          <Preferences
          openShelf={this.openShelf}
          open={this.state.preferences}/>
      </div>
    )
  }
}



export default App;