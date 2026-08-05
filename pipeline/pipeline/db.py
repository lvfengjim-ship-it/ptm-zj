"""SQLite 存储：抓取记录 + 审核状态。"""
from __future__ import annotations

import hashlib
import sqlite3
from datetime import datetime
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS videos (
  id          TEXT PRIMARY KEY,
  platform    TEXT NOT NULL,
  video_id    TEXT NOT NULL,
  title       TEXT NOT NULL,
  url         TEXT NOT NULL,
  duration    TEXT DEFAULT '',
  published   TEXT DEFAULT '',
  source_name TEXT DEFAULT '',
  region      TEXT DEFAULT '',
  category    TEXT DEFAULT '',
  summary     TEXT DEFAULT '',
  hot         INTEGER DEFAULT 0,
  status      TEXT DEFAULT 'pending',   -- pending / approved / rejected / published
  created_at  TEXT NOT NULL,
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
"""


def connect(db_path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    return conn


def make_id(platform: str, video_id: str) -> str:
    return hashlib.sha1(f"{platform}:{video_id}".encode()).hexdigest()[:16]


def insert_pending(conn: sqlite3.Connection, items: list[dict]) -> int:
    """插入新抓取的视频，已存在的跳过。返回新增条数。"""
    now = datetime.now().isoformat(timespec="seconds")
    added = 0
    for it in items:
        vid = make_id(it["platform"], it["video_id"])
        cur = conn.execute(
            """INSERT OR IGNORE INTO videos
               (id, platform, video_id, title, url, duration, published, source_name,
                region, category, summary, hot, status, created_at)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,0,'pending',?)""",
            (
                vid, it["platform"], it["video_id"], it["title"], it["url"],
                it.get("duration", ""), it.get("published", ""), it.get("source_name", ""),
                it.get("region", ""), it.get("category", ""), it.get("summary", ""), now,
            ),
        )
        added += cur.rowcount
    conn.commit()
    return added


def update_ai_result(conn: sqlite3.Connection, vid: str, category: str, summary: str, title_cn: str | None):
    if title_cn:
        conn.execute("UPDATE videos SET category=?, summary=?, title=? WHERE id=?", (category, summary, title_cn, vid))
    else:
        conn.execute("UPDATE videos SET category=?, summary=? WHERE id=?", (category, summary, vid))
    conn.commit()


def set_status(conn: sqlite3.Connection, vid: str, status: str):
    conn.execute(
        "UPDATE videos SET status=?, reviewed_at=? WHERE id=?",
        (status, datetime.now().isoformat(timespec="seconds"), vid),
    )
    conn.commit()


def approve_processed(conn: sqlite3.Connection) -> int:
    """自动模式：将已完成 DP·AI 处理（有分类与摘要）的待审记录标记为通过。"""
    cur = conn.execute(
        "UPDATE videos SET status='approved', reviewed_at=? "
        "WHERE status='pending' AND summary IS NOT NULL AND summary != '' "
        "AND category IS NOT NULL AND category != ''",
        (datetime.now().isoformat(timespec="seconds"),),
    )
    conn.commit()
    return cur.rowcount


def list_by_status(conn: sqlite3.Connection, status: str, limit: int = 100) -> list[sqlite3.Row]:
    return conn.execute(
        "SELECT * FROM videos WHERE status=? ORDER BY created_at DESC LIMIT ?", (status, limit)
    ).fetchall()


def list_approved(conn: sqlite3.Connection, limit: int) -> list[sqlite3.Row]:
    return conn.execute(
        "SELECT * FROM videos WHERE status IN ('approved','published') ORDER BY published DESC, created_at DESC LIMIT ?",
        (limit,),
    ).fetchall()


def stats(conn: sqlite3.Connection) -> dict:
    rows = conn.execute("SELECT status, COUNT(*) c FROM videos GROUP BY status").fetchall()
    return {r["status"]: r["c"] for r in rows}
