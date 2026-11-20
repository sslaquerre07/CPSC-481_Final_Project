import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { Job } from '../../../store/jobs/types'

interface QuickApplyJobSummaryProps {
  job: Job
}

function QuickApplyJobSummary({ job }: QuickApplyJobSummaryProps) {
  return (
    <Card
      variant="outlined"
      sx={{ borderColor: '#d5dde7', borderRadius: 1.5, bgcolor: 'white' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { pb: { xs: 1.5, sm: 2 } },
        }}
      >
        <Stack spacing={0.25}>
          <Typography variant="h6" sx={{ color: '#202a35', fontWeight: 700 }}>
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.company} &nbsp;|&nbsp; {job.location}
          </Typography>
        </Stack>
        <Chip
          label={job.type}
          size="small"
          variant="outlined"
          sx={{
            color: '#49698f',
            borderColor: '#b8c8dc',
            bgcolor: '#edf2f8',
          }}
        />
      </CardContent>
    </Card>
  )
}

export default QuickApplyJobSummary
