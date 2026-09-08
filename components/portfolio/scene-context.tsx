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
}

type Action =
  | { type: 'TOGGLE_LIGHT'; light: 'light1' | 'light2' | 'light3' }
  | { type: 'SET_CAT'; value: CatState }
  | { type: 'SET_GIRL'; value: GirlState }
  | { type: 'SET_COFFEE'; value: CoffeeState }
  | { type: 'TOGGLE_NEON' }
  | { type: 'TOGGLE_LAMP' }
  | { type: 'TOGGLE_THEME' }

const initialState: SceneState = {
  lights: { light1: true, light2: true, light3: true },
  cat: 'sleeping',
  girl: 'idle',
  coffee: 'steaming',
  neonSign: true,
  catLamp: true,
  theme: 'night',
}

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case 'TOGGLE_LIGHT':
      return {
        ...state,
        lights: { ...state.lights, [action.light]: !state.lights[action.light] },
      }
    case 'SET_CAT':
      return { ...state, cat: action.value }
    case 'SET_GIRL':
      return { ...state, girl: action.value }
    case 'SET_COFFEE':
      return { ...state, coffee: action.value }
    case 'TOGGLE_NEON':
      return { ...state, neonSign: !state.neonSign }
    case 'TOGGLE_LAMP':
      return { ...state, catLamp: !state.catLamp }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'night' ? 'day' : 'night' }
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
}

const SceneContext = createContext<SceneContextValue | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const catBusy = useRef(false)
  const girlTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    dispatch({ type: 'SET_COFFEE', value: 'steaming' })
  }, [])

  // Full cat wake -> walk -> spill sequence, guarded so it cannot re-trigger mid-run.
  const wakeCat = useCallback(() => {
    if (catBusy.current) return
    catBusy.current = true
    dispatch({ type: 'SET_CAT', value: 'waking' })
    const t1 = setTimeout(() => dispatch({ type: 'SET_CAT', value: 'walking' }), 900)
    const t2 = setTimeout(() => {
      dispatch({ type: 'SET_CAT', value: 'spilledCoffee' })
      dispatch({ type: 'SET_COFFEE', value: 'spilled' })
    }, 2100)
    const t3 = setTimeout(() => {
      dispatch({ type: 'SET_CAT', value: 'awake' })
      catBusy.current = false
    }, 3600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  // Girl looks at screen, starts typing, then eases back to idle.
  const activateGirl = useCallback(() => {
    if (girlTimer.current) clearTimeout(girlTimer.current)
    dispatch({ type: 'SET_GIRL', value: 'looking' })
    setTimeout(() => dispatch({ type: 'SET_GIRL', value: 'typing' }), 650)
    girlTimer.current = setTimeout(() => dispatch({ type: 'SET_GIRL', value: 'idle' }), 9000)
  }, [])

  const lightsOffCount = useMemo(
    () =>
      (state.lights.light1 ? 0 : 1) +
      (state.lights.light2 ? 0 : 1) +
      (state.lights.light3 ? 0 : 1),
    [state.lights],
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
    }),
    [state, lightsOffCount, toggleLight, toggleNeon, toggleLamp, toggleTheme, wakeCat, activateGirl, toggleCoffee],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export function useScene() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useScene must be used within SceneProvider')
  return ctx
}
