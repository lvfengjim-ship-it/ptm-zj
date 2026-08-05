import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'

// 内页统一布局：固定导航占位 + 页脚
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
