import { Link } from 'react-router-dom'
import { TextField, Button, Typography, Stack, Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import api from '../api/api'
import {useAuth} from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {login}=useAuth()

const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { email, password })
    login(res.data.token)
    navigate('/dashboard')
  } catch (err) {
    alert('Login failed')
  }
}

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        background:
          'radial-gradient(circle at top, rgba(124,77,255,0.25), transparent 60%), linear-gradient(135deg, #0f0f1a, #1a1a40)'
      }}
    >
      <GlassCard>
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.6
            }}
          >
            Medicine Prescription Reminder
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.75, mt: 0.5 }}
          >
            Sign in to manage your medicines
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              letterSpacing: 0.4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              transition: 'all 0.25s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.5)'
              }
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 3, opacity: 0.85 }}
        >
          New here?{' '}
          <Link
            to="/register"
            style={{
              color: '#7c4dff',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Create an account
          </Link>
        </Typography>
      </GlassCard>
    </Stack>
  )
}
