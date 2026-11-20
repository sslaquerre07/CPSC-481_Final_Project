import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import type { Job } from '../../../store/jobs/types'

interface DetailItemProps {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}

interface PostingDetailsSectionProps {
  job: Job
}

function PostingDetailsSection({ job }: PostingDetailsSectionProps) {
  return (
    <Card
      variant="outlined"
      sx={{ borderColor: '#d5dde7', borderRadius: 1.5, bgcolor: 'white' }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{ mb: 1.5, color: '#202a35', fontWeight: 700 }}
        >
          Posting details
        </Typography>
        <Stack spacing={1.5}>
          <DetailItem label="Salary" value={`$${job.minimumPay}/hr`} />
          <DetailItem
            label="Eligible years"
            value={`${job.yearOfStudy} year`}
          />
          <DetailItem label="Eligible programs" value={job.program} />
          <DetailItem
            label="Visa requirement"
            value={job.requiresWorkPermit ? 'Required' : 'Any'}
          />
        </Stack>
        <Divider sx={{ my: 1.75, borderColor: '#e1e5eb' }} />
        <Stack spacing={1.5}>
          <DetailItem
            label="Application method"
            value={job.quickApply ? 'Quick Apply' : 'Employer site'}
          />
          <DetailItem
            label="Required documents"
            value={job.requiredDocuments.join(' and ')}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PostingDetailsSection
