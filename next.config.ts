import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        // 忽略 TypeScript 构建错误
        ignoreBuildErrors: true,
    },
    eslint: {
        // 忽略 ESLint 构建错误
        ignoreDuringBuilds: true,
    },
    // 启用 Turbopack（与您的 package.json 中的 --turbopack 对应）
    experimental: {
        turbo: {}
    }
};

export default nextConfig;