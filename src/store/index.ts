import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jobsReducer from './jobs/reducer'
import { loadState, saveState } from './persistence'

const rootReducer = combineReducers({
  jobs: jobsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState<RootState>(),
})

store.subscribe(() => saveState(store.getState()))

export type AppDispatch = typeof store.dispatch
