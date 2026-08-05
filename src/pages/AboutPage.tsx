import { Lightbulb, FileBadge, FlaskConical, Rocket } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import About from '@/sections/About'
import { aboutHighlights } from '@/data/site'

const icons = [Lightbulb, FileBadge, FlaskConical, Rocket]

export default function AboutPage() {
  return (
    <PageLayout>
      <About />
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            en="R&D & INNOVATION"
            title="研发实力与创新"
            desc="以产学研联合平台为引擎，持续推动新材料技术从实验室走向重大工程"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {aboutHighlights.map((h, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div key={h.title} className="flex gap-5 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ptm text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-ink">{h.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-gray">{h.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
