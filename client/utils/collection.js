import axios from 'axios';

const addGame = function (game) {
  let games = this.state.ownedGames;
    let gameOwned = false;
    for (var i = 0; i < games.length; i++) {
      if (games[i].id === game.id) {
        gameOwned = true;
      }
    }
    if (!gameOwned) {
      game.images_medium = game.images.medium;
      games.unshift(game);
      axios.post('http://localhost:3000/api/addToUserCollection', game)
      this.setState({ownedGames: games})
    } else {
      window.alert('Error: Game already in collection!')
    }
}

const removeGame = function (game) {
  var games = [];
  for (var i = 0; i < this.state.ownedGames.length; i++) {
    if (this.state.ownedGames[i].id !== game) {
      games.push(this.state.ownedGames[i]);
    }
  }
  this.setState({ownedGames: games});
  console.log('remove game ran')
}

export {addGame, removeGame}

