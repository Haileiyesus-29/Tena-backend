const path = require('path')
const User = require('../models/user.model')
const Hospital = require('../models/hospital.model')
const Doctor = require('../models/doctor.model')

async function saveProfile(req, res, next) {
   const filename = req?.file?.filename
   const { accType } = req

   if (!filename)
      return next({ status: 400, errors: ['file must be included'] })

   if (accType === 'user') {
      const user = await User.findByIdAndUpdate(req.userId, { image: filename })
      user.password = undefined
      user._doc.accType = 'user'
      return res.status(200).json(user)
   }
   if (accType === 'hospital') {
      const hospital = await Hospital.findByIdAndUpdate(
         req.userId,
         {
            image: filename,
         },
         { new: true }
      )
      hospital.password = undefined
      hospital._doc.accType = 'hospital'
      return res.status(200).json(hospital)
   }
   if (accType === 'doctor') {
      const doctor = await Doctor.findByIdAndUpdate(
         req.userId,
         {
            image: filename,
         },
         { new: true }
      )
      doctor.password = undefined
      doctor._doc.accType = 'doctor'
      return res.status(200).json(doctor)
   }
   return next({ status: 500 })
}
async function sendProfile(req, res, next) {
   const { image } = req.params
   if (!image) return next({ status: 400, errors: ['invalid image'] })
   const filepath = path.join(__basedir, 'uploads', image)

   res.sendFile(filepath)
}

module.exports = { saveProfile, sendProfile }
