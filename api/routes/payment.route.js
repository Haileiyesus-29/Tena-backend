const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {
   getAllPayments,
   getPaymentById,
} = require('../controllers/payment.controller')

/**
 * @route  GET /api/payments
 * @description Get all payments
 * @authentication Bearer Token
 * @returns {object[]} payments - Array of payment objects
 * @returns {string} payments.id - The ID of the payment
 * @returns {string} payments.timestamp - The timestamp of the payment
 * @returns {string} payments.user - The name of the user associated with the payment
 * @returns {string} payments.hospital - The name of the hospital associated with the payment
 */
router.get('/', authenticate, getAllPayments)

/**
 * @route  GET /api/payments/:id
 * @description Get a payment by ID
 * @authentication Bearer Token
 * @param  {string} id - The ID of the payment
 * @returns {object} payment - The payment object
 * @returns {string} payment.id - The ID of the payment
 * @returns {number} payment.amount - The amount of the payment
 * @returns {string} payment.method - The method of the payment
 * @returns {string} payment.timestamp - The timestamp of the payment
 * @returns {string} payment.hospital_id - The ID of the hospital associated with the payment
 * @returns {string} payment.hospital - The name of the hospital associated with the payment
 * @returns {string} payment.user_id - The ID of the user associated with the payment
 * @returns {string} payment.user - The name of the user associated with the payment
 */
router.get('/:id', authenticate, getPaymentById)

module.exports = router
