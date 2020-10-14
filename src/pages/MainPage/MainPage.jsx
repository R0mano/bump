import React, { Component, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ProfilePage from '../ProfilePage/ProfilePage';
import profileService from '../../utils/profileService';
import './MainPage.css';

export default MainPage;

function MainPage(props) {


  


    let page = props.profile ?
    <div>
      
      {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
      <NavBar profile={props.profile} handleLogout={props.handleLogout}/>
      <h1>{props.profile.username}</h1>
      <h1>{props.profile.dob}</h1>
      <h1>{props.profile.bio}</h1>      
      </div>
      :
      <div>
        <h1>loading...</h1>    
      </div>

  return(
    <div>
      <h1>this is the main page</h1>
      {page}
      {/* <ProfileComponent/> */}
    </div>
  );
}
