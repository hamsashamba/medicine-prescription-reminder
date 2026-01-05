import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import api from '../api/api'

export default function EditMedicine({ open, onClose, medicine, onUpdated }) {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [times, setTimes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
  }

  useEffect(() => {
    if (medicine) {
      setName(medicine.name)
      setDosage(medicine.dosage)
      setTimes(medicine.times.join(', '))
      setError('')
    }
  }, [medicine])

  const updateMedicine = async () => {
    setError('')

    // Required field validation
    if (!name.trim()) {
      setError('Medicine name is required')
      return
    }

    if (!dosage.trim()) {
      setError('Dosage is required')
      return
    }

    if (!times.trim()) {
      setError('Please enter at least one reminder time')
      return
    }

    const parsedTimes = times
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    if (parsedTimes.length === 0) {
      setError('Please enter valid reminder times')
      return
    }

    // ⛔ STRICT TIME FORMAT VALIDATION (FIX)
    const invalidTime = parsedTimes.find(t => !isValidTime(t))
    if (invalidTime) {
      setError(`Invalid time format: ${invalidTime} (use HH:MM)`)
      return
    }

    try {
      setLoading(true)

      await api.put(`/medicines/${medicine._id}`, {
        name,
        dosage,
        times: parsedTimes
      })

      onUpdated()
      onClose()
    } catch (err) {
      setError('Failed to update medicine. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background:
            'linear-gradient(135deg, rgba(30,30,30,0.95), rgba(20,20,20,0.9))',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 0.4 }}
        >
          Edit Medicine
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Medicine Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Dosage"
            value={dosage}
            onChange={e => setDosage(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Times (HH:MM)"
            value={times}
            onChange={e => setTimes(e.target.value)}
            helperText="Separate multiple times with commas"
            fullWidth
            required
          />

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="text"
              onClick={onClose}
              sx={{ opacity: 0.8 }}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={updateMedicine}
              disabled={loading}
              sx={{
                px: 3,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
