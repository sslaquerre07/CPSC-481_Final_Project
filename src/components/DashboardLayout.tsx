import type { ReactNode } from 'react'
import { Box, Container, Typography } from '@mui/material'

interface DashboardLayoutProps {
  title: string
  children: ReactNode
}

function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f9' }}>
      <Container
        component="main"
        maxWidth={false}
        sx={{ px: { xs: 3, sm: 5, md: 7 }, pt: { xs: 4, sm: 5 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: '#202a35', fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
            gap: 2.5,
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            mt: { xs: 7, sm: 12, md: 14 },
            pb: 5,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default DashboardLayout
