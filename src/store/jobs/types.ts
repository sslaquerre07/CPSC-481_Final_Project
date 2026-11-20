import type { EntityState } from '@reduxjs/toolkit'
import type { JobType, YearOfStudy } from '../../types/job'
import type { RequiredDocument } from '../user/types'

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
  program: string
  yearOfStudy: YearOfStudy
  minimumPay: number
  requiresWorkPermit: boolean
  quickApply: boolean
  description: string[]
  qualifications: string[]
  jobTags: string[]
  requiredDocuments: RequiredDocument[]
}

export type JobsState = EntityState<Job, string> & { schemaVersion: number }
