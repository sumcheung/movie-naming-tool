FROM node:18-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）
COPY package*.json ./
RUN npm install --production

# 复制源代码
COPY server.js ./
COPY public ./public

# 创建数据目录和日志目录（容器内）
RUN mkdir -p /app/data /app/logs

# 暴露容器内端口 3000（可被映射）
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]