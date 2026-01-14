import { useLoginMutation, useLogoutMutation } from './auth'
import { LoginRequest } from './type'

export const useLogin = () => {
  const [loginMutation, { isLoading, error, data }] = useLoginMutation()

  const login = async (credentials: LoginRequest) => {
    return loginMutation(credentials).unwrap()
  }

  return {
    login,
    isLoading,
    error,
    data,
  }
}

export const useLogout = () => {
  const [logoutMutation, { isLoading, error }] = useLogoutMutation()

  const logout = async () => {
    return logoutMutation().unwrap()
  }

  return {
    logout,
    isLoading,
    error,
  }
}
