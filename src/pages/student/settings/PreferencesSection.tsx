import { Stack } from '@mui/material'
import ContactPreferencesSection from './ContactPreferencesSection'
import JobPreferencesSection from './JobPreferencesSection'

function PreferencesSection() {
  return (
    <Stack spacing={1.5}>
      <ContactPreferencesSection />
      <JobPreferencesSection />
    </Stack>
  )
}

export default PreferencesSection
