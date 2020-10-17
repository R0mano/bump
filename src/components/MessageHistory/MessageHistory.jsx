import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MessageHistoryItem from '../MessageHistoryItem/MessageHistoryItem';

export default MessageHistory;

function MessageHistory(props) {

  const filters = {
    from: from => from === props.messages.to || from === props.profile._id,
    to: to => to === props.messages.to || to === props.profile._id
  }

 const filterArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }

  
  
  // function messageFilter() {
    //   props.messages.chat.filter((msg) => {
      //     msg.to === props.messages.to || props.profile._id && msg.from === props.messages.to || props.profile._id
      //   })
      // }
      
      
      
      const filteredMessages = filterArray(props.messages.chat, filters)
      let messageHistory = (props.profile && props.messages.chat) ?
      
  <div>

    {filteredMessages.map(message =>
       <MessageHistoryItem
       message={message}
       recipient={props.recipient}
       key={message}
       
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