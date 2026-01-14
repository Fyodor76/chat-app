export interface User {
  id: string
  login: string
}

export interface AuthData {
  accessToken: string
  refreshToken: string
  user: User
}

export interface LoginRequest {
  login?: string
  password: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface MessageResponse {
  message: string
}

export interface AuthApiResponse {
  success: boolean
  data: AuthData
  meta?: any
  message?: string
}

export interface RefreshApiResponse {
  success: boolean
  data: RefreshResponse
  meta?: any
  message?: string
}

export interface MessageApiResponse {
  success: boolean
  data: MessageResponse
  meta?: any
  message?: string
}
