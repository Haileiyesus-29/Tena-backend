function nameValidator(name) {
   const errors = []
   if (!name) return ['name is required']
   if (!name || name.length < 3 || name.length > 30) {
      errors.push('Name should be between 3 and 30 characters')
   }
   return errors
}

module.exports = nameValidator
