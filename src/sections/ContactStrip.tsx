import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import SectionTitle from '@/sections/SectionTitle'
import { contact } from '@/data/site'

const items = [
  { icon: Phone, label: '服务热线', value: contact.hotline, href: `tel:${contact.hotline}`, note: '产品选型 · 技术咨询 · 合作洽谈' },
  { icon: Mail, label: '商务邮箱', value: contact.email, href: `mailto:${contact.email}`, note: '需求与资料请直接发送邮件' },
  { icon: MapPin, label: '公司地址', value: contact.address, href: null, note: '欢迎预约到访考察生产基地' },
  { icon: Globe, label: '官方网站', value: contact.site, href: `https://${contact.site}`, note: '技术视界栏目每日更新' },
]

// 首页联系方式区块：电话 / 邮箱 / 地址 / 官网 四卡直达
export default function ContactStrip() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          en="CONTACT"
          title="联系方式"
          desc="欢迎来电来函洽谈产品选型、技术合作与产学研项目"
          center
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const inner = (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ptm text-white transition-transform group-hover:scale-110">
                  <it.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-light">{it.label}</p>
                <p className="mt-1.5 text-lg font-bold text-ink group-hover:text-ptm">{it.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-light">{it.note}</p>
              </>
            )
            const cls =
              'group rounded-2xl border border-neutral-200 bg-[#F7F6F4] p-6 text-center transition-all hover:-translate-y-1 hover:border-ptm/40 hover:bg-white hover:shadow-lg'
            return it.href ? (
              <a key={it.label} href={it.href} className={cls}>
                {inner}
              </a>
            ) : (
              <div key={it.label} className={cls}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
