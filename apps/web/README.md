# Web 用户前台

基于 Next.js 16 的用户前台应用，使用共享 UI 组件、API 契约和 TanStack React Query。

## 开发

```bash
pnpm dev
```

默认访问 [http://localhost:3005](http://localhost:3005)。从仓库根目录启动该应用：

```bash
pnpm dev:web
```

## 环境变量

服务端需要配置 `API_BASE_URL`，用于调用 API 服务。环境变量会经过 Zod 校验，具体配置方式见仓库文档 [环境变量配置指南](../../docs/env-config-guide.md)。

## 常用命令

```bash
pnpm check-types
pnpm lint
pnpm build
```

## 认证与 API

认证相关方法位于 `src/auth/`，包括登录、刷新会话、启动时恢复会话和退出登录。`src/lib/http-client.ts` 提供自动附加 access token、处理 401 刷新并重试的 `authFetch`。

当前前端约定的认证接口包括：

- `POST /auth/web/password/login`
- `POST /auth/web/token/refresh`
- `POST /auth/web/logout`

当前 API 应用尚未实现这些认证路由，需要由服务端或网关提供。
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
