import { Link } from 'react-router'
import { ChevronRight, Boxes } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { AdhesivePanel } from '@/sections/Products'
import { adhesiveScenes } from '@/data/site'

export default function AdhesivePage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="text-xs text-ink-light">
            <Link to="/products" className="hover:text-ptm">产品中心</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-gray">复合材料粘结剂</span>
          </nav>
          <div className="mt-4">
            <SectionTitle
              en="COMPOSITE ADHESIVES"
              title="复合材料粘结剂 · PTMU 系列"
              desc="7 大胶种体系、PTMU 1000–7000 系列型号，覆盖车辆装配、碳纤维改装、低空飞行器、交通运输、轨道交通、军工方舱、体育器材七大应用场景。"
            />
          </div>

          <div className="mt-10">
            <AdhesivePanel />
          </div>

          {/* 分场景型号与技术参数 */}
          <h2 className="mt-14 text-xl font-bold text-ink">分场景型号与技术特性</h2>
          <div className="mt-6 space-y-6">
            {adhesiveScenes.map((s) => (
              <div key={s.scene} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-ink">{s.scene}</h3>
                  <p className="flex items-center gap-1.5 text-xs text-ink-light">
                    <Boxes className="h-3.5 w-3.5 text-ptm" />
                    粘接基材：{s.substrates}
                  </p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {s.products.map((p) => (
                    <div key={p.model} className="rounded-xl border border-neutral-200 bg-[#F7F6F4] p-5 transition-colors hover:border-ptm/40">
                      <p className="font-mono text-sm font-semibold text-ptm">{p.model}</p>
                      <ul className="mt-3 space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-ink-gray">
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ptm" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 border-t border-neutral-200 pt-3 text-xs leading-relaxed text-ink-light">
                        应用：{p.apps.join('；')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
