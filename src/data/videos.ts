// 技术视界 · 演示数据
// 正式上线后，本数据由后端内容管线每日自动更新：
// 海内外公开视频源抓取 → DP·AI 引擎摘要 / 翻译 / 分类 → 人工审核 → 官网 / 公众号 / 视频号同步分发。

export type EnergyCategory = '核能' | '氢能' | '光伏' | '风电' | '储能' | '动力电池'

export interface TechVideo {
  id: string
  title: string
  category: EnergyCategory
  region: '国内' | '海外'
  source: string
  duration: string
  date: string
  summary: string
  hot?: boolean
  url?: string
}

export const categories: Array<'全部' | EnergyCategory> = ['全部', '核能', '氢能', '光伏', '风电', '储能', '动力电池']

const demoVideos: TechVideo[] = [
  {
    id: 'v01',
    title: '第四代核电站用耐高温密封材料研究进展',
    category: '核能',
    region: '国内',
    source: '行业技术媒体',
    duration: '12:36',
    date: '2026-07-28',
    summary: '介绍四代堆工况下硅酮基密封材料的耐辐照与热老化性能要求，对比国内外主流技术路线与验证标准。',
    hot: true,
  },
  {
    id: 'v02',
    title: 'Fire-stopping Materials for Nuclear Facilities — IAEA Workshop Highlights',
    category: '核能',
    region: '海外',
    source: '国际行业会议',
    duration: '18:02',
    date: '2026-07-25',
    summary: '国际研讨会精选：核设施防火封堵材料的 60 年寿命设计方法、LOCA 工况验证与可去污性测试实践。',
    hot: true,
  },
  {
    id: 'v03',
    title: '绿氢储运中的复合材料缠绕气瓶技术解析',
    category: '氢能',
    region: '国内',
    source: '行业技术媒体',
    duration: '09:48',
    date: '2026-07-22',
    summary: 'IV 型储氢瓶碳纤维缠绕工艺与环氧基体树脂选型要点，分析 70MPa 工况下的材料疲劳寿命问题。',
  },
  {
    id: 'v04',
    title: 'Perovskite Tandem Cells: Encapsulation Materials Deep Dive',
    category: '光伏',
    region: '海外',
    source: '海外技术频道',
    duration: '15:20',
    date: '2026-07-20',
    summary: '钙钛矿叠层组件封装材料深度解析：阻水阻氧胶膜、边缘密封体系与 25 年户外可靠性验证方法。',
    hot: true,
  },
  {
    id: 'v05',
    title: '海上风电叶片碳纤维拉挤板材与结构胶匹配工艺',
    category: '风电',
    region: '国内',
    source: '行业技术媒体',
    duration: '11:15',
    date: '2026-07-17',
    summary: '百米级海上叶片主梁用碳纤维拉挤板与环氧结构胶的匹配工艺，涵盖触变性、操作期与疲劳性能设计。',
  },
  {
    id: 'v06',
    title: 'Blade Recycling: New Composite Materials for Circular Wind Energy',
    category: '风电',
    region: '海外',
    source: '海外技术频道',
    duration: '13:40',
    date: '2026-07-14',
    summary: '可回收树脂体系与热塑性复合材料在风电叶片上的应用进展，解读欧洲叶片回收新规对材料的影响。',
  },
  {
    id: 'v07',
    title: '长时液流电池储能系统的密封与防腐材料选型',
    category: '储能',
    region: '国内',
    source: '行业技术媒体',
    duration: '10:05',
    date: '2026-07-11',
    summary: '全钒液流电池电堆密封材料的耐酸耐氧化选型逻辑，以及双极板粘接工艺的工程化要点。',
  },
  {
    id: 'v08',
    title: 'Solid-State Batteries: Interface Materials & Adhesives Update 2026',
    category: '动力电池',
    region: '海外',
    source: '海外技术频道',
    duration: '16:58',
    date: '2026-07-08',
    summary: '固态电池界面材料与结构粘接方案年度更新：硫化物电解质兼容性、等静压封装与轻量化箱体设计。',
    hot: true,
  },
  {
    id: 'v09',
    title: '动力电池包轻量化复合箱体与防火隔热设计',
    category: '动力电池',
    region: '国内',
    source: '行业技术媒体',
    duration: '08:52',
    date: '2026-07-05',
    summary: 'SMC / 碳纤维复合箱体在电池包上的轻量化收益，以及热失控防护中的隔热与封堵材料布置。',
  },
  {
    id: 'v10',
    title: '绿氢电解槽隔膜材料国产化进展',
    category: '氢能',
    region: '国内',
    source: '行业技术媒体',
    duration: '14:26',
    date: '2026-07-02',
    summary: 'ALK 与 PEM 电解槽关键隔膜 / 质子膜材料国产化路线对比，梳理测试评价指标与量产瓶颈。',
  },
  {
    id: 'v11',
    title: 'Grid-scale Storage Fire Protection: Materials & Standards',
    category: '储能',
    region: '海外',
    source: '国际行业会议',
    duration: '19:31',
    date: '2026-06-28',
    summary: '海外电网级储能电站防火材料与封堵规范解读：UL 9540A 热失控测试与防火分隔设计实践。',
  },
  {
    id: 'v12',
    title: 'n 型高效组件 POE / EPE 胶膜技术路线之争',
    category: '光伏',
    region: '国内',
    source: '行业技术媒体',
    duration: '07:44',
    date: '2026-06-25',
    summary: 'TOPCon / HJT 组件封装胶膜的抗 PID 与抗湿热老化方案对比，给出不同气候区的选型建议。',
  },
]

export const pipelineSteps = [
  { step: '01', title: '自动抓取', desc: '每日定时扫描海内外公开视频源与行业媒体，锁定新材料技术内容' },
  { step: '02', title: 'DP·AI 处理', desc: 'DP·AI 引擎完成语音识别、摘要提炼、多语言互译与能源方向自动分类' },
  { step: '03', title: '人工审核', desc: '技术团队复核内容准确性与合规性，确保行业科普质量' },
  { step: '04', title: '多端分发', desc: '审核通过后同步至官网、微信公众号与视频号，一次生产多端触达' },
]

// AI 内容管线生成的真实数据优先；为空时回退到示例数据
import { generatedVideos, generatedMeta } from './videos.generated'

export const videos: TechVideo[] = generatedVideos.length > 0 ? generatedVideos : demoVideos
export const dataUpdatedAt: string | null = generatedVideos.length > 0 ? generatedMeta.updatedAt : null
