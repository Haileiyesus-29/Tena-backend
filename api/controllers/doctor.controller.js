const Doctor = require('../models/doctor.model')
const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')
const findAccount = require('../helpers/findAccount')

// Get all doctors
async function getAllDoctors(req, res, next) {
   const skip = req.query?.skip || 0
   const limit = req.query?.limit || 10

   const hospitalId = req.params?.hospitalId
   const { account } = await findAccount({ _id: hospitalId })
   if (!account)
      return next({ status: 404, errors: ['hospital does not exist '] })

   const doctors = await Doctor.find({
      hospital: hospitalId,
   })
      .select('-password')
      .skip(skip)
      .limit(limit)
   res.status(200).json(doctors)
}

// Get a single doctor by ID
async function getDoctorById(req, res, next) {
   const { id } = req.params
   try {
      const doctor = await Doctor.findById(id).select('-password')
      if (!doctor)
         return next({ status: 404, errors: ['account does not exist'] })
      res.status(200).json(doctor)
   } catch {
      return next({ status: 400, errors: ['invalid id'] })
   }
}

// Create a new doctor
async function createDoctor(req, res, next) {
   const { name, email, speciality, password } = req.body
   if (!speciality)
      return next({ status: 400, errors: ['speciality is required'] })

   const hashedPassword = await hashPassword(password)
   if (!hashedPassword) return next({ status: 500 })
   const image = req.file && req.file.filename

   const doctor = new Doctor({
      name,
      email,
      speciality,
      password: hashedPassword,
      hospital: req.userId,
      image,
   })
   const createdDoctor = await doctor.save()
   if (!createdDoctor) return next({ status: 500 })
   const token = await generateToken({ id: doctor._id })
   createdDoctor.password = undefined

   res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
   })

   createdDoctor._doc.accType = 'doctor'
   res.status(201).json(createdDoctor)
}

// Update a doctor by ID
async function updateDoctor(req, res, next) {
   const { name, password, speciality } = req.body

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
   if (name) update.name = name
   if (speciality) update.speciality = speciality

   const errors = [...nameErrors, ...passwordErrors]
   if (errors.length > 0) return next({ errors, status: 400 })

   const doctor = await Doctor.findByIdAndUpdate(req.userId, update)
   if (!doctor) return next({ status: 404, errors: ['account does not exist'] })
   doctor.password = undefined
   doctor._doc.accType = 'doctor'
   res.status(201).json(doctor)
}

// Delete own doctor account
async function deleteDoctor(req, res, next) {
   const doctor = await Doctor.findByIdAndDelete(req.userId)
   if (!doctor) return next({ status: 500 })
   res.sendStatus(204)
}

// Delete doctor account for hospital
async function deleteDoctorById(req, res, next) {
   if (req.accType !== 'hospital')
      return next({ status: 403, errors: ['can not delete another account'] })

   const { id } = req.params

   const doctor = await Doctor.findOneAndDelete({
      hospital: req.userId,
      _id: id,
   })
   if (!doctor)
      return next({
         status: 403,
         errors: ['can not delete account of non employee'],
      })
   res.sendStatus(204)
}

module.exports = {
   getAllDoctors,
   getDoctorById,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   deleteDoctorById,
}
