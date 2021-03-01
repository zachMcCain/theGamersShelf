/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React from 'react';

class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    let { handleDisplay, handleSearch } = this.props;
    let { searchTerm } = this.state;
    return (
      <div id="leftSideBar">
        <input
          onChange={this.handleChange}
          type="text"
        />
        <button
          type="button"
          onClick={() => {
            handleSearch(searchTerm);
            handleDisplay('displaySearchResults');
          }}
        >
          Search
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            handleDisplay('displaySuggestions');
          }}
        >
          Suggestions
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            handleDisplay('displayCollection');
          }}
        >
          Collection
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            handleDisplay('displayWishlist');
          }}
        >
          Wishlist
        </button>
        <hr />
      </div>
    );
  }
}

export default LeftSideBar;
