function emailValidator(email) {
   if (!email) return ['email is required']
   const errors = []
   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
   if (!email || !emailRegex.test(email)) {
      errors.push('Invalid email format')
   }
   return errors
}

module.exports = emailValidator
