import {
  Grid,
  Typography,
  Stack,
  Box,
  Divider,
  TextField,
  Paper,
  Button,
  IconButton,
  Drawer,
  CircularProgress,
  MenuItem
} from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../api/api'
import MedicineCard from '../components/MedicineCard'
import AddMedicine from '../components/AddMedicine'
import EditMedicine from '../components/EditMedicine'
import { useAuth } from '../context/AuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'


export default function Dashboard() {
  const [medicines, setMedicines] = useState([])
  const [selectedMed, setSelectedMed] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  const { logout } = useAuth()

  const fetchProfile = async () => {
    try {
      setProfileLoading(true)
      const res = await api.get('/auth/me')
      setProfile(res.data)
    } finally {
      setProfileLoading(false)
    }
  }

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

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name
      .toLowerCase()
      .includes(search.toLowerCase())

    if (filter === 'active') return matchesSearch && med.isActive
    if (filter === 'inactive') return matchesSearch && !med.isActive
    return matchesSearch
  })

  return (
    <Stack
      spacing={5}
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(124,77,255,0.18), transparent 60%), linear-gradient(135deg, #0f0f1a, #1a1a40)'
      }}
    >
      {/* HEADER */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, letterSpacing: 0.6 }}
            >
              Your Medicines
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
              Manage prescriptions and reminders
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => {
                setProfileOpen(true)
                fetchProfile()
              }}
              sx={{
                background: 'rgba(124,77,255,0.15)',
                '&:hover': {
                  background: 'rgba(124,77,255,0.25)'
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>

            <Button
              variant="outlined"
              color="error"
              sx={{ borderRadius: 2 }}
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ opacity: 0.15 }} />

      {/* ADD + FILTER */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="flex-start"
      >
        <Box sx={{ flex: 1, maxWidth: 520 }}>
          <AddMedicine onAdded={fetchMeds} />
        </Box>

        <Paper
          elevation={10}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Search & Filter
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Search by medicine name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              fullWidth
            />

           <TextField
  select
  label="Filter medicines"
  value={filter}
  onChange={e => setFilter(e.target.value)}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)',
      borderRadius: 12,
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.15)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(124,77,255,0.5)'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7c4dff',
        boxShadow: '0 0 0 3px rgba(124,77,255,0.25)'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#7c4dff'
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255,255,255,0.6)'
    }
  }}
slotProps={{
  MenuProps: {
    disablePortal: true,
    PaperProps: {
      sx: {
        mt: 1,
        borderRadius: 2,
        maxHeight: 240,
        overflowY: 'auto',
        background:
          'linear-gradient(135deg, rgba(20,20,30,0.98), rgba(10,10,20,0.98))',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
      }
    }
  }
}}

>
  <MenuItem value="all">All Medicines</MenuItem>
  <MenuItem value="active">Active</MenuItem>
  <MenuItem value="inactive">Inactive</MenuItem>
</TextField>

          </Stack>
        </Paper>
      </Stack>

      {/* MEDICINE GRID */}
      <Grid container spacing={3}>
        {filteredMedicines.length === 0 ? (
          <Typography sx={{ opacity: 0.6 }}>
            No medicines found.
          </Typography>
        ) : (
          filteredMedicines.map(med => (
            <Grid item xs={12} sm={6} md={4} key={med._id}>
              <MedicineCard
                medicine={med}
                onDelete={deleteMed}
                onEdit={(medicine) => {
                  setSelectedMed(medicine)
                  setEditOpen(true)
                }}
                onToggleActive={async (id) => {
                  await api.patch(`/medicines/${id}/toggle`)
                  fetchMeds()
                }}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* EDIT */}
      <EditMedicine
        open={editOpen}
        onClose={() => setEditOpen(false)}
        medicine={selectedMed}
        onUpdated={fetchMeds}
      />

      {/* PROFILE DRAWER */}
      <Drawer
        anchor="right"
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      >
        <Box
          sx={{
            width: 320,
            p: 3,
            height: '100%',
            background:
              'linear-gradient(135deg, rgba(20,20,30,0.96), rgba(10,10,20,0.96))'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Profile
          </Typography>

          {profileLoading ? (
            <CircularProgress />
          ) : profile ? (
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Email
                </Typography>
                <Typography>{profile.email}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  User ID
                </Typography>
                <Typography variant="body2">{profile._id}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Account Created
                </Typography>
                <Typography variant="body2">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography color="error">
              Failed to load profile
            </Typography>
          )}
        </Box>
      </Drawer>
    </Stack>
  )
}
