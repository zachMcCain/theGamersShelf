/* eslint-disable prefer-const */
const axios = require('axios');
const Promise = require('bluebird');
const neo4j = require('neo4j-driver');
const config = require('./seedConfig.js');

const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic(config.user, config.password));

const session = driver.session();

const addGameToDatabase = (gameInfo, cb) => {
  let players = '';
  let minPlayers = '';
  let maxPlayers = '';
  // console.log('game information: ', gameInfo)
  let identifierIndex = 112;
  if (gameInfo.min_players && gameInfo.max_players < 10 && gameInfo.min_players > 0) {
    for (let i = gameInfo.min_players; i <= gameInfo.max_players; i += 1) {
      players = `${players} MERGE (${String.fromCharCode(identifierIndex)}: Players {number: ${i}})
      MERGE (${String.fromCharCode(identifierIndex)})-[:PLAYABLE_WITH]->(g) `;
      identifierIndex += 1;
    }
    minPlayers = 'min_players: $min_players,';
    maxPlayers = 'max_players: $max_players,';
  }
  let designer = '';
  let designerRelationship = '';
  let gameDesigner = '';
  if (gameInfo.primary_designer) {
    if (gameInfo.primary_designer.name) {
      designer = ' MERGE (a: Designer {name: $primary_designer.name})';
      designerRelationship = ' MERGE (a)-[:DESIGNED]->(g)';
      gameDesigner = ' primary_designer: $primary_designer.name, ';
    }
  }
  let publisher = '';
  let publisherRelationship = '';
  let gamePublisher = '';
  if (gameInfo.primary_publisher) {
    if (gameInfo.primary_publisher.name) {
      publisher = ' MERGE (b: Publisher {name: $primary_publisher.name})';
      publisherRelationship = 'MERGE (g)<-[:PUBLISHED]-(b)';
      gamePublisher = ' primary_publisher: $primary_publisher.name,';
    }
  }
  let year = gameInfo.year_published ? 'year_published: $year_published,' : '';
  let name = gameInfo.name ? ' name: $name' : 'name: N/A';
  let price = gameInfo.msrps ? ' price_US: $msrps[0].price,' : '';
  let minAge = gameInfo.min_age ? ' min_age: $min_age,' : '';
  let minPlaytime = gameInfo.min_playtime ? ' min_playtime: $min_playtime,' : '';
  let minPlayable = gameInfo.min_playtime ? ' MERGE (c: MinPlaytime {number: $min_playtime}) MERGE(c)-[:PLAYABLE_IN]->(g)' : '';
  let maxPlaytime = gameInfo.max_playtime ? ' max_playtime: $max_playtime,' : '';
  let maxPlayable = gameInfo.max_playtime ? ' MERGE (d: MaxPlaytime {number: $max_playtime}) MERGE (d)-[:PLAYABLE_IN]->(g)' : '';
  let learn = gameInfo.average_learning_complexity ? 'MERGE (e: LearnComplexity {number: $average_learning_complexity}) MERGE (e)-[:LEARNING_CURVE]->(g)' : '';
  let strategy = gameInfo.average_strategy_complexity ? ' MERGE (f: StrategyComplexity {number: $average_strategy_complexity}) MERGE (f)-[:STRATEGY_COMPLEXITY]->(g)' : '';
  let age = gameInfo.min_age ? ' MERGE (i: Age {number: $min_age}) MERGE (i)-[:MIN_AGE]->(g)' : '';
  let userRatingRelationship = gameInfo.average_user_rating ? ' MERGE (h: UserRating {number: $average_user_rating}) MERGE (h)-[:USER_RATING]->(g)' : '';
  let userRating = gameInfo.average_user_rating ? ' avg_usr_rating: $average_user_rating, ' : '';

  const cypher = `
    ${designer}
    ${publisher}

    MERGE (g: Game {
      id: $id,
      url: $url,
      ${year}
      ${minPlayers}
      ${maxPlayers}
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
      ${gamePublisher}
      ${userRating}
      ${gameDesigner}
      ${name}
    })
    ${designerRelationship}
    ${publisherRelationship}
    ${players}
    ${minPlayable}
    ${maxPlayable}
    ${learn}
    ${strategy}
    ${userRatingRelationship}
    ${age}

   RETURN g`;

  return session.writeTransaction((tx) => tx.run(cypher, gameInfo))
    .then((result) => {
      const singleRecord = result.records[0];
      const game = singleRecord.get(0);
      cb(game);
    });
};

// Retrieve Board Game Info from Board Game Atlas API
let searchTerm = 'dominion';
// Completed to 1k items through: ---f--- 223 for g

axios.get(`https://api.boardgameatlas.com/api/search?name=${searchTerm}&client_id=qkHJZ2akQa&limit=5`)
  .then((results) => {
    let i = 0;
    let gameList = results.data.games;
    Promise.each(gameList, (game) => (addGameToDatabase(game, () => {
      i += 1;
      console.log(`logged ${i} games from ${searchTerm}`);
    })));
  })
  .catch((err) => {
    console.log('Error in seeding: ', err);
  });
