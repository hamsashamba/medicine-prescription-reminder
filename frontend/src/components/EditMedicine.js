import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Box,
  Typography
} from '@mui/material'
import { useState, useEffect } from 'react'
import api from '../api/api'

export default function EditMedicine({ open, onClose, medicine, onUpdated }) {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [times, setTimes] = useState('')

  useEffect(() => {
    if (medicine) {
      setName(medicine.name)
      setDosage(medicine.dosage)
      setTimes(medicine.times.join(', '))
    }
  }, [medicine])

  const updateMedicine = async () => {
    await api.put(`/medicines/${medicine._id}`, {
      name,
      dosage,
      times: times.split(',').map(t => t.trim())
    })
    onUpdated()
    onClose()
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
            label="Times (HH:MM)"
            value={times}
            onChange={e => setTimes(e.target.value)}
            helperText="Separate multiple times with commas"
            fullWidth
          />

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="text"
              onClick={onClose}
              sx={{ opacity: 0.8 }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={updateMedicine}
              sx={{
                px: 3,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
