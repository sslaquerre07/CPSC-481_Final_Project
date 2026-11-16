import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { JobsState } from './types'

const initialState: JobsState = {
  jobs: [
    {
      id: 'job-a',
      title: 'Marketing Intern',
      type: 'Internship',
      company: 'A Inc.',
      postingDate: '2026-09-30',
      applicationDeadline: '2026-11-15',
      location: 'Calgary',
      saved: true,
    },
    {
      id: 'job-b',
      title: 'Operations Coordinator',
      type: 'Full-Time',
      company: 'B Co.',
      postingDate: '2026-09-26',
      applicationDeadline: '2026-10-31',
      location: 'London',
      saved: true,
    },
    {
      id: 'job-c',
      title: 'Communications Assistant',
      type: 'Part-Time',
      company: 'C Ltd.',
      postingDate: '2026-09-24',
      applicationDeadline: '2026-11-30',
      location: 'Edmonton',
      saved: false,
    },
  ],
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    toggleSaved: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(({ id }) => id === action.payload)
      if (job) {
        job.saved = !job.saved
      }
    },
  },
})

export const { toggleSaved } = jobsSlice.actions
export default jobsSlice.reducer
