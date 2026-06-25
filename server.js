const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const configDir = path.join(__dirname, 'data');
const configPath = path.join(configDir, 'config.json');

// 获取当前东八区时间 (用来在日志里显示好看的时间格式)
function getFormattedTime() {
    const now = new Date();
    // 加上 8 小时的时差 (北京/香港时间)
    const tzOffset = 8 * 3600 * 1000;
    return new Date(now.getTime() + tzOffset).toISOString().replace('T', ' ').substring(0, 23) + 'Z';
}

// 接口：加载 API Key
app.get('/api/config', (req, res) => {
    try {
        if (fs.existsSync(configPath)) {
            const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            res.json(data);
        } else {
            res.json({});
        }
    } catch (e) {
        res.status(500).json({ error: '读取配置失败' });
    }
});

// 接口：保存 API Key
app.post('/api/config', (req, res) => {
    try {
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: '保存配置失败' });
    }
});

// 【新增接口】：接收前端发送的搜索日志
app.post('/api/log', (req, res) => {
    const { action, query, duration, resultCount, error, message } = req.body;
    const timeString = getFormattedTime();
    
    if (action === 'SEARCH_SUCCESS') {
        console.log(`${timeString} [INFO] 🔍 搜索: "${query}" | 耗时: ${duration}ms | 结果: ${resultCount}条`);
    } else if (action === 'SEARCH_ERROR') {
        console.log(`${timeString} [ERROR] ❌ 失败: "${query}" | 耗时: ${duration}ms | 原因: ${error} | 详细: ${message}`);
    }
    
    res.json({ success: true });
});

// 启动服务器
app.listen(port, () => {
    const timeString = getFormattedTime();
    console.log(`${timeString} [INFO] 已加载配置文件`);
    console.log(`${timeString} [INFO] 服务器已启动，监听端口 ${port}`);
    console.log(`${timeString} [INFO] 静态目录: /app/public`);
    console.log(`${timeString} [INFO] 配置文件: /app/data/config.json`);
});