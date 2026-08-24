# AI Agent 平台

基于 [Turborepo](https://turborepo.dev) + pnpm 构建的 monorepo 项目，包含用户前台、管理后台和后端接口服务。

## 项目结构

```
ai-agent/
├── apps/
│   ├── web/      # 用户前台 (Next.js 16, 端口 3005)
│   ├── admin/    # 管理后台 (Next.js 16, 端口 3006)
│   └── api/      # 后端接口 (Hono + Cloudflare Workers)
└── packages/
    ├── ui/                  # 共享 React 组件库 (@repo/ui)
    ├── eslint-config/       # 共享 ESLint 配置
    └── typescript-config/   # 共享 TypeScript 配置
```

## 技术栈

| 层级   | 技术                                 |
| ------ | ------------------------------------ |
| 框架   | Next.js 16 + React 19                |
| 样式   | Tailwind CSS v4 + shadcn/ui 组件原语 |
| 后端   | Hono v4 + Cloudflare Workers         |
| 构建   | Turborepo v2 + pnpm workspace        |
| 语言   | TypeScript 5.9                       |
| 包管理 | pnpm 11 (catalog 版本锁定)           |

## 快速开始

**安装依赖（Node >= 18）：**

```sh
pnpm install
```

**启动所有应用（开发模式）：**

```sh
pnpm dev
```

**启动单个应用：**

```sh
pnpm dev:web    # http://localhost:3005
pnpm dev:admin  # http://localhost:3006
pnpm dev:api    # Wrangler dev server
```

## 构建与检查

```sh
pnpm build          # 构建所有应用
pnpm lint           # 全局 lint 检查
pnpm check-types    # 全局类型检查
pnpm format         # 格式化所有 .ts/.tsx/.md 文件

# 单应用构建
pnpm build --filter=web
pnpm build --filter=admin
```

## API 部署

后端使用 [Cloudflare Workers](https://workers.cloudflare.com/) + [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 部署：

```sh
cd apps/api
pnpm deploy         # 部署到 Cloudflare Workers
pnpm cf-typegen     # 生成 Cloudflare Bindings 类型
```

健康检查端点：`GET /health`，返回统一的成功响应：

```json
{
  "ok": true,
  "data": {
    "service": "api",
    "message": "...",
    "env": "development"
  },
  "meta": {
    "requestId": "...",
    "timestamp": "..."
  }
}
```

Web 应用通过 `API_BASE_URL` 调用 API，并使用共享的 RPC 类型和契约。

## Web 认证基础能力

`apps/web/src/auth/` 提供以下前端认证能力：

- 密码登录并保存内存中的 access token
- 使用 refresh token 恢复和刷新会话
- 退出登录时调用 `/auth/web/logout` 并清理本地 token
- 认证请求自动附加 Bearer token，并在收到 401 时刷新后重试

认证接口需要由对应的服务端或网关提供；当前 `apps/api` 仅实现健康检查和 RPC ping 接口。

## 共享 UI 组件

组件位于 `packages/ui`，通过 `@repo/ui` 引用：

```tsx
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
```

组件基于 [Radix UI](https://www.radix-ui.com/) 原语 + [CVA](https://cva.style/) 变体管理，样式工具通过 `@repo/ui/lib/utils` 的 `cn()` 函数合并。

## 共享 Tailwind 主题

主题 token 位于 `packages/ui/src/theme.css`，在各子站的 `globals.css` 中导入：

```css
@import 'tailwindcss';
@import '@repo/ui/theme.css';
```

可用的自定义 token：

| Token                    | 值                   | 说明       |
| ------------------------ | -------------------- | ---------- |
| `--color-brand-50`       | `#f3f7ff`            | 品牌色最浅 |
| `--color-brand-100`      | `#dce8ff`            | 品牌色浅   |
| `--color-brand-500`      | `#4f7cff`            | 品牌主色   |
| `--color-brand-600`      | `#315ee8`            | 品牌色深   |
| `--color-brand-700`      | `#2749bb`            | 品牌色最深 |
| `--color-surface-strong` | `rgba(15,23,42,.78)` | 深色蒙层   |
| `--shadow-card`          | `0 24px 60px ...`    | 卡片阴影   |
| `--radius-card`          | `1.5rem`             | 卡片圆角   |

## 远程缓存（可选）

Turborepo 支持通过 Vercel 共享构建缓存，加速 CI 和团队协作：

```sh
turbo login
turbo link
```

详见 [Remote Caching 文档](https://turborepo.dev/docs/core-concepts/remote-caching)。
