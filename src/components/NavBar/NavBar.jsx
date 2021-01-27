import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

export default NavBar


function NavBar(props) {

  let navbar = props.profile ?
  <div className='NavBar' >
  <nav className="navbar navbar-expand ">
  <div  id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink exct to='/profile' className="nav-link link" href="#">Profile <span className="sr-only">(current)</span></NavLink>
      <NavLink exact to='/chat' className="nav-link link" href="#">Chat</NavLink>
      <NavLink exact to='/contacts' className="nav-link link" href="#">Contacts</NavLink>
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