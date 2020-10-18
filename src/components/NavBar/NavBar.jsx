import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

export default NavBar


function NavBar(props) {
  // let nav = props.user ?
  // <div>
  //     <p>This is the NavBar</p>
  //     <NavLink exct to='/profile'>Profile</ NavLink>
  //     <NavLink exact to='/chat'>Chat</ NavLink>
  //     <NavLink exact to='/bumps'>Add Contact</ NavLink>
  //     {/* Put the logout link at the bottom of profile page */}
  //     {/* <NavLink to='' onClick={props.handleLogout} className='NavBar-link'>LOG OUT</NavLink> */}
  //     &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  //     <span className='NavBar-welcome'>WELCOME, {props.user.username}</span>
  //   </div>
  // :
  // <div>
  //     <Link to='/login' className='NavBar-link'>LOG IN</Link>
  //     &nbsp;&nbsp;|&nbsp;&nbsp;
  //     <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
  // </div>;

  let navabar = props.profile ?
  <div className='NavBar' >
  <nav className="navbar navbar-expand ">
  <div  id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink exct to='/profile' className="nav-link link" href="#">Profile <span class="sr-only">(current)</span></NavLink>
      <NavLink exact to='/chat' className="nav-link link" href="#">Chat</NavLink>
      <NavLink exact to='/contacts' className="nav-link link" href="#">Contacts</NavLink>
    </div>
  </div>
  <div className="navbar collapse navbar-collapse right">
  <span className='NavBar-welcome'>WELCOME, {props.profile.username}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
  <Link className='link' to='' onClick={props.handleLogout} className='NavBar-link'>LOG OUT</Link>
  </div>
</nav>


    </div>
    :
    <div>
      <p>loading...</p>
    </div>
  return(
    <div>
      {navabar}
    </div>
  )
}