import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import UpdateProfilePictureForm from '../../components/UpdateProfilePictureForm/UpdateProfilePictureForm';
import './ProfilePage.css';

export default ProfilePage;

function ProfilePage(props) {
  const [pictureFormVisible, setPictureFormVisible] = useState(false)

  const togglePictureForm = () => {
    setPictureFormVisible(!pictureFormVisible)
  }

  let page = props.profile ?
  <div>
    <h1>{props.profile.username}</h1>
    <p><Link exact="true" to='/edit-profile'>Edit profile</Link> | <span className="change-avatar" onClick={togglePictureForm}>Change Avater</span></p>

    <UpdateProfilePictureForm visible={pictureFormVisible} handleProfileUpdate={props.handleProfileUpdate} togglePictureForm={togglePictureForm} profileId={props.profile._id} history={props.history}/>

    <div className='profile-picture'><img src={props.profile.avatar} alt="profile"/></div>
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
      {page}
    </div>
  )
}