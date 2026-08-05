// 站点路由与每页 SEO 元信息 —— 客户端 Seo 组件与构建期预渲染共用此表
export interface SeoRoute {
  path: string
  title: string
  description: string
}

export const siteUrl = 'https://www.ptm-zj.com'

export const seoRoutes: SeoRoute[] = [
  {
    path: '/',
    title: '彭田新材料（镇江）有限公司 · PTM New Materials',
    description:
      '彭田新材料（镇江）有限公司 — 专注高性能新材料研发、生产与销售：核电防火防辐射封堵材料、核电吸酸枕、复合材料粘结剂、自动化设备。服务热线 400-8484-616。',
  },
  {
    path: '/products',
    title: '产品中心 · 彭田新材料',
    description:
      '四大产品线：防火防辐射封堵材料（9 大型号，3 小时耐火）、核电用吸酸枕、复合材料粘结剂（PTMU 系列 7 大类型）、自动化设备（激光雷达盘点系统），产品通过权威机构检测认证。',
  },
  {
    path: '/products/fire',
    title: '防火防辐射封堵材料 · 彭田新材料',
    description:
      '硅酮防火密封胶、低/中/高密度防火封堵材料、阻火包、阻火模块、柔性有机堵料、硅布：3 小时耐火，无卤无毒、气密水密、抗辐照耐老化、可去污，60 年长效防火保护，完成权威机构型式试验。',
  },
  {
    path: '/products/acid',
    title: '核电用吸酸枕 · 彭田新材料',
    description:
      '高效吸酸剂迅速中和吸收泄漏硫酸，无毒环保、高堆积密度符合核电要求；全无尘自动化生产日产 2000 标准袋，应用于核电站应急供电铅酸蓄电池、通信基站、数据中心。',
  },
  {
    path: '/products/adhesive',
    title: '复合材料粘结剂 PTMU 系列 · 彭田新材料',
    description:
      '双组分环氧胶、聚氨酯胶、丙烯酸酯胶、改性硅烷密封胶等 7 大类型；PTMU 1000-7000 系列覆盖车辆装配、碳纤维改装、低空飞行器、交通运输、轨道交通、军工方舱、体育器材粘接。',
  },
  {
    path: '/products/automation',
    title: '自动化设备 · 大宗物资自动盘点系统 · 彭田新材料',
    description:
      '自研激光雷达扫描仪硬件与 mirrorBarn 点云处理、mirrorScreen 数据大屏调度软件，应用于砂石搅拌站、粮仓煤仓智能盘点、智慧矿山、井下火车自动装车、无人货场、智能天车。',
  },
  {
    path: '/about',
    title: '公司介绍 · 彭田新材料（镇江）有限公司',
    description:
      '专注高性能新材料研发生产销售的创新型企业，与江苏科技大学共建实验室与产学研平台，已申请多项国内外专利，覆盖硅酮防火材料、纳米复合材料等前沿领域。',
  },
  {
    path: '/fields',
    title: '应用领域 · 彭田新材料',
    description:
      '产品广泛应用于核电、石油化工、电力、铁路轨道交通、高层建筑、造船工业、低空飞行器、智慧矿山等重大工程领域。',
  },
  {
    path: '/insights',
    title: '技术视界 · 彭田新材料',
    description:
      '由 DP·AI 引擎自动抓取海内外公开新材料技术视频，覆盖核能、氢能、光伏、风电、储能、动力电池等多种能源方向，自动摘要与多语言翻译，每日更新的行业技术普及窗口。',
  },
  {
    path: '/quality',
    title: '生产质量与技术研发 · 彭田新材料',
    description:
      '现代化自动化生产线，硅酮防火材料年产超 2000 吨；严格执行 ISO 9001、ISO 45001、ISO 14001 管理体系；与江苏科技大学共建检测实验室，防火、抗老化、防酸、防腐全面测试。',
  },
  {
    path: '/contact',
    title: '联系我们 · 彭田新材料',
    description:
      '服务热线 400-8484-616，邮箱 sales@ptm-zj.com，地址江苏省镇江市。欢迎洽谈产品选型、技术合作与产学研项目。',
  },
]
