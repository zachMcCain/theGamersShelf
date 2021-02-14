import React from 'react';


// Change state based on typing into fields
// Grab that state when submitted and send in an axios request
// If the response comes back good, change isloggedin state


const Signup = (props) => {

  return (
    <div className="signup_container">
      <h5>Sign Up:</h5>
      <input defaultValue="username" name='name' type="text"></input><br></br>
      <input defaultValue="password" type="text"></input><br></br>
      <input defaultValue="confirm password" type="text"></input><br></br>
      <input type="submit" value="Sign Up"></input>
    </div>
  )
}

export default Signup;