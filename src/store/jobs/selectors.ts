import type { RootState } from '../index'
import { jobsAdapter } from './reducer'

const jobsSelectors = jobsAdapter.getSelectors<RootState>(
  (state) => state.jobs,
)

export const selectJobs = jobsSelectors.selectAll
export const selectJobById = jobsSelectors.selectById
