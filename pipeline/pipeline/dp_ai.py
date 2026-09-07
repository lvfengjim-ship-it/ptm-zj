"""DP·AI 处理层：调用 DP API（OpenAI 兼容接口）完成分类、摘要与翻译。

API Key 仅从环境变量 DP_API_KEY 或本地 config.json 读取，绝不进入前端代码与页面文案。
页面对外统一使用「DP·AI」品牌名。
"""
from __future__ import annotations

import json
import re
import urllib.request

CATEGORIES = ["核能", "氢能", "光伏", "风电", "储能", "动力电池"]

NEWS_CATEGORIES = CATEGORIES + ["综合"]

PROMPT = """你是新材料行业编辑。请分析以下视频信息，输出严格 JSON（不要输出任何其他内容）：
{{
  "category": "<从 {cats} 中选一个最匹配的>",
  "title_cn": "<若原标题非中文则翻译为中文标题，否则原样返回>",
  "summary": "<60-90字中文摘要，面向行业从业者，客观说明技术要点>"
}}

视频标题: {title}
来源频道: {source}
"""


def _chat(cfg: dict, prompt: str) -> str:
    url = cfg["dp_api_base"].rstrip("/") + "/chat/completions"
    body = json.dumps({
        "model": cfg["dp_model"],
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3,
        "response_format": {"type": "json_object"},
    }).encode()
    req = urllib.request.Request(
        url, data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {cfg['dp_api_key']}",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.loads(r.read())
    return data["choices"][0]["message"]["content"]


def _parse_json(text: str) -> dict:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", text, re.S)
        if m:
            try:
                return json.loads(m.group(0))
            except json.JSONDecodeError:
                pass
    return {}


def process_item(cfg: dict, item: dict) -> dict:
    """返回 {category, summary, title_cn}。失败时返回空 dict，由调用方降级。"""
    prompt = PROMPT.format(cats="、".join(CATEGORIES), title=item["title"], source=item.get("source_name", ""))
    try:
        result = _parse_json(_chat(cfg, prompt))
    except Exception as e:  # noqa: BLE001
        print(f"  [dp-ai] 处理失败 '{item['title'][:40]}': {e}")
        return {}
    if result.get("category") not in CATEGORIES:
        result["category"] = ""
    return {
        "category": result.get("category", ""),
        "summary": (result.get("summary") or "").strip(),
        "title_cn": (result.get("title_cn") or "").strip() or None,
    }


NEWS_PROMPT = """你是一家新材料企业（主营被动防火、核安防护、复合材料粘接与自动化设备）的行业观察员。
请根据以下国内行业新闻标题，输出严格 JSON（不要输出任何其他内容）：
{{
  "category": "<从 {cats} 中选一个最匹配的>",
  "viewpoint": "<120-180字中文短观点草稿：第一句概括事件本身；随后点明其对上游新材料（防火封堵、密封、隔热、结构粘接、复合材料等）产业链的影响与潜在机会；语气专业克制，不夸大、不编造新闻中不存在的数据>"
}}

新闻标题: {title}
媒体来源: {source}
"""


def process_news(cfg: dict, item: dict) -> dict:
    """为政策/项目类新闻起草短观点。返回 {category, viewpoint}，失败返回空 dict。"""
    prompt = NEWS_PROMPT.format(
        cats="、".join(NEWS_CATEGORIES), title=item["title"], source=item.get("source_name", ""),
    )
    try:
        result = _parse_json(_chat(cfg, prompt))
    except Exception as e:  # noqa: BLE001
        print(f"  [dp-ai] 短观点起草失败 '{item['title'][:40]}': {e}")
        return {}
    if result.get("category") not in NEWS_CATEGORIES:
        result["category"] = ""
    return {
        "category": result.get("category", ""),
        "viewpoint": (result.get("viewpoint") or "").strip(),
    }


def process_news_mock(item: dict) -> dict:
    return {
        "category": "核能",
        "viewpoint": f"【模拟观点】「{item['title'][:30]}…」反映了国内能源政策的最新动向，相关防火封堵与新材料配套需求值得关注，具体影响有待人工审定补充。",
    }


def process_mock(item: dict) -> dict:
    """联调用模拟结果。"""
    text = item["title"]
    if any(k in text.lower() for k in ["nuclear", "核电"]):
        cat = "核能"
    elif any(k in text.lower() for k in ["hydrogen", "氢"]):
        cat = "氢能"
    else:
        cat = "动力电池"
    is_cn = bool(re.search(r"[一-鿿]", text))
    return {
        "category": cat,
        "summary": f"【模拟摘要】本视频围绕{cat}方向的新材料技术展开，介绍材料选型、工艺要点与工程化验证方法，适合行业从业者参考。",
        "title_cn": None if is_cn else f"【译】{text}",
    }
