'use client'

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'

export type CatState = 'sleeping' | 'waking' | 'walking' | 'spilledCoffee' | 'awake'
export type GirlState = 'idle' | 'looking' | 'typing'
export type CoffeeState = 'steaming' | 'spilled'
export type ThemeMode = 'night' | 'day'

export type SceneState = {
  lights: { light1: boolean; light2: boolean; light3: boolean }
  cat: CatState
  girl: GirlState
  coffee: CoffeeState
  neonSign: boolean
  catLamp: boolean
  theme: ThemeMode
  hasInteracted: boolean
  discoveredItems: string[]
}

type Action =
  | { type: 'TOGGLE_LIGHT'; light: 'light1' | 'light2' | 'light3' }
  | { type: 'SET_CAT'; value: CatState }
  | { type: 'SET_GIRL'; value: GirlState }
  | { type: 'SET_COFFEE'; value: CoffeeState }
  | { type: 'TOGGLE_NEON' }
  | { type: 'TOGGLE_LAMP' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'REGISTER_INTERACTION'; itemId: string }
  | { type: 'WAKE_UP_ROOM' }

const initialState: SceneState = {
  lights: { light1: true, light2: true, light3: true },
  cat: 'sleeping',
  girl: 'idle',
  coffee: 'steaming',
  neonSign: true,
  catLamp: true,
  theme: 'night',
  hasInteracted: false,
  discoveredItems: [],
}

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case 'TOGGLE_LIGHT':
      return {
        ...state,
        hasInteracted: true,
        lights: { ...state.lights, [action.light]: !state.lights[action.light] },
        discoveredItems: state.discoveredItems.includes('lights')
          ? state.discoveredItems
          : [...state.discoveredItems, 'lights'],
      }
    case 'SET_CAT':
      return { ...state, cat: action.value }
    case 'SET_GIRL':
      return { ...state, girl: action.value }
    case 'SET_COFFEE':
      return { ...state, coffee: action.value }
    case 'TOGGLE_NEON':
      return {
        ...state,
        hasInteracted: true,
        neonSign: !state.neonSign,
        discoveredItems: state.discoveredItems.includes('neon')
          ? state.discoveredItems
          : [...state.discoveredItems, 'neon'],
      }
    case 'TOGGLE_LAMP':
      return {
        ...state,
        hasInteracted: true,
        catLamp: !state.catLamp,
        discoveredItems: state.discoveredItems.includes('lamp')
          ? state.discoveredItems
          : [...state.discoveredItems, 'lamp'],
      }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'night' ? 'day' : 'night' }
    case 'REGISTER_INTERACTION':
      return {
        ...state,
        hasInteracted: true,
        discoveredItems: state.discoveredItems.includes(action.itemId)
          ? state.discoveredItems
          : [...state.discoveredItems, action.itemId],
      }
    case 'WAKE_UP_ROOM':
      return {
        ...state,
        hasInteracted: true,
        neonSign: true,
        catLamp: true,
      }
    default:
      return state
  }
}

type SceneContextValue = {
  state: SceneState
  lightsOffCount: number
  toggleLight: (light: 'light1' | 'light2' | 'light3') => void
  toggleNeon: () => void
  toggleLamp: () => void
  toggleTheme: () => void
  wakeCat: () => void
  activateGirl: () => void
  toggleCoffee: () => void
  registerInteraction: (itemId: string) => void
  wakeUpRoom: () => void
}

const SceneContext = createContext<SceneContextValue | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const catBusy = useRef(false)
  const girlTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const registerInteraction = useCallback((itemId: string) => {
    dispatch({ type: 'REGISTER_INTERACTION', itemId })
  }, [])

  const toggleLight = useCallback(
    (light: 'light1' | 'light2' | 'light3') => dispatch({ type: 'TOGGLE_LIGHT', light }),
    [],
  )
  const toggleNeon = useCallback(() => dispatch({ type: 'TOGGLE_NEON' }), [])
  const toggleLamp = useCallback(() => dispatch({ type: 'TOGGLE_LAMP' }), [])
  const toggleTheme = useCallback(() => dispatch({ type: 'TOGGLE_THEME' }), [])

  // Sync .light and .dark classes on <html> so CSS variables and dark: classes flip for the whole page
  useEffect(() => {
    const html = document.documentElement
    if (state.theme === 'day') {
      html.classList.add('light')
      html.classList.remove('dark')
    } else {
      html.classList.remove('light')
      html.classList.add('dark')
    }
  }, [state.theme])

  const toggleCoffee = useCallback(() => {
    dispatch({ type: 'REGISTER_INTERACTION', itemId: 'coffee' })
    dispatch({ type: 'SET_COFFEE', value: 'steaming' })
  }, [])

  // Cat interaction: wake up with meow, or purr on subsequent petting. Never throws coffee.
  const wakeCat = useCallback(() => {
    dispatch({ type: 'REGISTER_INTERACTION', itemId: 'cat' })
    if (catBusy.current) return
    catBusy.current = true

    if (state.cat === 'sleeping') {
      dispatch({ type: 'SET_CAT', value: 'waking' })
      const t1 = setTimeout(() => {
        dispatch({ type: 'SET_CAT', value: 'awake' })
        catBusy.current = false
      }, 900)
      return () => clearTimeout(t1)
    }

    // When already awake: gentle happy bounce
    dispatch({ type: 'SET_CAT', value: 'waking' })
    const t = setTimeout(() => {
      dispatch({ type: 'SET_CAT', value: 'awake' })
      catBusy.current = false
    }, 700)
    return () => clearTimeout(t)
  }, [state.cat])

  // Girl looks at screen, starts typing, then eases back to idle.
  const activateGirl = useCallback(() => {
    dispatch({ type: 'REGISTER_INTERACTION', itemId: 'girl' })
    if (girlTimer.current) clearTimeout(girlTimer.current)
    dispatch({ type: 'SET_GIRL', value: 'looking' })
    setTimeout(() => dispatch({ type: 'SET_GIRL', value: 'typing' }), 650)
    girlTimer.current = setTimeout(() => dispatch({ type: 'SET_GIRL', value: 'idle' }), 9000)
  }, [])

  const wakeUpRoom = useCallback(() => {
    dispatch({ type: 'WAKE_UP_ROOM' })
  }, [])

  // Count all 5 interactive light sources that can be switched off
  const lightsOffCount = useMemo(
    () =>
      (state.lights.light1 ? 0 : 1) +
      (state.lights.light2 ? 0 : 1) +
      (state.lights.light3 ? 0 : 1) +
      (state.neonSign ? 0 : 1) +
      (state.catLamp ? 0 : 1),
    [state.lights, state.neonSign, state.catLamp],
  )

  const value = useMemo(
    () => ({
      state,
      lightsOffCount,
      toggleLight,
      toggleNeon,
      toggleLamp,
      toggleTheme,
      wakeCat,
      activateGirl,
      toggleCoffee,
      registerInteraction,
      wakeUpRoom,
    }),
    [
      state,
      lightsOffCount,
      toggleLight,
      toggleNeon,
      toggleLamp,
      toggleTheme,
      wakeCat,
      activateGirl,
      toggleCoffee,
      registerInteraction,
      wakeUpRoom,
    ],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export function useScene() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useScene must be used within SceneProvider')
  return ctx
}
