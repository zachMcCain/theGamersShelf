require('dotenv').config();
// const session = require('../connect.js');
const axios = require('axios');
const Promise = require("bluebird");
const neo4j = require('neo4j-driver')

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS))
const session = driver.session()

// Retrieve Board Game Info from Board Game Atlas API

axios.get('https://api.boardgameatlas.com/api/search?name=Catan&client_id=qkHJZ2akQa&limit=2')
// // Reformat Data from BGA
.then((results) => {
  // console.log('Results of Game Atlas data: ', results.data);
  // return results.data;

  // We want to split out the data that belongs in separate nodes, so
  /*
  min_players (<-link?->) max_players (playercount nodes that games would point to with the playableWith relationship),
  min_playtime (<-link?->) max_playtime (max playtime nodes that games would point to with playableIn relationship),
  min_age,
  primary_publisher,
  publishers,
  mechanics,
  categories,
  designers,
  developers,
  artists,
  primary_designer....
  */
  // console.log(results.data.games);

  let games = results.data.games;


  Promise.each(
    games, function(game) {
      // Write Data to Neo4j

      console.log('Game to be saved: ', game)
      const cypher = `CREATE (n:Game {name: $name, id: $id, url: $url, year_published: $year_published, min_players: $min_players, max_players: $max_players, min_playtime: $min_playtime, max_playtime: $max_playtime, min_age: $min_age, description: $description, description_preview: $description_preview, image_url: $image_url, images_thumb: $images.thumb, images_small: $images.small, images_medium: $images.medium, images_large: $images.large, images_original: $images.original, price_US: $msrps[0].price, primary_publisher: $primary_publisher.name, avg_usr_rating: $average_user_rating, primary_designer: $primary_designer.name}) RETURN n`
      const resultPromise = session.writeTransaction(tx => tx.run(cypher, game));

      return resultPromise.then(result => {
        const singleRecord = result.records[0]
        const game = singleRecord.get(0);
      })
      .catch(err => console.log('Error in promise.each: ', err))

    }
  ).then(result => {
    session.close();
    driver.close();
  })
})
.catch((err) => {
  console.log('Error in seeding: ', err);
})