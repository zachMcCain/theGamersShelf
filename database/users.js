/* eslint-disable prefer-const */
const db = require('./connect.js');
const crypto = require('./auth/crypto.js');

/// //////////// CREATE USER, STORE GAMES TO USER, AND USER PREFERENCES QUERIES ////////////
// Check if username exists and grab salt
const checkUserName = (username) => (
  new Promise((resolve, reject) => {
    // console.log(username);
    const params = { username };
    const query = 'MATCH (a: User {name: $username}) RETURN a';
    db.readTransaction((tx) => tx.run(query, params))
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  })
  // Need to return an object with user exists boolean and salt if exists
);

// Create a new user
const addNewUser = ({ name, password }) => (
  checkUserName(name)
    .then((result) => {
      if (!result.records.length) {
        const salt = crypto.createRandom32String();
        // hash the password
        const hash = crypto.createHash(password, salt);

        const params = { name, hash, salt };
        // console.log('Adding a new user', userInfo)
        const query = 'MERGE (a: User {name: $name, passwordHash: $hash, salt: $salt})';
        return db.writeTransaction((tx) => tx.run(query, params));
      }
      return Promise.reject(new Error());
    })
    .then((result) => (result))
);

// Check user credentials for login
const checkUserCredentials = ({ name, password }, cb) => (
  checkUserName(name)
    .then((result) => {
      const singleRecord = result.records[0];
      return singleRecord.get(0);
    })
    .catch((err) => {
      cb(err);
    })
    .then((node) => {
      let { salt } = node.properties;
      const hash = crypto.createHash(password, salt);
      if (node.properties.passwordHash === hash) {
        return node;
      }
      throw new Error();
    })
);

// Connect user to game
const addGameToUserCollection = ({ user, game }, cb) => {
  let params = { name: user, game };
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
  const query = `MATCH (a:User{name:$user})-[c:OWNS]->(b:Game {name: $game})
  DELETE c`;
  let params = { user, game };
  return db.writeTransaction((tx) => tx.run(query, params));
};

module.exports = {
  addNewUser,
  checkUserCredentials,
  addGameToUserCollection,
  removeGameFromCollection,
};
