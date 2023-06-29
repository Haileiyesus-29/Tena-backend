const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema(
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
      address: {
         type: String,
         required: true,
      },
      contact: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         default: null,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Hospital', hospitalSchema)
