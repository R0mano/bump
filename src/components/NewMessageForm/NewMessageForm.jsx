import React from 'react';

export default NewMessageForm;

function NewMessageForm(props) {

  function handleChange(e) {
    props.handleMessageBodyChange(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await props.handleMessageSubmit(e);
  }

  function isValid() {
    return !(props.messages.from && props.messages.to && props.messages.body.length)
  }

  return(
    <div>
      <h4>this is the NewMessageForm component</h4>
      <div>
      <form action="">
        <input type="text" name="body" onChange={handleChange}/>
        <button type="submit" disabled={isValid()} onClick={handleSubmit}>Send</button>
      </form>
      </div>
    </div>
  )
}

// value={props.messages.body}