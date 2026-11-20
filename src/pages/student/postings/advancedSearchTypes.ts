import type { JobType, YearOfStudy } from '../../../types/job'
import type { JobPreferences } from '../../../store/user/types'

export type ApplicationMethod = 'any' | 'quick-apply' | 'external'

export interface AdvancedJobFilters {
  work_types: JobType[]
  program: string
  year_of_study: YearOfStudy | null
  preferred_location: string
  minimum_pay: number | null
  require_work_permit: boolean | null
  application_method: ApplicationMethod
  saved_only: boolean
}

export function createAdvancedFilters(
  preferences: JobPreferences,
): AdvancedJobFilters {
  return {
    work_types: [...preferences.work_types],
    program: preferences.program,
    year_of_study: preferences.year_of_study,
    preferred_location: preferences.preferred_location,
    minimum_pay: preferences.minimum_pay,
    require_work_permit: preferences.require_work_permit,
    application_method: preferences.quick_apply_only ? 'quick-apply' : 'any',
    saved_only: false,
  }
}

export const emptyAdvancedFilters: AdvancedJobFilters = {
  work_types: [],
  program: '',
  year_of_study: null,
  preferred_location: '',
  minimum_pay: null,
  require_work_permit: null,
  application_method: 'any',
  saved_only: false,
}
