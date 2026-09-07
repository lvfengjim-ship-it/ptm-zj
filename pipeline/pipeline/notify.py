"""提醒层：有新的短观点草稿待审时，推送钉钉群机器人 / 企业微信机器人消息。

凭据只走环境变量或 config.json（不入库、不进前端）：
  DINGTALK_WEBHOOK / DINGTALK_SECRET   钉钉群自定义机器人（加签）
  WECOM_WEBHOOK                        企业微信群机器人
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "PTM content pipeline"}


def _post(url: str, payload: dict) -> bool:
    try:
        req = urllib.request.Request(
            url, data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json", **UA},
        )
        with urllib.request.urlopen(req, timeout=20) as r:
            resp = json.loads(r.read())
        ok = resp.get("errcode", 0) == 0
        if not ok:
            print(f"  [notify] 推送被拒绝: {resp}")
        return ok
    except Exception as e:  # noqa: BLE001
        print(f"  [notify] 推送失败: {e}")
        return False


def _signed_dingtalk_url(webhook: str, secret: str) -> str:
    ts = str(round(time.time() * 1000))
    sign = urllib.parse.quote_plus(
        base64.b64encode(hmac.new(secret.encode(), f"{ts}\n{secret}".encode(), hashlib.sha256).digest())
    )
    sep = "&" if "?" in webhook else "?"
    return f"{webhook}{sep}timestamp={ts}&sign={sign}"


def notify_pending_news(cfg: dict, drafts: list, review_hint: str = "") -> bool:
    """有待审短观点草稿时推送提醒。drafts 为 sqlite Row / dict 列表。返回是否成功送出。"""
    if not drafts:
        return False
    lines = [f"### 📰 技术视界：{len(drafts)} 条短观点待审定", ""]
    for r in drafts[:5]:
        title = r["title"] if hasattr(r, "keys") else r.get("title", "")
        cat = r["category"] if hasattr(r, "keys") else r.get("category", "")
        lines.append(f"- 【{cat or '综合'}】{title[:40]}")
    if len(drafts) > 5:
        lines.append(f"- ……另有 {len(drafts) - 5} 条")
    lines += ["", "DP·AI 已起草短观点，请在 48 小时内审定发布。" + (f"（{review_hint}）" if review_hint else "")]
    text = "\n".join(lines)

    sent = False
    dt_hook = cfg.get("dingtalk_webhook", "")
    if dt_hook:
        url = _signed_dingtalk_url(dt_hook, cfg.get("dingtalk_secret", "")) if cfg.get("dingtalk_secret") else dt_hook
        sent = _post(url, {"msgtype": "markdown", "markdown": {"title": "技术视界短观点待审定", "text": text}}) or sent
        print(f"  [notify] 钉钉机器人: {'已送达' if sent else '失败/未配置'}")
    wc_hook = cfg.get("wecom_webhook", "")
    if wc_hook:
        ok = _post(wc_hook, {"msgtype": "markdown", "markdown": {"content": text}})
        sent = ok or sent
        print(f"  [notify] 企业微信机器人: {'已送达' if ok else '失败/未配置'}")
    if not dt_hook and not wc_hook:
        print("  [notify] 未配置机器人 Webhook，跳过提醒")
    return sent
