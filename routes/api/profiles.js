const express = require("express");
const multer  = require('multer');
const router = express.Router();
const profilesCtrl = require("../../controllers/api/profiles");
const upload = multer({ dest: 'temp/', limits: { fileSize: 2 * 1024 * 1024 } })


// write your routes here
// Process the token for only the routes below
router.use(require("../../config/auth"));
router.get("/:userId", profilesCtrl.index);
router.post("/", profilesCtrl.createContact);
router.put("/update-profile/:profileId", profilesCtrl.updateProfileInfo);
router.put("/update-avatar/:profileId", upload.single('avatar'), profilesCtrl.updateAvatar);

module.exports = router;
