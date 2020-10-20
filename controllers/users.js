const User = require('../models/user');
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'Bad Credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        return res.json({token});
      } else {
        return res.status(401).json({err: 'Bad Credentials'});
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function signup(req, res) {

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save( async function(err) {
      if(err) {console.log(err);}
            const profile = new Profile({
              user: user._id,
              username: req.body.username,
              dob: req.body.dob,
              bio: req.body.bio,
            })
            const token = createJWT(user);
            await profile.save(function(err) {
              if(err) {console.log(err);} 
              res.status(200).json({token, profile});
            })
          });
  } catch (err) {
    console.log('this is a catch error inside signup', err);
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

//Helper functions 

function createJWT(user) {
  return jwt.sign(
    { user }, 
    SECRET,
    {expiresIn: '24h'}
  );
}