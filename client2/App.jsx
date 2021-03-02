/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-const */
import React from 'react';
import axios from 'axios';
// import {
//   renderCollection, renderSuggestions, renderPreferences,
// } from './utils/render';
import { signupUser, loginUser } from './utils/auth';
import { addGameToCollection, removeGameFromCollection } from './utils/collection';
import { addGameToWishlist, removeGameFromWishlist } from './utils/wishlist';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import GameDisplay from './components/GameDisplay';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySuggestions: false,
      displayCollection: false,
      displayWishlist: false,
      displaySearchResults: true,
      displayIndividual: false,
      loginDropdown: false,
      signupDropdown: false,
      user: null,
      suggestions: [],
      collection: [],
      wishlist: [],
      searchResults: [],
      selectedGame: {},
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSwitchDropdown = this.handleSwitchDropdown.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.updateUserAndCollection = this.updateUserAndCollection.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
  }

  componentDidMount() {
    this.handleSearch('');
  }

  handleDropdown() {
    let { loginDropdown, signupDropdown } = this.state;
    if (loginDropdown || signupDropdown) {
      this.setState({
        loginDropdown: false,
        signupDropdown: false,
      });
    } else {
      this.setState({
        loginDropdown: true,
      });
    }
  }

  handleSwitchDropdown() {
    let { loginDropdown, signupDropdown } = this.state;
    this.setState({
      loginDropdown: !loginDropdown,
      signupDropdown: !signupDropdown,
    });
  }

  handleDisplay(id) {
    this.setState(
      {
        displayCollection: false,
        displaySuggestions: false,
        displayWishlist: false,
        displaySearchResults: false,
        displayIndividual: false,
      },
      () => {
        this.setState({ [id]: true });
      },
    );
  }

  handleSearch(searchTerm) {
    axios.get(
      `https://api.boardgameatlas.com/api/search?name=${searchTerm}&client_id=qkHJZ2akQa&fuzzy_match=true&limit=24`,
    )
      .then((results) => {
        console.log('Results of search: ', results);
        let { games } = results.data;
        games.forEach((game, i) => {
          games[i].images_medium = game.images.medium;
          games[i].images_large = game.images.large;
        });
        this.setState({ searchResults: games });
      });
  }

  handleSelection(game) {
    this.setState({ selectedGame: game });
  }

  updateUserAndCollection(user, collection, suggestions) {
    this.setState({ user, collection, suggestions });
  }

  updateWishlist(games) {
    this.setState({ wishlist: games });
  }

  render() {
    let {
      loginDropdown, signupDropdown,
      displayCollection, displaySuggestions,
      displayWishlist, displaySearchResults,
      displayIndividual, searchResults,
      suggestions, collection,
      wishlist, selectedGame,
      user,
    } = this.state;

    let games = <div />;

    if (displayCollection) {
      games = collection;
    } else if (displaySuggestions) {
      games = suggestions;
    } else if (displayWishlist) {
      games = wishlist;
    } else if (displaySearchResults) {
      games = searchResults;
    }

    return (
      <div>
        <Header
          login={loginDropdown}
          signup={signupDropdown}
          drop={this.handleDropdown}
          switchDrop={this.handleSwitchDropdown}
          signupUser={signupUser}
          loginUser={loginUser}
          updateUserAndCollection={this.updateUserAndCollection}
          user={user}
        />
        <div id="bodyContainer">
          <LeftSideBar
            handleDisplay={this.handleDisplay}
            handleSearch={this.handleSearch}
          />
          <GameDisplay
            games={games}
            handleDisplay={this.handleDisplay}
            displayIndividual={displayIndividual}
            handleSelection={this.handleSelection}
            selectedGame={selectedGame}
            // The below functions need to be decoupled from state
            addGameToCollection={addGameToCollection.bind(this)}
            removeGameFromCollection={removeGameFromCollection.bind(this)}
            addGameToWishlist={addGameToWishlist.bind(this)}
            removeGameFromWishlist={removeGameFromWishlist.bind(this)}
          />
          <RightSideBar />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
