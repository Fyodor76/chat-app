export interface User {
  id: string
  login: string
}

export interface CreateUserRequest {
  login: string
  password: string
}

export interface CreateUserResponse {
  id: string
  login: string
}
