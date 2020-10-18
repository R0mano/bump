import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import ContactList from '../../components/ContactList/ContactList';
import './ContactPage.css'

export default ContactPage;

function ContactPage(props) {

  // console.log(props.profile);
  // let page = props.profile ?
  // <div>
    
  //   {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
  //   <h1>{props.profile.username}</h1>
  //   <h1>{props.profile.dob}</h1>
  //   <h1>{props.profile.bio}</h1>      
  //   </div>
  //   :
  //   <div>
  //     <h1>loading...</h1>    
  //   </div>


  return(
    <div className='ContactPage'>
      <NavBar handleLogout={props.handleLogout} user={props.user} profile={props.profile}/>
      <h1>Contacts</h1>
      {/* {page} */}
      <div className='contact-wrapper' >
      <AddContactForm handleAddContact={props.handleAddContact} profile={props.profile}/>
      <ContactList profile={props.profile} contacts={props.contacts} handleContactSelect={props.handleContactSelect}/>
      </div>
    </div>
  )
}