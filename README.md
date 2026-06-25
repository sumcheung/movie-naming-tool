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

### 方式一：本地运行

1. **克隆仓库**
   ```bash
   git clone [https://github.com/sumcheung/movie-naming-tool.git](https://github.com/sumcheung/movie-naming-tool.git)
   cd movie-naming-tool