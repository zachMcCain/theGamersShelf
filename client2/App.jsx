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
      loginDropdown: false,
      signupDropdown: false,
      collection: [],
      suggestions: [],
      wishlist: [],
      user: null,
      displaySuggestions: true,
      displayCollection: false,
      displayWishlist: false,
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSwitchDropdown = this.handleSwitchDropdown.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.updateUserAndCollection = this.updateUserAndCollection.bind(this);
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
      },
      () => {
        this.setState({ [id]: true });
      },
    );
  }

  updateUserAndCollection(user, collection, suggestions) {
    this.setState({ user, collection, suggestions });
  }

  render() {
    let {
      loginDropdown, signupDropdown,
      displayCollection, displaySuggestions,
      displayWishlist, collection,
      suggestions, wishlist,
    } = this.state;

    let games = <div />;

    if (displayCollection) {
      games = collection;
    } else if (displaySuggestions) {
      games = suggestions;
    } else if (displayWishlist) {
      games = wishlist;
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
        />
        <div id="bodyContainer">
          <LeftSideBar
            handleDisplay={this.handleDisplay}
          />
          <GameDisplay games={games} />
          <RightSideBar />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
