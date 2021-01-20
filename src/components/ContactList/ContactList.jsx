import React, { useEffect, useState } from "react";
import ContactListItem from "../ContaclListItem/ContaclListItem";

export default ContactList;

function ContactList(props) {
    let contactList = (
        <div>
            <h2>Loading...</h2>
        </div>
    );

    if (props.profile) {
        contactList = (
            <div>
                {props.profile.contacts.map((contact) => (
                    <ContactListItem
                        contact={contact}
                        handleContactSelect={props.handleContactSelect}
                        key={contact._id}
                    />
                ))}
            </div>
        );
    }

    // useEffect(() => {}, [props.profile]);

    return <div>{contactList}</div>;
}
