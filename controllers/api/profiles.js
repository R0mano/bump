const Profile = require("../../models/profile");

module.exports = {
    index,
    createContact,
    update,
};

async function index(req, res) {
    try {
        await Profile.findOne({ user: req.params.userId })
        .populate('contacts')
        .exec((err, profile) => {
          if (err) {
            console.log(err);
          }
            res.status(200).json(profile);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function createContact(req, res) {
    try {
        let message = "";
        const newlyCreatedContact = await Profile.findOne({
            username: req.body.contact,
        });
        if (!newlyCreatedContact) {
            message = "No match found with this username";
        }
        const profile = await Profile.findById(req.body.profileId)
            .populate("contacts")
            .exec();
        const isNewContact =
            profile.contacts.length && newlyCreatedContact
                ? profile.contacts.every((contact) => {
                      return (
                          contact._id.toString() !==
                          newlyCreatedContact._id.toString()
                      );
                  })
                : true;
        if (newlyCreatedContact && isNewContact) {
            profile.contacts.push(newlyCreatedContact);
        } else if (!isNewContact) {
            message = "This contact is already in your list";
        }
        await profile.populate("contacts").execPopulate();
        profile.save();
        res.status(200).json({ profile, message });
        
    } catch(err) {
      console.log(err);
      res.status(400).json(err);
    }
}

async function update(req, res) {
    console.log(req.body, 'req.body')
    console.log(req.params, 'req.params')
    try{
        let profile = await Profile.findById(req.params.profileId)
        console.log(profile, ' profile')
        profile.username = req.body.username;
        profile.bio = req.body.bio;
        await profile.populate("contacts").execPopulate()
        profile.save( (err, profile) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            console.log(profile, ' Saved updated profile')
            res.status(200).json(profile)
        })
    }catch(err){
        console.log(err)
        res.status(400).json(err)

    }

}
