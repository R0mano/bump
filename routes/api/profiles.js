const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');


// write your routes here
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.get('/:userId', profilesCtrl.index);
router.post('/', profilesCtrl.createContact);







module.exports = router;