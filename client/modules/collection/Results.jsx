import React from 'react';

const Results = function(props) {
  console.log(props.result)
  return (
    <div>
      <div>{props.result.name}</div>
      <img src={props.result.images.small}/>
    </div>
  )
}


export default Results;