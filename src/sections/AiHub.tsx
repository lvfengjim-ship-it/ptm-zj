import { useMemo, useState } from 'react'
import { PlayCircle, Sparkles, Globe, Clock, Flame, Rss } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'
import { categories, videos, dataUpdatedAt, type TechVideo } from '@/data/videos'

export default function AiHub() {
  const [cat, setCat] = useState<(typeof categories)[number]>('全部')

  const list = useMemo(() => (cat === '全部' ? videos : videos.filter((v) => v.category === cat)), [cat])

  return (
    <section id="ai-hub" className="relative overflow-hidden bg-[#F7F6F4] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-ptm/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ptm/25 bg-ptm-light px-4 py-1.5 text-xs font-medium text-ptm">
            <Sparkles className="h-3.5 w-3.5" />
            DP·AI 引擎驱动 · 每日自动更新
          </div>
          <div className="mt-5">
            <SectionTitle
              en="TECH HUB"
              title="技术视界"
              desc="由 DP·AI 引擎自动抓取海内外公开新材料技术视频，覆盖核能、氢能、光伏、风电、储能、动力电池等多种能源方向，自动完成摘要提炼与多语言翻译，做面向全行业的技术普及窗口。"
            />
          </div>
        </div>

        {/* 能源分类筛选 */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                cat === c
                  ? 'bg-ptm text-white shadow-lg shadow-ptm/25'
                  : 'border border-neutral-300 bg-white text-ink-gray hover:border-ptm/50 hover:text-ptm'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 视频卡片 */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-light">
          {dataUpdatedAt
            ? `内容经人工审核后发布，最近更新：${dataUpdatedAt}`
            : '* 当前展示为栏目样式示例。内容管线接入后，视频将每日自动更新，经人工审核后发布。'}
        </p>
      </div>
    </section>
  )
}

function VideoCard({ video: v }: { video: TechVideo }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-ptm/40 hover:shadow-lg">
      {/* 封面占位 */}
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-[#EFEBE6] to-[#E2DCD4]">
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-ptm px-2.5 py-1 text-[11px] font-medium text-white">{v.category}</span>
          <span className="flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-ink-gray">
            <Globe className="h-3 w-3" />
            {v.region}
          </span>
        </div>
        {v.hot && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ptm">
            <Flame className="h-3 w-3" /> 热门
          </span>
        )}
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-ptm shadow-sm backdrop-blur transition-all group-hover:scale-110 group-hover:bg-ptm group-hover:text-white">
          <PlayCircle className="h-8 w-8" />
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/45 px-2 py-0.5 text-[11px] text-white">
          <Clock className="h-3 w-3" />
          {v.duration}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 font-semibold leading-snug text-ink group-hover:text-ptm">
          {v.url ? (
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {v.title}
            </a>
          ) : (
            v.title
          )}
        </h3>
        <div className="mt-3 rounded-lg border border-ptm/15 bg-ptm-light p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-ptm">
            <Sparkles className="h-3 w-3" />
            DP·AI 摘要
          </p>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink-gray">{v.summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-ink-light">
          <span className="flex items-center gap-1">
            <Rss className="h-3 w-3" />
            {v.source}
          </span>
          <span>{v.date}</span>
        </div>
      </div>
    </article>
  )
}
