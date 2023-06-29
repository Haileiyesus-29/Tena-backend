const express = require('express')
const router = express.Router()
const validateForm = require('../validations/validateForm')
const authenticate = require('../middlewares/authenticate')
const uploadFile = require('../middlewares/uploadFile')
const {
   createUser,
   getUser,
   updateUser,
   deleteUser,
   getAllUsers,
} = require('../controllers/user.controller')

/**
 * @route  GET /api/users
 * @description Get all users
 */
router.get('/', getAllUsers)

/**
 * @route  POST /api/users
 * @description Create a new user
 * @param  {string} name - The name of the user
 * @param  {string} email - The email of the user
 * @param  {string} password - The password of the user
 * @param  {string} image - The image of the user
 */
router.post('/', uploadFile('image'), validateForm, createUser)

/**
 * @route  GET /api/users/:userId
 * @description Get user details
 * @param  {string} userId - The ID of the user
 */
router.get('/:userId', getUser)

/**
 * @route  PUT /api/users/me
 * @description Update user information
 * @param  {string} name - The name of the user
 * @param  {string} password - The password of the user
 * @param  {string} image - The image of the user
 * @header  {string} Authorization - User's JWT token
 */
router.put('/me', authenticate, uploadFile('image'), updateUser)

/**
 * @route  DELETE /api/users/me
 * @description Delete user account
 * @header  {string} Authorization - User's JWT token
 */
router.delete('/me', authenticate, deleteUser)

module.exports = router
