import React from 'react';
import { Redirect } from "react-router-dom";


export default ContactListItem;

function ContactListItem(props) {


  

  function handleClick(e) {
    console.log(e.target.innerText, ' Contact being clicked');
    props.handleContactSelect(props.contact);
  }


  return (
    <div>
      <h5>ContactListItem component</h5>
      <div className='ContactItem' onClick={handleClick}>
        <h5>{props.contact.username}</h5>
      </div>
    </div>
  )
}