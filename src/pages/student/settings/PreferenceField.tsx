import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface PreferenceFieldProps {
  label: string
  children: ReactNode
  fullWidth?: boolean
}

function PreferenceField({
  label,
  children,
  fullWidth = false,
}: PreferenceFieldProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '12rem minmax(0, 1fr)',
        },
        alignItems: 'center',
        gap: 1,
        gridColumn: fullWidth ? { xs: 'auto', md: '1 / -1' } : 'auto',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      {children}
    </Box>
  )
}

export default PreferenceField
