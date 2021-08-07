const express = require('express');
const user = require('../controllers/userController');
const  verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/users', verifyToken, user.getAllUsers);
router.get('/users/:userId', verifyToken, user.getSingleUser);
router.patch('/editprofile', verifyToken, user.editProfile)

module.exports = router;