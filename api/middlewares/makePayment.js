const Payment = require('../models/payment.model')

async function makePayment(req, res, next) {
   const { amount, method } = req.body
   if (!amount) return next({ status: 400, errors: ['amount is required'] })

   const payment = new Payment({
      amount,
      method,
      user: req.userId,
      hospital: req.hospitalId,
   })
   createdPayment = await payment.save()
   if (!createdPayment) return next({ status: 500 })
   req.paymentId = createdPayment._id
   next()
}

module.exports = makePayment
