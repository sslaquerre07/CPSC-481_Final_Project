import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Close, EditOutlined } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setContactInfo } from '../../../store/user/reducer'
import { selectUser } from '../../../store/user/selectors'
import type { ContactInfo } from '../../../store/user/types'
import selectionToggleGroupSx from './selectionToggleGroupSx'
import SettingsPanel from './SettingsPanel'

type ContactMethod = 'email' | 'phone'
const phonePattern = String.raw`\+?(?:[0-9][\s().-]*){7,15}`

interface ContactDraft {
  contact_method: ContactMethod
  email: string
  phone: string
}

function createContactDraft(contactInfo: ContactInfo): ContactDraft {
  if (!contactInfo.notifications_enabled) {
    return { contact_method: 'email', email: '', phone: '' }
  }

  if (contactInfo.contact_method === 'email') {
    return {
      contact_method: 'email',
      email: contactInfo.email,
      phone: '',
    }
  }

  return {
    contact_method: 'phone',
    email: '',
    phone: contactInfo.phone,
  }
}

function ContactPreferencesSection() {
  const { contact_info: contactInfo } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(() => createContactDraft(contactInfo))
  const [validationAttempted, setValidationAttempted] = useState(false)

  const startEditing = () => {
    setDraft(createContactDraft(contactInfo))
    setValidationAttempted(false)
    setIsEditing(true)
  }

  const handleNotificationToggle = (enabled: boolean) => {
    if (!enabled) {
      dispatch(setContactInfo({ notifications_enabled: false }))
      setDraft(createContactDraft({ notifications_enabled: false }))
      setIsEditing(false)
      setValidationAttempted(false)
      return
    }

    const nextContactInfo: ContactInfo = contactInfo.notifications_enabled
      ? contactInfo
      : {
          notifications_enabled: true,
          contact_method: 'email',
          email: '',
        }
    dispatch(setContactInfo(nextContactInfo))
    setDraft(createContactDraft(nextContactInfo))
    setIsEditing(false)
    setValidationAttempted(false)
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isEditing || !contactInfo.notifications_enabled) {
      return
    }

    const value = draft[draft.contact_method].trim()
    const isValid =
      draft.contact_method === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : /^\+?(?:\d[\s().-]*){7,15}$/.test(value)
    if (!isValid) {
      setValidationAttempted(true)
      return
    }

    if (draft.contact_method === 'email') {
      dispatch(
        setContactInfo({
          notifications_enabled: true,
          contact_method: 'email',
          email: draft.email.trim(),
        }),
      )
    } else {
      dispatch(
        setContactInfo({
          notifications_enabled: true,
          contact_method: 'phone',
          phone: draft.phone.trim(),
        }),
      )
    }
    setIsEditing(false)
    setValidationAttempted(false)
  }

  const handleCancel = () => {
    setDraft(createContactDraft(contactInfo))
    setIsEditing(false)
    setValidationAttempted(false)
  }

  const selectedMethod: ContactMethod = isEditing
    ? draft.contact_method
    : contactInfo.notifications_enabled
      ? contactInfo.contact_method
      : 'email'
  const selectedContact = isEditing
    ? draft[selectedMethod]
    : contactInfo.notifications_enabled
      ? contactInfo.contact_method === 'email'
        ? contactInfo.email
        : contactInfo.phone
      : ''
  const contactIsInvalid =
    isEditing &&
    validationAttempted &&
    !(selectedMethod === 'email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedContact.trim())
      : /^\+?(?:\d[\s().-]*){7,15}$/.test(selectedContact.trim()))

  return (
    <SettingsPanel title="Contact preferences" maxHeight="45vh">
      <Box component="form" onSubmit={handleSave}>
        <Stack spacing={1.5} sx={{ mt: 1.5 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr auto',
                sm: '14rem minmax(0, 1fr)',
              },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                '@media (max-width: 22rem)': { whiteSpace: 'normal' },
              }}
            >
              Enable external notifications
            </Typography>
            <Switch
              checked={contactInfo.notifications_enabled}
              onChange={(_, checked) => handleNotificationToggle(checked)}
              sx={{ justifySelf: 'start' }}
              slotProps={{
                input: { 'aria-label': 'Enable external notifications' },
              }}
            />
          </Box>

          {contactInfo.notifications_enabled && (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '14rem minmax(0, 1fr)',
                  },
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Contact preference
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={selectedMethod}
                  aria-label="Contact preference"
                  onChange={(_, value: ContactMethod | null) => {
                    if (value) {
                      const nextContactInfo: ContactInfo =
                        value === 'email'
                          ? {
                              notifications_enabled: true,
                              contact_method: 'email',
                              email:
                                contactInfo.notifications_enabled &&
                                contactInfo.contact_method === 'email'
                                  ? contactInfo.email
                                  : '',
                            }
                          : {
                              notifications_enabled: true,
                              contact_method: 'phone',
                              phone:
                                contactInfo.notifications_enabled &&
                                contactInfo.contact_method === 'phone'
                                  ? contactInfo.phone
                                  : '',
                            }
                      dispatch(setContactInfo(nextContactInfo))
                      setDraft(createContactDraft(nextContactInfo))
                      setIsEditing(false)
                      setValidationAttempted(false)
                    }
                  }}
                  sx={selectionToggleGroupSx}
                >
                  <ToggleButton value="email">
                    Email
                  </ToggleButton>
                  <ToggleButton value="phone">
                    Phone
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr auto',
                    sm: '14rem minmax(0, 1fr) auto',
                  },
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, gridColumn: { xs: '1 / -1', sm: 'auto' } }}
                >
                  {selectedMethod === 'email' ? 'Email' : 'Phone'}
                </Typography>
                <TextField
                  size="small"
                  type={selectedMethod === 'email' ? 'email' : 'tel'}
                  value={selectedContact}
                  error={contactIsInvalid}
                  helperText={
                    contactIsInvalid
                      ? selectedMethod === 'email'
                        ? 'Enter a valid email address.'
                        : 'Enter a valid phone number.'
                      : undefined
                  }
                  placeholder={
                    selectedMethod === 'email'
                      ? 'Enter email address'
                      : 'Enter phone number'
                  }
                  slotProps={{
                    htmlInput: {
                      'aria-label':
                        selectedMethod === 'email'
                          ? 'Email address'
                          : 'Phone number',
                      readOnly: !isEditing,
                      required: isEditing,
                      pattern:
                        isEditing && selectedMethod === 'phone'
                          ? phonePattern
                          : undefined,
                    },
                  }}
                  onInvalid={() => setValidationAttempted(true)}
                  onChange={(event) =>
                    {
                      setValidationAttempted(false)
                      setDraft((current) => ({
                        ...current,
                        [current.contact_method]: event.target.value,
                      }))
                    }
                  }
                  sx={{
                    '& .MuiInputBase-root': {
                      bgcolor: isEditing ? 'common.white' : '#f8fafc',
                    },
                  }}
                />
                {isEditing ? (
                  <Stack direction="row" spacing={0.25}>
                    <IconButton
                      aria-label="Save contact preferences"
                      type="submit"
                      size="small"
                      sx={{ color: '#37865b' }}
                    >
                      <Check fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="Cancel contact preference changes"
                      type="button"
                      onClick={handleCancel}
                      size="small"
                      sx={{ color: '#b33a3a' }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Stack>
                ) : (
                  <IconButton
                    aria-label={`Edit ${selectedMethod}`}
                    type="button"
                    onClick={startEditing}
                    size="small"
                    sx={{ color: '#355375' }}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </SettingsPanel>
  )
}

export default ContactPreferencesSection
