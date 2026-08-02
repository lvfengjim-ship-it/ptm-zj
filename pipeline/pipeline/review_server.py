"""审核界面：零依赖本地网页（Python 标准库实现）。

待审列表 → 通过 / 驳回 → 一键导出官网 + 生成微信草稿。
默认 http://127.0.0.1:8765
"""
from __future__ import annotations

import html
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

from . import DB_PATH, load_config
from . import db as dbm
from .publisher import export_site, export_wechat_drafts

PAGE = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PTM · AI 内容审核台</title>
<style>
  body {{ font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", sans-serif;
         background: #F7F6F4; color: #262626; margin: 0; }}
  header {{ background: #C72A1D; color: #fff; padding: 18px 32px; display: flex;
           justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }}
  header h1 {{ font-size: 18px; margin: 0; }}
  .stats {{ font-size: 13px; opacity: .9; }}
  main {{ max-width: 1080px; margin: 24px auto; padding: 0 16px; }}
  .card {{ background: #fff; border: 1px solid #e5e5e5; border-radius: 12px;
          padding: 18px 20px; margin-bottom: 14px; }}
  .meta {{ font-size: 12px; color: #8c8c8c; margin: 6px 0 10px; }}
  .badge {{ display: inline-block; background: #FCEBE9; color: #C72A1D; border-radius: 999px;
           padding: 2px 10px; font-size: 12px; margin-right: 6px; }}
  .summary {{ font-size: 13px; color: #595959; background: #F7F6F4; border-radius: 8px;
             padding: 10px 12px; margin: 10px 0; }}
  form {{ display: inline; }}
  button {{ border: 0; border-radius: 8px; padding: 8px 18px; font-size: 13px;
           cursor: pointer; font-family: inherit; }}
  .ok {{ background: #C72A1D; color: #fff; }}
  .no {{ background: #fff; color: #595959; border: 1px solid #d4d4d4; }}
  .bar {{ display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }}
  .bar button {{ background: #262626; color: #fff; }}
  a {{ color: #C72A1D; text-decoration: none; }}
  .empty {{ text-align: center; color: #8c8c8c; padding: 60px 0; }}
  .tabs a {{ margin-right: 14px; font-size: 14px; }}
  .tabs .on {{ font-weight: 700; }}
</style></head><body>
<header>
  <h1>PTM · AI 技术视界内容审核台</h1>
  <span class="stats">{stats}</span>
</header>
<main>
  <div class="tabs">
    <a href="/?status=pending" class="{tab_pending}">待审核</a>
    <a href="/?status=approved" class="{tab_approved}">已通过</a>
    <a href="/?status=published" class="{tab_published}">已发布</a>
    <a href="/?status=rejected" class="{tab_rejected}">已驳回</a>
  </div>
  <div class="bar">
    <form method="post" action="/export"><button>导出到官网 + 生成微信草稿</button></form>
  </div>
  {rows}
</main></body></html>"""

ROW = """<div class="card">
  <div><span class="badge">{category}</span><span class="badge">{region}</span>
       <strong>{title}</strong></div>
  <div class="meta">{platform} ｜ {source} ｜ {published} ｜ {duration} ｜
    <a href="{url}" target="_blank" rel="noopener">原视频</a></div>
  <div class="summary">DP·AI 摘要：{summary}</div>
  {actions}
</div>"""

ACTIONS = """<form method="post" action="/decide">
  <input type="hidden" name="id" value="{vid}">
  <button class="ok" name="action" value="approve">通过</button>
  <button class="no" name="action" value="reject">驳回</button>
</form>"""


def _render(conn, status: str) -> str:
    rows = dbm.list_by_status(conn, status, 200)
    if not rows:
        body = '<div class="empty">暂无内容</div>'
    else:
        parts = []
        for r in rows:
            actions = ACTIONS.format(vid=r["id"]) if status == "pending" else ""
            parts.append(ROW.format(
                category=html.escape(r["category"] or "未分类"),
                region=html.escape(r["region"] or "—"),
                title=html.escape(r["title"]),
                platform=r["platform"], source=html.escape(r["source_name"] or "—"),
                published=html.escape((r["published"] or "")[:10]),
                duration=html.escape(r["duration"] or "—"),
                url=html.escape(r["url"], quote=True),
                summary=html.escape(r["summary"] or "（待处理）"),
                actions=actions,
            ))
        body = "\n".join(parts)
    st = dbm.stats(conn)
    stats_text = "　".join(f"{k}:{v}" for k, v in sorted(st.items())) or "空库"
    return PAGE.format(
        stats=html.escape(stats_text), rows=body,
        tab_pending="on" if status == "pending" else "",
        tab_approved="on" if status == "approved" else "",
        tab_published="on" if status == "published" else "",
        tab_rejected="on" if status == "rejected" else "",
    )


class Handler(BaseHTTPRequestHandler):
    def _send(self, text: str, code: int = 200):
        data = text.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        q = parse_qs(urlparse(self.path).query)
        status = q.get("status", ["pending"])[0]
        if status not in ("pending", "approved", "published", "rejected"):
            status = "pending"
        conn = dbm.connect(DB_PATH)
        self._send(_render(conn, status))
        conn.close()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        form = parse_qs(self.rfile.read(length).decode())
        conn = dbm.connect(DB_PATH)
        cfg = load_config()
        if self.path == "/decide":
            vid = form.get("id", [""])[0]
            action = form.get("action", [""])[0]
            if vid and action in ("approve", "reject"):
                dbm.set_status(conn, vid, "approved" if action == "approve" else "rejected")
        elif self.path == "/export":
            export_site(conn, cfg)
            export_wechat_drafts(conn)
        conn.close()
        self.send_response(303)
        self.send_header("Location", "/?status=pending")
        self.end_headers()

    def log_message(self, *args):  # 静音访问日志
        pass


def serve(port: int):
    print(f"审核台已启动: http://127.0.0.1:{port}  (Ctrl+C 停止)")
    HTTPServer(("127.0.0.1", port), Handler).serve_forever()
