import { refreshAccessToken } from './auth-api'

export const bootstrapSession = async () => {
  try {
    await refreshAccessToken()
    return true
  } catch {
    return false
  }
}