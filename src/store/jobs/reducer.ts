import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import jobsSeed from '../../data/jobs.json'
import type { Job } from './types'

export const jobsAdapter = createEntityAdapter<Job>()

const initialState = jobsAdapter.getInitialState({ schemaVersion: 2 })

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: jobsAdapter.setAll(initialState, jobsSeed as Job[]),
  reducers: {
    addJob: {
      reducer: (state, action: PayloadAction<Job>) => {
        jobsAdapter.addOne(state, action.payload)
      },
      prepare: (job: Omit<Job, 'id'>) => ({
        payload: { ...job, id: nanoid() },
      }),
    },
    updateJob: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<Job, 'id'>> }>,
    ) => {
      jobsAdapter.updateOne(state, action.payload)
    },
    removeJob: (state, action: PayloadAction<string>) => {
      jobsAdapter.removeOne(state, action.payload)
    },
    toggleSaved: (state, action: PayloadAction<string>) => {
      const job = state.entities[action.payload]
      if (job) {
        job.saved = !job.saved
      }
    },
  },
})

export const { addJob, removeJob, toggleSaved, updateJob } = jobsSlice.actions
export default jobsSlice.reducer
