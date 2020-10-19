import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import MessageHistory from "../../components/MessageHistory/MessageHistory";
import NewMessageForm from "../../components/NewMessageForm/NewMessageForm";
import './ChatPage.css';

export default function ChatPage(props) {
  let page = props.profile ? (
    <div className='ChatPage' >
      <NavBar
        handleLogout={props.handleLogout}
        user={props.user}
        profile={props.profile}
      />

      <h1>Chat{props.recipient ? ` with ${props.recipient}` : ' - No contact selected'} </h1>
<div className='chat-wrapper' >
      {props.profile && props.messages.chat.length ? (
        <MessageHistory
          profile={props.profile}
          messages={props.messages}
          handleMessageSubmit={props.handleMessageSubmit}
          recipient={props.recipient}
        />
      ) : (
<div className='chat-wrapper' >No messages yet</div>
      )}

      <NewMessageForm
        profile={props.profile}
        messages={props.messages}
        handleMessageBodyChange={props.handleMessageBodyChange}
        handleMessageSubmit={props.handleMessageSubmit}
      />
    </div>
  </div>
  ) : (
    <div>
      <h1>loading...</h1>
    </div>
  );
  return <div>{page}</div>;
}
