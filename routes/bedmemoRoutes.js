// Import controllers
const { getCreateQPage, postCreateQPage } = require('../controller/createQController');
const { getManagePage } = require('../controller/manageController');
const { getUpdatePage, postUpdateQPage } = require('../controller/updateQController');
const express = require("express");
const router = express.Router();
// Create Quizzes Page
router.get('/createQ', getCreateQPage);
router.post('/createQ_Submit', postCreateQPage);
// Manage Page
router.get('/manage', getManagePage);
// Edit Page
router.get('/update', getUpdatePage);
router.post('/updateQ_Submit', postUpdateQPage);



module.exports = router;