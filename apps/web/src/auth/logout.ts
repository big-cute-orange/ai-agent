import { tokenStore } from './token-store'

export const logout = async () => {
  await fetch('/auth/web/logout', {
    method: 'POST',
    credentials: 'include',
  })

  tokenStore.clear()
}