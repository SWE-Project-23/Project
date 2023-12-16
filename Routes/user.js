require("dotenv").config();
const express = require("express");
const router = express.Router();
const pages = require("../Controllers/Pages");
const ctrlUsers = require("../Controllers/ctrlUsers");
const ctrlReservations = require("../Controllers/ctrlReservations");
const facebookAPI = require("../Controllers/facebookAPI");



router.get('/', pages.user.myProfile);
router.get('/login', pages.user.login);
router.get('/signup', pages.user.signup);
router.get('/logout', pages.user.logout);
router.get('/payment', pages.guest.payment)
router.post('/booking', pages.guest.booking);
router.post('/register', ctrlUsers.guest.register);
router.post('/login', ctrlUsers.user.login);
router.post('/remove', ctrlUsers.user.removeUser);
router.post('/modify', ctrlUsers.user.modifyUser);
router.post('/modifyBio', ctrlUsers.user.modifyBio);
router.post('/reserve', ctrlReservations.guest.reserve);
router.post('/checkAvailability', ctrlReservations.guest.checkAvailability);
router.post('/validateSignup', ctrlUsers.guest.validateSignup);
router.post('/validateLogin', ctrlUsers.user.validateLogin);
router.get('/auth/facebook', facebookAPI.guest.facebookLogin);
router.post('/confirm', ctrlReservations.guest.confirmReservation)
// Callback URL for handling the Facebook Login response
router.get('/auth/facebook/callback',facebookAPI.guest.facebookLoginCallback);
router.post('/modifyReservation', ctrlReservations.guest.modifyReservationOptions)

router.get('/*', (req, res) => {
    res.redirect('/user')
  });

module.exports = router;
