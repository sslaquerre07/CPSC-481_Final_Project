import { useState } from 'react'
import {
  Button,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setJobPreferences } from '../../../store/user/reducer'
import { selectUser } from '../../../store/user/selectors'
import type { JobPreferences } from '../../../store/user/types'
import type { JobType, YearOfStudy } from '../../../types/job'
import PreferenceField from './PreferenceField'
import selectionToggleGroupSx from './selectionToggleGroupSx'
import SettingsPanel from './SettingsPanel'

const jobTypes: JobType[] = ['Internship', 'Part-Time', 'Full-Time']
const yearsOfStudy: YearOfStudy[] = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th+',
  'Graduate',
  'Doctoral',
]

interface YesNoFieldProps {
  label: string
  value: boolean
  fullWidth?: boolean
  onChange: (value: boolean) => void
}

function YesNoField({
  label,
  value,
  fullWidth,
  onChange,
}: YesNoFieldProps) {
  return (
    <PreferenceField label={label} fullWidth={fullWidth}>
      <TextField
        select
        size="small"
        value={value ? 'yes' : 'no'}
        onChange={(event) => onChange(event.target.value === 'yes')}
        slotProps={{ htmlInput: { 'aria-label': label } }}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </TextField>
    </PreferenceField>
  )
}

function JobPreferencesSection() {
  const { job_preferences: savedPreferences } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [draft, setDraft] = useState<JobPreferences>(() => savedPreferences)

  const updatePreference = <Field extends keyof JobPreferences>(
    field: Field,
    value: JobPreferences[Field],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const handleSave = () => {
    dispatch(setJobPreferences(draft))
  }

  return (
    <Stack spacing={1.5}>
      <SettingsPanel
        title="Job preferences"
        description="These defaults are applied to advanced search on the Postings page and can be adjusted per search."
        maxHeight="70vh"
      >
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 1.5, sm: 2 },
            mt: 1.5,
          }}
        >
          <PreferenceField label="Work type" fullWidth>
            <ToggleButtonGroup
              value={draft.work_types}
              onChange={(_, value: JobType[]) =>
                updatePreference('work_types', value)
              }
              aria-label="Work type"
              sx={selectionToggleGroupSx}
            >
              {jobTypes.map((jobType) => (
                <ToggleButton key={jobType} value={jobType}>
                  {jobType}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </PreferenceField>

          <YesNoField
            label="Willing to relocate?"
            value={draft.willing_to_relocate}
            onChange={(value) => updatePreference('willing_to_relocate', value)}
          />
          <YesNoField
            label="Require Work Permit?"
            value={draft.require_work_permit}
            onChange={(value) => updatePreference('require_work_permit', value)}
          />

          <PreferenceField label="Year of study">
            <TextField
              select
              size="small"
              value={draft.year_of_study ?? ''}
              onChange={(event) => {
                const year = yearsOfStudy.find(
                  (option) => option === event.target.value,
                )
                updatePreference('year_of_study', year ?? null)
              }}
              slotProps={{ htmlInput: { 'aria-label': 'Year of study' } }}
            >
              <MenuItem value="">Any year</MenuItem>
              {yearsOfStudy.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </PreferenceField>

          <PreferenceField label="Program">
            <TextField
              size="small"
              value={draft.program}
              placeholder="Any program"
              onChange={(event) =>
                updatePreference('program', event.target.value)
              }
              slotProps={{ htmlInput: { 'aria-label': 'Program' } }}
            />
          </PreferenceField>

          <PreferenceField label="Preferred job location">
            <TextField
              size="small"
              value={draft.preferred_location}
              placeholder="Any location"
              onChange={(event) =>
                updatePreference('preferred_location', event.target.value)
              }
              slotProps={{
                htmlInput: { 'aria-label': 'Preferred job location' },
              }}
            />
          </PreferenceField>

          <PreferenceField label="Minimum pay">
            <TextField
              size="small"
              type="number"
              value={draft.minimum_pay ?? ''}
              placeholder="No minimum"
              onChange={(event) => {
                const value = event.target.value
                updatePreference(
                  'minimum_pay',
                  value === '' ? null : Number(value),
                )
              }}
              slotProps={{
                htmlInput: {
                  'aria-label': 'Minimum pay',
                  min: 0,
                },
              }}
            />
          </PreferenceField>

          <YesNoField
            label="Quick Apply only"
            value={draft.quick_apply_only}
            onChange={(value) => updatePreference('quick_apply_only', value)}
          />
        </Stack>
      </SettingsPanel>
      <Button
        variant="outlined"
        onClick={handleSave}
        sx={{ alignSelf: 'flex-start' }}
      >
        Save preferences
      </Button>
    </Stack>
  )
}

export default JobPreferencesSection
