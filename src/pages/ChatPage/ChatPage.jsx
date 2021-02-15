import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import MessageHistory from "../../components/MessageHistory/MessageHistory";
import NewMessageForm from "../../components/NewMessageForm/NewMessageForm";
import "./ChatPage.css";

function ChatPage(props) {
    let header = props.recipient ? (
        <div className="chat-page-header">
            <div>
                <img src={props.recipient.avatar} alt="recipent-avatar" />
            </div>
            <p>{props.recipient.username}</p>
        </div>
    ) : (
        <h1>No contact selected</h1>
    );

    let page = props.profile ? (
        <div className="ChatPage">
            <NavBar
                handleLogout={props.handleLogout}
                user={props.user}
                profile={props.profile}
            />
            <div className="chat-wrapper">
                {header}
                {props.profile && props.messages.chat.length ? (
                    <MessageHistory
                        profile={props.profile}
                        messages={props.messages}
                        handleMessageSubmit={props.handleMessageSubmit}
                        recipient={props.recipient.username}
                    />
                ) : (
                    <div className="">No messages yet</div>
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

export default ChatPage;
