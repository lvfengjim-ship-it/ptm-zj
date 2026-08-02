interface Props {
  en: string
  title: string
  desc?: string
  dark?: boolean
  center?: boolean
}

/** PPT 风格标题：红色竖条 + 灰色主标题 */
export default function SectionTitle({ en, title, desc, dark, center }: Props) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`text-xs font-semibold tracking-[0.3em] ${dark ? 'text-ptm-soft' : 'text-ptm'}`}>{en}</p>
      <div className={`mt-3 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <span className="inline-block h-8 w-1.5 rounded-sm bg-ptm" />
        <h2 className={`text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      </div>
      {desc && <p className={`mt-4 leading-relaxed ${dark ? 'text-neutral-400' : 'text-ink-gray'}`}>{desc}</p>}
    </div>
  )
}
