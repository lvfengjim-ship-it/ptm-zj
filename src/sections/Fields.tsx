import { Atom, Fuel, Zap, TrainFront, Building2, Ship, Plane, Mountain } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'
import { fields } from '@/data/site'

const icons = [Atom, Fuel, Zap, TrainFront, Building2, Ship, Plane, Mountain]

export default function Fields() {
  return (
    <section id="fields" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          en="APPLICATIONS"
          title="应用领域"
          desc="产品广泛应用于核电、能源、交通、建筑等高要求重大工程领域"
          center
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {fields.map((f, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={f.name}
                className="group rounded-2xl border border-neutral-200 bg-[#F7F6F4] p-6 text-center transition-all hover:-translate-y-1 hover:border-ptm/40 hover:bg-white hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ptm text-white transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-ink">{f.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-light">{f.en}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
