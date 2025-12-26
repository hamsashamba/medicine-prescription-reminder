import dotenv from 'dotenv'
dotenv.config({ path: './.env' })   // 👈 FORCE LOAD

import './jobs/reminder.job.js'
import app from './app.js'
import mongoose from 'mongoose'

console.log('EMAIL:', process.env.EMAIL)
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
