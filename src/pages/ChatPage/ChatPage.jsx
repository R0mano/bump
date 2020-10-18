import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import MessageHistory from '../../components/MessageHistory/MessageHistory';
import NewMessageForm from '../../components/NewMessageForm/NewMessageForm';

export default 

function ChatPage(props) {

  let page = props.profile ?
    <div>
      
      {/* <h1>console.log(props.profile.username, 'profile')</h1> */}
      <h1>{props.profile.username}</h1>
      <h1>{props.profile.dob}</h1>
      <h1>{props.profile.bio}</h1>      
      </div>
      :
      <div>
        <h1>loading...</h1>    
      </div>
  console.log(props, 'props from chatPage');
  return(
    <div>
      <NavBar user={props.user} profile={props.profile}/>

      <h1>This is the ChatPage</h1>

      {page}
      {
        props.profile && props.messages.chat.length
          ?
          <MessageHistory
          profile={props.profile}
          messages={props.messages}
          handleMessageSubmit={props.handleMessageSubmit}
          recipient={props.recipient}
          // FilteredMessages={props.FilteredMessages}
          />
          :
          <p>loading...</p>
      }

      <NewMessageForm
      profile={props.profile}
      messages={props.messages}
      handleMessageBodyChange={props.handleMessageBodyChange}
      handleMessageSubmit={props.handleMessageSubmit}
      />
    </div>
  )
}