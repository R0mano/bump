import React from 'react';
import { useEffect } from 'react';
import MessageHistoryItem from '../MessageHistoryItem/MessageHistoryItem';
import './MessageHistory.css';

export default MessageHistory;

function MessageHistory(props) {

  const filteredMessages = props.messages.chat.filter((message) => {
    return message.from === props.messages.to
      && message.to === props.profile._id
      || message.to === props.messages.to
      && message.from === props.profile._id
  })

  useEffect(()=> {
    scrollToBottom()
  }, [props.messages])

  function scrollToBottom() {
    const chat = document.querySelector('.message-history');
    chat.scrollTop = chat.scrollHeight;
  }
  
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
      loading...
    </h2>
  </div>

  return(
    <div>
      <div >
        {
          props.messages.chat.length ? messageHistory : <p>loading...</p>
        }
      </div>
    </div>
  )
}