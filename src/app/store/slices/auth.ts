import { User } from '@/shared/lib/api/auth/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

const loadFromLocalStorage = (): Partial<AuthState> | null => {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem('auth')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

const savedAuth = loadFromLocalStorage()

const initialState: AuthState = savedAuth
  ? {
      user: savedAuth.user || null,
      token: savedAuth.token || null,
      refreshToken: savedAuth.refreshToken || null,
      isAuthenticated: !!savedAuth.token,
    }
  : {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User
        accessToken: string
        refreshToken: string
      }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          })
        )
      }
    },

    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken

      if (typeof window !== 'undefined') {
        const current = JSON.parse(localStorage.getItem('auth') || '{}')
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...current,
            token: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          })
        )
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }

        if (typeof window !== 'undefined') {
          const current = JSON.parse(localStorage.getItem('auth') || '{}')
          localStorage.setItem(
            'auth',
            JSON.stringify({
              ...current,
              user: state.user,
            })
          )
        }
      }
    },

    logout: state => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth')
      }
    },

    restoreAuth: state => {
      const savedAuth = loadFromLocalStorage()
      if (savedAuth) {
        state.user = savedAuth.user || null
        state.token = savedAuth.token || null
        state.refreshToken = savedAuth.refreshToken || null
        state.isAuthenticated = !!savedAuth.token
      }
    },

    resetAuth: state => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth')
      }
    },
  },
})

export const { setCredentials, setTokens, updateUser, logout, restoreAuth, resetAuth } =
  authSlice.actions

export default authSlice.reducer
