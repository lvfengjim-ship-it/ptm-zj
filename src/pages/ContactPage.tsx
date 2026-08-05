import { Phone, Mail, MapPin, Globe, Handshake } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { contact } from '@/data/site'

const channels = [
  { icon: Phone, label: '服务热线', value: contact.hotline, href: `tel:${contact.hotline}`, desc: '工作日即时响应产品选型与技术咨询' },
  { icon: Mail, label: '商务邮箱', value: contact.email, href: `mailto:${contact.email}`, desc: '产品资料、检测报告与合作需求请发送邮件' },
  { icon: MapPin, label: '公司地址', value: contact.address, href: null, desc: '欢迎预约到访，实地考察生产基地与检测实验室' },
  { icon: Globe, label: '官方网站', value: contact.site, href: `https://${contact.site}`, desc: '技术视界栏目每日更新行业技术动态' },
]

const topics = ['产品选型与报价', '防火封堵工程方案', '复合材料粘接工艺适配', '自动化盘点系统部署', '产学研与技术合作']

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            en="CONTACT US"
            title="联系我们"
            desc="欢迎来电来函洽谈产品选型、技术合作与产学研项目，我们将在第一时间响应您的需求"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {channels.map((c) => {
              const inner = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ptm text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-light">{c.label}</p>
                    <p className="mt-1 text-xl font-bold text-ink group-hover:text-ptm">{c.value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-gray">{c.desc}</p>
                  </div>
                </>
              )
              const cls =
                'group flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:border-ptm/40 hover:shadow-md'
              return c.href ? (
                <a key={c.label} href={c.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <div key={c.label} className={cls}>
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Handshake className="h-5 w-5 text-ptm" />
              <h2 className="font-semibold text-ink">常见洽谈方向</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((t) => (
                <span key={t} className="rounded-full border border-ptm/25 bg-ptm-light px-3.5 py-1.5 text-xs font-medium text-ptm">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-gray">
              来电请拨打服务热线 {contact.hotline}，或将需求发送至 {contact.email}，请注明您的应用场景与技术要求，便于我们安排对口工程师对接。
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
