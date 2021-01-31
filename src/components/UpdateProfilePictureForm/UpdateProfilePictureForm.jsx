import React, { useEffect, useState } from 'react';
import profileService from '../../utils/profileService';
import './UpdateProfilePictureForm.css'

const UpdateProfilePictureForm = (props) => {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Choose File")

    const visibility = props.visible ? 'visible' : 'hidden'

    const onFileChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onFileSubmit = (e) => {
        console.log(file , ' file')
        console.log(fileName, ' fileName')
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file)
        console.log(...formData, ' formData')
        profileService.changeAvatar(formData, props.profileId)

    }

    useEffect(() => {
        console.log(file , ' file')
        console.log(fileName, ' fileName')
    }, [file, fileName])

    return(
        <div className={visibility}>
            <p>This is the UpdateProfilePictureForm</p>
            <form onSubmit={onFileSubmit}>
                <input type="file" onChange={onFileChange}/>
                <button className="btn btn-success" >Confirm</button>
            </form>
        </div>
    )
}

export default UpdateProfilePictureForm