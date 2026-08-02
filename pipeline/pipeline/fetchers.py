"""抓取层：yt-dlp 搜索（YouTube / B 站，免 API Key）+ RSS 订阅源。

yt-dlp 未安装或网络不可达时自动降级到 RSS；两者都不可用时返回空列表，
管线仍可对存量数据执行 AI 处理与导出。
"""
from __future__ import annotations

import json
import shutil
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime

UA = {"User-Agent": "Mozilla/5.0 (PTM content pipeline)"}


def _fmt_duration(seconds) -> str:
    try:
        s = int(float(seconds))
        return f"{s // 60}:{s % 60:02d}"
    except (TypeError, ValueError):
        return ""


def _ytdlp_search(prefix: str, platform: str, region: str, query: str, limit: int, opts: dict | None = None) -> list[dict]:
    """yt-dlp 搜索：prefix 如 ytsearch / bilisearch。opts 支持 proxy / cookies_from_browser。"""
    exe = shutil.which("yt-dlp")
    if not exe:
        return []
    cmd = [
        exe, f"{prefix}{limit}:{query}", "--dump-json", "--flat-playlist",
        "--no-warnings", "--quiet",
    ]
    opts = opts or {}
    if opts.get("proxy"):
        cmd += ["--proxy", opts["proxy"]]
    if opts.get("cookies_from_browser"):
        cmd += ["--cookies-from-browser", opts["cookies_from_browser"]]
    try:
        out = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    except subprocess.TimeoutExpired:
        print(f"  [fetch] {platform} 搜索超时: {query}")
        return []
    items = []
    for line in out.stdout.splitlines():
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue
        vid = d.get("id") or ""
        url = d.get("url") or d.get("webpage_url") or ""
        if url and not url.startswith("http"):
            url = f"https://www.youtube.com/watch?v={vid}" if platform == "youtube" else f"https://www.bilibili.com/video/{vid}"
        if not vid or not url:
            continue
        items.append({
            "platform": platform,
            "video_id": vid,
            "title": (d.get("title") or "").strip(),
            "url": url,
            "duration": _fmt_duration(d.get("duration")),
            "published": (d.get("upload_date") or "")[:10],
            "source_name": d.get("channel") or d.get("uploader") or "",
            "region": region,
        })
    return items


def _rss(url: str) -> list[dict]:
    """通用 RSS/Atom 抓取（兼容 YouTube 频道 RSS）。"""
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            root = ET.fromstring(r.read())
    except Exception as e:  # noqa: BLE001
        print(f"  [fetch] RSS 失败 {url}: {e}")
        return []
    ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
    items = []
    if root.tag.endswith("feed"):  # Atom
        for e in root.findall("a:entry", ns):
            vid = e.findtext("yt:videoId", "", ns)
            link = e.find("a:link", ns)
            items.append({
                "platform": "youtube",
                "video_id": vid or (link.get("href", "") if link is not None else ""),
                "title": (e.findtext("a:title", "", ns) or "").strip(),
                "url": link.get("href", "") if link is not None else "",
                "duration": "",
                "published": (e.findtext("a:published", "", ns) or "")[:10],
                "source_name": e.findtext("a:author/a:name", "", ns) or "",
                "region": "海外",
            })
    else:  # RSS 2.0
        for e in root.iter("item"):
            items.append({
                "platform": "rss",
                "video_id": e.findtext("guid") or e.findtext("link") or "",
                "title": (e.findtext("title") or "").strip(),
                "url": e.findtext("link") or "",
                "duration": "",
                "published": (e.findtext("pubDate") or "")[:16],
                "source_name": url,
                "region": "",
            })
    return [i for i in items if i["video_id"] and i["url"] and i["title"]]


def fetch_all(cfg: dict) -> list[dict]:
    f = cfg["fetch"]
    limit = int(f.get("max_per_query", 5))
    items: list[dict] = []
    for q in f.get("youtube_queries", []):
        got = _ytdlp_search("ytsearch", "youtube", "海外", q, limit, f)
        print(f"  [fetch] YouTube '{q}': {len(got)} 条")
        items += got
    for q in f.get("bilibili_queries", []):
        got = _ytdlp_search("bilisearch", "bilibili", "国内", q, limit, f)
        print(f"  [fetch] B 站 '{q}': {len(got)} 条")
        items += got
    for u in f.get("rss_feeds", []):
        got = _rss(u)
        print(f"  [fetch] RSS {u}: {len(got)} 条")
        items += got
    print(f"[fetch] 合计 {len(items)} 条 @ {datetime.now():%H:%M:%S}")
    return items


def fetch_mock() -> list[dict]:
    """无网络 / 无 yt-dlp 环境下的演示抓取数据，用于全流程联调。"""
    return [
        {
            "platform": "youtube", "video_id": "mock001",
            "title": "Advanced Fire-stopping Materials for Nuclear Plants",
            "url": "https://www.youtube.com/watch?v=mock001", "duration": "14:20",
            "published": "2026-07-30", "source_name": "Mock Energy Channel", "region": "海外",
        },
        {
            "platform": "bilibili", "video_id": "BV1mock002",
            "title": "固态电池电解质材料最新进展讲解",
            "url": "https://www.bilibili.com/video/BV1mock002", "duration": "10:05",
            "published": "2026-07-29", "source_name": "示例UP主", "region": "国内",
        },
        {
            "platform": "youtube", "video_id": "mock003",
            "title": "Hydrogen Storage Tanks: Carbon Fiber Winding Tech",
            "url": "https://www.youtube.com/watch?v=mock003", "duration": "12:40",
            "published": "2026-07-28", "source_name": "Mock Materials Lab", "region": "海外",
        },
    ]
