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
    <p><Link exact to='/edit-profile'>Edit profile</Link> | <span className="change-avatar" onClick={togglePictureForm}>Change Avater</span></p>

    <UpdateProfilePictureForm visible={pictureFormVisible} profileId={props.profile._id}/>

    <div className='profile-picture'><img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/51989087_10156471471397885_8619373629286645760_n.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_ohc=UvBFRPJC1zUAX9kvZnj&_nc_ht=scontent-sjc3-1.xx&oh=5b67a2ff93a18e26a678d684d947dc2f&oe=6035D76D" alt="profile"/></div>
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