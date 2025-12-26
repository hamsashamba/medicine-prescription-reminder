import { Grid, Typography, Stack, Box, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../api/api'
import MedicineCard from '../components/MedicineCard'
import AddMedicine from '../components/AddMedicine'
import EditMedicine from '../components/EditMedicine'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function Dashboard() {
  const [medicines, setMedicines] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const {logout}=useAuth()

  const fetchMeds = async () => {
    const res = await api.get('/medicines')
    setMedicines(res.data)
  }

  useEffect(() => {
    fetchMeds()
  }, [])

  const deleteMed = async (id) => {
    await api.delete(`/medicines/${id}`)
    fetchMeds()
  }

  return (
    <Stack
      spacing={5}
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 60%)'
      }}
    >
      {/* Header */}
      <Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.6,
            mb: 0.5
          }}
        >
          Your Medicines
        </Typography>
        <Button variant='outlined' color='error' onClick={logout}>Logout</Button>
</Stack>
        <Typography
          variant="body1"
          sx={{ opacity: 0.75 }}
        >
          Manage your daily medication schedule
        </Typography>
      </Box>

      <Divider sx={{ opacity: 0.2 }} />

      {/* Add Medicine Section */}
      <Box
        sx={{
          maxWidth: 500
        }}
      >
        <AddMedicine onAdded={fetchMeds} />
      </Box>

      {/* Medicine Grid */}
      <Grid container spacing={3}>
        {medicines.map(med => (
          <Grid item xs={12} sm={6} md={4} key={med._id}>
            <MedicineCard
              medicine={med}
              onDelete={deleteMed}
              onToggle={() => {
                setSelectedMed(med)
                setEditOpen(true)
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <EditMedicine
        open={editOpen}
        onClose={() => setEditOpen(false)}
        medicine={selectedMed}
        onUpdated={fetchMeds}
      />
    </Stack>
  )
}
