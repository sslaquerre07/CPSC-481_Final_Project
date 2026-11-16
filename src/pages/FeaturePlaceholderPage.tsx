import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

interface FeaturePlaceholderPageProps {
  view: 'student' | 'staff'
}

function FeaturePlaceholderPage({ view }: FeaturePlaceholderPageProps) {
  const { section = '' } = useParams()
  const title = section
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const homePath = `/${view}`

  return (
    <Container maxWidth="md" sx={{ pt: { xs: 4, sm: 5 } }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: '#202a35', fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Stack spacing={2} sx={{ mt: 6, alignItems: 'flex-start' }}>
          <Typography color="text.secondary">
            This section is ready for future development.
          </Typography>
          <Button
            component={Link}
            to={homePath}
            startIcon={<ArrowBack />}
            variant="outlined"
          >
            Back to {view} home
          </Button>
        </Stack>
    </Container>
  )
}

export default FeaturePlaceholderPage
