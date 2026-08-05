import { Link } from 'react-router'
import { ShieldCheck, FileCheck2, Award, ChevronRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { FirePanel } from '@/sections/Products'
import { firePerformance, fireCertification } from '@/data/site'

export default function FirePage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="text-xs text-ink-light">
            <Link to="/products" className="hover:text-ptm">产品中心</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-gray">防火防辐射封堵材料</span>
          </nav>
          <div className="mt-4">
            <SectionTitle
              en="FIRE & RADIATION PROTECTION"
              title="防火防辐射封堵材料"
              desc="单组份硅酮防火密封胶、双组分硅酮泡沫防火封堵材料、硅酮密实弹性体、硅布及配套产品，服务核电、石油化工、电力、铁路、高层建筑、造船工业等重大领域。"
            />
          </div>

          <div className="mt-10">
            <FirePanel />
          </div>

          {/* 性能特点 */}
          <h2 className="mt-14 text-xl font-bold text-ink">核心性能</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {firePerformance.map((p) => (
              <div key={p.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-ptm" />
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-gray">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* 检测与认证 */}
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="h-5 w-5 text-ptm" />
                <h2 className="font-semibold text-ink">权威试验报告</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {fireCertification.reports.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm leading-relaxed text-ink-gray">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ptm" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-ptm" />
                <h2 className="font-semibold text-ink">体系认证</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['ISO 9001 质量管理体系', 'ISO 45001 职业健康安全', 'ISO 14001 环境管理'].map((t) => (
                  <span key={t} className="rounded-full border border-ptm/25 bg-ptm-light px-3.5 py-1.5 text-xs font-medium text-ptm">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-gray">{fireCertification.note}</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
