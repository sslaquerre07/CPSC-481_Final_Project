import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Job } from '../../../store/jobs/types'
import { formatDate } from '../postings/utils'

interface JobDetailHeaderProps {
  job: Job
  onToggleSaved: () => void
  onExternalApply: () => void
}

function JobDetailHeader({
  job,
  onToggleSaved,
  onExternalApply,
}: JobDetailHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'flex-start' },
        mb: 2,
      }}
    >
      <Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: '#202a35', fontWeight: 700 }}
        >
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.company} &nbsp;|&nbsp; {job.location}
        </Typography>
        <Typography variant="body2" color="#355375" sx={{ mt: 0.5 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Application deadline:
          </Box>{' '}
          {formatDate(job.applicationDeadline)}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {job.quickApply ? (
          <Button
            component={Link}
            to={`/student/current-postings/${job.id}/quick-apply`}
            variant="contained"
            sx={{ bgcolor: '#304d72', whiteSpace: 'nowrap' }}
          >
            Apply
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onExternalApply}
            sx={{ bgcolor: '#304d72', whiteSpace: 'nowrap' }}
          >
            Apply on employer site
          </Button>
        )}
        <IconButton
          aria-label={job.saved ? 'Unsave job' : 'Save job'}
          onClick={onToggleSaved}
          sx={{
            border: '1px solid #355375',
            borderRadius: 1,
            color: '#355375',
          }}
        >
          {job.saved ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default JobDetailHeader
