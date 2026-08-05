import { Link } from 'react-router'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/sections/SectionTitle'
import { ScanPanel } from '@/sections/Products'

export default function AutomationPage() {
  return (
    <PageLayout>
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="text-xs text-ink-light">
            <Link to="/products" className="hover:text-ptm">产品中心</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-gray">自动化设备</span>
          </nav>
          <div className="mt-4">
            <SectionTitle
              en="AUTOMATION EQUIPMENT"
              title="自动化设备 · 大宗物资自动盘点系统"
              desc="围绕智能盘库、智能天车、无人货场、智慧矿山等领域的大场景智能视觉需求，自研激光雷达扫描仪硬件与 mirrorBarn 点云数据处理、mirrorScreen 前端展示（数据大屏 + 调度）软件体系。"
            />
          </div>

          <div className="mt-10">
            <ScanPanel />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
