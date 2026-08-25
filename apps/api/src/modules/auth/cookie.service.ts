interface SetRefreshTokenCookieOptions {
  value: string
  maxAge: number
  path: '/auth/web/token/refresh' | '/auth/admin/token/refresh'
}

export const setRefreshTokenCookie = (
  headers: Headers,
  options: SetRefreshTokenCookieOptions,
) => {
  headers.append(
    'Set-Cookie',
    `refresh_token=${options.value}; HttpOnly; Secure; SameSite=Lax; Path=${options.path}; Max-Age=${options.maxAge}`,
  )
}