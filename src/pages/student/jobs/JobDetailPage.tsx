import { Box, Container } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { toggleSaved } from '../../../store/jobs/reducer'
import { selectJobById } from '../../../store/jobs/selectors'
import JobDescriptionSection from './JobDescriptionSection'
import JobDetailHeader from './JobDetailHeader'
import PostingDetailsSection from './PostingDetailsSection'

function JobDetailPage() {
  const { jobId } = useParams()
  const job = useAppSelector((state) =>
    jobId ? selectJobById(state, jobId) : undefined,
  )
  const dispatch = useAppDispatch()

  if (!job) {
    return <Navigate to="/student/current-postings" replace />
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        pt: { xs: 2, sm: 3 },
        pb: { xs: 4, sm: 5 },
      }}
    >
      <JobDetailHeader
        job={job}
        onToggleSaved={() => dispatch(toggleSaved(job.id))}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 3fr) minmax(17rem, 1.15fr)',
          },
          gap: 2,
          alignItems: 'stretch',
        }}
      >
        <JobDescriptionSection job={job} />
        <PostingDetailsSection job={job} />
      </Box>
    </Container>
  )
}

export default JobDetailPage
