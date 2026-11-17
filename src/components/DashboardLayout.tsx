import { Children } from 'react'
import type { ReactNode } from 'react'
import { Box, Container, Typography } from '@mui/material'

interface DashboardLayoutProps {
  title: string
  children: ReactNode
}

function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const tiles = Children.toArray(children)
  const tileCount = tiles.length
  const compactColumnCount = Math.min(tileCount, 2)

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: '#f4f6f9' }}>
      <Container
        component="main"
        maxWidth={false}
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          px: { xs: 3, sm: 5, md: 7 },
          pt: { xs: 3, sm: 4 },
          pb: { xs: 3, sm: 4 },
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: '#202a35', fontWeight: 700, flexShrink: 0 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(${compactColumnCount}, minmax(0, 1fr))`,
              md: `repeat(${tileCount}, minmax(0, 1fr))`,
            },
            gridTemplateRows: {
              xs: `repeat(${Math.ceil(tileCount / compactColumnCount)}, minmax(0, 1fr))`,
              md: 'minmax(0, 1fr)',
            },
            alignItems: 'center',
            justifyItems: 'center',
            flex: 1,
            minHeight: 0,
            gap: { xs: 1.5, sm: 2.5 },
            width: '100%',
            mt: { xs: 3, sm: 4 },
          }}
        >
          {tiles.map((tile, index) => (
            <Box
              key={index}
              sx={{
                containerType: 'size',
                display: 'grid',
                placeItems: 'center',
                width: '100%',
                height: '100%',
                minWidth: 0,
                minHeight: 0,
              }}
            >
              {tile}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default DashboardLayout
