import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import type { Job } from '../../../store/jobs/types'

interface JobDescriptionSectionProps {
  job: Job
}

function JobDescriptionSection({ job }: JobDescriptionSectionProps) {
  return (
    <Card
      variant="outlined"
      sx={{ borderColor: '#d5dde7', borderRadius: 1.5, bgcolor: 'white' }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mb: 0.75, fontWeight: 600 }}
        >
          Job tags
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          sx={{ flexWrap: 'wrap' }}
        >
          {job.jobTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                color: '#49698f',
                borderColor: '#b8c8dc',
                bgcolor: '#edf2f8',
              }}
            />
          ))}
        </Stack>

        <Typography
          component="h2"
          variant="h6"
          sx={{ mt: 2.5, mb: 1, color: '#202a35', fontWeight: 700 }}
        >
          About the Role:
        </Typography>
        <Stack spacing={1}>
          {job.description.map((paragraph, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {paragraph}
            </Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 2.5, borderColor: '#e1e5eb' }} />

        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 1, color: '#202a35', fontWeight: 700 }}
        >
          Qualifications:
        </Typography>
        <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
          {job.qualifications.map((qualification, index) => (
            <Typography
              component="li"
              key={index}
              variant="body2"
              color="text.secondary"
            >
              {qualification}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobDescriptionSection
