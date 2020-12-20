import React from 'react';

class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <form>
        <input type="text"></input>
        <input type="text"></input>
      </form>
    )
  }
}

export default AddGame;