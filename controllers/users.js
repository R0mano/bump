const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login,
};

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user, " user");
        console.log(user._id, " user._id");
        if (!user) return res.status(401).json({ err: "Bad Credentials" });
        Profile.findOne({ user: user._id })
            .populate("contacts")
            .exec((err, profile) => {
                if (err) {
                    console.log(err);
                }
                console.log(profile, " Profile matching User matched");
                user.comparePassword(req.body.pw, (err, isMatch) => {
                    if (isMatch) {
                        const token = createJWT(user);
                        console.log(token, " token");
                        return res.json({ token, profile });
                    } else {
                        return res.status(401).json({ err: "Bad Credentials" });
                    }
                });
            });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function signup(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    try {
        await user.save(async function (err) {
            if (err) {
                console.log(err);
                // res.status(400).json(err, message: 'email is already taken') for later-------
            }
            const profile = new Profile({
                user: user._id,
                username: req.body.username,
                dob: req.body.dob,
                bio: req.body.bio,
            });
            const token = createJWT(user);
            await profile.save(function (err) {
                if (err) {
                    console.log(err);
                }
                res.status(200).json({ token, profile });
            });
        });
    } catch (err) {
        console.log("this is a catch error inside signup", err);
        // Probably a duplicate email
        res.status(400).json(err);
    }
}

//Helper function
function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
