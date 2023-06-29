const express = require('express')
const router = express.Router()
const validateAccount = require('../validations/validateAccount')
/**
 * @route  POST /api/login
 * @description Login to an account
 * @param  {string} email - The email of the account
 * @param  {string} password - The password of the account
 */
router.post('/', validateAccount)

module.exports = router
