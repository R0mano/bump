export default {
  getProfile,
  addNewContact,
  getContacts
}

const BASE_URL = '/api/profiles';

function getProfile(userId) {
  // console.log(userId, 'this is user -----------------------------------------------------------------------------------------');
  return fetch(`${BASE_URL}/${userId}`)
  .then(res => res.json());
  
}

function addNewContact(contact) {
  // console.log(contact, 'this is contact -----------------------------------------------------------------------------------------');
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(contact)
  }).then(res => res.json());
}

function getContacts(profileId) {
  console.log('hitting profileServie');
  return fetch(`${BASE_URL}/contacts/${profileId}`)
  .then(res => res.json());
}