const bcrypt = require('bcryptjs')

async function hashPassword(password) {
   const hash = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, hash)
   return hashedPassword
}

module.exports = hashPassword
