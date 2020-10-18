import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';

export default ProfilePage;

function ProfilePage(props) {

  let page = props.profile ?
  <div>
    
    {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
    <h1>Username: {props.profile.username}</h1>
    {/* <h1>{props.profile.dob}</h1> */}
    <h1>About you: {props.profile.bio}</h1>      
    </div>
    :
    <div>
      <h1>loading...</h1>    
    </div>


  return(
    <div>
      <NavBar handleLogout={props.handleLogout} user={props.user} profile={props.profile} handleLogout={props.handleLogout}/>
      <h1>Profile</h1>
      {page}
    </div>
  )
}