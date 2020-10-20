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
  const profile =  await Profile.findById(req.body.profileId);
  if (newlyCreatedContact && !profile.contacts.includes(newlyCreatedContact._id)) {
    profile.contacts.push(newlyCreatedContact._id);
  } 
  profile.save();
  // console.log(profile);
  res.status(200).json(profile);
}

