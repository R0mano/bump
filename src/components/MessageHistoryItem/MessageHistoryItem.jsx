import React from 'react';
import './MessageHistoryItem.css'

export default MessageHistoryItem;

function MessageHistoryItem(props) {

  // console.log(props.recipient.length, '//////////////////////////////////////////////////////////')
  let aMessage = props.recipient.length ?

 <div>
  <span className={props.message.from === props.profile._id ? 'me' : 'you'}>{props.message.body}</span>
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