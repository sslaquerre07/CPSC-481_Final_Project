import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/reducer'
import { loadState, saveState } from './persistence'

const rootReducer = combineReducers({
  counter: counterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState<RootState>(),
})

store.subscribe(() => saveState(store.getState()))

export type AppDispatch = typeof store.dispatch
