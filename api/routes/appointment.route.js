const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const validateAppointment = require('../validations/validateAppointment')
const makePayment = require('../middlewares/makePayment')
const {
   createAppointment,
   getAllAppointments,
   getAppointmentById,
   deleteAppointmentById,
} = require('../controllers/appointment.controller')

/**
 * @route  POST /api/appointments
 * @description Create a new appointment
 * @param  {string} doctor - The ID of the doctor
 * @param  {string} date - The date of the appointment (YYYY-MM-DD)
 * @param  {string} time - The time of the appointment
 * @param  {number} amount - The payment amount
 * @header  {string} Authorization - User's JWT token
 * @returns {object} - The created appointment
 */
router.post(
   '/',
   authenticate,
   validateAppointment,
   makePayment,
   createAppointment
)

/**
 * @route  GET /api/appointments
 * @description Get all appointments
 * @header  {string} Authorization - User's JWT token
 * @returns {array} - An array of appointments
 */
router.get('/', authenticate, getAllAppointments)

/**
 * @route  GET /api/appointments/:id
 * @description Get appointment by ID
 * @param  {string} id - The ID of the appointment
 * @header  {string} Authorization - User's JWT token
 * @returns {object} - The requested appointment
 */
router.get('/:id', authenticate, getAppointmentById)

/**
 * @route  DELETE /api/appointments/:id
 * @description Delete appointment by ID
 * @param  {string} id - The ID of the appointment
 * @header  {string} Authorization - User's JWT token
 * @returns {object} - Success message indicating the appointment is deleted
 */
router.delete('/:id', authenticate, deleteAppointmentById)

module.exports = router
