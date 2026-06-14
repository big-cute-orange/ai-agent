# AI Agent 平台

基于 [Turborepo](https://turborepo.dev) + pnpm 构建的 monorepo 项目，包含多个前端子站和共享包。

## 项目结构

```
ai-agent/
├── apps/
│   ├── admin/    # 管理后台 (Next.js, 端口 3006)
│   ├── web/      # 用户前台 (Next.js, 端口 3005)
│   └── api/      # 后端接口 (Cloudflare Workers + Hono)
└── packages/
    ├── ui/                  # 共享 React 组件库
    ├── eslint-config/       # 共享 ESLint 配置
    └── typescript-config/   # 共享 TypeScript 配置
```

## 技术栈

- **框架**：Next.js 16 + React 19
- **样式**：Tailwind CSS v4（共享主题 token）
- **后端**：Hono + Cloudflare Workers
- **构建**：Turborepo + pnpm workspace
- **语言**：TypeScript

## 快速开始

安装依赖：

```sh
pnpm install
```

启动所有应用（开发模式）：

```sh
pnpm dev
```

启动单个应用：

```sh
pnpm dev --filter=web
pnpm dev --filter=admin
```

## 构建

构建所有应用：

```sh
pnpm build
```

构建单个应用：

```sh
pnpm build --filter=web
```

## 共享 UI 与样式

共享组件位于 `packages/ui`，通过 `@repo/ui` 引用：

```tsx
import { Button } from '@repo/ui/button'
```

共享 Tailwind 主题 token 位于 `packages/ui/src/theme.css`，在各子站的 `globals.css` 中导入：

```css
@import 'tailwindcss';
@import '@repo/ui/theme.css';
```

可用的自定义 token：

| Token | 说明 |
|---|---|
| `brand-50` ~ `brand-700` | 品牌色阶 |
| `surface-strong` | 深色蒙层色 |
| `shadow-card` | 卡片阴影 |
| `radius-card` | 卡片圆角 |

## 远程缓存（可选）

Turborepo 支持通过 Vercel 共享构建缓存，加速 CI 和团队协作：

```sh
turbo login
turbo link
```

详见 [Remote Caching 文档](https://turborepo.dev/docs/core-concepts/remote-caching)。
