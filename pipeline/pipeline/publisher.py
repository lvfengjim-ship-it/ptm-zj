"""分发层：导出官网数据源 + 生成公众号图文草稿 / 视频号脚本。

- 官网：写出 site/src/data/videos.generated.ts，前端自动优先使用真实数据
- 微信：公众号 / 视频号账号开通前，产出排版草稿文件；
        开通后可在 publish_wechat() 中接入微信草稿箱 API（appid/secret 仅放服务端）
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from . import DRAFTS_DIR, SITE_DATA_DIR
from . import db as dbm

TS_HEADER = """// 本文件由 AI 内容管线自动生成，请勿手工编辑。
// 生成时间: {ts}
import type {{ TechVideo }} from './videos'

export const generatedVideos: TechVideo[] = """

EXTRA_FIELDS = """
export const generatedMeta = {{ updatedAt: '{ts}' }}
"""


def export_site(conn, cfg: dict) -> int:
    rows = dbm.list_approved(conn, int(cfg.get("max_publish", 30)))
    items = []
    for r in rows:
        items.append({
            "id": r["id"],
            "title": r["title"],
            "category": r["category"] or "储能",
            "region": r["region"] or "国内",
            "source": r["source_name"] or "行业媒体",
            "duration": r["duration"] or "",
            "date": (r["published"] or "")[:10] or (r["created_at"] or "")[:10],
            "summary": r["summary"],
            "hot": bool(r["hot"]),
            "url": r["url"],
        })
    SITE_DATA_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().isoformat(timespec="seconds")
    payload = json.dumps(items, ensure_ascii=False, indent=2)
    (SITE_DATA_DIR / "videos.generated.ts").write_text(
        TS_HEADER.format(ts=ts) + payload + "\n" + EXTRA_FIELDS.format(ts=ts),
        encoding="utf-8",
    )
    print(f"[publish] 官网数据已导出 {len(items)} 条 -> {SITE_DATA_DIR / 'videos.generated.ts'}")
    return len(items)


def export_wechat_drafts(conn) -> tuple[Path, Path] | None:
    """为「已通过但未发布」的记录生成微信草稿，并标记为 published。"""
    rows = dbm.list_by_status(conn, "approved", limit=50)
    if not rows:
        print("[publish] 无待发布的公众号内容")
        return None
    today = datetime.now().strftime("%Y-%m-%d")

    mp = DRAFTS_DIR / f"公众号草稿-{today}.md"
    lines = [f"# 海内外新材料技术周报（{today}）\n",
             "> 本图文由 DP·AI 引擎辅助生成，已经人工审核。\n"]
    for i, r in enumerate(rows, 1):
        lines += [
            f"\n## {i}. {r['title']}",
            f"- 方向：{r['category']} ｜ 来源：{r['region']} · {r['source_name']}",
            f"- 视频链接：{r['url']}",
            f"\n{r['summary']}\n",
        ]
    mp.write_text("\n".join(lines), encoding="utf-8")

    sp = DRAFTS_DIR / f"视频号脚本-{today}.md"
    slines = [f"# 视频号口播脚本（{today}）\n"]
    for i, r in enumerate(rows, 1):
        slines += [
            f"\n## 第 {i} 条：{r['title']}",
            f"【口播】今天关注{r['category']}方向。{r['summary']}完整视频见公众号原文链接。",
            f"【字幕关键词】{r['category']}｜新材料｜{r['region']}技术动态",
        ]
    sp.write_text("\n".join(slines), encoding="utf-8")

    for r in rows:
        dbm.set_status(conn, r["id"], "published")
    print(f"[publish] 微信草稿已生成: {mp.name}, {sp.name}（{len(rows)} 条）")
    return mp, sp
