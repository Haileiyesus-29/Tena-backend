const Message = require('../models/message.model')
const User = require('../models/user.model')
const Doctor = require('../models/doctor.model')

const getAllMessages = async (req, res, next) => {
   const skip = +req.query?.skip || 0
   const limit = +req.query?.limit || 5

   const messages = await Message.find({
      $or: [{ sender: req.userId }, { receiver: req.userId }],
   })
   const accounts = messages.map(message =>
      message.sender == req.userId
         ? message.receiver.toString()
         : message.sender.toString()
   )
   let response
   req.accType === 'doctor'
      ? (response = await User.find({
           _id: { $in: [...new Set(accounts)] },
        }).select('-password'))
      : (response = await Doctor.find({
           _id: { $in: [...new Set(accounts)] },
        }).select('-password'))
   res.status(200).json(response)
}

// GET all message thread with user
const getMessageThread = async (req, res, next) => {
   const skip = req.query.skip || 0
   const limit = req.query.limit || 10

   const chatHistory = await Message.find({
      $or: [
         { sender: req.userId, receiver: req.params?.receiverId },
         { sender: req.params?.receiverId, receiver: req.userId },
      ],
   })
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(limit)

   if (!chatHistory)
      return next({ status: 404, errors: ['messages not found'] })
   res.status(200).json(chatHistory)
}

// POST a new message
const createMessage = async (req, res, next) => {
   const requests = [
      User.findById(req.params.receiverId),
      Doctor.findById(req.params.receiverId),
   ]

   const data = await Promise.all(requests)
   const receiver = data[0]?._id || data[1]?._id
   if (!receiver)
      return next({ status: 404, errors: ['message receiver not found'] })
   const media = req.file && req.file.filename
   const message = new Message({
      sender: req.userId,
      receiver,
      media,
      content: req.body.content,
   })
   await message.save()
   if (!message) return next({ status: 500 })
   res.status(201).json(message)
}

module.exports = {
   getAllMessages,
   createMessage,
   getMessageThread,
}
