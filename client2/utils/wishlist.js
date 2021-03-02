/* eslint-disable prefer-const */
import axios from 'axios';

const addGameToWishlist = (game) => {
  let { user } = this.state;
  let games = this.state.wishlist;
  let gameOnList = false;
  for (let i = 0; i < games.length; i += 1) {
    if (games[i].id === game.id) {
      gameOnList = true;
    }
  }
  if (!gameOnList) {
    if (game.images) {
      game.images_medium = game.images.medium;
    }
    games.unshift(game);
    let wishlist = { user, game: game.name };
    axios.post('/api/addToWishlist', wishlist);
    this.setState({ wishlist: games });
  } else {
    window.alert('Error: Game already in wishlist!');
  }
};

const removeGameFromWishlist = (user, game) => {
  let games = [];
  let { wishlist } = this.state;
  for (let i = 0; i < wishlist.length; i += 1) {
    if (wishlist[i].name !== game.name) {
      games.push(collection[i]);
    }
  }
  this.setState({ wishlist: games });
  let info = { user: this.state.user, game };
  axios.post('/api/removeFromWishlist', info);
};

export { addGameToWishlist, removeGameFromWishlist };
