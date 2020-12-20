import React from 'react'
import Collection from './modules/Collection.jsx';
import Suggestions from './modules/Suggestions.jsx';
import Settings from './modules/Settings.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      suggestions: false,
      preferences: false
    }
  }

  render() {
    return (
      <div>
        <h1>The Gamer's Shelf</h1>
        <Collection />
        <Suggestions />
        <Settings />
      </div>
    )
  }
}



export default App;