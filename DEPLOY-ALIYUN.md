# 阿里云生产部署（推送 GitHub 即自动发布）

与恒矽官网（sensor-hx）同一套发布模式：GitHub Actions 将源码打包后经 SSH 直传服务器，
服务器端用 Docker + Caddy 重建静态站点，私密配置仅保存在服务器 `.env`。

## 一、服务器准备（一次性）

1. 阿里云 ECS（推荐 2C2G 起步），安装 Docker 与 docker compose 插件
2. 安全组放行 80 / 443
3. 域名 www.ptm-zj.com 解析 A 记录到 ECS 公网 IP（国内服务器需先完成 ICP 备案）
4. 创建部署目录：`mkdir -p ~/ptm-zj && cp .env.example ~/ptm-zj/.env` 并填入真实 `DP_API_KEY`
5. 生成部署专用 SSH 密钥：`ssh-keygen -t ed25519 -f ~/.ssh/ptm_deploy`，
   将公钥追加到服务器 `~/.ssh/authorized_keys`

## 二、GitHub Secrets 配置（仓库 Settings → Secrets and variables → Actions）

| Secret | 说明 |
|--------|------|
| `ALIYUN_SSH_KEY` | 上一步生成的私钥 |
| `ALIYUN_HOST` | ECS 公网 IP |
| `ALIYUN_USER` | SSH 登录用户 |
| `DP_API_KEY` | DP API Key（注入服务器 .env） |
| `DP_API_BASE` | 默认 `https://api.deepseek.com` |
| `DP_MODEL` | 默认 `deepseek-chat` |
| `FETCH_PROXY` | 抓 YouTube 的代理（可留空） |

## 三、发布流程

`git push` 到 `main` → Actions 自动执行 `.github/workflows/deploy.yml`：

1. 源码打包（排除 .git / node_modules / dist / .env）经 SSH 管道直传服务器
2. 服务器解压到 `~/ptm-zj`，恢复本地 `.env` 并注入最新 DP 配置
3. `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`
   构建 Vite 产物并由 Caddy 托管 `www.ptm-zj.com`（80/443，自动签发 HTTPS 证书，
   裸域 `ptm-zj.com` 301 跳转至 www）

也可在 Actions 页面手动触发（workflow_dispatch）。

## 四、内容管线上云（可选）

技术视界每日自动更新需要在服务器跑管线：

```bash
cd ~/ptm-zj/pipeline
python3 -m venv .venv && .venv/bin/pip install yt-dlp
set -a && source ../.env && set +a
.venv/bin/python -m pipeline run     # 抓取 + DP·AI 处理
.venv/bin/python -m pipeline serve   # 审核台（建议仅内网/SSH 隧道访问）
```

crontab 示例（每日 06:42 抓取，人工审核后导出再重新发布）：

```cron
42 6 * * * cd ~/ptm-zj/pipeline && set -a && . ../.env && set +a && .venv/bin/python -m pipeline run >> /tmp/ptm-pipeline.log 2>&1
```

> 审核台导出 `src/data/videos.generated.ts` 后，重新执行 docker compose 构建（或推送一次 main）即可上线新内容。

## 五、HTTPS

默认已启用：`Caddyfile` 绑定 `www.ptm-zj.com`，Caddy 通过 Let's Encrypt 自动签发并续期证书，
裸域 `ptm-zj.com` 自动 301 跳转至 `www.ptm-zj.com`。前提是：
- 域名 A 记录（`@` 与 `www`）已指向服务器公网 IP
- 安全组放行 80 / 443（80 用于 ACME 证书签发校验，不可只开 443）
- 证书数据持久化在 `caddy_data` 卷中，重建容器不会重复申请证书

如改用上层 SLB / 网关终结 TLS，将 `Caddyfile` 站点地址改回 `:80`、prod 编排只暴露 80 即可。
