import React from 'react';
import "./ContaclListItem.css";


function ContactListItem(props) {
  
  function handleClick() {
    props.handleContactSelect(props.contact);
  }
  
  return (
    <div className='contact-item' onClick={handleClick}>
      

      <div className="card p-2 mb-3">
      <div className="row">
        <div className="col-2 contact-avatar-wrapper">
          <div className='contact-avatar'>
            <img className="card-img contact-avatar-img" src={props.contact.avatar} alt="..." />
          </div>
        </div>
        <div className="col-10">
          <div className="card-body">
            <h5 className="card-title">{props.contact.username}</h5>
            <p className='card-text'>{props.contact.bio}</p>
          </div>
        </div>
      </div>
      </div>   

    </div>


)
} 

export default ContactListItem;