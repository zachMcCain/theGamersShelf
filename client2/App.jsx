/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-const */
import React from 'react';
import axios from 'axios';
import {
  renderCollection, renderSuggestions, renderPreferences,
} from './utils/render';
import { signupUser, loginUser } from './utils/auth';
import { addGame, removeGame } from './utils/collection';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import GameDisplay from './components/GameDisplay';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // collection: false,
      // suggestions: false,
      // preferences: false,
      // ownedGames: [],
      // suggestedGames: [],
      // loggedIn: false,
      // signup: false,
      // user: null,
    };

    // this.renderCollection = renderCollection.bind(this);
    // this.renderSuggestions = renderSuggestions.bind(this);
    // this.renderPreferences = renderPreferences.bind(this);
    // this.handleAddGame = this.handleAddGame.bind(this);
    // this.handleRemoveGame = this.handleRemoveGame.bind(this);
    // this.goToSignUp = this.goToSignUp.bind(this);
    // this.goToLogin = this.goToLogin.bind(this);
    // this.updateGameStateBasedOnUser = this.updateGameStateBasedOnUser.bind(this);
    // this.updateUser = this.updateUser.bind(this);
    // this.updateSuggestionsStateBasedOnUser = this.updateSuggestionsStateBasedOnUser.bind(this);
    // this.goToLogin = this.goToLogin.bind(this);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3000/api/getUserCollection')
  //     .then((result) => {
  //       console.log(result.data.records);
  //       let { records } = result.data;
  //       let games = [];
  //       for (let i = 0; i < records.length; i += 1) {
  //         // eslint-disable-next-line no-underscore-dangle
  //         games.push(records[i]._fields[0].properties);
  //       }
  //       this.setState({ ownedGames: games });
  //     // Each record is stored at result.data.records[i]._fields[0].properties
  //     });
  // }

  // handleAddGame(game) {
  //   addGame.call(this, game);
  // }

  // handleRemoveGame(game) {
  //   removeGame.call(this, game);
  // }

  // goToSignUp() {
  //   this.setState({ signup: true });
  // }

  // goToLogin() {
  //   this.setState({ signup: false });
  // }

  // updateGameStateBasedOnUser(gameInfo) {
  //   this.setState({ ownedGames: gameInfo });
  // }

  // updateSuggestionsStateBasedOnUser(suggestions) {
  //   this.setState({ suggestedGames: suggestions });
  // }

  // updateUser(name) {
  //   // eslint-disable-next-line react/no-unused-state
  //   this.setState({ user: name });
  // }

  render() {
    return (
      <div>
        <Header />
        <LeftSideBar />
        <GameDisplay />
        <RightSideBar />
        <Footer />
      </div>
    );
  }
}

export default App;
