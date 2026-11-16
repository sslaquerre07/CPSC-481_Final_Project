import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

type PortalView = 'student' | 'staff'

interface PortalHeaderProps {
  view: PortalView
  section: string
}

const navigationByView = {
  student: {
    title: 'Career Search',
    links: [
      { label: 'Postings', section: 'current-postings' },
      { label: 'Applications', section: 'current-applications' },
      { label: 'Issue Reports', section: 'issue-reports' },
      { label: 'Settings', section: 'settings' },
    ],
  },
  staff: {
    title: 'Career Centre: Admin View',
    links: [
      { label: 'Drafts', section: 'drafts' },
      { label: 'Published', section: 'published-postings' },
      { label: 'Reports', section: 'student-reports' },
    ],
  },
} satisfies Record<
  PortalView,
  { title: string; links: { label: string; section: string }[] }
>

function PortalHeader({ view, section }: PortalHeaderProps) {
  const { title, links } = navigationByView[view]

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        minHeight: 64,
        px: { xs: 2.5, sm: 4, md: 6 },
        bgcolor: 'common.white',
        borderBottom: '1px solid #e1e5eb',
      }}
    >
      <Box
        component="div"
        sx={{
          color: '#304d72',
          fontSize: { xs: '1rem', sm: '1.2rem' },
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Box>
      <Box
        component="nav"
        aria-label={`${view} navigation`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          columnGap: { xs: 0.5, sm: 2 },
        }}
      >
        {links.map(({ label, section: targetSection }) => {
          const isActive = section === targetSection

          return (
            <Button
              key={targetSection}
              component={Link}
              to={`/${view}/${targetSection}`}
              aria-current={isActive ? 'page' : undefined}
              sx={{
                minWidth: 0,
                px: { xs: 0.75, sm: 1.5 },
                py: 1.25,
                borderRadius: 0,
                borderBottom: '2px solid',
                borderColor: isActive ? '#304d72' : 'transparent',
                color: isActive ? '#304d72' : '#596579',
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                fontWeight: 700,
                letterSpacing: '0.1em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#304d72',
                },
              }}
            >
              {label}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default PortalHeader
