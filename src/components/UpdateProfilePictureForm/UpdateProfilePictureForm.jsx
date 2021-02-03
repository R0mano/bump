import React, { useEffect, useState } from "react";
import profileService from "../../utils/profileService";
import "./UpdateProfilePictureForm.css";

const UpdateProfilePictureForm = (props) => {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Choose File");
    const [message, setMessage] = useState("");

    const visibility = props.visible ? "visible" : "hidden";

    const onFileChange = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const isAvatarValid = () => {
        return !(
            file &&
            fileName &&
            fileName !== "Choose File" &&
            file.size < 2 * 1024 * 1024 &&
            (file.type === "image/jpeg" || file.type === "image/png")
        );
    };

    const onFileSubmit = async (e) => {
        e.preventDefault();
        props.togglePictureForm();

        const formData = new FormData();
        formData.append("avatar", file);
        setFile("");
        setFileName("Choose File");

        try {
            const updatedProfile = await profileService.changeAvatar(
                formData,
                props.profileId
            );

            props.handleProfileUpdate(updatedProfile);

        } catch (err) {
            setMessage('Something went wrong while uploading the avatar. Please try again in a minute.')
        }
    };

    return (
        <div className={visibility}>
            <p>This is the UpdateProfilePictureForm</p>
            <form onSubmit={onFileSubmit} enctype="multipart/form-data">
                <input type="file" name="avatar" onChange={onFileChange} />
                <button
                    type="submit"
                    disabled={isAvatarValid()}
                    className="btn btn-success"
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default UpdateProfilePictureForm;
