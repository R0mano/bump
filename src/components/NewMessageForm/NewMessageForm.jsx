import React from 'react';

export default NewMessageForm;

function NewMessageForm(props) {

  // function handleChange(e) {
  //   props.handleMessageBodyChange(e);
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   await props.handleMessageSubmit(e);
  // }

  return(
    <div>
      <h4>this is the NewMessageForm component</h4>
      <div>
      <form action="">
        <input type="text" name="body" onChange={() => props.handleMessageBodyChange(e)}/>
        <button type="submit" onClick={() => props.handleMessageSubmit(e)}>Send</button>
      </form>
      </div>
    </div>
  )
}