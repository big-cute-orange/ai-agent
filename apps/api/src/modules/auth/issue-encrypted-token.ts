import { EncryptJWT, jwtDecrypt } from 'jose'

const encryptionKey = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY)

export const issueEncryptedToken = async (payload: Record<string, unknown>) => {
  return new EncryptJWT(payload)
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
      typ: 'JWT',
    })
    .setIssuer('keepzml-api')
    .setAudience('web')
    .setIssuedAt()
    .setExpirationTime('15m')
    .encrypt(encryptionKey)
}

export const decryptToken = async (token: string) => {
  const { payload, protectedHeader } = await jwtDecrypt(token, encryptionKey, {
    issuer: 'keepzml-api',
    audience: 'web',
  })

  return { payload, protectedHeader }
}