import React, { Component, useState, useEffect } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
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

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [profile, setProfile] = useState(null);

  useEffect( () => {
    if (user) {
      console.log('hitting useEffect', user);
      profileService.getProfile(user._id)
      .then(data => {
        console.log(data, 'this is the data');
        setProfile(data);
      });
    } else {
      setProfile(null);
    }
    return () => {
      console.log('profile loaded');
    }
  }, [user]);

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
    console.log(newContact, 'the new contact');
    setProfile(newContact);
    console.log(profile, ' The brand new Profile State');
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
              user={user}
              profile={profile}
            />
          )}
        />
      </Switch>
      {
        <Route exact path="/">
          {user ? <ContactPage user={user} profile={profile} /> : <Redirect to='/login' />}
        </Route>
      }
    </div>
  );
}

export default App;
