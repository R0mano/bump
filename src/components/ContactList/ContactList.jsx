import React from "react";
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
            <div  className='Contact-list'>
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

    return <div>{contactList}</div>;
}
