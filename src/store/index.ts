import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jobsReducer from './jobs/reducer'
import type { JobsState } from './jobs/types'
import userReducer from './user/reducer'
import { jobsStorageKey, loadState, saveState } from './persistence'

const rootReducer = combineReducers({
  jobs: jobsReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistedState = loadState<RootState>()
const persistedJobs = loadState<JobsState>(jobsStorageKey)
const isValidPersistedJobs = (
  state: Partial<JobsState> | undefined,
): state is JobsState =>
  state?.schemaVersion === 4 &&
  Array.isArray(state.ids) &&
  typeof state.entities === 'object' &&
  state.entities !== null

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
    ? {
        user: persistedState.user,
        jobs: isValidPersistedJobs(persistedJobs) ? persistedJobs : undefined,
      }
    : undefined,
})

store.subscribe(() => {
  const state = store.getState()
  saveState({ user: state.user })
  saveState(state.jobs, jobsStorageKey)
})

export type AppDispatch = typeof store.dispatch
