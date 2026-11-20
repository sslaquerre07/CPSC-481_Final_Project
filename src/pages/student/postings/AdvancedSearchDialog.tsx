import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import type { JobType, YearOfStudy } from '../../../types/job'
import type { AdvancedJobFilters } from './advancedSearchTypes'
import selectionToggleGroupSx from '../settings/selectionToggleGroupSx'

interface AdvancedSearchDialogProps {
 open: boolean
 filters: AdvancedJobFilters
 onChange: (filters: AdvancedJobFilters) => void
 onClear: () => void
 onApply: () => void
 onClose: () => void
}

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

function AdvancedSearchDialog({
 open,
 filters,
 onChange,
 onClear,
 onApply,
 onClose,
}: AdvancedSearchDialogProps) {
 const update = <Key extends keyof AdvancedJobFilters>(
   key: Key,
   value: AdvancedJobFilters[Key],
 ) => onChange({ ...filters, [key]: value })

 return (
   <Dialog
     open={open}
     onClose={onClose}
     fullWidth
     maxWidth="md"
     aria-labelledby="advanced-search-title"
   >
     <DialogTitle
       id="advanced-search-title"
       sx={{ pb: 0.5, color: '#202a35', fontWeight: 700 }}
     >
       Advanced search
     </DialogTitle>
     <DialogContent>
       <Typography color="text.secondary" sx={{ mb: 2 }}>
         These start from your saved Preferences. Changes here only apply to
         this search.
       </Typography>
       <Stack spacing={2}>
         <Stack spacing={1}>
           <Typography sx={{ fontWeight: 600 }}>Work type</Typography>
           <ToggleButtonGroup
             value={filters.work_types}
             onChange={(_, value: JobType[]) => update('work_types', value)}
             aria-label="Filter by work type"
             sx={{ ...selectionToggleGroupSx, alignSelf: 'flex-start' }}
           >
             {jobTypes.map((jobType) => (
               <ToggleButton key={jobType} value={jobType}>
                 {jobType}
               </ToggleButton>
             ))}
           </ToggleButtonGroup>
         </Stack>

         <Stack
           sx={{
             display: 'grid',
             gridTemplateColumns: {
               xs: '1fr',
               sm: 'repeat(2, minmax(0, 1fr))',
             },
             gap: 2,
           }}
         >
           <TextField
             label="Eligible program"
             value={filters.program}
             placeholder="Any program"
             onChange={(event) => update('program', event.target.value)}
             slotProps={{ htmlInput: { 'aria-label': 'Eligible program' } }}
           />
           <TextField
             select
             label="Year of study"
             value={filters.year_of_study ?? ''}
             onChange={(event) => {
               const year = yearsOfStudy.find(
                 (option) => option === event.target.value,
               )
               update('year_of_study', year ?? null)
             }}
           >
             <MenuItem value="">Any year</MenuItem>
             {yearsOfStudy.map((year) => (
               <MenuItem key={year} value={year}>
                 {year}
               </MenuItem>
             ))}
           </TextField>
           <TextField
             label="Preferred location"
             value={filters.preferred_location}
             placeholder="Any location"
             onChange={(event) =>
               update('preferred_location', event.target.value)
             }
             slotProps={{
               htmlInput: { 'aria-label': 'Preferred location' },
             }}
           />
           <TextField
             label="Minimum pay"
             type="number"
             value={filters.minimum_pay ?? ''}
             placeholder="No minimum"
             onChange={(event) => {
               const value = event.target.value
               update('minimum_pay', value === '' ? null : Number(value))
             }}
             slotProps={{
               htmlInput: {
                 'aria-label': 'Minimum pay',
                 min: 0,
               },
             }}
           />
           <TextField
             select
             label="Require work permit"
             value={
               filters.require_work_permit === null
                 ? 'any'
                 : filters.require_work_permit
                   ? 'yes'
                   : 'no'
             }
             onChange={(event) => {
               const value = event.target.value
               update(
                 'require_work_permit',
                 value === 'any' ? null : value === 'yes',
               )
             }}
           >
             <MenuItem value="any">Any</MenuItem>
             <MenuItem value="yes">Yes</MenuItem>
             <MenuItem value="no">No</MenuItem>
           </TextField>
           <TextField
             select
             label="Application method"
             value={filters.application_method}
             onChange={(event) => {
               const value = event.target.value
               if (
                 value === 'any' ||
                 value === 'quick-apply' ||
                 value === 'external'
               ) {
                 update('application_method', value)
               }
             }}
           >
             <MenuItem value="any">Any</MenuItem>
             <MenuItem value="quick-apply">Quick Apply</MenuItem>
             <MenuItem value="external">External</MenuItem>
           </TextField>
         </Stack>

         <FormControlLabel
           control={
             <Checkbox
               checked={filters.saved_only}
               onChange={(_, checked) => update('saved_only', checked)}
             />
           }
           label="Show saved postings only"
         />
       </Stack>
     </DialogContent>
     <DialogActions sx={{ px: 3, pb: 2.5 }}>
       <Button onClick={onClear} variant="outlined">
         Clear
       </Button>
       <Button
         onClick={onApply}
         variant="contained"
         sx={{ bgcolor: '#304d72' }}
       >
         Apply filters
       </Button>
     </DialogActions>
   </Dialog>
 )
}

export default AdvancedSearchDialog
