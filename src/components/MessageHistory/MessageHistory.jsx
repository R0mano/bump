import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MessageHistoryItem from '../MessageHistoryItem/MessageHistoryItem';
import './MessageHistory.css';

export default MessageHistory;

function MessageHistory(props) {
  console.log(props.messages.chat, 'PROPS.messages.chat');
//   const filters = {
//     from: from => from === props.messages.to || from === props.profile._id,
//     to: to => to === props.messages.to || to === props.profile._id
//   }

//  const filterArray = (array, filters) => {
//    const filterKeys = Object.keys(filters);
//    console.log(array, filterKeys, 'array and filterKeys');
//     return array.filter(item => {
//       // validates all filter criteria
//       return filterKeys.every(key => {
//         // ignores non-function predicates
//         if (typeof filters[key] !== 'function') return true;
//         return filters[key](item[key]);
//       });
//     });
//   }
  // console.log(props.messages.to, ' props.messages.to');
  // console.log(props.messages.from, ' props.messages.from');
  // console.log(props.profile._id, ' props.profile._id');
  const filteredMessages = props.messages.chat.filter((message) => {
    return message.from === props.messages.to
      && message.to === props.profile._id
      || message.to === props.messages.to
      && message.from === props.profile._id
  })
  console.log(filteredMessages, ' filteredMessages');


  useEffect(()=> {
    scrollToBottom()
  }, [props.messages])

  function scrollToBottom() {
    const chat = document.querySelector('.message-history');
    console.log(chat);
    chat.scrollTop = chat.scrollHeight;
  }
  
  // function messageFilter() {
    //   props.messages.chat.filter((msg) => {
      //     msg.to === props.messages.to || props.profile._id && msg.from === props.messages.to || props.profile._id
      //   })
      // }
      
      
      
      // const filteredMessages = filterArray(props.messages.chat, filters)
      console.log(filteredMessages, ' filteredMessages');

      
      let messageHistory = (props.profile && props.messages.chat) ?
      
  <div className='message-history' >
    
    { filteredMessages.length ?
    filteredMessages.map((message, idx) =>
       <MessageHistoryItem
       message={message}
       profile={props.profile}
       recipient={props.recipient}
       key={idx}
       />
    )
      :
      <p>Select a contact</p>
  }
</div>
  :
  <div  className='message-history' >
    <h2>
      Loading...
    </h2>
  </div>

  return(
    <div>
      {/* <h4>This is the MessageHistory component</h4> */}
      <div >
        {
          props.messages.chat.length ? messageHistory : <p>loading...</p>
        }
        
      </div>
    </div>
  )
}