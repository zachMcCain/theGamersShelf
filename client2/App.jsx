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
      user: null,
    };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSwitchDropdown = this.handleSwitchDropdown.bind(this);
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

  updateUserAndCollection(user, games) {
    this.setState({ user, collection: games});
  }

  render() {
    let { loginDropdown, signupDropdown, collection } = this.state;
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
          <LeftSideBar />
          <GameDisplay collection={collection} />
          <RightSideBar />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
