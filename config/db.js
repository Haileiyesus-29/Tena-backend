const mongoose = require('mongoose')
function connectDB(cb) {
   mongoose
      .connect(process.env.DB_URI)
      .then(cb())
      .catch(err => {
         console.trace(err)
      })
}

module.exports = connectDB
