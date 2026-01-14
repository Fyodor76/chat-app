import { authSlice } from '@/app/store/slices/auth'

import { baseApi } from '../baseApi'
import type {
  AuthApiResponse,
  LoginRequest,
  MessageApiResponse,
  RefreshApiResponse,
  RefreshRequest,
} from './type'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthApiResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.success) {
            dispatch(
              authSlice.actions.setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              })
            )
          }
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),

    logout: builder.mutation<MessageApiResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authSlice.actions.logout())
        } catch (error) {
          dispatch(authSlice.actions.logout())
          console.error('Logout failed:', error)
        }
      },
    }),

    logoutAllDevices: builder.mutation<MessageApiResponse, void>({
      query: () => ({
        url: '/auth/logout-all',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authSlice.actions.logout())
        } catch (error) {
          dispatch(authSlice.actions.logout())
          console.error('Logout all devices failed:', error)
        }
      },
    }),

    refreshToken: builder.mutation<RefreshApiResponse, RefreshRequest>({
      query: refreshData => ({
        url: '/auth/refresh',
        method: 'POST',
        body: refreshData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.success) {
            dispatch(
              authSlice.actions.setTokens({
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              })
            )
          }
        } catch (error) {
          console.error('Refresh token failed:', error)
        }
      },
    }),

    validateToken: builder.query<{ success: boolean; data: { valid: boolean } }, void>({
      query: () => ({
        url: '/auth/validate',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useLogoutAllDevicesMutation,
  useRefreshTokenMutation,
  useValidateTokenQuery,
} = authApi
