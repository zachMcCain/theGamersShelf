const db = require('./connect.js');

/// //////////// SUGGESTIONS READ AND WRITE QUERIES ///////////

// Get user info to load suggestions
const getSuggestions = (user) => {
  const query = `MATCH (:User{name:$user})-[a:OWNS]->(:Game)-[b]-(c)-[d]-(rec)
  WITH rec, COUNT(*) AS num ORDER BY num DESC
  RETURN rec, num LIMIT 50`;
  const params = { user };
  return db.readTransaction((tx) => (tx.run(query, params)));
};

// Change suggestions based on new preferences
// const changeSuggestions = (id, preferences) => {
//   // const tx = db.beginTransaction();
//   // tx.run("CREATE (p:Person { name: $name })", { name: "Adam" })
//   //     .then(res => {
//   //         // Run another query with the tx variable...
//   //     })
//   //     .then(() => {
//   //         // Everything is OK, the transaction will be committed
//   //     })
//   //     .catch(e => {
//   //         // The transaction will be rolled back, now handle the error.
//   //     });
// };

module.exports = {
  getSuggestions,
};
