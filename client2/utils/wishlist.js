import axios from 'axios';

const addGameToWishlist = (user, game) => {
  axios.post('./api/addToWishlist', user, game);
};

const removeGameFromWishlist = (user, game) => {
  axios.post('./api/removeFromWishlist', user, game);
};

export { addGameToWishlist, removeGameFromWishlist };
