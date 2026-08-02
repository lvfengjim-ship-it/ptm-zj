"""PTM AI 内容管线 CLI。

用法:
  python -m pipeline run [--mock] [--no-ai]   抓取 → DP·AI 处理 → 入库待审
  python -m pipeline serve                    启动审核台 (默认 127.0.0.1:8765)
  python -m pipeline export                   导出官网数据 + 微信草稿
  python -m pipeline schedule                 常驻进程，每日 run_time 自动 run + 提示审核
  python -m pipeline stats                    查看库内统计
"""
from __future__ import annotations

import sys
import time
from datetime import datetime, timedelta

from . import DB_PATH, load_config
from . import db as dbm
from . import dp_ai, fetchers
from .publisher import export_site, export_wechat_drafts


def run(mock: bool = False, no_ai: bool = False) -> None:
    cfg = load_config()
    conn = dbm.connect(DB_PATH)

    print("== 1/3 抓取 ==")
    items = fetchers.fetch_mock() if mock else fetchers.fetch_all(cfg)
    added = dbm.insert_pending(conn, items)
    print(f"[store] 新增 {added} 条待处理（重复自动跳过）")

    print("== 2/3 DP·AI 处理 ==")
    if no_ai:
        print("[dp-ai] 已按 --no-ai 跳过")
    else:
        pending = [r for r in dbm.list_by_status(conn, "pending", 200) if not r["summary"]]
        use_mock = mock or not cfg["dp_api_key"]
        if use_mock and not mock:
            print("[dp-ai] 未配置 DP_API_KEY，使用模拟摘要（配置后自动切换真实调用）")
        for r in pending:
            item = dict(r)
            result = dp_ai.process_mock(item) if use_mock else dp_ai.process_item(cfg, item)
            if result:
                dbm.update_ai_result(conn, r["id"], result["category"], result["summary"], result.get("title_cn"))
                print(f"  [dp-ai] {r['title'][:36]}... -> {result['category']}")
            else:
                print(f"  [dp-ai] 跳过（处理失败，保留待审）: {r['title'][:36]}")

    print("== 3/3 完成 ==")
    st = dbm.stats(conn)
    print("[stats]", st)
    print("提示: 运行 python -m pipeline serve 打开审核台，审核后点「导出到官网」")
    conn.close()


def export() -> None:
    cfg = load_config()
    conn = dbm.connect(DB_PATH)
    n = export_site(conn, cfg)
    export_wechat_drafts(conn)
    print(f"[export] 完成，官网 {n} 条")
    conn.close()


def schedule() -> None:
    cfg = load_config()
    hh, mm = (int(x) for x in cfg.get("run_time", "06:42").split(":"))
    print(f"常驻调度已启动，每日 {hh:02d}:{mm:02d} 自动抓取+AI处理 (Ctrl+C 停止)")
    while True:
        now = datetime.now()
        nxt = now.replace(hour=hh, minute=mm, second=0, microsecond=0)
        if nxt <= now:
            nxt += timedelta(days=1)
        wait = (nxt - now).total_seconds()
        print(f"[schedule] 下次运行: {nxt:%Y-%m-%d %H:%M}（{wait / 3600:.1f} 小时后）")
        time.sleep(wait)
        try:
            run()
        except Exception as e:  # noqa: BLE001
            print(f"[schedule] 本轮运行失败: {e}")


def main() -> None:
    args = sys.argv[1:]
    cmd = args[0] if args else ""
    if cmd == "run":
        run(mock="--mock" in args, no_ai="--no-ai" in args)
    elif cmd == "serve":
        cfg = load_config()
        from .review_server import serve
        serve(int(cfg.get("review_port", 8765)))
    elif cmd == "export":
        export()
    elif cmd == "schedule":
        schedule()
    elif cmd == "stats":
        conn = dbm.connect(DB_PATH)
        print(dbm.stats(conn))
        conn.close()
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
