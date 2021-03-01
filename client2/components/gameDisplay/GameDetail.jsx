/* eslint-disable react/prop-types */
import React from 'react';

const GameDetail = ({ game }) => (
  <div id="gameDetailContainer">
    <div id="gameDetail">
      <h1>{game.name}</h1>
      <img alt={game.name} src={game.images_large} />
      <br />
      <button type="button">Add to Collection</button>
      <br />
      <button type="button">Add to Wishlist</button>
      <br />
      <button type="button">Remove from Collection</button>
      <br />
      <button type="button">Remove from Wishlist</button>
      <p>{game.description_preview}</p>
      <p>Players: {game.min_players}-{game.max_players}</p>
      <p>Playtime: {game.min_playtime}-{game.max_playtime} minutes</p>
      {/* <p>Designer: {game.primary_designer}</p> */}
      {/* <p>Publisher: {game.primary_publisher}</p> */}
    </div>
  </div>
);

export default GameDetail;
