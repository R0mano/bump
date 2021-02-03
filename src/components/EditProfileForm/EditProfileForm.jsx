import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../utils/profileService";
import "./EditProfileForm.css";

const EditProfileForm = (props) => {
    const [newProfile, setNewProfile] = useState({
        username: "",
        bio: "",
        avatar: "",
    });

    useEffect(() => {
        if (props.profile) {
            setNewProfile({
                username: props.profile.username,
                bio: props.profile.bio,
                avatar: "",
            });
        }
    }, [props.profile]);

    const handleChange = (e) => {
        props.updateMessage("");
        const formData = {
            ...newProfile,
            [e.target.name]: e.target.value,
        };
        setNewProfile(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = await profileService.updateProfile(
                newProfile,
                props.profile._id
            );
            props.handleProfileUpdate(updatedProfile);
            props.history.push("/profile");
        } catch (err) {
            console.log(err);
            props.updateMessage(
                `Oops! It looks like something went wrong. ${err}`
            );
        }
    };

    const isFormInvalid = () => {
        return !(
            newProfile.username &&
            newProfile.username !== props.profile.username
        );
    };

    return (
        <div className="EditProfileForm">
            <header className="header-footer header">
                <h3>Update Profile</h3>
            </header>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group row form-block">
                    <label classname="col-sm-2 col-form-label field">
                        Name
                    </label>
                    <div className="col-sm-10 field-container">
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            autoComplete="off"
                            value={newProfile.username}
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row form-block">
                    <label classname="col-sm-2 col-form-label field">Bio</label>
                    <div className="col-sm-10 field-container">
                        <input
                            id="bio"
                            type="text"
                            className="form-control"
                            placeholder="A little bit about yourself"
                            value={newProfile.bio}
                            name="bio"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                        <button
                            type="submit"
                            className="btn btn-default"
                            disabled={isFormInvalid()}
                        >
                            <span>Update Profile</span>
                        </button>
                        &nbsp;&nbsp;
                        <Link to="/profile">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
