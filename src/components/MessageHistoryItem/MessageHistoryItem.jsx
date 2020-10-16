import React from 'react';

export default MessageHistoryItem;

function MessageHistoryItem(props) {




  return(
    <div>
      <h4>This is the MessageHistoryItem component</h4>
      <p>{props.message.from}</p>
      <p>{props.message.to}</p>
      <p>{props.message.body}</p>
    </div>
  )

}