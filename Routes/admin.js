
const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlGuests = require('../Controllers/ctrlGuests')
const ctrlReservations = require('../Controllers/ctrlReservations')
const ctrlRooms = require('../Controllers/ctrlRooms')
const ctrlQuestions = require('../Controllers/ctrlQuestions')
const ctrlOptions = require('../Controllers/ctrlOptions')
const ctrlCharacteristics = require('../Controllers/ctrlCharacteristics')

router.get('/',pages.admin.dashboard)
router.post('/addCharacteristic', ctrlCharacteristics.admin.addCharacteristic)
router.post('/removeCharacteristic', ctrlCharacteristics.admin.removeCharacteristic)
router.post('/modifyCharacteristic', ctrlCharacteristics.admin.modifyCharacteristic)
router.post('/addRoom', ctrlRooms.admin.addRoom)
router.post('/removeRoom', ctrlRooms.admin.removeRoom)
router.post('/modifyRoom', ctrlRooms.admin.modifyRoom)
router.post('/addOption', ctrlOptions.admin.addOption)
router.post('/removeOption', ctrlOptions.admin.removeOption)
router.post('/modifyOption', ctrlOptions.admin.modifyOption)
module.exports = router