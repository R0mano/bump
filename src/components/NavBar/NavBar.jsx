import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

export default NavBar


function NavBar(props) {

  let navbar = props.profile ?
  <div className='NavBar' >
  <nav className="navbar navbar-expand ">
  <div  id="navbarNavAltMarkup">
    <div className="navbar-nav navbar-nav-links">
      <NavLink exact to='/profile' id='profile-icon-link' className="nav-link link icon-link" href="#"><span><div id='profile-icon'><img id='profile-icon-img' src={props.profile.avatar} alt="profile"/></div></span> <span className="sr-only">(current)</span></NavLink>
      <NavLink exact to='/chat' className="nav-link link icon-link" href="#"><span><img className='navbar-icon' src="chat-icon.svg" alt="chat"/></span></NavLink>
      <NavLink exact to='/contacts' className="nav-link link icon-link" href="#"><span><img className='navbar-icon' src="contacts-icon.svg" alt="contacts"/></span></NavLink>
    </div>
  </div>
  <div className="navbar collapse navbar-collapse right">
  <span className='NavBar-welcome'>Welcome {props.profile.username}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
  <Link className='link NavBar-link' to='' onClick={props.handleLogout}>Log Out</Link>
  </div>
</nav>
    </div>
    :
    <div>
      <p>loading...</p>
    </div>

  return(
    <div>
      {navbar}
    </div>
  )
}