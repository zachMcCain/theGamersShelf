/* eslint-disable prefer-const */
import axios from 'axios';

const addGameToCollection = function (game) {
  let { user } = this.state;
  let games = this.state.collection;
  let gameOwned = false;
  for (let i = 0; i < games.length; i += 1) {
    if (games[i].id === game.id) {
      gameOwned = true;
    }
  }
  if (!gameOwned) {
    if (game.images) {
      game.images_medium = game.images.medium;
    }
    games.unshift(game);
    let collection = { user, game: game.name };
    axios.post('http://localhost:3000/api/addToUserCollection', collection);
    this.setState({ collection: games });
  } else {
    window.alert('Error: Game already in collection!')
  }
};

const removeGameFromCollection = function (game) {
  let games = [];
  let { collection } = this.state;
  for (let i = 0; i < collection.length; i += 1) {
    if (collection[i].name !== game.name) {
      games.push(collection[i]);
    }
  }
  this.setState({ collection: games });
  console.log('remove game ran', game);

  axios.post('/api/removeFromUserCollection', { game, user: this.state.user });
};

export { addGameToCollection, removeGameFromCollection };
