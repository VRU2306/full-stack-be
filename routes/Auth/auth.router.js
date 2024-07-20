const express = require('express');
const router = express.Router();
const { register, googleRegister, login } = require("../../controllers/Auth/auth.controller")

router.post("/register", register)
router.post("/google-register", googleRegister)
router.post("/login", login)
module.exports = router;