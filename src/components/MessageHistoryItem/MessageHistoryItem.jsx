import React from 'react';
import './MessageHistoryItem.css'

export default MessageHistoryItem;

function MessageHistoryItem(props) {

  // console.log(props.recipient.length, '//////////////////////////////////////////////////////////')
  let aMessage = props.recipient.length ?

 <div className={props.message.from === props.profile._id ? 'me' : 'you'}>
  <div className='message' >{props.message.body}</div >
</div>
// </div>
  :
  <div>Select a contact</div>




  return(
    <div>

      {aMessage}
    </div>
  )

}