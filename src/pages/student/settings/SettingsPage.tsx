import { useState } from 'react'
import { Container, Stack, Tab, Tabs } from '@mui/material'
import DocumentsSection from './DocumentsSection'
import PersonalInfoSection from './PersonalInfoSection'
import PreferencesSection from './PreferencesSection'

type SettingsTab = 'materials' | 'preferences'

function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState<SettingsTab>('materials')

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        pt: { xs: 2, sm: 3 },
        pb: { xs: 3, sm: 4 },
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={(_, value: SettingsTab) => setSelectedTab(value)}
        aria-label="Settings sections"
        sx={{
          mb: 1.5,
          minHeight: 'auto',
          '& .MuiTabs-indicator': { display: 'none' },
        }}
      >
        <Tab
          value="materials"
          label="Application Materials"
          disableRipple
          sx={{
            minHeight: 'auto',
            px: 1.5,
            py: 0.75,
            mr: 1,
            border: '1px solid transparent',
            borderRadius: 1,
            color: '#596579',
            fontSize: '0.75rem',
            fontWeight: 700,
            '&.Mui-selected': {
              color: '#304d72',
              borderColor: '#304d72',
            },
          }}
        />
        <Tab
          value="preferences"
          label="Preferences"
          disableRipple
          sx={{
            minHeight: 'auto',
            px: 1.5,
            py: 0.75,
            mr: 1,
            border: '1px solid transparent',
            borderRadius: 1,
            color: '#596579',
            fontSize: '0.75rem',
            fontWeight: 700,
            '&.Mui-selected': {
              color: '#304d72',
              borderColor: '#304d72',
            },
          }}
        />
      </Tabs>
      {selectedTab === 'materials' && (
        <Stack spacing={1.5}>
          <PersonalInfoSection />
          <DocumentsSection />
        </Stack>
      )}
      {selectedTab === 'preferences' && <PreferencesSection />}
    </Container>
  )
}

export default SettingsPage
