const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      hospital: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      method: {
         type: String,
         default: 'telebirr',
      },
   },
   { versionKey: false, timestamps: true }
)

module.exports = mongoose.model('Payment', paymentSchema)
