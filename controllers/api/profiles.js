const Profile = require('../../models/profile');

module.exports = {
  index,
  createContact,
}

async function index(req, res) {
  // console.log(req.params, ' <- req.params')
  try{
    const profile = await Profile.findOne({user: req.params.userId}).populate('contacts').exec((err, profile) => {
      if(err) {
        console.log(err);
      }
      res.status(200).json(profile);
    });
    // console.log(profile, ' <- profile before populate()')
    // if(!profile) {
      //   res.status(400).json()
      // }
    } catch (err){
      console.log(err)
      res.status(400).json(err)
  }
}

async function createContact(req, res) {
  let message = '';
  const newlyCreatedContact = await Profile.findOne({username: req.body.contact});
  // console.log(newlyCreatedContact, ' newlyCreatedContact ')
  if (!newlyCreatedContact) {
    message = 'No match found with this username';
  } 
  const profile =  await Profile.findById(req.body.profileId).populate('contacts').exec();
  console.log(profile, ' profile ')
  const isNewContact = profile.contacts.length && newlyCreatedContact ? 
  profile.contacts.every(contact => {
    return contact._id.toString() !== newlyCreatedContact._id.toString()
  })
  :
  true
  if (newlyCreatedContact && isNewContact) {
    profile.contacts.push(newlyCreatedContact);
    // message = 'Contact added successfully';
    // console.log(profile, ' profile ')
  } else if (! isNewContact) {
    message = 'This contact is already in your list';
  }
  await profile.populate('contacts').execPopulate();
  profile.save();
  // console.log(profile);
  res.status(200).json({profile, message});
}

