import React from 'react';
import Suggestion from './suggestions/Suggestion.jsx';

const Suggestions = function({games, openShelf}) {

  let suggestions
  if (games.length) {
    suggestions = games.map(game => {
      return <Suggestion game={game} />
    })
  }
  return (
    <div>
      <h4 id="suggestions" onClick={openShelf}>Suggestions</h4>
      {suggestions}
    </div>

  )
}

export default Suggestions;