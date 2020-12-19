import React from 'react'

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
      <div>Hello World!</div>
    )
  }
}



export default App;