export default {
    getProfile,
    addNewContact,
    // getContacts,
    updateProfile,
};

const BASE_URL = "/api/profiles";

function getProfile(userId) {
    return fetch(`${BASE_URL}/${userId}`).then((res) => res.json());
}

function addNewContact(contact) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contact),
    }).then((res) => res.json());
}

// function getContacts(profileId) {
//   return fetch(`${BASE_URL}/contacts/${profileId}`)
//   .then(res => res.json());
// }

function updateProfile(newProfile, profileId) {
    console.log("hitting profileService.updateProfile");
    return fetch(`${BASE_URL}/update-profile/${profileId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newProfile),
    }).then((res) => {
      if(res.ok) {
        console.log('res.ok!!!!!!!!')
        console.log(res, ' the response object')
        return res.json()
      }
      throw new Error('This username is already taken by someone else');
    });
}
