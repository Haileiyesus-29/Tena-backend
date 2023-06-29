const jwt = require('jsonwebtoken')
const findAccount = require('../helpers/findAccount')

async function authenticate(req, res, next) {
   const { jwt: token } = req.cookies
   const decoded = await jwt.verify(
      token,
      process.env.JWT_TOKEN_KEY,
      (err, data) => {
         if (err) return
         return data
      }
   )
   if (!decoded?.id) return next({ status: 400, errors: ['invalid token'] })
   const { account, accType } = await findAccount({ _id: decoded.id })

   if (!accType || !account)
      return next({ status: 404, errors: ['account does not exit'] })
   req.userId = account?.id
   req.accType = accType
   next()
}

module.exports = authenticate
