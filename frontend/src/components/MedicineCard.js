import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Switch,
  Box,
  Stack,
  Divider
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function MedicineCard({ medicine, onDelete, onToggle,onToggleActive,onEdit }) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(12px)',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.15)',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.35)'
        }
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          {/* Medicine Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.3
            }}
          >
            {medicine.name}
          </Typography>

          {/* Dosage */}
          <Typography
            variant="body2"
            sx={{
              opacity: 0.85
            }}
          >
            {medicine.dosage}
          </Typography>

          {/* Time */}
          <Typography
            variant="caption"
            sx={{
              opacity: 0.75
            }}
          >
            ⏰ {medicine.times.join(', ')}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2, opacity: 0.2 }} />

{/* Actions */}
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}
>
  {/* Active / Inactive Toggle */}
  <Switch
    checked={medicine.isActive}
    onChange={() => onToggleActive(medicine._id)}
  />

  <Box>
    {/* Edit */}
    <IconButton
      onClick={() => onEdit(medicine)}
      sx={{
        color: 'primary.main',
        '&:hover': {
          backgroundColor: 'rgba(25,118,210,0.15)'
        }
      }}
    >
      <EditIcon />
    </IconButton>

    {/* Delete */}
    <IconButton
      onClick={() => onDelete(medicine._id)}
      sx={{
        color: 'error.main',
        '&:hover': {
          backgroundColor: 'rgba(211,47,47,0.15)'
        }
      }}
    >
      <DeleteIcon />
    </IconButton>
  </Box>
</Box>

      </CardContent>
    </Card>
  )
}
