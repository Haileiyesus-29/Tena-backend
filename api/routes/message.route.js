const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const uploadFile = require('../middlewares/uploadFile')
const {
   getAllMessages,
   createMessage,
   getMessageThread,
} = require('../controllers/message.controller')
const validateMessage = require('../validations/validateMessage')

/**
 * @route  GET /api/messages/:receiverId
 * @description Get message thread with a specific receiver
 * @param  {string} receiverId - The ID of the message receiver
 * @header  {string} Authorization - User's JWT token
 */
router.get('/:receiverId', authenticate, getMessageThread)

/**
 * @route  GET /api/messages
 * @description Get all messages
 * @header  {string} Authorization - User's JWT token
 */
router.get('/', authenticate, getAllMessages)

/**
 * @route  POST /api/messages/:receiverId
 * @description Create a new message
 * @param  {string} receiverId - The ID of the message receiver
 * @param  {string} content - The content of the message
 * @param  {file} file - The image or video file (optional)
 * @header  {string} Authorization - User's JWT token
 */
router.post(
   '/:receiverId',
   authenticate,
   validateMessage,
   uploadFile(['image', 'video']),
   createMessage
)

module.exports = router
