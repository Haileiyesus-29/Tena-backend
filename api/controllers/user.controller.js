const User = require('../models/user.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all users
async function getAllUsers(req, res, next) {
   let skip = req.query.skip || 0
   let limit = req.query.limit || 10
   const users = await User.find()
      .select('email name image')
      .skip(skip)
      .limit(limit)
   res.status(200).json(users)
}

// Create a new user
async function createUser(req, res, next) {
   const { name, email, password } = req.body
   const image = req.file && req.file.filename
   const hashedPassword = await hashPassword(password)
   if (!hashedPassword) return next({ status: 500 })
   const user = new User({
      name,
      email,
      image,
      password: hashedPassword,
   })
   const createdUser = await user.save()
   if (!createdUser) return next({ status: 500 })
   createdUser.password = undefined

   const token = await generateToken({ id: user._id })
   if (!token) return next({ status: 500 })

   res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
   })

   createdUser._doc.accType = 'user'
   res.status(201).json(createdUser)
}

// Get user details
async function getUser(req, res, next) {
   const userId = req.params.userId
   const user = await User.findById(userId).select('email name image')

   if (!user) return next({ status: 404, errors: ['user does not exist'] })
   res.status(200).json(user)
}

// Update user information
async function updateUser(req, res, next) {
   const { name, password } = req.body
   const update = {}
   let nameErrors = []
   let passwordErrors = []

   if (password) {
      passwordErrors = passwordValidator(password)
      update.password = await hashPassword(password)
   }
   if (name) {
      nameErrors = nameValidator(name)
      update.name = name
   }

   const errors = [...nameErrors, ...passwordErrors]
   if (errors.length > 0) return next({ errors, status: 400 })

   if (req.file) {
      update.image = req.file.filename
   }

   const updatedUser = await User.findByIdAndUpdate(req.userId, update, {
      new: true,
   }).select('-password')
   if (!updatedUser) return next({ status: 500 })
   updatedUser.password = undefined
   updatedUser._doc.accType = 'user'
   res.status(201).json(updatedUser)
}

// Delete a user
async function deleteUser(req, res, next) {
   const deletedUser = await User.findByIdAndDelete(req.userId).select(
      '-password'
   )
   if (!deletedUser) return next({ status: 500 })
   res.sendStatus(204)
}

module.exports = {
   getAllUsers,
   createUser,
   getUser,
   updateUser,
   deleteUser,
}
