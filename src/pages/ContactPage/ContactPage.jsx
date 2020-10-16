import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import AddContactForm from '../../components/AddContactForm/AddContactForm';
import ContactList from '../../components/ContactList/ContactList';

export default ContactPage;

function ContactPage(props) {

  // console.log(props.profile);
  let page = props.profile ?
  <div>
    
    {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
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
      <NavBar user={props.user} profile={props.profile}/>
      <h1>This is the ContactPage</h1>
      {page}
      <AddContactForm handleAddContact={props.handleAddContact} profile={props.profile}/>
      <ContactList profile={props.profile} contacts={props.contacts} handleContactSelect={props.handleContactSelect}/>
    </div>
  )
}