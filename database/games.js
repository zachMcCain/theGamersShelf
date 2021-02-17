const db = require('./connect.js');

console.log('Whole games file ran')
/////////////// COLLECTION READ AND WRITE QUERIES ////////////


///////////// READ //////////////
// Get user info to load collection
const getUserInfo = (id, cb) => {
  const cypher = "MATCH (n:Game) RETURN n";
  // EX: const params = { name: "Adam" };
  const resultPromise = db.writeTransaction(tx => tx.run(cypher));

  resultPromise.then(result => {
    // const singleRecord = result.records[0]
    // const game = singleRecord.get(0);
    cb(result);
  })
  .then(result => {
    // db.close();
    // driver.close();
  })
};

////////////// CREATE ///////////////////////////
// Add a game to the database
const addGameToDatabase = (gameInfo, cb) => {
  let players = ''
  console.log('game information: ', gameInfo)
  let identifierIndex = 112
  for (let i = gameInfo.min_players; i <= gameInfo.max_players; i++) {
    players = players + ` MERGE (${String.fromCharCode(identifierIndex)}: Players {number: ${i}})
    MERGE (${String.fromCharCode(identifierIndex)})-[:PLAYABLE_WITH]->(g) `
    identifierIndex++
  }

  const cypher = `MERGE (a: Designer {name: $primary_designer.name})
  MERGE (b: Publisher {name: $primary_publisher.name})
  MERGE (g: Game {
    name: $name,
    id: $id,
    url: $url,
    year_published: $year_published,
    min_players: $min_players,
    max_players: $max_players,
    min_playtime: $min_playtime,
    max_playtime: $max_playtime,
    min_age: $min_age,
    description: $description,
    description_preview: $description_preview,
    image_url: $image_url,
    images_thumb: $images.thumb,
    images_small: $images.small,
    images_medium: $images.medium,
    images_large: $images.large,
    images_original: $images.original,
    price_US: $msrps[0].price,
    primary_publisher: $primary_publisher.name,
    avg_usr_rating: $average_user_rating,
    primary_designer: $primary_designer.name
  })
  MERGE (a)-[:DESIGNED]->(g)<-[:PUBLISHED]-(b)
  ${players}
  MERGE (c: MinPlaytime {number: $min_playtime})
  MERGE(c)-[:PLAYABLE_IN]->(g)
  MERGE (d: MaxPlaytime {number: $max_playtime})
  MERGE (d)-[:PLAYABLE_IN]->(g)
  MERGE (e: LearnComplexity {number: ${gameInfo.average_learning_complexity}})
  MERGE (e)-[:LEARNING_CURVE]->(g)
  MERGE (f: StrategyComplexity {number: ${gameInfo.average_strategy_complexity}})
  MERGE (f)-[:STRATEGY_COMPLEXITY]->(g)
  MERGE (h: UserRating {number: $average_user_rating})
  MERGE (h)-[:USER_RATING]->(g)
  MERGE (i: Age {number: $min_age})
  MERGE (i)-[:MIN_AGE]->(g)
   RETURN g`

   return db.writeTransaction(tx => tx.run(cypher, gameInfo))
  .then(result => {
    const singleRecord = result.records[0]
    const game = singleRecord.get(0);
    cb(game);
  })
  .then(result => {
    console.log('add game ran')
    // db.close();
    // driver.close();
  })
}






module.exports = {
  getUserInfo: getUserInfo,
  addGameToDatabase: addGameToDatabase,
}


//// CREATE A FULL PATH ////
// CREATE p =(andy { name:'Andy' })-[:WORKS_AT]->(neo)<-[:WORKS_AT]-(michael { name: 'Michael' })

///// CREATE A NEW NODE WITH RELATIONSHIP FOR EVERY EXISTING MATCHED NODE ///////
// MATCH (a:Designer) WHERE a.name="Isaac Childress" CREATE n=(:Game {name: "Testing"})-[:Designed]->(a)




