import React, { useState, useEffect } from 'react';
import './AddContactForm.css';

export default AddContactForm;

function AddContactForm(props) {
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setContact(e.target.value)
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    let newMessage = await props.handleAddContact({contact: contact, profileId: props.profile._id});
    setMessage(newMessage);
  }

  const isFormValid = () => {
    return !(contact && (contact !== props.profile.username))
  }

  useEffect(() => {
    setMessage('')
  }, [contact])

  return (
    <div className='AddContactForm' >
      <form className='form-inline' onSubmit={handleSubmit}>
        <input className='form-control col-10' type="text" name='contact' placeholder="Contact's Username" value={contact} onChange={handleChange} required/>
        <button className="form-control col-2 btn btn-sm btn-primary" disabled={isFormValid()} >Add Contact</button>
      </form>
      <p><span>{message}</span></p>
    </div>
  )
}