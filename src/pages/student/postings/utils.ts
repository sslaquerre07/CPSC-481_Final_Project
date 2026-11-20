import type { Job } from '../../../store/jobs/types'
import type { AdvancedJobFilters } from './advancedSearchTypes'

export interface ActiveFilterLabel {
  key: string
  label: string
  remove: (filters: AdvancedJobFilters) => AdvancedJobFilters
}

export function formatDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${month}/${day}/${year.slice(-2)}`
}

export function getActiveFilterLabels(
  filters: AdvancedJobFilters,
): ActiveFilterLabel[] {
  return [
    ...filters.work_types.map((type) => ({
      key: `type-${type}`,
      label: type,
      remove: (current: AdvancedJobFilters) => ({
        ...current,
        work_types: current.work_types.filter((item) => item !== type),
      }),
    })),
    ...(filters.program
      ? [{
          key: 'program',
          label: filters.program,
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            program: '',
          }),
        }]
      : []),
    ...(filters.year_of_study
      ? [{
          key: 'year',
          label: filters.year_of_study,
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            year_of_study: null,
          }),
        }]
      : []),
    ...(filters.preferred_location
      ? [{
          key: 'location',
          label: filters.preferred_location,
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            preferred_location: '',
          }),
        }]
      : []),
    ...(filters.minimum_pay !== null
      ? [{
          key: 'minimum-pay',
          label: `Minimum $${filters.minimum_pay}`,
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            minimum_pay: null,
          }),
        }]
      : []),
    ...(filters.require_work_permit !== null
      ? [{
          key: 'work-permit',
          label: `Work permit: ${filters.require_work_permit ? 'Yes' : 'No'}`,
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            require_work_permit: null,
          }),
        }]
      : []),
    ...(filters.application_method !== 'any'
      ? [{
          key: 'application-method',
          label:
            filters.application_method === 'quick-apply'
              ? 'Quick Apply'
              : 'External application',
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            application_method: 'any' as const,
          }),
        }]
      : []),
    ...(filters.saved_only
      ? [{
          key: 'saved-only',
          label: 'Saved only',
          remove: (current: AdvancedJobFilters) => ({
            ...current,
            saved_only: false,
          }),
        }]
      : []),
  ]
}

export function filterJobs(
  jobs: readonly Job[],
  query: string,
  filters: AdvancedJobFilters,
): Job[] {
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedProgram = filters.program.trim().toLowerCase()
  const normalizedLocation = filters.preferred_location.trim().toLowerCase()

  return jobs.filter((job) => {
    const matchesQuery =
      !normalizedQuery ||
      [job.title, job.company, job.location].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      )
    const matchesType =
      filters.work_types.length === 0 || filters.work_types.includes(job.type)
    const matchesProgram =
      !normalizedProgram ||
      job.program.toLowerCase().includes(normalizedProgram)
    const matchesYear =
      !filters.year_of_study || job.yearOfStudy === filters.year_of_study
    const matchesLocation =
      !normalizedLocation ||
      job.location.toLowerCase().includes(normalizedLocation)
    const matchesPay =
      filters.minimum_pay === null || job.minimumPay >= filters.minimum_pay
    const matchesPermit =
      filters.require_work_permit === null ||
      job.requiresWorkPermit === filters.require_work_permit
    const matchesApplicationMethod =
      filters.application_method === 'any' ||
      job.quickApply === (filters.application_method === 'quick-apply')
    const matchesSaved = !filters.saved_only || job.saved

    return (
      matchesQuery &&
      matchesType &&
      matchesProgram &&
      matchesYear &&
      matchesLocation &&
      matchesPay &&
      matchesPermit &&
      matchesApplicationMethod &&
      matchesSaved
    )
  })
}
