const express = require('express')
const router = express.Router()
const validateForm = require('../validations/validateForm')
const authenticate = require('../middlewares/authenticate')
const uploadFile = require('../middlewares/uploadFile')
const {
   getAllDoctors,
   getDoctorById,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   deleteDoctorById,
} = require('../controllers/doctor.controller')

/**
 * @route  GET /api/doctors
 * @description Get all doctors
 * @returns {array} - An array of doctors
 */
router.get('/hospital/:hospitalId', getAllDoctors)

/**
 * @route  GET /api/doctors/:id
 * @description Get a single doctor by ID
 * @param  {string} id - The ID of the doctor
 * @returns {object} - The requested doctor
 */
router.get('/:id', getDoctorById)

/**
 * @route  POST /api/doctors
 * @description Create a new doctor
 * @param  {string} name - The name of the doctor
 * @param  {string} email - The email of the doctor
 * @param  {string} specialty - The specialty of the doctor
 * @param  {string} password - The password of the doctor
 * @header  {string} Authorization - Hospital's JWT token
 * @returns {object} - The created doctor and token
 */
router.post('/', uploadFile('image'), validateForm, authenticate, createDoctor)

/**
 * @route  PUT /api/doctors/me
 * @description Update the current doctor's information
 * @param  {string} name - The updated name of the doctor
 * @param  {string} speciality - The updated speciality of the doctor
 * @param  {string} password - The updated password of the doctor
 * @header  {string} Authorization - Doctors's JWT token
 * @returns {object} - Success message indicating the update was successful
 */
router.put('/me', authenticate, uploadFile('image'), updateDoctor)

/**
 * @route  DELETE /api/doctors/:id
 * @description Delete a doctor by ID by a hospital
 * @param  {string} id - The ID of the doctor
 * @header  {string} Authorization - Hospitals's JWT token
 * @returns {number} - Status code 204 indicating successful deletion
 */
router.delete('/:id', authenticate, deleteDoctorById)

/**
 * @route  DELETE /api/doctors/me
 * @description Delete the current doctor's account by himself
 * @header  {string} Authorization - Doctors's JWT token
 * @returns {number} - Status code 204 indicating successful deletion
 */
router.delete('/me', authenticate, deleteDoctor)

module.exports = router
