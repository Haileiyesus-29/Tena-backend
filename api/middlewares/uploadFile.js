const multer = require('multer')

// Multer configuration
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
   },
})

const fileFilter = (req, file, cb) => {
   // Check if the file type is allowed
   const allowedFileTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
   ]
   if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true)
   } else {
      cb(
         new Error(
            'Invalid file type. Only JPEG, JPG, PNG, and GIF files are allowed.'
         )
      )
   }
}

const upload = multer({
   storage: storage,
   fileFilter: fileFilter,
   limits: {
      fileSize: 30 * 1024 * 1024, // 30MB limit
   },
})

// Middleware function for handling file uploads
const uploadFile = fieldName => {
   return (req, res, next) => {
      upload.single(fieldName)(req, res, function (err) {
         if (err instanceof multer.MulterError) {
            // A Multer error occurred (e.g., file size exceeded)
            return next(err)
         } else if (err) {
            // An error occurred that is not related to Multer
            return next(err)
         }
         next()
      })
   }
}

module.exports = uploadFile
