import React from 'react'
import Collection from './modules/Collection.jsx';
import Suggestions from './modules/Suggestions.jsx';
import Preferences from './modules/Preferences.jsx';
import Login from './modules/Login.jsx';
import Signup from './modules/Signup.jsx';
import axios from 'axios';
import {openShelf, renderCollection, renderSuggestions, renderPreferences} from './utils/render.js'
import {signupUser, loginUser} from './utils/auth.js'; /////
import {addGame, removeGame} from './utils/collection.js';
import suggestions from './utils/suggestions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      suggestions: false,
      preferences: false,
      ownedGames: [],
      suggestedGames: [],
      loggedIn: false,
      signup: false,
      user: null
    }

    this.openShelf = openShelf.bind(this);
    this.renderCollection = renderCollection.bind(this);
    this.renderSuggestions = renderSuggestions.bind(this);
    this.renderPreferences = renderPreferences.bind(this);
    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveGame = this.handleRemoveGame.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.updateGameStateBasedOnUser = this.updateGameStateBasedOnUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateSuggestionsStateBasedOnUser = this.updateSuggestionsStateBasedOnUser.bind(this);
    // this.goToLogin = this.goToLogin.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  handleAddGame(game) {
    addGame.call(this, game);
  }

  handleRemoveGame(game) {
    removeGame.call(this, game);
  }

  goToSignUp() {
    this.setState({signup: true})
  }

  goToLogin() {
    this.setState({signup: false})
  }

  updateGameStateBasedOnUser(gameInfo) {
    this.setState({ownedGames: gameInfo})
  }

  updateSuggestionsStateBasedOnUser(suggestions) {
    this.setState({suggestedGames: suggestions})
  }

  updateUser(name) {
    this.setState({user: name})
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

    let login = <Login
      login={loginUser}
      signup={this.goToSignUp}
      updateGames={this.updateGameStateBasedOnUser}
      updateSuggestions={this.updateSuggestionsStateBasedOnUser}
      updateUser={this.updateUser}/>
    if (this.state.loggedIn) {
      login = <div></div>
    } else if (this.state.signup) {
      login = <Signup signup={signupUser} login={this.goToLogin}/>
    }

    return (
      <div>
        <div id="topbar">
          <span className="site_title" onClick={this.openShelf}>Game On!</span>
          {login}
        </div>
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