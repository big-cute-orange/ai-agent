import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui','@repo/contracts', '@repo/api'],
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },
}

export default nextConfig
