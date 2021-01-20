import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import io from 'socket.io-client';
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ChatPage from "../ChatPage/ChatPage";
import ContactPage from "../ContactPage/ContactPage";
import userService from "../../utils/userService";
import profileService from "../../utils/profileService";
import "./App.css";
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
      profileService.getProfile(user._id)
      .then(data => {
        setProfile(data);
      });
    } else {
      setProfile(null);
    }
  }, [user]);
  
  useEffect(() => {
    socket = io(END_POINT);

    // Fetching messages
    socket.on('init', (msg) => {
      setMessages({chat: [...msg]})
    });

    //Update the chat if new message
    socket.on('push', (msg) => {
      setMessages((prevmessages) => {return {...prevmessages, chat: [...prevmessages.chat, msg], body:''}})
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

  function handleMessageSubmit(e) {
    e.preventDefault();

    //Send the new message to the server
    socket.emit('message', {
      from: profile._id,
      to: messages.to, 
      body: messages.body
    });
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
    setMessages({
      ...messages, 
      ...{to: contact._id}
    })
    setRecipient(contact.username)
    history.push('/chat')
  }

  const handleAddContact = async (newContactData) => {
    const profileWithNewContact = await profileService.addNewContact(newContactData);
    console.log(profileWithNewContact, ' profileWithNewContact')
    // if( profileWithNewContact.contacts.length === profile.contacts.length) {
      
    //   }
      setProfile(profileWithNewContact);
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
    setProfile(null);
  }

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  return (
    <div className="App container container-fluid" id='chat' elevation={3}>
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
            userService.getUser() ?
            <ProfilePage
              history={history}
              handleLogout={handleLogout}
              user={user}
              profile={profile}
              />
              :
              <Redirect to='/login' />
              )}
              />
        <Route
          exact
          path="/chat"
          render={({ history }) => (
            userService.getUser() ?
            <ChatPage
            history={history}
            handleLogout={handleLogout}
            user={user}
            profile={profile}
            messages={messages}
            recipient={recipient}
            handleMessageBodyChange={handleMessageBodyChange}
            handleMessageSubmit={handleMessageSubmit}
            />
            :
            <Redirect to='/login' />
            )}
            />
        <Route
          exact
          path="/contacts"
          render={({ history }) => (
            userService.getUser() ?
            <ContactPage
            handleLogout={handleLogout}
            history={history}
            handleAddContact={handleAddContact}
            handleContactSelect={handleContactSelect}
            user={user}
            profile={profile}
            handleLogout={handleLogout}
            />
            :
            <Redirect to='/login' />
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
