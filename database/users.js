const db = require('./connect.js');


// Compare user to existing users to make sure username is not a duplicate
const compareUser = (userInfo, cb) => {
  const query = `Match (a: User {name: $name, passwordHash: $passwordHash, salt: $salt}) RETURN a`
  db.writeTransaction(tx => tx.run(query, userInfo))
  .then(result => cb(null, result))
  .catch(error => cb(error, null))
}


/////////////// CREATE USER, STORE GAMES TO USER, AND USER PREFERENCES QUERIES ////////////
// Create a new user
const addNewUser = ({name, players, passwordHash, salt}, cb) => {
  // console.log('Adding a new user', userInfo, cb)
  const query = `MERGE (a: User {name: $name, players: $players, passwordHash: $passwordHash, salt: $salt})`
  db.writeTransaction(tx => tx.run(query, userInfo))
  .then(result => cb(null, result))
  .catch(error => cb(error));
}

// Connect user to game
const addGameToUserCollection = () => {

};


module.exports = {
  addNewUser: addNewUser,
  compareUser: compareUser
}