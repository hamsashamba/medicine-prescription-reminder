import { TextField, Button, Stack, Box, Typography, Alert } from '@mui/material'
import { useState } from 'react'
import api from '../api/api'

export default function AddMedicine({ onAdded }) {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [times, setTimes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
  }

  const addMedicine = async () => {
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

    // STRICT TIME FORMAT VALIDATION (FIX)
    const invalidTime = parsedTimes.find(t => !isValidTime(t))
    if (invalidTime) {
      setError(`Invalid time format: ${invalidTime} (use HH:MM)`)
      return
    }

    try {
      setLoading(true)

      await api.post('/medicines', {
        name,
        dosage,
        times: parsedTimes
      })

      // reset form on success
      setName('')
      setDosage('')
      setTimes('')
      onAdded()
    } catch (err) {
      setError('Failed to add medicine. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          letterSpacing: 0.4
        }}
      >
        Add New Medicine
      </Typography>

      <Stack spacing={2.5}>
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
          label="Times (HH:MM, comma separated)"
          value={times}
          onChange={e => setTimes(e.target.value)}
          helperText="Example: 08:00, 14:00, 21:00"
          fullWidth
          required
        />

        <Button
          variant="contained"
          onClick={addMedicine}
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            letterSpacing: 0.4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 14px 40px rgba(0,0,0,0.45)'
            }
          }}
        >
          {loading ? 'Adding...' : 'Add Medicine'}
        </Button>
      </Stack>
    </Box>
  )
}
