import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import io from "socket.io-client";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ChatPage from "../ChatPage/ChatPage";
import ContactPage from "../ContactPage/ContactPage";
import userService from "../../utils/userService";
import profileService from "../../utils/profileService";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import "./App.css";

let socket = io();

function App() {
    const [user, setUser] = useState(userService.getUser());
    const [profile, setProfile] = useState(null);
    const [IsReadyForSocket, setIsReadyForSocket] = useState(null);
    const [messages, setMessages] = useState({
        chat: [],
        from: "",
        to: "",
        body: "",
    });
    const [recipient, setRecipient] = useState({username: "", avatar: ""});
    const history = useHistory();

    useEffect(() => {
        if (user) {
            profileService
                .getProfile(user._id)
                .then((data) => {
                    setProfile(data);
                    setIsReadyForSocket({isReady: true, profileId: data._id});
                })
                // .then(() => {
                // });
        } else {
            setProfile(null);
        }
    }, [user]);

    useEffect(() => {
        if (IsReadyForSocket) {
            //request messages for profileId
            // console.log(socket, ' socket io() before connect()')
            socket.connect();
            // console.log(socket, ' socket io() after connect()')
            // console.log('trying to retrieve messages for ' + IsReadyForSocket.profileId)
            socket.emit('retrieve-messages', {profileId: IsReadyForSocket.profileId});
            // console.log('retrieve messages request sent')

            // Receiving messages
            socket.on("init", (msg) => {
                console.log('socket.on init')
                setMessages({ chat: [...msg] });
            });

            //Update the chat if new message
            socket.on("push", (msg) => {
                setMessages((prevMessages) => {
                    return {
                        ...prevMessages,
                        chat: [...prevMessages.chat, msg],
                        body: "",
                    };
                });
            });
        }
    }, [IsReadyForSocket]);

    const handleMessageBodyChange = (e) => {
        const formData = {
            ...messages,
            ...{
                from: profile._id,
                body: e.target.value,
            },
        };
        setMessages(formData);
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        //Send the new message to the server
        socket.emit("message", {
            from: profile._id,
            to: messages.to,
            body: messages.body,
        });

        setMessages((prevMessages) => {
            return {
                chat: [
                    ...prevMessages.chat,
                    {
                        from: prevMessages.from,
                        to: prevMessages.to,
                        body: prevMessages.body,
                    },
                ],
                from: profile._id,
                to: prevMessages.to,
                body: "",
            };
        });
    };

    const handleContactSelect = (contact) => {
        setMessages({
            ...messages,
            ...{ to: contact._id },
        });
        setRecipient({username: contact.username, avatar: contact.avatar});
        history.push("/chat");
    };

    const handleAddContact = async (newContactData) => {
        const profileWithNewContact = await profileService.addNewContact(
            newContactData
        );
        setProfile(profileWithNewContact.profile);
        return profileWithNewContact.message;
    };

    const handleProfileUpdate = (updatedProfile) => {
      console.log(updatedProfile, ' <------ updatedProfile')
        setProfile(updatedProfile);
    };

    const handleSignupOrLogin = () => {
        setUser(userService.getUser());
    };

    const handleLogout = () => {
        userService.logout();
        setProfile(null);
        setUser(null);
        setIsReadyForSocket(false);
        setMessages({
            chat: [],
            from: "",
            to: "",
            body: "",
        });
        setRecipient({username: "", avatar: ""});
        socket.close();
    };

    return (
        <div className="App container container-fluid" id="chat" elevation={3}>
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
                    render={({ history }) =>
                        userService.getUser() ? (
                            <ProfilePage
                                history={history}
                                handleLogout={handleLogout}
                                handleProfileUpdate={handleProfileUpdate}
                                user={user}
                                profile={profile}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/chat"
                    render={({ history }) =>
                        userService.getUser() ? (
                            <ChatPage
                                history={history}
                                handleLogout={handleLogout}
                                user={user}
                                profile={profile}
                                messages={messages}
                                recipient={recipient}
                                handleMessageBodyChange={
                                    handleMessageBodyChange
                                }
                                handleMessageSubmit={handleMessageSubmit}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/contacts"
                    render={({ history }) =>
                        userService.getUser() ? (
                            <ContactPage
                                handleLogout={handleLogout}
                                history={history}
                                handleAddContact={handleAddContact}
                                handleContactSelect={handleContactSelect}
                                user={user}
                                profile={profile}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/edit-profile"
                    render={({ history }) =>
                        userService.getUser() ? (
                            <EditProfilePage
                                handleLogout={handleLogout}
                                handleProfileUpdate={handleProfileUpdate}
                                history={history}
                                profile={profile}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
            </Switch>
            {
                <Route exact path="/">
                    {user ? (
                        <Redirect to="/contacts" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
            }
        </div>
    );
}

export default App;
