# API 接口服务

基于 Hono 和 Cloudflare Workers 的后端接口服务，当前提供统一响应格式、健康检查和 RPC ping 接口。

## 开发

```bash
pnpm dev
```

Wrangler 默认启动本地开发服务。健康检查地址为 `GET /health`，RPC 接口为 `POST /rpc/system/ping`。

## 部署

```bash
pnpm deploy
```

部署前可以根据 Worker 配置生成类型：

```bash
pnpm cf-typegen
```

## 类型与响应

API 类型定义位于 `packages/contracts`，成功响应包含 `ok: true`、`data` 和 `meta`，失败响应包含 `ok: false`、`error` 和 `meta`。

## 当前边界

用户认证相关的 `/auth/web/...` 路由目前由 Web 端调用约定，尚未在本应用中实现。认证服务接入后，应继续复用 `packages/contracts` 中的响应结构。

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
