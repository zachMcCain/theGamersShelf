const axios = require('axios');
const Promise = require("bluebird");
const config = require('./seedConfig.js')
const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic(config.user, config.password))

const session = driver.session()


const addGameToDatabase = (gameInfo, cb) => {
  let players = ''
  // console.log('game information: ', gameInfo)
  let identifierIndex = 112
  for (let i = gameInfo.min_players; i <= gameInfo.max_players; i++) {
    players = players + ` MERGE (${String.fromCharCode(identifierIndex)}: Players {number: ${i}})
    MERGE (${String.fromCharCode(identifierIndex)})-[:PLAYABLE_WITH]->(g) `
    identifierIndex++
  }
  let designer = '';
  let designerRelationship = '';
  let gameDesigner = '';
  if (gameInfo.primary_designer) {
    if (gameInfo.primary_designer.name) {
      designer = `MERGE (a: Designer {name: $primary_designer.name})`;
      designerRelationship = `MERGE (a)-[:DESIGNED]->(g)<-[:PUBLISHED]-(b)`;
      gameDesigner = `, primary_designer: $primary_designer.name`
    }
  }
  let year = gameInfo.year_published ? 'year_published: $year_published,' : '';
  let name = gameInfo.name ? 'name: $name,' : '';
  let price = gameInfo.msrps ? 'price_US: $msrps[0].price,' : '';
  let minAge = gameInfo.min_age ? 'min_age: $min_age,' : ''
  let minPlaytime = gameInfo.min_playtime ? 'min_playtime: $min_playtime,' : '';
  let maxPlaytime = gameInfo.max_playtime ? 'max_playtime: $max_playtime,' : '';

  const cypher =
    `${designer}
    MERGE (b: Publisher {name: $primary_publisher.name})
    MERGE (g: Game {
      ${name}
      id: $id,
      url: $url,
      ${year}
      min_players: $min_players,
      max_players: $max_players,
      ${minPlaytime}
      ${maxPlaytime}
      ${minAge}
      description: $description,
      description_preview: $description_preview,
      image_url: $image_url,
      images_thumb: $images.thumb,
      images_small: $images.small,
      images_medium: $images.medium,
      images_large: $images.large,
      images_original: $images.original,
      ${price}
      primary_publisher: $primary_publisher.name,
      avg_usr_rating: $average_user_rating
      ${gameDesigner}
    })
    ${designerRelationship}
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

   return session.writeTransaction(tx => tx.run(cypher, gameInfo))
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

// Retrieve Board Game Info from Board Game Atlas API
let searchTerm = 'a'

axios.get(`https://api.boardgameatlas.com/api/search?name=${searchTerm}&client_id=qkHJZ2akQa&limit=25`)
// // Reformat Data from BGA
.then((results) => {
  let i = 0
  let gameList = results.data.games;
  Promise.each(gameList, (game) => {
    return addGameToDatabase(game, (result) => {
      i++
      console.log(`logged ${i} games`)
    });
  })
})
.catch((err) => {
  console.log('Error in seeding: ', err);
})