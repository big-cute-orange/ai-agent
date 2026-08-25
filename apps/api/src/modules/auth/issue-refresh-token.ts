const sha256Hex = async (value: string) => {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)

  return Array.from(new Uint8Array(digest))
    .map((item) => item.toString(16).padStart(2, '0'))
    .join('')
}

const generateRefreshToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(32))

  return Array.from(bytes)
    .map((item) => item.toString(16).padStart(2, '0'))
    .join('')
}

export const issueRefreshToken = async (sessionId: string) => {
  const token = generateRefreshToken()
  const tokenHash = await sha256Hex(token)

  await db.insert(refreshTokens).values({
    sessionId,
    jtiHash: tokenHash,
    expiresAtMs: Date.now() + 1000 * 60 * 60 * 24 * 14,
  })

  return token
}