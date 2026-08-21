import {
  BizCode,
  PingRequestSchema,
  buildFailure,
  buildSuccess,
  type ApiMeta,
} from '@repo/contracts'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { getApiEnv } from './env'

type AppErrorStatus = 400 | 401 | 403 | 404 | 409 | 422 | 500 | 504

class AppError extends Error {
  constructor(
    readonly code: BizCode,
    message: string,
    readonly status: AppErrorStatus,
    readonly details?: unknown,
  ) {
    super(message)
  }
}

const app = new Hono<{
  Bindings: {
    APP_ENV: 'development' | 'test' | 'production'
  }
}>()

app.use('*', cors())

function createMeta(): ApiMeta {
  return {
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  }
}

app.onError((error, c) => {
  const meta = createMeta()

  if (error instanceof AppError) {
    const errorMsg = { code: error.code, message: error.message, details: error.details }
    const res = buildFailure(errorMsg, meta);
    return c.json(res, error.status);
  }

  if (error instanceof HTTPException) {
    const errorMsg = { code: BizCode.COMMON_INVALID_REQUEST, message: error.message }
    const res = buildFailure(errorMsg, meta);
    return c.json(res, error.status);
  }

  console.error(error)

  const errorMsg = { code: BizCode.SYSTEM_INTERNAL_ERROR, message: 'Internal server error' }
  const res = buildFailure(errorMsg, meta);
  return c.json(res, 500);
})

app.notFound((c) => {
  const errorMsg = { code: BizCode.COMMON_NOT_FOUND, message: 'Not found' }
  const res = buildFailure(errorMsg, createMeta());
  return c.json(res, 404);
})

const routes = app
  .get('/health', (c) => {
    const env = getApiEnv(c.env)
    const res = buildSuccess({ service: 'api', env: env.APP_ENV }, createMeta());
    return c.json(res);
  })
  .post(
  '/rpc/system/ping',
  zValidator('json', PingRequestSchema, (result, c) => {
    if (result.success) {
      return
    }

    const res = {
      code: BizCode.COMMON_INVALID_REQUEST,
      message: 'Invalid request payload',
      details: result.error.issues,
    }

    return c.json(buildFailure(res, createMeta()), 400)
  }),
  (c) => {
    const payload = c.req.valid('json')
    const env = getApiEnv(c.env)

    return c.json(
      buildSuccess(
        {
          service: 'api',
          message: `pong, ${payload.name}`,
          env: env.APP_ENV,
        },
        createMeta(),
      ),
    )
  },
)

export type AppType = typeof routes;

export default app;