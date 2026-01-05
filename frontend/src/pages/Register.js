import { TextField, Button, Typography, Stack, Box, Alert } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import api from '../api/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async () => {
    setError('')

    // ✅ Client-side validation
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password.trim()) {
      setError('Password is required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)

      await api.post('/auth/register', { email, password })
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
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
            Create Account
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.75, mt: 0.5 }}
          >
            Start managing your medicines effortlessly
          </Typography>
        </Box>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            helperText="Minimum 6 characters"
            required
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={loading}
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
            onClick={handleRegister}
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </Stack>
      </GlassCard>
    </Stack>
  )
}
