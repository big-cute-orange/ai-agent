import { authFetch } from '@/lib/http-client'

interface CurrentUser {
  id: string
  name: string
  email: string
}

export const getCurrentUser = async () => {
  const response = await authFetch('/api/account/me')

  if (!response.ok) {
    throw new Error('获取当前用户失败')
  }

  return (await response.json()) as CurrentUser
}