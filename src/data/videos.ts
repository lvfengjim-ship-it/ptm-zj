// 技术视界 · 栏目数据
// 当前为人工选编的海内外公开视频（点击卡片跳转原视频观看）。
// 内容管线正式上线后，本数据由后端每日自动更新：
// 海内外公开视频源抓取 → DP·AI 引擎摘要 / 翻译 / 分类 → 人工审核 → 官网 / 公众号 / 视频号同步分发。

export type EnergyCategory = '核能' | '氢能' | '光伏' | '风电' | '储能' | '动力电池'

export interface TechVideo {
  id: string
  title: string
  category: EnergyCategory
  region: '国内' | '海外'
  source: string
  duration?: string
  date: string
  summary: string
  hot?: boolean
  url?: string
}

export const categories: Array<'全部' | EnergyCategory> = ['全部', '核能', '氢能', '光伏', '风电', '储能', '动力电池']

const curatedVideos: TechVideo[] = [
  {
    id: 'v01',
    title: '核电站是怎么“烧开水”发电的',
    category: '核能',
    region: '国内',
    source: 'B站 · 科普创',
    date: '2023-04-13',
    summary: '以压水堆为例讲解核电站的能量转换链路：反应堆裂变放热、一回路换热、蒸汽推动汽轮机发电，帮助理解核岛与常规岛的系统构成。',
    hot: true,
    url: 'https://www.bilibili.com/video/BV1Es4y1P77C/',
  },
  {
    id: 'v02',
    title: '核电站 3D 原理动画：安全壳与堆芯拆解',
    category: '核能',
    region: '海外',
    source: 'B站 · 原理视界（译制）',
    date: '2023-07-29',
    summary: '三维动画拆解核电站安全壳、反应堆压力容器与汽轮发电机组的结构关系，直观呈现从核燃料到电能的全过程。',
    url: 'https://www.bilibili.com/video/BV1TX4y1J78K/',
  },
  {
    id: 'v03',
    title: '新能源：碳纤维缠绕储氢瓶（光威）',
    category: '氢能',
    region: '国内',
    source: 'B站 · 丘钛新材料',
    date: '2023-05-03',
    summary: '实拍碳纤维缠绕储氢瓶的成型过程，了解轻量化缠绕结构在高压车载储氢中的应用。',
    url: 'https://www.bilibili.com/video/BV1Tk4y1E7NQ/',
  },
  {
    id: 'v04',
    title: '3 分钟了解各种技术路线电解槽（ALK / PEM / SOEC）',
    category: '氢能',
    region: '国内',
    source: 'B站 · 老叶制氢',
    date: '2024-04-05',
    summary: '快速梳理碱性、PEM、SOEC 等主流电解槽技术路线的结构差异、关键材料与适用场景。',
    url: 'https://www.bilibili.com/video/BV1Pp42127jx/',
  },
  {
    id: 'v05',
    title: '材料与能源前沿：钙钛矿太阳能电池学术汇报（中科院半导体所）',
    category: '光伏',
    region: '国内',
    source: 'B站 · 蔻享学术',
    date: '2022-10-31',
    summary: '中科院半导体研究所游经碧老师主讲，系统讲解钙钛矿太阳能电池的材料体系、效率进展与产业化挑战。',
    hot: true,
    url: 'https://www.bilibili.com/video/BV1UP4y1m7Rs/',
  },
  {
    id: 'v06',
    title: '钙钛矿封装电池辅助小工具',
    category: '光伏',
    region: '国内',
    source: 'B站 · 普瑞材料',
    date: '2025-04-10',
    summary: '面向钙钛矿电池封装环节的实用工具演示，涉及封装材料操作与电池保护工艺细节。',
    url: 'https://www.bilibili.com/video/BV1scdgYEEKR/',
  },
  {
    id: 'v07',
    title: '风电叶片用大丝束碳纤维：48K 制备技术落地，单叶片减重',
    category: '风电',
    region: '国内',
    source: 'B站 · 复材云集',
    date: '2025-11-04',
    summary: '48K 大丝束碳纤维在风电叶片主梁上的应用落地，解析大丝束降本与叶片减重的技术路径。',
    hot: true,
    url: 'https://www.bilibili.com/video/BV1h616B7E6T/',
  },
  {
    id: 'v08',
    title: '大型风电叶片制作工艺细节全过程',
    category: '风电',
    region: '海外',
    source: 'B站 · 北江樵夫（海外影像）',
    date: '2021-07-30',
    summary: '海外叶片工厂完整制造影像：模具铺层、真空灌注、合模与检测，了解大型复合材料叶片的工艺细节。',
    url: 'https://www.bilibili.com/video/BV13A411P7vX/',
  },
  {
    id: 'v09',
    title: '锂电池的终结者？深度讲解「炒上天」的钒电池',
    category: '储能',
    region: '国内',
    source: 'B站 · 大刘科普频道',
    date: '2023-02-12',
    summary: '深度讲解全钒液流电池的工作原理、长时储能优势与成本瓶颈，对比锂电池的应用边界。',
    hot: true,
    url: 'https://www.bilibili.com/video/BV1xe4y1w7pJ/',
  },
  {
    id: 'v10',
    title: '电力银行：钒液流电池储能',
    category: '储能',
    region: '国内',
    source: 'B站 · 时光的凝视',
    date: '2020-11-21',
    summary: '以「电力银行」为喻介绍钒液流电池储能系统的构成，以及电网级长时储能的应用价值。',
    url: 'https://www.bilibili.com/video/BV1fi4y1L7M8/',
  },
  {
    id: 'v11',
    title: '一分钟讲清楚固态电池为啥这么厉害？',
    category: '动力电池',
    region: '国内',
    source: 'B站 · 转转肥刘不肥',
    date: '2024-11-01',
    summary: '一分钟看懂固态电池相较液态锂电池在安全性与能量密度上的核心优势，以及量产难点。',
    hot: true,
    url: 'https://www.bilibili.com/video/BV1ZhSoYQE8T/',
  },
  {
    id: 'v12',
    title: '电池包隔热保温材料怎么选',
    category: '动力电池',
    region: '国内',
    source: 'B站 · 泰亚高性能新材料',
    date: '2024-03-22',
    summary: '从热失控防护角度讲解电池包隔热保温材料的选型逻辑，涉及气凝胶等隔热方案的性能对比。',
    url: 'https://www.bilibili.com/video/BV1rz421Z7Mi/',
  },
]

export const pipelineSteps = [
  { step: '01', title: '自动抓取', desc: '每日定时扫描海内外公开视频源与行业媒体，锁定新材料技术内容' },
  { step: '02', title: 'DP·AI 处理', desc: 'DP·AI 引擎完成语音识别、摘要提炼、多语言互译与能源方向自动分类' },
  { step: '03', title: '人工审核', desc: '技术团队复核内容准确性与合规性，确保行业科普质量' },
  { step: '04', title: '多端分发', desc: '审核通过后同步至官网、微信公众号与视频号，一次生产多端触达' },
]

// AI 内容管线生成的真实数据优先；为空时回退到人工选编数据
import { generatedVideos, generatedMeta } from './videos.generated'

export const videos: TechVideo[] = generatedVideos.length > 0 ? generatedVideos : curatedVideos
export const dataUpdatedAt: string | null = generatedVideos.length > 0 ? generatedMeta.updatedAt : null
