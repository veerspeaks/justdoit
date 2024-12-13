const express = require('express');
const router = express.Router()


const signinController = require('../controller/signinController')

router.get('/signin',signinController.signin)
router.get('/signup',signinController.signup)
router.post('/signupPost',signinController.signupPost)
router.post('/signinPost',signinController.signinPost)
router.get('/signout',signinController.signout)

module.exports = router