import React, { Component, useState, useEffect } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import io from 'socket.io-client';
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ChatPage from "../ChatPage/ChatPage";
import ContactPage from "../ContactPage/ContactPage";
import userService from "../../utils/userService";
import profileService from "../../utils/profileService";
import "./App.css";
import { PromiseProvider } from "mongoose";
// import ProfilePage from "../ProfilePage/ProfilePage";
let socket;
const END_POINT = 'http://localhost:3001/';
// const END_POINT = 'https://ibump.herokuapp.com/';

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState({chat: [], from: '', to: '', body: '' });
  const history = useHistory();
  const [recipient, setRecipient] = useState('')
  
  useEffect( () => {
    if (user) {
      // console.log('hitting useEffect', user);
      profileService.getProfile(user._id)
      .then(data => {
        // console.log(data, 'this is the data');
        setProfile(data);
      });
    } else {
      setProfile(null);
    }
    return () => {
      // console.log('profile loaded');
      setProfile(null)
    }
  }, []);
  
  useEffect(() => {
    socket = io(END_POINT);

    // Fetching messages
    socket.on('init', (msg) => {
      let msgReversed = msg.reverse();
      setMessages({chat: [...msgReversed]})
    });

    //Update the chat if new message
    socket.on('push', (msg) => {
      console.log(msg, ' msg received in App.js');
      setMessages({chat: [...messages.chat, msg]})
    })
  }, []);

  const handleMessageBodyChange = (e) => {
    const formData = {...messages, ...{
      from: profile._id,
      body: e.target.value,
    }
  }
    setMessages(formData);
  }

  // function handleName(e) {
  //   setMessages({to: e.target.value})
  // }

  function handleMessageSubmit(e) {
    e.preventDefault();

    //Send the new message to the server
    socket.emit('message', {
      from: profile._id,
      to: messages.to, 
      body: messages.body
    });
    console.log('Message has been sent');
    console.log(messages, 'this is the messages');
    setMessages(prevMessages => {return {
      chat: [...prevMessages.chat, {
        from: prevMessages.from,
        to: prevMessages.to,
        body: prevMessages.body,
      }],
      from: profile._id,
      to: prevMessages.to,
      body: '',
    }});
  }

  

  function handleContactSelect(contact) {
    console.log(contact._id, ' Inside App handleContactSelect');
    setMessages({
      ...messages, 
      ...{to: contact._id}
      // chat: [...messages.chat],
      // from: profile._id,
      // to: contactUsername,
      // body: {...messages.body}
    })
    setRecipient(contact.username)
    history.push('/chat')
    // redirectToChat()
    // console.log(messages);
  }

  const handleAddContact = async (newContactData) => {
    // console.log(newContactData, 'newContactData------');
    
    const newContact = await profileService.addNewContact(newContactData);
    // console.log(newContact, 'the new contact');
    setProfile(newContact);
    // console.log(profile, ' The brand new Profile State');
    // () => PromiseProvider.history.push('/')
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
    setProfile(null);

  }

  const handleSignupOrLogin = () => {
    // console.log(user, 'this is the user in handleSignupOrLogin------------------------------------------------------------------------------');
    setUser(userService.getUser());
    // console.log(user, "this is the user in handleSignupOrLogin");
  };



  return (
    <div className="landing-page">
      <Switch>
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={({ history }) => (
            <ProfilePage
              history={history}
              handleLogout={handleLogout}
              user={user}
              profile={profile}
            />
          )}
        />
        <Route
          exact
          path="/chat"
          render={({ history }) => (
            <ChatPage
              history={history}
              // handleLogout={handleLogout}
              user={user}
              profile={profile}
              messages={messages}
              recipient={recipient}
              handleMessageBodyChange={handleMessageBodyChange}
              handleMessageSubmit={handleMessageSubmit}
            />
          )}
        />
        <Route
          exact
          path="/contacts"
          render={({ history }) => (
            <ContactPage
              history={history}
              handleAddContact={handleAddContact}
              handleContactSelect={handleContactSelect}
              user={user}
              profile={profile}
              // contacts={contacts}
            />
          )}
        />
      </Switch>
      {
        <Route exact path="/">
          {user ? <Redirect to='/contacts' /> : <Redirect to='/login' />}
        </Route>
      }
    </div>
  );
}

export default App;


{/* <ContactPage user={user} profile={profile} /> */}