import React from "react";
import "./NewMessageForm.css";

export default NewMessageForm;

function NewMessageForm(props) {
    function handleChange(e) {
        props.handleMessageBodyChange(e);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await props.handleMessageSubmit(e);
    }

    function isValid() {
        return !(
            props.messages.from &&
            props.messages.to &&
            props.messages.body.length
        );
    }

    return (
        <div className="NewMessageForm">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3 mx-auto col-10">
                    <input
                        className="form-control col-10"
                        type="text"
                        placeholder="New Message"
                        aria-label="New Message"
                        name="body"
                        autoFocus={true}
                        value={props.messages.body}
                        onChange={handleChange}
                    />
                    <button
                        className="form-control btn btn-primary col-2"
                        type="submit"
                        disabled={isValid()}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

// value={props.messages.body}
