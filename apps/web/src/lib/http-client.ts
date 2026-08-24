import { refreshAccessToken } from '@/auth/auth-api'
import { tokenStore } from '@/auth/token-store'

const createHeaders = (headers: HeadersInit | undefined, token: string | null) => {
  const nextHeaders = new Headers(headers)

  if (token) {
    nextHeaders.set('Authorization', `Bearer ${token}`)
  }

  return nextHeaders
}

let refreshPromise: Promise<string> | null = null

const refreshOnce = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

export const authFetch = async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const accessToken = tokenStore.getAccessToken()

  const response = await fetch(input, {
    ...init,
    credentials: 'include',
    headers: createHeaders(init.headers, accessToken),
  })

  if (response.status !== 401) {
    return response
  }

  const nextAccessToken = await refreshOnce()

  return fetch(input, {
    ...init,
    credentials: 'include',
    headers: createHeaders(init.headers, nextAccessToken),
  })
}