import { CreateUserRequest } from './type'
import { useCreateMutation } from './user'

export const useUser = () => {
  const [createMutation, { isLoading, error, data }] = useCreateMutation()

  const create = async (credentials: CreateUserRequest) => {
    return createMutation(credentials).unwrap()
  }

  return {
    create,
    isLoading,
    error,
    data,
  }
}