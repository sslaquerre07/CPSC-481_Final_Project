import type { JobType, YearOfStudy } from '../../types/job'

export const RequiredDocument = {
  Resume: 'Resume',
  Transcript: 'Transcript',
  CoverLetter: 'Cover Letter',
} as const

export type RequiredDocument =
  (typeof RequiredDocument)[keyof typeof RequiredDocument]

export interface PersonalInfo {
  name: string
  location: string
  program: string
}

export interface UserDocument {
  file_title: string
  file_name: string
  isCustom: boolean
}

export type ContactInfo =
  | { notifications_enabled: false }
  | {
      notifications_enabled: true
      contact_method: 'email'
      email: string
    }
  | {
      notifications_enabled: true
      contact_method: 'phone'
      phone: string
    }

export interface JobPreferences {
  work_types: JobType[]
  willing_to_relocate: boolean
  require_work_permit: boolean
  year_of_study: YearOfStudy | null
  program: string
  preferred_location: string
  minimum_pay: number | null
  quick_apply_only: boolean
}

export interface UserState {
  personal_info: PersonalInfo
  documents: UserDocument[]
  contact_info: ContactInfo
  job_preferences: JobPreferences
}
