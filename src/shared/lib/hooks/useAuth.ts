import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/app/store'

import { logout as logoutAction } from '../../../app/store/slices/auth'
import { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } from '../api/auth/auth'
import { LoginRequest } from '../api/auth/type'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authState = useSelector((state: RootState) => state.auth)

  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  const [refreshTokenMutation] = useRefreshTokenMutation()

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const result = await loginMutation(credentials).unwrap()
        if (result.success) {
          return result.data
        }
        throw new Error(result.message || 'Login failed')
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    [loginMutation]
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logoutAction())
    }
  }, [logoutMutation, dispatch])

  const refreshToken = useCallback(
    async (refreshToken: string) => {
      try {
        const result = await refreshTokenMutation({ refreshToken }).unwrap()
        if (result.success) {
          return result.data
        }
        throw new Error(result.message || 'Token refresh failed')
      } catch (error) {
        console.error('Refresh token error:', error)
        throw error
      }
    },
    [refreshTokenMutation]
  )

  return {
    user: authState.user,
    token: authState.token,
    refreshToken: authState.refreshToken,
    isAuthenticated: authState.isAuthenticated,

    userId: authState.user?.id,
    userLogin: authState.user?.login,
    hasToken: !!authState.token,

    actions: {
      login,
      logout,
      refreshToken,
    },
  }
}
