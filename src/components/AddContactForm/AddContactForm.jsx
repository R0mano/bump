import { set } from 'mongoose';
import React, { Component, useState, useEffect } from 'react';
import profileService from '../../utils/profileService';

export default AddContactForm;

function AddContactForm(props) {
  const [contact, setContact] = useState('');

  function handleChange(e) {
    setContact(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(contact, 'this is the new contact to be added');
    console.log(props, 'these are the props inside AddContactForm');
    props.handleAddContact({contact: contact, profileId: props.profile._id});

    // try {
    //   await profileService.create(contact)
    // } catch(err) {
    //   console.log(err);
    // }
  }



  return (
    <div>
      <h3>AddContactForm</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name='contact' value={contact} onChange={handleChange} required/>
        <button className="btn btn-default" >Add Contact</button>
      </form>
    </div>
  )
}