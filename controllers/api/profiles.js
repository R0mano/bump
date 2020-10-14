const Profile = require('../../models/profile');
const User = require('../../models/user');

module.exports = {
  index,
  createContact,
}

async function index(req, res) {
  // console.log(req.params, 'this is the req.params');
  // const profile = await Profile.findOne({user: req.params.userId})
  Profile.findOne({user: req.params.userId})
  .then(
    profile => {
      // console.log(profile, 'this is the profile being sent back=================================');
      res.status(200).json(profile);
    }
  )
}

async function createContact(req, res) {
  console.log('we are hitting the Ctrl');
  console.log(req.body, 'hitting createContact with req.body++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  const newlyCreatedContact = await Profile.findOne({username: req.body.contact});
  const profile = await Profile.findById(req.body.profileId);
  // let message = 'New contact has been added successfully';
  if (newlyCreatedContact && !profile.contacts.includes(newlyCreatedContact._id)) {
    profile.contacts.push(newlyCreatedContact._id);
    profile.save();
  } 
  console.log(newlyCreatedContact, ' Contact query');
  console.log(profile, ' Profile after adding new contact');
  res.status(200).json(profile);
}