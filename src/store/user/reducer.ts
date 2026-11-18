import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, UnknownAction } from '@reduxjs/toolkit'
import { RequiredDocument } from './types'
import type {
  ContactInfo,
  JobPreferences,
  PersonalInfo,
  UserState,
} from './types'

const initialState: UserState = {
  personal_info: {
    name: 'Steven Smith',
    location: 'Calgary, AB',
    program: '',
  },
  documents: [
    {
      file_title: RequiredDocument.Resume,
      file_name: 'SteveResume.pdf',
      isCustom: false,
    },
    {
      file_title: RequiredDocument.Transcript,
      file_name: 'SteveTranscript.pdf',
      isCustom: false,
    },
    {
      file_title: RequiredDocument.CoverLetter,
      file_name: 'CoverLetter.pdf',
      isCustom: false,
    },
  ],
  contact_info: { notifications_enabled: false },
  job_preferences: {
    work_types: ['Internship', 'Full-Time'],
    willing_to_relocate: true,
    require_work_permit: true,
    year_of_study: null,
    program: '',
    preferred_location: '',
    minimum_pay: null,
    quick_apply_only: false,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<{ field: keyof PersonalInfo; value: string }>,
    ) => {
      state.personal_info[action.payload.field] = action.payload.value
    },
    setContactInfo: (state, action: PayloadAction<ContactInfo>) => {
      state.contact_info = action.payload
    },
    setJobPreferences: (state, action: PayloadAction<JobPreferences>) => {
      state.job_preferences = action.payload
    },
    updateDocument: (
      state,
      action: PayloadAction<{
        index: number
        field: 'file_title' | 'file_name'
        value: string
      }>,
    ) => {
      const document = state.documents[action.payload.index]
      if (document && (action.payload.field !== 'file_title' || document.isCustom)) {
        document[action.payload.field] = action.payload.value
      }
    },
    addDocument: (state) => {
      state.documents.push({
        file_title: '',
        file_name: '',
        isCustom: true,
      })
    },
    removeCustomDocument: (state, action: PayloadAction<number>) => {
      if (state.documents[action.payload]?.isCustom) {
        state.documents.splice(action.payload, 1)
      }
    },
  },
})

function userReducer(
  state: UserState | undefined,
  action: UnknownAction,
): UserState {
  if (state === undefined) {
    return userSlice.reducer(state, action)
  }

  const needsMigration =
    !state.contact_info ||
    !state.job_preferences ||
    state.documents.some((document) => typeof document.isCustom !== 'boolean')

  if (!needsMigration) {
    return userSlice.reducer(state, action)
  }

  const migratedState: UserState = {
    ...initialState,
    ...state,
    personal_info: { ...initialState.personal_info, ...state.personal_info },
    documents: state.documents.map((document, index) => ({
      ...document,
      isCustom:
        typeof document.isCustom === 'boolean'
          ? document.isCustom
          : index >= Object.values(RequiredDocument).length,
    })),
    contact_info: state.contact_info ?? initialState.contact_info,
    job_preferences: {
      ...initialState.job_preferences,
      ...state.job_preferences,
    },
  }

  return userSlice.reducer(migratedState, action)
}

export const {
  addDocument,
  removeCustomDocument,
  setContactInfo,
  setJobPreferences,
  updateDocument,
  updatePersonalInfo,
} = userSlice.actions
export default userReducer
