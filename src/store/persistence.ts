const storageKey = 'cpsc-481-final-project:state'
export const jobsStorageKey = `${storageKey}:jobs:v4`

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function loadState<State extends object>(
  key = storageKey,
): Partial<State> | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const serializedState = window.localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }

    const persistedState: unknown = JSON.parse(serializedState)
    if (!isObject(persistedState)) {
      console.warn('Ignoring invalid persisted Redux state.')
      return undefined
    }

    return persistedState as Partial<State>
  } catch (error) {
    console.warn('Unable to load persisted Redux state.', error)
    return undefined
  }
}

export function saveState(state: object, key = storageKey): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    console.warn('Unable to save persisted Redux state.', error)
  }
}
