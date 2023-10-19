// Import controllers
const { getCreateQPage, postCreateQPage } = require('../controller/createQController');
const { getManagePage } = require('../controller/manageController');
const { getUpdatePage, postUpdateQPage, getDeletePage } = require('../controller/updateQController');
// const { getDeletePage, } = require('../controller/deleteQController');
const express = require("express");
const router = express.Router();
// Create Quizzes Page
router.get('/createQ', getCreateQPage);
router.post('/createQ_Submit', postCreateQPage);
// Manage Page
router.get('/manage', getManagePage);
// Edit Page
router.get('/updateQ', getUpdatePage);
router.post('/updateQ_Submit', postUpdateQPage);
// Delete
// router.get('/deleteQ', getDelelePage)
router.post('/deleteQ_Submit', getDeletePage)


module.exports = router;