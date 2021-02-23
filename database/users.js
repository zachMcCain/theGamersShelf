const db = require('./connect.js');
const crypto = require('./auth/crypto.js')


/////////////// CREATE USER, STORE GAMES TO USER, AND USER PREFERENCES QUERIES ////////////
// Create a new user
const addNewUser = ({name, password}, cb) => {
  console.log('add new ran')
  // FIRST CHECK TO SEE IF USER ALREADY EXISTS
  return checkUserName(name)
  .then(result => {
    console.log('logging the result of check user name in add new user block: ', result.records.length)

    if (!result.records.length) {
      const salt = crypto.createRandom32String();
      // hash the password
      const hash = crypto.createHash(password, salt);

      const params = {name, hash, salt}
      // console.log('Adding a new user', userInfo)
      const query = `MERGE (a: User {name: $name, passwordHash: $hash, salt: $salt})`
      return db.writeTransaction(tx => tx.run(query, params))

    }
    else {
      console.log('User already exists')
      return Promise.reject('Error: User already exists')
    }
  })
  .then(result => {
    console.log('then result: ', result)
    return result;
  })
}

// Check if username exists and grab salt
const checkUserName = (username) => {
  return new Promise ((resolve, reject) => {
    // console.log(username);
    const params = {username: username}
    const query = `MATCH (a: User {name: $username}) RETURN a`
    db.readTransaction(tx => tx.run(query, params))
    .then(result => {
      resolve(result);
    })
    .catch(err => reject(err))
  })
  // Need to return an object with user exists boolean and salt if exists
};


// Check user credentials for login
const checkUserCredentials = ({name, password}, cb) => {
  console.log('initial password value: ', password, ' with name: ', name)
  // Lookup the user name
  return checkUserName(name)
  .then(result => {
    // console.log('result of check user name call inside promise .then block: ', result);
    const singleRecord = result.records[0]
    return singleRecord.get(0)
  })
  // If the username doesn't exist, call the callback on err
  .catch(err => {
    console.log('error inside checkCredentials after user check: ', err)
    cb(err)
  })
  // if it does, check the hashed password against user record
  .then(node => {
    storedSatle = node.properties.salt;
    console.log('node passed in: ', node)
    const hash = crypto.createHash(password, node.properties.salt);
    console.log('given password: ', password)
    console.log('node pass: ', node.properties.passwordHash, ' as compared to hash: ', hash);
    if (node.properties.passwordHash === hash) {
      return node;
    } else {
      throw new Error;
    }
  })
}

// Connect user to game
const addGameToUserCollection = ({user, game}, cb) => {
  const params = {name: user};
  const query = `MATCH (a:User) where a.name = $name`
  db.readTransaction(query, params)
  .then((result) => {
    const singleRecord = result.records[0]
    return singleRecord.get(0)
  })
  .then((record) => {
    const name = record.properties.name;
    const params = {name: name, game: game};
    const query = `MATCH (a:User) where a.name = $name
      MATCH (b:Game) where b.name = $game
      MERGE (a)-[:OWNS]->(b)`
    // const query = `MERGE (a:User {name: $name})-[:OWNS]->(b:Game {name: $game})`
    return db.writeTransaction(query, params)
  })
  .then(result => {
    cb(result);
  })
  .catch(err => {
    console.log('error: ', err);
    cb(err);
  })
};




module.exports = {
  addNewUser: addNewUser,
  checkUserCredentials: checkUserCredentials,
  addGameToUserCollection: addGameToUserCollection
}