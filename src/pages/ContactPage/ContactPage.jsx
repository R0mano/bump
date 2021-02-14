import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import ContactList from '../../components/ContactList/ContactList';
import './ContactPage.css'

export default ContactPage;

function ContactPage(props) {

  return(
    <div className='ContactPage'>
      <NavBar handleLogout={props.handleLogout} user={props.user} profile={props.profile}/>
      <h1>Contacts</h1>
      <div className='contact-wrapper' >
        <AddContactForm handleAddContact={props.handleAddContact} profile={props.profile}/>
        <div className='contact-list-wrapper'>
          <ContactList profile={props.profile} contacts={props.contacts} handleContactSelect={props.handleContactSelect}/>
        </div>
      </div>
    </div>
  )
}