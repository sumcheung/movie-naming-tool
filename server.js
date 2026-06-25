const express = require('express');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const app = express();
const PORT = process.env.PORT || 3000; // 允许通过环境变量修改端口

// ---------- 日志配置 ----------
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

// 创建日志记录器
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // 输出到控制台（docker logs可见）
        new DailyRotateFile({
            filename: path.join(logDir, 'app-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',          // 单个文件最大20MB
            maxFiles: '7d',          // 保留最近7天的日志
            zippedArchive: true      // 压缩旧日志
        })
    ]
});

// ---------- 中间件 ----------
app.use(express.json()); // 解析JSON请求体
app.use(express.static(path.join(__dirname, 'public'))); // 托管静态文件

// ---------- 数据目录与配置文件 ----------
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const configPath = path.join(dataDir, 'config.json');

// 读取或初始化配置
let config = { apiKey: '' };
if (fs.existsSync(configPath)) {
    try {
        const content = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(content);
        logger.info('已加载配置文件');
    } catch (e) {
        logger.error('读取 config.json 失败，使用默认配置', e);
    }
} else {
    // 如果不存在，创建默认配置
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    logger.info('已创建默认配置文件');
}

// ---------- API 路由 ----------
// 获取配置（返回 apiKey）
app.get('/api/config', (req, res) => {
    res.json({ apiKey: config.apiKey || '' });
});

// 保存配置（接收 apiKey）
app.post('/api/config', (req, res) => {
    const { apiKey } = req.body;
    if (apiKey === undefined) {
        return res.status(400).json({ error: '缺少 apiKey 字段' });
    }
    config.apiKey = apiKey.trim();
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        logger.info('API Key 已更新');
        res.json({ success: true });
    } catch (e) {
        logger.error('写入 config.json 失败', e);
        res.status(500).json({ error: '写入配置文件失败' });
    }
});

// ---------- 启动服务器 ----------
app.listen(PORT, () => {
    logger.info(`服务器已启动，监听端口 ${PORT}`);
    logger.info(`静态目录: ${path.join(__dirname, 'public')}`);
    logger.info(`配置文件: ${configPath}`);
});