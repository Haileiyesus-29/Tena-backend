function passwordValidator(password) {
   const errors = []
   if (!password) return ['password is required']

   if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long')
   }
   const uppercaseRegex = /[A-Z]/
   if (!uppercaseRegex.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
   }

   const lowercaseRegex = /[a-z]/
   if (!lowercaseRegex.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
   }

   const numberRegex = /[0-9]/
   if (!numberRegex.test(password)) {
      errors.push('Password must contain at least one number')
   }

   const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/
   if (!specialCharsRegex.test(password)) {
      errors.push('Password must contain at least one special character')
   }
   return errors
}

module.exports = passwordValidator
