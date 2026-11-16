import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../index'

const selectJobsState = (state: RootState) => state.jobs

export const selectJobs = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.jobs,
)
