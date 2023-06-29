const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 30,
      },
      speciality: {
         type: String,
         required: true,
      },
      hospital: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
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
         minlength: 8,
         maxlength: 100,
      },
      image: {
         type: String,
         default: null,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Doctor', doctorSchema)
