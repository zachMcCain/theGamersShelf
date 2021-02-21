import axios from 'axios';

const addGame = (game) => {
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
  console.log('coll.addgame ran')
}


export {
  addGame
}
