const Profile = require('../../models/profile');

module.exports = {
  index,
  createContact,
}

async function index(req, res) {
  let profile = await Profile.findOne({user: req.params.userId});
  await profile.populate('contacts').execPopulate();
  res.status(200).json(profile);
}

async function createContact(req, res) {
  const newlyCreatedContact = await Profile.findOne({username: req.body.contact});
  console.log(newlyCreatedContact, ' newlyCreatedContact ')
  const profile =  await Profile.findById(req.body.profileId);
  console.log(profile, ' profile ')
  const isNewContact = profile.contacts.length ? 
  profile.contacts.every(contact => {
    return contact._id !== newlyCreatedContact._id
  })
  :
  true
  if (newlyCreatedContact && isNewContact) {
    profile.contacts.push(newlyCreatedContact);
    console.log(profile, ' profile ')
  } 
  await profile.populate('contacts').execPopulate();
  profile.save();
  // console.log(profile);
  res.status(200).json(profile);
}

