import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, X, Phone } from 'lucide-react'
import { contact } from '@/data/site'
import logo from '@/assets/logo.png'

const links = [
  { to: '/about', label: '公司介绍' },
  { to: '/products', label: '产品中心' },
  { to: '/fields', label: '应用领域' },
  { to: '/insights', label: '技术视界' },
  { to: '/quality', label: '生产与质量' },
  { to: '/contact', label: '联系我们' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md shadow-black/5 backdrop-blur' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="PTM 彭田新材料" className="h-8 w-auto" />
          <span className="hidden h-6 w-px bg-neutral-300 sm:block" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-[14px] font-bold tracking-wide text-ink">彭田新材料（镇江）有限公司</span>
            <span className="block text-[10px] tracking-wider text-ink-light">Pengtian New Material (Zhenjiang) Co., Ltd</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-ptm ${isActive ? 'font-semibold text-ptm' : 'text-ink-gray'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${contact.hotline}`}
            className="flex items-center gap-1.5 rounded-full bg-ptm px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-ptm-dark"
          >
            <Phone className="h-3.5 w-3.5" />
            {contact.hotline}
          </a>
        </nav>

        <button className="text-ink lg:hidden" onClick={() => setOpen(!open)} aria-label="菜单">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 text-sm hover:text-ptm ${isActive ? 'font-semibold text-ptm' : 'text-ink-gray'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${contact.hotline}`}
            className="mt-2 flex items-center gap-2 border-t border-neutral-100 py-3 text-sm font-semibold text-ptm"
          >
            <Phone className="h-4 w-4" />
            {contact.hotline}
          </a>
        </nav>
      )}
    </header>
  )
}
