import { authSlice } from '@/app/store/slices/auth'

import { baseApi } from '../baseApi'
import type { CreateUserRequest } from './type'
import { AuthApiResponse } from '../auth/type'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    create: builder.mutation<AuthApiResponse, CreateUserRequest>({
      query: credentials => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
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

 
  }),
})

export const {
  useCreateMutation,
} = authApi
