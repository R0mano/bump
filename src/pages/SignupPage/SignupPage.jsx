import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

export default SignupPage;

function SignupPage(props) {
  const [message, setMessage] = useState('');

  function updateMessage(msg) {
    setMessage(msg);
  }

  return(
    <div className='SignupPage'>
      <SignupForm {...props} updateMessage={updateMessage}/>
      <p>{message}</p>
    </div>
  );
}