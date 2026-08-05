import { Link } from 'react-router'
import { Flame, BatteryCharging, Layers, Radar, ArrowRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { fireProducts } from '@/data/site'

const lines = [
  {
    to: '/products/fire',
    icon: Flame,
    name: '防火防辐射封堵材料',
    desc: '硅酮防火密封胶、低/中/高密度封堵材料、阻火包、阻火模块、硅布等 9 大型号，3 小时耐火，60 年长效防火保护。',
  },
  {
    to: '/products/acid',
    icon: BatteryCharging,
    name: '核电用吸酸枕',
    desc: '高效吸酸、安全环保、高堆积密度符合核电要求，全无尘自动化生产，日产 2000 标准袋（6 吨）。',
  },
  {
    to: '/products/adhesive',
    icon: Layers,
    name: '复合材料粘结剂',
    desc: 'PTMU 系列 7 大类型，覆盖车辆装配、碳纤维改装、低空飞行器、交通运输、轨道交通、军工方舱、体育器材。',
  },
  {
    to: '/products/automation',
    icon: Radar,
    name: '自动化设备',
    desc: '大宗物资自动盘点系统：激光雷达扫描仪硬件 + mirrorBarn / mirrorScreen 软件，服务智能盘库、智慧矿山、无人货场。',
  },
]

export default function ProductsPage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            en="PRODUCTS"
            title="产品中心"
            desc="四大产品线覆盖被动防火、核安防护、复合材料粘接与自动化设备，产品通过权威机构检测认证。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {lines.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-ptm/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ptm text-white">
                    <l.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-ptm" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-ink group-hover:text-ptm">{l.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-gray">{l.desc}</p>
              </Link>
            ))}
          </div>

          {/* 防火封堵材料型号总表 */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 px-6 py-4">
              <h2 className="font-semibold text-ink">
                防火防辐射封堵材料 · 产品型号一览
                <span className="ml-2 text-xs font-normal text-ink-light">全系列承诺 60 年长效防火保护</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-neutral-50 text-xs uppercase tracking-wider text-ink-light">
                    <th className="px-6 py-3 font-medium">产品名称</th>
                    <th className="px-6 py-3 font-medium">规格型号</th>
                    <th className="px-6 py-3 font-medium">应用范围</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {fireProducts.map((p) => (
                    <tr key={p.model + p.name} className="transition-colors hover:bg-ptm-light/50">
                      <td className="px-6 py-3 font-medium text-ink">{p.name}</td>
                      <td className="px-6 py-3 font-mono text-xs text-ptm">{p.model}</td>
                      <td className="px-6 py-3 text-ink-gray">{p.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
