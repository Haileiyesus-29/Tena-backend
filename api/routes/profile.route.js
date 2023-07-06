const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const {
   saveProfile,
   sendProfile,
} = require('../controllers/profile.controller')
const uploadFile = require('../middlewares/uploadFile')

router.put('/', authenticate, uploadFile('image'), saveProfile)
router.get('/:image', sendProfile)

module.exports = router
