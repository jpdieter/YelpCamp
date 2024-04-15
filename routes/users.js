const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')
const { storeReturnTo } = require('../middleware'); //import storeReturnTo function from middleware.js
const users = require('../controllers/users')
// require async to catch any errors. this links to the catchAsync function
const catchAsync = require('../utils/catchAsync')

router.route('/register')
    .get(users.renderRegister)
    .post(users.register)

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout); 

router.route('/resetpassword')
    .get(users.renderresetpassword)
    .post(users.resetpassword)

// router.post('/login',
// // use the storeReturnTo middleware to save the returnTo value from session to res.locals
// storeReturnTo,
// // passport.authenticate logs the user in and clears req.session
// passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login
// // Now we can use res.locals.returnTo to redirect the user after login
// );



module.exports = router;