const db = require('./connect.js');


// Compare user to existing users to make sure username is not a duplicate
const compareUser = (username) {

}


/////////////// CREATE USER, STORE GAMES TO USER, AND USER PREFERENCES QUERIES ////////////
// Create a new user
const addNewUser = (userInfo) => {
  const query = `MERGE (a: User {name: $name, players: $players})`
  db.writeTransaction(tx => tx.run(cypher))
  .then(result => console.log(result))
  .catch(error => console.log(error));
}

// Connect user to game
const addGameToUserCollection = () => {

};
