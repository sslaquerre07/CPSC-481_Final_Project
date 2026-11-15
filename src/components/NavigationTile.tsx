import type { ReactNode } from 'react'
import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface NavigationTileProps {
  to: string
  icon: ReactNode
  title: string
  description?: string
}

function NavigationTile({ to, icon, title, description }: NavigationTileProps) {
  return (
    <Card
      sx={{
        aspectRatio: '1.06 / 1',
        border: '1px solid #d5dde7',
        borderRadius: 2.5,
        boxShadow: '0 2px 8px rgba(37, 58, 84, 0.06)',
        bgcolor: 'white',
        transition: 'box-shadow 160ms ease, transform 160ms ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 20px rgba(37, 58, 84, 0.12)',
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={to}
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          p: 2,
          color: '#355375',
          textDecoration: 'none',
        }}
      >
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
          {icon}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Stack>
      </CardActionArea>
    </Card>
  )
}

export default NavigationTile
