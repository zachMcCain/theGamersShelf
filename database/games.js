const db = require('./connect.js');

/// //////////// COLLECTION READ AND WRITE QUERIES ////////////

/// ////////// READ //////////////
// Get user info to load collection
const getUserCollection = (name) => {
  const cypher = 'Match (a:User {name: $name})-[r:OWNS]-(b) RETURN b';
  const params = { name };
  console.log('Getting user info');
  // const resultPromise =
  return db.writeTransaction((tx) => tx.run(cypher, params));

  // return resultPromise.then((result) => {
  //   cb(result);
};
//   );
// };

const getUserWishlist = (name) => {
  const cypher = 'Match (a:User {name: $name})-[r:WANTS]-(b) RETURN b';
  const params = { name };
  console.log('Getting wishlist');
  return db.writeTransaction((tx) => tx.run(cypher, params));
};

/// //////// UPDATE COLLECTION /////////////

// Connect user to game
const addGameToUserCollection = ({ user, game }, cb) => {
  let params = { name: user, game };
  console.log('Add game to collection of: ', user, ' ran with game: ', game);
  // const query = `MATCH (a:User) where a.name = $name`
  const query = `MATCH (a:User {name: $name})
  MATCH (b:Game {name: $game})
  MERGE (a)-[:OWNS]->(b)`;
  db.writeTransaction((tx) => tx.run(query, params))
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      cb(err);
    });
};

const removeGameFromCollection = (user, game) => {
  let { name } = game;
  console.log('remove game in db ran with user: ', user, ' and game: ', game.name);
  const query = `MATCH (a:User{name:$user})-[c:OWNS]->(b:Game {name: $name})
  DETACH DELETE c`;
  let params = { user, name };
  return db.writeTransaction((tx) => tx.run(query, params));
};

/// //////// UPDATE WISHLIST /////////////

// Connect user's wishlist to game
const addGameToUserWishlist = ({ user, game }, cb) => {
  let params = { name: user, game };
  console.log('Add game to wishlist of: ', user, ' ran with game: ', game);
  // const query = `MATCH (a:User) where a.name = $name`
  const query = `MATCH (a:User {name: $name})
  MATCH (b:Game {name: $game})
  MERGE (a)-[:WANTS]->(b)`;
  db.writeTransaction((tx) => tx.run(query, params))
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      cb(err);
    });
};

const removeGameFromWishlist = (user, game) => {
  let { name } = game;
  console.log('remove game in db ran with user: ', user, ' and game: ', game.name);
  const query = `MATCH (a:User{name:$user})-[c:WANTS]->(b:Game {name: $name})
  DETACH DELETE c`;
  let params = { user, name };
  return db.writeTransaction((tx) => tx.run(query, params));
};

module.exports = {
  getUserCollection,
  addGameToUserCollection,
  removeGameFromCollection,
  addGameToUserWishlist,
  removeGameFromWishlist,
  getUserWishlist,
};
