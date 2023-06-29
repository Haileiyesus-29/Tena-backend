function errorHandler(err, req, res, next) {
   const { errors, status } = err
   switch (status) {
      case 400:
         return res.status(status).json({ message: 'Bad Request', errors })
      case 401:
         return res.status(status).json({ message: 'Unauthorized', errors })
      case 403:
         return res.status(status).json({ message: 'Forbidden', errors })
      case 404:
         return res.status(status).json({ message: 'Not Found', errors })
      case 500:
         return res
            .status(status)
            .json({ message: 'Internal Server Failure', errors })
      default:
         return next(err)
   }
}

function internalErrorsHanlder(err, req, res, next) {
   console.trace(err)
   if (err.name === 'CastError')
      return res
         .status(400)
         .json({ message: 'Bad Request', errors: ['invalid id'] })
   res.status(500).json(err)
}

module.exports = { errorHandler, internalErrorsHanlder }
