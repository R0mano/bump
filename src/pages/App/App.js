import React, { Component, useState, useEffect } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import io from 'socket.io-client';
import NavBar from "../../components/NavBar/NavBar";
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
const END_POINT = 'http://localhost:3000/';

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState({chat: [], from: '', to: '', body: '' });
  const history = useHistory();
  
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
    }
  }, []);
  
  useEffect(() => {
    socket = io(END_POINT);

    // Fetching messages
    socket.on('init', (msg) => {
      let msgReversed = msg.reverse();
      // looks weird----------
      setMessages({chat: [...messages.chat, ...msgReversed]})
    });

    //Update the chat if new message
    socket.on('push', (msg) => {
      console.log(msg, ' msg received in App.js');
      setMessages({chat: [...messages.chat, msg]})
    })
  }, []);

  function handleMessageBodyChange(e) {
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
    setMessages({...messages, ...{
      chat: [...messages.chat, ...{
        from: messages.from,
        to: messages.to,
        body: messages.body,
      }]    
    },
    from: messages.from,
    to: messages.to,
    body: '',
    });
  }

  function handleContactSelect(contactUsername) {
    console.log(contactUsername, ' Inside App handleContactSelect');
    setMessages({
      ...messages, 
      ...{to: contactUsername}
      // chat: [...messages.chat],
      // from: profile._id,
      // to: contactUsername,
      // body: {...messages.body}
    })
    history.push('/chat')
    // redirectToChat()
    // console.log(messages);
  }

  // function redirectToChat() {
  //   return <Redirect to="/chat"/>
  // }

  // useEffect(() => {
  //   // console.log(profile);
  //   if(profile) {
  //     console.log(profile._id);
  //     // const contactList = await profileService.getContacts(props.profile._id);
  //     // console.log(contactList, ' contactList');
  //     setContacts(profileService.getContacts(profile._id));
  //     console.log(contacts, ' these are the contacts returned from the backend');
  //   }
  //   return () => {
  //     console.log('contacts fetched');
  //   }
  // }, [profile]);

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  const handleSignupOrLogin = () => {
    // console.log(user, 'this is the user in handleSignupOrLogin------------------------------------------------------------------------------');
    setUser(userService.getUser());
    // console.log(user, "this is the user in handleSignupOrLogin");
  };

  const handleAddContact = async (newContactData) => {
    // console.log(newContactData, 'newContactData------');
    
    const newContact = await profileService.addNewContact(newContactData);
    // console.log(newContact, 'the new contact');
    setProfile(newContact);
    // console.log(profile, ' The brand new Profile State');
    // () => PromiseProvider.history.push('/')
  }


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