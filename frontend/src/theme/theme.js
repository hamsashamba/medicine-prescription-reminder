import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
      light: '#9a73ff',
      dark: '#5f35d4'
    },
    background: {
      default: '#0f0f1a',
      paper: 'rgba(255,255,255,0.08)'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)'
    }
  },

  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '0.6px'
    },
    h4: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.4px'
    }
  },

  shape: {
    borderRadius: 14
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          transition: 'all 0.25s ease'
        },
        containedPrimary: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 14px 40px rgba(0,0,0,0.5)'
          }
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.12)'
        }
      }
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.05)'
          }
        }
      }
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          backdropFilter: 'blur(18px)'
        }
      }
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.12)'
        }
      }
    }
  }
})

export default theme
