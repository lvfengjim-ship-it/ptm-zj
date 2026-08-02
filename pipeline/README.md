# PTM AI 内容管线

为官网「AI 技术视界」栏目提供 **定时抓取 → DP·AI 处理 → 人工审核 → 多端分发** 的自动化后端。
零第三方强制依赖（Python 3.10+ 标准库），视频抓取使用 yt-dlp（可选安装）。

## 架构

```
┌─────────────┐   ┌──────────────┐   ┌─────────────┐   ┌────────────────────┐
│ 抓取层       │ → │ DP·AI 处理层  │ → │ 审核入库     │ → │ 分发层              │
│ yt-dlp 搜索  │   │ DP API 分类   │   │ SQLite       │   │ 官网 videos.generated│
│ YouTube/B站  │   │ 摘要/翻译     │   │ 本地审核台    │   │ 公众号草稿/视频号脚本 │
│ RSS 订阅源   │   │ (仅服务端)    │   │ 127.0.0.1:8765│   │ (开通后接微信API)   │
└─────────────┘   └──────────────┘   └─────────────┘   └────────────────────┘
```

## 快速开始

```bash
cd pipeline
cp config.example.json config.json      # 按需修改搜索关键词、运行时间
export DP_API_KEY="你的 DP API Key"     # 推荐用环境变量，与恒矽传感器同套 API 配置
python3 -m pip install yt-dlp           # 视频抓取需要（可选，无它可纯 RSS 运行）
```

| 命令 | 说明 |
|---|---|
| `python3 -m pipeline run` | 执行一轮：抓取 → DP·AI 摘要分类 → 入库待审 |
| `python3 -m pipeline run --mock` | 无网络/无 Key 时用演示数据联调整条链路 |
| `python3 -m pipeline serve` | 启动审核台 http://127.0.0.1:8765（通过/驳回/一键导出） |
| `python3 -m pipeline export` | 命令行导出官网数据 + 微信草稿 |
| `python3 -m pipeline schedule` | 常驻进程，每日 `run_time` 自动执行 run |
| `python3 -m pipeline stats` | 查看库内各状态条数 |

## 配置项（config.json）

| 字段 | 说明 |
|---|---|
| `dp_api_base` / `dp_model` | DP API 接入点与模型（OpenAI 兼容接口） |
| `dp_api_key` | 建议留空，改用环境变量 `DP_API_KEY` 传入 |
| `fetch.youtube_queries` / `fetch.bilibili_queries` | 搜索关键词（海内外分开配置） |
| `fetch.rss_feeds` | RSS/Atom 订阅源（支持 YouTube 频道 RSS，无需 Key） |
| `fetch.proxy` | 抓 YouTube 需要的代理，如 `http://127.0.0.1:7890` |
| `fetch.cookies_from_browser` | B 站反爬（412）时使用，如 `chrome`，读取本机浏览器登录态 |
| `run_time` | 每日自动运行时间（默认 06:42） |
| `review_port` | 审核台端口（默认 8765） |

## 安全与合规

- **API Key 只在服务端**：通过环境变量或本地 `config.json` 读取，绝不进入前端代码；页面统一使用「DP·AI」简称。
- **版权合规**：管线只抓取公开视频的标题/时长/链接等元数据，官网展示为摘要卡片并跳转原视频，不下载、不转载视频本体。请定期检查各平台 robots 协议与服务条款。
- **人工把关**：所有内容必须经审核台人工通过后才发布，`--mock` 数据不会自动上线。

## 每日定时（macOS launchd）

也可以用系统级定时代替 `pipeline schedule`。新建 `~/Library/LaunchAgents/com.ptm.content-pipeline.plist`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.ptm.content-pipeline</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/env</string><string>python3</string><string>-m</string><string>pipeline</string><string>run</string>
  </array>
  <key>WorkingDirectory</key><string>/Users/jimlyu/Documents/kimi/workspace/ptm-zj/pipeline</string>
  <key>EnvironmentVariables</key><dict><key>DP_API_KEY</key><string>填入你的Key</string></dict>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>6</integer><key>Minute</key><integer>42</integer></dict>
  <key>StandardOutPath</key><string>/tmp/ptm-pipeline.log</string>
  <key>StandardErrorPath</key><string>/tmp/ptm-pipeline.log</string>
</dict></plist>
```

加载：`launchctl load ~/Library/LaunchAgents/com.ptm.content-pipeline.plist`
（生产环境建议部署到 Linux 服务器 + cron，目录路径相应调整。）

## 微信生态接入（账号开通后）

1. 公众号：在微信公众平台获取 AppID/AppSecret（仅放服务端环境变量），
   在 `pipeline/publisher.py` 中调用「草稿箱」接口（`POST /cgi-bin/draft/add`）推送 `data/drafts/公众号草稿-*.md` 的排版内容。
2. 视频号：通过「视频号助手」网页版或开放接口上传，脚本见 `data/drafts/视频号脚本-*.md`。
3. 开通后将账号二维码替换官网 `src/sections/AiHub.tsx` 中 WeChatPanel 的占位图。

## 文件结构

```
pipeline/
├── config.example.json     # 配置模板（复制为 config.json 使用）
├── pipeline/
│   ├── __init__.py         # 配置加载（环境变量优先）
│   ├── __main__.py         # CLI: run / serve / export / schedule / stats
│   ├── fetchers.py         # yt-dlp 搜索 + RSS 抓取
│   ├── dp_ai.py            # DP API 分类 / 摘要 / 翻译
│   ├── db.py               # SQLite 存储与审核状态机
│   ├── publisher.py        # 官网数据导出 + 微信草稿生成
│   └── review_server.py    # 零依赖本地审核台
└── data/                   # pipeline.db 与微信草稿（运行时生成）
```
