import React, { useEffect, useState } from 'react';
import profileService from '../../utils/profileService';
import ContactListItem from '../ContaclListItem/ContaclListItem';

export default ContactList;

function ContactList(props) {
  // const [contacts, setContact] = useState([]);

  // useEffect(  () => {
  //   console.log(props.profile);
  //   if(props.profile) {
  //     console.log(props.profile._id);
  //     const contactList = await profileService.getContacts(props.profile._id);
  //     console.log(contactList, ' contactList');
  //     setContact(contactList);
    
  //   }
  //   return () => {
  //     console.log('contacts fetched');
  //   }
  // }, []);

    let contactList = (props.profile) ?
    <div>

      {props.profile.contacts.map(contact =>
         <ContactListItem
         contact={contact}
         handleContactSelect={props.handleContactSelect}
         key={contact._id}
            
         />
      )}
  </div>
    :
    <div>
      <h2>
        Loading...
      </h2>
    </div>
  


  return(
    <div>
      <h4>ContactList component</h4>
      {contactList}

    </div>
  )
}