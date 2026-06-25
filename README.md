# 影视剧集命名工具 (Movie Naming Tool)

一个专为海量影视剧集文件设计的自动化命名与整理工具。旨在解决下载文件名称杂乱、媒体服务器（如 Plex、Emby、Jellyfin）无法正确识别元数据的问题。通过标准化的命名规则，帮助用户快速构建整洁的本地影视媒体库。

## 🚀 功能特点

- **智能解析**：自动识别影视剧集名称、年份、分辨率、季集编号（如 S01E01）等关键信息。
- **批量重命名**：支持对整个目录下的视频文件进行一键式、规范化的批量重命名。
- **Web 交互界面**：提供直观易用的前端操作页面，支持实时预览重命名效果。
- **轻量高效**：基于 Node.js 开发，运行资源占用极低，支持快速本地部署。
- **容器化支持**：完整支持 Docker 及 Docker Compose，方便在 NAS 或私有服务器中一键部署。

## 🛠️ 技术栈

- **后端**：Node.js / Express
- **前端**：HTML5 / CSS3 / JavaScript
- **容器化**：Docker / Docker Compose

## 📦 快速开始

### 方式一：Docker 部署 (推荐)

推荐直接使用线上托管的 Docker 镜像进行快速部署，无需在本地配置 Node.js 环境。

#### 1. 拉取最新的镜像
```bash
docker pull sumcheung/movie-naming-tool:latest
```

#### 2. Docker Run
你可以直接运行以下命令启动容器：
```bash
docker run -d \
  --name movie-tool \
  -p 3000:3000 \
  -v ./data:/app/data \
  -v ./logs:/app/logs \
  --restart unless-stopped \
  sumcheung/movie-naming-tool:latest
```

#### 3. Docker Compose (推荐)
你也可以在项目根目录下创建 `docker-compose.yml` 文件，内容配置如下：
```yaml
services:
  movie-tool:
    image: sumcheung/movie-naming-tool:latest
    container_name: movie-naming-tool 
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    restart: unless-stopped
```
在文件所在目录下执行以下命令即可静默启动：
```bash
docker-compose up -d
```

---

### 方式二：本地源码运行

1. **克隆仓库**
   ```bash
   git clone [https://github.com/sumcheung/movie-naming-tool.git](https://github.com/sumcheung/movie-naming-tool.git)
   cd movie-naming-tool
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动服务**
   ```bash
   npm start
   ```
   服务启动后，在浏览器访问 `http://localhost:3000`。

## 📂 目录结构

```text
movie-naming-tool/
├── public/             # 前端静态资源界面
│   └── index.html      # 主操作页面
├── server.js           # 后端核心服务逻辑
├── package.json        # 项目依赖及脚本配置
├── Dockerfile          # Docker 镜像构建文件
├── docker-compose.yml  # Docker 容器编排配置文件
├── .gitignore          # Git 忽略文件配置
└── README.md           # 项目说明文档
```

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 开源协议。