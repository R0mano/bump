import { set } from 'mongoose';
import React, { Component, useState, useEffect } from 'react';
import profileService from '../../utils/profileService';
import './AddContactForm.css';

export default AddContactForm;

function AddContactForm(props) {
  const [contact, setContact] = useState('');

  function handleChange(e) {
    setContact(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(contact, 'this is the new contact to be added');
    // console.log(props, 'these are the props inside AddContactForm');
    await props.handleAddContact({contact: contact, profileId: props.profile._id});

    // try {
    //   await profileService.create(contact)
    // } catch(err) {
    //   console.log(err);
    // }
  }



  return (
    <div className='AddContactForm' >
      {/* <h3>AddContactForm</h3> */}
      <form className='form-inline' onSubmit={handleSubmit}>
        <input className='form-control col-10' type="text" name='contact' placeholder="Contact's Username" value={contact} onChange={handleChange} required/>
        <button className="form-control col-2 btn btn-sm btn-primary" >Add Contact</button>
      </form>
    </div>
  )
}