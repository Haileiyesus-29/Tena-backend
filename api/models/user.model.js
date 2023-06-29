const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 30,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         match: /^\S+@\S+\.\S+$/,
         trim: true,
      },
      password: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         default: null,
      },
   },
   { versionKey: false } // Set versionKey option to false
)

const User = mongoose.model('User', userSchema)

module.exports = User
