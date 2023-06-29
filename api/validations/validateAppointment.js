const Doctor = require('../models/doctor.model')
const Appointment = require('../models/appointment.model')

const validateAppointment = async (req, res, next) => {
   if (req.accType !== 'user')
      return next({ status: 401, errors: ['only user can make appointment'] })
   const { doctor: doctorId, date, time } = req.body

   // Check if the doctor is valid
   const doctor = await Doctor.findById(doctorId)
   if (!doctor) return next({ errors: ['doctor not ound'], status: 404 })

   // Check if the date and time are provided
   if (!date || !time)
      return next({ status: 400, errors: ['date and time are required'] })

   // Check if the date and time are not behind the current date and time
   const appointmentDateTime = new Date(`${date}T${time}`)
   if (isNaN(appointmentDateTime) || appointmentDateTime < new Date())
      return next({ status: 400, errors: ['can not make appointment behind '] })

   // Check if the appointment time is between 8:00 a.m. and 5:00 p.m.
   const startTime = new Date(`${date}T08:00`)
   const endTime = new Date(`${date}T17:00`)

   const errors = []

   if (appointmentDateTime < startTime || appointmentDateTime > endTime) {
      errors.push('Appointment time must be between 8:00 a.m. and 5:00 p.m.')
   }

   // Check for overlapping appointments within 30 minutes
   const thirtyMinutesBefore = new Date(
      appointmentDateTime.getTime() - 30 * 60000
   )
   const thirtyMinutesAfter = new Date(
      appointmentDateTime.getTime() + 30 * 60000
   )

   const overlappingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: { $eq: date },
      time: { $gte: thirtyMinutesBefore, $lte: thirtyMinutesAfter },
   })

   if (overlappingAppointment)
      errors.push(
         'Another appointment is already scheduled within 30 minutes of this time'
      )

   if (errors.length) return next({ status: 400, errors })
   req.hospitalId = doctor.hospital
   next()
}

module.exports = validateAppointment
