import React from 'react'
import Collection from './modules/Collection.jsx';
import Suggestions from './modules/Suggestions.jsx';
import Preferences from './modules/Preferences.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: false,
      suggestions: false,
      preferences: false,
      games: ['Gloomhaven', 'Scyth']
    }
    this.openShelf = this.openShelf.bind(this);
  }

  openShelf(e) {
    e.persist();
    const name = e.target.id;
    const value = this.state[name]
    this.setState({[name]: !value});
  }

  render() {
    return (
      <div>
        <h1>The Gamer's Shelf</h1>
        <div className="shelf">
          <Collection openShelf={this.openShelf} games={this.state.games} open={this.state.collection}/>
          <Suggestions openShelf={this.openShelf} open={this.state.suggestions}/>
          <Preferences openShelf={this.openShelf} open={this.state.preferences}/>
        </div>
      </div>
    )
  }
}



export default App;