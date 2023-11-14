const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlGuests = require('../Controllers/ctrlGuests')
const ctrlReservations = require('../Controllers/ctrlReservations')

router.get('/', pages.guest.myProfile)
router.get('/login', pages.public.login)
router.get('/signup', pages.public.signup)
router.get('/bookings', pages.guest.bookings)
router.post('/register', ctrlGuests.public.register)
router.post('/login', ctrlGuests.public.login)
router.post('/delete', ctrlGuests.admin.deleteGuest)
router.post('/update', ctrlGuests.guest.updateGuest)
router.post('/updateBio', ctrlGuests.guest.updateBio)
router.post('/reserve', ctrlReservations.guest.reserve)
router.post('/checkAvailability', ctrlReservations.guest.checkAvailability)


module.exports = router