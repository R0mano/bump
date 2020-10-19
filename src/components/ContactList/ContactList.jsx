import React, { useEffect, useState } from 'react';
import ContactListItem from '../ContaclListItem/ContaclListItem';

export default ContactList;

function ContactList(props) {
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
      {contactList}
    </div>
  )
}