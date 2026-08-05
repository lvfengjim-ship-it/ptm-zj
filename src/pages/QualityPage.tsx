import PageLayout from '@/components/PageLayout'
import Quality from '@/sections/Quality'
import SectionTitle from '@/sections/SectionTitle'
import { Award, FileCheck2 } from 'lucide-react'
import { fireCertification } from '@/data/site'

export default function QualityPage() {
  return (
    <PageLayout>
      <Quality />
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            en="CERTIFICATION & TESTING"
            title="检测与认证"
            desc="全系列产品通过权威机构检测认证，三大 ISO 国际管理体系保障质量稳定与环保合规"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-ptm" />
                <h2 className="font-semibold text-ink">ISO 国际管理体系</h2>
              </div>
              <div className="mt-4 space-y-3">
                {['ISO 9001 质量管理体系', 'ISO 45001 职业健康安全管理体系', 'ISO 14001 环境管理体系'].map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-lg bg-[#F7F6F4] px-4 py-3 ring-1 ring-neutral-200">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-ptm" />
                    <span className="text-sm font-medium text-ink">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="h-5 w-5 text-ptm" />
                <h2 className="font-semibold text-ink">产品型式试验与检测</h2>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-gray">
                {fireCertification.reports.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ptm" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-ink-light">
                共建检测实验室可进行全面的防火、抗老化、防酸、防腐等性能测试，确保产品符合行业标准。
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
