import { Box } from '@mui/material'

export default function GlassCard({ children }) {
  return (
    <Box
      sx={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))',
        borderRadius: '20px',
        padding: 4,
        width: '100%',
        maxWidth: 400,
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top left, rgba(255,255,255,0.25), transparent 60%)',
          opacity: 0.6,
          pointerEvents: 'none'
        },

        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 55px rgba(0,0,0,0.45)'
        }
      }}
    >
      {children}
    </Box>
  )
}
