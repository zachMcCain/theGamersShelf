const db = require('./connect.js');



/////////////// COLLECTION READ AND WRITE QUERIES ////////////

// Get user info to load collection
const getUserInfo = (id) => {
  // EX: const cypher = "MATCH (p:Person {name: $name }) RETURN count(p) AS count";
  // EX: const params = { name: "Adam" };
  db.session.run(cypher, params);
};

// Add a game to a user's collection
const addUserGame = (userId, gameId) {

}



/////////////// SUGGESTIONS READ AND WRITE QUERIES ///////////

// Get user info to load suggestions
const getSuggestions = (id) => {

}

// Change suggestions based on new preferences
const changeSuggestions = (id, preferences) {
  // const tx = session.beginTransaction();
  // tx.run("CREATE (p:Person { name: $name })", { name: "Adam" })
  //     .then(res => {
  //         // Run another query with the tx variable...
  //     })
  //     .then(() => {
  //         // Everything is OK, the transaction will be committed
  //     })
  //     .catch(e => {
  //         // The transaction will be rolled back, now handle the error.
  //     });
}