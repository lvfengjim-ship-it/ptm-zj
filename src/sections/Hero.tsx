import { ArrowRight, PlayCircle, ShieldCheck, Atom, Layers } from 'lucide-react'

const productLines = ['防火防辐射封堵材料', '核电用吸酸枕', '复合材料粘结剂', '自动化设备']

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#F7F6F4]">
      {/* 背景装饰：浅灰网格 + 红色光晕，呼应 PPT 白底风格 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-ptm/10 blur-3xl" />
        <div className="absolute -bottom-52 -left-32 h-[480px] w-[480px] rounded-full bg-ptm/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.045) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ptm/25 bg-ptm-light px-4 py-1.5 text-xs font-medium tracking-wide text-ptm">
            <ShieldCheck className="h-3.5 w-3.5" />
            60 年长效防火保护承诺 · 无卤 · 无毒 · 耐辐照
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-[1.2] text-ink sm:text-5xl lg:text-[3.4rem]">
            高性能新材料
            <span className="bg-gradient-to-r from-ptm to-ptm-deeper bg-clip-text text-transparent">
              守护重大工程安全
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-gray sm:text-lg">
            彭田新材料（镇江）有限公司专注核电防火防辐射封堵材料、核电吸酸枕、复合材料粘结剂与自动化设备，
            为核电、石油、化工、电力、铁路、高层建筑、造船工业等重大领域提供长效、安全、环保的产品解决方案。
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {productLines.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-gray"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-lg bg-ptm px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-ptm-dark hover:shadow-lg hover:shadow-ptm/25"
            >
              浏览产品中心
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#ai-hub"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ptm hover:text-ptm"
            >
              <PlayCircle className="h-4 w-4" />
              技术视界 · 行业科普
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-gray">
            <span className="flex items-center gap-2">
              <Atom className="h-4 w-4 text-ptm" /> 江苏科技大学产学研基地
            </span>
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-ptm" /> 多项国内外核心专利
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
