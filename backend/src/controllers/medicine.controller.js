import Medicine from '../models/Medicine.js'
export const toggleMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' })
    }

    medicine.isActive = !medicine.isActive
    await medicine.save()

    res.json(medicine)
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle medicine' })
  }
}
