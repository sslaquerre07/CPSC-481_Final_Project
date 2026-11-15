import type { RootState } from '../index'

export const selectCounterValue = (state: RootState) => state.counter.value
