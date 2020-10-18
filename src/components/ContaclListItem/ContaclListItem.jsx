import React from 'react';
import { Redirect } from "react-router-dom";
import "./ContaclListItem.css";



export default ContactListItem;

function ContactListItem(props) {


  

  function handleClick(e) {
    console.log(e.target.innerText, ' Contact being clicked');
    props.handleContactSelect(props.contact);
  }


  return (
    <div className='contact-item'>
      {/* <h5>ContactListItem component</h5> */}
      <div className='ContactItem contact-item' onClick={handleClick}>
      <div class="card">
        <div class="card-body">
          <h4>{props.contact.username} |<span> <small>{props.contact.bio}</small></span></h4>
        </div>
      </div>
       
      </div>
    </div>
  )
}