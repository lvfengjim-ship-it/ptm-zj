import { Factory, FlaskConical, Award, GraduationCap, FileBadge } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'

const qualityItems = [
  {
    icon: Factory,
    title: '现代化生产基地',
    points: ['自动化生产线，硅酮防火材料年产超 2000 吨', '吸酸枕全无尘生产，日产 2000 标准袋（6 吨）'],
  },
  {
    icon: Award,
    title: '质量管理体系',
    points: ['ISO 9001 质量管理体系', 'ISO 45001 职业健康安全管理体系', 'ISO 14001 环境管理体系'],
  },
  {
    icon: FlaskConical,
    title: '共建检测实验室',
    points: ['与江苏科技大学共建实验室', '防火、抗老化、防酸、防腐全面性能测试', '先进检测设备确保符合行业标准'],
  },
]

const rdItems = [
  {
    icon: GraduationCap,
    title: '产学研研发平台',
    text: '作为江苏科技大学产学研基地，建立联合研发平台，集成最新材料科学技术，持续推动创新产品研发。',
  },
  {
    icon: FileBadge,
    title: '知识产权壁垒',
    text: '防火密封产品在材料设计、工艺控制等方面取得多项突破，已申请多项国内外专利，覆盖硅酮防火材料、纳米复合材料等领域。',
  },
]

export default function Quality() {
  return (
    <section id="quality" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle en="QUALITY & R&D" title="生产质量 · 技术研发" />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {qualityItems.map((q) => (
            <div key={q.title} className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ptm text-white">
                <q.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">{q.title}</h3>
              <ul className="mt-3 space-y-2">
                {q.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-ink-gray">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ptm" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {rdItems.map((r) => (
            <div
              key={r.title}
              className="flex gap-5 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ptm-light text-ptm">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-gray">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
