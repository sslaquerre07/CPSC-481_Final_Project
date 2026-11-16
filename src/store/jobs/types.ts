export type JobType = 'Internship' | 'Full-Time' | 'Part-Time'

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
