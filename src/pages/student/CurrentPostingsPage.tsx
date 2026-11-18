import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import {
  Box,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectJobs } from '../../store/jobs/selectors'
import { toggleSaved } from '../../store/jobs/reducer'
import type { Job } from '../../store/jobs/types'
import SortableTable from '../../components/SortableTable'
import type { SortableTableColumn } from '../../components/SortableTable'

const jobColumns: SortableTableColumn<Job>[] = [
  {
    id: 'type',
    label: 'Type',
    getSortValue: (job) => job.type,
    renderCell: (job) => (
      <Chip
        label={job.type}
        size="small"
        variant="outlined"
        sx={{
          color: '#49698f',
          borderColor: '#b8c8dc',
          bgcolor: '#edf2f8',
          borderRadius: 1.5,
        }}
      />
    ),
  },
  {
    id: 'company',
    label: 'Company',
    getSortValue: (job) => job.company,
    renderCell: (job) => job.company,
  },
  {
    id: 'postingDate',
    label: 'Posting Date (MM/DD/YY)',
    getSortValue: (job) => job.postingDate,
    renderCell: (job) => formatDate(job.postingDate),
  },
  {
    id: 'applicationDeadline',
    label: 'Application Deadline (MM/DD/YY)',
    getSortValue: (job) => job.applicationDeadline,
    renderCell: (job) => formatDate(job.applicationDeadline),
  },
  {
    id: 'location',
    label: 'Location',
    getSortValue: (job) => job.location,
    renderCell: (job) => job.location,
  },
]

function formatDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year.slice(-2)}`
}

function CurrentPostingsPage() {
  const jobs = useAppSelector(selectJobs)
  const dispatch = useAppDispatch()

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 3, sm: 5, md: 7 },
        pt: { xs: 3, sm: 4 },
        pb: { xs: 5, sm: 7 },
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          mb: 2,
          color: '#202a35',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        Current Postings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search job title, company or location..."
          slotProps={{
            htmlInput: { 'aria-label': 'Search job postings' },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: 560, bgcolor: 'common.white' }}
        />
      </Box>
      <SortableTable
        rows={jobs}
        getRowKey={(job) => job.id}
        firstColumn={{
          id: 'title',
          label: 'Job Title',
          getSortValue: (job) => job.title,
          renderCell: (job) => job.title,
          linkTo: (job) => `/student/current-postings/${job.id}`,
        }}
        columns={jobColumns}
        actionColumn={{
          label: '',
          renderCell: (job) => (
            <IconButton
              aria-label={job.saved ? `Unsave ${job.title}` : `Save ${job.title}`}
              onClick={() => dispatch(toggleSaved(job.id))}
              size="small"
              sx={{ color: job.saved ? '#304d72' : '#718096' }}
            >
              {job.saved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          ),
        }}
      />
    </Container>
  )
}

export default CurrentPostingsPage
