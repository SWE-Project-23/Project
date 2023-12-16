
const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlUsers = require('../Controllers/ctrlUsers')
const ctrlReservations = require('../Controllers/ctrlReservations')
const ctrlRooms = require('../Controllers/ctrlRooms')
const ctrlQuestions = require('../Controllers/ctrlQuestions')
const ctrlOptions = require('../Controllers/ctrlOptions')
const ctrlCharacteristics = require('../Controllers/ctrlCharacteristics')

router.get('/',pages.admin.dashboard)
router.get('/guests',pages.staff.users)
router.get('/rooms',pages.admin.rooms)
router.get('/questions',pages.admin.questions)
router.get('/charecteristics',pages.admin.characteristics)
router.get('/options',pages.admin.options)
router.post('/addCharacteristic', ctrlCharacteristics.admin.addCharacteristic)
router.post('/removeCharacteristic', ctrlCharacteristics.admin.removeCharacteristic)
router.post('/modifyCharacteristic', ctrlCharacteristics.admin.modifyCharacteristic)
router.post('/addRoom', ctrlRooms.admin.addRoom)
router.post('/removeRoom', ctrlRooms.admin.removeRoom)
router.post('/modifyRoom', ctrlRooms.admin.modifyRoom)
router.post('/addOption', ctrlOptions.admin.addOption)
router.post('/removeOption', ctrlOptions.admin.removeOption)
router.post('/modifyOption', ctrlOptions.admin.modifyOption)
router.post('/addUser', ctrlUsers.admin.addUsers)
router.post('/removeUser', ctrlUsers.admin.removeUsers)
router.post('/modifyUser', ctrlUsers.admin.modifyUsers)
router.post('/removeReservation', ctrlReservations.staff.removeReservation)
router.get('/*', (req, res) => {
    res.redirect('/admin')
  });
module.exports = router