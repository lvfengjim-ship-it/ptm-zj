"""配置加载：config.json + 环境变量覆盖。"""
from __future__ import annotations

import json
import os
from pathlib import Path

PIPELINE_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PIPELINE_ROOT / "data"
DRAFTS_DIR = DATA_DIR / "drafts"
DB_PATH = DATA_DIR / "pipeline.db"
SITE_DATA_DIR = (PIPELINE_ROOT.parent / "src" / "data").resolve()

DEFAULTS = {
    "dp_api_base": "https://api.deepseek.com",
    "dp_api_key": "",
    "dp_model": "deepseek-chat",
    "fetch": {"max_per_query": 5, "youtube_queries": [], "bilibili_queries": [], "rss_feeds": []},
    "review_port": 8765,
    "run_time": "06:42",
    "max_publish": 30,
}


def load_config() -> dict:
    cfg = json.loads(json.dumps(DEFAULTS))
    cfg_file = PIPELINE_ROOT / "config.json"
    if cfg_file.exists():
        user_cfg = json.loads(cfg_file.read_text(encoding="utf-8"))
        for k, v in user_cfg.items():
            if isinstance(v, dict) and isinstance(cfg.get(k), dict):
                cfg[k].update(v)
            else:
                cfg[k] = v
    # 环境变量优先（推荐用于 API Key）
    cfg["dp_api_key"] = os.environ.get("DP_API_KEY") or cfg.get("dp_api_key", "")
    cfg["dp_api_base"] = os.environ.get("DP_API_BASE") or cfg.get("dp_api_base", DEFAULTS["dp_api_base"])
    cfg["dp_model"] = os.environ.get("DP_MODEL") or cfg.get("dp_model", DEFAULTS["dp_model"])
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    return cfg
