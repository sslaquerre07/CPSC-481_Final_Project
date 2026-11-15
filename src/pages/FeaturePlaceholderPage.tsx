import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link, Navigate, useParams } from 'react-router-dom'

function FeaturePlaceholderPage() {
  const { view, section } = useParams()

  if ((view !== 'student' && view !== 'staff') || !section) {
    return <Navigate to="/" replace />
  }

  const title = section
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const homePath = `/${view}`

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f9', pt: { xs: 4, sm: 5 } }}>
      <Container maxWidth="md">
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
    </Box>
  )
}

export default FeaturePlaceholderPage
