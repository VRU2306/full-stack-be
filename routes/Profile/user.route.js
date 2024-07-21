const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Profile/user.controller');
const auth = require('../../middleware/auth');

router.get('/users', auth.verifyToken, userController.getUsers);
router.get('/users/:id', auth.verifyToken, userController.getUserById);

module.exports = router;
