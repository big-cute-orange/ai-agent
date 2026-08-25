import { SignJWT } from 'jose'

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)

interface IssueAccessTokenParams {
  userId: string
  sessionId: string
  application: 'web' | 'admin'
  roles: string[]
}

export const issueAccessToken = async (params: IssueAccessTokenParams) => {
  return new SignJWT({
    sid: params.sessionId,
    app: params.application,
    roles: params.roles,
  })
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
      kid: 'access-hs256-v1',
    })
    .setSubject(params.userId)
    .setIssuer('keepzml-api')
    .setAudience(params.application)
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(accessSecret)
}