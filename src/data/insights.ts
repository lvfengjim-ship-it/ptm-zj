// 技术视界 · 行业短观点数据
// 由 AI 内容管线生成：国内政策 / 项目 / 标准新闻每日抓取 → DP·AI 起草短观点 → 人工审定（48 小时内）→ 发布上线。

export interface TechInsight {
  id: string
  title: string
  category: string
  source: string
  date: string
  url: string
  viewpoint: string
}

import { generatedInsights, insightsMeta } from './insights.generated'

export const insights: TechInsight[] = generatedInsights
export const insightsUpdatedAt: string = insightsMeta.updatedAt
