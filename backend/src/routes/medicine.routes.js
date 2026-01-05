import express from 'express'
import Medicine from '../models/Medicine.js'
import authMiddleware from '../middleware/auth.middleware.js'
import {
  toggleMedicine
} from '../controllers/medicine.controller.js'

const router = express.Router()

// Add medicine
router.post('/', authMiddleware, async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      userId: req.user.id
    })
    res.status(201).json(medicine)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.patch('/:id/toggle', authMiddleware, toggleMedicine)

// Get user's medicines
router.get('/', authMiddleware, async (req, res) => {
  const medicines = await Medicine.find({ userId: req.user.id })
  res.json(medicines)
})
// Update medicine
router.put('/:id', authMiddleware, async (req, res) => {
  await Medicine.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

// Delete medicine
router.delete('/:id', authMiddleware, async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})


export default router
