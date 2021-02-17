const session = require('../connect.js');
const axios = require('axios');
const Promise = require("bluebird");
const games = require('../games.js');


// Retrieve Board Game Info from Board Game Atlas API

axios.get('https://api.boardgameatlas.com/api/search?name=Catan&client_id=qkHJZ2akQa&limit=2')
// // Reformat Data from BGA
.then((results) => {
  // console.log('Results of Game Atlas data: ', results.data);
  let gameList = results.data.games;
  // console.log('Games retrieved and stored inside seed axios function: ', gameList)
  // Need to iterate through the games, and add inidividual games via addGameTo -------
  // Promise.each(gameList, (game) => {
  //   let i = 0
  //   return games.addGameToDatabase(game, (result) => {
  //     i++
  //     console.log(`logged ${i} games`)
  //   });
  // })
  games.addGameToDatabase(gameList[0], (result) => console.log('trial worked'))


})
.catch((err) => {
  console.log('Error in seeding: ', err);
})