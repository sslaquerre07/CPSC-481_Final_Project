import type { JobType } from '../../types/job'

export type { JobType } from '../../types/job'

export interface Job {
  id: string
  title: string
  type: JobType
  company: string
  postingDate: string
  applicationDeadline: string
  location: string
  saved: boolean
}

export interface JobsState {
  jobs: Job[]
}
