require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = require('./config/db')
const {
   errorHandler,
   internalErrorsHanlder,
} = require('./api/middlewares/errorHandler')

const app = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
)
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
   res.setHeader('Access-Control-Allow-Credentials', 'true')
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   )
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
   next()
})

const userRoutes = require('./api/routes/user.route')
const hospitalRoutes = require('./api/routes/hospital.route')
const doctorRoutes = require('./api/routes/doctor.route')
const appointmentRoutes = require('./api/routes/appointment.route')
const paymentRoutes = require('./api/routes/payment.route')
const messageRoutes = require('./api/routes/message.route')
const loginRoute = require('./api/routes/login.route')

app.use('/api/users', userRoutes)
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/login', loginRoute)
app.get('/api/logout', (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
   })
   res.status(200).json({ message: 'Logged out successfully' })
})

app.use(errorHandler)
app.use(internalErrorsHanlder)

connectDB(() => {
   app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT} 🚀`)
   )
})
