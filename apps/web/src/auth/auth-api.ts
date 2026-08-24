import { tokenStore } from './token-store'

interface LoginResponse {
  accessToken: string
  user: {
    id: string
    name: string
  }
}

interface RefreshResponse {
  accessToken: string
}

export const loginByPassword = async (email: string, password: string) => {
  const response = await fetch('/auth/web/password/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('登录失败')
  }

  const data = (await response.json()) as LoginResponse
  tokenStore.setAccessToken(data.accessToken)
  return data
}

export const refreshAccessToken = async () => {
  const response = await fetch('/auth/web/token/refresh', {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    tokenStore.clear()
    throw new Error('刷新 access token 失败')
  }

  const data = (await response.json()) as RefreshResponse
  tokenStore.setAccessToken(data.accessToken)
  return data.accessToken
}