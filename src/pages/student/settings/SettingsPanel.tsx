import type { ReactNode } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface SettingsPanelProps {
  title: string
  maxHeight: string
  description?: string
  children: ReactNode
}

function SettingsPanel({
  title,
  maxHeight,
  description,
  children,
}: SettingsPanelProps) {
  return (
    <Card
      component="section"
      variant="outlined"
      sx={{
        maxHeight,
        overflowY: 'auto',
        borderColor: '#d5dde7',
        borderRadius: 1.5,
        bgcolor: 'common.white',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: 2 } }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 1.5 }}
          >
            {description}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

export default SettingsPanel
