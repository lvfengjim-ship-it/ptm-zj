// 站点内容数据 —— 来源：《彭田新材料（镇江）有限公司 2026 V1.2》

export const stats = [
  { value: '60', unit: '年', label: '长效防火保护承诺' },
  { value: '2000', unit: '吨/年', label: '硅酮防火材料产能' },
  { value: '2000', unit: '袋/日', label: '特种吸酸枕全无尘日产' },
  { value: '3', unit: '项', label: 'ISO 国际管理体系认证' },
]

export const fireProducts = [
  { name: '低密度防火封堵材料', model: 'DPK-Z-FDL-EIC3-PTM01', use: '电线电缆及管道孔洞封堵 · 3小时耐火' },
  { name: '中密度防火密封胶', model: 'DJK-Z-FDL-EIC3-PTM02', use: '电线电缆及管道孔洞封堵 · 3小时耐火' },
  { name: '高密度防火密封胶', model: 'DJK-Z-FDL-EIC3-PTM03', use: '电线电缆及管道孔洞封堵 · 3小时耐火' },
  { name: '硅酮防火密封胶', model: 'DJF-Z-FDL-EIC3-PTM04', use: '电线电缆及管道孔洞封堵 · 3小时耐火' },
  { name: '硅布', model: 'PTM-101', use: '管道耐火保护' },
  { name: '阻火包', model: 'DBK-PTM720', use: '孔洞封堵 · 耐火极限一级 3 小时' },
  { name: '柔性有机堵料', model: 'DPK-PTMA009', use: '电线电缆及管道孔洞封堵 · 2小时耐火' },
  { name: '阻火模块', model: 'DMK-PTMA010', use: '电缆桥架孔洞防火封堵 · 耐火 ≥180 分钟' },
  { name: '吸酸装置', model: 'PTM 系列', use: '吸收泄漏硫酸，防止腐蚀和污染' },
]

export const fireSeries = [
  {
    title: '单组份硅酮防火密封胶',
    feature: '施工便捷，单组分设计，优异的防火性能和长效密封性',
    apps: ['核电站电缆穿墙阻燃密封', '高层建筑防火密封', '工业设备防火密封'],
  },
  {
    title: '双组分硅酮泡沫防火封堵材料',
    feature: '良好的气密性和水密性，适应复杂环境，耐老化、耐辐照',
    apps: ['航空航天和造船工业防火密封', '石油、化工领域防火封堵'],
  },
  {
    title: '硅酮密实弹性体',
    feature: '优异的弹性和抗老化性能，长期保持结构完整和密封效果',
    apps: ['冶金行业高温防火密封', '电力设备安全密封保护'],
  },
  {
    title: '硅布及系列配套产品',
    feature: '高耐温、无卤素、无毒、可去污，环保性能突出',
    apps: ['建筑物电缆贯穿防火保护', '海洋平台设备防火封堵'],
  },
]

export const adhesiveTypes = [
  '双组分环氧胶',
  '单组分环氧胶',
  '双组分聚氨酯胶',
  '双组分丙烯酸酯胶',
  '双组分环氧改性聚氨酯胶',
  '单组分反应型聚氨酯热熔胶',
  '单组分改性硅烷密封胶',
]

export const adhesiveApps = [
  {
    scene: '车辆装配',
    models: 'PTMU 1011 – 1016 系列',
    points: ['乘用车大灯 / 尾灯 / 贯穿灯粘接', '轻量化轮眉、扰流板、尾门粘接', '适配 1:1 / 2:1 / 4:1 自动胶机'],
  },
  {
    scene: '碳纤维改装车辆',
    models: 'PTMU 2001 – 2003 系列',
    points: ['碳纤维机舱盖板 / 门板粘接', '碳纤维后视镜 / 尾翼粘接', '耐盐雾、抗震动疲劳'],
  },
  {
    scene: '低空飞行器',
    models: 'PTMU 3011 / 3012 系列',
    points: ['碳纤维机身结构板粘接', '碳纤维部件 + 金属结构粘接', 'TG＞200℃ 长期耐高温'],
  },
  {
    scene: '交通运输',
    models: 'PTMU 4001 / 4002 系列',
    points: ['集卡集成高顶粘接', '集卡车门、保险杠粘接', 'SMC 基材免打磨'],
  },
  {
    scene: '轨道交通',
    models: 'PTMU 5011 – 5016 系列',
    points: ['地铁座椅、三明治蜂窝板复合', '铝蜂窝地板、皮革地板布复合', '低气味、耐盐雾老化'],
  },
  {
    scene: '军工方舱',
    models: 'PTMU 6601 – 6603 系列',
    points: ['舱体三明治夹芯板复合粘接', '舱体四周封边密封', '满足军标日照辐射要求'],
  },
  {
    scene: '体育器材',
    models: 'PTMU 7006 / 7007 系列',
    points: ['电动冲浪板粘接', '碳纤维自行车粘接', '滑雪板复合粘接'],
  },
]

export const scanSystem = {
  hardware: '激光雷达扫描仪',
  software: ['mirrorBarn 点云数据处理软件', 'mirrorScreen 前端展示软件（数据大屏 + 调度软件）'],
  cases: ['砂石搅拌站智能盘点', '粮仓 / 煤仓智能盘点', '智慧矿山', '井下火车自动装车', '无人货场', '智能天车'],
}

export const acidPillow = {
  features: [
    '高效吸酸：特制吸收剂迅速中和并吸收泄漏硫酸，防止腐蚀和污染',
    '安全环保：无毒无害材料，符合环保标准',
    '高堆积密度：符合核电要求的高密度标准，使用可靠',
    '易于安装：适配各种型号铅酸蓄电池，提供全方位保护',
  ],
  apps: ['核电站应急供电铅酸蓄电池防护', '通信基站设备安全保障', '数据中心关键设备防泄漏保护'],
}

export const fields = [
  { name: '核电', en: 'Nuclear Power' },
  { name: '石油 / 化工', en: 'Petrochemical' },
  { name: '电力', en: 'Electric Power' },
  { name: '铁路 / 轨道交通', en: 'Rail Transit' },
  { name: '高层建筑', en: 'High-rise' },
  { name: '造船工业', en: 'Shipbuilding' },
  { name: '低空飞行器', en: 'eVTOL / UAV' },
  { name: '智慧矿山', en: 'Smart Mining' },
]

export const contact = {
  hotline: '400-8484-616',
  site: 'www.ptm-zj.com',
  city: '江苏 · 镇江',
}
