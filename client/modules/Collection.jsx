import React from 'react';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return <h4 id="collection" onClick={this.props.open}>My Collection</h4>
  }
}


export default Collection;