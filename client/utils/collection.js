import axios from 'axios';

const addGame = function (game) {
  let games = this.state.ownedGames;
  let user = this.state.user;
    let gameOwned = false;
    for (var i = 0; i < games.length; i++) {
      if (games[i].id === game.id) {
        gameOwned = true;
      }
    }
    if (!gameOwned) {
      game.images_medium = game.images.medium;
      games.unshift(game);
      let collection = {user: user, game: game.name}
      axios.post('http://localhost:3000/api/addToUserCollection', collection)
      this.setState({ownedGames: games})
    } else {
      window.alert('Error: Game already in collection!')
    }
}

const removeGame = function (game) {
  var games = [];
  for (var i = 0; i < this.state.ownedGames.length; i++) {
    if (this.state.ownedGames[i].name !== game) {
      games.push(this.state.ownedGames[i]);
    }
  }
  this.setState({ownedGames: games});
  console.log('remove game ran', game)

  axios.post('/api/removeFromUserCollection', {game: game, user: this.state.user});
}

export {addGame, removeGame}

