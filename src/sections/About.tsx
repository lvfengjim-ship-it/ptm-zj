import { Target, Compass, Leaf, Users } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'

const cards = [
  {
    icon: Compass,
    title: '企业愿景',
    text: '成为特种设备和材料的标杆企业，为重大工程领域提供高效、可靠的保护。',
  },
  {
    icon: Target,
    title: '企业使命',
    text: '通过不断创新材料科技，为客户提供长效、安全、环保的产品，保障各类特殊场景的安全需求。',
  },
  {
    icon: Leaf,
    title: '环保承诺',
    text: '注重绿色生产，减少污染排放，采用无卤、无毒环保材料，为客户和社会提供安全的产品。',
  },
  {
    icon: Users,
    title: '社会贡献',
    text: '积极参与地方经济建设，支持就业，致力于社会公益和可持续发展。',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle en="ABOUT PTM" title="公司介绍" />
            <p className="mt-6 leading-relaxed text-ink-gray">
              彭田新材料（镇江）有限公司是一家专注于高性能新材料研发、生产和销售的创新型企业，
              产品涵盖自动化生产设备、核电防火材料、核电辐射隔离套管、核电吸酸枕等，
              为核电、石油、化工、电力、铁路、高层建筑、造船工业等重大领域提供产品解决方案。
            </p>
            <p className="mt-4 leading-relaxed text-ink-gray">
              公司与江苏科技大学科研团队深度合作，共建联合实验室与产学研研发平台，
              持续推动新产品和新技术的产业化落地，已申请多项国内外专利，
              技术覆盖硅酮防火材料、纳米复合材料等前沿领域。
            </p>

            <div className="mt-8 rounded-xl border border-neutral-200 bg-[#F7F6F4] p-6">
              <p className="text-sm font-semibold text-ink">核心产品线</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['防火防辐射封堵材料', '核电用吸酸枕', '复合材料粘结剂', '自动化设备', '技术服务'].map(
                  (t) => (
                    <span key={t} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink-gray ring-1 ring-neutral-200">
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ptm/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ptm-light text-ptm transition-colors group-hover:bg-ptm group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-gray">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
