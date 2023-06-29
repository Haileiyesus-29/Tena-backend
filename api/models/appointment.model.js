const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      doctor: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
      },
      hospital: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
      },
      bill: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Payment',
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      time: {
         type: String,
         required: true,
      },
      payment: {
         type:Boolean,
         default: false,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Appointment', appointmentSchema)
