# 彭田新材料 PTM-ZJ 官网

彭田新材料（镇江）有限公司官方网站（www.ptm-zj.com）—— 高性能新材料产品展示与「技术视界」行业科普平台。

## 核心板块

| 板块 | 锚点 | 说明 |
|------|------|------|
| 公司介绍 | `/#about` | 愿景使命、环保承诺、江苏科技大学产学研合作 |
| 产品中心 | `/#products` | 防火防辐射封堵材料 / 核电吸酸枕 / 复合材料粘结剂 / 自动化设备四大产品线 |
| 应用领域 | `/#fields` | 核电、石油化工、电力、轨道交通、高层建筑、造船、低空飞行器、智慧矿山 |
| 技术视界 | `/#ai-hub` | DP·AI 引擎自动聚合海内外新材料技术视频（核能/氢能/光伏/风电/储能/动力电池），摘要 + 翻译 + 人工审核后发布 |
| 生产质量 | `/#quality` | ISO 9001 / 14001 / 45001 体系、共建检测实验室、专利布局 |

## 内容管线（pipeline/）

技术视界的数据后端：定时抓取 → DP·AI 摘要分类 → 人工审核 → 导出官网 + 微信草稿。

- **抓取**：yt-dlp 搜索 YouTube / B 站公开视频元数据（免 Key），支持 RSS、代理与浏览器 Cookie
- **AI 处理**：DP API（OpenAI 兼容接口），Key 仅存服务端环境变量 `DP_API_KEY`，页面统一使用「DP·AI」简称
- **审核**：本地审核台 `http://127.0.0.1:8765`（通过 / 驳回 / 一键导出）
- **分发**：导出 `src/data/videos.generated.ts`（前端自动优先展示，空则回退示例），生成公众号图文与视频号脚本草稿

```bash
cd pipeline
python3 -m pipeline run        # 抓取 → AI 处理 → 入库待审
python3 -m pipeline serve      # 审核台
python3 -m pipeline schedule   # 常驻，每日自动运行
```

详见 [pipeline/README.md](pipeline/README.md)。

## 技术栈

- **前端**：React + TypeScript + Vite + Tailwind CSS + shadcn/ui（全站微软雅黑，PTM 红 #C72A1D）
- **内容管线**：Python 标准库 + SQLite（零强制三方依赖）
- **部署**：Docker + Caddy 静态托管（见 `Dockerfile` / `Caddyfile`）

## 本地开发

```bash
npm install
npm run dev       # http://localhost:3000
```

## 构建与运行

```bash
npm run build            # 产物 dist/（纯静态站点）
docker compose up -d     # 或容器化运行 http://localhost:8080
```

部署：

- **阿里云生产环境（推送 GitHub 即自动发布）**见 **[DEPLOY-ALIYUN.md](DEPLOY-ALIYUN.md)**
- 私密配置不入仓库：服务器 `.env` 保存 `DP_API_KEY` 等，Actions 部署时自动注入

## 目录结构

```
src/          前端页面与组件
  sections/   Navbar / Hero / About / Products / Fields / AiHub / Quality / Footer
  data/       站点内容数据 + 管线生成的 videos.generated.ts
pipeline/     技术视界内容管线（抓取 / DP·AI / 审核台 / 分发）
public/       静态资源
```

## 后续规划

- [ ] 公众号 / 视频号账号开通后接入微信草稿箱接口，替换页面二维码占位
- [ ] 内容管线部署上云，接入服务器 cron 每日自动运行
- [ ] ICP 备案完成后正式启用 www.ptm-zj.com
