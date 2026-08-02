import { Phone, Globe, MapPin, Sparkles } from 'lucide-react'
import { contact } from '@/data/site'
import logo from '@/assets/logo.png'

export default function Footer() {
  return (
    <footer id="contact">
      {/* 联系横幅：品牌红，呼应 logo */}
      <div className="bg-ptm">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">为您的重大工程选择长效可靠的材料方案</h2>
            <p className="mt-3 text-white/80">欢迎来电洽谈产品选型、技术合作与产学研项目</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${contact.hotline}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ptm transition-colors hover:bg-neutral-100"
            >
              <Phone className="h-4 w-4" />
              {contact.hotline}
            </a>
            <a
              href="#ai-hub"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Sparkles className="h-4 w-4" />
              关注技术视界
            </a>
          </div>
        </div>
      </div>

      {/* 主页脚 */}
      <div className="bg-[#F7F6F4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="PTM 彭田新材料" className="h-8 w-auto" />
            <p className="mt-3 text-sm font-medium text-ink">彭田新材料（镇江）有限公司</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-gray">
              专注高性能新材料研发、生产与销售，为核电、石油化工、电力、铁路、高层建筑、造船工业等重大领域提供产品解决方案。
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">产品中心</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-gray">
              {['防火防辐射封堵材料', '核电用吸酸枕', '复合材料粘结剂', '自动化设备'].map((t) => (
                <li key={t}>
                  <a href="#products" className="transition-colors hover:text-ptm">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">快速导航</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-gray">
              {[
                ['#about', '公司介绍'],
                ['#fields', '应用领域'],
                ['#ai-hub', '技术视界'],
                ['#quality', '生产与质量'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-ptm">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">联系方式</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-gray">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-ptm" />
                服务热线：{contact.hotline}
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-ptm" />
                {contact.site}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-ptm" />
                {contact.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-ink-light sm:px-6 md:flex-row">
            <p>© 2026 彭田新材料（镇江）有限公司 · 版权所有</p>
            <p>技术视界内容由 DP·AI 引擎辅助生产，经人工审核后发布</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
