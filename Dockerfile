# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app

# 安装必要的系统依赖
RUN apk add --no-cache libc6-compat

# 复制依赖文件
COPY package*.json ./
# 安装所有依赖（包括开发依赖，因为需要构建）
RUN npm ci

# 复制项目源代码
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 运行阶段
FROM node:20-alpine
WORKDIR /app

# 安装必要的系统依赖
RUN apk add --no-cache libc6-compat

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 复制依赖文件
COPY package*.json ./
# 只安装生产依赖
RUN npm ci --only=production

# 从构建阶段复制必要文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 2>/dev/null || echo "No next.config file"

# 更改文件所有者
RUN chown -R nextjs:nodejs /app/.next
RUN chown -R nextjs:nodejs /app/public

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"]
