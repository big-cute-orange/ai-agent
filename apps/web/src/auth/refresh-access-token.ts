export const refreshAccessToken = async () => {
  const response = await fetch('/auth/web/token/refresh', {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('refresh failed')
  }

  return response.json()
}