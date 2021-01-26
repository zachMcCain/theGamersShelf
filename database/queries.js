const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS))
const session = driver.session()



/////////////// COLLECTION READ AND WRITE QUERIES ////////////

// Get user info to load collection
const getUserInfo = (id, cb) => {
  const cypher = "MATCH (n:Game) RETURN n";
  // EX: const params = { name: "Adam" };
  const resultPromise = session.writeTransaction(tx => tx.run(cypher));

  resultPromise.then(result => {
    // const singleRecord = result.records[0]
    // const game = singleRecord.get(0);
    cb(result);
  })
  .then(result => {
    // session.close();
    // driver.close();
  })
};

// Add a game to a user's collection
const addUserGame = (userId, gameInfo, cb) => {
  const cypher = `CREATE (n: Game {name: $name, id: $id, url: $url, year_published: $year_published, min_players: $min_players, max_players: $max_players, min_playtime: $min_playtime, max_playtime: $max_playtime, min_age: $min_age, description: $description, description_preview: $description_preview, image_url: $image_url, images_thumb: $images.thumb, images_small: $images.small, images_medium: $images.medium, images_large: $images.large, images_original: $images.original, price_US: $msrps[0].price, primary_publisher: $primary_publisher.name, avg_usr_rating: $average_user_rating, primary_designer: $primary_designer.name}) RETURN n`
  const resultPromise = session.writeTransaction(tx => tx.run(cypher, gameInfo));

  resultPromise.then(result => {
    const singleRecord = result.records[0]
    const game = singleRecord.get(0);
    cb(game);
  })
  .then(result => {
    // session.close();
    // driver.close();
  })
}



/////////////// SUGGESTIONS READ AND WRITE QUERIES ///////////

// Get user info to load suggestions
const getSuggestions = (id) => {

}

// Change suggestions based on new preferences
const changeSuggestions = (id, preferences) => {
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

module.exports.getUserInfo = getUserInfo;
module.exports.addUserGame = addUserGame;