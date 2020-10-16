import React from 'react';
import MessageHistoryItem from '../MessageHistoryItem/MessageHistoryItem';

export default MessageHistory;

function MessageHistory(props) {



  let messageHistory = (props.profile && props.messages) ?
  <div>

    {props.messages.chat.map(message =>
       <MessageHistoryItem
       message={message}          
       />
    )}
</div>
  :
  <div>
    <h2>
      Loading...
    </h2>
  </div>


  return(
    <div>
      <h4>This is the MessageHistory component</h4>
      <div>
        {messageHistory}
        
      </div>
    </div>
  )
}