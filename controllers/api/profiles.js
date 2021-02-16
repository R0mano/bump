const fs = require("fs");
const Profile = require("../../models/profile");
const awsService = require("./aws");
const multer = require("multer");

module.exports = {
    index,
    createContact,
    updateProfileInfo,
    updateAvatar,
};

async function index(req, res) {
    try {
        await Profile.findOne({ user: req.params.userId })
            .populate("contacts")
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
        const profile = await Profile.findById(req.body.profileId);
        const isNewContact =
            profile.contacts.length && newlyCreatedContact
                ? profile.contacts.every((contact) => {
                      return (
                          contact._id.toString() !==
                              newlyCreatedContact._id.toString() &&
                          newlyCreatedContact._id.toString() !==
                              profile._id.toString
                      );
                  })
                : true;
        if (newlyCreatedContact && isNewContact) {
            profile.contacts.unshift(newlyCreatedContact);
        } else if (!isNewContact) {
            message = "This contact is already in your list";
        }
        await profile.populate("contacts").execPopulate();
        console.log(profile.contacts, " profile.contacts retrieved and sorted");
        profile.save();
        res.status(200).json({ profile, message });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function updateProfileInfo(req, res) {
    try {
        let profile = await Profile.findById(req.params.profileId);
        profile.username = req.body.username;
        profile.bio = req.body.bio;
        await profile.populate("contacts").execPopulate();
        profile.save((err, profile) => {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            }
            res.status(200).json(profile);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function updateAvatar(req, res) {
    const profileId = req.params.profileId;
    const avatarPath = req.file.path;

    try {
        const profile = await Profile.findById(profileId);
        const avatarId = profile.avatar.split(".com/")[1];
        console.log(req.file, ' req.file')
        if (!isAvatarValid(req.file)) {
            throw new Error(
                "Error while uploading: The file is too large or the format is not supported"
            );
        }
        awsService
            .createNewAvatar(avatarPath)
            .then(async (data) => {
                fs.unlinkSync(avatarPath); // Empty temp folder
                profile.avatar = data.Location;
                await profile.populate("contacts").execPopulate();
                profile
                    .save()
                    .then((profile) => {
                        res.status(200).json(profile);
                    })
                    .then(() => {
                        try {
                            if (avatarId) {
                                awsService.deleteAvatar(avatarId);
                            }
                        } catch (err) {
                            console.log(
                                `Error occured while trying to delete avatar: ${err}`
                            );
                            res.status(400).json(err);
                        }
                    })
                    .catch((err) => {
                        console.log(
                            `Error occured while trying to save the Profile to DB: ${err}`
                        );
                        res.status(400).json(err);
                    });
            })
            .catch((err) => {
                console.log(
                    `Error occured while trying to upload Avatar to AWS: ${err}`
                );
                res.status(400).json(err);
            });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

//helper functions

function isAvatarValid(info) {
    return (
        (info &&
            info.size < 2 * 1024 * 1024 &&
            info.mimetype === "image/jpeg") ||
        info.mimetype === "image/png"
    );
}
