const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
      },
      content: {
         type: String,
      },
      media: {
         type: String,
         default: null,
      },
   },
   { versionKey: false, timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
