const { Router } = require('express');
const userController = require('../controllers/userController');
const  verifyToken = require('../middlewares/verifyToken');
const multer = require("multer");

const fileUpload = multer({ dest: "./temp" }).single("profilepicture");
const { upload } = require("../middlewares/fileUpload");
const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', verifyToken, userController.getAllUsers);
router.get('/users/:userId', verifyToken, userController.getSingleUser);
router.patch('/editprofile', verifyToken, userController.editProfile);
router.patch("/profilepicture", [verifyToken, fileUpload, upload], userController.uploadProfilePicture);
router.patch('/disableuser/:userId', verifyToken, userController.disableUser);
router.patch('/enableuser/:userId', verifyToken, userController.enableUser);
router.delete('/users/:userId', verifyToken, userController.deleteUser);

module.exports = router;