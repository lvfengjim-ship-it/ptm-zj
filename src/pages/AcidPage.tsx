import { Link } from 'react-router'
import { Package, Factory, Recycle } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { AcidPanel } from '@/sections/Products'

const extras = [
  {
    icon: Package,
    title: '材料组成',
    desc: '高效吸酸剂和高透水性包裹袋，提供多种尺寸，适配不同规格型号的铅酸蓄电池。',
  },
  {
    icon: Factory,
    title: '全无尘自动化生产',
    desc: '特种吸酸枕已完成自动化改造，全无尘生产，日产量 2000 标准袋（6 吨），供货稳定。',
  },
  {
    icon: Recycle,
    title: '安全环保',
    desc: '采用无毒、无害材料制成，对环境友好，符合环保标准，符合核电要求的高密度标准。',
  },
]

export default function AcidPage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="text-xs text-ink-light">
            <Link to="/products" className="hover:text-ptm">产品中心</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-gray">核电用吸酸枕</span>
          </nav>
          <div className="mt-4">
            <SectionTitle
              en="ACID ABSORBING PILLOW"
              title="核电用吸酸枕"
              desc="迅速中和并吸收泄漏硫酸，防止腐蚀和污染，为核电站应急供电、通信基站、数据中心的关键设备提供防泄漏保护。"
            />
          </div>

          <div className="mt-10">
            <AcidPanel />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {extras.map((e) => (
              <div key={e.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ptm-light text-ptm">
                  <e.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-semibold text-ink">{e.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-gray">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
