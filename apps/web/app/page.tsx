'use client'

import type { AppType } from '@repo/api'
import {
  BizCode,
  type ApiResponse,
  type PingRequest,
  type PingResponse,
} from '@repo/contracts'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'
import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { hc, type InferResponseType } from 'hono/client'
import { useState } from 'react'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8787'
const rpcPayload: PingRequest = { name: 'web' }

type PingRpcResponse = InferResponseType<
  ReturnType<typeof hc<AppType>>['rpc']['system']['ping']['$post']
>

async function getPingResponse(): Promise<PingRpcResponse> {
  const client = hc<AppType>(apiBaseUrl)

  try {
    const response = await client.rpc.system.ping.$post({
      json: rpcPayload,
    })

    return await response.json()
  } catch (error) {
    return {
      ok: false,
      error: {
        code: BizCode.SYSTEM_UPSTREAM_TIMEOUT,
        message: error instanceof Error ? error.message : 'API request failed',
      },
      meta: {
        requestId: 'unavailable',
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiResponse<PingResponse>
  }
}

export default function Home() {
  const [pingResult, setPingResult] = useState<PingRpcResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handlePing() {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setPingResult(await getPingResponse())
    setIsLoading(false)
  }

  const requestBody = JSON.stringify(rpcPayload, null, 2)
  const responseBody = pingResult
    ? JSON.stringify(pingResult, null, 2)
    : 'Waiting for API response...'

  return (
    <main className="mx-auto grid w-full max-w-240 gap-6 p-6 md:p-10">
      <TailwindDemo appName="web" />

      <Card>
        <CardHeader>
          <CardTitle>Shared request and response contract</CardTitle>
          <CardDescription>
            The web app calls the API through Hono RPC using the shared contracts package.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap gap-2 text-sm text-content-secondary">
            <span className="rounded-full border border-border-default px-3 py-1">
              POST /rpc/system/ping
            </span>
            <span className="rounded-full border border-border-default px-3 py-1">
              {pingResult
                ? pingResult.ok
                  ? 'ok=true'
                  : `code=${pingResult.error.code}`
                : 'not requested'}
            </span>
            <Button type="button" onClick={handlePing} disabled={isLoading}>
              {isLoading ? 'Requesting...' : 'Send ping'}
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border-default bg-surface-canvas p-4">
              <p className="text-sm font-medium text-content-primary">Request</p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                {requestBody}
              </pre>
            </div>

            <div className="rounded-xl border border-border-default bg-surface-canvas p-4">
              <p className="text-sm font-medium text-content-primary">Response</p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                {responseBody}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
