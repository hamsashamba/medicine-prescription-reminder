import { TextField, Button, Stack, Box, Typography } from '@mui/material'
import { useState } from 'react'
import api from '../api/api'

export default function AddMedicine({ onAdded }) {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [times, setTimes] = useState('')

  const addMedicine = async () => {
    await api.post('/medicines', {
      name,
      dosage,
      times: times.split(',').map(t => t.trim())
    })
    setName('')
    setDosage('')
    setTimes('')
    onAdded()
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
        <TextField
          label="Medicine Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Dosage"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          fullWidth
        />

        <TextField
          label="Times (HH:MM, comma separated)"
          value={times}
          onChange={e => setTimes(e.target.value)}
          helperText="Example: 08:00, 14:00, 21:00"
          fullWidth
        />

        <Button
          variant="contained"
          onClick={addMedicine}
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
          Add Medicine
        </Button>
      </Stack>
    </Box>
  )
}
