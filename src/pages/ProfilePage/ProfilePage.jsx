import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

export default ProfilePage;

function ProfilePage(props) {

  let page = props.profile ?
  <div>
    
    {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
    <h3>Username: {props.profile.username}</h3>
    {/* <h3>{props.profile.dob}</h3> */}
    <h3>About you: {props.profile.bio}</h3>      
    </div>
    :
    <div>
      <h1>loading...</h1>    
    </div>


  return(
    <div className='ProfilePage' >
      <NavBar handleLogout={props.handleLogout} user={props.user} profile={props.profile} handleLogout={props.handleLogout}/>
      <h1>Profile</h1>
      {page}
    </div>
  )
}