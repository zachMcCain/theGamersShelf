const db = require('../connect.js');
const axios = require('axios');
const Promise = require("bluebird");

// Retrieve Board Game Info from Board Game Atlas API

axios.get('https://api.boardgameatlas.com/api/search?name=Catan&client_id=qkHJZ2akQa&limit=2')
// Reformat Data from BGA
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

  results.data.forEach((game) => {

  })
})
// Write Data to Neo4j
.then((data) => {
  const cypher = "CREATE "
  db.session()
  console.log('No errors')
})
.catch((err) => {
  console.log('Error in seeding: ', err);
})