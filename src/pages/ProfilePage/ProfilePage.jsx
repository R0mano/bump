import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './ProfilePage.css';

export default ProfilePage;

function ProfilePage(props) {

  let page = props.profile ?
  <div>
    <div className='profile-picture'><img src=""/></div>
    <h3>Username: {props.profile.username}</h3>
    <h3>About you: {props.profile.bio}</h3>      
    </div>
    :
    <div>
      <h1>loading...</h1>    
    </div>


  return(
    <div className='ProfilePage' >
      <NavBar handleLogout={props.handleLogout} user={props.user} profile={props.profile}/>
      <h1>Profile</h1>
      {page}
    </div>
  )
}