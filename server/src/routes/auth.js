// определяем router
const express = require("express");
const router = express.Router();
// controllers
const controllers = require('../controllers/authRouter')
// библиотеки
const { body } = require('express-validator')

router.post('/registration',
   body('username').notEmpty().trim(),
   body('email').isEmail(),
   body('password').isLength({ min: 3, max: 32 }), controllers.registration)
router.post('/login', controllers.login)
router.post('/logout', controllers.logout)
router.get('/refresh', controllers.refresh)

module.exports = router 