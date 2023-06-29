const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/generateToken')
const findAccount = require('../helpers/findAccount')

async function validateAccount(req, res, next) {
   const { email, password } = req.body

   // Check if email and password are provided
   if (!email || !password)
      return next({ status: 400, errors: ['Email and password are required'] })

   const { account, accType } = await findAccount({ email })
   if (!account)
      return next({ status: 400, errors: ['invalid email or password'] })

   const hasCorrectCredential = await bcrypt.compare(password, account.password)
   if (!hasCorrectCredential)
      return next({ status: 400, errors: ['invalid email or password'] })
   account.password = undefined

   const token = await generateToken({ id: account._id })
   res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
   })

   account._doc.accType = accType
   res.status(200).json(account)
}

module.exports = validateAccount
