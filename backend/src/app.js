import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import medicineRoutes from './routes/medicine.routes.js'

app.use(cors({
  origin: [
    'http://localhost:3000'
  ],
  credentials: true
}))


app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/medicines', medicineRoutes)

export default app
