import { useState } from 'react'
import { Flame, BatteryCharging, Layers, Radar, CheckCircle2, ChevronRight } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'
import { fireSeries, fireProducts, acidPillow, adhesiveTypes, adhesiveApps, scanSystem } from '@/data/site'

const tabs = [
  { id: 'fire', label: '防火防辐射封堵', icon: Flame },
  { id: 'acid', label: '核电吸酸枕', icon: BatteryCharging },
  { id: 'adhesive', label: '复合材料粘结剂', icon: Layers },
  { id: 'scan', label: '自动化设备', icon: Radar },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Products() {
  const [tab, setTab] = useState<TabId>('fire')

  return (
    <section id="products" className="bg-[#F7F6F4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          en="PRODUCTS"
          title="产品中心"
          desc="四大产品线覆盖被动防火、核安防护、复合材料粘接与自动化设备，产品通过权威机构检测认证。"
        />

        {/* Tab 切换 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-ptm text-white shadow-lg shadow-ptm/25'
                  : 'border border-neutral-300 bg-white text-ink-gray hover:border-ptm/50 hover:text-ptm'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {tab === 'fire' && <FirePanel />}
          {tab === 'acid' && <AcidPanel />}
          {tab === 'adhesive' && <AdhesivePanel />}
          {tab === 'scan' && <ScanPanel />}
        </div>
      </div>
    </section>
  )
}

export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">{children}</div>
  )
}

export function FirePanel() {
  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-2">
        {fireSeries.map((s) => (
          <div key={s.title} className="rounded-xl border border-neutral-200 bg-[#F7F6F4] p-5">
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-gray">{s.feature}</p>
            <ul className="mt-3 space-y-1.5">
              {s.apps.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-ink-gray">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ptm" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
        <div className="border-b border-neutral-200 bg-[#F7F6F4] px-5 py-3.5">
          <p className="text-sm font-semibold text-ink">
            产品型号一览 <span className="ml-2 text-xs font-normal text-ink-light">全系列承诺 60 年长效防火保护</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-neutral-50 text-xs uppercase tracking-wider text-ink-light">
                <th className="px-5 py-3 font-medium">产品名称</th>
                <th className="px-5 py-3 font-medium">规格型号</th>
                <th className="px-5 py-3 font-medium">应用范围</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {fireProducts.map((p) => (
                <tr key={p.model + p.name} className="transition-colors hover:bg-ptm-light/50">
                  <td className="px-5 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-ptm">{p.model}</td>
                  <td className="px-5 py-3 text-ink-gray">{p.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {['无卤无毒', '气密水密', '抗辐照耐老化', '可去污', '易维护效率提升 70%+', '权威认证'].map((t) => (
          <span key={t} className="rounded-full border border-ptm/25 bg-ptm-light px-3 py-1 text-xs text-ptm">
            {t}
          </span>
        ))}
      </div>
    </Panel>
  )
}

export function AcidPanel() {
  return (
    <Panel>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold text-ink">核电用吸酸枕</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-gray">
            由高效吸酸剂与高透水性包裹袋组成，提供多种尺寸，适配不同规格铅酸蓄电池；
            已完成自动化改造，全无尘生产，日产量 2000 标准袋（6 吨）。
          </p>
          <ul className="mt-5 space-y-3">
            {acidPillow.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-gray">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ptm" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-[#F7F6F4] p-6">
          <p className="text-sm font-semibold text-ink">应用领域</p>
          <div className="mt-4 space-y-3">
            {acidPillow.apps.map((a, i) => (
              <div key={a} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-neutral-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ptm-light text-xs font-bold text-ptm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-ink-gray">{a}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-light">
            防止酸液泄漏造成的设备损坏与安全隐患，保障应急供电系统、通信与数据关键设备安全运行。
          </p>
        </div>
      </div>
    </Panel>
  )
}

export function AdhesivePanel() {
  return (
    <Panel>
      <div className="flex flex-wrap gap-2">
        {adhesiveTypes.map((t) => (
          <span key={t} className="rounded-full border border-ptm/25 bg-ptm-light px-3.5 py-1.5 text-xs font-medium text-ptm">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adhesiveApps.map((a) => (
          <div key={a.scene} className="rounded-xl border border-neutral-200 bg-[#F7F6F4] p-5 transition-colors hover:border-ptm/40">
            <h3 className="font-semibold text-ink">{a.scene}</h3>
            <p className="mt-1 font-mono text-xs text-ptm">{a.models}</p>
            <ul className="mt-3 space-y-1.5">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-ink-gray">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ptm" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function ScanPanel() {
  return (
    <Panel>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold text-ink">自动化设备</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-gray">
            核心产品为大宗物资自动盘点系统：面向智能盘库、智能天车、无人货场、智慧矿山等领域的大场景智能视觉需求，
            自研激光雷达扫描仪硬件与配套软件体系。
          </p>
          <div className="mt-5 space-y-3">
            <div className="rounded-lg border border-ptm/25 bg-ptm-light px-4 py-3">
              <p className="text-xs font-medium text-ptm">硬件</p>
              <p className="mt-1 text-sm font-semibold text-ink">{scanSystem.hardware}</p>
            </div>
            {scanSystem.software.map((s) => (
              <div key={s} className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <p className="text-xs font-medium text-ink-light">软件</p>
                <p className="mt-1 text-sm font-semibold text-ink">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-[#F7F6F4] p-6">
          <p className="text-sm font-semibold text-ink">典型应用案例</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {scanSystem.cases.map((c) => (
              <div key={c} className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-3 text-sm text-ink-gray ring-1 ring-neutral-200">
                <Radar className="h-4 w-4 shrink-0 text-ptm" />
                {c}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-light">
            配套数据大屏与调度软件已在砂石搅拌站、粮仓煤仓、智慧矿山、井下火车自动装车、无人货场等场景落地。
          </p>
        </div>
      </div>
    </Panel>
  )
}
