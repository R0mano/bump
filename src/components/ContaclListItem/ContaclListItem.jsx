import React from 'react';
import "./ContaclListItem.css";



export default ContactListItem;

function ContactListItem(props) {

  function handleClick() {
    props.handleContactSelect(props.contact);
  }

  return (
    <div className='contact-item'>
      <div className='ContactItem contact-item' onClick={handleClick}>
      <div class="card">
        <div class="card-body">
          <h4>{props.contact.username} &nbsp;&nbsp;|&nbsp;&nbsp;<span><small>{props.contact.bio}</small></span></h4>
        </div>
      </div>
      </div>
    </div>
  )
} 