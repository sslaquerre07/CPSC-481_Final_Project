import { useMemo, useState } from 'react'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import {
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Search, Tune } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectJobs } from '../../../store/jobs/selectors'
import { toggleSaved } from '../../../store/jobs/reducer'
import type { Job } from '../../../store/jobs/types'
import { selectUser } from '../../../store/user/selectors'
import SortableTable from '../../../components/SortableTable'
import type { SortableTableColumn } from '../../../components/SortableTable'
import AdvancedSearchDialog from './AdvancedSearchDialog'
import {
  createAdvancedFilters,
  emptyAdvancedFilters,
} from './advancedSearchTypes'
import { filterJobs, formatDate, getActiveFilterLabels } from './utils'

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

function CurrentPostingsPage() {
  const jobs = useAppSelector(selectJobs)
  const { job_preferences: preferences } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState('')
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(() =>
    createAdvancedFilters(preferences),
  )
  const [draftFilters, setDraftFilters] = useState(() =>
    createAdvancedFilters(preferences),
  )
  const activeFilterLabels = getActiveFilterLabels(appliedFilters)

  const filteredJobs = useMemo(
    () => filterJobs(jobs, query, appliedFilters),
    [jobs, query, appliedFilters],
  )

  const openAdvancedSearch = () => {
    setDraftFilters(appliedFilters)
    setAdvancedSearchOpen(true)
  }

  const applyFilters = () => {
    setAppliedFilters(draftFilters)
    setAdvancedSearchOpen(false)
  }

  const clearFilters = () => {
    setDraftFilters(emptyAdvancedFilters)
  }

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
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          mb: activeFilterLabels.length > 0 ? 1.5 : 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search job title, company or location..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          slotProps={{
            htmlInput: { 'aria-label': 'Search job postings' },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: '100%', sm: 'min(36rem, 55vw)' },
            bgcolor: 'common.white',
          }}
        />
        <IconButton
          aria-label="Open advanced search"
          onClick={openAdvancedSearch}
          sx={{
            border: '1px solid #d5dde7',
            borderRadius: 1,
            bgcolor: 'common.white',
            color: '#355375',
          }}
        >
          <Tune />
        </IconButton>
      </Stack>
      {activeFilterLabels.length > 0 && (
        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          sx={{
            flexWrap: 'wrap',
            alignItems: 'center',
            mb: 1.5,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Filters:
          </Typography>
          {activeFilterLabels.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              size="small"
              onDelete={() => {
                const nextFilters = filter.remove(appliedFilters)
                setAppliedFilters(nextFilters)
                setDraftFilters(nextFilters)
              }}
              sx={{
                bgcolor: 'common.white',
                color: '#355375',
                border: '1px solid #d5dde7',
              }}
            />
          ))}
          <Typography
            component="button"
            variant="caption"
            onClick={() => {
              setAppliedFilters(emptyAdvancedFilters)
              setDraftFilters(emptyAdvancedFilters)
            }}
            sx={{
              border: 0,
              p: 0,
              bgcolor: 'transparent',
              color: '#355375',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Clear all
          </Typography>
        </Stack>
      )}
      <SortableTable
        rows={filteredJobs}
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
      <AdvancedSearchDialog
        open={isAdvancedSearchOpen}
        filters={draftFilters}
        onChange={setDraftFilters}
        onClear={clearFilters}
        onApply={applyFilters}
        onClose={() => setAdvancedSearchOpen(false)}
      />
    </Container>
  )
}

export default CurrentPostingsPage
