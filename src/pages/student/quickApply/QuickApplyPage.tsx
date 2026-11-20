import { Container, Stack, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectJobById } from '../../../store/jobs/selectors'
import { selectUser } from '../../../store/user/selectors'
import QuickApplyActions from './QuickApplyActions'
import QuickApplyJobSummary from './QuickApplyJobSummary'
import RequiredDocumentsSection from './RequiredDocumentsSection'

function QuickApplyPage() {
  const { jobId } = useParams()
  const job = useAppSelector((state) =>
    jobId ? selectJobById(state, jobId) : undefined,
  )
  const { documents } = useAppSelector(selectUser)

  if (!job || !job.quickApply) {
    return <Navigate to="/student/current-postings" replace />
  }

  const canApply = job.requiredDocuments.every((title) =>
    documents.some(
      (document) =>
        document.file_title === title && document.file_name.trim() !== '',
    ),
  )
  const uploadedCount = job.requiredDocuments.filter((title) =>
    documents.some(
      (document) =>
        document.file_title === title && document.file_name.trim() !== '',
    ),
  ).length
  const missingCount = job.requiredDocuments.length - uploadedCount

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        pt: { xs: 2, sm: 3 },
        pb: { xs: 4, sm: 5 },
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 0.5, color: '#202a35', fontWeight: 700 }}
      >
        Quick Apply
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Review your required documents before submitting your application.
      </Typography>
      <Stack spacing={2}>
        <QuickApplyJobSummary job={job} />
        <RequiredDocumentsSection job={job} />
        <QuickApplyActions
          postingPath={`/student/current-postings/${job.id}`}
          canApply={canApply}
          missingCount={missingCount}
        />
      </Stack>
    </Container>
  )
}

export default QuickApplyPage
