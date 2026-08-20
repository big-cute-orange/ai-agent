import { getWebServerEnv } from '../src/env.server'
import { WebEnvBadge } from '../src/web-env-badge'
import { hc } from 'hono/client'
import type { AppType } from '@repo/api'
import type { ApiResponse, PingResponse, PingRequest } from '@repo/contracts'

async function getPingResponse(apiBaseUrl: string): Promise<ApiResponse<PingResponse>> {
  const client = hc<AppType>(apiBaseUrl)

  const rpcPayload: PingRequest = {
    name: 'web-app'
  }

  const response = await client.rpc.system.ping.$post({
    json: rpcPayload,
  })

  return await response.json() as ApiResponse<PingResponse>
}

export default async function Home() {
  const env = getWebServerEnv()
  const pingResult = await getPingResponse(env.API_BASE_URL)

  console.log('Ping result:', pingResult)

  return (
    <section>
      <span>server {env.APP_ENV}</span>
      <span>{env.API_BASE_URL}</span>
      <WebEnvBadge />
    </section>
  )
}