import React, { useState } from "react";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import "./EditProfilePage.css";

const EditProfilePage = (props) => {
    const [message, setMessage] = useState("");

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    return (
        <div className="EditProfilePage ">
            <EditProfileForm
                handleProfileUpdate={props.handleProfileUpdate}
                updateMessage={updateMessage}
                profile={props.profile}
                history={props.history}
            />
            <small>{message}</small>
        </div>
    );
};

export default EditProfilePage;
