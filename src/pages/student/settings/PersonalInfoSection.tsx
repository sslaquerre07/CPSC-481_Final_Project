import { useState } from 'react'
import { Autocomplete, Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Check, EditOutlined } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { updatePersonalInfo } from '../../../store/user/reducer'
import { selectUser } from '../../../store/user/selectors'
import type { PersonalInfo } from '../../../store/user/types'
import SettingsPanel from './SettingsPanel'

const programOptions = ['Software Engineering', 'Software Development']

const fields: { field: keyof PersonalInfo; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'location', label: 'Location' },
  { field: 'program', label: 'Program' },
]

interface PersonalInfoFieldProps {
  field: keyof PersonalInfo
  label: string
  value: string
  isEditing: boolean
  onEdit: () => void
  onChange: (value: string) => void
}

function PersonalInfoField({
  field,
  label,
  value,
  isEditing,
  onEdit,
  onChange,
}: PersonalInfoFieldProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', sm: '7rem minmax(0, 1fr) auto' },
        alignItems: 'center',
        columnGap: 1.5,
        rowGap: 0.5,
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, gridColumn: { xs: '1 / -1', sm: 'auto' } }}
      >
        {label}:
      </Typography>
      {isEditing && field === 'program' ? (
        <Autocomplete
          freeSolo
          options={programOptions}
          value={value}
          onChange={(_, nextValue) => onChange(nextValue ?? '')}
          onInputChange={(_, nextValue) => onChange(nextValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Select or enter a program"
              slotProps={{
                ...params.slotProps,
                htmlInput: {
                  ...params.slotProps.htmlInput,
                  'aria-label': 'Program',
                },
              }}
            />
          )}
        />
      ) : (
        <TextField
          size="small"
          value={value}
          placeholder={isEditing ? `Enter ${label.toLowerCase()}` : ''}
          slotProps={{
            htmlInput: {
              'aria-label': label,
              readOnly: !isEditing,
            },
          }}
          onChange={(event) => onChange(event.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: isEditing ? 'common.white' : '#f8fafc',
            },
          }}
        />
      )}
      <IconButton
        aria-label={isEditing ? `Done editing ${label.toLowerCase()}` : `Edit ${label.toLowerCase()}`}
        onClick={onEdit}
        size="small"
        sx={{ color: isEditing ? '#37865b' : '#355375' }}
      >
        {isEditing ? <Check fontSize="small" /> : <EditOutlined fontSize="small" />}
      </IconButton>
    </Box>
  )
}

function PersonalInfoSection() {
  const { personal_info: personalInfo } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [editingField, setEditingField] = useState<keyof PersonalInfo | null>(
    null,
  )

  return (
    <SettingsPanel title="Personal information" maxHeight="55vh">
      <Stack spacing={1.25} sx={{ mt: 1.5 }}>
        {fields.map(({ field, label }) => (
          <PersonalInfoField
            key={field}
            field={field}
            label={label}
            value={personalInfo[field]}
            isEditing={editingField === field}
            onEdit={() =>
              setEditingField((current) => (current === field ? null : field))
            }
            onChange={(value) =>
              dispatch(updatePersonalInfo({ field, value }))
            }
          />
        ))}
      </Stack>
    </SettingsPanel>
  )
}

export default PersonalInfoSection
