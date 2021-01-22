import { set } from 'mongoose';
import React, { Component, useState, useEffect } from 'react';
import './AddContactForm.css';

export default AddContactForm;

function AddContactForm(props) {
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setContact(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newMessage = await props.handleAddContact({contact: contact, profileId: props.profile._id});
    setMessage(newMessage);
  }

  useEffect(() => {
    setMessage('')
  }, [contact])

  return (
    <div className='AddContactForm' >
      <form className='form-inline' onSubmit={handleSubmit}>
        <input className='form-control col-10' type="text" name='contact' placeholder="Contact's Username" value={contact} onChange={handleChange} required/>
        <button className="form-control col-2 btn btn-sm btn-primary" >Add Contact</button>
      </form>
      <p><span>{message}</span></p>
    </div>
  )
}