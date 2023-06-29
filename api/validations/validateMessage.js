function validateMessage(req, res, next) {
   const { content, media } = req.body
   if (!content && !media)
      return next({ status: 400, errors: ['either text or media is required'] })
   next()
}

module.exports = validateMessage
