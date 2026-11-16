import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import PortalHeader from './PortalHeader'

type PortalView = 'student' | 'staff'

interface PortalLayoutProps {
  view: PortalView
}

function PortalLayout({ view }: PortalLayoutProps) {
  const { pathname } = useLocation()
  const section = pathname.split('/')[2] ?? ''

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f9' }}>
      <PortalHeader view={view} section={section} />
      <Outlet />
    </Box>
  )
}

export default PortalLayout
